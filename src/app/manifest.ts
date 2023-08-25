import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Balança",
    short_name: "Balança",
    theme_color: "#000000",
    background_color: "#F4F4F5",
    display: "fullscreen",
    orientation: "landscape",
    scope: "/",
    start_url: "/app",
    icons: [
      {
        src: "icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}