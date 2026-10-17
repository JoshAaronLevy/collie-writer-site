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
    question: 'Can I write without AI or an internet connection?',
    answer:
      'Yes. Local writing, planning, research organization and export work without an AI account or network connection. AI requests need a connection. Purchase and update actions are separate. Monthly paid access uses the verified paid period plus up to 14 days of signed offline grace; go online and refresh access for renewals or changes. Cached lifetime access works offline, subject to authentic revocation.',
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
    question: 'Do I need an API key?',
    answer:
      'No. The planned connection uses your existing eligible ChatGPT account: sign in through OpenAI and separately allow plan use in Collie. No developer account or API key setup is needed. Customer AI access is not available yet; eligibility and participating-app approval are required.',
  },
  {
    id: 'ai-usage',
    question: 'How is AI usage paid for?',
    answer:
      'The planned tools use eligible usage from your ChatGPT plan or available credits. Collie adds no separate AI token bill or extra allowance. Your ChatGPT limits apply; credit settings may allow purchased credits after included usage runs out. Review app usage, limits and credit settings in ChatGPT Settings → Usage. Collie’s license is separate: a ChatGPT subscription does not purchase Collie.',
  },
  {
    id: 'ai-history',
    question: 'Does signing in import my ChatGPT history?',
    answer:
      'No. Bring the conversations you want into your project through supported import, then accept the material you want to keep. Signing in does not import your conversations or memories. Planning uses selected project material within analysis limits.',
  },
  {
    id: 'ai-review',
    question: 'How is the proofreader different?',
    answer:
      'The planned reviewer goes beyond spelling and grammar: source faithfulness, citation gaps, which sources appear where and how often, repeated arguments, clarity and flow. It needs relevant source text and context, and cannot certify accuracy or catch every issue. You review the findings and decide what to change. Advanced proofreading is not available yet.',
  },
  {
    id: 'ai-control',
    question: 'Will AI change my writing automatically?',
    answer:
      'No. Planning proposals are editable before you choose Use outline. Drafting assistance offers a preview before explicit insertion or replacement. The planned proofreader presents findings for review; it does not silently rewrite your manuscript, add citations or change the outline. AI tools assist but do not override your decisions.',
  },
  {
    id: 'ai-privacy',
    question: 'What leaves my computer when I use AI?',
    answer:
      'When you request AI help, your prompt and the selected context needed for that request go to the provider. This can include writing, research passages, notes and conversation material. Local project storage does not make AI offline. The marketing website does not receive your project or run AI requests. Provider data-handling disclosures must be finalized before customer AI access is offered.',
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
