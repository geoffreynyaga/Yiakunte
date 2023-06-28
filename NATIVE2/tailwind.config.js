


module.exports = {
  content: [
    "./components/**/*.tsx",
    "./components/**/*.ts",
    "./components/**/*.js",
    "./components/**/*.jsx",
    "./screens/**/*.tsx",
    "./screens/**/*.ts",
    "./screens/**/*.js",
    "./screens/**/*.jsx",
    "./App.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/line-clamp"),
    // require("@tailwindcss/aspect-ratio"),
    // require("flowbite/plugin"),
  ],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
