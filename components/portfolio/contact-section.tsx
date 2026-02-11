"use client"

import React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, Linkedin, Github, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/hooks/use-in-view"

export function ContactSection() {
  const { t } = useI18n()
  const { ref, isInView } = useInView()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20" ref={ref}>
      <div
        className={`transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("contact.title")}</h2>
        <div className="mt-2 h-1 w-16 rounded-full bg-primary" />

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* Contact Form */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm lg:col-span-3">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">{t("contact.name")}</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">{t("contact.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="subject">{t("contact.subject")}</Label>
                  <Input
                    id="subject"
                    placeholder="Project Inquiry"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">{t("contact.message")}</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2 sm:w-auto" size="lg">
                  <Send className="h-4 w-4" />
                  {submitted ? t("contact.sent") : t("contact.send")}
                </Button>
                {submitted && (
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    {t("contact.sentSuccess")}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Location & Details */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Map */}
            <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="relative h-48 w-full bg-muted">
                <iframe
                  title="Marburg, Germany"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40818.74095814905!2d8.730849!3d50.810541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bc5deb05df9703%3A0x422435029b0c600!2sMarburg%2C%20Germany!5e0!3m2!1sen!2sde!4v1700000000000!5m2!1sen!2sde"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Card>

            {/* Quick Contact */}
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("contact.quickContact")}
                </h3>
                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:shobanshaikh273@gmail.com"
                    className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    shobanshaikh273@gmail.com
                  </a>
                  <a
                    href="tel:+4915510860646"
                    className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    +49 15510860646
                  </a>
                  <a
                    href="https://www.google.com/maps/place/Marburg/@50.7983666,8.6604135,12z/data=!3m1!4b1!4m6!3m5!1s0x47bc624340db29e9:0x422435029b0a8e0!8m2!3d50.8018843!4d8.7657677!16zL20vMGN5NDE?entry=ttu&g_ep=EgoyMDI2MDIwOC4wIKXMDSoASAFQAw%3D%3D"
                    className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                    target="_blank"
                  >
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      Marburg, Germany
                    </div>
                  </a>
                </div>

                {/* Social quick links */}
                <div className="mt-5 flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/shoban-shaikh-909231251/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/shobanshaikh27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://instagram.com/s_ss_27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="GitHub"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
