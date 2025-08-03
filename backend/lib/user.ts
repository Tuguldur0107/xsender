import pool from './db';

export async function upsertUser(fb_id: string, fb_name: string) {
  await pool.query(
    `INSERT INTO users (fb_id, fb_name, last_active)
     VALUES ($1, $2, NOW())
     ON CONFLICT (fb_id) DO UPDATE
     SET fb_name = EXCLUDED.fb_name,
         last_active = NOW()`,
    [fb_id, fb_name]
  );
}

export async function saveEtaxRegister(fb_id: string, register: string) {
  await pool.query(
    `UPDATE users SET etax_register = $2 WHERE fb_id = $1`,
    [fb_id, register]
  );
}

export async function saveEtaxPassword(fb_id: string, password: string) {
  await pool.query(
    `UPDATE users SET etax_password = $2 WHERE fb_id = $1`,
    [fb_id, password]
  );
}

export async function saveEtax2FAMethod(fb_id: string, method: string) {
  await pool.query(
    `UPDATE users SET etax_2fa_method = $2 WHERE fb_id = $1`,
    [fb_id, method]
  );
}
