import { LampInfo } from "./dto";

export const lampInfos: LampInfo[] = [
  {
    lampId: 1,
    location: {
      x: 4,
      y: 1.5,
    },
    adjoiningPlace: "3공학관",
    status: "light",
    isFavorite: true,
  },
  {
    lampId: 2,
    location: {
      x: 3.4,
      y: 1.3,
    },
    adjoiningPlace: "3공학관",
    status: "dark",
    isFavorite: true,
  },
];

export const lightLampInfos: LampInfo[] = [
  {
    lampId: 1,
    location: {
      x: 4,
      y: 1.5,
    },
    adjoiningPlace: "3공학관",
    status: "light",
    isFavorite: true,
  },
];

export const darkLampInfos: LampInfo[] = [
  {
    lampId: 2,
    location: {
      x: 3.4,
      y: 1.3,
    },
    adjoiningPlace: "3공학관",
    status: "dark",
    isFavorite: true,
  },
];
