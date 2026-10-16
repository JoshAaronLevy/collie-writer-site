import { Button } from '@mantine/core'
import { releaseAvailability } from '../../content/release'
import WorkspaceIllustration from './WorkspaceIllustration'
import styles from './HomeHero.module.css'

export default function HomeHero() {
  return (
    <section className={styles['home-hero']} aria-labelledby="hero-heading">
      <div className={styles['hero-copy']}>
        <p className={styles['hero-eyebrow']}>A home for your nonfiction</p>
        <h1 id="hero-heading" className={styles['hero-heading']}>
          You’ve gathered the ideas.
          <span>Now give them a shape.</span>
        </h1>
        <p className={styles['hero-description']}>
          Bring your research, notes and writing into one calm workspace. Turn
          what you know into a book, article or essay.
        </p>
        <Button
          component="a"
          href={releaseAvailability.action.href}
          className={styles['explore-link']}
          rightSection={
            <span aria-hidden="true">
              {releaseAvailability.available ? '↗' : '↓'}
            </span>
          }
        >
          {releaseAvailability.action.label}
        </Button>
        {releaseAvailability.available ? (
          <a className={styles['story-link']} href="/#how-it-works">
            See how it works
          </a>
        ) : null}
        <p className={styles['development-notice']}>
          <span aria-hidden="true" />
          {releaseAvailability.notice}
        </p>
      </div>
      <WorkspaceIllustration />
    </section>
  )
}
