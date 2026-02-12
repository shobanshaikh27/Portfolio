"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type Locale = "en" | "de"

const translations: Record<Locale, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.experience": "Experience",
    "nav.techStack": "Tech Stack",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "sidebar.downloadCv": "Download CV",
    "sidebar.location": "Marburg, Germany",
    "home.open":"Open for new challenges",
    "home.greeting": "Hello, I'm Shoban!",
    "home.typewriter1": "I design and develop websites",
    "home.typewriter2": "I build React applications",
    "home.typewriter3": "I craft user experiences",
    "home.subtitle": "Software Developer specializing in building exceptional digital experiences",
    "home.learnMore": "Learn more",
    "home.contactMe": "Contact Me",
    "home.featuredProjects": "Featured Projects",
    "about.title": "About Me",
    "about.bio": "I'm a passionate Software Developer with over 3 years of experience building scalable, performant web applications. I specialize in modern web technologies with a keen eye for clean code architecture and user experience. Currently pursuing my Master's in Computer Science at Philipps University Marburg, Germany, I bring a unique blend of academic rigor and practical development expertise.",
    
    // What I Do Section
    "whatIDo.title": "WHAT I DO",
    "whatIDo.frontend.title": "Frontend Development",
    "whatIDo.frontend.description": "Building responsive, performant UIs with React, Next.js, and modern CSS frameworks.",
    "whatIDo.backend.title": "Backend Development",
    "whatIDo.backend.description": "Creating scalable APIs and services with Node.js, Express, and real-time systems.",
    "whatIDo.database.title": "Database Design",
    "whatIDo.database.description": "Designing efficient schemas with MongoDB, PostgreSQL, and MySQL for optimal performance.",
    "whatIDo.devops.title": "DevOps & Deployment",
    "whatIDo.devops.description": "Containerizing apps with Docker and deploying to cloud platforms with CI/CD pipelines.",
    
    "about.education": "Education",
    "about.msc": "MSc Computer Science",
    "about.mscInstitution": "Philipps University Marburg, Germany",
    "about.be": "B.E. Computer Science",
    "about.beInstitution": "Gujarat Technological University",
    "about.achievements": "Achievements",
    "about.hackathon": "Smart India Hackathon National Finalist (2022, 2023)",
    "about.languages": "Languages",
    "experience.title": "Experience",
    "experience.softwareDev": "Software Engineer",
    "experience.fullStackDev": "Full-Stack Developer",
    "experience.frontendIntern": "Frontend Developer Intern",
    "experience.vaaniHighlight1": "Built MedConnect Gujarat serving 50,000+ users using React & TypeScript",
    "experience.vaaniHighlight2": "Developed reusable UI components for scalability",
    "experience.vaaniHighlight3": "Implemented real-time features with Socket.io and REST API integrations",
    "experience.vaaniHighlight4": "Created interactive analytics dashboards with Recharts",
    "experience.vaaniHighlight5": "Containerized applications with Docker, maintained CI/CD pipelines",
    "experience.bookmaticHighlight1": "Developed OnlineKhata invoicing software (100k+ users) with React, TypeScript, Tailwind CSS",
    "experience.bookmaticHighlight2": "Built 50+ RESTful API endpoints and GraphQL queries",
    "experience.bookmaticHighlight3": "Implemented JWT, OAuth2 authentication with RBAC",
    "experience.bookmaticHighlight4": "Maintained CI/CD pipelines using GitHub Actions",
    "experience.bookmaticHighlight5": "Collaborated with cross-functional teams, translated Figma designs to production code",
    "experience.expertHighlight1": "Built responsive, accessible web applications",
    "experience.expertHighlight2": "Optimized web performance (30% load time reduction)",
    "experience.expertHighlight3": "Participated in Agile/Scrum workflows with code reviews",
    "projects.title": "Projects",
    "projects.filterAll": "All",
    "projects.liveDemo": "Live Demo",
    "projects.github": "GitHub",
    "projects.keyFeatures": "Key Features",
    "projects.artifyDesc": "Full-stack AI image transformation app with restoration, generative fill, background removal. Integrated Stripe payments and Clerk auth.",
    "projects.artifyFeature1": "AI-powered image restoration and enhancement",
    "projects.artifyFeature2": "Generative fill and background removal",
    "projects.artifyFeature3": "Stripe payment integration for premium features",
    "projects.artifyFeature4": "Clerk authentication with user management",
    "projects.medconnectDesc": "Scalable healthcare web application serving 50,000+ users with real-time features, secure authentication, and comprehensive analytics dashboards.",
    "projects.medconnectFeature1": "Real-time patient updates via WebSocket",
    "projects.medconnectFeature2": "OAuth2 authentication with role-based access",
    "projects.medconnectFeature3": "Interactive analytics dashboards with Recharts",
    "projects.medconnectFeature4": "Containerized deployment with Docker",
    "projects.onlinekhataDesc": "Full-featured invoicing software serving 100k+ users with comprehensive API architecture and enterprise-grade security.",
    "projects.onlinekhataFeature1": "50+ RESTful API endpoints and GraphQL queries",
    "projects.onlinekhataFeature2": "JWT authentication with RBAC",
    "projects.onlinekhataFeature3": "CI/CD pipelines with GitHub Actions",
    "projects.onlinekhataFeature4": "Figma to production code workflow",
    "projects.portfolioDesc": "Scalable portfolio with media management, responsive design, and accessibility-focused development using modern technologies.",
    "projects.portfolioFeature1": "Responsive design with mobile-first approach",
    "projects.portfolioFeature2": "Cloud-based media management via Cloudinary",
    "projects.portfolioFeature3": "Accessibility-focused (WCAG AA compliant)",
    "projects.portfolioFeature4": "Performance-optimized with lazy loading",
    "techStack.title": "Tech Stack",
    "techStack.languages": "LANGUAGES",
    "techStack.frontend": "FRONTEND",
    "techStack.backend": "BACKEND",
    "techStack.database": "DATABASE & ORM",
    "techStack.devops": "DEVOPS & TOOLS",
    "techStack.AI": "AI & TOOLS",
    "techStack.Cloud_Services": "CLOUD & SERVICES",
    "contact.title": "Get In Touch",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sent": "Message Sent!",
    "contact.sentSuccess": "Thank you! Your message has been sent successfully.",
    "contact.location": "Location & Details",
    "contact.quickContact": "Quick Contact",
  },
  de: {
    "nav.home": "Startseite",
    "nav.about": "Über mich",
    "nav.experience": "Erfahrung",
    "nav.techStack": "Technologien",
    "nav.projects": "Projekte",
    "nav.contact": "Kontakt",
    "sidebar.downloadCv": "Lebenslauf herunterladen",
    "sidebar.location": "Marburg, Deutschland",
    "home.open":"Offen für neue Herausforderungen",
    "home.greeting": "Hallo, ich bin Shoban!",
    "home.typewriter1": "Ich entwerfe und entwickle Webseiten",
    "home.typewriter2": "Ich baue React-Anwendungen",
    "home.typewriter3": "Ich gestalte Nutzererlebnisse",
    "home.subtitle": "Softwareentwickler, spezialisiert auf die Entwicklung außergewöhnlicher digitaler Erlebnisse",
    "home.learnMore": "Mehr erfahren",
    "home.contactMe": "Kontakt",
    "home.featuredProjects": "Ausgewählte Projekte",
    "about.title": "Über mich",
    "about.bio": "Ich bin ein leidenschaftlicher Softwareentwickler mit über 3 Jahren Erfahrung im Aufbau skalierbarer, performanter Webanwendungen. Ich bin spezialisiert auf moderne Webtechnologien, mit einem scharfen Blick für saubere Code-Architektur und Benutzererfahrung. Derzeit verfolge ich meinen Master in Informatik an der Philipps-Universität Marburg, Deutschland.",
    
    // What I Do Section - German
    "whatIDo.title": "WAS ICH MACHE",
    "whatIDo.frontend.title": "Frontend-Entwicklung",
    "whatIDo.frontend.description": "Entwicklung responsiver, leistungsstarker Benutzeroberflächen mit React, Next.js und modernen CSS-Frameworks.",
    "whatIDo.backend.title": "Backend-Entwicklung",
    "whatIDo.backend.description": "Entwicklung skalierbarer APIs und Dienste mit Node.js, Express und Echtzeitsystemen.",
    "whatIDo.database.title": "Datenbank-Design",
    "whatIDo.database.description": "Gestaltung effizienter Schemata mit MongoDB, PostgreSQL und MySQL für optimale Leistung.",
    "whatIDo.devops.title": "DevOps & Deployment",
    "whatIDo.devops.description": "Containerisierung von Apps mit Docker und Bereitstellung auf Cloud-Plattformen mit CI/CD-Pipelines.",
    
    "about.education": "Ausbildung",
    "about.msc": "Master of Science in Informatik",
    "about.mscInstitution": "Philipps-Universität Marburg, Deutschland",
    "about.be": "Bachelor of Engineering in Informatik",
    "about.beInstitution": "Gujarat Technological University",
    "about.achievements": "Leistungen",
    "about.hackathon": "Smart India Hackathon National-Finalist (2022, 2023)",
    "about.languages": "Sprachen",
    "experience.title": "Erfahrung",
    "experience.softwareDev": "Softwareingenieur",
    "experience.fullStackDev": "Full-Stack-Entwickler",
    "experience.frontendIntern": "Frontend-Entwickler Praktikant",
    "experience.vaaniHighlight1": "Entwickelte MedConnect Gujarat für 50.000+ Nutzer mit React & TypeScript",
    "experience.vaaniHighlight2": "Erstellte wiederverwendbare UI-Komponenten für Skalierbarkeit",
    "experience.vaaniHighlight3": "Implementierte Echtzeit-Funktionen mit Socket.io und REST-API-Integrationen",
    "experience.vaaniHighlight4": "Erstellte interaktive Analyse-Dashboards mit Recharts",
    "experience.vaaniHighlight5": "Containerisierte Anwendungen mit Docker, pflegte CI/CD-Pipelines",
    "experience.bookmaticHighlight1": "Entwickelte OnlineKhata Rechnungssoftware (100k+ Nutzer) mit React, TypeScript, Tailwind CSS",
    "experience.bookmaticHighlight2": "Erstellte 50+ RESTful-API-Endpunkte und GraphQL-Abfragen",
    "experience.bookmaticHighlight3": "Implementierte JWT, OAuth2-Authentifizierung mit RBAC",
    "experience.bookmaticHighlight4": "Pflegte CI/CD-Pipelines mit GitHub Actions",
    "experience.bookmaticHighlight5": "Zusammenarbeit mit funktionsübergreifenden Teams, Umsetzung von Figma-Designs in Produktionscode",
    "experience.expertHighlight1": "Erstellte responsive, barrierefreie Webanwendungen",
    "experience.expertHighlight2": "Optimierte Web-Performance (30% Reduzierung der Ladezeit)",
    "experience.expertHighlight3": "Teilnahme an Agile/Scrum-Workflows mit Code-Reviews",
    "projects.title": "Projekte",
    "projects.filterAll": "Alle",
    "projects.liveDemo": "Live-Demo",
    "projects.github": "GitHub",
    "projects.keyFeatures": "Hauptmerkmale",
    "projects.artifyDesc": "Full-Stack KI-Bildtransformations-App mit Restaurierung, generativer Füllung, Hintergrundentfernung. Integrierte Stripe-Zahlungen und Clerk-Auth.",
    "projects.artifyFeature1": "KI-gestützte Bildrestaurierung und -verbesserung",
    "projects.artifyFeature2": "Generative Füllung und Hintergrundentfernung",
    "projects.artifyFeature3": "Stripe-Zahlungsintegration für Premium-Funktionen",
    "projects.artifyFeature4": "Clerk-Authentifizierung mit Benutzerverwaltung",
    "projects.medconnectDesc": "Skalierbare Gesundheits-Webanwendung für 50.000+ Nutzer mit Echtzeit-Funktionen, sicherer Authentifizierung und umfassenden Analyse-Dashboards.",
    "projects.medconnectFeature1": "Echtzeit-Patientenaktualisierungen über WebSocket",
    "projects.medconnectFeature2": "OAuth2-Authentifizierung mit rollenbasiertem Zugriff",
    "projects.medconnectFeature3": "Interaktive Analyse-Dashboards mit Recharts",
    "projects.medconnectFeature4": "Containerisierte Bereitstellung mit Docker",
    "projects.onlinekhataDesc": "Voll ausgestattete Rechnungssoftware für 100k+ Nutzer mit umfassender API-Architektur und Sicherheit auf Unternehmensniveau.",
    "projects.onlinekhataFeature1": "50+ RESTful-API-Endpunkte und GraphQL-Abfragen",
    "projects.onlinekhataFeature2": "JWT-Authentifizierung mit RBAC",
    "projects.onlinekhataFeature3": "CI/CD-Pipelines mit GitHub Actions",
    "projects.onlinekhataFeature4": "Figma zu Produktionscode-Workflow",
    "projects.portfolioDesc": "Skalierbares Portfolio mit Medienverwaltung, responsivem Design und barrierefreier Entwicklung mit modernen Technologien.",
    "projects.portfolioFeature1": "Responsives Design mit Mobile-First-Ansatz",
    "projects.portfolioFeature2": "Cloud-basierte Medienverwaltung über Cloudinary",
    "projects.portfolioFeature3": "Barrierefreiheit (WCAG AA-konform)",
    "projects.portfolioFeature4": "Leistungsoptimiert mit Lazy Loading",
    "techStack.title": "Technologien",
    "techStack.languages": "SPRACHEN",
    "techStack.frontend": "FRONTEND",
    "techStack.backend": "BACKEND",
    "techStack.database": "DATENBANK & ORM",
    "techStack.devops": "DEVOPS & TOOLS",
    "techStack.AI": "AI & TOOLS",
    "techStack.Cloud_Services": "CLOUD & SERVICES",
    "contact.title": "Kontakt aufnehmen",
    "contact.name": "Name",
    "contact.email": "E-Mail",
    "contact.subject": "Betreff",
    "contact.message": "Nachricht",
    "contact.send": "Nachricht senden",
    "contact.sent": "Nachricht gesendet!",
    "contact.sentSuccess": "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.",
    "contact.location": "Standort & Details",
    "contact.quickContact": "Schnellkontakt",
  },
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  const t = useCallback(
    (key: string) => {
      return translations[locale][key] || key
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}