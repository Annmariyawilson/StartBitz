module.exports = {
    // ...existing config...

    theme: {
      extend: {
        animation: {
          borderGlow: 'borderGlow 4s linear infinite',
          shine: 'shine 8s linear infinite',
        },
        keyframes: {
          borderGlow: {
            '0%, 100%': { opacity: 0.5 },
            '50%': { opacity: 0.2 },
          },
          shine: {
            '0%': { transform: 'translateX(-100%) rotate(45deg)' },
            '100%': { transform: 'translateX(200%) rotate(45deg)' },
          },
        },
        boxShadow: {
          'inner-lg': 'inset 0 0 30px rgba(0, 0, 0, 0.5)',
        },
      },
    },
  }