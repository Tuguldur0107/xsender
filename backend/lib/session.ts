// backend/lib/session.ts
import pool from './db';

export async function getSessionStep(fb_id: string): Promise<string | null> {
  const res = await pool.query(
    'SELECT step FROM session_state WHERE fb_id = $1',
    [fb_id]
  );
  return res.rows[0]?.step || null;
}

export async function updateSessionStep(fb_id: string, step: string) {
  await pool.query(
    `INSERT INTO session_state (fb_id, step)
     VALUES ($1, $2)
     ON CONFLICT (fb_id) DO UPDATE SET step = EXCLUDED.step`,
    [fb_id, step]
  );
}
