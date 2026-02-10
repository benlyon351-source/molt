"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex w-full items-center px-4 py-20 md:h-screen md:w-screen md:shrink-0 md:snap-start md:px-12 md:py-20 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left side - Story */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-8 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-serif text-3xl uppercase leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-4xl lg:text-5xl">
                Built by
                <br />
                practitioners,
                <br />
                <span className="text-foreground/40">powered by AI</span>
              </h2>
            </div>

            <div
              className={`space-y-3 transition-all duration-700 md:space-y-3 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md font-sans text-sm leading-relaxed text-foreground md:text-lg">
                Founded by ex-management consultants who spent years inside complex organisations — designing capability
                programmes, leading change, and watching training fail to engage.
              </p>
              <p className="max-w-md font-sans text-sm leading-relaxed text-foreground md:text-lg">
                Most e-learning gets clicked through, not absorbed. Generic, slow to build, and disconnected from how
                people actually learn today.
              </p>
              <p className="max-w-md font-sans text-sm leading-relaxed text-foreground md:text-lg">
                MOLT exists to fix that.
              </p>
            </div>
          </div>

          {/* Right side - Stats with creative layout */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-5">
            {[
              { value: "100%", label: "Outcome-mapped", sublabel: "Every programme tied to the performance shifts your business needs.", direction: "right" },
              { value: "< 6s", label: "To hook a learner", sublabel: "We design for how your people actually consume content today.", direction: "left" },
              { value: "1:1", label: "Co-created", sublabel: "Your language, your context, your people on screen as AI avatars.", direction: "right" },
              { value: "1\u20134 wks", label: "Avg. to launch", sublabel: "AI-powered workflow. Speed without compromising depth.", direction: "left" },
            ].map((stat, i) => {
              const getRevealClass = () => {
                if (!isVisible) {
                  return stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                }
                return "translate-x-0 opacity-100"
              }

              return (
                <div
                  key={i}
                  className={`flex items-baseline gap-4 border-l border-foreground/30 pl-4 transition-all duration-700 md:gap-8 md:pl-8 ${getRevealClass()}`}
                  style={{
                    transitionDelay: `${300 + i * 150}ms`,
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: i % 2 === 0 ? "100%" : "85%",
                  }}
                >
                  <div className="whitespace-nowrap text-3xl font-light text-foreground md:text-5xl lg:text-6xl">{stat.value}</div>
                  <div>
                    <div className="font-sans text-base font-light text-foreground md:text-xl">{stat.label}</div>
                    <div className="font-mono text-xs text-foreground/60">{stat.sublabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`mt-8 hidden flex-wrap gap-3 transition-all duration-700 md:mt-8 md:flex md:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(4)}>
            Book a scoping session
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
