/**
 * ALL PORTFOLIO CONTENT LIVES HERE.
 * Every visible string is { en, fr }. Edit text, add a project,
 * change your availability. The pages rebuild from this file.
 *
 * Wrap words in *asterisks* to give them the gradient accent.
 */

export type Lang = 'en' | 'fr';
export type L = Record<Lang, string>;
export const t = (s: L, lang: Lang) => s[lang];

/* Identity */
export const person = {
  firstName: 'Ezzoubeir',
  lastName: 'Elasraoui',
  initials: 'EE',
  email: 'elassraouiezzoubeir@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ezzoubeir-elasraoui',
  github: 'https://github.com/zimprod23',
  location: 'Rabat, Morocco',
  timezone: 'Africa/Casablanca',
  /** The status pill in the hero. Set `open: false` to hide it. */
  availability: {
    open: true,
    label: {
      en: 'Open to part-time and freelance work',
      fr: 'Disponible en temps partiel et en freelance',
    },
  },
};

/* Page meta */
export const meta = {
  title: {
    en: 'Ezzoubeir Elasraoui | Software, DevOps and AI engineer',
    fr: 'Ezzoubeir Elasraoui | Ingénieur logiciel, DevOps et IA',
  },
  description: {
    en: "Full-stack engineer and PhD candidate in mobile security, based in Rabat. I build web and desktop apps, set up the servers they run on, and add private AI where it helps. Open to part-time and freelance work.",
    fr: "Ingénieur full-stack et doctorant en sécurité mobile, basé à Rabat. Je construis des applications web et desktop, je monte les serveurs qui les font tourner et j'ajoute de l'IA privée là où elle sert. Disponible en temps partiel et en freelance.",
  },
};

/* Navigation */
export const nav: { id: string; label: L }[] = [
  { id: 'work', label: { en: 'Work', fr: 'Projets' } },
  { id: 'approach', label: { en: 'Approach', fr: 'Méthode' } },
  { id: 'research', label: { en: 'Research', fr: 'Recherche' } },
  { id: 'services', label: { en: 'Services', fr: 'Services' } },
  { id: 'journey', label: { en: 'Journey', fr: 'Parcours' } },
  { id: 'contact', label: { en: 'Contact', fr: 'Contact' } },
];

/* Hero */
export const hero = {
  /** Cycles with a scramble effect after "I'm a" / "Je suis". */
  rolesPrefix: { en: "I'm", fr: 'Je suis' },
  roles: {
    en: ['a software engineer', 'a DevOps engineer', 'a PhD candidate in mobile security', 'an AI integrator', 'the one who reads the logs'],
    fr: ['ingénieur logiciel', 'ingénieur DevOps', 'doctorant en sécurité mobile', 'intégrateur IA', 'celui qui lit les logs'],
  },
  headline: {
    en: 'I build the software, *and* the machines it runs on.',
    fr: 'Je construis le logiciel, *et* les machines qui le font tourner.',
  },
  lead: {
    en: "Full-stack engineer based in Rabat. I like the whole job: untangling a messy domain, building the screens people use every day, then setting up the servers, the backups and the dashboards that tell me when something breaks. I'm also a PhD candidate in mobile security at Mohammed V University. I use Claude Code a lot, and I still make the calls on architecture, security and data.",
    fr: "Ingénieur full-stack basé à Rabat. J'aime le métier en entier : démêler un domaine compliqué, construire les écrans que les gens utilisent tous les jours, puis monter les serveurs, les sauvegardes et les tableaux de bord qui me préviennent quand quelque chose casse. Je prépare aussi un doctorat en sécurité mobile à l'Université Mohammed V. J'utilise beaucoup Claude Code, et les choix d'architecture, de sécurité et de données, je les fais moi-même.",
  },
  ctaPrimary: { en: 'Start a project', fr: 'Démarrer un projet' },
  ctaSecondary: { en: 'See the work', fr: 'Voir les projets' },
  scroll: { en: 'Scroll', fr: 'Défiler' },
};

/* Numbers under the hero. Keep them true. */
export const stats: { value: number; prefix?: string; suffix?: string; label: L }[] = [
  { value: 2600, suffix: '+', label: { en: 'automated tests on PGSH', fr: 'tests automatisés sur PGSH' } },
  { value: 6000, suffix: '+', label: { en: 'students in the PGSH database', fr: 'étudiants dans la base PGSH' } },
  { value: 5, label: { en: 'VMs I set up on one ESXi host', fr: "VM montées sur un seul hôte ESXi" } },
  { value: 0, prefix: '€', label: { en: 'a month to host Balagh', fr: "par mois pour héberger Balagh" } },
];

/* The scroll-lit statement after the hero */
export const statement: L = {
  en: "Most of what I build runs where *nobody looks*: on a faculty's own servers, on a lawyer's laptop with the Wi-Fi off, on free tiers that cost nothing. It has to work on a *Monday morning* when I'm not around.",
  fr: "La plupart de ce que je construis tourne là où *personne ne regarde* : sur les serveurs d'une faculté, sur le portable d'un avocat sans connexion, sur des offres gratuites qui ne coûtent rien. Ça doit marcher le *lundi matin*, même quand je ne suis pas là.",
};

/* Marquee rows */
export const marquee = [
  '.NET 9', 'PostgreSQL', 'React 19', 'TypeScript', 'Next.js', 'Python', 'FastAPI', 'Tauri',
  'Docker', 'VMware ESXi', 'Keycloak', 'OpenTelemetry', 'Grafana', 'AWS', 'Cloudflare', 'Supabase', 'Ollama', 'Claude Code',
];
export const marqueeVerbs: L[] = [
  { en: 'Design', fr: 'Concevoir' },
  { en: 'Build', fr: 'Construire' },
  { en: 'Deploy', fr: 'Déployer' },
  { en: 'Observe', fr: 'Observer' },
  { en: 'Fix', fr: 'Réparer' },
  { en: 'Repeat', fr: 'Recommencer' },
];

/* Projects */
export type Project = {
  id: string;
  index: string;
  name: string;
  native?: string;
  diagram: 'topology' | 'pipeline' | 'flow' | 'orbit';
  year: string;
  url?: string;
  tagline: L;
  context: L;
  role: L;
  summary: L;
  built: L[];
  metrics: { value: string; label: L }[];
  stack: string[];
};

export const projects: Project[] = [
  {
    id: 'pgsh',
    index: '01',
    name: 'PGSH',
    diagram: 'topology',
    year: '2025 → 2026',
    tagline: {
      en: 'Internship planning for a faculty of medicine',
      fr: "La planification des stages d'une faculté de médecine",
    },
    context: { en: 'Faculty of Medicine and Pharmacy, Rabat', fr: 'Faculté de Médecine et de Pharmacie de Rabat' },
    role: { en: 'Design, build, deploy', fr: 'Conception, développement, déploiement' },
    summary: {
      en: "Every year the faculty sends thousands of medicine and pharmacy students through hospital rotations. All of that used to live in an MS Access file. PGSH replaced it: hospitals and services, student groups, the yearly rotation plan, attendance and grades, all running on the faculty's own servers.",
      fr: "Chaque année, la faculté envoie des milliers d'étudiants en médecine et en pharmacie en stage hospitalier. Tout ça vivait dans un fichier MS Access. PGSH l'a remplacé : hôpitaux et services, groupes d'étudiants, plan de rotation annuel, présences et notes, le tout sur les serveurs de la faculté.",
    },
    built: [
      {
        en: 'A .NET 9 API with clean architecture and CQRS (MediatR, FluentValidation, EF Core on PostgreSQL). Every endpoint stays closed until a permission opens it.',
        fr: "Une API .NET 9 en clean architecture et CQRS (MediatR, FluentValidation, EF Core sur PostgreSQL). Chaque endpoint reste fermé tant qu'une permission ne l'ouvre pas.",
      },
      {
        en: "A planning engine that won't put one group in two services at once, respects each service's capacity and follows each promotion's own calendar.",
        fr: "Un moteur de planification qui refuse de mettre un groupe dans deux services en même temps, respecte la capacité de chaque service et suit le calendrier de chaque promotion.",
      },
      {
        en: 'Five VMs on ESXi. Caddy is the only way in, over HTTPS, and passes traffic to the API containers, Keycloak and PostgreSQL 17.',
        fr: "Cinq VM sur ESXi. Caddy est la seule porte d'entrée, en HTTPS, et transmet le trafic aux conteneurs de l'API, à Keycloak et à PostgreSQL 17.",
      },
      {
        en: 'An ops VM with Prometheus, Grafana, Loki, Tempo and OpenTelemetry, k6 for load tests, and encrypted backups on a systemd timer.',
        fr: "Une VM d'exploitation avec Prometheus, Grafana, Loki, Tempo et OpenTelemetry, k6 pour les tests de charge, et des sauvegardes chiffrées lancées par un timer systemd.",
      },
    ],
    metrics: [
      { value: '2,634', label: { en: 'tests, xUnit and Testcontainers', fr: 'tests, xUnit et Testcontainers' } },
      { value: '5', label: { en: 'VMs behind one address', fr: 'VM derrière une adresse' } },
      { value: '6k+', label: { en: 'students', fr: 'étudiants' } },
    ],
    stack: ['.NET 9', 'React 19', 'Mantine', 'PostgreSQL 17', 'Keycloak', 'Docker', 'ESXi', 'Caddy', 'OpenTelemetry', 'Grafana', 'k6'],
  },
  {
    id: 'lexi',
    index: '02',
    name: 'Lexi',
    diagram: 'pipeline',
    year: '2026',
    url: 'https://lexiarchive.com',
    tagline: {
      en: 'An offline legal archive that can read Arabic',
      fr: "Une archive juridique hors ligne qui sait lire l'arabe",
    },
    context: { en: 'My own product, lexiarchive.com', fr: 'Mon propre produit, lexiarchive.com' },
    role: { en: 'Founder and engineer', fr: 'Fondateur et ingénieur' },
    summary: {
      en: "Lawyers, notaries and judicial commissioners in Morocco sit on piles of paper they can't search. Lexi reads their Arabic and French documents, files them and answers questions about them. Everything runs on their own computer, so client files never leave the office.",
      fr: "Avocats, notaires et commissaires judiciaires au Maroc travaillent avec des piles de papier impossibles à fouiller. Lexi lit leurs documents en arabe et en français, les classe et répond aux questions à leur sujet. Tout tourne sur leur propre ordinateur : les dossiers des clients ne quittent jamais le cabinet.",
    },
    built: [
      {
        en: 'A desktop app in Tauri v2 and React 19, with a Python (FastAPI) backend bundled inside and SQLite for storage.',
        fr: 'Une application desktop en Tauri v2 et React 19, avec un backend Python (FastAPI) embarqué et SQLite pour le stockage.',
      },
      {
        en: "Documents go through a local model (Gemma on Ollama). Scanned pages get cut into strips first, because that's what finally made small Arabic print readable.",
        fr: "Les documents passent par un modèle local (Gemma sur Ollama). Les pages scannées sont d'abord découpées en bandes : c'est ce qui a enfin rendu lisibles les petits caractères arabes.",
      },
      {
        en: 'The chat finds cases through a search tool on a SQLite FTS5 index. I had planned a vector database and dropped it, because the simple index worked better.',
        fr: "Le chat retrouve les dossiers grâce à un outil de recherche sur un index SQLite FTS5. J'avais prévu une base vectorielle, je l'ai abandonnée : l'index simple marchait mieux.",
      },
      {
        en: 'Licences run on a self-hosted Keygen server behind my own FastAPI admin (310 tests), reached through a Cloudflare Tunnel. The website is Astro, in Arabic and French.',
        fr: "Les licences tournent sur un serveur Keygen auto-hébergé, derrière ma propre admin FastAPI (310 tests), accessible via un Cloudflare Tunnel. Le site est en Astro, en arabe et en français.",
      },
    ],
    metrics: [
      { value: '100%', label: { en: 'offline', fr: 'hors ligne' } },
      { value: 'AR + FR', label: { en: 'documents and UI', fr: 'documents et interface' } },
      { value: '~30 s', label: { en: 'per digital document', fr: 'par document numérique' } },
    ],
    stack: ['Tauri v2', 'React 19', 'TypeScript', 'FastAPI', 'SQLite FTS5', 'Ollama', 'Gemma', 'PyMuPDF', 'Keygen', 'Cloudflare', 'Astro'],
  },
  {
    id: 'idara',
    index: '03',
    name: 'Idara',
    native: 'إدارة',
    diagram: 'orbit',
    year: '2026',
    tagline: {
      en: 'A complete HR system for a public institution',
      fr: 'Un système RH complet pour un établissement public',
    },
    context: { en: 'Faculty of Medicine and Pharmacy, Rabat', fr: 'Faculté de Médecine et de Pharmacie de Rabat' },
    role: { en: 'Design, build, deploy', fr: 'Conception, développement, déploiement' },
    summary: {
      en: "HR in Moroccan public administration still runs on paper, Excel and people's memory. Idara puts it in one place for the faculty: records for teaching and administrative staff, assignments, careers and grades, leave and absences, quotas, discipline, yearly evaluations, and the official documents HR has to sign every day.",
      fr: "Dans l'administration publique marocaine, les RH tournent encore au papier, à Excel et à la mémoire des gens. Idara rassemble tout pour la faculté : dossiers des enseignants et du personnel administratif, affectations, carrières et grades, congés et absences, quotas, discipline, notation annuelle, et les documents officiels que les RH signent tous les jours.",
    },
    built: [
      {
        en: 'A TypeScript monorepo: Express and Prisma on PostgreSQL 17 for the API, React and TanStack Query for the front end, and Zod schemas shared by both sides.',
        fr: "Un monorepo TypeScript : Express et Prisma sur PostgreSQL 17 pour l'API, React et TanStack Query pour le front, et des schémas Zod partagés des deux côtés.",
      },
      {
        en: 'Policy-based access with a data scope per unit, so a department head only sees their own people. Every HR change lands in an audit log.',
        fr: "Des accès par politiques avec un périmètre par unité : un chef de service ne voit que ses agents. Chaque modification RH part dans un journal d'audit.",
      },
      {
        en: 'Work attestations and mission orders rendered to PDF with Puppeteer, in French and Arabic. The signer comes from the org chart at generation time, never from a hard-coded name.',
        fr: "Attestations de travail et ordres de mission générés en PDF avec Puppeteer, en français et en arabe. Le signataire est lu dans l'organigramme au moment de la génération, jamais codé en dur.",
      },
      {
        en: 'In-app notifications, a monthly job that flags promotion eligibility and upcoming retirements, Excel import of existing staff, reports, and a Docker Compose stack with daily pg_dump backups.',
        fr: "Notifications dans l'application, une tâche mensuelle qui signale les avancements possibles et les départs à la retraite, import Excel du personnel existant, rapports, et une stack Docker Compose avec sauvegardes pg_dump quotidiennes.",
      },
    ],
    metrics: [
      { value: '400+', label: { en: 'tests', fr: 'tests' } },
      { value: '10+', label: { en: 'HR modules', fr: 'modules RH' } },
      { value: '3', label: { en: 'languages: FR, AR, EN', fr: 'langues : FR, AR, EN' } },
    ],
    stack: ['TypeScript', 'React', 'Express', 'Prisma', 'PostgreSQL 17', 'Zod', 'Puppeteer', 'i18next', 'Docker', 'nginx', 'Vitest'],
  },
  {
    id: 'balagh',
    index: '04',
    name: 'Balagh',
    native: 'بلاغ',
    diagram: 'flow',
    year: '2026',
    tagline: {
      en: 'Student complaints, handled properly',
      fr: 'Les réclamations étudiantes, enfin bien gérées',
    },
    context: { en: 'Faculty of Medicine and Pharmacy, Rabat', fr: 'Faculté de Médecine et de Pharmacie de Rabat' },
    role: { en: 'Full-stack and security', fr: 'Full-stack et sécurité' },
    summary: {
      en: "Students file a complaint through a guided form and follow the answer in a live thread. Staff sort, reply and export. It works in French and Arabic, right-to-left included, and it costs nothing to host.",
      fr: "Les étudiants déposent une réclamation via un formulaire guidé et suivent la réponse dans un fil en direct. L'administration trie, répond et exporte. Ça marche en français et en arabe, de droite à gauche compris, et l'hébergement ne coûte rien.",
    },
    built: [
      {
        en: 'Next.js 14 with strict TypeScript. Every input goes through Zod and every write is rate limited.',
        fr: 'Next.js 14 en TypeScript strict. Chaque entrée passe par Zod et chaque écriture est limitée en débit.',
      },
      {
        en: "Supabase with row level security on every table, so even a bug in the app can't read someone else's data.",
        fr: "Supabase avec la sécurité au niveau des lignes sur chaque table : même un bug dans l'application ne peut pas lire les données d'un autre.",
      },
      {
        en: 'A form builder for admins, permissions they can change themselves, and an audit log of every admin action.',
        fr: "Un constructeur de formulaires pour les admins, des permissions qu'ils peuvent modifier eux-mêmes, et un journal de chaque action admin.",
      },
      {
        en: 'Swappable email providers, outgoing webhooks, and a hook for a Telegram AI agent.',
        fr: "Des fournisseurs d'e-mail interchangeables, des webhooks sortants et un branchement pour un agent IA sur Telegram.",
      },
    ],
    metrics: [
      { value: '€0', label: { en: 'a month to host', fr: "d'hébergement par mois" } },
      { value: 'RLS', label: { en: 'on every table', fr: 'sur chaque table' } },
      { value: 'FR + AR', label: { en: 'right-to-left included', fr: 'RTL compris' } },
    ],
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'PostgreSQL', 'Realtime', 'Tailwind', 'next-intl', 'Zod', 'Vercel'],
  },
];

/* Approach (working with Claude) */
export const approach = {
  kicker: { en: 'How I work', fr: 'Ma méthode' },
  title: {
    en: 'I work with Claude. *I still own every decision.*',
    fr: 'Je travaille avec Claude. *Les décisions restent les miennes.*',
  },
  lead: {
    en: "Claude Code makes me a lot faster. Going fast without rules just means shipping bugs faster, though, so every project follows the same few habits.",
    fr: "Claude Code me rend beaucoup plus rapide. Mais aller vite sans règles, c'est juste livrer des bugs plus vite. Alors chaque projet suit les mêmes quelques habitudes.",
  },
  principles: [
    {
      title: { en: 'Write it down first', fr: "L'écrire d'abord" },
      body: {
        en: 'The schema, the API contracts and the reasons behind decisions go into the repo before the code does. When the code changes, the docs change with it.',
        fr: "Le schéma, les contrats d'API et les raisons derrière chaque décision entrent dans le dépôt avant le code. Quand le code change, la doc change avec.",
      },
    },
    {
      title: { en: 'Nothing moves on red', fr: 'On ne passe pas au rouge' },
      body: {
        en: "A phase isn't done until types, lint and tests pass. I don't start the next one with a known failure.",
        fr: "Une phase n'est pas finie tant que le typage, le lint et les tests ne passent pas. Je ne commence pas la suivante avec un échec connu.",
      },
    },
    {
      title: { en: 'Test against the real thing', fr: 'Tester sur le vrai' },
      body: {
        en: "Smoke tests on real data, load tests on the real servers. When something breaks, I write down why, so it can't break the same way twice.",
        fr: "Tests de fumée sur les vraies données, tests de charge sur les vrais serveurs. Quand quelque chose casse, je note pourquoi, pour que ça ne casse pas deux fois de la même façon.",
      },
    },
    {
      title: { en: 'The AI drafts, I sign', fr: "L'IA rédige, je signe" },
      body: {
        en: "Architecture, security boundaries and anything that touches people's data: I decide, and I review every line of it.",
        fr: "L'architecture, les frontières de sécurité et tout ce qui touche aux données des gens : c'est moi qui décide, et je relis chaque ligne.",
      },
    },
  ],
  caption: {
    en: 'A typical PGSH session, shortened.',
    fr: 'Une session type sur PGSH, raccourcie.',
  },
  // Lines for the animated terminal. kind: cmd | out | ok | dim
  terminal: [
    { kind: 'cmd', text: 'claude' },
    { kind: 'dim', text: '› read docs/planning-rotation.md before touching RotationArranger' },
    { kind: 'out', text: '  plan: 4 files · guard first · tests before handlers' },
    { kind: 'cmd', text: 'dotnet test PGSH.Tests' },
    { kind: 'ok', text: '  Passed!  Failed: 0, Passed: 2634, Skipped: 0' },
    { kind: 'cmd', text: 'docker compose -f deploy/app/docker-compose.yml up -d' },
    { kind: 'ok', text: '  ✔ pgsh-migrations  exited (0)' },
    { kind: 'ok', text: '  ✔ pgsh-api         healthy' },
    { kind: 'cmd', text: 'k6 run deploy/loadtest/scenarios/planning.js' },
    { kind: 'ok', text: '  ✓ thresholds passed · checks 100.00%' },
  ] as { kind: 'cmd' | 'out' | 'ok' | 'dim'; text: string }[],
};

/* Research (PhD) */
export const research = {
  kicker: { en: 'Research', fr: 'Recherche' },
  title: { en: 'My PhD, in *mobile security*', fr: 'Ma thèse, en *sécurité mobile*' },
  status: { en: 'PhD candidate · 2024 → 2028', fr: 'Doctorant · 2024 → 2028' },
  thesis: 'Security approaches for embedded mobile systems',
  where: {
    en: 'Mohammed V University, Rabat · IPSS team (Intelligent Processing and Security of Systems) · supervised by Prof. Ahmed El-Yahyaoui',
    fr: 'Université Mohammed V, Rabat · équipe IPSS (Intelligent Processing and Security of Systems) · sous la direction du Pr Ahmed El-Yahyaoui',
  },
  lead: {
    en: "A phone checks who you are once, when you unlock it. After that it trusts whoever is holding it. My main contribution, CLCA, recognises you from the way you type and keeps up as your habits change, without forgetting what it learned and without keeping your raw data.",
    fr: "Un téléphone vérifie qui vous êtes une seule fois, au déverrouillage. Ensuite, il fait confiance à n'importe qui. Ma contribution principale, CLCA, vous reconnaît à votre façon de taper et suit l'évolution de vos habitudes, sans oublier ce qu'il a appris et sans garder vos données brutes.",
  },
  findingsTitle: { en: 'What the experiments showed', fr: 'Ce que les expériences ont montré' },
  findings: [
    {
      en: "Typing behaviour drifts over time, and it drifts a lot when someone switches device. I measured it on real data; the literature hadn't.",
      fr: "La façon de taper dérive avec le temps, et beaucoup quand on change d'appareil. Je l'ai mesuré sur des données réelles ; la littérature ne l'avait pas établi.",
    },
    {
      en: 'Updating the model session by session lowers verification errors under drift, with no catastrophic forgetting.',
      fr: 'Mettre le modèle à jour session après session réduit les erreurs de vérification face à la dérive, sans oubli catastrophique.',
    },
    {
      en: 'The mechanism that keeps updates small also resists slow poisoning attacks. That held on two independent groups of users.',
      fr: "Le mécanisme qui limite les mises à jour résiste aussi à l'empoisonnement progressif. C'est vrai sur deux groupes d'utilisateurs indépendants.",
    },
    {
      en: 'After a sudden keyboard change, the adaptive model recovers within one session. A frozen model never does.',
      fr: 'Après un changement brusque de clavier, le modèle adaptatif se rétablit en une session. Un modèle figé, jamais.',
    },
  ],
  method: 'CNN-BiLSTM · Variational Continual Learning · Deep Generative Replay · CMU, Tappy and Buffalo datasets',
  next: {
    en: 'Next: adaptive detection running directly on ARM Cortex-M microcontrollers, with memory and energy as hard limits.',
    fr: "La suite : une détection adaptative qui tourne directement sur des microcontrôleurs ARM Cortex-M, avec la mémoire et l'énergie comme contraintes fortes.",
  },
  pubsTitle: { en: 'Papers', fr: 'Publications' },
  pubs: [
    {
      year: { en: 'In preparation', fr: 'En préparation' },
      venue: 'IEEE Transactions on Biometrics, Behavior, and Identity Science (Q1)',
      title: 'CLCA: A Continual Learning Framework for Drift-Aware Continuous Authentication Using Keystroke Dynamics',
      note: { en: 'Journal article', fr: 'Article de revue' },
    },
    {
      year: { en: '2025', fr: '2025' },
      venue: 'OCMT 2025, Oman College, Oman',
      title: 'Securing Mobile Short-Range Wireless Systems: A Comparative Survey of NFC and BLE Security Mechanisms, Vulnerabilities, and Mitigation Strategies',
      note: { en: 'International conference, accepted as a book chapter', fr: "Conférence internationale, retenue comme chapitre d'ouvrage" },
    },
    {
      year: { en: '2025', fr: '2025' },
      venue: "ICAIM'25, ENSA Fès, Morocco",
      title: 'LSTM-Based GPS Spoofing Detection for Mobile Security',
      note: { en: 'National conference', fr: 'Conférence nationale' },
    },
  ],
  authors: 'E. Elasraoui, A. El-Yahyaoui',
};

/* Capabilities */
export const capabilities = [
  {
    key: 'software',
    title: { en: 'Software', fr: 'Logiciel' },
    blurb: {
      en: "Backends with real business rules, and screens people can use without a training session.",
      fr: "Des backends avec de vraies règles métier, et des écrans qu'on utilise sans formation.",
    },
    items: ['C# and .NET 9, ASP.NET Core, EF Core', 'TypeScript, React 19, Next.js, Astro', 'Python and FastAPI', 'Tauri desktop apps', 'Kotlin for Android, Java', 'PostgreSQL, SQL Server, SQLite, MongoDB'],
  },
  {
    key: 'devops',
    title: { en: 'DevOps', fr: 'DevOps' },
    blurb: {
      en: 'On your own servers or in the cloud. Monitored, backed up and written down.',
      fr: 'Sur vos serveurs ou dans le cloud. Surveillé, sauvegardé et documenté.',
    },
    items: ['VMware ESXi virtualization', 'Docker, Compose, reverse proxies, TLS', 'Keycloak, OIDC and SSO', 'Prometheus, Grafana, Loki, Tempo, OTel', 'AWS (EC2, S3, RDS, IAM, CDK), OpenStack', 'Cloudflare, Netlify, Vercel, CI/CD'],
  },
  {
    key: 'ai',
    title: { en: 'AI and security', fr: 'IA et sécurité' },
    blurb: {
      en: 'Models that run privately, and the research background to know where they break.',
      fr: 'Des modèles qui tournent en privé, et le bagage de recherche pour savoir où ils cassent.',
    },
    items: ['Claude Code workflows for teams', 'Local LLMs with Ollama and Gemma', 'Reading scanned Arabic documents', 'Continual learning, behavioural biometrics', 'Mobile security: BLE, NFC, GPS spoofing', 'LSTM, CNN, GANs, Spark MLlib'],
  },
];

/* Services */
export const services = {
  kicker: { en: 'Services', fr: 'Services' },
  title: { en: 'How we can *work together*', fr: 'Comment *travailler ensemble*' },
  offers: [
    {
      n: '01',
      title: { en: 'Build a product', fr: 'Construire un produit' },
      body: {
        en: "An MVP, an internal tool, or that old Access database everyone is scared to touch. I take it from the schema to a running app.",
        fr: "Un MVP, un outil interne, ou cette vieille base Access que personne n'ose toucher. Je l'emmène du schéma à une application en production.",
      },
      tags: ['Web apps', 'APIs', 'Desktop', 'Migrations'],
    },
    {
      n: '02',
      title: { en: 'Set up your infrastructure', fr: 'Monter votre infrastructure' },
      body: {
        en: 'Virtual machines or cloud, SSO, monitoring and backups, plus runbooks your team can follow without calling me.',
        fr: "Machines virtuelles ou cloud, SSO, supervision et sauvegardes, avec des procédures que votre équipe peut suivre sans m'appeler.",
      },
      tags: ['ESXi', 'Docker', 'Monitoring', 'Backups'],
    },
    {
      n: '03',
      title: { en: 'Add AI to what you have', fr: "Ajouter de l'IA à l'existant" },
      body: {
        en: 'Private LLM features, document reading in Arabic and French, or a Claude Code setup for your developers.',
        fr: "Des fonctions LLM privées, la lecture de documents en arabe et en français, ou une mise en place de Claude Code pour vos développeurs.",
      },
      tags: ['Local LLMs', 'OCR', 'Agents', 'Claude Code'],
    },
  ],
  terms: [
    { k: { en: 'Format', fr: 'Format' }, v: { en: 'Part-time, 2 to 3 days a week, or fixed-scope missions', fr: 'Temps partiel, 2 à 3 jours par semaine, ou missions au forfait' } },
    { k: { en: 'Where', fr: 'Où' }, v: { en: 'Remote, or on site in Rabat and Casablanca', fr: 'À distance, ou sur site à Rabat et Casablanca' } },
    { k: { en: 'Time zone', fr: 'Fuseau' }, v: { en: 'GMT+1, same hours as most of Europe', fr: "GMT+1, les mêmes heures que l'Europe" } },
    { k: { en: 'Languages', fr: 'Langues' }, v: { en: 'Arabic, French, English, some German (B1)', fr: 'Arabe, français, anglais, un peu d\'allemand (B1)' } },
  ],
};

/* Journey */
export const journey = {
  kicker: { en: 'Journey', fr: 'Parcours' },
  title: { en: 'How I *got here*', fr: 'Comment *j\'en suis arrivé là*' },
  items: [
    {
      when: '2024 → 2028',
      where: { en: 'Mohammed V University, Rabat · IPSS team', fr: 'Université Mohammed V, Rabat · équipe IPSS' },
      role: { en: 'PhD candidate in science and technology', fr: 'Doctorant en sciences et technologies' },
      body: {
        en: 'Thesis on security for embedded mobile systems, supervised by Prof. Ahmed El-Yahyaoui. Two conference papers so far, a journal article on the way, defence planned for 2028.',
        fr: 'Thèse sur la sécurité des systèmes mobiles embarqués, sous la direction du Pr Ahmed El-Yahyaoui. Deux communications en conférence, un article de revue en préparation, soutenance prévue en 2028.',
      },
    },
    {
      // TODO(you): confirm the title and dates of your current position.
      when: '2025 → now',
      where: { en: 'Faculty of Medicine and Pharmacy, Rabat, and independent', fr: 'Faculté de Médecine et de Pharmacie de Rabat, et indépendant' },
      role: { en: 'Software and DevOps engineer', fr: 'Ingénieur logiciel et DevOps' },
      body: {
        en: 'Built and deployed PGSH, Idara and Balagh for the faculty. Started Lexi, my own product.',
        fr: 'Conception et déploiement de PGSH, Idara et Balagh pour la faculté. Lancement de Lexi, mon propre produit.',
      },
    },
    {
      when: '2023',
      where: { en: 'LoginID, Canada (remote)', fr: 'LoginID, Canada (à distance)' },
      role: { en: 'Android developer', fr: 'Développeur Android' },
      body: {
        en: 'Worked on an Android identity wallet that uses fully homomorphic encryption. Kotlin, clean architecture, Dagger Hilt.',
        fr: "Travail sur un portefeuille d'identité Android qui utilise le chiffrement totalement homomorphe. Kotlin, clean architecture, Dagger Hilt.",
      },
    },
    {
      when: '2021 → 2023',
      where: { en: 'Mohammed V University, Rabat', fr: 'Université Mohammed V, Rabat' },
      role: { en: 'Master in Intelligent Processing of Systems', fr: 'Master en Traitement Intelligent des Systèmes' },
      body: {
        en: 'Big data with Hadoop and Spark MLlib, private clouds on OpenStack and OpenShift, and a self-driving car trained with Q-learning.',
        fr: 'Big data avec Hadoop et Spark MLlib, clouds privés sur OpenStack et OpenShift, et une voiture autonome entraînée par Q-learning.',
      },
    },
    {
      when: '2021',
      where: { en: 'Lifemakers Academy, Oujda', fr: 'Lifemakers Academy, Oujda' },
      role: { en: 'React developer and data analyst', fr: 'Développeur React et data analyst' },
      body: {
        en: 'A project management app that predicts how long a task should take, using regression models.',
        fr: "Une application de gestion de projets qui prédit la durée d'une tâche avec des modèles de régression.",
      },
    },
    {
      when: '2020',
      where: { en: 'Cefolim, Oujda', fr: 'Cefolim, Oujda' },
      role: { en: 'Full-stack developer', fr: 'Développeur full-stack' },
      body: {
        en: 'An education news platform with a REST API and live chat rooms over WebSockets.',
        fr: "Une plateforme d'actualités éducatives avec une API REST et des salons de discussion en direct via WebSockets.",
      },
    },
    {
      when: '2018 → 2021',
      where: { en: 'Mohammed I University, EST Oujda', fr: 'Université Mohammed I, EST Oujda' },
      role: { en: "Professional bachelor's in business intelligence", fr: 'Licence professionnelle en informatique décisionnelle' },
      body: {
        en: 'Including a 2019 internship where I built a C# and SQL Server desktop app for the regional education office.',
        fr: "Dont un stage en 2019 où j'ai construit une application C# et SQL Server pour la direction régionale de l'éducation.",
      },
    },
  ],
  certsTitle: { en: 'Certifications', fr: 'Certifications' },
  certs: [
    'AWS Academy Cloud Foundations',
    'AWS Academy Cloud Security Foundations',
    'IBM Big Data 101 and Hadoop 101',
    'IBM MapReduce and YARN, Apache Pig 101',
    'WIPO Academy DL-101: Intellectual Property',
  ],
};

/* Contact */
export const contact = {
  kicker: { en: 'Contact', fr: 'Contact' },
  title: { en: 'Got something to *build*, or to *fix*?', fr: 'Un projet à *construire*, ou à *réparer* ?' },
  lead: {
    en: "Tell me what you're working on. I answer within a day, usually with a few questions.",
    fr: 'Dites-moi sur quoi vous travaillez. Je réponds dans la journée, souvent avec quelques questions.',
  },
  copy: { en: 'Copy email', fr: "Copier l'e-mail" },
  copied: { en: 'Copied', fr: 'Copié' },
};

/* Small UI strings */
export const ui = {
  palette: { en: 'Jump to…', fr: 'Aller à…' },
  paletteHint: { en: 'Type to filter · Enter to go · Esc to close', fr: 'Tapez pour filtrer · Entrée pour y aller · Échap pour fermer' },
  built: { en: 'What I built', fr: "Ce que j'ai construit" },
  visit: { en: 'Visit the site', fr: 'Voir le site' },
  localTime: { en: 'Local time in Rabat', fr: 'Heure locale à Rabat' },
  footer: {
    en: 'Built by me, with Claude. Static site, no tracking.',
    fr: 'Fait par moi, avec Claude. Site statique, sans pistage.',
  },
  switchLang: { en: 'Français', fr: 'English' },
  email: { en: 'Send an email', fr: 'Envoyer un e-mail' },
  explore: { en: 'Explore', fr: 'Explorer' },
  selectedWork: { en: 'Selected work', fr: 'Projets choisis' },
  workTitle: { en: 'Things running in *production*', fr: 'Ce qui tourne en *production*' },
  capsKicker: { en: 'Capabilities', fr: 'Compétences' },
  capsTitle: { en: 'Three trades, *one person*', fr: 'Trois métiers, *une personne*' },
  loading: { en: 'Booting', fr: 'Démarrage' },
};
