import { DAY_DURATION, DAYS_PER_SEASON, SEASON_DURATION, YEAR_DURATION, SEASONS_ORDER, SEASONAL_PALETTES } from './config.js';

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(colorA, colorB, t) {
  return [
    Math.round(lerp(colorA[0], colorB[0], t)),
    Math.round(lerp(colorA[1], colorB[1], t)),
    Math.round(lerp(colorA[2], colorB[2], t)),
    lerp(colorA[3], colorB[3], t)
  ];
}

export function calculateSeasonalState(simulatedTime) {
  const yearProgress = (simulatedTime % YEAR_DURATION) / YEAR_DURATION;
  const currentSeasonIndex = Math.floor(yearProgress * 4);
  const nextSeasonIndex = (currentSeasonIndex + 1) % 4;

  const currentSeasonName = SEASONS_ORDER[currentSeasonIndex];
  const nextSeasonName = SEASONS_ORDER[nextSeasonIndex];

  const seasonTime = (simulatedTime % SEASON_DURATION);
  const seasonProgress = seasonTime / SEASON_DURATION;

  const currentDay = Math.floor(seasonTime / DAY_DURATION) + 1;
  const dayProgress = (simulatedTime % DAY_DURATION) / DAY_DURATION;

  // Interpolate seasonal presets
  const currPalette = SEASONAL_PALETTES[currentSeasonName];
  const nextPalette = SEASONAL_PALETTES[nextSeasonName];

  const activeDayWater = lerpColor(currPalette.waterDay, nextPalette.waterDay, seasonProgress);
  const activeNightWater = lerpColor(currPalette.waterNight, nextPalette.waterNight, seasonProgress);
  const activeSandBase = lerpColor(currPalette.sandBase, nextPalette.sandBase, seasonProgress);

  const sunPosition = (Math.sin((dayProgress * Math.PI * 2) - (Math.PI / 2)) + 1) / 2;
  const activeFrameWater = lerpColor(activeNightWater, activeDayWater, sunPosition);
  const sandDimming = lerp(0.25, 1.0, sunPosition);

  // Time label
  let timeLabel = "Night";
  if (sunPosition > 0.8) timeLabel = "Noon";
  else if (sunPosition > 0.3 && dayProgress < 0.5) timeLabel = "Morning";
  else if (sunPosition > 0.3 && dayProgress >= 0.5) timeLabel = "Evening";

  return {
    currentSeasonName,
    currentDay,
    timeLabel,
    sunPosition,
    activeFrameWater,
    activeSandBase: [
      Math.round(activeSandBase[0] * sandDimming),
      Math.round(activeSandBase[1] * sandDimming),
      Math.round(activeSandBase[2] * sandDimming)
    ]
  };
}