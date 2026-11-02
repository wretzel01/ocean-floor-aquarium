import { DAY_DURATION, SEASON_DURATION, YEAR_DURATION } from './config.js';

export function setupDevKeys(state) {
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (e.code === 'Space') {
      state.isPaused = !state.isPaused;
    } else if (key === '+' || key === '=') {
      state.timeScale = Math.min(state.timeScale * 2, 32);
    } else if (key === '-' || key === '_') {
      state.timeScale = Math.max(state.timeScale / 2, 0.25);
    } else if (key === 'a') {
      state.simulatedTime = Math.max(0, state.simulatedTime - DAY_DURATION);
    } else if (key === 'd') {
      state.simulatedTime += DAY_DURATION;
    } else if (key === 's') {
      state.simulatedTime += SEASON_DURATION;
    } else if (key === '1') jumpToSeason(state, 0);
    else if (key === '2') jumpToSeason(state, 1);
    else if (key === '3') jumpToSeason(state, 2);
    else if (key === '4') jumpToSeason(state, 3);
  });
}

function jumpToSeason(state, seasonIndex) {
  const currentYear = Math.floor(state.simulatedTime / YEAR_DURATION);
  state.simulatedTime = (currentYear * YEAR_DURATION) + (seasonIndex * SEASON_DURATION);
}