import { QueryResult, QueryResultRow } from "pg";

import { Wallpaper } from "@/types/wallpaper";
import { getDb } from "./db";

export async function insertWallpaper(wallpaper: Wallpaper) {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO wallpapers 
        (user_email, img_description, img_size, img_url, llm_name, llm_params, created_at) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7)
    `,
    [
      wallpaper.user_email,
      wallpaper.img_description,
      wallpaper.img_size,
      wallpaper.img_url,
      wallpaper.llm_name,
      wallpaper.llm_params,
      wallpaper.created_at,
    ]
  );

  return res;
}

export async function getWallpapers(
  page: number,
  limit: number
): Promise<Wallpaper[] | undefined> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from wallpapers as w left join users as u on w.user_email = u.email order by w.created_at desc limit $1 offset $2`,
    [limit, offset]
  );
  if (res.rowCount === 0) {
    return undefined;
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
  };

  if (row.user_name || row.user_avatar) {
    wallpaper.created_user = {
      email: row.user_email,
      nickname: row.user_name,
      avatar_url: row.user_avatar,
    };
  }

  try {
    wallpaper.llm_params = JSON.parse(JSON.stringify(wallpaper.llm_params));
  } catch (e) {
    console.log("parse wallpaper llm_params failed: ", e);
  }

  return wallpaper;
}
