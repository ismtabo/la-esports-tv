import { doGetEGamersWorld } from "../infrastructure/egamersworld";
import { Streams } from "../infrastructure/egamersworld/types/streams";
import { getLiveStreams } from "../infrastructure/lolesports";
import { Live } from "../infrastructure/lolesports/types";
import { getUsers, getUserStreamsByUserId } from "../infrastructure/twitch";

export const getStreams = async (game: string) => {
  const streams = await doGetEGamersWorld<Streams>(`/${game}/streams`);
  const users = streams.list
    .filter((stream) => stream.stream_source === "twitch")
    .flatMap((stream) => stream.streams);
  return getUsers(users);
};

export const getLolStreams = async () => {
  const streams = await getLiveStreams()
    .then((data: Live) => data.data.schedule.events)
    .then((events) => events.filter((event) => event.state === "inProgress"))
    .then((events) => events.flatMap((event) => event.streams))
    .then((streams) => streams.map((stream) => stream.parameter))
    .then((streams) =>
      Promise.all(streams.map((stream) => getUserStreamsByUserId(stream)))
    );
  return streams;
};
