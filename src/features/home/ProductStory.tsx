import { Paper } from '@mantine/core'
import { exampleProject } from './example-project'
import FeatureSection, { FeatureOverview } from './FeatureSection'
import FeatureIllustration from './FeatureIllustration'
import FeatureDetails from './FeatureDetails'
import ResearchStory from './ResearchStory'
import ReviewStory from './ReviewStory'
import styles from './ProductStory.module.css'

const structureHeading = {
  title: 'There’s a structure in what you’ve collected.',
  kicker: '02 / Structure · In development',
}
const ownershipTitle = (
  <>
    Your work.
    <br />
    Your files.
  </>
)
const ownershipKicker = 'Room to work your way'

const materialLabels = {
  note: 'Note',
  source: 'Source excerpt · example',
  passage: 'Conversation passage · example',
}

function MaterialCard({ kind }: { kind: keyof typeof materialLabels }) {
  const material = exampleProject[kind]
  return (
    <Paper className={styles['material-card']} data-kind={kind}>
      <p className={styles['material-kind']}>{materialLabels[kind]}</p>
      <h3>{material.title}</h3>
      <p className={styles['material-text']}>{material.text}</p>
      <p className={styles['material-origin']}>{material.origin}</p>
    </Paper>
  )
}

function PlanIllustration() {
  return (
    <figure className={styles['plan-figure']}>
      <FeatureDetails
        name="Structure"
        pages={[
          {
            id: 'structure-material',
            title: 'Selected project material',
            labelledBy: 'structure-material-label',
            content: (
              <div className={styles['plan-board']}>
                <div className={styles['plan-material']}>
                  <p
                    id="structure-material-label"
                    className={styles['board-label']}
                  >
                    Selected project material
                  </p>
                  <MaterialCard kind="note" />
                  <MaterialCard kind="source" />
                  <MaterialCard kind="passage" />
                </div>
              </div>
            ),
          },
          {
            id: 'structure-outline',
            title: 'AI proposal, refined by you',
            labelledBy: 'structure-outline-label',
            content: (
              <div className={styles['plan-board']}>
                <div className={styles['outline-page']}>
                  <div className={styles['assignment-connection']}>
                    <span aria-hidden="true">↗</span>
                    <p>Find themes. Shape chapters.</p>
                  </div>
                  <div className={styles['plan-structure']}>
                    <p
                      id="structure-outline-label"
                      className={styles['board-label']}
                    >
                      AI proposal, refined by you
                    </p>
                    <ol
                      className={styles['planned-chapters']}
                      role="list"
                      aria-label="Illustrative chapter outline"
                    >
                      {exampleProject.chapters.map((chapter, index) => (
                        <li
                          key={chapter.title}
                          data-selected={
                            chapter.title === exampleProject.selectedChapter
                          }
                        >
                          <span
                            className={styles['chapter-number']}
                            aria-hidden="true"
                          >
                            0{index + 1}
                          </span>
                          <div>
                            {chapter.title ===
                            exampleProject.selectedChapter ? (
                              <p className={styles['chapter-revision']}>
                                AI suggested:{' '}
                                {exampleProject.suggestedChapterTitle}
                                <span>Your revised title</span>
                              </p>
                            ) : null}
                            <h3>{chapter.title}</h3>
                            <p>{chapter.purpose}</p>
                            {chapter.title ===
                            exampleProject.selectedChapter ? (
                              <ul
                                className={styles['chapter-links']}
                                role="list"
                                aria-label="Material linked to Everyday encounters"
                              >
                                <li>Note · {exampleProject.note.title}</li>
                                <li>Source · {exampleProject.source.title}</li>
                                <li>
                                  Conversation · {exampleProject.passage.title}
                                </li>
                              </ul>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ol>
                    <p className={styles['outline-context']}>
                      Discuss or edit it, then choose Use outline. Your writing
                      structure and chapter material stay connected.
                    </p>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
      />
      <figcaption className={styles['illustration-caption']}>
        Illustrative proposal and writer’s revision · invented material
      </figcaption>
    </figure>
  )
}

export default function ProductStory() {
  return (
    <>
      <ResearchStory />

      <FeatureSection
        sectionKey="structure"
        detailTitle={structureHeading.title}
        detailKicker={structureHeading.kicker}
        headingId="shape-heading"
        tone="sage"
        details={
          <>
            <PlanIllustration />
            <p className={styles['planning-context']}>
              Import earlier conversations explicitly. Signing in doesn’t import
              history. Analysis uses selected material within size limits.
            </p>
          </>
        }
      >
        <FeatureOverview
          headingId="shape-heading"
          kicker={structureHeading.kicker}
          title={structureHeading.title}
          illustration={<FeatureIllustration kind="structure" />}
        >
          <p>
            Find themes and gaps across selected material. Develop an AI outline
            with a purpose for each chapter.
          </p>
        </FeatureOverview>
      </FeatureSection>

      <ReviewStory />

      <FeatureSection
        sectionKey="ownership"
        detailTitle={ownershipTitle}
        detailKicker={ownershipKicker}
        headingId="ownership-heading"
        tone="sage"
        details={
          <div
            id="ownership-project"
            tabIndex={-1}
            className={styles['ownership-detail']}
          >
            <div className={styles['project-file']}>
              <span className={styles['file-extension']} aria-hidden="true">
                .collie
              </span>
              <p className={styles['file-name']}>{exampleProject.filename}</p>
              <p>Manuscript · research · saved conversations</p>
              <p className={styles['file-caption']}>
                One portable project. A place you choose.
              </p>
            </div>
            <p>
              Add citations. Export to Word, PDF, Markdown or plain text.
              Permanently ad-free.{' '}
              <a href="/privacy">
                AI requests send selected context to the provider.
              </a>
            </p>
          </div>
        }
      >
        <FeatureOverview
          headingId="ownership-heading"
          kicker={ownershipKicker}
          title={ownershipTitle}
          illustration={<FeatureIllustration kind="ownership" />}
        >
          <p>
            Write and organize offline. Save your manuscript and retained
            material in a portable .collie file. Local recovery and some
            unfinished drafts stay on your computer.
          </p>
        </FeatureOverview>
      </FeatureSection>
    </>
  )
}
