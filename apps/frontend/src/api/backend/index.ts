import { backend } from "../../config";

export const getStreams = () =>
  fetch(`${backend.url}/streams/lol`).then((res) => res.json());
