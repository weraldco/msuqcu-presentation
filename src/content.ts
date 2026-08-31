export type SlideEntry =
  | { type: 'title'; heading: string; subtitle?: string }
  | {
      type: 'speaker'
      photo: string
      name: string
      role: string
      bio: string[]
    }
  | { type: 'heading'; id?: string; number?: string; heading: string }
  | { type: 'subheading'; heading: string }
  | { type: 'gallery'; images: string[] }
  | { type: 'quote'; lines: string[]; keyMessage?: string }
  | { type: 'list'; heading: string; items: string[]; quote?: string }
  | {
      type: 'lesson'
      number: number
      title: string
      quote?: string
      body: string
    }
  | { type: 'final'; heading: string; subheading: string }
  | {
      type: 'contact'
      heading: string
      qrCode: string
      socials: { label: string; handle: string }[]
    }

function photos(label: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) =>
      `https://placehold.co/1200x800/1a1a1d/ffffff?text=${encodeURIComponent(label)}+${i + 1}`,
  )
}

export const chapterMarkers = [
  { id: 'home', number: '00', label: 'Home' },
  { id: 'ch-1', number: '01', label: 'College, 2007' },
  { id: 'ch-2', number: '02', label: 'Going Into Tech' },
  { id: 'ch-3', number: '03', label: 'A Real Job' },
  { id: 'ch-4', number: '04', label: 'Something Funny' },
  { id: 'ch-5', number: '05', label: 'My People' },
  { id: 'ch-6', number: '06', label: 'What I Learned' },
  { id: 'ch-7', number: '07', label: 'Final Message' },
]

export const deck: SlideEntry[] = [
  {
    type: 'title',
    heading: "Your Path Doesn't Have to Be Straight",
    subtitle: 'What Rejection, Passion, and Community Taught Me',
  },
  {
    type: 'speaker',
    photo: '/werald-opolento-photo.png',
    name: 'Werald Coronel Opolento',
    role: 'Web Developer at Upsmash Digital Inc · Deployment Specialist at Eagleview Inc.',
    bio: [
      'QCPU BSIT Graduate, SY 2007–2011',
      'AutoCAD Specialist for 10+ years',
      'Co-Founder, Paldo Developer Group',
      'Volunteer Web Developer, AWS Community Day 2026',
      'Workshop Facilitator, Google DevFest 2025',
      'Member, Data Engineering ng Pilipinas Leadership Program',
    ],
  },

  // 1. So… What Was College Like in 2007?
  {
    type: 'heading',
    id: 'ch-1',
    number: '01',
    heading: 'So… What Was College Like in 2007?',
  },
  { type: 'gallery', images: photos('Campus', 5) },
  {
    type: 'subheading',
    heading: 'I thought I had a pretty good idea of what my future would look like.',
  },
  {
    type: 'quote',
    lines: ['I was completely wrong.'],
    keyMessage:
      "You don't need to have your entire future figured out while you're in college.",
  },

  // 2. I Thought I Was Going Into Tech
  {
    type: 'heading',
    id: 'ch-2',
    number: '02',
    heading: 'I Thought I Was Going Into Tech',
  },
  { type: 'gallery', images: photos('Campus-Tech', 5) },

  // The Rejection (sub-page of chapter 2)
  { type: 'subheading', heading: 'The Rejection' },
  { type: 'gallery', images: photos('Rejection-Letter', 1) },
  {
    type: 'quote',
    lines: [
      'At that point, I thought… maybe technology and I need some time apart.',
    ],
    keyMessage:
      "Rejection is part of the journey. One rejection doesn't define your ability or your future.",
  },

  // 3. Fine. I'll Get a Real Job.
  {
    type: 'heading',
    id: 'ch-3',
    number: '03',
    heading: "Fine. I'll Get a Real Job.",
  },
  { type: 'gallery', images: photos('First-Job', 3) },
  {
    type: 'quote',
    lines: [
      'Basically, I was doing what most people do after college: pretending I knew what I was doing.',
    ],
  },

  // Life Happened (sub-page of chapter 3)
  { type: 'subheading', heading: 'Life Happened' },
  {
    type: 'quote',
    lines: ['Then life got even more interesting. I met the love of my life,'],
    keyMessage:
      "Life doesn't always follow the plan you made after graduation—and that's okay.",
  },
  { type: 'gallery', images: photos('Family', 1) },

  // 4. Then Something Funny Happened…
  {
    type: 'heading',
    id: 'ch-4',
    number: '04',
    heading: 'Then Something Funny Happened…',
  },
  { type: 'gallery', images: photos('Career-Transition', 1) },
  {
    type: 'quote',
    lines: [
      'Years passed, but that interest in technology never completely disappeared.',
      'Wait. Can I still do this?',
      "But eventually I realized something: there's no expiration date on learning.",
    ],
    keyMessage: "It's okay to start—or start again—later than you originally planned.",
  },

  // 5. Then I Found My People
  {
    type: 'heading',
    id: 'ch-5',
    number: '05',
    heading: 'Then I Found My People',
  },
  { type: 'gallery', images: photos('Community', 10) },
  {
    type: 'list',
    heading: 'What Community Gave Me',
    items: [
      'People — people who share the same interests',
      "Learning — people who can teach you things you don't know",
      'Opportunities — events, jobs, projects, and collaborations',
      "Confidence — a place to contribute even while you're still learning",
      'Connections — people who can become friends, mentors, teammates, or future colleagues',
    ],
    quote: 'You never know who is sitting beside you.',
  },
  { type: 'gallery', images: photos('Milestones', 10) },

  // 6. So What Did I Learn?
  {
    type: 'heading',
    id: 'ch-6',
    number: '06',
    heading: 'So What Did I Learn?',
  },
  {
    type: 'lesson',
    number: 1,
    title: "Don't worry about having everything figured out.",
    quote: "Seriously. I didn't.",
    body: "You're a student. You're supposed to be learning and exploring.",
  },
  {
    type: 'lesson',
    number: 2,
    title: 'Try things.',
    quote:
      "Join an organization. Attend an event. Build something. Break something. Hopefully don't break production. 😂",
    body: "You don't need to know whether something will become your career. Sometimes you discover your passion simply by trying.",
  },
  {
    type: 'lesson',
    number: 3,
    title: "Don't be afraid of rejection.",
    quote: "You're going to hear no. Sometimes multiple times. Keep applying.",
    body: 'A rejection is an event—not your identity.',
  },
  {
    type: 'lesson',
    number: 4,
    title: "Don't compare your timeline",
    body: "Everyone's path looks different — and that's fine.",
  },
  {
    type: 'lesson',
    number: 5,
    title: 'Find your community.',
    quote: "Don't just collect certificates. Collect people.",
    body: 'Learn from them. Help them. Grow with them.',
  },

  // 7. Final Message
  { type: 'heading', id: 'ch-7', number: '07', heading: 'Final Message' },
  {
    type: 'quote',
    lines: [
      "So if you're a student and you're currently thinking…",
      "'I don't know what I'm going to do after graduation.'",
      'Congratulations.',
      "You're normal. 😂",
      "You don't need to have the entire map figured out.",
      'Try things. Make mistakes. Get rejected. Meet people. Learn something new.',
      "Your path doesn't have to be straight.",
      "Mine certainly wasn't.",
    ],
    keyMessage: "Just make sure you're moving.",
  },
  {
    type: 'final',
    heading: "YOUR PATH DOESN'T HAVE TO BE STRAIGHT.",
    subheading: 'Just keep moving.',
  },

  {
    type: 'contact',
    heading: "Let's Connect",
    qrCode: 'https://placehold.co/320x320/ffffff/1a1a1d?text=QR+Code',
    socials: [
      { label: 'LinkedIn', handle: 'linkedin.com/in/your-handle' },
      { label: 'GitHub', handle: 'github.com/your-handle' },
      { label: 'Portfolio', handle: 'yourportfolio.com' },
    ],
  },
]
