/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#04364A",
        secondaryColor: "#3e7a8e",
        inputBorderColor: "#5190A5",
        headerText: "#45889F",
      },
    },
  },
  plugins: [],
};
