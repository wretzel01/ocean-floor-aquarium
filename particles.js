const PARTICLE_COUNT = 60;
const particles = [];

export function initParticles(width, height) {
  particles.length = 0;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      baseVx: (Math.random() - 0.5) * 0.05,
      baseVy: (Math.random() * 0.04 + 0.01),
      alpha: Math.random() * 0.5 + 0.2
    });
  }
}

export function updateAndDrawParticles(ctx, canvas, tickDelta, seasonName, sunPosition) {
  let particleColor = [255, 255, 255];
  let activeCount = PARTICLE_COUNT;

    if (seasonName === "Spring") {
    particleColor = [180, 240, 120];  // Bright Spring Yellow-Green
    activeCount = 55;
    } else if (seasonName === "Summer") {
    particleColor = [255, 200, 100];  // Sun-lit Golden Amber
    activeCount = 30;
    } else if (seasonName === "Fall") {
    particleColor = [210, 140, 240];  // Soft Glowing Violet
    activeCount = 45;
    } else if (seasonName === "Winter") {
    particleColor = [180, 225, 255];  // Crisp Ice Blue
    activeCount = 20;
    }

  const nightFade = 0.15 + (1.0 - 0.15) * sunPosition;

  for (let i = 0; i < activeCount; i++) {
    const p = particles[i];

    p.x += p.baseVx * tickDelta;
    p.y += p.baseVy * tickDelta;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, ${p.alpha * nightFade})`;
    ctx.fill();
  }
}