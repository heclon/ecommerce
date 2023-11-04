const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./components/**/*.{js,jsx,ts,tsx}'],
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
      colors: {
        'blue-yourbrand': {
          DEFAULT: '#02BBF0',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        'pi-purple-primary': '#1D4ED8',
        'pi-purple-dark': '#1E40AF',
        'pi-purple-pale': '#3B82F6',
        'pi-purple-light': '#EBEBFF',
        'pi-mint': '#CDFEF5',
        'pi-black': '#000',
        'pi-black-light': '#252A32',
        'pi-grey-light': '#F4F6FF',
        'pi-white': '#FFF',
        'pi-off-white': '#FFF9F0',

        // This has been confirmed with Design Team to be the correct color
        // for all purple components in HH
        'blue-primary': '#0C94E2',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
}
