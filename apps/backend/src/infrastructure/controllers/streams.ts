import { Router } from "express";
import { getLolStreams, getStreams } from "../../context/streams";

const router = Router();

router.get("/:game", async (req, res) => {
  const streams = getStreams(req.params.game);
  res.json(streams);
});

router.get("/lol", async (_req, res) => {
  const streams = getLolStreams();
  res.json(streams);
});

export default router;
