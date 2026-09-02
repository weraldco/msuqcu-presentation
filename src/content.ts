export type SlideEntry =
	| { type: 'title'; heading: string; subtitle?: string }
	| {
			type: 'speaker';
			photo: string;
			name: string;
			role: string;
			bio: string[];
	  }
	| { type: 'heading'; id?: string; number?: string; heading: string }
	| { type: 'subheading'; heading: string }
	| { type: 'gallery'; images: string[] }
	| { type: 'quote'; lines: string[]; keyMessage?: string }
	| { type: 'list'; heading: string; items: string[]; quote?: string }
	| {
			type: 'lesson';
			number: number;
			title: string;
			quote?: string;
			body: string;
	  }
	| { type: 'final'; heading: string; subheading: string }
	| {
			type: 'contact';
			heading: string;
			qrCode: string;
			socials: { label: string; handle: string }[];
	  };

export const chapterMarkers = [
	{ id: 'home', number: '00', label: 'Home' },
	{ id: 'ch-1', number: '01', label: 'Student Life' },
	{ id: 'ch-2', number: '02', label: 'The Real World' },
	{ id: 'ch-3', number: '03', label: 'Different Paths' },
	{ id: 'ch-4', number: '04', label: 'The Dream Knocks' },
	{ id: 'ch-5', number: '05', label: 'The Community' },
	{ id: 'ch-6', number: '06', label: 'What I Learned' },
	{ id: 'ch-7', number: '07', label: 'Final Message' },
];

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
			'Co-Founder the Paldo Developer Group',
			'Volunteer as Frontend Developer in AWS Community Day 2026',
			'Workshop Facilitator in Google DevFest 2025',
			'Member of Data Engineering ng Pilipinas Leadership Program',
			'Developer at CultureHub Australia',
		],
	},

	// 1. Student Life — Where It Started
	{
		type: 'heading',
		id: 'ch-1',
		number: '01',
		heading: 'Student Life — Where It Started',
	},
	{
		type: 'gallery',
		images: [
			'/1-student/1.png',
			'/1-student/2.jpeg',
			'/1-student/3.1.jpeg',
			'/1-student/3.2.jpeg',
			'/1-student/4.png',
			'/1-student/4.1.png',
			'/1-student/5.png',
			'/1-student/6.png',
			'/1-student/7.jpeg',
			'/1-student/8.png',
			'/1-student/9.png',
		],
	},
	{
		type: 'quote',
		lines: [
			'Your job is to explore, experience new things, break a few things, learn from them, and make friends along the way.',
		],
	},

	// 2. After College — The IRL (In Real Life)
	{
		type: 'heading',
		id: 'ch-2',
		number: '02',
		heading: 'After College — IRL (In Real Life) Zone',
	},

	{
		type: 'gallery',
		images: ['/2-job-rejection/job-rejection.png'],
	},
	{
		type: 'quote',
		lines: ['I got rejected.'],
	},
	{
		type: 'subheading',
		heading:
			'At that point, I thought… okay, maybe technology doesn’t want me.',
	},

	// 3. I Tried Different Paths
	{
		type: 'heading',
		id: 'ch-3',
		number: '03',
		heading: 'I Tried Different Paths',
	},
	{
		type: 'subheading',
		heading: 'And accepted my first job as an AutoCAD Specialist.',
	},
	{
		type: 'gallery',
		images: [
			'/3-other-path/1.png',
			'/3-other-path/2.png',
			'/3-other-path/3.png',
			'/3-other-path/4.jpg',
			'/3-other-path/5.jpg',
			'/3-other-path/6.jpg',
			'/3-other-path/7.jpg',
			'/3-other-path/8.jpg',
		],
	},
	{
		type: 'quote',
		lines: [
			'I enjoyed the comfort zone of life, to the point that I almost forgot my dream.',
		],
	},
	{
		type: 'quote',
		lines: ['"Enjoying life is good. Forgetting your dreams is not."'],
	},

	// 4. But My Dream Was Still Knocking on the Door
	{
		type: 'heading',
		id: 'ch-4',
		number: '04',
		heading: 'But My Dream Was Still Knocking on the Door',
	},
	{
		type: 'quote',
		lines: ['What if I try again?'],
	},
	{
		type: 'quote',
		lines: ['The ghost of my own doubt, talking back to me.'],
	},
	{ type: 'subheading', heading: 'So I asked myself,' },
	{
		type: 'quote',
		lines: ['Am I too late?'],
	},
	{
		type: 'quote',
		lines: ["If I keep waiting for the perfect time, I'll never start."],
	},
	{
		type: 'gallery',
		images: [
			'/4-comeback/1.jpeg',
			'/4-comeback/2.jpeg',
			'/4-comeback/3.jpeg',
			'/4-comeback/4.jpeg',
		],
	},

	// 5. The Community — Not Alone Anymore
	{
		type: 'heading',
		id: 'ch-5',
		number: '05',
		heading: "The Community — I Wasn't Alone Anymore",
	},
	{
		type: 'gallery',
		images: [
			'/5-community/1.jpeg',
			'/5-community/2.jpg',
			'/5-community/3.JPG',
			'/5-community/4.JPG',
			'/5-community/5.JPG',
			'/5-community/6.JPG',
			'/5-community/7.JPG',
			'/5-community/8.JPG',
			'/5-community/9.JPG',
		],
	},
	{
		type: 'quote',
		lines: [
			"It's about finding people who are walking in the same direction with you.",
		],
		keyMessage:
			'You never know which person you meet today will become part of your story tomorrow.',
	},

	// 6. What I Learned
	{
		type: 'heading',
		id: 'ch-6',
		number: '06',
		heading: 'What I Learned',
	},
	{
		type: 'lesson',
		number: 1,
		title: "Explore while you're young.",
		body: '',
	},
	{
		type: 'lesson',
		number: 2,
		title: "Don't be afraid of rejection.",
		body: '',
	},
	{
		type: 'lesson',
		number: 3,
		title: "Don't compare your timeline.",
		body: '',
	},
	{
		type: 'lesson',
		number: 4,
		title: 'Find your people.',
		body: '',
	},

	// 7. My Final Message
	{ type: 'heading', id: 'ch-7', number: '07', heading: 'My Final Message' },
	{
		type: 'quote',
		lines: ["You don't have to have your entire career figured out today."],
	},

	{
		type: 'final',
		heading: "YOUR PATH DOESN'T HAVE TO BE STRAIGHT.",
		subheading:
			'Just keep on Exploring, Trying, Learning, Connect and Keep Moving.',
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
];
