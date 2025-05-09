/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    plugins: [require("daisyui")],
    theme: {

        extend: {
            colors: {
                // purpleCustom1: '#443A61',
                // purpleCustom2: '#6E5581',
                // purpleCustom3: '#9B71A2',
                // purpleCustom4: '#CB8FC1',
                // purpleCustom5: '#FDAEDE',
                // blackCustom: '#181818',
                // black2Cus: '#212121',
                // black3Cus: '#171717',
                blackCustom: '#2A2A2A',
                darksecondCustom: '#414558',
                whitesecondCustom: '#F5F5F5',
                whiteCustom: '#FFFFFF',
                grayCustom: '#9F9F9F',
                redCustom: '#D72121',
                greenCustom: '#19B832',
                bg: '#0F172A',
                bgNav: '#1E293B',
                header: '#4DC0F9',
                header2: '#A9B4C0',
                bgAdmin: '#22252F',
                bgAdmin2: '#2B2E3B',
                headerAdmin: '#5B73E8',
                inputAdmin: '#162a41',
                borderInputAdmin: '#343747',
            },
            fontFamily: {

                'sans': ['poppins', ...defaultTheme.fontFamily.sans],
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
    daisyui: {
        themes: false,
    },
}

