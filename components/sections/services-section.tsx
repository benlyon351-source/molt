"use client"

import { useReveal } from "@/hooks/use-reveal"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-serif text-5xl uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl">
            How We Work
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ From challenge to launch, at speed</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {[
            {
              title: "Define",
              description: "A focused scoping session. We clarify the outcome, audience, and constraints — then outline a practical build plan.",
              direction: "top",
            },
            {
              title: "Design",
              description: "A curriculum blueprint mapped to business outcomes — your examples, your terminology. You review and refine with us.",
              direction: "right",
            },
            {
              title: "Produce",
              description: "Scripts, video lessons, and interactive modules featuring AI avatars of your own people. Studio quality, without the studio timeline or budget.",
              direction: "left",
            },
            {
              title: "Deploy",
              description: "Packaged for your LMS. Assign, track, measure — and iterate as priorities change.",
              direction: "bottom",
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-serif text-2xl uppercase text-foreground md:text-3xl">{service.title}</h3>
      <p className="max-w-sm font-sans text-sm leading-relaxed text-foreground md:text-base">{service.description}</p>
    </div>
  )
}
