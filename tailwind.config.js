import plugin from 'tailwindcss/plugin'

export default {
  theme: {
    extend: {
      colors: {
        primary: '#3c40c6',
        success: 'rgb(82 196 26 / <alpha-value>)',
        warning: 'rgb(250 173 20 / <alpha-value>)',
        danger: 'rgb(250 85 85 / <alpha-value>)',
        info: 'rgb(144 147 153 / <alpha-value>)'
      },
      screens: {
        sm: '600px'
      }
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.navbar-shadow': {
          'box-shadow': '0 1px 4px rgb(0 21 41 / 8%)'
        }
      })
    })
  ]
}
