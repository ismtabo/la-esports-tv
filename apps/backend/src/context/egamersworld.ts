import { doGetEGamersWorld } from "../infrastructure/egamersworld";

export const proxyGetRequest = (path: string) => {
  return doGetEGamersWorld(`/${path}`);
};
