import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router'
import { SiteFooter, SiteHeader } from './components/site/SiteLayout'
import HomeHero from './features/home/HomeHero'
import ProductStory from './features/home/ProductStory'
import Pricing from './features/access/Pricing'
import Downloads from './pages/Downloads'
import NotFound from './pages/NotFound'
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
                  <title>Collie Writer — A home for your nonfiction</title>
                  <HomeHero />
                  <ProductStory />
                  <Pricing />
                </>
              }
            />
            <Route path="/downloads" caseSensitive element={<Downloads />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
      </BrowserRouter>
    </MantineProvider>
  )
}
