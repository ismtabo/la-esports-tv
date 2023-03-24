import { Router } from "express";
import { proxyGetRequest } from "../../context/egamersworld";

const router = Router();

router.get<Array<string>>("/*", async (req, res) => {
  const result = await proxyGetRequest(req.params[0]);
  res.json(result);
});

export default router;
