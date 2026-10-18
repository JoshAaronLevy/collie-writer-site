import styles from './FeatureIllustration.module.css'

/** Decorative companions to the text; full, labelled examples live in details. */
export default function FeatureIllustration({
  kind,
}: {
  kind: 'ai' | 'research' | 'structure' | 'review' | 'ownership'
}) {
  return (
    <div data-entry-part="illustration" aria-hidden="true">
      <svg
        className={styles.illustration}
        viewBox="0 0 420 300"
        aria-hidden="true"
        focusable="false"
      >
        <ellipse className={styles.ground} cx="210" cy="265" rx="164" ry="12" />
        {kind === 'ai' ? (
          <>
            <circle className={styles.paper} cx="112" cy="142" r="64" />
            <circle className={styles.accent} cx="112" cy="126" r="19" />
            <path className={styles.line} d="M79 170c3-33 63-33 66 0" />
            <g data-entry-accent="connect">
              <path
                className={styles.line}
                d="M183 142h47m-12-12 12 12-12 12"
              />
            </g>
            <rect
              className={styles.paper}
              x="246"
              y="65"
              width="126"
              height="166"
              rx="8"
            />
            <path className={styles.line} d="M269 103h78m-78 23h78m-78 23h53" />
            <path className={styles.accent} d="m280 187 15 15 31-36" />
          </>
        ) : kind === 'research' ? (
          <>
            <rect
              className={styles.accent}
              x="56"
              y="64"
              width="156"
              height="181"
              rx="8"
              transform="rotate(-8 134 154)"
            />
            <rect
              className={styles.paper}
              x="111"
              y="38"
              width="181"
              height="206"
              rx="8"
            />
            <path
              className={styles.line}
              d="M139 78h103m-103 24h125m-125 24h98m-98 24h71"
            />
            <g data-entry-accent="reference">
              <circle className={styles.lens} cx="281" cy="182" r="48" />
              <path className={styles.heavy} d="m316 218 42 39" />
              <path className={styles.line} d="M260 176h41m-41 15h27" />
            </g>
          </>
        ) : kind === 'structure' ? (
          <>
            <g data-entry-accent="connect">
              <path
                className={styles.line}
                d="M144 80h39v142h37m-37-70h37m-37-72h37"
              />
            </g>
            <rect
              className={styles.paper}
              x="40"
              y="51"
              width="104"
              height="59"
              rx="6"
            />
            <rect
              className={styles.accent}
              x="220"
              y="51"
              width="155"
              height="59"
              rx="6"
            />
            <rect
              className={styles.paper}
              x="220"
              y="122"
              width="155"
              height="59"
              rx="6"
            />
            <rect
              className={styles.paper}
              x="220"
              y="193"
              width="155"
              height="59"
              rx="6"
            />
            <path
              className={styles.line}
              d="M61 73h62m-62 16h41m140-16h105m-105 16h72m-72 55h105m-105 16h72m-72 55h105m-105 16h72"
            />
          </>
        ) : kind === 'review' ? (
          <>
            <rect
              className={styles.paper}
              x="71"
              y="36"
              width="206"
              height="220"
              rx="8"
            />
            <path
              className={styles.line}
              d="M100 73h146m-146 27h120m-120 27h146m-146 27h104m-104 27h133m-133 27h80"
            />
            <path
              className={styles.underline}
              d="M100 137q6-7 12 0t12 0 12 0 12 0 12 0 12 0 12 0 12 0"
            />
            <g data-entry-accent="annotation">
              <path
                className={styles.accent}
                d="M243 165h117v72h-76l-24 18v-18h-17z"
              />
              <path className={styles.line} d="M264 188h76m-76 23h51" />
            </g>
          </>
        ) : (
          <>
            <path className={styles.accent} d="M76 113h99l23 22h150v117H76z" />
            <g data-entry-accent="file">
              <path className={styles.paper} d="M129 38h113l47 48v145H129z" />
              <path
                className={styles.line}
                d="M242 38v48h47M155 119h108m-108 26h108m-108 26h71"
              />
            </g>
            <path
              className={styles.accent}
              d="M65 169h125l23 20h147l-21 68H84z"
            />
          </>
        )}
      </svg>
    </div>
  )
}
