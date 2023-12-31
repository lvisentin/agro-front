import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        sidebar: '290px',
      },
      minWidth: {
        sidebar: '290px',
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      {
        corporate: {
          ...require('daisyui/src/theming/themes')['[data-theme=corporate]'],
          '.btn-primary': {
            color: '#fff',
            backgroundColor: '#43af6d',
            borderColor: '#43af6d',
          },
          '.btn-primary:hover': {
            color: '#fff',
            backgroundColor: '#25854A',
            borderColor: '#25854A',
          },
        },
      },
    ],
  },
  darkMode: 'class',
  important: true,
};
export default config;
