import fetch from "node-fetch";
import { lolsports } from "../../config";

export const getLeagues = () =>
  fetch(`https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=en-US`, {
    headers: {
      "x-api-key": lolsports.apiToken,
    },
  }).then((res) => res.json());

export const getLiveStreams = () =>
  fetch(`https://esports-api.lolesports.com/persisted/gw/getLive?hl=en-US`, {
    headers: {
      "x-api-key": lolsports.apiToken,
    },
  })
    .then((res) => res.json());
