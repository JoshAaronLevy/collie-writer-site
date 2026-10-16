export type Platform = 'mac' | 'windows'

export type Installer = {
  platform: Platform
  architecture: 'arm64' | 'x64' | 'universal'
  format: 'dmg' | 'exe'
  filename: string
  url: string
  minimumOs: string
  installation: readonly string[]
  signing: 'signed-notarized' | 'signed'
  acceptanceRecord: string
}

export type Release = {
  version: string
  date: string
  approvalRecord: string
  downloadOrigin: string
  notes: readonly string[]
  installers: readonly Installer[]
}

type ReleaseRecord =
  | { status: 'development' }
  | { status: 'released'; release: Release }

// No approved release has been supplied. Never seed this with candidate versions,
// updater ZIPs, mutable "latest" URLs or illustrative download data.
export const releaseRecord: ReleaseRecord = { status: 'development' }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function hasTextList(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every(hasText)
}

function isReleaseDate(value: unknown): value is string {
  if (!hasText(value) || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  )
}

function isInstaller(
  value: unknown,
  version: string,
  origin: string,
): value is Installer {
  if (!isRecord(value)) return false
  const mac = value.platform === 'mac'
  if (
    (!mac && value.platform !== 'windows') ||
    !hasText(value.architecture) ||
    !['arm64', 'x64', ...(mac ? ['universal'] : [])].includes(
      value.architecture,
    ) ||
    value.format !== (mac ? 'dmg' : 'exe') ||
    value.signing !== (mac ? 'signed-notarized' : 'signed') ||
    !hasText(value.filename) ||
    !hasText(value.url) ||
    !hasText(value.minimumOs) ||
    !hasText(value.acceptanceRecord) ||
    !hasTextList(value.installation)
  )
    return false

  try {
    const url = new URL(value.url)
    const filename = decodeURIComponent(url.pathname.split('/').at(-1) ?? '')
    // Versioned filenames on the recorded origin; no embedded credentials,
    // query parameters, update packages or disguised path separators.
    return (
      url.protocol === 'https:' &&
      url.origin === origin &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      filename === value.filename &&
      !/[\\/]/.test(filename) &&
      filename.endsWith(`.${value.format}`) &&
      filename
        .split(/[-_]/)
        .some(
          (part) => part === version || part === `${version}.${value.format}`,
        )
    )
  } catch {
    return false
  }
}

// Production content validation, not proof of signing or owner acceptance.
// A malformed/incomplete record never exposes a partial set of download links.
function approvedRelease(value: unknown): Release | undefined {
  if (
    !isRecord(value) ||
    value.status !== 'released' ||
    !isRecord(value.release)
  )
    return
  const release = value.release
  if (
    !hasText(release.version) ||
    !/^\d+\.\d+\.\d+$/.test(release.version) ||
    !isReleaseDate(release.date) ||
    !hasText(release.approvalRecord) ||
    !hasText(release.downloadOrigin) ||
    !hasTextList(release.notes) ||
    !Array.isArray(release.installers) ||
    release.installers.length === 0
  )
    return
  try {
    const origin = new URL(release.downloadOrigin)
    if (
      origin.protocol !== 'https:' ||
      origin.origin !== release.downloadOrigin
    )
      return
  } catch {
    return
  }
  const version = release.version
  const origin = release.downloadOrigin
  const installers = release.installers
  if (
    !installers.every((item): item is Installer =>
      isInstaller(item, version, origin),
    )
  )
    return
  const identities = installers.map(
    (item) => `${item.platform}/${item.architecture}`,
  )
  if (new Set(identities).size !== identities.length) return
  return {
    version,
    date: release.date,
    approvalRecord: release.approvalRecord,
    downloadOrigin: origin,
    notes: release.notes,
    installers,
  }
}

export const availableRelease = approvedRelease(releaseRecord)

export const platformNames: Record<Platform, string> = {
  mac: 'Mac',
  windows: 'Windows',
}
export const architectureNames: Record<Installer['architecture'], string> = {
  arm64: 'ARM64',
  x64: 'Intel / AMD 64-bit',
  universal: 'Universal',
}

const availablePlatforms = (['mac', 'windows'] as const)
  .filter((platform) =>
    availableRelease?.installers.some((item) => item.platform === platform),
  )
  .map((platform) => platformNames[platform])

export const releaseAvailability = {
  available: Boolean(availableRelease),
  notice: availableRelease
    ? `Available for ${availablePlatforms.join(' and ')}`
    : 'In development for Mac and Windows',
  action: availableRelease
    ? { label: 'Download Collie Writer', href: '/downloads' }
    : { label: 'Explore Collie', href: '/#how-it-works' },
}
