import { apiClient } from "./api";
import { getRawData } from "@twurple/common";

export const getUsers = (userNames: string[]) =>
  apiClient.users.getUsersByNames(userNames).then((res) => res.map(getRawData));

export const getUserStreamsByUserId = (id: string) =>
  apiClient.streams
    .getStreamByUserId(id)
    .then((resp) => (resp == null ? resp : getRawData(resp)));
