/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withPwa = require("next-pwa")({
  dest: "public",
  register: true,
  sw: "/sw.js",
  disable: process.env.NODE_ENV != "production",
});
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

module.exports = withPwa({
  experimental: {
    serverActions: true,
  },
});
