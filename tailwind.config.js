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
            fontSize: '0.875rem',
            lineHeight: '1.5',
            padding: '0',
            img: {
              maxWidth: 'calc(100% - 0.5rem)',
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            'div[style*="display: flex"]': {
              maxWidth: 'calc(100% - 0.5rem)',
              flexDirection: 'column',
              gap: '0.75rem',
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            'div[style*="display: flex"] img': {
              width: '100%',
              maxWidth: 'calc(100% - 0.5rem)',
              flex: 'none',
              marginTop: '0',
              marginBottom: '0',
            },
            'h1, h2, h3, h4, h5, h6': {
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              lineHeight: '1.3',
            },
            'p': {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
            },
            'ul, ol': {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
              paddingLeft: '1.25rem',
            },
            'li': {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            'pre': {
              margin: '1rem -0.25rem',
              padding: '1rem 0.75rem',
              borderRadius: '0.375rem',
            },
            'blockquote': {
              margin: '1rem 0',
              paddingLeft: '1rem',
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

