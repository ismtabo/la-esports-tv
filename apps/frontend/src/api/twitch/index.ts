import { HelixGame } from "@twurple/api/lib";
import { apiClient } from "./api";

export const getTopGames = () =>
  apiClient.games.getTopGames().then((resp) => resp.data);

export const getGameById = (id: string) => apiClient.games.getGameById(id);

export const getGameStreamsByGameId = (game: HelixGame) =>
  game.getStreams().then((resp) => resp.data);

export const getUserStreamsByUserId = (id: string) =>
  apiClient.streams.getStreamByUserId(id).then((resp) => resp);
