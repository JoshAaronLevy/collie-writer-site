import { Paper } from '@mantine/core'
import { exampleProject } from './example-project'
import styles from './ResearchStory.module.css'

export default function ResearchStory() {
  return (
    <section
      className={styles['research-section']}
      aria-labelledby="how-it-works"
    >
      <div className={styles['research-heading']}>
        <div>
          <p className={styles['section-kicker']}>
            01 / Research · In development
          </p>
          <h2 id="how-it-works" tabIndex={-1}>
            Follow the question further.
          </h2>
        </div>
        <div className={styles['research-copy']}>
          <p>
            Find sources, explore disagreements and question the evidence. Keep
            useful references and conversations with your project.
          </p>
        </div>
      </div>

      <figure className={styles['research-example']}>
        <figcaption className={styles['example-caption']}>
          <span>{exampleProject.title}</span>
          <span>Illustrative conversation · invented content</span>
        </figcaption>
        <div className={styles['research-workspace']}>
          <div className={styles['research-conversation']}>
            <div className={styles['research-question']}>
              <p className={styles['speaker-label']}>You ask</p>
              <p>{exampleProject.passage.text}</p>
            </div>
            <div className={styles['research-answer']}>
              <p className={styles['speaker-label']}>
                Research assistant · example
              </p>
              <p>
                <a href="#research-source">{exampleProject.source.title}</a>{' '}
                describes seating. Who stays, and whether they meet anyone,
                remains a question to investigate.
              </p>
            </div>
            <div className={styles['research-lead']}>
              <h3>A direction to explore</h3>
              <p>
                Compare research on social interaction around shaded and
                unshaded seating, including conflicting findings.
              </p>
              <p className={styles['evidence-note']}>
                A search direction, not a source already examined.
              </p>
            </div>
          </div>
          <Paper className={styles['selected-source']}>
            <p className={styles['source-label']}>Selected excerpt · example</p>
            <h3 id="research-source" tabIndex={-1}>
              {exampleProject.source.title}
            </h3>
            <blockquote>{exampleProject.source.text}</blockquote>
            <p className={styles['source-origin']}>
              {exampleProject.source.origin}
            </p>
          </Paper>
        </div>
      </figure>
    </section>
  )
}
