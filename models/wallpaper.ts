import { QueryResult, QueryResultRow } from "pg";

import { Wallpaper } from "@/types/wallpaper";
import { getDb } from "./db";

export async function insertWallpaper(wallpaper: Wallpaper) {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO wallpapers 
        (user_email, img_description, img_size, img_url, llm_name, llm_params, created_at, uuid) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
    [
      wallpaper.user_email,
      wallpaper.img_description,
      wallpaper.img_size,
      wallpaper.img_url,
      wallpaper.llm_name,
      wallpaper.llm_params,
      wallpaper.created_at,
      wallpaper.uuid,
    ]
  );

  return res;
}

export async function getWallpapersCount(): Promise<number> {
  const db = getDb();
  const res = await db.query(`SELECT count(1) as count FROM wallpapers`);
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

export async function getUserWallpapersCount(
  user_email: string
): Promise<number> {
  const db = getDb();
  const res = await db.query(
    `SELECT count(1) as count FROM wallpapers WHERE user_email = $1`,
    [user_email]
  );
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

export async function findWallpaperById(
  id: number
): Promise<Wallpaper | undefined> {
  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from wallpapers as w left join users as u on w.user_email = u.email where w.id = $1`,
    [id]
  );
  if (res.rowCount === 0) {
    return;
  }

  const wallpaper = formatWallpaper(res.rows[0]);

  return wallpaper;
}

export async function findWallpaperByUuid(
  uuid: string
): Promise<Wallpaper | undefined> {
  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from wallpapers as w left join users as u on w.user_email = u.email where w.uuid = $1`,
    [uuid]
  );
  if (res.rowCount === 0) {
    return;
  }

  const wallpaper = formatWallpaper(res.rows[0]);

  return wallpaper;
}

export async function getRandWallpapers(
  page: number,
  limit: number
): Promise<Wallpaper[]> {
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from wallpapers as w left join users as u on w.user_email = u.email order by random() limit $1 offset $2`,
    [limit, offset]
  );

  if (res.rowCount === 0) {
    return [];
  }

  const wallpapers = getWallpapersFromSqlResult(res);

  return wallpapers;
}

export async function getWallpapers(
  page: number,
  limit: number
): Promise<Wallpaper[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from wallpapers as w left join users as u on w.user_email = u.email order by w.created_at desc limit $1 offset $2`,
    [limit, offset]
  );
  if (res.rowCount === 0) {
    return [];
  }

  const wallpapers = getWallpapersFromSqlResult(res);

  return wallpapers;
}

export function getWallpapersFromSqlResult(
  res: QueryResult<QueryResultRow>
): Wallpaper[] {
  if (!res.rowCount || res.rowCount === 0) {
    return [];
  }

  const wallpapers: Wallpaper[] = [];
  const { rows } = res;
  rows.forEach((row) => {
    const wallpaper = formatWallpaper(row);
    if (wallpaper) {
      wallpapers.push(wallpaper);
    }
  });

  return wallpapers;
}

export function formatWallpaper(row: QueryResultRow): Wallpaper | undefined {
  let wallpaper: Wallpaper = {
    id: row.id,
    user_email: row.user_email,
    img_description: row.img_description,
    img_size: row.img_size,
    img_url: row.img_url,
    llm_name: row.llm_name,
    llm_params: row.llm_params,
    created_at: row.created_at,
    uuid: row.uuid,
  };

  if (row.user_name || row.user_avatar) {
    wallpaper.created_user = {
      email: row.user_email,
      nickname: row.user_name,
      avatar_url: row.user_avatar,
      uuid: row.user_uuid,
    };
  }

  try {
    wallpaper.llm_params = JSON.parse(JSON.stringify(wallpaper.llm_params));
  } catch (e) {
    console.log("parse wallpaper llm_params failed: ", e);
  }

  return wallpaper;
}
