/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "poppins-bold": ["var(--font-poppins-bold)"],
        "lora-regular": ["var(--font-lora-regular)"],
      },
      colors: {
        "custom-white": "#FDF7FA",
        "custom-light-blue": "#7FDEFF",
        "custom-blue": "#1A3072",
        "custom-dark-blue": "#00134E",
        "custom-pink": "#E07BE0",
        "custom-dark-pink": "#BB00AC",
      },
    },
  },
  plugins: [],
};
