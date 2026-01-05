export type RoomConfig = {
  onsig: string[];
  offsig: string[];
  brightupsig: string[];
  brightlowsig: string[];
  lights: string[];
};

export const lightPopup: Record<string, RoomConfig> = {
  kitchen: {
    lights: ['ceiling', 'upper cabinets'],
    onsig: ['8', '27'],
    offsig: ['7', '28'],
    brightupsig: ['5', '6'],
    brightlowsig: ['7', '8'],
  },
  livingroom: {
    lights: ['Main', 'Lamps'],
    onsig: ['3', '4'],
    offsig: ['3', '4'],
    brightupsig: ['5', '6'],
    brightlowsig: ['7', '8'],
  },
};
