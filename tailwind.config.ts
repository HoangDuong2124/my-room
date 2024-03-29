import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
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
        "bg-image": "url('/img/bg.jpg') ",
        "bgmess-image": "url('/img/bgmess.jpg') "
      },
      backgroundColor: {
        "rgba": "rgba(171, 119, 157, 0.27)",
      },
    },
  },
  plugins: [],
};
export default config;
