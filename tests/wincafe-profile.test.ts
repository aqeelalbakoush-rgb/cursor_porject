import * as assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  WINCAFE_APP_ID,
  WINCAFE_DB_FILENAME,
  WINCAFE_DB_INITIALIZED_MARKER,
  WINCAFE_PRODUCT_NAME,
  isFloCafeDataDirectory,
  wincafeLocalBackupDir,
  wincafeUserDataPath,
} from '../main/wincafe-profile';

const root = path.join(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')) as {
  productName?: string;
  build?: {
    appId?: string;
    productName?: string;
    publish?: unknown;
    nsis?: { guid?: string };
    appx?: { identityName?: string; publisher?: string; displayName?: string };
    linux?: { desktop?: { entry?: { StartupWMClass?: string } } };
  };
};
const indexSource = fs.readFileSync(path.join(root, 'main/index.ts'), 'utf8');

const appData = path.join(path.sep, 'cafe-app-data');
const userData = wincafeUserDataPath(appData);
assert.equal(path.basename(userData), 'WinCafe');
assert.equal(userData, path.join(path.resolve(appData), 'WinCafe'));
assert.equal(userData.includes('flo-desktop'), false);
assert.equal(userData.includes(`${path.sep}FloCafe`), false);

assert.equal(
  wincafeLocalBackupDir('/home/cafe/Documents'),
  path.join('/home/cafe/Documents', 'WinCafe', 'Backups'),
);
assert.equal(WINCAFE_DB_FILENAME, 'wincafe.db');
assert.equal(WINCAFE_DB_INITIALIZED_MARKER, '.wincafe-db-initialized');
assert.equal(WINCAFE_APP_ID, 'com.wintech.wincafe');
assert.equal(WINCAFE_PRODUCT_NAME, 'WinCafe');

assert.equal(pkg.productName, 'WinCafe');
assert.equal(pkg.build?.appId, 'com.wintech.wincafe');
assert.equal(pkg.build?.productName, 'WinCafe');
assert.equal(pkg.build?.nsis?.guid, '0f03cf21-96e9-5a83-b4b4-de01b19f1257');
assert.notEqual(pkg.build?.nsis?.guid, 'c95cad89-67c3-5c8b-a1a1-15045c58de61');
assert.equal(pkg.build?.publish, null);
assert.equal(pkg.build?.appx?.identityName, 'WinTech.WinCafe');
assert.equal(pkg.build?.appx?.publisher, 'CN=WinTech');
assert.equal(pkg.build?.appx?.displayName, 'WinCafe');
assert.equal(pkg.build?.linux?.desktop?.entry?.StartupWMClass, 'WinCafe');
assert.equal(isFloCafeDataDirectory('/tmp/flo-desktop'), true);
assert.equal(isFloCafeDataDirectory('/tmp/Flo Cafe'), true);
assert.equal(isFloCafeDataDirectory('/tmp/FloCafe'), true);
assert.equal(isFloCafeDataDirectory('/tmp/WinCafe'), false);
assert.equal(indexSource.includes('isFloCafeDataDirectory('), true);
const logInitAt = indexSource.indexOf('log.initialize()');
const setNameAt = indexSource.indexOf('app.setName(WINCAFE_PRODUCT_NAME)');
assert.ok(setNameAt !== -1 && logInitAt !== -1 && setNameAt < logInitAt);

assert.equal(indexSource.includes("app.name = 'flo-desktop'"), false);
assert.equal(indexSource.includes("'.config', 'flo-desktop'"), false);
const lockAt = indexSource.indexOf('app.requestSingleInstanceLock()');
const isolateAt = indexSource.indexOf('wincafeUserDataPath(');
assert.ok(isolateAt !== -1 && lockAt !== -1 && isolateAt < lockAt);

console.log('wincafe profile isolation ok');
