/* export interface LampInfo {
  _id: number;
  lampName: string;
  location: {
    x: number;
    y: number;
  };
  adjoiningPlace: string;
  status: "light" | "dark";
  isFavorite: boolean;
} */

export interface Notification {
  id: number;
  lampId: number;
  content: string;
  time: string;
  isNotRead: boolean;
}

export type Role = "ROLE_ADMIN" | "ROLE_USER";

export interface User {
  email: string;
  loginId: string;
  password: string;
  username: string;
  role: Role;
}

export interface SignInInfo {
  loginId: string;
  password: string;
  expoToken: string;
}

export interface LampInfo {
  lampName: string;
  location: {
    x: number;
    y: number;
  };
  adjoiningPlace: string;
}

export type LampStatus = "light" | "normal" | "dark";
