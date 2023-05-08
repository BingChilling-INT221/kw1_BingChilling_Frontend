/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    theme: {

        extend: {
            colors: {
                blackCustom: '#1D2040',
                purpleCustom1: '#443A61',
                purpleCustom2: '#6E5581',
                purpleCustom3: '#9B71A2',
                purpleCustom4: '#CB8FC1',
                purpleCustom5: '#FDAEDE',
            },
            fontFamily: {

                'sans': ['supermarketregular', ...defaultTheme.fontFamily.sans],
            },
        },

    },
}

