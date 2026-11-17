import path from 'path';

/** Electron and NSIS identity. Distinct from FloCafe (`com.flopos.desktop` / `flo-desktop`). */
export const WINCAFE_APP_ID = 'com.wintech.wincafe';
export const WINCAFE_PRODUCT_NAME = 'WinCafe';

/**
 * Directory under the OS app-data root (`%APPDATA%` on Windows,
 * `~/Library/Application Support` on macOS, `$XDG_CONFIG_HOME` on Linux).
 */
export const WINCAFE_USER_DATA_DIR_NAME = 'WinCafe';
export const WINCAFE_DB_FILENAME = 'wincafe.db';
export const WINCAFE_DB_INITIALIZED_MARKER = '.wincafe-db-initialized';

/** FloCafe profile names this app must never open or create. */
const FLOCAFE_DATA_DIR_NAMES = new Set(['flo-desktop', 'Flo Cafe', 'FloCafe']);

export function wincafeUserDataPath(appDataDir: string): string {
  const userData = path.join(path.resolve(appDataDir), WINCAFE_USER_DATA_DIR_NAME);
  if (FLOCAFE_DATA_DIR_NAMES.has(path.basename(userData))) {
    throw new Error('WinCafe user data must not use a FloCafe directory');
  }
  return userData;
}

/** Daily backups outside the profile. Never `Documents/FloCafe`. */
export function wincafeLocalBackupDir(root: string): string {
  return path.join(root, WINCAFE_PRODUCT_NAME, 'Backups');
}
