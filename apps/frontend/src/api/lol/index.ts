import { lolsports } from "../../config";
import { getUserStreamsByUserId } from "../twitch";
import { Live } from "./types";

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
    .then((streams) => streams.map((stream) => stream.parameter))
    .then((streams) =>
      Promise.all(streams.map((stream) => getUserStreamsByUserId(stream)))
    );
