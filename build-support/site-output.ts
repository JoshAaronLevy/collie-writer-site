import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { Resvg } from '@resvg/resvg-js'
import { pages, pageForPath, notFoundPage } from '../src/content/pages.ts'
import {
  assertPublicationReady,
  publication,
  publicationOrigin,
  reviewMode,
} from '../src/content/site.ts'
import { releaseAvailability } from '../src/content/release.ts'

const socialPath = '/social/collie-writer.png'
const socialAlt =
  'Collie Writer. Research deeper. Write with conviction. Research, structure, review. AI tools.'
const metadataBlock = /<!-- site-meta:start -->[\s\S]*?<!-- site-meta:end -->/
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ]!,
  )

function metadata(path: string) {
  const page = pageForPath(path)
  const missing = page.path === notFoundPage.path
  const draft =
    reviewMode && ['/privacy', '/terms', '/purchases'].includes(page.path)
  const title = `${draft ? 'Review draft · ' : ''}${page.title}`
  const description = `${draft ? 'Local review draft; not approved for publication. ' : ''}${page.description}`
  const origin = publicationOrigin()
  const canonical = origin && !missing ? `${origin}${page.path}` : undefined
  const image = origin ? `${origin}${socialPath}` : socialPath
  return `<!-- site-meta:start -->
    <title>${escape(title)}</title>
    <meta name="description" content="${escape(description)}" />
    <meta name="robots" content="${reviewMode || missing ? 'noindex, nofollow' : 'index, follow'}" />
    ${canonical ? `<link rel="canonical" href="${escape(canonical)}" />` : ''}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Collie Writer" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    ${canonical ? `<meta property="og:url" content="${escape(canonical)}" />` : ''}
    <meta property="og:image" content="${escape(image)}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escape(socialAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${escape(image)}" />
    <meta name="twitter:image:alt" content="${escape(socialAlt)}" />
    <!-- site-meta:end -->`
}

function withMetadata(html: string, path: string) {
  if (!metadataBlock.test(html))
    throw new Error('Site HTML is missing its metadata boundary.')
  return html.replace(metadataBlock, () => metadata(path))
}

function crawlerFiles() {
  const origin = publicationOrigin()
  const indexable = publication.mode === 'public' && origin
  return {
    robots: indexable
      ? `User-agent: *\nAllow: /\nDisallow: /404.html\nSitemap: ${origin}/sitemap.xml\n`
      : 'User-agent: *\nDisallow: /\n',
    sitemap: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexable ? pages.map((page) => `<url><loc>${escape(`${origin}${page.path}`)}</loc></url>`).join('') : ''}</urlset>\n`,
  }
}

async function socialImage(root: string) {
  const [template, artwork] = await Promise.all([
    readFile(resolve(root, 'src/assets/branding/social-card.svg'), 'utf8'),
    readFile(resolve(root, 'src/assets/branding/collie-writer.png')),
  ])
  const svg = template
    .replace('{{artwork}}', artwork.toString('base64'))
    .replace('{{availability}}', escape(releaseAvailability.notice))
  return new Resvg(svg, {
    font: {
      loadSystemFonts: false,
      fontFiles: [
        resolve(root, 'public/fonts/SourceSerif4-Regular.ttf'),
        resolve(root, 'public/fonts/SourceSerif4-Bold.ttf'),
      ],
      defaultFontFamily: 'Source Serif 4',
    },
  })
    .render()
    .asPng()
}

// Production output, executed only by the owner's dev/build commands.
// No SSR server or browser is needed to deliver route-specific head metadata.
export function siteOutput(): Plugin {
  let root = ''
  return {
    name: 'collie-site-output',
    enforce: 'post',
    configResolved(config) {
      root = config.root
      assertPublicationReady()
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        const path = new URL(
          context.originalUrl ?? context.path,
          'https://local.invalid',
        ).pathname
        return withMetadata(html, path === '/index.html' ? '/' : path)
      },
    },
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = request.url?.split('?')[0]
        try {
          if (path === socialPath) {
            response.setHeader('Content-Type', 'image/png')
            response.setHeader('Cache-Control', 'no-store')
            response.end(await socialImage(root))
          } else if (path === '/robots.txt' || path === '/sitemap.xml') {
            const files = crawlerFiles()
            response.setHeader(
              'Content-Type',
              path === '/robots.txt'
                ? 'text/plain; charset=utf-8'
                : 'application/xml; charset=utf-8',
            )
            response.end(path === '/robots.txt' ? files.robots : files.sitemap)
          } else next()
        } catch (error) {
          next(error)
        }
      })
    },
    generateBundle: {
      order: 'post',
      async handler(_, bundle) {
        assertPublicationReady()
        const index = bundle['index.html']
        if (
          !index ||
          index.type !== 'asset' ||
          typeof index.source !== 'string'
        )
          throw new Error(
            'Expected the Vite index.html output before emitting site pages.',
          )
        const html = index.source
        for (const page of pages) {
          if (page.path === '/') {
            index.source = withMetadata(html, '/')
            continue
          }
          this.emitFile({
            type: 'asset',
            fileName: `${page.path.slice(1)}/index.html`,
            source: withMetadata(html, page.path),
          })
        }
        this.emitFile({
          type: 'asset',
          fileName: '404.html',
          source: withMetadata(html, '/404'),
        })
        const files = crawlerFiles()
        this.emitFile({
          type: 'asset',
          fileName: 'robots.txt',
          source: files.robots,
        })
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: files.sitemap,
        })
        this.emitFile({
          type: 'asset',
          fileName: socialPath.slice(1),
          source: await socialImage(root),
        })
      },
    },
  }
}
