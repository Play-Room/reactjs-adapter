import {
  PlayRoom,
  registerDefaultGames,
  type PlayRoomOptions,
  type RegisterDefaultGamesOptions,
  type GameRegistration,
  type LaunchGameOptions,
  type GameSession
} from "@play-room/core";
import { useMemo } from "react";

export interface PlayRoomReactInstance {
  room: PlayRoom;
  getLocale(): string;
  setLocale(locale: string): void;
  subscribeLocale(listener: (locale: string) => void): () => void;
  getTheme(): "light" | "dark";
  setTheme(theme: "light" | "dark"): void;
  subscribeTheme(listener: (theme: "light" | "dark") => void): () => void;
  listGames(): ReturnType<PlayRoom["listGames"]>;
  queryGames: PlayRoom["queryGames"];
  registerGame(registration: GameRegistration): PlayRoom;
  registerGames(registrations: GameRegistration[]): PlayRoom;
  renderGamePicker(container: HTMLElement): void;
  launchGame(gameId: string, options?: LaunchGameOptions): Promise<GameSession>;
  registerDefaultGames(options?: RegisterDefaultGamesOptions): void;
}

export function createPlayRoom(options: PlayRoomOptions = {}): PlayRoomReactInstance {
  const room = new PlayRoom(options);

  return {
    room,
    getLocale: () => room.getLocale(),
    setLocale: (locale) => room.setLocale(locale),
    subscribeLocale: (listener) => room.subscribeLocale(listener),
    getTheme: () => room.getTheme(),
    setTheme: (theme) => room.setTheme(theme),
    subscribeTheme: (listener) => room.subscribeTheme(listener),
    listGames: () => room.listGames(),
    queryGames: (query) => room.queryGames(query),
    registerGame: (registration) => room.registerGame(registration),
    registerGames: (registrations) => room.registerGames(registrations),
    renderGamePicker: (container) => room.renderGamePicker(container),
    launchGame: (gameId, launchOptions) => room.launchGame(gameId, launchOptions),
    registerDefaultGames: (defaultGameOptions) => registerDefaultGames(room, defaultGameOptions)
  };
}

export function usePlayRoom(options: PlayRoomOptions = {}): PlayRoomReactInstance {
  return useMemo(() => createPlayRoom(options), []);
}

export { PlayRoom, registerDefaultGames };
export type {
  PlayRoomOptions,
  RegisterDefaultGamesOptions,
  GameRegistration,
  LaunchGameOptions,
  GameSession
};
