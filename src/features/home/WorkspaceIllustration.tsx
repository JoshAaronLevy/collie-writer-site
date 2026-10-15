import { Paper } from '@mantine/core'
import styles from './WorkspaceIllustration.module.css'

export default function WorkspaceIllustration() {
  return (
    <figure
      className={styles['workspace-figure']}
      aria-labelledby="workspace-caption"
    >
      <div className={styles['workspace-scene']}>
        <Paper className={styles['workspace-window']}>
          <div className={styles['workspace-titlebar']}>
            <span className={styles['window-decoration']} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <p>Why public spaces matter</p>
            <div className={styles['workspace-modes']} aria-hidden="true">
              <span>Plan</span>
              <span className={styles['current-mode']}>Write</span>
            </div>
          </div>

          <div className={styles['workspace-body']}>
            <div className={styles['chapter-outline']}>
              <p className={styles['panel-label']}>Outline</p>
              <ol className={styles['chapter-list']}>
                <li>
                  <span className={styles['chapter-number']}>01</span>A place to
                  pause
                </li>
                <li className={styles['selected-chapter']}>
                  <span className={styles['chapter-number']}>02</span>
                  <strong>Everyday encounters</strong>
                </li>
                <li>
                  <span className={styles['chapter-number']}>03</span>Making
                  room for everyone
                </li>
              </ol>
              <p className={styles['project-type']}>Nonfiction book</p>
            </div>

            <div className={styles['manuscript']}>
              <p className={styles['chapter-kicker']}>Chapter 02</p>
              <h2 className={styles['manuscript-title']}>
                Everyday encounters
              </h2>
              <p>
                A public space begins with an invitation. A patch of shade. A
                clear path. Somewhere to sit without needing to buy anything.
              </p>
              <p>
                A bench gives someone <mark>a reason to stay</mark>. And staying
                makes room for the small encounters that turn a place into a
                shared part of our lives.
              </p>
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
            <span>For “Everyday encounters”</span>
          </div>
          <div className={styles['material-items']}>
            <div className={styles['linked-note']}>
              <p className={styles['material-type']}>Note</p>
              <p>A bench gives someone a reason to stay.</p>
            </div>
            <div className={styles['linked-source']}>
              <p className={styles['material-type']}>
                Source excerpt · example
              </p>
              <p>The square has shaded seating beside the walking route.</p>
            </div>
          </div>
        </Paper>
      </div>
      <figcaption
        id="workspace-caption"
        className={styles['workspace-caption']}
      >
        Illustrative workspace · example content
      </figcaption>
    </figure>
  )
}
