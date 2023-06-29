export interface LampInfo {
  lampId: number;
  lampName: string;
  location: {
    x: number;
    y: number;
  };
  adjoiningPlace: string;
  status: "light" | "dark";
  isFavorite: boolean;
}

export interface Notification {
  id: number;
  lampId: number;
  content: string;
  time: string;
  isNotRead: boolean;
}
