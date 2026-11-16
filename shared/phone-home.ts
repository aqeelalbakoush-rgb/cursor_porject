/**
 * WinCafe phone-home gate. Default off.
 *
 * Covers telemetry.flopos.com, blue.flopos.com cloud auto-register, PostHog,
 * the upstream GitHub auto-updater, and FloCafe-Plugins catalog fetches.
 * The code paths stay; they do not run unless this returns true.
 *
 * Turn on with WINCAFE_PHONE_HOME=1 or settings.phone_home_enabled=true.
 * WINCAFE_PHONE_HOME=0 forces it off. FLO_TELEMETRY_DEV and FLO_POSTHOG_DEV
 * remain the existing developer opt-ins used by the upstream test suite.
 */
export function phoneHomeEnabled(setting?: string | null): boolean {
  const flag = process.env.WINCAFE_PHONE_HOME?.trim().toLowerCase();
  if (flag === '0' || flag === 'false' || flag === 'off') return false;
  if (flag === '1' || flag === 'true' || flag === 'on') return true;
  if (process.env.FLO_TELEMETRY_DEV === '1' || process.env.FLO_POSTHOG_DEV === '1') return true;
  if (setting === '1' || setting === 'true') return true;
  if (setting === '0' || setting === 'false') return false;
  return false;
}
