import { type ReactNode } from 'react'
import { useFeatureReveal } from './use-feature-reveal'
import styles from './FeatureSection.module.css'

type FeatureSectionProps = {
  sectionKey: 'hero' | 'ai' | 'research' | 'structure' | 'review' | 'ownership'
  headingId: string
  tone: 'paper' | 'sage'
  children: ReactNode
} & (
  | { details: ReactNode; detailTitle: ReactNode; detailKicker: string }
  | { details?: never; detailTitle?: never; detailKicker?: never }
)

/** Natural-height foundation; entry state is owned by the homepage controller. */
export default function FeatureSection({
  sectionKey,
  headingId,
  tone,
  children,
  details,
  detailTitle,
  detailKicker,
}: FeatureSectionProps) {
  const {
    phase,
    sectionRef,
    surfaceRef,
    detailBodyRef,
    toolbarRef,
    detailHeadingRef,
    openerRef,
    open,
    close,
  } = useFeatureReveal()
  const detailActive = phase === 'revealing' || phase === 'detail'
  const detailHeadingId = `${sectionKey}-detail-heading`

  return (
    <section
      ref={sectionRef}
      id={`home-${sectionKey}`}
      className={styles.section}
      data-home-section={sectionKey}
      data-tone={tone}
      data-section-heading={headingId}
      data-feature-state={details ? phase : undefined}
      aria-labelledby={detailActive ? detailHeadingId : headingId}
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || event.defaultPrevented || !detailActive)
          return
        const target = event.target
        if (
          target instanceof Element &&
          target.closest(
            'input, textarea, select, [contenteditable], [role="combobox"], [role="listbox"], [role="menu"], [role="dialog"]',
          )
        )
          return
        event.preventDefault()
        event.stopPropagation()
        close()
      }}
    >
      {details ? (
        <div className={styles.layers}>
          <div
            id={`${sectionKey}-details`}
            data-feature-details=""
            className={styles['detail-layer']}
            role="region"
            aria-labelledby={detailHeadingId}
            aria-hidden={!detailActive}
            inert={!detailActive}
            hidden={phase === 'summary'}
          >
            <div className={`${styles.inner} ${styles['detail-inner']}`}>
              <div ref={toolbarRef} className={styles.toolbar}>
                <button
                  className={styles.control}
                  type="button"
                  onClick={close}
                >
                  Back to overview
                </button>
              </div>
              <div ref={detailBodyRef}>
                <div className={styles['detail-heading']}>
                  <p className={styles.kicker}>{detailKicker}</p>
                  <h2
                    ref={detailHeadingRef}
                    id={detailHeadingId}
                    data-feature-heading="detail"
                    tabIndex={-1}
                  >
                    {detailTitle}
                  </h2>
                </div>
                {details}
                <button
                  className={`${styles.control} ${styles['bottom-return']}`}
                  type="button"
                  onClick={close}
                >
                  Back to overview
                </button>
              </div>
            </div>
          </div>
          <div
            ref={surfaceRef}
            className={styles['summary-surface']}
            data-feature-summary=""
            aria-hidden={detailActive}
            inert={detailActive}
            hidden={phase === 'detail'}
          >
            <div className={styles.inner}>
              <div id={`${sectionKey}-summary`}>{children}</div>
              <button
                ref={openerRef}
                id={`${sectionKey}-learn-more`}
                type="button"
                className={styles.control}
                data-entry-part="action"
                aria-expanded={detailActive}
                aria-controls={`${sectionKey}-details`}
                onClick={open}
              >
                Learn more
                <span className={styles['accessible-label']}>
                  {' '}
                  about {sectionKey}
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.inner}>
          <div id={`${sectionKey}-summary`}>{children}</div>
        </div>
      )}
    </section>
  )
}

export function FeatureOverview({
  headingId,
  kicker,
  title,
  children,
  illustration,
}: {
  headingId: string
  kicker: string
  title: ReactNode
  children: ReactNode
  illustration: ReactNode
}) {
  return (
    <div className={styles.overview}>
      <div className={styles.copy}>
        <div data-entry-part="heading">
          <p className={styles.kicker}>{kicker}</p>
          <h2 id={headingId} tabIndex={-1}>
            {title}
          </h2>
        </div>
        <div className={styles.description} data-entry-part="subtitle">
          {children}
        </div>
      </div>
      {illustration}
    </div>
  )
}
