import { Router } from "express";
import { getHome } from "../../context/home";

const router = Router();

router.get("/", async (_req, res) => {
  const homeLayout = await getHome();
  res.json(homeLayout);
});

export default router;
