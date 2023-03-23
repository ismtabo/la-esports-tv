import { Router } from "express";
import { doGetEGamersWorld } from "../egamersworld";
import { Streams } from "../egamersworld/types/streams";
import { getLiveStreams } from "../lolesports";
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
  const streams = await getLiveStreams().then((streams) =>
    Promise.all(streams.map((stream) => getUserStreamsByUserId(stream)))
  );
  res.json(streams);
});

export default router;
