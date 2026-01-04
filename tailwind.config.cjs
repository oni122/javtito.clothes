/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        blush: '#f7e6ec',
        cocoa: '#6b4f4f',
        sand: '#f4d4bb',
        ink: '#1f1f1f',
      },
      boxShadow: {
        card: '0 15px 40px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
