
        export function cf_load_storage(key) {
            try { return window.localStorage.getItem(key); } catch (_) { return null; }
        }
        export function cf_save_storage(key, val) {
            try { window.localStorage.setItem(key, val); } catch (_) {}
        }
    