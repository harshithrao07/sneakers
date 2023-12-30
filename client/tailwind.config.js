/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'hsl(25, 100%, 94%)',
          200: 'hsl(26, 100%, 55%)'
        },
        secondary: {
          100: 'hsl(223, 64%, 98%)',
          200: 'hsl(220, 14%, 75%)',
          300: 'hsl(219, 9%, 45%)',
          400: 'hsl(220, 13%, 13%)'
        }
      },
      fontFamily : {
        body: ['Kumbh Sans']
      },
      keyframes : {
        animatedBackground: {
          '0%' : {'background-position' : '0 0'},
          '100%' : {'background-position' : '100% 0'}
        },
        sneakerAnimation : {
          '0%' : {'right' : '-500px'},
          '100%' : {'right': '0'}
        },
        sneakerAnimationMobile : {
          '0%': {'transform': 'rotate(0deg)', 'bottom': '-500px', 'left': '-50px'},
          '100%' : {'transform': 'rotate(-90deg)', 'bottom': '0', 'left': '-50px'}
        },
        cardAnimation : {
          '0%' : {'opacity': '0'},
          '100%' : {'opacity': '1'}
        }
      },
      animation: {
        'animationBackground' : 'animatedBackground 5s linear infinite alternate',
        'animationBackgroundMobile' : 'animatedBackground 40s linear infinite alternate',
        'animationSneaker' : 'sneakerAnimation 2s ease-out',
        'animationSneakerMobile' : 'sneakerAnimationMobile 1s ease-out forwards',
        'animationCard' : 'cardAnimation 0.5s linear'
      }, 
      scale : {
        '-100' : '-1'
      }
    },
  },
  plugins: [],
})