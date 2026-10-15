import { Button } from '@mantine/core'
import WorkspaceIllustration from './WorkspaceIllustration'
import styles from './HomeHero.module.css'

export default function HomeHero() {
  return (
    <>
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
            href="#how-it-works"
            className={styles['explore-link']}
            rightSection={<span aria-hidden="true">↓</span>}
          >
            Explore Collie
          </Button>
          <p className={styles['development-notice']}>
            <span aria-hidden="true" />
            In development for Mac and Windows
          </p>
        </div>
        <WorkspaceIllustration />
      </section>

      <section
        className={styles['workflow-introduction']}
        aria-labelledby="how-it-works"
      >
        <div className={styles['introduction-heading']}>
          <p className={styles['introduction-eyebrow']}>
            From the first note to the next chapter
          </p>
          <h2 id="how-it-works" tabIndex={-1}>
            Make something
            <br />
            of what you know.
          </h2>
        </div>
        <div className={styles['introduction-copy']}>
          <p>
            Start with the pieces you already have. Gather notes and sources,
            shape an outline, then keep the right material beside the chapter
            you’re writing.
          </p>
          <p>
            A place to collect your thinking—and the space to make it your own.
          </p>
          <p className={styles['workflow-sequence']}>
            Gather <span aria-hidden="true">→</span> Shape{' '}
            <span aria-hidden="true">→</span> Write
          </p>
        </div>
      </section>
    </>
  )
}
