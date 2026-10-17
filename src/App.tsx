import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router'
import { SiteFooter, SiteHeader } from './components/site/SiteLayout'
import HomeHero from './features/home/HomeHero'
import AiIntroduction from './features/home/AiIntroduction'
import ProductStory from './features/home/ProductStory'
import Pricing from './features/access/Pricing'
import Downloads from './pages/Downloads'
import NotFound from './pages/NotFound'
import Help from './pages/Help'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Purchases from './pages/Purchases'
import Faq from './features/home/Faq'
import { theme } from './theme'

export default function App() {
  return (
    <MantineProvider theme={theme} forceColorScheme="light">
      <BrowserRouter>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HomeHero />
                  <AiIntroduction />
                  <ProductStory />
                  <Pricing />
                  <Faq />
                </>
              }
            />
            <Route path="/downloads" caseSensitive element={<Downloads />} />
            <Route path="/help" caseSensitive element={<Help />} />
            <Route path="/privacy" caseSensitive element={<Privacy />} />
            <Route path="/terms" caseSensitive element={<Terms />} />
            <Route path="/purchases" caseSensitive element={<Purchases />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
      </BrowserRouter>
    </MantineProvider>
  )
}
