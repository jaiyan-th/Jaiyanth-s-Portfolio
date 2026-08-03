import type { MetadataRoute } from "next";
import { IDENTITY } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${IDENTITY.name} — ${IDENTITY.role}`,
    short_name: IDENTITY.name,
    description: `${IDENTITY.name} — ${IDENTITY.role}. ${IDENTITY.education}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#0E1214",
    theme_color: "#0E1214",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    categories: ["portfolio", "developer", "engineering"],
  };
}
