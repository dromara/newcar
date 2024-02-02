import { config } from "./config";

export const sleep = (length: number): Promise<void> => {
  const sleepTime =
    config.timing === "frame" ? length * (1000 / 60) : 1000 * length;
  return new Promise((resolve) => setTimeout(resolve, sleepTime));
};
