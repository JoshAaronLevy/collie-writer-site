import { availableRelease } from './release.ts'
import { publicationReady, siteDetails } from './site.ts'
import type { PaidPlan } from './offers.ts'

type DirectCommerce = {
  environment: 'live'
  serviceOrigin: string
  releaseVersion: string
  approvalRecord: string
  directAcceptanceRecord: string
  desktopAcceptanceRecord: string
}

type CommerceRecord =
  | { status: 'unavailable' }
  | (DirectCommerce & { status: 'in-app' })
  | (DirectCommerce & {
      status: 'website'
      website: {
        contract: 'website-purchase-v1'
        acceptanceRecord: string
      }
    })

// Public evidence references only. COM01/COM02/APP01 are not accepted yet.
// Filling this record does not provision a service or authorize sales.
export const commerceRecord: CommerceRecord = { status: 'unavailable' }

type AvailableCommerce =
  | { status: 'unavailable' }
  | { status: 'in-app' }
  | { status: 'website'; serviceOrigin: string }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function approvedCommerce(value: unknown): AvailableCommerce {
  const unavailable = { status: 'unavailable' } as const
  if (
    !isRecord(value) ||
    (value.status !== 'in-app' && value.status !== 'website') ||
    value.environment !== 'live' ||
    !availableRelease ||
    value.releaseVersion !== availableRelease.version ||
    !publicationReady() ||
    !hasText(siteDetails.purchasePrivacy) ||
    !hasText(value.approvalRecord) ||
    !hasText(value.directAcceptanceRecord) ||
    !hasText(value.desktopAcceptanceRecord) ||
    !hasText(value.serviceOrigin)
  )
    return unavailable

  try {
    const url = new URL(value.serviceOrigin)
    if (
      url.protocol !== 'https:' ||
      url.origin !== value.serviceOrigin ||
      url.port ||
      !url.hostname.includes('.') ||
      /(^|\.)(localhost|local|test|invalid|example|example\.com|example\.org|example\.net)$/.test(
        url.hostname,
      )
    )
      return unavailable
  } catch {
    return unavailable
  }

  // In-app acceptance remains useful if the separate website contract is absent.
  if (
    value.status === 'website' &&
    isRecord(value.website) &&
    value.website.contract === 'website-purchase-v1' &&
    hasText(value.website.acceptanceRecord)
  )
    return { status: 'website', serviceOrigin: value.serviceOrigin }
  return { status: 'in-app' }
}

const availableCommerce = approvedCommerce(commerceRecord)

export const purchaseAvailability = {
  status: availableCommerce.status,
  heading:
    availableCommerce.status === 'unavailable' ? 'Planned pricing' : 'Pricing',
  notice:
    availableCommerce.status === 'website'
      ? 'Purchase online or in Collie Writer. Available in the United States, in USD.'
      : availableCommerce.status === 'in-app'
        ? 'Purchase in Collie Writer. Available in the United States, in USD. Website checkout is not available.'
        : availableRelease
          ? 'Download and write for free. Purchases are not yet available. Initial sales are planned for the United States, in USD.'
          : 'Purchases are not yet available. Initial sales are planned for the United States, in USD.',
}

// Fixed, service-owned GET pages only. Query strings never supply destinations,
// prices, customer identity or payment success. The service must implement COM02.
export function checkoutDestination(plan: PaidPlan): string | undefined {
  if (availableCommerce.status !== 'website') return
  if (plan !== 'monthly' && plan !== 'lifetime') return
  return `${availableCommerce.serviceOrigin}/buy/${plan}`
}
