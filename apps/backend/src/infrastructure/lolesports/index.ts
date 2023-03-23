import fetch from "node-fetch";
import { lolsports } from "../../config";
import { Live } from "./types";

export const getLeagues = () =>
  fetch(`https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=en-US`, {
    headers: {
      "x-api-token": lolsports.apiToken,
    },
  }).then((res) => res.json());

export const getLiveStreams = () =>
  fetch(`https://esports-api.lolesports.com/persisted/gw/getLive?hl=en-US`, {
    headers: {
      "x-api-token": lolsports.apiToken,
    },
  })
    .then((res) => res.json())
    .then((data: Live) => data.data.schedule.events)
    .then((events) => events.filter((event) => event.state === "inProgress"))
    .then((events) => events.flatMap((event) => event.streams))
    .then((streams) => streams.map((stream) => stream.parameter));
