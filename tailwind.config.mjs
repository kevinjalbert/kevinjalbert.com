/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            img: {
              marginTop: '2rem',
              marginBottom: '2rem',
              borderRadius: '0.5rem',
            },
            'img:not(.no-margin)': {
              marginLeft: 'auto',
              marginRight: 'auto',
            },
            pre: {
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef',
            },
            code: {
              backgroundColor: '#f8f9fa',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
