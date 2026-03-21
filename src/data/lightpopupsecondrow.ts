import greatrm from '../assets/images/greatrm.webp'
import tvrm from '../assets/images/tvrm.jpg'
import kitchen from '../assets/images/kitchen.webp'
import dining from '../assets/images/Dining.webp'
import library from '../assets/images/library.jpg'
import Maarij from '../assets/images/MaarijsRm.jpg'





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

export const lightPopup2: Record<string, RoomConfig> = {
    "Maarij's Room": { // key is room ID
    label: "Maarij's Room",
    lights: ['ceiling', 'upper cabinets'],
    tilebtnon: '8',
    tilebtnoff: '7',
    onsig: ['8', '27'],
    offsig: ['7', '28'],
    brightupsig: ['5', '6'],
    brightlowsig: ['7', '8'],
    image: Maarij,
  },
  "Living Room": { // key is room ID
    label: "Living Room",
    lights: ['ceiling', 'upper cabinets'],
    tilebtnon: '8',
    tilebtnoff: '7',
    onsig: ['8', '27'],
    offsig: ['7', '28'],
    brightupsig: ['5', '6'],
    brightlowsig: ['7', '8'],
    image: kitchen,
  },
  "Gym Room": {
    label: "Gym Room",
    lights: ['Main', 'Lamps'],
    onsig: ['3', '4'],
    offsig: ['3', '4'],
    brightupsig: ['5', '6'],
    brightlowsig: ['7', '8'],
    tilebtnon: '8',
    tilebtnoff: '17',
    image: tvrm,
  },
  "Laundry": {
    label: 'Laundry',
    lights: ['Main'],
    onsig: ['3'],
    offsig: ['3'],
    brightupsig: ['2'],
    brightlowsig: ['7'],
    tilebtnon: '8',
    tilebtnoff: '97',
    image: dining,
},
"Sara's Room": {
    label: "Sara's Room",
    lights: ['Main'],
    onsig: ['3'],
    offsig: ['3'],
    brightupsig: ['2'],
    brightlowsig: ['7'],
    tilebtnon: '8',
    tilebtnoff: '97',
    image: library,
},
"Zoya's Room": {
    label: "Zoya's Room",
    lights: ['Main'],
    onsig: ['3'],
    offsig: ['3'],
    brightupsig: ['2'],
    brightlowsig: ['7'],
    tilebtnon: '8',
    tilebtnoff: '97',
    image: greatrm,
},
"lebron's Room": {
    label: "Zoya's Room",
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
