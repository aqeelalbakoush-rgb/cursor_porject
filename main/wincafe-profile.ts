import path from 'path';

/** Electron and NSIS identity. Distinct from FloCafe (`com.flo.desktop`). */
export const WINCAFE_APP_ID = 'com.wintech.wincafe';
export const WINCAFE_PRODUCT_NAME = 'WinCafe';

/**
 * Directory under the OS app-data root (`%APPDATA%` on Windows,
 * `~/Library/Application Support` on macOS, `$XDG_CONFIG_HOME` on Linux).
 */
export const WINCAFE_USER_DATA_DIR_NAME = 'WinCafe';
export const WINCAFE_DB_FILENAME = 'wincafe.db';
export const WINCAFE_DB_INITIALIZED_MARKER = '.wincafe-db-initialized';

/** Directory names FloCafe uses for its own profile. */
const FLOCAFE_DATA_DIR_NAMES = new Set(['flo-desktop', 'Flo Cafe', 'FloCafe']);

export function isFloCafeDataDirectory(dir: string): boolean {
  return FLOCAFE_DATA_DIR_NAMES.has(path.basename(path.resolve(dir)));
}

export function wincafeUserDataPath(appDataDir: string): string {
  return path.join(path.resolve(appDataDir), WINCAFE_USER_DATA_DIR_NAME);
}

/** Daily backups outside the profile. Never `Documents/FloCafe`. */
export function wincafeLocalBackupDir(root: string): string {
  return path.join(root, WINCAFE_PRODUCT_NAME, 'Backups');
}
