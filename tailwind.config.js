/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Glory', 'Alef', 'Cairo', 'sans-serif']
            },
            keyframes: {
                'fade-in-out': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }
                }
            },
            animation: {
                'fade-in-out': 'fade-in-out 0.6s ease-in-out infinite',
                'fade-in-out-delay-1': 'fade-in-out 0.6s 0.2s ease-in-out infinite',
                'fade-in-out-delay-2': 'fade-in-out 0.6s 0.4s ease-in-out infinite'
            }
        }
    },
    plugins: []
};
