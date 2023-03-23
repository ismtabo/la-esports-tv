import fetch from "node-fetch";
import { Buffer } from "buffer";
import CryptoJS from "crypto-js";
import { API_URI, MAIN_URI } from "./config";

export const createToken = (url = "", mainUri = "") => {
  const uri = url.replace(mainUri, "").split("?")[0];
  const buff = Buffer.from(uri);
  const base64data = buff.toString("base64");
  const start = base64data.substring(0, 2);
  const end = base64data.substring(base64data.length - 2);
  // eslint-disable-next-line new-cap
  const token = CryptoJS.MD5(end + base64data + start);

  return token.toString();
};

export const doGetEGamersWorld = <T = unknown>(path: string): Promise<T> => {
  return fetch(`${API_URI + path}?lang=en`, {
    headers: {
      referer: MAIN_URI,
      "X-CustomHeader": createToken(`${MAIN_URI + path}?lang=en`, MAIN_URI),
    },
  }).then((res) => res.json());
};
