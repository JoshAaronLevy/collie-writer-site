import { Paper } from '@mantine/core'
import { useId } from 'react'
import { exampleProject } from './example-project'
import styles from './WorkspaceIllustration.module.css'

export default function WorkspaceIllustration({
  view = 'overview',
}: {
  view?: 'overview' | 'writing'
}) {
  const captionId = useId()
  const ChapterHeading = view === 'writing' ? 'h3' : 'h2'
  return (
    <figure
      className={styles['workspace-figure']}
      aria-labelledby={captionId}
      data-view={view}
    >
      <div className={styles['workspace-scene']}>
        <Paper className={styles['workspace-window']}>
          <div className={styles['workspace-titlebar']}>
            <span className={styles['window-decoration']} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <p>{exampleProject.title}</p>
            <div className={styles['workspace-modes']} aria-hidden="true">
              <span>Plan</span>
              <span className={styles['current-mode']}>Write</span>
            </div>
          </div>

          <div className={styles['workspace-body']}>
            <div className={styles['chapter-outline']}>
              <p className={styles['panel-label']}>Outline</p>
              <ol className={styles['chapter-list']}>
                {exampleProject.chapters.map((chapter, index) => (
                  <li
                    key={chapter}
                    className={
                      chapter === exampleProject.selectedChapter
                        ? styles['selected-chapter']
                        : undefined
                    }
                  >
                    <span
                      className={styles['chapter-number']}
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                    {chapter === exampleProject.selectedChapter ? (
                      <strong>{chapter}</strong>
                    ) : (
                      chapter
                    )}
                  </li>
                ))}
              </ol>
              <p className={styles['project-type']}>Nonfiction book</p>
            </div>

            <div className={styles['manuscript']}>
              <p className={styles['chapter-kicker']}>Chapter 02</p>
              <ChapterHeading className={styles['manuscript-title']}>
                {exampleProject.selectedChapter}
              </ChapterHeading>
              <p>{exampleProject.opening}</p>
              <p>
                A bench gives someone <mark>a reason to stay</mark>. And staying
                makes room for the small encounters that turn a place into a
                shared part of our lives.
              </p>
              {view === 'writing' ? (
                <p>
                  In the square, shaded seating sits beside a walking route. The
                  path brings people through; the seats offer a pause. What
                  happens in that space between passing and staying?
                </p>
              ) : null}
              <div className={styles['manuscript-rule']} aria-hidden="true" />
              <p className={styles['manuscript-context']}>
                Your writing, with its thinking close by.
              </p>
            </div>
          </div>
        </Paper>

        <Paper className={styles['chapter-material']}>
          <div className={styles['material-heading']}>
            <p>Chapter material</p>
            <span>For “{exampleProject.selectedChapter}”</span>
          </div>
          <div className={styles['material-items']}>
            <div className={styles['linked-note']}>
              <p className={styles['material-type']}>Note</p>
              <p>{exampleProject.note.text}</p>
            </div>
            <div className={styles['linked-source']}>
              <p className={styles['material-type']}>
                Source excerpt · example
              </p>
              <p>{exampleProject.source.text}</p>
              {view === 'writing' ? (
                <p className={styles['source-origin']}>
                  {exampleProject.source.origin}
                </p>
              ) : null}
            </div>
          </div>
        </Paper>
      </div>
      <figcaption id={captionId} className={styles['workspace-caption']}>
        Illustrative workspace · example content
      </figcaption>
    </figure>
  )
}
