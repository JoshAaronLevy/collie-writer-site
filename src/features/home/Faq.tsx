import { faq } from '../../content/faq'
import styles from './Faq.module.css'

export default function Faq({ full = false }: { full?: boolean }) {
  const items = full
    ? faq
    : faq.filter((item) =>
        ['files', 'ai', 'ai-usage', 'ai-history', 'ai-review'].includes(
          item.id,
        ),
      )
  return (
    <section
      className={styles['faq-section']}
      data-embedded={full}
      aria-labelledby="faq"
    >
      <h2 id="faq" tabIndex={-1}>
        A few practical answers.
      </h2>
      <div className={styles['questions']}>
        {items.map((item) => (
          <details key={item.id} id={`faq-${item.id}`}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
      {!full ? (
        <a className={styles['help-link']} href="/help#faq">
          All questions and getting started <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </section>
  )
}
