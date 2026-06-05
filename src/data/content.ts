export const seo = {
  title: 'OmniTel — Infrastructure fibre optique FTTH',
  description:
    "OmniTel déploie l'infrastructure fibre optique FTTH en Tunisie. Plus de 10 ans d'expérience terrain en France — D1, D2, D3, du génie civil au raccordement client.",
  canonical: 'https://www.omnitel.fr/',
  themeColor: '#0A1E3F',
  openGraph: {
    type: 'website',
    siteName: 'OmniTel',
    locale: 'fr_FR',
    title: 'OmniTel — Infrastructure fibre optique FTTH en Tunisie',
    description:
      "Déploiement, raccordement, recette OTDR et maintenance FTTH. Plus de 10 ans d'expérience terrain en France, au service du marché tunisien.",
    url: 'https://www.omnitel.fr/',
    image: 'https://www.omnitel.fr/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniTel — Infrastructure fibre optique FTTH',
    description:
      'Expertise FTTH D1/D2/D3 : déploiement, soudure, recette OTDR, maintenance. France → Tunisie.',
    image: 'https://www.omnitel.fr/og-image.png',
  },
} as const;

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.omnitel.fr/#org',
      name: 'OmniTel',
      url: 'https://www.omnitel.fr',
      logo: 'https://www.omnitel.fr/og-image.png',
      slogan: 'Fibre • Télécom • Connectivité',
      description:
        "Déploiement, installation, soudure, recette OTDR et maintenance d'infrastructure fibre optique FTTH (D1/D2/D3) en Tunisie.",
      email: 'Nabegh.bensalah@omnitel.fr',
      telephone: '+33605613751',
      founder: {
        '@type': 'Person',
        name: 'Nabegh Ben Salah',
        jobTitle: 'FTTH Project Manager & Fondateur',
      },
      areaServed: [
        { '@type': 'Country', name: 'Tunisie' },
        { '@type': 'Country', name: 'France' },
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://www.omnitel.fr/#service',
      name: 'OmniTel — Infrastructure fibre optique FTTH',
      parentOrganization: { '@id': 'https://www.omnitel.fr/#org' },
      areaServed: { '@type': 'Country', name: 'Tunisie' },
      knowsAbout: [
        'FTTH',
        'Fibre optique',
        'D1',
        'D2',
        'D3',
        'Soudure fibre',
        'Recette OTDR',
        'Génie civil télécom',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services FTTH',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Déploiement FTTH (D1/D2/D3)' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Tirage & installation fibre' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: "Soudure & boîtiers d'épissure" },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: "Infrastructure d'immeuble" },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Tests & validation OTDR' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Maintenance & SAV' },
          },
        ],
      },
    },
  ],
} as const;

export const content = {
  brand: {
    logoSrc: '/omnitel-logo.png',
    logoWidth: 1130,
    logoHeight: 390,
    namePrefix: 'OMNI',
    nameSuffix: 'TEL',
    footerTag: 'Fibre · Télécom · Connectivité',
    homeLabel: 'OmniTel — accueil',
  },
  nav: {
    links: [
      { href: '#expertise', label: 'Expertise' },
      { href: '#services', label: 'Services' },
      { href: '#clients', label: 'Clients' },
      { href: '#vision', label: 'Vision' },
      { href: '#founder', label: 'Fondateur' },
    ],
    contact: 'Contactez-nous',
    menuLabel: 'Menu',
  },
  hero: {
    eyebrow: 'FTTH · Déploiement fibre optique',
    titleStart: "Construire l'infrastructure fibre de demain",
    titleEmphasis: 'en Tunisie',
    subtitle:
      "Plus de 10 ans d'expérience terrain en France, mise au service des opérateurs, collectivités et promoteurs tunisiens. Du génie civil au raccordement client, nous déployons des réseaux FTTH fiables, mesurés et certifiés.",
    primaryCta: 'Demander un rendez-vous',
    secondaryCta: 'Nous contacter',
    stats: [
      { number: '10+', label: "Ans d'expérience" },
      { number: 'D1·D2·D3', label: 'Chaîne complète' },
      { number: '100%', label: 'Recette OTDR' },
    ],
  },
  expertise: {
    sectionNum: '01 / À propos',
    title: 'Une expertise forgée sur le terrain',
    paragraphs: [
      "OmniTel naît d'une décennie de chantiers fibre en France — réseaux d'initiative publique, déploiements opérateurs, raccordements en zone dense comme en zone rurale.",
      "Nous apportons cette rigueur de terrain au marché tunisien : méthodes éprouvées, normes européennes, et une maîtrise complète de la chaîne de déploiement, du transport jusqu'à la prise de l'abonné.",
    ],
    rows: [
      {
        className: 's1',
        code: 'D1',
        codeLabel: 'TRANSPORT',
        title: 'Transport & collecte',
        text: 'Artères principales, génie civil, tirage de câbles longue distance et raccordement des points de mutualisation. La colonne vertébrale du réseau.',
      },
      {
        className: 's2',
        code: 'D2',
        codeLabel: 'DISTRIBUTION',
        title: 'Distribution',
        text: "Déploiement des sous-répartiteurs et des points de branchement optique jusqu'au quartier, à l'immeuble et au pied du logement.",
      },
      {
        className: 's3',
        code: 'D3',
        codeLabel: 'RACCORDEMENT',
        title: 'Raccordement final',
        text: "Du PBO au PTO : raccordement de l'abonné, soudure, jarretiérage et mise en service avec mesures de recette systématiques.",
      },
    ],
  },
  services: {
    sectionNum: '02 / Services',
    title: 'Nos métiers, de bout en bout',
    lead: "Une offre intégrée qui couvre l'intégralité du cycle de vie d'un réseau fibre — de la conception à la maintenance.",
    items: [
      {
        className: 's1',
        num: '01',
        icon: 'deploy',
        title: 'Déploiement FTTH',
        text: 'Conception et déploiement de réseaux fibre de bout en bout sur les segments D1, D2 et D3.',
      },
      {
        className: 's2',
        num: '02',
        icon: 'pull',
        title: 'Tirage & installation fibre',
        text: "Pose en aérien, façade, conduite et chambre. Tirage de câbles optiques dans le respect des règles de l'art.",
      },
      {
        className: 's3',
        num: '03',
        icon: 'splice',
        title: "Soudure & boîtiers d'épissure",
        text: "Soudures par fusion, installation et raccordement des boîtiers d'épissure et points de mutualisation.",
      },
      {
        className: 's4',
        num: '04',
        icon: 'riser',
        title: "Infrastructure d'immeuble",
        text: 'Colonnes montantes, adduction et câblage vertical pour le raccordement des bâtiments collectifs.',
      },
      {
        className: 's5',
        num: '05',
        icon: 'otdr',
        title: 'Tests & validation OTDR',
        text: 'Mesures réflectométriques, photométrie et recette optique. Certification et documentation complète du lien.',
      },
      {
        className: 's6',
        num: '06',
        icon: 'maint',
        title: 'Maintenance & SAV',
        text: 'Supervision, dépannage et maintenance préventive avec engagement de temps de rétablissement (GTR).',
      },
    ],
  },
  why: {
    sectionNum: '03 / Pourquoi OmniTel',
    title: 'La précision avant tout',
    lead: 'Nous ne livrons pas seulement un réseau. Nous livrons un réseau mesuré, documenté et conforme.',
    stats: [
      { number: '10', symbol: '+', label: "Ans d'expérience France" },
      { number: 'D1', symbol: '·', number2: 'D2', symbol2: '·', number3: 'D3', label: 'Maîtrise complète' },
      { number: '100', symbol: '%', label: 'Liens recettés OTDR' },
      { number: 'EU', label: 'Normes & sécurité' },
    ],
    features: [
      {
        className: 's1',
        title: "L'expertise française appliquée à la Tunisie",
        text: "Des méthodes de chantier éprouvées sur des réseaux d'initiative publique, transposées au contexte local.",
      },
      {
        className: 's2',
        title: 'Maîtrise de toute la chaîne D1 / D2 / D3',
        text: 'Un seul interlocuteur du transport au raccordement client — sans rupture de responsabilité.',
      },
      {
        className: 's3',
        title: 'Qualité mesurée et certifiée',
        text: 'Recette OTDR systématique, photométrie et dossier de conformité pour chaque lien livré.',
      },
      {
        className: 's4',
        title: 'Respect des délais et des normes',
        text: 'Planification rigoureuse, sécurité chantier et engagements de temps de rétablissement tenus.',
      },
    ],
  },
  clients: {
    sectionNum: '04 / Clients',
    title: 'Avec qui nous travaillons',
    lead: "Des partenaires exigeants, sur des projets d'infrastructure structurants.",
    items: [
      { className: 's1', icon: 'operator', title: 'Opérateurs télécom', subtitle: 'Déploiement & densification' },
      { className: 's2', icon: 'contractor', title: 'Sous-traitants fibre', subtitle: 'Renfort & sous-traitance' },
      { className: 's3', icon: 'infra', title: "Sociétés d'infrastructure", subtitle: 'Réseaux structurants' },
      { className: 's4', icon: 'realestate', title: 'Promoteurs immobiliers', subtitle: 'Programmes neufs & collectifs' },
      { className: 's5', icon: 'public', title: "Projets d'infrastructure publique", subtitle: 'Collectivités & RIP' },
      { className: 's6', icon: 'industrial', title: 'Sites industriels & commerciaux', subtitle: "Campus & zones d'activité" },
    ],
  },
  vision: {
    eyebrow: '05 / Vision',
    titleStart: 'Connecter la Tunisie,',
    titleEmphasis: 'fibre par fibre',
    text: "Notre ambition : faire de l'expertise fibre un standard local. Bâtir une infrastructure durable qui désenclave les territoires, soutient l'économie numérique et rapproche le savoir-faire européen du terrain tunisien — un raccordement à la fois.",
  },
  founder: {
    sectionNum: '06 / Fondateur',
    initials: 'NB',
    name: 'Nabegh Ben Salah',
    role: 'FTTH Project Manager & Fondateur',
    paragraphs: [
      "Plus de dix ans à piloter des chantiers fibre en France, du génie civil au raccordement client. Une trajectoire de terrain, des artères de transport aux dernières prises optiques de l'abonné.",
      "Nabegh a fondé OmniTel pour transposer cette exigence opérationnelle au marché tunisien : des équipes formées, des méthodes éprouvées et une obsession de la qualité mesurée.",
    ],
    credentials: [
      { strong: '10+ ans', text: ' · terrain FTTH France' },
      { strong: 'D1 · D2 · D3', text: ' · chaîne complète' },
      { strong: 'Recette', text: ' · OTDR & photométrie' },
    ],
  },
  contact: {
    eyebrow: '07 / Contact',
    title: 'Parlons de votre projet',
    lead: 'Déploiement, raccordement, recette ou maintenance — décrivez votre besoin, nous revenons vers vous rapidement.',
    details: {
      emailLabel: 'Email',
      email: 'Nabegh.bensalah@omnitel.fr',
      phoneLabel: 'Téléphone',
      phoneDisplay: '+33 6 05 61 37 51',
      phoneHref: '+33605613751',
      areaLabel: "Zone d'intervention",
      area: 'Tunisie · France',
    },
    form: {
      name: 'Nom',
      namePlaceholder: 'Votre nom',
      company: 'Société',
      companyPlaceholder: 'Votre société',
      email: 'Email',
      emailPlaceholder: 'vous@société.com',
      phone: 'Téléphone',
      phonePlaceholder: '+216 …',
      message: 'Message',
      messagePlaceholder: 'Décrivez votre projet : segment (D1/D2/D3), volumétrie, échéance…',
      submit: 'Envoyer la demande',
      note: 'Réponse sous 48 h ouvrées · Données traitées de manière confidentielle.',
      successTitle: 'Demande envoyée',
      successText: 'Merci. Nous revenons vers vous rapidement.',
    },
  },
  footer: {
    columns: [
      {
        title: 'Société',
        links: [
          { href: '#expertise', label: 'Expertise' },
          { href: '#vision', label: 'Vision' },
          { href: '#founder', label: 'Fondateur' },
        ],
      },
      {
        title: 'Services',
        links: [
          { href: '#services', label: 'Déploiement FTTH' },
          { href: '#services', label: 'Soudure & recette' },
          { href: '#services', label: 'Maintenance' },
        ],
      },
      {
        title: 'Contact',
        links: [
          { href: 'mailto:Nabegh.bensalah@omnitel.fr', label: 'Email' },
          { href: 'tel:+33605613751', label: '+33 6 05 61 37 51' },
          { href: 'https://wa.me/33605613751', label: 'WhatsApp' },
        ],
      },
    ],
    copyright: '© 2026 OmniTel. Tous droits réservés.',
    socialLabels: {
      linkedIn: 'LinkedIn',
      email: 'Email',
      phone: 'Téléphone',
      whatsApp: 'Contacter sur WhatsApp',
    },
  },
} as const;
