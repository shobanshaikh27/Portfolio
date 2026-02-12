"use client"

import React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, Linkedin, Github, Instagram, CheckCircle2, Loader2 } from "lucide-react"
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
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Spam protection - hidden field
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear status when user starts typing again
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: t("contact.sentSuccess")
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
        })
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' })
        }, 5000)
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || "Failed to send message. Please try again."
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: "Network error. Please check your connection and try again."
      })
    } finally {
      setIsSubmitting(false)
    }
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
                    {/* Honeypot field - hidden from real users, visible to bots */}
                    <Input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      style={{ position: 'absolute', left: '-9999px' }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      {t("contact.name")} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      disabled={isSubmitting}
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      {t("contact.email")} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      disabled={isSubmitting}
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="subject"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("contact.subject")} *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    required
                    disabled={isSubmitting}
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("contact.message")} *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    disabled={isSubmitting}
                    className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full gap-2 shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t("contact.send")}
                    </>
                  )}
                </Button>
                {submitStatus.type && (
                  <div
                    className={`rounded-lg p-4 ${submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
                      : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      {submitStatus.type === 'success' && (
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      )}
                      <p className="text-sm font-medium">{submitStatus.message}</p>
                    </div>
                  </div>
                )}
                <p className="text-xs text-muted-foreground text-center">
                  All fields marked with * are required
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Location & Details */}
          <div className="flex flex-col gap-6 lg:col-span-2">

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
            {/* Map */}
            <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="relative h-48 w-full bg-muted">
                <iframe
                  title="Marburg, Germany"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81226.88086167573!2d8.683862!3d50.809524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bc5894164a6f53%3A0x42227a4cc45cf7e6!2sMarburg%2C%20Germany!5e0!3m2!1sen!2sus!4v1234567890"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Card>

          </div>
        </div>
      </div>
    </section>
  )
}