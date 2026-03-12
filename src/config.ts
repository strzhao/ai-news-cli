import { homedir } from "node:os";
import { join } from "node:path";

export const API_BASE_URL =
  process.env.AI_NEWS_API_URL ?? "https://ai-news.stringzhao.life";

export const CONFIG_DIR = join(homedir(), ".config", "ai-news");
export const CREDENTIALS_PATH = join(CONFIG_DIR, "credentials.json");
