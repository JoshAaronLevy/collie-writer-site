import { releaseAvailability } from './release.ts'
import { purchaseAvailability } from './commerce.ts'

export const pages = [
  {
    path: '/',
    title: 'Collie Writer — A home for your nonfiction',
    description: `Bring research, notes and writing into one calm nonfiction workspace. ${releaseAvailability.notice}.`,
  },
  {
    path: '/downloads',
    title: 'Downloads — Collie Writer',
    description: `Find Collie Writer download availability for Mac and Windows. ${releaseAvailability.notice}.`,
  },
  {
    path: '/help',
    title: 'Help — Collie Writer',
    description:
      'Getting started, saving and moving a Collie Writer project, imports, exports and practical answers about local work.',
  },
  {
    path: '/privacy',
    title: 'Privacy — Collie Writer',
    description:
      'Website, desktop, purchase-service and optional AI data boundaries for Collie Writer.',
  },
  {
    path: '/terms',
    title: 'Terms — Collie Writer',
    description:
      'Collie Writer nonfiction edition rights and terms for owner review.',
  },
  {
    path: '/purchases',
    title: 'Purchase information — Collie Writer',
    description: `Plans, purchase instructions, restore and refund information. ${purchaseAvailability.notice}`,
  },
] as const

export const notFoundPage = {
  path: '/404',
  title: 'Page not found — Collie Writer',
  description: 'Find your way to Collie Writer Home, Downloads or Help.',
}

export function pageForPath(pathname: string) {
  const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  return pages.find((page) => page.path === path) ?? notFoundPage
}
