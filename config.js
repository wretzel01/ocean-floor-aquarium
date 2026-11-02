export const DAY_DURATION = 24000;                              // 24 seconds per day
export const DAYS_PER_SEASON = 5;                                // 5 days per season
export const SEASON_DURATION = DAY_DURATION * DAYS_PER_SEASON;   // 120,000ms
export const YEAR_DURATION = SEASON_DURATION * 4;               // 480,000ms

export const SEASONS_ORDER = ["Spring", "Summer", "Fall", "Winter"];

export const SEASONAL_PALETTES = {
  // Spring: Blue / Yellow / Green
  Spring: {
    waterNight: [10, 40, 70, 0.94],     // Deep Ocean Blue
    waterDay:   [40, 160, 110, 0.75],   // Vibrant Teal-Green
    sandBase:   [160, 175, 60]          // Warm Mossy Yellow-Green
  },
  
  // Summer: Yellow / Orange / Red
  Summer: {
    waterNight: [80, 20, 30, 0.92],     // Deep Crimson Red
    waterDay:   [220, 120, 40, 0.70],   // Warm Fiery Orange
    sandBase:   [210, 170, 50]          // Bright Sunlit Yellow
  },
  
  // Fall: Orange / Purple / Blue
  Fall: {
    waterNight: [35, 20, 65, 0.95],     // Deep Indigo Blue
    waterDay:   [125, 45, 120, 0.80],   // Dusky Purple / Violet
    sandBase:   [180, 85, 40]           // Warm Burnt Amber/Orange
  },
  
  // Winter: Light Blue / Blue / Dark Blue
  Winter: {
    waterNight: [2, 10, 30, 0.98],      // Deep Midnight Navy
    waterDay:   [20, 85, 160, 0.88],    // Vibrant Oceanic Blue
    sandBase:   [120, 185, 225]         // Glacial Light Blue
  }
};