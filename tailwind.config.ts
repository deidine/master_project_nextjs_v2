import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        title: ["var(--font-roboto)", "serif"], 
      },
      colors: {
    
        title:  "#0070f3",
        mainColor: "#f0f0f0",
      },

      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
      
    },
  },
  plugins: [], 
};
export default config;
