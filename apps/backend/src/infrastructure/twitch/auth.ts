import { AppTokenAuthProvider } from "@twurple/auth";
import { twitch } from "../../config";

export const authProvider = new AppTokenAuthProvider(
  twitch.clientId,
  twitch.clientSecret,
  ["games"]
);
