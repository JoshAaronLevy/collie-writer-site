import { Button } from '@mantine/core'
import { releaseAvailability } from '../../content/release'
import WorkspaceIllustration from './WorkspaceIllustration'
import FeatureSection from './FeatureSection'
import styles from './HomeHero.module.css'

export default function HomeHero() {
  return (
    <FeatureSection sectionKey="hero" headingId="hero-heading" tone="paper">
      <div className={styles['home-hero']}>
        <div className={styles['hero-copy']}>
          {/* <p className={styles['hero-eyebrow']}>AI for thoughtful nonfiction</p> */}
          <h1
            id="hero-heading"
            tabIndex={-1}
            className={styles['hero-heading']}
            data-entry-part="heading"
          >
            Research deeper.
            <span>Write with conviction.</span>
          </h1>
          <p className={styles['hero-description']} data-entry-part="subtitle">
            Explore your sources, turn your ideas into a structure, and review
            the strength of your writing, with AI alongside your work.
          </p>
          <Button
            component="a"
            href={releaseAvailability.action.href}
            className={styles['explore-link']}
            data-entry-part="action"
          >
            {releaseAvailability.action.label}
          </Button>
          <a
            className={styles['story-link']}
            href="/#ai-tools"
            data-entry-part="action"
          >
            Explore the AI tools
          </a>
        </div>
        <WorkspaceIllustration />
      </div>
    </FeatureSection>
  )
}
