export type RoomConfig = {
  onsig: string[];
  offsig: string[];
  brightupsig: string[];
  brightlowsig: string[];
  lights: string[];
   label: string;
  tilebtnon: string;
  tilebtnoff: string;

};

export const lightPopup: Record<string, RoomConfig> = {
  kitchen: { // key is room ID
    label: 'Kitchen',
    lights: ['ceiling', 'upper cabinets'],
    tilebtnon: '8',
    tilebtnoff: '7',
    onsig: ['8', '27'],
    offsig: ['7', '28'],
    brightupsig: ['5', '6'],
    brightlowsig: ['7', '8'],
  },
  "living room": {
    label: 'Living Room',
    lights: ['Main', 'Lamps'],
    onsig: ['3', '4'],
    offsig: ['3', '4'],
    brightupsig: ['5', '6'],
    brightlowsig: ['7', '8'],
    tilebtnon: '8',
    tilebtnoff: '17',
  },
  office: {
    label: 'Office',
    lights: ['Main'],
    onsig: ['3'],
    offsig: ['3'],
    brightupsig: ['2'],
    brightlowsig: ['7'],
    tilebtnon: '8',
    tilebtnoff: '97',
}}
