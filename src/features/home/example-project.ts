// Invented presentation content shared by the homepage illustrations.
// These are not real sources, app records or observed runtime results.
export const exampleProject = {
  title: 'Why public spaces matter',
  filename: 'Why public spaces matter.collie',
  chapters: [
    {
      title: 'A place to pause',
      purpose: 'Explore what makes a place inviting enough to stay.',
    },
    {
      title: 'Everyday encounters',
      purpose: 'Ask when sharing a space becomes a social connection.',
    },
    {
      title: 'Making room for everyone',
      purpose: 'Consider who feels welcome, and what still gets in the way.',
    },
  ],
  selectedChapter: 'Everyday encounters',
  suggestedChapterTitle: 'Places to meet',
  note: {
    title: 'A reason to stay',
    text: 'A bench gives someone a reason to stay.',
    origin: 'Personal note',
  },
  source: {
    title: 'The square at midday',
    text: 'The square has shaded seating beside the walking route.',
    origin: 'Original kept: Square observations.txt',
  },
  passage: {
    title: 'Who gets to linger?',
    text: 'What changes when a place welcomes people who have no reason to hurry?',
    origin: 'Imported conversation · saved passage',
  },
  opening:
    'A public space begins with an invitation. A patch of shade. A clear path. Somewhere to sit without needing to buy anything.',
} as const
