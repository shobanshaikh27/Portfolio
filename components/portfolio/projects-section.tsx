"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/hooks/use-in-view"

interface Project {
  title: string
  descKey: string
  image: string
  tech: string[]
  featureKeys: string[]
  liveUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    title: "MedConnect Gujarat",
    descKey: "projects.medconnectDesc",
    image: "/medconnect.png",
    tech: ["React", "TypeScript", "Socket.io", "REST APIs", "Docker"],
    liveUrl: "https://www.medconnectgujarat.com/",
    githubUrl: "", // Add GitHub URL if available
    featureKeys: [
      "projects.medconnectFeature1",
      "projects.medconnectFeature2",
      "projects.medconnectFeature3",
      "projects.medconnectFeature4",
    ],
  },
  {
    title: "OnlineKhata",
    descKey: "projects.onlinekhataDesc",
    image: "/onlinekhata.png",
    tech: ["React", "TypeScript", "Tailwind CSS", "GraphQL", "Node.js"],
    liveUrl: "https://onlinekhata.co.in/",
    githubUrl: "", // Add GitHub URL if available
    featureKeys: [
      "projects.onlinekhataFeature1",
      "projects.onlinekhataFeature2",
      "projects.onlinekhataFeature3",
      "projects.onlinekhataFeature4",
    ],
  },
  {
    title: "Portfolio Website",
    descKey: "projects.portfolioDesc",
    image: "/karan-portfolio.png",
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Cloudinary"],
    liveUrl: "https://karan-mistry-photography.vercel.app/",
    githubUrl: "https://github.com/shobanshaikh27/karan_mistry_photography", // Add GitHub URL if available
    featureKeys: [
      "projects.portfolioFeature1",
      "projects.portfolioFeature2",
      "projects.portfolioFeature3",
      "projects.portfolioFeature4",
    ],
  },
]

export function ProjectsSection() {
  const { t } = useI18n()
  const { ref, isInView } = useInView()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="py-20" ref={ref}>
      <div
        className={`transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("projects.title")}</h2>
        <div className="mt-2 h-1 w-16 rounded-full bg-primary" />

        {/* Projects Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => {
            const isExpanded = expandedIndex === index
            return (
              <Card
                key={project.title}
                className={`group overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 ${isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: `${index * 150 + 200}ms` }}
              >
                {/* Project Image */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                </div>

                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {t(project.descKey)}
                  </p>

                  {/* Tech badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Expandable features */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="mt-3 flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                    aria-label={isExpanded ? "Collapse features" : "Show features"}
                  >
                    {t("projects.keyFeatures")}
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isExpanded ? "mt-2 max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <ul className="flex flex-col gap-1.5 rounded-lg bg-muted/50 p-3">
                      {project.featureKeys.map((fKey) => (
                        <li key={fKey} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {t(fKey)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-4 flex gap-3">
                    {/* Live Demo Button */}
                    {project.liveUrl ? (
                      <Button size="sm" className="gap-2" asChild>
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5" />
                          {t("projects.liveDemo")}
                        </Link>
                      </Button>
                    ) : (
                      <Button size="sm" className="gap-2" disabled>
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t("projects.liveDemo")}
                      </Button>
                    )}

                    {/* GitHub Button */}
                    {project.githubUrl ? (
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent" asChild>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3.5 w-3.5" />
                          {t("projects.github")}
                        </Link>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent" disabled>
                        <Github className="h-3.5 w-3.5" />
                        {t("projects.github")}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}