import defaultTheme from 'tailwindcss/defaultTheme';
const withMT = require("@material-tailwind/react/utils/withMT");
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
//module.exports = withMT({
module.exports = ({
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './node_modules/preline/preline.js',
        "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
      
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                'hero-pattern': "url('/img/hero-pattern.svg')",
                'foot,er-texture': "url('/img/footer-texture.png')",
              },
            backgroundOpacity: ['active'],
        },
    },

    plugins: [forms,require('preline/plugin')],
});
