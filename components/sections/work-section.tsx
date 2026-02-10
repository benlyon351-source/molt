"use client"

import { useReveal } from "@/hooks/use-reveal"
import type { LucideIcon } from "lucide-react"
import { UtensilsCrossed, Store, Landmark, Monitor, Building2, HeartPulse, Factory, Briefcase } from "lucide-react"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex w-full items-center px-6 py-20 md:h-screen md:w-screen md:shrink-0 md:snap-start md:items-start md:px-12 md:pt-32 md:pb-16 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 transition-all duration-700 md:mb-8 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-serif text-3xl uppercase tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Industries
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">{"/ Great learning follows the same foundations \u2014 what changes is the context"}</p>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-foreground md:mt-4 md:text-base">
            MOLT adapts curriculum and content to your industry, your roles, and your pace of change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
          {(() => {
            const industries = [
              {
                icon: UtensilsCrossed,
                title: "Hospitality & Tourism",
                category: "Seasonal onboarding, service standards, frontline readiness",
              },
              {
                icon: Store,
                title: "Retail & Multi-Site",
                category: "Store consistency, product knowledge, area manager capability",
              },
              {
                icon: Landmark,
                title: "Financial Services",
                category: "Regulatory compliance, adviser development, customer outcomes",
              },
              {
                icon: Monitor,
                title: "Technology & Digital",
                category: "Customer success, technical onboarding, remote team alignment",
              },
              {
                icon: Building2,
                title: "Public Sector",
                category: "Compliance that lands, service standards, policy rollout at speed",
              },
              {
                icon: HeartPulse,
                title: "Healthcare & Life Sciences",
                category: "Patient safety, clinical compliance, continuing professional development",
              },
              {
                icon: Factory,
                title: "Manufacturing & Logistics",
                category: "Safety-critical training, operational SOPs, supply chain readiness",
              },
              {
                icon: Briefcase,
                title: "Professional Services",
                category: "Methodology adoption, client delivery standards, knowledge sharing at scale",
              },
            ]
            const leftCol = industries.slice(0, 4)
            const rightCol = industries.slice(4)
            return (
              <>
                {/* Mobile: single stacked list */}
                <div className="space-y-3 md:hidden">
                  {industries.map((item, i) => (
                    <ProjectCard key={i} project={item} index={i} isVisible={isVisible} />
                  ))}
                </div>
                {/* Desktop: two columns */}
                <div className="hidden md:block">
                  {leftCol.map((item, i) => (
                    <ProjectCard key={i} project={item} index={i} isVisible={isVisible} />
                  ))}
                </div>
                <div className="hidden md:block">
                  {rightCol.map((item, i) => (
                    <ProjectCard key={i + 4} project={item} index={i + 4} isVisible={isVisible} />
                  ))}
                </div>
              </>
            )
          })()}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: { icon: LucideIcon; title: string; category: string }
  index: number
  isVisible: boolean
}) {
  const direction = index % 2 === 0 ? "left" : "right"
  const getRevealClass = () => {
    if (!isVisible) {
      return direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex items-center gap-3 border-b border-foreground/10 py-3 transition-all duration-700 hover:border-foreground/20 md:gap-4 md:py-3 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <project.icon className="h-8 w-8 shrink-0 text-foreground/30 transition-colors group-hover:text-foreground/50 md:h-8 md:w-8" />
      <div>
        <h3 className="mb-0.5 font-serif text-lg uppercase text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-lg lg:text-xl">
          {project.title}
        </h3>
        <p className="font-mono text-xs leading-relaxed text-foreground/70 md:text-sm">{project.category}</p>
      </div>
    </div>
  )
}
