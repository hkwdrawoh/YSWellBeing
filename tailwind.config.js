const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#ba890b",
        text1: "#020202",
        text2: "#FDFDFD",
        muted: "#2c2626",
        warning: "#f10d0d",
        hover: "#BCAFFD",
        section1: "#ACBA0B",
        section2: "#BA550B",
        section3: "#94995A",
        section4: "#A06840",
        background0: "#F6F0EC",
        background1: "#F9FBE1",
        background2: "#F8DEBD",
        option0 : "#AAAAAA",
        option1 : "#D12626",
        option2 : "#E58B26",
        option3 : "#F9F025",
        option4 : "#BCF751",
        option5 : "#7EFE7C"
      },
    },
  },
  plugins: [],
}
