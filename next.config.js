const { resolve } = require("path"); //eslint-disable-line

const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    const {
      resolve: { alias },
    } = config;
    alias["@components"] = resolve(__dirname, "./src/components");
    alias["@pages"] = resolve(__dirname, "./src/pages");
    alias["@assets"] = resolve(__dirname, "./src/assets");
    alias["@lib"] = resolve(__dirname, "./lib");

    return config;
  },
};

module.exports = config;
