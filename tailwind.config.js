/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-background': "url('/assets/images/login-background.svg')",
      },
      screens: {
        md: '770px',
      },
    },
  },
  plugins: [],
};
