"use client"

import { Mail, Linkedin } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.email) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(false)

    try {
      const fields = [
        { name: "firstname", value: formData.firstName },
        { name: "lastname", value: formData.lastName },
        { name: "email", value: formData.email },
      ]

      if (formData.company) fields.push({ name: "company", value: formData.company })
      if (formData.phone) fields.push({ name: "phone", value: formData.phone })
      if (formData.message) fields.push({ name: "message", value: formData.message })

      const response = await fetch(
        "https://api-eu1.hsforms.com/submissions/v3/integration/submit/147773050/2b23bb55-2f3f-42cc-b2ca-cc85290d519e",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields,
            context: {
              pageUri: typeof window !== "undefined" ? window.location.href : "",
              pageName: "MOLT Contact Form",
            },
          }),
        }
      )

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ firstName: "", lastName: "", email: "", company: "", phone: "", message: "" })
      } else {
        setSubmitError(true)
      }
    } catch {
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={ref}
      className="flex w-full items-start px-4 py-20 md:h-screen md:w-screen md:shrink-0 md:snap-start md:items-center md:px-12 md:py-20 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-serif text-3xl uppercase leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-4xl lg:text-5xl">
                Let's talk
                <br />
                about what
                <br />
                you need
              </h2>
              <p className="font-mono text-xs text-foreground/60 md:text-base">/ Share context, we'll map a route to launch</p>
            </div>

            <div className="space-y-4 md:space-y-8">
              <a
                href="mailto:hello@justmolt.com"
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">Email</span>
                </div>
                <p className="font-sans text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">
                  hello@justmolt.com
                </p>
              </a>

              <a
                href="https://www.linkedin.com/company/just-molt/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group block pt-2 transition-all duration-700 md:pt-4 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Linkedin className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">LinkedIn</span>
                </div>
                <p className="font-sans text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">
                  {"Connect with us on LinkedIn \u2192"}
                </p>
              </a>
            </div>
          </div>

          {/* Right side - Form or Success Panel */}
          <div className="flex flex-col justify-center">
            {submitSuccess ? (
              <div className="flex flex-col justify-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 md:space-y-8">
                <h3 className="font-serif text-3xl uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Thank you
                </h3>
                <p className="max-w-md font-sans text-base leading-relaxed text-foreground md:text-lg">
                  {"We'll be in touch shortly to schedule your scoping session."}
                </p>
                <p className="font-sans text-base text-foreground md:text-lg">
                  {"In the meantime, follow us on "}
                  <a
                    href="https://www.linkedin.com/company/just-molt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-foreground/50 transition-colors hover:border-foreground hover:text-foreground/80"
                  >
                    LinkedIn
                  </a>
                </p>
                <div>
                  <MagneticButton
                    variant="secondary"
                    size="lg"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    Dismiss
                  </MagneticButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                {/* First name + Last name — side by side on desktop */}
                <div
                  className={`grid grid-cols-1 gap-3 transition-all duration-700 md:grid-cols-2 md:gap-4 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <div>
                    <label className="mb-0.5 block font-mono text-xs text-foreground/60 md:mb-1">First name *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="w-full border-b border-foreground/30 bg-transparent py-1 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-1.5 md:text-base"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="mb-0.5 block font-mono text-xs text-foreground/60 md:mb-1">Last name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="w-full border-b border-foreground/30 bg-transparent py-1 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-1.5 md:text-base"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "350ms" }}
                >
                  <label className="mb-0.5 block font-mono text-xs text-foreground/60 md:mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full border-b border-foreground/30 bg-transparent py-1 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-1.5 md:text-base"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Company */}
                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "500ms" }}
                >
                  <label className="mb-0.5 block font-mono text-xs text-foreground/60 md:mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full border-b border-foreground/30 bg-transparent py-1 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-1.5 md:text-base"
                    placeholder="Your organisation"
                  />
                </div>

                {/* Phone */}
                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "575ms" }}
                >
                  <label className="mb-0.5 block font-mono text-xs text-foreground/60 md:mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-b border-foreground/30 bg-transparent py-1 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-1.5 md:text-base"
                    placeholder="Phone number"
                  />
                </div>

                {/* Message */}
                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "650ms" }}
                >
                  <label className="mb-0.5 block font-mono text-xs text-foreground/60 md:mb-1">Message</label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border-b border-foreground/30 bg-transparent py-1 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-1.5 md:text-base"
                    placeholder="What business challenge are you trying to solve?"
                  />
                </div>

                {/* Submit */}
                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: "800ms" }}
                >
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    className="w-full disabled:opacity-50"
                    onClick={isSubmitting ? undefined : undefined}
                  >
                    {isSubmitting ? "Sending..." : "Book a scoping session"}
                  </MagneticButton>
                  {submitError && (
                    <p className="mt-2 text-center font-mono text-sm text-destructive">{"Something went wrong. Please email us at hello@justmolt.com instead."}</p>
                  )}
                  <p className="mt-2 text-center font-mono text-xs leading-relaxed text-foreground/50">
                    {"We'll schedule a 30-minute scoping session to clarify the outcome, audience, and constraints — then outline a practical first release. No commitment at this stage."}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
