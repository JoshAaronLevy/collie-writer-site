import { MantineProvider } from '@mantine/core'
import { SiteFooter, SiteHeader } from './components/site/SiteLayout'
import HomeHero from './features/home/HomeHero'
import ProductStory from './features/home/ProductStory'
import { theme } from './theme'

export default function App() {
  return (
    <MantineProvider theme={theme} forceColorScheme="light">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <HomeHero />
        <ProductStory />
      </main>
      <SiteFooter />
    </MantineProvider>
  )
}
