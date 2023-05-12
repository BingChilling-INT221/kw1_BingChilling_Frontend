/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    plugins: [
        // require('tailwind-scrollbar'),
    ],
    theme: {

        extend: {
            colors: {
                purpleCustom1: '#443A61',
                purpleCustom2: '#6E5581',
                purpleCustom3: '#9B71A2',
                purpleCustom4: '#CB8FC1',
                purpleCustom5: '#FDAEDE',
                blackCustom: '#181818',
                black2Cus: '#212121',
                black3Cus: '#171717',
            },
            fontFamily: {

                'sans': ['Maehongson', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                marquee: 'marquee 5s linear ',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
        },

    },
}

