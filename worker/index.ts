import { Hono } from 'hono';
import { v4 as uuidv4 } from 'uuid';
import { generateRandomPuzzle } from '../src/puzzleGenerator';

type Bindings = {
  DB: D1Database;
  APP_URL?: string;
};

type Variables = {
  user: any;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>().basePath('/api');

// Auth Routes
app.post('/auth/request', async (c) => {
  const { email } = await c.req.json();
  if (!email) return c.json({ error: 'Email required' }, 400);

  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  await c.env.DB.prepare('INSERT INTO auth_tokens (token, email, expires_at) VALUES (?, ?, ?)')
    .bind(token, email, expiresAt)
    .run();

  const appUrl = c.env.APP_URL || new URL(c.req.url).origin;
  const magicLink = `${appUrl}/verify?token=${token}`;

  console.log(`[SIMULATED EMAIL] To: ${email} | Link: ${magicLink}`);

  return c.json({ message: 'Magic link sent', simulatedLink: magicLink });
});

app.post('/auth/verify', async (c) => {
  const { token } = await c.req.json();
  if (!token) return c.json({ error: 'Token required' }, 400);

  const tokenRecord = await c.env.DB.prepare('SELECT * FROM auth_tokens WHERE token = ? AND expires_at > CURRENT_TIMESTAMP')
    .bind(token)
    .first();

  if (!tokenRecord) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }

  const email = tokenRecord.email;

  let user = await c.env.DB.prepare('SELECT * FROM users WHERE email = ?')
    .bind(email)
    .first();

  if (!user) {
    const userId = uuidv4();
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const username = `Agent_${array[0] % 10000}`;
    await c.env.DB.prepare('INSERT INTO users (id, email, username) VALUES (?, ?, ?)')
      .bind(userId, email, username)
      .run();
    user = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?')
      .bind(userId)
      .first();
  }

  const sessionId = uuidv4();
  const sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  await c.env.DB.prepare('INSERT INTO sessions (session_id, user_id, expires_at) VALUES (?, ?, ?)')
    .bind(sessionId, user.id, sessionExpiresAt)
    .run();

  await c.env.DB.prepare('DELETE FROM auth_tokens WHERE token = ?').bind(token).run();

  return c.json({ user, token: sessionId });
});

app.post('/auth/logout', async (c) => {
  const authHeader = c.req.header('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const sessionId = authHeader.split(' ')[1];
    await c.env.DB.prepare('DELETE FROM sessions WHERE session_id = ?').bind(sessionId).run();
  }
  return c.json({ message: 'Logged out' });
});

// Auth Middleware
app.use('/me*', async (c, next) => {
  const authHeader = c.req.header('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const sessionId = authHeader.split(' ')[1];

  const session = await c.env.DB.prepare('SELECT * FROM sessions WHERE session_id = ? AND expires_at > CURRENT_TIMESTAMP')
    .bind(sessionId)
    .first();
  if (!session) return c.json({ error: 'Unauthorized' }, 401);

  const user = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?')
    .bind(session.user_id)
    .first();
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  c.set('user', user);
  await next();
});

app.use('/puzzles*', async (c, next) => {
  const authHeader = c.req.header('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const sessionId = authHeader.split(' ')[1];

  const session = await c.env.DB.prepare('SELECT * FROM sessions WHERE session_id = ? AND expires_at > CURRENT_TIMESTAMP')
    .bind(sessionId)
    .first();
  if (!session) return c.json({ error: 'Unauthorized' }, 401);

  const user = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?')
    .bind(session.user_id)
    .first();
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  c.set('user', user);
  await next();
});

app.get('/me', async (c) => {
  const user = c.get('user');
  const { results: solvedPuzzles } = await c.env.DB.prepare('SELECT puzzle_id, score_earned, solved_at FROM solved_puzzles WHERE user_id = ?')
    .bind(user.id)
    .all();
  return c.json({ user, solvedPuzzles });
});

app.post('/me/username', async (c) => {
  const user = c.get('user');
  const { username } = await c.req.json();
  if (!username || username.length < 3) return c.json({ error: 'Invalid username' }, 400);

  try {
    await c.env.DB.prepare('UPDATE users SET username = ? WHERE id = ?')
      .bind(username, user.id)
      .run();
    return c.json({ message: 'Username updated' });
  } catch (e) {
    return c.json({ error: 'Username taken' }, 400);
  }
});

app.get('/puzzles', async (c) => {
  const user = c.get('user');
  let { results: unsolved } = await c.env.DB.prepare('SELECT * FROM generated_puzzles WHERE user_id = ? AND solved = 0')
    .bind(user.id)
    .all();

  const newPuzzles = [];
  while (unsolved.length + newPuzzles.length < 4) {
    const newPuzzle = generateRandomPuzzle(user.id);
    await c.env.DB.prepare(`INSERT INTO generated_puzzles
      (id, user_id, type, title, description, difficulty, multiplier, puzzle_data, answer)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(
        newPuzzle.id, newPuzzle.user_id, newPuzzle.type, newPuzzle.title, newPuzzle.description,
        newPuzzle.difficulty, newPuzzle.multiplier, newPuzzle.puzzle_data, newPuzzle.answer
      )
      .run();
    newPuzzles.push(newPuzzle);
  }
  unsolved = [...unsolved, ...newPuzzles];

  const { results: solved } = await c.env.DB.prepare('SELECT * FROM generated_puzzles WHERE user_id = ? AND solved = 1 ORDER BY created_at DESC LIMIT 10')
    .bind(user.id)
    .all();

  const formatPuzzle = (p: any) => ({
    id: p.id,
    type: p.type,
    title: p.title,
    description: p.description,
    difficulty: p.difficulty,
    multiplier: p.multiplier,
    puzzle_data: typeof p.puzzle_data === 'string' ? JSON.parse(p.puzzle_data) : p.puzzle_data,
    solved: p.solved === 1 || p.solved === true
  });

  return c.json({
    puzzles: unsolved.map(formatPuzzle),
    history: solved.map(formatPuzzle)
  });
});

app.post('/puzzles/:id/solve', async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const { answer } = await c.req.json();

  const puzzle = await c.env.DB.prepare('SELECT * FROM generated_puzzles WHERE id = ? AND user_id = ?')
    .bind(id, user.id)
    .first();
  if (!puzzle) return c.json({ error: 'Puzzle not found' }, 404);
  if (puzzle.solved) return c.json({ error: 'Already solved' }, 400);

  let isCorrect = false;

  if (puzzle.type === 'map_coloring') {
    try {
      const coloring = typeof answer === 'string' ? JSON.parse(answer) : answer;
      const data = JSON.parse(puzzle.puzzle_data as string);
      const edges = data.edges;

      let valid = true;
      let colorsUsed = new Set();

      for (const [u, v] of edges) {
        if (coloring[u] === undefined || coloring[v] === undefined) {
          valid = false; break;
        }
        if (coloring[u] === coloring[v]) {
          valid = false; break;
        }
        colorsUsed.add(coloring[u]);
        colorsUsed.add(coloring[v]);
      }

      if (valid && colorsUsed.size <= 4) {
        isCorrect = true;
      }
    } catch (e) {
      isCorrect = false;
    }
  } else {
    isCorrect = String(answer).trim().toLowerCase() === String(puzzle.answer).toLowerCase();
  }

  if (isCorrect) {
    const baseScore = 100;
    const scoreEarned = baseScore * (puzzle.multiplier as number);

    await c.env.DB.prepare('UPDATE generated_puzzles SET solved = 1 WHERE id = ?').bind(id).run();
    await c.env.DB.prepare('INSERT INTO solved_puzzles (user_id, puzzle_id, score_earned) VALUES (?, ?, ?)').bind(user.id, id, scoreEarned).run();

    // Update user score and rank
    await c.env.DB.prepare('UPDATE users SET score = score + ? WHERE id = ?').bind(scoreEarned, user.id).run();

    const updatedUser = await c.env.DB.prepare('SELECT score FROM users WHERE id = ?').bind(user.id).first();
    let newRank = 'Recruit';
    if ((updatedUser.score as number) >= 1000) newRank = 'Director';
    else if ((updatedUser.score as number) >= 500) newRank = 'Special Agent';
    else if ((updatedUser.score as number) >= 200) newRank = 'Field Agent';

    await c.env.DB.prepare('UPDATE users SET rank = ? WHERE id = ?').bind(newRank, user.id).run();

    return c.json({ correct: true, scoreEarned, newRank });
  } else {
    return c.json({ correct: false });
  }
});

app.get('/leaderboard', async (c) => {
  const { results: topUsers } = await c.env.DB.prepare('SELECT username, score, rank FROM users ORDER BY score DESC LIMIT 10').all();
  return c.json({ leaderboard: topUsers });
});

export default app;
