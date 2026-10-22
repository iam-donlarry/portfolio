export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  category: string;
  badge: string;
  summary: string;
  image: string;
  stats: string;
  github: string;
  demo: string;
  accentColor: string; // e.g. '#00f0ff'
  problem: string;
  architecture: string;
  role: string;
  decisions: string[];
  outcomes: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
}

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  level: string;
  description: string;
  technologies: string[];
  accentColor: string;
}

export interface ExperienceMilestone {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  period: string;
  badge: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies?: string[];
}

export const PORTFOLIO_PROJECTS: ProjectDetail[] = [
  {
    id: 'safetybuddy',
    slug: 'safetybuddy',
    title: 'SafetyBuddy',
    category: 'AI / Intelligent Systems',
    badge: 'AI Emergency Agent',
    summary: 'Autonomous first-aid assistant powered by Google Gemini API and Framer Motion, delivering real-time triaged medical guidance and interactive life-saving safety workflows.',
    image: '/images/porfolio/safetybuddy.png',
    stats: 'Real-time AI Guidance',
    github: 'https://github.com/iam-donlarry/firstaid-chatbot',
    demo: 'https://github.com/iam-donlarry/firstaid-chatbot',
    accentColor: '#00f0ff',
    problem: 'During medical emergencies, victims or bystanders panic and struggle to find verified, step-by-step first aid procedures quickly, often wading through cluttered web search results while critical seconds tick away.',
    architecture: 'Built on Next.js App Router with serverless edge streaming endpoints connected to Google Gemini LLM. Includes structured triage prompts, fallback offline procedural guides, and micro-animated physical action cards using Framer Motion.',
    role: 'Lead Architect & Full-Stack Engineer — Designed prompt engineering taxonomy, engineered client-side triage flow, and integrated Gemini streaming responses with resilient error recovery.',
    decisions: [
      'Implemented deterministic triage questionnaires before LLM inference to rule out immediate high-risk emergencies (e.g. cardiac arrest, severe hemorrhaging).',
      'Configured aggressive client-side caching for offline emergency protocols in case of cellular dropouts.',
      'Selected Framer Motion over CSS transitions to orchestrate step-by-step CPR timing animations with audio visual cues.'
    ],
    outcomes: [
      'Sub-second first-token latency on emergency prompt evaluations.',
      'Zero-dependency fallback protocols accessible during network disconnection.',
      'Comprehensive coverage across 20+ acute first-aid emergency scenarios.'
    ],
    technologies: ['Next.js', 'Google Gemini API', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vercel Edge'],
    metrics: [
      { label: 'Latency', value: '< 800ms' },
      { label: 'Coverage', value: '20+ Protocols' },
      { label: 'Availability', value: 'Offline Ready' }
    ]
  },
  {
    id: 'gesture-connect',
    slug: 'gesture-connect',
    title: 'Gesture Connect',
    category: 'Computer Vision & AI',
    badge: 'Computer Vision & AI',
    summary: 'Breakthrough accessibility platform utilizing MediaPipe computer vision to translate physical sign language gestures into text and natural voice synthesis in real time.',
    image: '/images/porfolio/gestureconnect.png',
    stats: 'Vision AI + Speech Synthesis',
    github: 'https://github.com/iam-donlarry/gestureaid',
    demo: 'https://github.com/iam-donlarry/gestureaid',
    accentColor: '#915DFF',
    problem: 'Over 70 million deaf individuals globally face communication friction when interacting with people who do not know sign language, creating barriers in healthcare, public transit, and customer service.',
    architecture: 'In-browser client-side ML pipeline leveraging Google MediaPipe Hands model to extract 21 3D hand landmarks per hand, normalized against user wrist position, and classified into alphanumeric signs followed by Web Speech API synthesis.',
    role: 'Solo Developer & ML Integrator — Engineered the spatial geometric coordinate classifier, real-time video canvas pipeline, and bidirectional speech-to-text text-to-speech bridge.',
    decisions: [
      'Ran all landmark inference locally in WebAssembly via MediaPipe to preserve user privacy and eliminate server transmission latency.',
      'Implemented sliding-window smoothing to eliminate camera sensor jitter and prevent flickering misclassifications.',
      'Integrated HTML5 Web Speech API for zero-latency, device-native speech output.'
    ],
    outcomes: [
      'Real-time sign recognition at 30+ frames per second on mid-range consumer laptops.',
      'Zero server processing costs through 100% client-side WebAssembly execution.',
      'Immediate bidirectional communication bridge between hearing and deaf individuals.'
    ],
    technologies: ['React', 'MediaPipe Hands', 'Web Speech API', 'HTML5 Canvas', 'TypeScript', 'Tailwind CSS'],
    metrics: [
      { label: 'Frame Rate', value: '30+ FPS' },
      { label: 'Privacy', value: '100% Local' },
      { label: 'Landmarks', value: '42 Points' }
    ]
  },
  {
    id: 'alterverse-production',
    slug: 'alterverse-production',
    title: 'Alterverse Production',
    category: 'Web Architecture',
    badge: 'Enterprise Agro Platform',
    summary: 'High-scale sustainable agriculture and food manufacturing ecosystem featuring end-to-end commodity showcase, supply-chain narratives, and bespoke corporate UI.',
    image: '/images/porfolio/alterverse.jpeg',
    stats: 'High-Scale Agriculture',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://alterverseproduction.com',
    accentColor: '#10B981',
    problem: 'Agricultural conglomerates struggle with legacy, non-responsive websites that fail to communicate sustainable farming practices, certified commodity standards, and investor transparency.',
    architecture: 'Modular responsive web platform engineered with modern ES6+ modules, semantic HTML5 hierarchy, custom responsive CSS grid architecture, and high-performance imagery delivery pipelines.',
    role: 'Lead Frontend Systems Engineer — Designed information architecture, built custom interactive product catalogs, and optimized asset delivery for global stakeholders.',
    decisions: [
      'Engineered a zero-framework vanilla CSS module system to maximize raw load speed and cross-browser reliability.',
      'Implemented responsive picture elements with WebP compression for heavy agricultural photography.',
      'Built custom interactive supply-chain journey timeline without third-party bloated libraries.'
    ],
    outcomes: [
      '95+ Google Lighthouse Performance and Accessibility scores.',
      'Over 60% reduction in average page weight through optimized asset loading.',
      'Established international investor trust through polished enterprise presence.'
    ],
    technologies: ['JavaScript ES6+', 'HTML5 Semantic', 'Modern CSS3', 'Bootstrap 5', 'Responsive Design'],
    metrics: [
      { label: 'Lighthouse', value: '98/100' },
      { label: 'Weight Reduction', value: '62%' },
      { label: 'Target', value: 'Global Agro' }
    ]
  },
  {
    id: 'alterverse-construction',
    slug: 'alterverse-construction',
    title: 'Alterverse Construction',
    category: 'Web Architecture',
    badge: 'Infrastructure Portal',
    summary: 'High-precision infrastructure management and engineering showcase with interactive project blueprints, client testimonials, and immersive project galleries.',
    image: '/images/porfolio/construction.jpeg',
    stats: 'Enterprise Infrastructure',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://alterverseconstruction.com',
    accentColor: '#FFB020',
    problem: 'Engineering and construction firms need to display complex civil engineering milestones, technical blueprints, and equipment fleets to institutional bidding committees.',
    architecture: 'High-reliability corporate portal with structured project case studies, dynamic filtering by project scale and sector (Civil, Commercial, Industrial), and high-resolution blueprint viewers.',
    role: 'Full-Stack Developer — Architected frontend layout, responsive navigation systems, and interactive engineering showcase modules.',
    decisions: [
      'Structured project pages around quantifiable metrics: square footage, timeline adherence, and safety records.',
      'Utilized lightweight modal systems for blueprint previews without interrupting user scroll context.',
      'Created cross-device responsive navigation with high-touch targets for mobile field managers.'
    ],
    outcomes: [
      'Seamless presentation of multi-million dollar civil infrastructure portfolios.',
      'Instant search and filter across commercial and industrial project types.',
      'Sub-2 second load time across mobile networks in emerging markets.'
    ],
    technologies: ['JavaScript', 'Responsive UI', 'Modern CSS', 'Bootstrap 5', 'SEO Engine'],
    metrics: [
      { label: 'Sectors', value: 'Civil & Industrial' },
      { label: 'Mobile Speed', value: '1.4s' },
      { label: 'Blueprint View', value: 'Instant' }
    ]
  },
  {
    id: 'al-barakah',
    slug: 'al-barakah',
    title: 'Al-Barakah Ethical Business',
    category: 'Fintech & Credit',
    badge: 'Ethical Credit & Fintech',
    summary: 'Shariah-compliant Islamic cooperative and ethical credit portal offering automated membership onboarding, asset financing calculators, and transparent financial services.',
    image: '/images/porfolio/albaraka.jpeg',
    stats: 'Ethical Credit & Fintech',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://albarakaethicalbusinessgroup.com.ng',
    accentColor: '#00f0ff',
    problem: 'Members of ethical and faith-based cooperatives lacked a digital method to calculate non-interest loan repayments, submit membership verification, or track share capital transparently.',
    architecture: 'Secure LAMP stack application (PHP & MySQL backend) paired with interactive client-side calculation engines and multi-step onboarding forms.',
    role: 'Full-Stack Developer — Built the dynamic financing calculator engine, secure member registration pipelines, and database relational schemas.',
    decisions: [
      'Calculated interest-free Murabaha and profit-sharing formulas purely client-side for instantaneous feedback before submission.',
      'Sanitized and validated all incoming member documents with server-side mime-type verification.',
      'Designed a normalized relational database schema in MySQL to prevent double-entry errors in cooperative records.'
    ],
    outcomes: [
      'Over 2,000 cooperative members onboarded with zero data integrity issues.',
      'Reduced member application review cycles from 14 days to under 48 hours.',
      'Transparent financial breakdowns increased cooperative trust and participation.'
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Relational Modeling'],
    metrics: [
      { label: 'Onboarded', value: '2,000+' },
      { label: 'Cycle Time', value: '-85%' },
      { label: 'Compliance', value: '100% Shariah' }
    ]
  },
  {
    id: 'stoke-marine',
    slug: 'stoke-marine',
    title: 'Stoke Marine & Shipping',
    category: 'Maritime Logistics',
    badge: 'Maritime Logistics',
    summary: 'Global offshore maritime logistics consultancy website showcasing vessel operations, deep-sea freight handling, and worldwide supply-chain infrastructure.',
    image: '/images/porfolio/stoke.jpeg',
    stats: 'Global Supply Chain',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://stoke-seagroup.com',
    accentColor: '#00DFD8',
    problem: 'International maritime shipping requires immediate demonstration of vessel safety certifications, dry dock capabilities, and route coverage to charterers across varying time zones.',
    architecture: 'High-contrast, maritime-inspired corporate portal featuring fleet specification sheets, downloadable certification audits, and international time-zone operational status indicators.',
    role: 'Lead UI/UX Architect & Developer — Conceived the corporate identity, built custom vessel spec tables, and implemented contact routing for international freight inquiries.',
    decisions: [
      'Implemented clean tabular breakdowns of vessel specifications (DWT, LOA, Draft) with downloadable technical spec sheets.',
      'Optimized contrast ratios for maritime crew and clients operating in direct sunlight on tablet devices.',
      'Structured schema.org corporate metadata for international maritime logistics indexing.'
    ],
    outcomes: [
      'Elevated company profile into competitive bidding tiers with international oil and gas operators.',
      'Streamlined charter inquiries directly into dispatch response teams.',
      'Zero downtime over 24+ consecutive months of operation.'
    ],
    technologies: ['JavaScript', 'HTML5', 'Bootstrap 5', 'Maritime UI', 'Schema.org'],
    metrics: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Inquiries', value: 'Global Tier' },
      { label: 'Accessibility', value: 'WCAG AAA' }
    ]
  },
  {
    id: 'nextflick',
    slug: 'nextflick',
    title: 'NextFlick Cinema Explorer',
    category: 'Mobile Applications',
    badge: 'Entertainment Engine',
    summary: 'Cinematic streaming explorer providing movie metadata, live ratings, curated trailers, and genre filters with micro-animations optimized for mobile viewing.',
    image: '/images/porfolio/movieapp.jpg',
    stats: '10k+ Movie Database',
    github: 'https://github.com/iam-donlarry/nextflick',
    demo: 'https://github.com/iam-donlarry/nextflick',
    accentColor: '#FF2E93',
    problem: 'Movie enthusiasts are overwhelmed by fragmented streaming libraries and slow, ad-ridden movie review websites that fail to deliver quick trailers, cast lists, and ratings.',
    architecture: 'Mobile-first application leveraging TMDB API with smart client-side caching, infinite scroll virtualization, and hardware-accelerated animations.',
    role: 'Mobile Systems Developer — Built the asynchronous TMDB API integration, designed fluid gesture-driven UI components, and managed state caches.',
    decisions: [
      'Virtualised long catalog lists to keep memory consumption low on lower-spec mobile devices.',
      'Cached movie poster thumbnails with progressive blur-up placeholders.',
      'Integrated YouTube embed iframe overlay with instant playback triggers.'
    ],
    outcomes: [
      'Sub-300ms catalog search across over 10,000 indexed titles.',
      'Fluid 60 FPS gesture swiping on both iOS and Android platforms.',
      'Clean, ad-free cinema enthusiast experience.'
    ],
    technologies: ['React Native / React', 'TMDB API', 'Tailwind CSS', 'Mobile Architecture', 'AsyncStorage'],
    metrics: [
      { label: 'Catalog', value: '10,000+' },
      { label: 'Search Speed', value: '< 300ms' },
      { label: 'Smoothness', value: '60 FPS' }
    ]
  },
  {
    id: 'shelfalert',
    slug: 'shelfalert',
    title: 'ShelfAlert Inventory',
    category: 'Enterprise Web App',
    badge: 'Supply Chain Tracker',
    summary: 'Predictive inventory tracker alerting enterprises on critical shelf expiration dates to drastically reduce food and pharmaceutical stock wastage.',
    image: '/images/porfolio/shelfalert.png',
    stats: 'Automated Expiry Alerts',
    github: 'https://github.com/iam-donlarry/shelfalert',
    demo: 'https://github.com/iam-donlarry/shelfalert',
    accentColor: '#FFB020',
    problem: 'Retail pharmacies and supermarkets lose up to 15% of inventory value annually due to items expiring silently on back shelves without automated alerting.',
    architecture: 'Full-stack inventory dashboard with automated cron triggers calculating days-to-expiration, batch tracking, and SMS/email notifications for imminent product expirations.',
    role: 'Full-Stack Systems Engineer — Built the cron evaluation daemon, barcode scanning integration, and inventory analytics charts.',
    decisions: [
      'Created a color-coded triage system (Red: <7 days, Yellow: <30 days, Green: Safe) for instant warehouse floor readability.',
      'Engineered automated daily digest reports to give floor managers prioritized discount actions.',
      'Designed barcode batch indexing for fast manual scanning during restocking.'
    ],
    outcomes: [
      'Reduced retail expired stock wastage by an estimated 40% in pilot tests.',
      'Saved store managers 5+ hours per week of manual shelf auditing.',
      'Guaranteed compliance with strict pharmaceutical expiry regulations.'
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Cron Daemons', 'Chart.js'],
    metrics: [
      { label: 'Waste Reduction', value: '40%' },
      { label: 'Audit Time Saved', value: '5 hrs/wk' },
      { label: 'Tracking', value: 'Batch Level' }
    ]
  }
];

export const SKILL_CATEGORIES: { [key: string]: SkillNode[] } = {
  frontend: [
    {
      id: 'react-next',
      name: 'React 18 / 19 & Next.js App Router',
      category: 'Frontend Engineering',
      level: 'Mastery',
      description: 'Architecting high-scale Next.js applications with Server and Client Component isolation, streaming SSR, route handlers, and deep performance tuning.',
      technologies: ['Next.js 14-16', 'React 19', 'Server Actions', 'Edge Runtime', 'Turbopack'],
      accentColor: '#00f0ff'
    },
    {
      id: 'typescript',
      name: 'TypeScript & JavaScript (ES6+)',
      category: 'Frontend Engineering',
      level: 'Mastery',
      description: 'Writing strict, type-safe architectures with generic constraints, discriminated unions, and modern asynchronous async/await patterns.',
      technologies: ['Strict Mode', 'Generics', 'Utility Types', 'AST & Transpilation'],
      accentColor: '#915DFF'
    },
    {
      id: 'animation-css',
      name: 'Framer Motion, 3D & CSS Architecture',
      category: 'Frontend Engineering',
      level: 'Advanced',
      description: 'Crafting fluid spatial interactions, micro-animations, custom shaders, Three.js WebGL canvas integrations, and responsive Tailwind design systems.',
      technologies: ['Three.js', 'Framer Motion', 'Tailwind CSS', 'WebGL', 'GSAP'],
      accentColor: '#FF2E93'
    }
  ],
  backend: [
    {
      id: 'nodejs-api',
      name: 'Node.js & Route Handlers',
      category: 'Backend Engineering',
      level: 'Advanced',
      description: 'Designing resilient RESTful API endpoints, serverless micro-services, authentication middleware, and webhook receivers.',
      technologies: ['Node.js', 'Express', 'Next.js API Routes', 'JWT', 'Nodemailer'],
      accentColor: '#10B981'
    },
    {
      id: 'php-ecosystem',
      name: 'PHP & Enterprise Web Services',
      category: 'Backend Engineering',
      level: 'Advanced',
      description: 'Developing secure PHP backends, session managers, file upload processors, and modular business logic.',
      technologies: ['PHP 8.x', 'OOP', 'Composer', 'PDO Security', 'CURL Integrations'],
      accentColor: '#FFB020'
    }
  ],
  api_integrations: [
    {
      id: 'ai-vision',
      name: 'AI & Computer Vision Integrations',
      category: 'APIs & Integrations',
      level: 'Production',
      description: 'Integrating Google Gemini LLM API for real-time natural language triage and MediaPipe WebAssembly vision models for in-browser landmark detection.',
      technologies: ['Google Gemini API', 'MediaPipe', 'Web Speech API', 'Streaming Responses'],
      accentColor: '#00DFD8'
    },
    {
      id: 'third-party',
      name: 'External Services & APIs',
      category: 'APIs & Integrations',
      level: 'Mastery',
      description: 'Connecting third-party logistics, TMDB movie registries, SMS gateways, and SMTP mail delivery networks.',
      technologies: ['REST Webhooks', 'OAuth', 'TMDB API', 'Nodemailer SMTP', 'Fetch API'],
      accentColor: '#915DFF'
    }
  ],
  databases: [
    {
      id: 'relational-mysql',
      name: 'MySQL & Relational Data Modeling',
      category: 'Databases & Data Modeling',
      level: 'Advanced',
      description: 'Designing normalized relational schemas, foreign key constraints, indexed query plans, and transaction ACID guarantees.',
      technologies: ['MySQL', 'Relational Design', 'Query Optimization', 'Indexes', 'Backups'],
      accentColor: '#00f0ff'
    },
    {
      id: 'nosql-mongodb',
      name: 'MongoDB & Document Stores',
      category: 'Databases & Data Modeling',
      level: 'Advanced',
      description: 'Building flexible document schemas with Mongoose, handling aggregation pipelines, and structuring nested data records.',
      technologies: ['MongoDB', 'Mongoose', 'Aggregation', 'Atlas', 'JSON Documents'],
      accentColor: '#10B981'
    }
  ],
  infrastructure: [
    {
      id: 'devops-deploy',
      name: 'Vercel, Git & Deployment Pipelines',
      category: 'Infrastructure & Deployment',
      level: 'Mastery',
      description: 'Managing Git workflows, semantic versioning, edge serverless distributions, environment segregation, and CI/CD automation.',
      technologies: ['Git / GitHub', 'Vercel Serverless', 'DNS & SSL', 'Production Builds'],
      accentColor: '#FFB020'
    },
    {
      id: 'web-performance',
      name: 'Core Web Vitals & Optimization',
      category: 'Infrastructure & Deployment',
      level: 'Advanced',
      description: 'Profiling bundle sizes, lazy-loading heavy libraries, responsive image formats, and optimizing LCP, FID, and CLS scores.',
      technologies: ['Lighthouse', 'Bundle Analysis', 'Code Splitting', 'CDN Caching'],
      accentColor: '#FF2E93'
    }
  ],
  security_reliability: [
    {
      id: 'security-reliability',
      name: 'Security, Sanitization & Uptime',
      category: 'Security & Reliability',
      level: 'Advanced',
      description: 'Preventing XSS, SQL injection, and CSRF vulnerabilities through strict input validation, parameterized queries, and defensive error boundaries.',
      technologies: ['Data Sanitization', 'CORS Rules', 'Prepared Statements', 'Error Handling'],
      accentColor: '#00DFD8'
    }
  ],
  testing_architecture: [
    {
      id: 'clean-architecture',
      name: 'Clean Architecture & Accessibility',
      category: 'Testing & Architecture',
      level: 'Mastery',
      description: 'Enforcing separation of concerns, reusable UI tokens, semantic HTML5, keyboard navigation, and WCAG accessibility standards.',
      technologies: ['Modular Architecture', 'Design Tokens', 'WCAG AAA', 'Aria Roles'],
      accentColor: '#915DFF'
    }
  ]
};

export const PORTFOLIO_EXPERIENCE: ExperienceMilestone[] = [
  {
    id: 'baye-business-solutions',
    type: 'experience',
    title: 'Full-Stack Web Developer',
    organization: 'Baye Business Solutions Limited',
    period: '2024 — Present',
    badge: 'Current Role',
    location: 'Lagos, Nigeria',
    summary: 'Driving core web development and digital architecture across enterprise client applications, internal tooling, and modern interactive products.',
    highlights: [
      'Architected highly responsive frontend systems using React, Next.js, and modern CSS systems for clients across West Africa and international markets.',
      'Engineered backend route handlers, serverless integrations, and real-time database endpoints with zero-loss error handling.',
      'Reduced initial page load latency by up to 55% across mission-critical products by optimizing bundle sizes and Core Web Vitals.',
      'Enforced code quality, semantic accessibility, and clean design token systems across cross-functional engineering teams.'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vercel']
  },
  {
    id: 'roystech-it-solutions',
    type: 'experience',
    title: 'Web Development Intern',
    organization: 'Roystech IT Solutions',
    period: '2017 — 2018',
    badge: 'Foundation',
    location: 'Nigeria',
    summary: 'Hands-on full-stack development working on enterprise PHP backends, database administration, and responsive client web portals.',
    highlights: [
      'Developed PHP backend modules and configured optimized MySQL relational database schemas for high-traffic client portals.',
      'Refactored legacy web platforms for cross-browser reliability and mobile fluidity across diverse screen resolutions.',
      'Assisted in client discovery and iterative UX/UI wireframing for corporate enterprise clients.'
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'Bootstrap']
  },
  {
    id: 'fpi-hnd',
    type: 'education',
    title: 'Higher National Diploma (HND) — Computer Science',
    organization: 'Federal Polytechnic Ilaro',
    period: '2018 — 2020',
    badge: 'Distinction',
    location: 'Ogun State, Nigeria',
    summary: 'Advanced study of software engineering principles, distributed systems, algorithmic complexity, and database architecture.',
    highlights: [
      'Advanced specialization in Software Engineering, Algorithmic Analysis, and Distributed Systems.',
      'Architected comprehensive final year project on automated cloud data management and relational integrity.',
      'Graduated with academic distinction recognition.'
    ]
  },
  {
    id: 'fpi-nd',
    type: 'education',
    title: 'National Diploma (ND) — Computer Science',
    organization: 'Federal Polytechnic Ilaro',
    period: '2015 — 2017',
    badge: 'Foundation',
    location: 'Ogun State, Nigeria',
    summary: 'Rigorous foundational studies in procedural programming, database structures, systems analysis, and mathematics.',
    highlights: [
      'Foundational studies in procedural programming, data structures, and computer architecture.',
      'Developed early algorithmic problem solving and relational database design proficiencies.'
    ]
  }
];

export const BIO_DATA = {
  name: 'Quadri Adekunle',
  role: 'Full-Stack Systems Engineer & Spatial Architect',
  statement: 'I build digital worlds through code.',
  shortBio: 'Full-stack systems engineer based in Lagos, Nigeria. Specializing in high-performance web systems, fault-tolerant architectures, and futuristic spatial experiences.',
  philosophy: `Software is not merely a collection of scripts; it is a living digital architecture. I approach software engineering with a systems mindset: designing zero-drift state flows, bulletproof error boundaries, and immersive interfaces that engage the human mind. Whether engineering real-time AI emergency systems or optimizing global logistics platforms, every line of code serves purpose, stability, and elegance.`,
  email: 'adekunlequadri3@gmail.com',
  whatsapp: '+234 704 227 7326',
  whatsappUrl: 'https://wa.me/2347042277326',
  location: 'Lagos, Nigeria (Global Remote Ready)',
  resumeUrl: '/documents/Quadri-Resume.pdf',
  github: 'https://github.com/iam-donlarry',
  linkedin: 'https://linkedin.com/in/adekunle-quadri-920038213',
  twitter: 'https://twitter.com/Coredrii',
  stats: [
    { label: 'Production Uptime', value: '99.9%' },
    { label: 'Production Deployments', value: '15+' },
    { label: 'Years Engineering', value: '6+' },
    { label: 'Specialization', value: 'Full-Stack + AI' }
  ]
};
