const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../ui/components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      gray: {
        50: '#F9FAFB',
        100: '#F9FAFB',
        200: '#F3F4F6',
        300: '#E5E7EB',
        400: '#D1D5DB',
        //No 500
        600: '#686F7D',
        700: '#4B5563',
        // No 800
        900: '#1F2937',
      },
      red: {
        100: '#FCE9E9',
        200: '#F8D4D4',
        300: '#F1A8A8',
        400: '#EA7D7D',
        //No 500
        600: '#DC2626',
        700: '#B01E1E',
        // No 800
        900: '#580F0F',
      },
      yellow: {
        100: '#FEF8E6',
        200: '#FCF0CE',
        300: '#FAE19D',
        400: '#F1B409',
        // No 500
        600: '#F1B409',
        700: '#C19007',
        // No 800
        900: '#604804',
      },
      green: {
        100: '#EBF5F3',
        200: '#D6ECE7',
        300: '#ADD9D0',
        400: '#84C5B8',
        // No 500
        600: '#329F89',
        700: '#287F6E',
        // No 800
        900: '#144037',
      },
      blue: {
        100: '#E9EFFD',
        200: '#D3E0FB',
        300: '#A8C1F7',
        400: '#7CA1F3',
        // No 500
        600: '#2563EB',
        700: '#1E4FBC',
        // No 800
        900: '#0F285E',
      },
      purple: {
        100: '#F4E8FF',
        200: '#E8D0FE',
        300: '#D1A1FE',
        400: '#BA72FD',
        // No 500
        600: '#8C14FC',
        700: '#8C14FC',
        // No 800
        900: '#380865',
      },
    },
    extend: {
      screens: {
        xs: { max: '640px' },
      },
      colors: {
        purple: {
          selection: {
            DEFAULT: '#6D28D9',
            100: '#faf5ff',
            200: '#e9d8fd',
            300: '#d6bcfa',
            400: '#b794f4',
            500: '#9f7aea',
            600: '#805ad5',
            700: '#6b46c1',
            800: '#553c9a',
            900: '#44337a',
          },
          heart: {
            DEFAULT: '#4E42D3',
            50: '#f6f6fd',
            100: '#edecfb',
            200: '#d3d0f4',
            300: '#b8b3ed',
            400: '#837be0',
            500: '#4e42d3',
            600: '#463bbe',
            700: '#3b329e',
            800: '#2f287f',
            900: '#262067',
            950: '#171440',
          },
        },
        orange: {
          100: '#fffaf0',
          200: '#feebc8',
          300: '#fbd38d',
          400: '#f6ad55',
          500: '#ed8936',
          600: '#dd6b20',
          700: '#c05621',
          800: '#9c4221',
          900: '#7b341e',
        },
        violet: {
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        grey: {
          0: '#3D3D3D',
          10: '#575757',
          20: '#707070',
          30: '#8A8A8A',
          40: '#A3A3A3',
          50: '#BCBCBC',
          60: '#D6D6D6',
          70: '#F0F0F0',
        },
        'pi-purple-primary': '#8321F2',
        'pi-purple-dark': '#4E1A89',
        'pi-purple-pale': '#A6A0E9',
        'pi-purple-light': '#EBEBFF',
        'pi-mint': '#CDFEF5',
        'pi-black': '#000',
        'pi-black-light': '#252A32',
        'pi-grey-light': '#F4F6FF',
        'pi-white': '#FFF',
        'pi-off-white': '#FFF9F0',

        'purple-primary': '#8C14FC',
      },
      height: {
        500: '31.25rem',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        'max-height': 'max-height',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
