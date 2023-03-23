import { Router } from "express";
import { doGetEGamersWorld } from "../egamersworld";

const router = Router();

router.get<Array<string>>("/*", async (req, res) => {
  const path = req.params[0];
  const result = await doGetEGamersWorld(`/${path}`);
  res.json(result);
});

export default router;
