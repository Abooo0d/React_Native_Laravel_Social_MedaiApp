/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        homeFeed: "#050b1c",
        overlayBackground: "rgba(17,17,26,0.50)",
        buttonBackColor: "rgba(201 201 201 / 0.2);",
      },
    },
  },
  plugins: [],
};
