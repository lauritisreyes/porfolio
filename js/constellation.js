// 🌌 Floating constellation (Obsidian-like graph) for the "Unverified Human" gallery item
window.addEventListener('load', function () {
    var canvas = document.querySelector('.constellation');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Seeded random so the illustration always looks the same
    var seed = 7;
    function random() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    }

    // 👉🏻 Nodes, in unit-disc coordinates
    var NODE_COUNT = 62;
    var nodes = [];
    var tries = 0;
    while (nodes.length < NODE_COUNT && tries < 5000) {
        tries++;
        var angle = random() * Math.PI * 2;
        var dist = Math.sqrt(random());
        var x = Math.cos(angle) * dist;
        var y = Math.sin(angle) * dist;
        var tooClose = nodes.some(function (n) {
            return Math.hypot(n.x - x, n.y - y) < 0.12;
        });
        if (tooClose) continue;
        var shade = random();
        nodes.push({
            x: x,
            y: y,
            color: shade < 0.6 ? '#ffffff' : shade < 0.8 ? '#a8a8a8' : '#6a6a6a',
            radius: shade < 0.6 ? 3.2 : 3,
            // Each node floats on its own slow orbit
            ampX: 0.04 + random() * 0.045,
            ampY: 0.04 + random() * 0.045,
            speedX: 0.45 + random() * 0.5,
            speedY: 0.45 + random() * 0.5,
            phaseX: random() * Math.PI * 2,
            phaseY: random() * Math.PI * 2
        });
    }

    // 👉🏻 Edges: link each node to its nearest neighbours, leaving some loose
    var edges = [];
    var linked = {};
    function link(a, b) {
        var key = a < b ? a + '-' + b : b + '-' + a;
        if (linked[key]) return;
        linked[key] = true;
        edges.push([a, b]);
    }
    nodes.forEach(function (node, i) {
        var roll = random();
        var count = roll < 0.12 ? 0 : roll < 0.75 ? 1 : 2;
        var neighbours = nodes
            .map(function (other, j) {
                return { j: j, d: Math.hypot(other.x - node.x, other.y - node.y) };
            })
            .filter(function (n) { return n.j !== i && n.d < 0.45; })
            .sort(function (a, b) { return a.d - b.d; });
        for (var k = 0; k < count && k < neighbours.length; k++) {
            link(i, neighbours[k].j);
        }
    });

    // 👉🏻 Canvas sizing
    var width = 0;
    var height = 0;
    function resize() {
        var rect = canvas.getBoundingClientRect();
        var dpr = window.devicePixelRatio || 1;
        width = rect.width;
        height = rect.height;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (reducedMotion) draw(0);
    }

    // 👉🏻 Drawing
    function draw(time) {
        var t = time / 1000;
        var scale = Math.min(width, height) * 0.36;
        var cx = width / 2;
        var cy = height / 2;
        var points = nodes.map(function (n) {
            return {
                x: cx + (n.x + Math.sin(t * n.speedX + n.phaseX) * n.ampX) * scale,
                y: cy + (n.y + Math.cos(t * n.speedY + n.phaseY) * n.ampY) * scale
            };
        });

        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        edges.forEach(function (e) {
            ctx.moveTo(points[e[0]].x, points[e[0]].y);
            ctx.lineTo(points[e[1]].x, points[e[1]].y);
        });
        ctx.stroke();

        nodes.forEach(function (n, i) {
            ctx.fillStyle = n.color;
            ctx.beginPath();
            ctx.arc(points[i].x, points[i].y, n.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // 👉🏻 Only animate while visible
    var frame = null;
    function loop(time) {
        draw(time);
        frame = requestAnimationFrame(loop);
    }
    function start() {
        if (!frame && !reducedMotion) frame = requestAnimationFrame(loop);
    }
    function stop() {
        if (frame) cancelAnimationFrame(frame);
        frame = null;
    }

    resize();
    window.addEventListener('resize', resize);

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            entries[0].isIntersecting ? start() : stop();
        }).observe(canvas);
    } else {
        start();
    }
});
