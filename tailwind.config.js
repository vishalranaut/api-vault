// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".scrollable": {
          "overflow-y": "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
        },
      });
    },
  ],
};
