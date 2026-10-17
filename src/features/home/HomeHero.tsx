import { Button } from '@mantine/core'
import { releaseAvailability } from '../../content/release'
import WorkspaceIllustration from './WorkspaceIllustration'
import styles from './HomeHero.module.css'

export default function HomeHero() {
  return (
    <section className={styles['home-hero']} aria-labelledby="hero-heading">
      <div className={styles['hero-copy']}>
        {/* <p className={styles['hero-eyebrow']}>AI for thoughtful nonfiction</p> */}
        <h1 id="hero-heading" className={styles['hero-heading']}>
          Research deeper.
          <span>Write with conviction.</span>
        </h1>
        <p className={styles['hero-description']}>
          Explore your sources, turn your ideas into a structure, and review the
          strength of your writing, with AI alongside your work.
        </p>
        <Button
          component="a"
          href={releaseAvailability.action.href}
          className={styles['explore-link']}
        >
          {releaseAvailability.action.label}
        </Button>
        <a className={styles['story-link']} href="/#ai-tools">
          Explore the AI tools
        </a>
      </div>
      <WorkspaceIllustration />
    </section>
  )
}
