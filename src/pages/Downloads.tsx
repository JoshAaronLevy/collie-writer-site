import { Button } from '@mantine/core'
import {
  architectureNames,
  availableRelease,
  platformNames,
  releaseAvailability,
  type Installer,
  type Platform,
} from '../content/release'
import styles from './Downloads.module.css'

function InstallerDetails({ installer }: { installer: Installer }) {
  const architecture =
    installer.platform === 'mac' && installer.architecture === 'arm64'
      ? 'Apple silicon'
      : installer.platform === 'mac' && installer.architecture === 'x64'
        ? 'Intel'
        : architectureNames[installer.architecture]
  return (
    <article className={styles['installer']}>
      <h3>{architecture}</h3>
      <p>
        {installer.minimumOs} · {installer.format.toUpperCase()} installer
      </p>
      <Button component="a" href={installer.url} size="md">
        Download for {platformNames[installer.platform]} · {architecture}
      </Button>
      <p className={styles['filename']}>{installer.filename}</p>
      <h4>Installation</h4>
      <ol>
        {installer.installation.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </article>
  )
}

function PlatformDownloads({ platform }: { platform: Platform }) {
  const installers =
    availableRelease?.installers.filter((item) => item.platform === platform) ??
    []
  return (
    <section
      className={styles['platform-section']}
      aria-labelledby={`${platform}-downloads`}
    >
      <p className={styles['eyebrow']}>Collie Writer for</p>
      <h2 id={`${platform}-downloads`} tabIndex={-1}>
        {platformNames[platform]}
      </h2>
      {installers.length > 0 ? (
        <>
          <p className={styles['platform-description']}>
            {platform === 'mac'
              ? 'Choose the installer that matches your Mac’s chip. Universal supports both Apple silicon and Intel when listed.'
              : 'Choose the installer that matches your PC’s processor: ARM64 or Intel / AMD 64-bit, when listed.'}{' '}
            Check the supported system listed with each download.
          </p>
          {installers.map((installer) => (
            <InstallerDetails
              key={installer.architecture}
              installer={installer}
            />
          ))}
        </>
      ) : (
        <div className={styles['unavailable']}>
          <p className={styles['availability-label']}>Not available yet</p>
          <p>
            There is no public {platformNames[platform]} installer to download
            yet.
          </p>
          <p>
            Supported systems, processor options and installation steps will
            appear here with the release.
          </p>
        </div>
      )}
    </section>
  )
}

export default function Downloads() {
  return (
    <div className={styles['downloads-page']}>
      <title>Downloads — Collie Writer</title>
      <div className={styles['page-intro']}>
        <p className={styles['eyebrow']}>{releaseAvailability.notice}</p>
        <h1>Room for your next chapter.</h1>
        <p>
          {availableRelease
            ? 'Choose your platform below. Only the available installers are listed; choosing a platform does not start a download.'
            : 'Collie Writer is still in development. Downloads are not available yet, and no release date has been announced.'}
        </p>
        {availableRelease ? (
          <p className={styles['release-version']}>
            Version {availableRelease.version} · Released{' '}
            <time dateTime={availableRelease.date}>
              {availableRelease.date}
            </time>
          </p>
        ) : (
          <a href="/#how-it-works">
            Explore Collie <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      <nav
        className={styles['platform-choices']}
        aria-label="Choose a download platform"
      >
        <a href="#mac-downloads">
          Mac <span aria-hidden="true">↓</span>
        </a>
        <a href="#windows-downloads">
          Windows <span aria-hidden="true">↓</span>
        </a>
      </nav>
      <div className={styles['platform-grid']}>
        <PlatformDownloads platform="mac" />
        <PlatformDownloads platform="windows" />
      </div>
      {availableRelease ? (
        <section
          className={styles['release-notes']}
          aria-labelledby="release-notes"
        >
          <h2 id="release-notes">What’s in this release</h2>
          <ul>
            {availableRelease.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      ) : null}
      <aside
        className={styles['transfer-note']}
        aria-labelledby="moving-projects"
      >
        <h2 id="moving-projects">Taking your work with you</h2>
        <p>
          A saved .collie project is separate from the application installer.
          Moving that file carries your saved writing and retained material;
          restoring paid access is a separate step.
        </p>
        <a href="/#pricing">
          See {releaseAvailability.available ? 'the offers' : 'planned pricing'}
        </a>
      </aside>
    </div>
  )
}
