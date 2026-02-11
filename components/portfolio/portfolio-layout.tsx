"use client"

import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { Menu, Sun, Moon, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { Sidebar } from "@/components/portfolio/sidebar"
import { HomeSection } from "@/components/portfolio/home-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { TechStackSection } from "@/components/portfolio/techstack-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { AnimatedBackground } from "@/components/portfolio/animated-background"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

const sections = ["home", "about", "experience", "techstack", "projects", "contact"]

export function PortfolioLayout() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    setShowScrollTop(scrollY > 400)

    // Determine active section
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i])
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 150) {
          setActiveSection(sections[i])
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const { t, locale, setLocale } = useI18n()

  return (
    <div className="relative flex min-h-screen">
      {/* Animated backgrounds */}
      <div className="animated-gradient fixed inset-0 -z-20" />
      <AnimatedBackground />

      {/* Desktop Sidebar - Glass Morphism */}
      <div className="fixed left-0 top-0 z-30 hidden h-screen w-72 border-r border-white/20 bg-white/10 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/20 dark:shadow-blue-500/10 lg:block">
        <Sidebar activeSection={activeSection} />
      </div>

      {/* Mobile Header - Glass Morphism */}
      <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between border-b border-white/20 bg-white/10 px-4 py-3 shadow-lg shadow-cyan-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/20 dark:shadow-blue-500/10 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 overflow-y-auto border-r border-white/20 bg-white/10 p-0 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/20">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div
              onClick={() => setMobileOpen(false)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setMobileOpen(false) }}
              role="presentation"
              className="h-full"
            >
              <Sidebar activeSection={activeSection} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
          {/* Language Switcher */}
          <div className="flex items-center justify-center gap-2 rounded-lg bg-white/30 p-1.5 backdrop-blur-sm dark:bg-gray-800/30">
            <button
              onClick={() => setLocale("en")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                locale === "en"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-white/40 dark:hover:bg-gray-700/40"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("de")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                locale === "de"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-white/40 dark:hover:bg-gray-700/40"
              )}
            >
              DE
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72">
        {/* Desktop Theme Toggle */}

        <div className="fixed lg:flex right-6 items-center gap-2 top-6 z-30 hidden ">
          {mounted && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border-white/20 bg-white/10 shadow-md backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/20"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}
          {/* Language Switcher */}
          <div className="flex items-center justify-center gap-2 rounded-lg bg-white/30 p-1.5 backdrop-blur-sm dark:bg-gray-800/30">
            <button
              onClick={() => setLocale("en")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                locale === "en"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-white/40 dark:hover:bg-gray-700/40"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("de")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                locale === "de"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-white/40 dark:hover:bg-gray-700/40"
              )}
            >
              DE
            </button>
          </div>
        </div>



        <div className="mx-auto max-w-4xl px-6 pt-16 lg:px-10 lg:pt-0">
          <HomeSection />
          <AboutSection />
          <ExperienceSection />
          <TechStackSection />
          <ProjectsSection />
          <ContactSection />

          {/* Footer */}
          <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
            <p>
              {"Built with Next, TypeScript & Tailwind CSS"}
            </p>
            <p className="mt-1">
              {"Mohmed Shoban Shaikh"} &middot; {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </main>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300",
          showScrollTop ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  )
}
