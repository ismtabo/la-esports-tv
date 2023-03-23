import { ApiClient } from "@twurple/api";
import { authProvider } from "./auth";

export const apiClient = new ApiClient({ authProvider });
