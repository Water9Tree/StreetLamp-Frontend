export interface LampInfo {
  lampId: number;
  location: {
    x: number;
    y: number;
  };
  adjoiningPlace: string;
  status: "light" | "dark";
  isFavorite: true;
}
