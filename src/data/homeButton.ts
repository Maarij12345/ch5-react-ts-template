import lightsImg from '../assets/images/light.svg';
import audioImg from '../assets/images/audio.svg';
import camerasImg from '../assets/images/cameras.svg';
import climateImg from '../assets/images/thermostat.svg';
import shadesImg from '../assets/images/shades.svg';
import locksImg from '../assets/images/locks.svg';
/* A plain JavaScript object

Written in TypeScript

Exported so other files can use it 
.ts

Used when:

You write logic

You define data

You define types

*/
export const homeButtons = [
  {
    id: 'lights',
    label: 'Lights',
    image: lightsImg,
    page: 'lights'
  },
  {
    id: 'audio',
    label: 'Audio',
    image: audioImg,
    page: 'audio'
  },
  {
    id: 'shades',
    label: 'Shades',
    image: shadesImg,
    page: 'shades'
  },
  {
    id: 'climate',
    label: 'Climate',
    image: climateImg,
    page: 'climate'
  },
  {
    id: 'cameras',
    label: 'Cameras',
    image: camerasImg,
    page: 'cameras'
  },
  {
    id: 'locks',
    label: 'Locks',
    image: locksImg,
    page: 'locks'
  }
];