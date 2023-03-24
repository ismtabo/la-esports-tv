// import cors from "cors";
import express from "express";
import ViteExpress from "vite-express";
import egamersworld from "./infrastructure/controllers/egamersworld";
import streams from "./infrastructure/controllers/streams";
import home from "./infrastructure/controllers/home";

const app = express();

// app.use(cors({origin: ['http://localhost:5173'], preflightContinue: true}));

app.use((_req, res, next) => {
  try {
    next();
  } catch (e) {
    console.error(e);
    res.status(502);
  }
});

app.get("/hello", (_, res) => {
  res.send("Hello Vite + TypeScript!");
});

app.use("/egamersworld", egamersworld);
app.use("/streams", streams);
app.use("/home", home);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
