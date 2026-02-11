"use client"

import { GraduationCap, Award, Languages, Code2, Server, Database, Cloud } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/hooks/use-in-view"

interface Education {
  degreeKey: string
  institutionKey: string
  period: string
  detail?: string
  status: string
}

const education: Education[] = [
  {
    degreeKey: "about.msc",
    institutionKey: "about.mscInstitution",
    period: "Apr 2025 - Present",
    status: "current",
  },
  {
    degreeKey: "about.be",
    institutionKey: "about.beInstitution",
    period: "Sep 2020 - May 2024",
    detail: "CGPA: 8.4/10",
    status: "completed",
  },
]

const languages = [
  { name: "English", level: "C1 - Advanced" },
  { name: "German", level: "Learning" },
  { name: "Hindi", level: "Native" },
]

const whatIDo = [
  {
    icon: Code2,
    titleKey: "whatIDo.frontend.title",
    descKey: "whatIDo.frontend.description",
  },
  {
    icon: Server,
    titleKey: "whatIDo.backend.title",
    descKey: "whatIDo.backend.description",
  },
  {
    icon: Database,
    titleKey: "whatIDo.database.title",
    descKey: "whatIDo.database.description",
  },
  {
    icon: Cloud,
    titleKey: "whatIDo.devops.title",
    descKey: "whatIDo.devops.description",
  },
]

export function AboutSection() {
  const { t } = useI18n()
  const { ref, isInView } = useInView()

  return (
    <section id="about" className="py-20" ref={ref}>
      <div
        className={`transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("about.title")}</h2>
        <div className="mt-2 h-1 w-16 rounded-full bg-primary" />

        {/* Bio */}
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("about.bio")}
        </p>

        {/* What I Do Section */}
        <div className="mt-12">
          <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {t("whatIDo.title")}
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {whatIDo.map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.titleKey}
                  className={`group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20 dark:bg-primary/20 dark:group-hover:bg-primary/30">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-foreground">
                      {t(item.titleKey)}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(item.descKey)}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Education */}
        <div className="mt-12">
          <div className="mb-6 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">{t("about.education")}</h3>
          </div>
          <div className="relative ml-2 border-l-2 border-border pl-6">
            {education.map((edu, index) => (
              <div
                key={edu.degreeKey}
                className={`relative mb-8 last:mb-0 transition-all duration-500 ${isInView ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                style={{ transitionDelay: `${index * 150 + 200}ms` }}
              >
                <div className="absolute -left-[32.5px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{t(edu.degreeKey)}</h4>
                        <p className="text-sm text-muted-foreground">{t(edu.institutionKey)}</p>
                      </div>
                      <Badge variant={edu.status === "current" ? "default" : "secondary"} className="text-xs">
                        {edu.period}
                      </Badge>
                    </div>
                    {edu.detail && (
                      <p className="mt-2 text-sm font-medium text-primary">{edu.detail}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-12">
          <div className="mb-6 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">{t("about.achievements")}</h3>
          </div>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">{t("about.hackathon")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Languages */}
        <div className="mt-12">
          <div className="mb-6 flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">{t("about.languages")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {languages.map((lang) => (
              <Card key={lang.name} className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-foreground">{lang.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{lang.level}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}