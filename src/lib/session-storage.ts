export enum SessionStorageKey {
  IsDisableSidebar = "isDisableSidebar",
}

interface SessionStorageSchema {
  [SessionStorageKey.IsDisableSidebar]: boolean;
}

function isClient(): boolean {
  return typeof window !== "undefined" && typeof sessionStorage !== "undefined";
}

export function setItem<K extends keyof SessionStorageSchema>(
  key: K,
  value: SessionStorageSchema[K]
): void {
  if (!isClient()) {
    console.warn("SessionStorage is not available in this environment");
    return;
  }

  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Failed to set session storage item ${key}:`, error);
  }
}

export function getItem<K extends keyof SessionStorageSchema>(
  key: K
): SessionStorageSchema[K] | null {
  if (!isClient()) {
    console.warn("SessionStorage is not available in this environment");
    return null;
  }

  try {
    const item = sessionStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as SessionStorageSchema[K];
  } catch (error) {
    console.error(`Failed to get session storage item ${key}:`, error);
    return null;
  }
}

export function updateItem<K extends keyof SessionStorageSchema>(
  key: K,
  value: SessionStorageSchema[K]
): void {
  setItem(key, value);
}

export function removeItem<K extends keyof SessionStorageSchema>(key: K): void {
  if (!isClient()) {
    console.warn("SessionStorage is not available in this environment");
    return;
  }

  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove session storage item ${key}:`, error);
  }
}

export function clear(): void {
  if (!isClient()) {
    console.warn("SessionStorage is not available in this environment");
    return;
  }

  try {
    sessionStorage.clear();
  } catch (error) {
    console.error("Failed to clear session storage:", error);
  }
}

export function hasItem<K extends keyof SessionStorageSchema>(key: K): boolean {
  if (!isClient()) {
    return false;
  }

  return sessionStorage.getItem(key) !== null;
}

export function getAllKeys(): string[] {
  if (!isClient()) {
    return [];
  }

  const keys: string[] = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key) {
      keys.push(key);
    }
  }
  return keys;
}

export function size(): number {
  if (!isClient()) {
    return 0;
  }

  return sessionStorage.length;
}
