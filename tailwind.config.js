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
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              maxWidth: 'calc(100% - 2rem)',
              width: 'auto',
              height: 'auto',
              display: 'block',
            },
            // Style flex containers for side-by-side images
            'div[style*="display: flex"]': {
              maxWidth: 'calc(100% - 2rem)',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'flex-start',
            },
            'div[style*="display: flex"] img': {
              margin: '0',
              maxWidth: '100%',
              width: 'auto',
              height: 'auto',
              flex: '1 1 0%',
              minWidth: '0',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
        sm: {
          css: {
            img: {
              maxWidth: 'calc(100% - 1rem)',
            },
            'div[style*="display: flex"]': {
              maxWidth: 'calc(100% - 1rem)',
              flexDirection: 'column',
              gap: '1rem',
            },
            'div[style*="display: flex"] img': {
              width: '100%',
              maxWidth: 'calc(100% - 1rem)',
              flex: 'none',
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

