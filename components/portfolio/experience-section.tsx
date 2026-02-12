"use client"

import { useState } from "react"
import { Briefcase, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/hooks/use-in-view"

interface Experience {
  titleKey: string
  company: string
  location: string
  period: string
  highlightKeys: string[]
  tech: string[]
}

const experiences: Experience[] = [
  {
    titleKey: "experience.softwareDev",
    company: "Vaani Foundation",
    location: "Remote, India",
    period: "May 2024 - Mar 2025",
    highlightKeys: [
      "experience.vaaniHighlight1",
      "experience.vaaniHighlight2",
      "experience.vaaniHighlight3",
      "experience.vaaniHighlight4",
      "experience.vaaniHighlight5",
    ],
    tech: ["React", "TypeScript", "Socket.io", "Recharts", "Docker", "REST APIs"],
  },
  {
    titleKey: "experience.fullStackDev",
    company: "Bookmatic Pvt. Ltd.",
    location: "Remote, India",
    period: "Dec 2023 - Apr 2024",
    highlightKeys: [
      "experience.bookmaticHighlight1",
      "experience.bookmaticHighlight2",
      "experience.bookmaticHighlight3",
      "experience.bookmaticHighlight4",
      "experience.bookmaticHighlight5",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "GraphQL", "Node.js", "JWT", "OAuth2"],
  },
  {
    titleKey: "experience.frontendIntern",
    company: "Expert IT World",
    location: "Remote, India",
    period: "Jul 2023 - Nov 2023",
    highlightKeys: [
      "experience.expertHighlight1",
      "experience.expertHighlight2",
      "experience.expertHighlight3",
    ],
    tech: ["React", "JavaScript", "CSS3", "HTML5", "Agile"],
  },
]

export function ExperienceSection() {
  const { t } = useI18n()
  const { ref, isInView } = useInView()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="experience" className="py-20" ref={ref}>
      <div
        className={`transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("experience.title")}</h2>
        <div className="mt-2 h-1 w-16 rounded-full bg-primary" />

        <div className="relative mt-10 ml-2 border-l-2 border-border pl-6">
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index
            return (
              <div
                key={exp.company}
                className={`relative mb-10 last:mb-0 transition-all duration-500 ${isInView ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                style={{ transitionDelay: `${index * 200 + 200}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[32.5px]">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                </div>

                <Card
                  className={`cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md ${isExpanded ? "border-primary/20 shadow-md shadow-primary/5" : ""}`}
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold text-foreground">{t(exp.titleKey)}</h4>
                        </div>
                        <p className="mt-1 text-sm text-primary font-medium">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">
                          {exp.location} | {exp.period}
                        </p>
                      </div>
                      <button
                        className="mt-1 shrink-0 text-muted-foreground transition-colors hover:text-primary"
                        aria-label={isExpanded ? "Collapse details" : "Expand details"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {/* Expandable Details */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isExpanded ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <ul className="mb-4 flex flex-col gap-2">
                        {exp.highlightKeys.map((hKey) => (
                          <li
                            key={hKey}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                            {t(hKey)}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tech.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
