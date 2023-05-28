/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            backgroundImage: {
                'login-background': "url('/assets/images/login-background.svg')",
            },
            fontFamily: {
                lato: ['Lato', 'sans-serif'],
            },
            screens: {
                md: '770px',
            },
        },
    },
    plugins: [],
};
