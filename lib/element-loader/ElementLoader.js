class ElementLoader {
    static instances = new Map();

    static start(element, {
        style = "linear",
        color = "#f1f1f1",
        height = 2,
        gap = 2,
        speed = 2,
        barWidth = 30,
        value = null,
        duration = null,
        mode = "auto"
    } = {}) {
        if (!element) return;
        this.stop(element);

        const computed = getComputedStyle(element);
        const original = {
            position: element.style.position
        };

        if (computed.position === "static") {
            element.style.position = "relative";
        }

        const clip = document.createElement("div");
        Object.assign(clip.style, {
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "0",
            height: height + "px",
            pointerEvents: "none",
            overflow: "hidden"
        });

        const bar = document.createElement("div");
        Object.assign(bar.style, {
            position: "absolute",
            left: "0",
            top: "0",
            height: "100%",
            background: color,
            willChange: "width,left"
        });

        clip.appendChild(bar);
        element.appendChild(clip);

        const inst = {
            bar,
            clip,
            raf: null,
            value,
            duration,
            startTime: null,
            original
        };

        const getWidth = () => clip.getBoundingClientRect().width;

        const getBarWidth = () => {
            const percent = parseFloat(barWidth ?? 30);
            return getWidth() * Math.max(0, Math.min(100, percent)) / 100;
        };

        let pos = 0;
        let dir = 1;
        let progress = 0;

        const step = (t) => {
            if (!element.isConnected) {
                ElementLoader.stop(element);
                return;
            }

            const width = getWidth();
            const barPx = getBarWidth();

            if (style === "linear") {
                if (inst.value !== null) {
                    bar.style.left = "0px";
                    bar.style.width = width * Math.max(0, Math.min(100, inst.value)) / 100 + "px";
                } else if (inst.duration !== null) {
                    if (inst.startTime === null) inst.startTime = t;

                    const p = Math.min((t - inst.startTime) / inst.duration, 1);
                    bar.style.left = "0px";
                    bar.style.width = width * p + "px";
                } else {
                    progress += speed;
                    if (progress > barPx) progress = 0;

                    bar.style.left = "0px";
                    bar.style.width = progress + "px";
                }
            }

            if (style === "marquee") {
                bar.style.width = barPx + "px";

                const max = Math.max(0, width - barPx);
                pos += speed * dir;

                if (pos >= max) {
                    pos = max;
                    dir = -1;
                }

                if (pos <= 0) {
                    pos = 0;
                    dir = 1;
                }

                bar.style.left = pos + "px";
            }

            if (style === "slide") {
                bar.style.width = barPx + "px";

                pos += speed;

                if (pos > width) pos = -barPx;

                bar.style.left = pos + "px";
            }

            inst.raf = requestAnimationFrame(step);
        };

        if (style === "slide") pos = -getBarWidth();

        this.instances.set(element, inst);
        inst.raf = requestAnimationFrame(step);
    }

    static setValue(element, value) {
        const inst = this.instances.get(element);
        if (!inst) return;
        inst.value = value;
    }

    static stop(element) {
        const inst = this.instances.get(element);
        if (!inst) return;

        cancelAnimationFrame(inst.raf);
        inst.clip.remove();
        element.style.position = inst.original.position;
        this.instances.delete(element);
    }
}