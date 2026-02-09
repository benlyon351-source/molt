"use client"

import { Mail } from "lucide-react"
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
      const response = await fetch(
        "https://api-eu1.hsforms.com/submissions/v3/integration/submit/147773050/2b23bb55-2f3f-42cc-b2ca-cc85290d519e",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { objectTypeId: "0-1", name: "firstname", value: formData.firstName },
              { objectTypeId: "0-1", name: "lastname", value: formData.lastName },
              { objectTypeId: "0-1", name: "email", value: formData.email },
              { objectTypeId: "0-1", name: "company", value: formData.company },
              { objectTypeId: "0-1", name: "phone", value: formData.phone },
              { objectTypeId: "0-1", name: "message", value: formData.message },
            ],
            context: {
              pageUri: window.location.href,
              pageName: "MOLT Contact Form",
            },
          }),
        }
      )

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ firstName: "", lastName: "", email: "", company: "", phone: "", message: "" })
        setTimeout(() => setSubmitSuccess(false), 5000)
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
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-serif text-4xl uppercase leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
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
                href="mailto:hello@molt.com"
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
                  hello@molt.com
                </p>
              </a>

              <div
                className={`flex gap-2 pt-2 transition-all duration-700 md:pt-4 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                {["LinkedIn"].map((social, i) => (
                  <a
                    key={social}
                    href="#"
                    className="border-b border-transparent font-mono text-xs text-foreground/60 transition-all hover:border-foreground/60 hover:text-foreground/90"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Minimal form */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* First name + Last name — side by side on desktop */}
              <div
                className={`grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div>
                  <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">First name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="w-full border-b border-foreground/30 bg-transparent py-1.5 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">Last name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="w-full border-b border-foreground/30 bg-transparent py-1.5 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
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
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
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
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
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
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
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
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">Message</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
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
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-sm text-foreground/80">{"We'll be in touch to schedule your scoping session."}</p>
                )}
                {submitError && (
                  <p className="mt-3 text-center font-mono text-sm text-destructive">{"Something went wrong. Please email us at hello@molt.com instead."}</p>
                )}
                <p className="mt-4 text-center font-mono text-xs leading-relaxed text-foreground/50">
                  {"We'll schedule a 30-minute scoping session to clarify the outcome, audience, and constraints — then outline a practical first release. No commitment at this stage."}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
