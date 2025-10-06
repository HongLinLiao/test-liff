import { cookies } from "next/headers";

import { environment } from "./environment";

export enum CookieKey {
  JWT = "sys_k",
}

export interface CookieValueTypes {
  [CookieKey.JWT]: string;
}

export interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  path?: string;
  domain?: string;
}

const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: environment.env !== "local",
  sameSite: "strict",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export async function setCookie<K extends CookieKey>(
  key: K,
  value: CookieValueTypes[K],
  options: CookieOptions = {}
): Promise<void> {
  const cookieStore = await cookies();
  const serializedValue =
    typeof value === "string" ? value : JSON.stringify(value);
  const cookieOptions = { ...DEFAULT_COOKIE_OPTIONS, ...options };

  cookieStore.set(key, serializedValue, cookieOptions);
}

export async function getCookie<K extends CookieKey>(
  key: K
): Promise<CookieValueTypes[K] | null> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(key);

    if (!cookie?.value) {
      return null;
    }

    if (key === CookieKey.JWT) {
      return cookie.value as CookieValueTypes[K];
    }

    try {
      return JSON.parse(cookie.value) as CookieValueTypes[K];
    } catch {
      return cookie.value as CookieValueTypes[K];
    }
  } catch (error) {
    console.error(`Error getting cookie ${key}:`, error);
    return null;
  }
}

export async function deleteCookie(key: CookieKey): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(key);
}

export async function hasCookie(key: CookieKey): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has(key);
}

export async function getAllCookies(): Promise<Map<string, string>> {
  const cookieStore = await cookies();
  const result = new Map<string, string>();

  cookieStore.getAll().forEach(cookie => {
    result.set(cookie.name, cookie.value);
  });

  return result;
}

export async function clearCookies(keys: CookieKey[]): Promise<void> {
  const cookieStore = await cookies();

  for (const key of keys) {
    cookieStore.delete(key);
  }
}
