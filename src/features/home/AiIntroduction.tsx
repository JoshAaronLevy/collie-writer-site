import styles from './AiIntroduction.module.css'

export default function AiIntroduction() {
  return (
    <section className={styles['ai-introduction']} aria-labelledby="ai-tools">
      <div className={styles['connection-story']}>
        <div>
          <h2 id="ai-tools" tabIndex={-1}>
            Your ChatGPT plan.
            <span>Put to work.</span>
          </h2>
        </div>
        <div className={styles['connection-copy']}>
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
      <nav aria-label="Explore the AI tools">
        <ul
          className={styles['ai-pillars']}
          role="list"
          aria-label="Planned AI tools"
        >
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
        </ul>
      </nav>
    </section>
  )
}
