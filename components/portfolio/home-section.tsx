"use client"

import React from "react"

import { useEffect, useState, useRef } from "react"
import { ArrowDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"
import Link from "next/link"

const featuredProjects = [
  {
    title: "MedConnect Gujarat",
    description: "Healthcare web app serving 50,000+ users",
    tags: ["React", "TypeScript", "Socket.io"],
    href: "https://www.medconnectgujarat.com/"
  },
  {
    title: "OnlineKhata",
    description: "Invoicing software with 100k+ users",
    tags: ["React", "GraphQL", "Node.js"],
    href:"https://onlinekhata.co.in/"
  },
]

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const tick = () => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1))
        if (text.length + 1 === currentWord.length) {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pause)
          return
        }
      } else {
        setText(currentWord.substring(0, text.length - 1))
        if (text.length === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
          return
        }
      }
    }

    timeoutRef.current = setTimeout(tick, isDeleting ? speed / 2 : speed)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [text, isDeleting, wordIndex, words, speed, pause])

  return text
}

export function HomeSection() {
  const { t } = useI18n()
  const typedText = useTypewriter([
    t("home.typewriter1"),
    t("home.typewriter2"),
    t("home.typewriter3"),
  ])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="flex min-h-screen flex-col justify-center py-20">
      <div
        className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <div className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1.5">
          <span className="text-sm font-medium text-primary">{t("home.open")}</span>
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          {t("home.greeting")}
        </h1>

        <div className="mt-4 flex items-center gap-1 text-2xl font-semibold text-primary md:text-3xl lg:text-4xl">
          <span>{typedText}</span>
          <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-primary" style={{ height: "1.2em" }} />
        </div>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("home.subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button size="lg" asChild>
            <a href="#about">
              {t("home.learnMore")}
              <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              {t("home.contactMe")}
            </a>
          </Button>
        </div>
      </div>

      {/* Featured Projects Preview */}
      <div
        className={`mt-16 transition-all delay-300 duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("home.featuredProjects")}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((project) => (
           <Link href={project.href} target="_blank"> <Card
              key={project.title}
              className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
