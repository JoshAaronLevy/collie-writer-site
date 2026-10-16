export type SiteDetails = {
  sellerName?: string
  support?: { label: string; href: string }
  hostingPrivacy?: string
  contactPrivacy?: string
  purchasePrivacy?: string
  refundTerms?: string
  approvedPolicyRecord?: string
}

// Owner-supplied, public information only. No invented contact, seller or policy.
export const siteDetails: SiteDetails = {}

export const publication: {
  mode: 'review' | 'public'
  canonicalOrigin?: string
  approvalRecord?: string
} = { mode: 'review' }

export function publicationOrigin(): string | undefined {
  if (!publication.canonicalOrigin) return
  try {
    const url = new URL(publication.canonicalOrigin)
    if (
      url.protocol === 'https:' &&
      url.origin === publication.canonicalOrigin &&
      url.hostname.includes('.') &&
      !url.hostname.endsWith('.localhost') &&
      !['example.com', 'example.org', 'example.net'].includes(url.hostname)
    )
      return url.origin
  } catch {
    /* Missing/invalid origins must not become canonical URLs. */
  }
}

export function supportDestination(): string | undefined {
  const support = siteDetails.support
  if (!support?.label.trim()) return
  try {
    const url = new URL(support.href)
    if (url.protocol === 'https:' && !url.username && !url.password)
      return url.href
    if (
      url.protocol === 'mailto:' &&
      /^[^\s@?]+@[^\s@?]+\.[^\s@?]+$/.test(url.pathname) &&
      !url.search &&
      !url.hash
    )
      return url.href
  } catch {
    /* An absent contact remains unavailable, never a placeholder link. */
  }
}

export function publicationReady(): boolean {
  return Boolean(
    publication.mode === 'public' &&
    publicationOrigin() &&
    publication.approvalRecord?.trim() &&
    siteDetails.sellerName?.trim() &&
    supportDestination() &&
    siteDetails.hostingPrivacy?.trim() &&
    siteDetails.contactPrivacy?.trim() &&
    siteDetails.refundTerms?.trim() &&
    siteDetails.approvedPolicyRecord?.trim(),
  )
}

export function assertPublicationReady() {
  if (publication.mode !== 'public') return
  if (!publicationReady()) {
    throw new Error(
      'Public output requires the approved origin, seller, support, hosting/contact privacy, refund terms and policy/publication records. Keep local drafts in review mode.',
    )
  }
}

export const reviewMode = publication.mode === 'review'
