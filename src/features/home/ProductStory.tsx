import { Paper } from '@mantine/core'
import { exampleProject } from './example-project'
import { useShapeMotion } from './use-shape-motion'
import ResearchStory from './ResearchStory'
import ReviewStory from './ReviewStory'
import styles from './ProductStory.module.css'

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
  const boardRef = useShapeMotion()
  return (
    <figure className={styles['plan-figure']}>
      <div ref={boardRef} className={styles['plan-board']}>
        <div className={styles['plan-material']}>
          <p className={styles['board-label']}>Selected project material</p>
          <MaterialCard kind="note" />
          <MaterialCard kind="source" />
          <MaterialCard kind="passage" />
        </div>
        <div className={styles['assignment-connection']}>
          <span aria-hidden="true">↗</span>
          <p>Find themes. Shape chapters.</p>
        </div>
        <div className={styles['plan-structure']}>
          <p className={styles['board-label']}>AI proposal, refined by you</p>
          <ol
            className={styles['planned-chapters']}
            role="list"
            aria-label="Illustrative chapter outline"
          >
            {exampleProject.chapters.map((chapter, index) => (
              <li
                key={chapter.title}
                data-selected={chapter.title === exampleProject.selectedChapter}
              >
                <span className={styles['chapter-number']} aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  {chapter.title === exampleProject.selectedChapter ? (
                    <p className={styles['chapter-revision']}>
                      AI suggested: {exampleProject.suggestedChapterTitle}
                      <span>Your revised title</span>
                    </p>
                  ) : null}
                  <h3>{chapter.title}</h3>
                  <p>{chapter.purpose}</p>
                  {chapter.title === exampleProject.selectedChapter ? (
                    <ul
                      className={styles['chapter-links']}
                      role="list"
                      aria-label="Material linked to Everyday encounters"
                    >
                      <li>Note · {exampleProject.note.title}</li>
                      <li>Source · {exampleProject.source.title}</li>
                      <li>Conversation · {exampleProject.passage.title}</li>
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
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

      <section
        className={styles['shape-section']}
        aria-labelledby="shape-heading"
      >
        <div className={styles['shape-content']}>
          <div className={styles['shape-heading']}>
            <div className={styles['story-copy']}>
              <p className={styles['section-kicker']}>
                02 / Structure · In development
              </p>
              <h2 id="shape-heading" tabIndex={-1}>
                There’s a structure in what you’ve collected.
              </h2>
            </div>
            <div className={styles['shape-description']}>
              <p>
                Find themes and gaps across selected material. Develop an AI
                outline with a purpose for each chapter.
              </p>
              <p>
                Discuss or edit it, then choose Use outline. Your writing
                structure and chapter material stay connected.
              </p>
            </div>
          </div>
          <PlanIllustration />
          <p className={styles['planning-context']}>
            Import earlier conversations explicitly. Signing in doesn’t import
            history. Analysis uses selected material within size limits.
          </p>
        </div>
      </section>

      <ReviewStory />

      <section
        className={styles['ownership-section']}
        aria-labelledby="ownership-heading"
      >
        <div className={styles['ownership-content']}>
          <div className={styles['ownership-copy']}>
            <p className={styles['section-kicker']}>Room to work your way</p>
            <h2 id="ownership-heading">
              Your work.
              <br />
              Your files.
            </h2>
            <p>
              Write and organize offline. Save your manuscript and retained
              material in a portable .collie file. Local recovery and some
              unfinished drafts stay on your computer.
            </p>
            <p>
              Add citations. Export to Word, PDF, Markdown or plain text.
              Permanently ad-free.{' '}
              <a href="/privacy">
                AI requests send selected context to the provider.
              </a>
            </p>
          </div>
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
        </div>
      </section>
    </>
  )
}
