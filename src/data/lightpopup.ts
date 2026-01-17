import greatrm from '../assets/images/greatrm.webp'
import tvrm from '../assets/images/tvrm.jpg'
import kitchen from '../assets/images/kitchen.jpg'
import dining from '../assets/images/Dining.jpg'
import library from '../assets/images/library.jpg'
export type RoomConfig = {
  onsig: string[];
  offsig: string[];
  brightupsig: string[];
  brightlowsig: string[];
  lights: string[];
   label: string;
  tilebtnon: string;
  tilebtnoff: string;
  image: string;

};

export const lightPopup: Record<string, RoomConfig> = {
    'Great Room': { // key is room ID
    label: 'Great Room',
    lights: ['ceiling', 'upper cabinets'],
    tilebtnon: '8',
    tilebtnoff: '7',
    onsig: ['8', '27'],
    offsig: ['7', '28'],
    brightupsig: ['57', '49'],
    brightlowsig: ['58', '50'],
    image: greatrm,
  },
  kitchen: { // key is room ID
    label: 'Kitchen',
    lights: ['ceiling', 'upper cabinets'],
    tilebtnon: '8',
    tilebtnoff: '7',
    onsig: ['8', '27'],
    offsig: ['7', '28'],
    brightupsig: ['5', '6'],
    brightlowsig: ['7', '8'],
    image: kitchen,
  },
  "TV room": {
    label: 'TV Room',
    lights: ['Main', 'Lamps'],
    onsig: ['3', '4'],
    offsig: ['3', '4'],
    brightupsig: ['5', '6'],
    brightlowsig: ['7', '8'],
    tilebtnon: '8',
    tilebtnoff: '17',
    image: tvrm,
  },
  dining: {
    label: 'Dining',
    lights: ['Main'],
    onsig: ['3'],
    offsig: ['3'],
    brightupsig: ['2'],
    brightlowsig: ['7'],
    tilebtnon: '8',
    tilebtnoff: '97',
    image: dining,
},
Library: {
    label: 'Library',
    lights: ['Main'],
    onsig: ['3'],
    offsig: ['3'],
    brightupsig: ['2'],
    brightlowsig: ['7'],
    tilebtnon: '8',
    tilebtnoff: '97',
    image: library,
},
Office: {
    label: 'Office',
    lights: ['Main'],
    onsig: ['3'],
    offsig: ['3'],
    brightupsig: ['2'],
    brightlowsig: ['7'],
    tilebtnon: '8',
    tilebtnoff: '97',
    image: greatrm,
},




}
