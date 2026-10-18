import { Paper } from '@mantine/core'
import FeatureSection, { FeatureOverview } from './FeatureSection'
import FeatureIllustration from './FeatureIllustration'
import FeatureDetails from './FeatureDetails'
import { exampleProject } from './example-project'
import styles from './ResearchStory.module.css'

const heading = {
  title: 'Follow the question further.',
  kicker: '01 / Research · In development',
}

export default function ResearchStory() {
  return (
    <FeatureSection
      sectionKey="research"
      headingId="how-it-works"
      tone="paper"
      detailTitle={heading.title}
      detailKicker={heading.kicker}
      details={
        <figure className={styles['research-example']}>
          <figcaption className={styles['example-caption']}>
            <span>{exampleProject.title}</span>
            <span>Illustrative conversation · invented content</span>
          </figcaption>
          <FeatureDetails
            name="Research"
            pages={[
              {
                id: 'research-conversation',
                title: 'A direction to explore',
                labelledBy: 'research-direction',
                content: (
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
                          <a href="#research-source">
                            {exampleProject.source.title}
                          </a>{' '}
                          describes seating. Who stays, and whether they meet
                          anyone, remains a question to investigate.
                        </p>
                      </div>
                      <div className={styles['research-lead']}>
                        <h3 id="research-direction">A direction to explore</h3>
                        <p>
                          Compare research on social interaction around shaded
                          and unshaded seating, including conflicting findings.
                        </p>
                        <p className={styles['evidence-note']}>
                          A search direction, not a source already examined.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                id: 'research-excerpt',
                title: exampleProject.source.title,
                labelledBy: 'research-source',
                content: (
                  <Paper className={styles['selected-source']}>
                    <p className={styles['source-label']}>
                      Selected excerpt · example
                    </p>
                    <h3 id="research-source" tabIndex={-1}>
                      {exampleProject.source.title}
                    </h3>
                    <blockquote>{exampleProject.source.text}</blockquote>
                    <p className={styles['source-origin']}>
                      {exampleProject.source.origin}
                    </p>
                  </Paper>
                ),
              },
            ]}
          />
        </figure>
      }
    >
      <FeatureOverview
        headingId="how-it-works"
        kicker={heading.kicker}
        title={heading.title}
        illustration={<FeatureIllustration kind="research" />}
      >
        <p>
          Find sources, explore disagreements and question the evidence. Keep
          useful references and conversations with your project.
        </p>
      </FeatureOverview>
    </FeatureSection>
  )
}
