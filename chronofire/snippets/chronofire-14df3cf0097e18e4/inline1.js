
        export function cf_level_save(key, val) {
            try { window.localStorage.setItem(key, val); return true; } catch (e) { return false; }
        }
        export function cf_level_load(key) {
            try { return window.localStorage.getItem(key) || ''; } catch (e) { return ''; }
        }
    