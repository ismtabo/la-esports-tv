import { Router } from "express";
import { doGetEGamersWorld } from "../egamersworld";
import { Streams } from "../egamersworld/types/streams";
import { getLiveStreams } from "../lolesports";
import { Live } from "../lolesports/types";
import { getUsers, getUserStreamsByUserId } from "../twitch";

const router = Router();

router.get("/:game", async (req, res) => {
  const streams = await doGetEGamersWorld<Streams>(
    `/${req.params.game}/streams`
  );
  const users = streams.list
    .filter((stream) => stream.stream_source === "twitch")
    .flatMap((stream) => stream.streams);
  res.json(await getUsers(users));
});

router.get("/lol", async (_req, res) => {
  const streams = await getLiveStreams()
    .then((data: Live) => data.data.schedule.events)
    .then((events) => events.filter((event) => event.state === "inProgress"))
    .then((events) => events.flatMap((event) => event.streams))
    .then((streams) => streams.map((stream) => stream.parameter))
    .then((streams) =>
      Promise.all(streams.map((stream) => getUserStreamsByUserId(stream)))
    );
  res.json(streams);
});

export default router;
