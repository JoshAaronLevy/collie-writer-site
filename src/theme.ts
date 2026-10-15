import { Button, createTheme } from '@mantine/core'

export const theme = createTheme({
  primaryColor: 'collie',
  primaryShade: 7,
  colors: {
    collie: [
      '#f2f7f3',
      '#e7f0e9',
      '#c8e2d2',
      '#a7d7bd',
      '#7cb49a',
      '#559278',
      '#397b62',
      '#2f6757',
      '#285547',
      '#204438',
    ],
  },
  fontFamily: 'var(--font-body)',
  headings: { fontFamily: 'var(--font-editorial)', fontWeight: '400' },
  defaultRadius: 'sm',
  focusRing: 'auto',
  respectReducedMotion: true,
  components: {
    Button: Button.extend({ defaultProps: { size: 'lg', radius: 'sm' } }),
  },
})
