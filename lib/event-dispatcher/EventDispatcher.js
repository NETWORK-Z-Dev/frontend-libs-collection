class EventDispatcher {
    static events = new Map();

    static on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(callback);
        return () => this.off(event, callback);
    }

    static off(event, callback) {
        const listeners = this.events.get(event);
        if (!listeners) return;
        listeners.delete(callback);
        if (listeners.size === 0) {
            this.events.delete(event);
        }
    }

    static async send(event, data = null) {
        const listeners = this.events.get(event);
        if (!listeners) return [];

        // remember the original data
        const originals = {};
        for (const key in data) {
            if (data[key] !== null && typeof data[key] === "object") {
                originals[key] = data[key];
            }
        }

        // execute all listener callbacks
        const results = [];
        for (const callback of listeners) {
            results.push(await callback(data));
        }

        // update the originals
        for (const key in originals) {
            if (data[key] !== originals[key]) {
                const original = originals[key];
                const updated = data[key];

                if (updated === null || typeof updated !== "object") continue;

                for (const property of Object.keys(original)) delete original[property];
                Object.assign(original, updated);
            }
        }

        return results;
    }
}