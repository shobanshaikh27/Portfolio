"use client"

import {
  Home,
  User,
  Briefcase,
  FolderKanban,
  Layers,
  Mail,
  Download,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Twitter,
  MailIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navItems = [
  { key: "nav.home", icon: Home, href: "#home" },
  { key: "nav.about", icon: User, href: "#about" },
  { key: "nav.experience", icon: Briefcase, href: "#experience" },
  { key: "nav.techStack", icon: Layers, href: "#techstack" },
  { key: "nav.projects", icon: FolderKanban, href: "#projects" },
  { key: "nav.contact", icon: Mail, href: "#contact" },
]

interface SidebarProps {
  activeSection: string
}

export function Sidebar({ activeSection }: SidebarProps) {
  const { t } = useI18n()

  return (
    <aside className="flex h-full flex-col  p-6">
      {/* Profile Card - Frosted Glass */}
      <div className="flex flex-col items-center gap-4 rounded-2xl  bg-transparent p-4">
        <div className="relative">
          {/* NEW CODE - Profile Image */}
          <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-primary bg-white/40 dark:bg-gray-700/40">
            <Image
              src="/passport_size_img.jpg"
              fill
              alt="Mohmed Shoban Shaikh"
              className="object-cover"
              sizes="112px"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 ring-2 ring-white/60 dark:ring-gray-800/60" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground">Mohmed Shoban Shaikh</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Software Engineer
          </p>
          <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            {t("sidebar.location")}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.href.slice(1)
          return (
            <a
              key={item.key}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground max-md:text-white hover:bg-white/30 hover:text-accent-foreground hover:backdrop-blur-sm dark:hover:bg-gray-700/30"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {t(item.key)}
            </a>
          )
        })}
      </nav>


      {/* Download CV */}
      <div className="mt-4">
        <a href="/Resume_Shoban_Shaikh.pdf" download="Shoban_Shaikh_CV.pdf">
          <Button className="w-full gap-2 shadow-md shadow-primary/20" size="default">
            <Download className="h-4 w-4" />
            {t("sidebar.downloadCv")}
          </Button>
        </a>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Social Links - Background fills with brand color, icon turns white */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <a
          href="https://www.linkedin.com/in/shoban-shaikh-909231251/"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-lg bg-white/30 max-md:text-white p-2.5 text-muted-foreground transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#0A66C2] hover:shadow-lg hover:shadow-[#0A66C2]/40 dark:bg-gray-800/30 dark:hover:bg-gray-900"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-4 w-4 transition-colors duration-300 group-hover:text-white" />
        </a>
        <a
          href="https://github.com/shobanshaikh27"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-lg bg-white/30 max-md:text-white p-2.5 text-muted-foreground transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#181717] hover:shadow-lg hover:shadow-gray-900/40 dark:bg-gray-800/30 dark:hover:bg-gray-900"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4 transition-colors duration-300 group-hover:text-white" />
        </a>
        <a
          href="https://instagram.com/s_ss_27"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden max-md:text-white rounded-lg bg-white/30 p-2.5 text-muted-foreground transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-pink-500/40 dark:bg-gray-800/30"
          aria-label="Instagram"
        >
          {/* Instagram gradient overlay */}
          <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#F56040] via-[#E1306C] to-[#833AB4] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Instagram className="relative h-4 w-4 transition-colors duration-300 group-hover:text-white" />
        </a>
        <a
          href="mailto:shobanshaikh273@gmail.com"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground dark:bg-gray-800/30 dark:hover:bg-primary"
          aria-label="Mail"
        >
          <Mail className="h-4 w-4" />
        </a>
      </div>
    </aside>
  )
}
