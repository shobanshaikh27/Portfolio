"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"

interface TechItem {
  name: string
  rating: number
}

interface TechCategory {
  titleKey: string
  items: TechItem[]
}

// Map technology names to their SVG filenames in the public folder
const techLogos: Record<string, string> = {
  "JavaScript": "/javascript.svg",
  "TypeScript": "/typescript.svg",
  "Python": "/python.svg",
  "Java": "/java.svg",
  "C": "/c.svg",
  "React": "/react_light.svg",
  "Next.js": "/nextjs_icon_dark.svg",
  "Redux": "/redux.svg",
  "Tailwind CSS": "/tailwindcss.svg",
  "shadcn/ui": "/shadcn-ui.svg",
  "Framer Motion": "/framer.svg",
  "Three.js": "/threejs-light.svg",
  "HTML5": "/html5.svg",
  "CSS3": "/css_old.svg",
  "Node.js": "/nodejs.svg",
  "Express": "/expressjs.svg",
  "REST APIs": "/rest-api-icon.svg",
  "GraphQL": "/graphql.svg",
  "Socket.io": "/socketio-icon-light.svg",
  "Webhooks": "/webhooks-svgrepo-com.svg",
  "MongoDB": "/mongodb-wordmark-light.svg",
  "PostgreSQL": "/postgresql.svg",
  "MySQL": "/mysql-icon-light.svg",
  "Sequelize": "/sequelize.svg",
  "Git": "/git.svg",
  "Docker": "/docker.svg",
  "GitHub Actions": "/github_light.svg",
  "CI/CD": "/ci-cd-svgrepo-com.svg",
  "Vite": "/vite.svg",
  "Webpack": "/webpack-svgrepo-com.svg",
  "Unit Testing": "/testing.svg",
  "Integration Testing": "/testing.svg",
  "E2E Testing": "/testing.svg",
}

const categories: TechCategory[] = [
  {
    titleKey: "techStack.languages",
    items: [
      { name: "JavaScript", rating: 5 },
      { name: "TypeScript", rating: 5 },
      { name: "Python", rating: 3 },
      { name: "Java", rating: 2 },
      { name: "C", rating: 2 },
    ],
  },
  {
    titleKey: "techStack.frontend",
    items: [
      { name: "React", rating: 5 },
      { name: "Next.js", rating: 4 },
      { name: "Redux", rating: 4 },
      { name: "Tailwind CSS", rating: 5 },
      { name: "shadcn/ui", rating: 5 },
      { name: "Framer Motion", rating: 4 },
      { name: "Three.js", rating: 3 },
      { name: "HTML5", rating: 5 },
      { name: "CSS3", rating: 5 },
    ],
  },
  {
    titleKey: "techStack.backend",
    items: [
      { name: "Node.js", rating: 4 },
      { name: "Express", rating: 4 },
      { name: "REST APIs", rating: 5 },
      { name: "GraphQL", rating: 4 },
      { name: "Socket.io", rating: 4 },
      { name: "Webhooks", rating: 3 },
    ],
  },
  {
    titleKey: "techStack.database",
    items: [
      { name: "MongoDB", rating: 4 },
      { name: "PostgreSQL", rating: 4 },
      { name: "MySQL", rating: 3 },
      { name: "Sequelize", rating: 4 },
    ],
  },
  {
    titleKey: "techStack.devops",
    items: [
      { name: "Git", rating: 5 },
      { name: "Docker", rating: 4 },
      { name: "GitHub Actions", rating: 4 },
      { name: "CI/CD", rating: 4 },
      { name: "Vite", rating: 5 },
      { name: "Webpack", rating: 3 },
    ],
  },
  {
    titleKey: "techStack.testing",
    items: [
      { name: "Unit Testing", rating: 4 },
      { name: "Integration Testing", rating: 4 },
      { name: "E2E Testing", rating: 3 },
    ],
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

export function TechStackSection() {
  const { t } = useI18n()
  const { ref, isInView } = useInView()

  return (
    <section id="techstack" className="py-20" ref={ref}>
      <div
        className={`transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("techStack.title")}</h2>
        <div className="mt-2 h-1 w-16 rounded-full bg-primary" />

        <div className="mt-10 flex flex-col gap-8">
          {categories.map((category, catIdx) => (
            <div
              key={category.titleKey}
              className={`transition-all  duration-500 ${isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: `${catIdx * 100 + 200}ms` }}
            >
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {t(category.titleKey)}
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {category.items.map((item) => (
                  <Card
                    key={item.name}
                    className="group  dark:bg-white/15 border-border/50  backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
                  >
                    <CardContent className="flex flex-col items-center gap-2 p-4">
                      <div className="flex h-16 w-16 items-center  justify-center p-1">
                        {techLogos[item.name] ? (
                          <Image 
                            src={techLogos[item.name]} 
                            alt={item.name}
                            width={100}
                            height={100}
                          />
                        ) : (
                          <span className="text-sm font-bold text-primary">
                            {item.name.substring(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span className="text-center text-sm font-medium text-foreground leading-tight">
                        {item.name}
                      </span>
                      <StarRating rating={item.rating} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}