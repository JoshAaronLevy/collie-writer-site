import { purchaseAvailability } from './commerce'
import { releaseAvailability } from './release'

export const faq = [
  {
    id: 'free',
    question: 'What can I do for free?',
    answer:
      'The planned Free edition has one editable personal project at a time, with unrestricted switching and no timed trial. Other projects stay readable, individually exportable, backed up and recoverable. Existing export recipes can be used for one format at a time.',
  },
  {
    id: 'paid',
    question: 'What does paid access add?',
    answer: `Monthly and Lifetime add unlimited editable projects, saved export recipes and multiple export formats in one operation. Lifetime includes future updates to the purchased nonfiction edition. ${purchaseAvailability.notice}`,
  },
  {
    id: 'offline',
    question: 'Can I work offline?',
    answer:
      'Writing and organizing local material do not require an AI account or a network connection. Purchase and update actions are separate. Monthly paid access uses the verified paid period plus up to 14 days of signed offline grace; go online and refresh access for renewals or changes. Cached lifetime access works offline, subject to authentic revocation.',
  },
  {
    id: 'files',
    question: 'Where does my work live?',
    answer:
      'On your computer. Save writes the manuscript and retained project material to the portable .collie file you choose. Local working data and recovery are separate: closing a project does not silently update that selected file. Some unfinished drafts, preview edits, preferences and credentials stay on the device.',
  },
  {
    id: 'cloud',
    question: 'Can I use my own cloud folder?',
    answer:
      'You can choose a folder managed by your own storage provider. Collie does not provide cloud sync or confirm that an upload has finished. Save, close and wait for your provider to finish syncing before opening the file elsewhere. Do not edit the same project on two computers at once; keep a separate backup.',
  },
  {
    id: 'ai',
    question: 'Is AI included?',
    answer:
      'Optional AI is in development and is not currently offered to customers or included in the paid benefits. Local writing stands on its own. Any future eligible AI route would need its own account and network disclosures; selected context sent to a provider is separate from keeping the project locally.',
  },
  {
    id: 'import',
    question: 'What can I bring into a project?',
    answer:
      'Supported local readers handle recognized JSON conversation structures, plain text, Markdown, BibTeX and RIS. A file extension alone does not guarantee its structure is supported. Review the summary and choose Accept before findings become Chats, Research or Notes. Unfamiliar content may need interpretation that is not currently a customer AI feature. Attaching a PDF or text original to a research source is separate from general import; it does not promise OCR, transcription or arbitrary document conversion.',
  },
  {
    id: 'export',
    question: 'How do citations and exports work?',
    answer:
      'The writing tools support APA 7 and Chicago 18 notes and bibliography. Export offers Word (DOCX), PDF, Markdown and plain text. Review source details, citations and the exported file before sharing; layout and citation quality are not guaranteed by choosing a format.',
  },
  {
    id: 'moving',
    question: 'Can I move between Mac and Windows?',
    answer: `The portable .collie project is designed to move with you. Save and close it, transfer the file, then use Open project file… on a compatible Collie installation. Device settings and account credentials do not travel with it. Restoring paid access is separate from moving the project. ${releaseAvailability.available ? 'See Downloads for available platforms.' : 'Public installers are not available yet.'}`,
  },
  {
    id: 'ending',
    question: 'What happens when paid access ends?',
    answer:
      'Reading, individual exports, backups, recovery and free writing remain available. Free access permits one editable personal project at a time. Cancellation, disconnecting a purchase account and a refund are different actions. Buying Lifetime does not cancel an existing monthly subscription.',
  },
] as const
