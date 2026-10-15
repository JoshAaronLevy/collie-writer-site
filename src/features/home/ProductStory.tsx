import { Paper } from '@mantine/core'
import { exampleProject } from './example-project'
import WorkspaceIllustration from './WorkspaceIllustration'
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

function GatherIllustration() {
  return (
    <figure className={styles['gather-figure']}>
      <div className={styles['gather-collection']}>
        <p className={styles['collection-title']}>{exampleProject.title}</p>
        <MaterialCard kind="note" />
        <MaterialCard kind="source" />
        <MaterialCard kind="passage" />
      </div>
      <figcaption className={styles['illustration-caption']}>
        Illustrative collection · invented notes, source and conversation
      </figcaption>
    </figure>
  )
}

function PlanIllustration() {
  return (
    <figure className={styles['plan-figure']}>
      <div className={styles['plan-board']}>
        <div className={styles['plan-material']}>
          <p className={styles['board-label']}>Material</p>
          <MaterialCard kind="note" />
          <MaterialCard kind="source" />
        </div>
        <div className={styles['assignment-connection']}>
          <span aria-hidden="true">↗</span>
          <p>
            Linked to <br />
            {exampleProject.selectedChapter}
          </p>
        </div>
        <div className={styles['plan-structure']}>
          <p className={styles['board-label']}>Chapters</p>
          <ol className={styles['planned-chapters']}>
            {exampleProject.chapters.map((chapter, index) => (
              <li
                key={chapter}
                data-selected={chapter === exampleProject.selectedChapter}
              >
                <span className={styles['chapter-number']} aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3>{chapter}</h3>
                  {chapter === exampleProject.selectedChapter ? (
                    <>
                      <p>How places make room for everyday connection.</p>
                      <ul
                        className={styles['chapter-links']}
                        aria-label="Material linked to Everyday encounters"
                      >
                        <li>Note · {exampleProject.note.title}</li>
                        <li>Source · {exampleProject.source.title}</li>
                      </ul>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <figcaption className={styles['illustration-caption']}>
        Illustrative Plan workspace · the same note and excerpt, linked to a
        chapter
      </figcaption>
    </figure>
  )
}

export default function ProductStory() {
  return (
    <>
      <section
        className={styles['gather-section']}
        aria-labelledby="how-it-works"
      >
        <div className={styles['story-copy']}>
          <p className={styles['section-kicker']}>01 / Gather</p>
          <h2 id="how-it-works" tabIndex={-1}>
            A place for the pieces.
          </h2>
          <p>
            A note you don’t want to lose. A source worth returning to. A useful
            passage from a conversation. Bring them into the same project, so
            the next thought has somewhere to land.
          </p>
          <p>
            Keep an excerpt with its original, or a saved passage with the
            exchange it came from. You can return to the context while your own
            ideas take shape.
          </p>
        </div>
        <GatherIllustration />
      </section>

      <section
        className={styles['shape-section']}
        aria-labelledby="shape-heading"
      >
        <div className={styles['shape-content']}>
          <div className={styles['shape-heading']}>
            <div className={styles['story-copy']}>
              <p className={styles['section-kicker']}>02 / Shape</p>
              <h2 id="shape-heading">
                Find the shape
                <br />
                of your argument.
              </h2>
            </div>
            <div className={styles['shape-description']}>
              <p>
                Group related ideas, arrange your chapters and connect the
                material each chapter needs. A note about a bench and an
                observation about a square become a starting point for “Everyday
                encounters.”
              </p>
              <p>
                You don’t need a finished outline to begin. Move between Plan
                and Write as your thinking changes; both use the same project
                structure.
              </p>
            </div>
          </div>
          <PlanIllustration />
        </div>
      </section>

      <section
        className={styles['write-section']}
        aria-labelledby="write-heading"
      >
        <div className={styles['writing-heading']}>
          <p className={styles['section-kicker']}>03 / Write</p>
          <h2 id="write-heading">Keep your research within reach.</h2>
          <p>
            Settle into the draft with the right notes and sources beside it.
            Pick a chapter and find the thinking you’ve connected to it, ready
            to refer to as you write.
          </p>
          <p>
            Add citations through the writing tools. When you’re ready to share,
            export your writing to Word, PDF, Markdown or plain text.
          </p>
        </div>
        <WorkspaceIllustration view="writing" />
        <p className={styles['writing-footnote']}>
          Keep the connection. Make the words your own.
        </p>
      </section>

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
              Your work lives on your computer. Write and organize local
              material offline, without an AI account. Choose Save to put your
              manuscript and retained project material into a portable .collie
              file, in a folder you choose.
            </p>
            <p>
              Keep your research and writing together, without handing them to a
              hosted workspace. Some unfinished drafts and device settings stay
              on that computer; the saved project is the file you take with you.
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
