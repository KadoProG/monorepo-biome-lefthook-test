/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "tozai-line-sky": "#00a7db",
    },
    keyframes: {
      "bounce-once": {
        "0%": { transform: "translateY(0)" },
        "30%": { transform: "translateY(-40%)" },
        "60%": { transform: "translateY(20%)" },
        "100%": { transform: "translateY(0)" },
      },
      "scale-up": {
        "0%": { transform: "scale(0)" },
        "60%": { transform: "scale(120%)" },
        "100%": { transform: "scale(1)" },
      },
    },
    animation: {
      "bounce-once": "bounce-once 0.6s ease-out 1",
      "scale-up": "scale-up 0.6s ease-out",
    },
  },
};
