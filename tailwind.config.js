import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [forms],
};
