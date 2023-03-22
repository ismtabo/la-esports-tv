import fetch from "node-fetch";
import CryptoJS from "crypto-js";

export const MAIN_URI = "https://egamersworld.com";

export const createToken = (url = "", mainUri = "") => {
  const uri = url.replace(mainUri, "").split("?")[0];
  const buff = Buffer.from(uri);
  const base64data = buff.toString("base64");
  const start = base64data.substring(0, 2);
  const end = base64data.substring(base64data.length - 2);
  // eslint-disable-next-line new-cap
  const token = CryptoJS.MD5(end + base64data + start);

  return token;
};

fetch("https://api.egamersworld.com/matches?lang=en", {
  headers: {
    referer: "https://egamersworld.com/",
    "X-CustomHeader": createToken(
      "https://egamersworld.com/matches?lang=en",
      MAIN_URI
    ),
  },
})
  .then((res) => res.json())
  .then((res) => console.log(JSON.stringify(res)))
  .catch(console.error);
