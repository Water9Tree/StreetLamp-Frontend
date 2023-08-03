import { LampInfo, Notification } from "./dto";

export const lampInfos: LampInfo[] = [
  {
    _id: 1,
    lampName: "A-1",
    location: {
      x: 4,
      y: 1.5,
    },
    adjoiningPlace: "3공학관",
    status: "light",
    isFavorite: true,
  },
  {
    _id: 2,
    lampName: "A-2",
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
    _id: 1,
    lampName: "A-1",
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
    _id: 2,
    lampName: "A-1",
    location: {
      x: 3.4,
      y: 1.3,
    },
    adjoiningPlace: "3공학관",
    status: "dark",
    isFavorite: true,
  },
];

export const notificationList: Notification[] = [
  {
    id: 1,
    lampId: 1,
    content: "A-1 가로등 주변이 어둡습니다.",
    time: "2023.06.29 23:15",
    isNotRead: true,
  },
  {
    id: 2,
    lampId: 2,
    content: "A-2 가로등 주변이 어둡습니다.",
    time: "2023.06.29 23:14",
    isNotRead: false,
  },
];
