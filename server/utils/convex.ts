import { ConvexHttpClient } from "convex/browser";

let client: ConvexHttpClient | null = null;

export function getConvexClient() {
  if (!client) {
    const url = process.env.CONVEX_URL;
    if (!url) throw new Error("CONVEX_URL  not found!");
    client = new ConvexHttpClient(url);
  }
  return client;
}
