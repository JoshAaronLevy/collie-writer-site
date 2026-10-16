import type { ReactNode } from 'react'
import styles from './ReadingPage.module.css'

export default function ReadingPage({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children: ReactNode
}) {
  return (
    <article className={styles['reading-page']}>
      <header>
        <p className={styles['eyebrow']}>Collie Writer</p>
        <h1>{title}</h1>
        <p className={styles['intro']}>{intro}</p>
      </header>
      <div className={styles['page-content']}>{children}</div>
    </article>
  )
}
