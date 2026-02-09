"use client"

import { useReveal } from "@/hooks/use-reveal"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex w-full items-center px-6 py-20 md:h-screen md:w-screen md:shrink-0 md:snap-start md:px-12 md:py-20 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-10 ${
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

        <div className="space-y-3 md:space-y-2">
          {[
            {
              number: "01",
              title: "Hospitality & Tourism",
              category: "Seasonal onboarding, service standards, frontline readiness",
              year: "",
              direction: "left",
            },
            {
              number: "02",
              title: "Retail & Multi-Site",
              category: "Store consistency, product knowledge, area manager capability",
              year: "",
              direction: "right",
            },
            {
              number: "03",
              title: "Financial Services",
              category: "Regulatory compliance, adviser development, customer outcomes",
              year: "",
              direction: "left",
            },
            {
              number: "04",
              title: "Technology & Digital",
              category: "Customer success, technical onboarding, remote team alignment",
              year: "",
              direction: "right",
            },
            {
              number: "05",
              title: "Public Sector",
              category: "Compliance that lands, service standards, policy rollout at speed",
              year: "",
              direction: "left",
            },
            {
              number: "06",
              title: "Healthcare & Life Sciences",
              category: "Patient safety, clinical compliance, continuing professional development",
              year: "",
              direction: "right",
            },
            {
              number: "07",
              title: "Manufacturing & Logistics",
              category: "Safety-critical training, operational SOPs, supply chain readiness",
              year: "",
              direction: "left",
            },
            {
              number: "08",
              title: "Professional Services",
              category: "Methodology adoption, client delivery standards, knowledge sharing at scale",
              year: "",
              direction: "right",
            },
          ].map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
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
  project: { number: string; title: string; category: string; year: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex items-center justify-between border-b border-foreground/10 py-4 transition-all duration-700 hover:border-foreground/20 md:py-3 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {project.number}
        </span>
        <div>
          <h3 className="mb-0.5 font-serif text-xl uppercase text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-2xl lg:text-3xl">
            {project.title}
          </h3>
          <p className="font-sans text-xs text-foreground md:text-sm">{project.category}</p>
        </div>
      </div>
      <span className="font-mono text-xs text-foreground/30 md:text-sm">{project.year}</span>
    </div>
  )
}
