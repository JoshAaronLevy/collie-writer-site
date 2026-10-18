import styles from './AiIntroduction.module.css'
import FeatureSection from './FeatureSection'
import FeatureIllustration from './FeatureIllustration'

export default function AiIntroduction() {
  return (
    <FeatureSection sectionKey="ai" headingId="ai-tools" tone="sage">
      <div className={styles['connection-story']}>
        <div>
          <h2 id="ai-tools" tabIndex={-1} data-entry-part="heading">
            Your ChatGPT plan.
            <span>Put to work.</span>
          </h2>
          <FeatureIllustration kind="ai" />
        </div>
        <div className={styles['connection-copy']} data-entry-part="subtitle">
          <p>
            The plan: sign in with your existing ChatGPT account, allow plan
            use, and get back to writing.
          </p>
          <p className={styles['connection-promise']}>
            No API keys. No separate AI token bill from Collie.
          </p>
          <p className={styles['plan-qualification']}>
            Eligible ChatGPT plan required. Your plan’s usage limits and credit
            settings apply. Collie pricing is separate. Customer AI access is
            not available yet.
          </p>
        </div>
      </div>
      <nav aria-label="Explore Collie features" data-entry-part="action">
        <ul className={styles['ai-pillars']} role="list">
          <li>
            <a href="/#how-it-works">
              Research deeper <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href="/#shape-heading">
              Find your structure <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href="/#review-heading">
              Review the substance <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href="/#ownership-heading">
              Your work. Your files. <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </nav>
    </FeatureSection>
  )
}
