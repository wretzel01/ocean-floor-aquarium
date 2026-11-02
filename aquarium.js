import { DAYS_PER_SEASON } from './config.js';
import { calculateSeasonalState } from './seasonalLogic.js';
import { initParticles, updateAndDrawParticles } from './particles.js';
import { setupDevKeys } from './devKeys.js';

const canvas = document.getElementById('aquariumCanvas');
const ctx = canvas.getContext('2d');

const seasonDisplay = document.getElementById('season-display');
const dayDisplay = document.getElementById('day-display');
const clockDisplay = document.getElementById('clock-display');
const speedDisplay = document.getElementById('speed-display');

// Global Simulation State
const simState = {
  simulatedTime: 0,
  timeScale: 1,
  isPaused: false
};

let lastRealTimestamp = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles(canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
setupDevKeys(simState);

function render(timestamp) {
  if (!lastRealTimestamp) lastRealTimestamp = timestamp;
  const realDelta = timestamp - lastRealTimestamp;
  lastRealTimestamp = timestamp;

  const tickDelta = simState.isPaused ? 0 : realDelta * simState.timeScale;
  simState.simulatedTime += tickDelta;

  // 1. Compute Seasonal Environment State
  const season = calculateSeasonalState(simState.simulatedTime);

  // 2. Update UI
  seasonDisplay.innerText = season.currentSeasonName;
  dayDisplay.innerText = `${season.currentDay} / ${DAYS_PER_SEASON}`;
  clockDisplay.innerText = season.timeLabel;
  speedDisplay.innerText = simState.isPaused ? "PAUSED" : `${simState.timeScale}x`;

  // 3. Clear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 4. Render Seabed Sand
  const [sR, sG, sB] = season.activeSandBase;
  ctx.fillStyle = `rgb(${sR}, ${sG}, ${sB})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 5. Render Tinted Water Layer
  const [wR, wG, wB, wA] = season.activeFrameWater;
  ctx.fillStyle = `rgba(${wR}, ${wG}, ${wB}, ${wA})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 6. Render Seasonal Particles
  updateAndDrawParticles(ctx, canvas, tickDelta, season.currentSeasonName, season.sunPosition);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);