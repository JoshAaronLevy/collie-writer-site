import { Paper } from '@mantine/core'
import FeatureSection, { FeatureOverview } from './FeatureSection'
import FeatureIllustration from './FeatureIllustration'
import FeatureDetails from './FeatureDetails'
import { exampleProject } from './example-project'
import styles from './ReviewStory.module.css'

const heading = {
  title: 'Go beyond the red underline.',
  kicker: '03 / Review · Planned feature',
}

export default function ReviewStory() {
  return (
    <FeatureSection
      sectionKey="review"
      headingId="review-heading"
      tone="paper"
      detailTitle={heading.title}
      detailKicker={heading.kicker}
      details={
        <div className={styles['review-details']}>
          <FeatureDetails
            name="Review"
            pages={[
              {
                id: 'review-evidence',
                title: 'Possible overstatement',
                labelledBy: 'review-finding-title',
                content: (
                  <figure className={styles['review-example']}>
                    <figcaption className={styles['example-caption']}>
                      <span>{exampleProject.title}</span>
                      <span>Illustrative review · invented content</span>
                    </figcaption>
                    <div className={styles['passage-comparison']}>
                      <div className={styles['draft-passage']}>
                        <p className={styles['passage-label']}>
                          Draft · {exampleProject.selectedChapter}
                        </p>
                        <blockquote>
                          The square’s shaded seating{' '}
                          <mark>brings strangers together.</mark>
                        </blockquote>
                        <p className={styles['source-reference']}>
                          Cites:{' '}
                          <a href="#review-source">
                            {exampleProject.source.title}
                          </a>
                        </p>
                      </div>
                      <div className={styles['source-passage']}>
                        <p className={styles['passage-label']}>
                          Supplied source excerpt
                        </p>
                        <h3 id="review-source" tabIndex={-1}>
                          {exampleProject.source.title}
                        </h3>
                        <blockquote>{exampleProject.source.text}</blockquote>
                      </div>
                    </div>
                    <Paper className={styles['review-finding']}>
                      <div>
                        <h3 id="review-finding-title">
                          Possible overstatement
                        </h3>
                        <p>
                          The excerpt describes seating, not interaction. Narrow
                          the claim or find supporting evidence.
                        </p>
                      </div>
                      <div>
                        <p className={styles['passage-label']}>
                          Suggested wording · for your review
                        </p>
                        <blockquote>
                          The square offers shaded seating beside the walking
                          route.
                        </blockquote>
                      </div>
                    </Paper>
                  </figure>
                ),
              },
              {
                id: 'review-source-use',
                title: 'See your source use.',
                labelledBy: 'review-source-use-title',
                content: (
                  <ul
                    className={styles['review-capabilities']}
                    role="list"
                    aria-label="Planned proofreading capabilities"
                  >
                    <li>
                      <h3>Give claims their support.</h3>
                      <p>
                        Flag attribution gaps and citation-style issues. Find
                        support in your project or continue with the{' '}
                        <a href="/#how-it-works">research assistant</a>.
                      </p>
                    </li>
                    <li>
                      <h3 id="review-source-use-title">See your source use.</h3>
                      <p>
                        Which sources, how often, and where? Spot gaps and
                        unused research; frequency alone isn’t overuse.
                      </p>
                    </li>
                  </ul>
                ),
              },
              {
                id: 'review-repetition',
                title: 'Make each paragraph count.',
                labelledBy: 'review-repetition-title',
                content: (
                  <div>
                    <div className={styles['repetition-introduction']}>
                      <h3 id="review-repetition-title">
                        Make each paragraph count.
                      </h3>
                      <p>
                        Strengthen wording, transitions and flow. Spot repeated
                        arguments while preserving useful recaps.
                      </p>
                    </div>

                    <div className={styles['repetition-example']}>
                      <h3>Another lens: when an idea repeats</h3>
                      <div className={styles['repetition-content']}>
                        <p className={styles['example-label']}>
                          Illustrative repetition finding · invented passages
                        </p>
                        <div className={styles['repeated-passages']}>
                          <div>
                            <h3>{exampleProject.selectedChapter}</h3>
                            <blockquote>
                              Somewhere to sit without needing to buy anything.
                            </blockquote>
                          </div>
                          <div>
                            <h3>{exampleProject.chapters[2].title}</h3>
                            <blockquote>
                              A welcoming space lets you sit without buying
                              something.
                            </blockquote>
                          </div>
                        </div>
                        <p>
                          These passages return to the same idea. Is the second
                          a useful reminder, or could it move the argument
                          forward by asking who still feels excluded?
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
          <p className={styles['author-choice']}>
            You choose changes. No automatic rewriting or citation insertion.
          </p>
          <p className={styles['review-scope']}>
            Comparisons need relevant source text and context. Findings guide
            your judgment; they don’t certify accuracy.
          </p>
        </div>
      }
    >
      <FeatureOverview
        headingId="review-heading"
        kicker={heading.kicker}
        title={heading.title}
        illustration={<FeatureIllustration kind="review" />}
      >
        <p>
          A supercharged proofreader for evidence, citations and arguments,
          alongside spelling and grammar. Keep your voice.
        </p>
      </FeatureOverview>
    </FeatureSection>
  )
}
