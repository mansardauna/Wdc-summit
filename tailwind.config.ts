import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        skyFrame: "#BDD7EA",
        canvasBg: "#F4F5F3",
        ink: "#1B2228",
        slateMuted: "#54626F",
        sunYellow: "#FCE46D",
        sunYellowHover: "#F8D849",
        pillDark: "#455563",
        pillDarkHover: "#354350",
        cardIce: "#E3EEF6",
        cardPowder: "#B8D3E6",
        cardGlacier: "#C7DFEE",
        cardSlate: "#435563",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        shell: "0 24px 80px -12px rgba(27, 45, 62, 0.14)",
        card: "0 8px 30px rgba(27, 45, 62, 0.05)",
        cardHover: "0 18px 45px rgba(27, 45, 62, 0.11)",
      },
    },
  },
  plugins: [],
};
export default config;
