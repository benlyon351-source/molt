"use client"

import { Shader, ChromaFlow } from "shaders/react"
import { MeshGradient } from "@paper-design/shaders-react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState, useCallback } from "react"
import { Menu, X } from "lucide-react"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()

  // Detect mobile breakpoint
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)")
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches)
    onChange(mql)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = useCallback(
    (index: number) => {
      if (!scrollContainerRef.current) return

      if (isMobile) {
        const sections = scrollContainerRef.current.querySelectorAll(":scope > section")
        if (sections[index]) {
          sections[index].scrollIntoView({ behavior: "smooth", block: "start" })
        }
      } else {
        const sectionWidth = scrollContainerRef.current.offsetWidth
        scrollContainerRef.current.scrollTo({
          left: sectionWidth * index,
          behavior: "smooth",
        })
      }
      setCurrentSection(index)
      setMenuOpen(false)
    },
    [isMobile]
  )

  useEffect(() => {
    if (isMobile) return // Let native vertical scroll work on mobile

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection, isMobile, scrollToSection])

  useEffect(() => {
    if (isMobile) return // Native vertical scroll on mobile

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 4) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection, isMobile])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        let newSection: number
        if (isMobile) {
          const sectionHeight = window.innerHeight
          const scrollTop = scrollContainerRef.current.scrollTop
          newSection = Math.round(scrollTop / sectionHeight)
        } else {
          const sectionWidth = scrollContainerRef.current.offsetWidth
          const scrollLeft = scrollContainerRef.current.scrollLeft
          newSection = Math.round(scrollLeft / sectionWidth)
        }

        if (newSection !== currentSection && newSection >= 0 && newSection <= 4) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection, isMobile])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background md:overflow-hidden">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        {/* Base layer: MeshGradient with full MOLT palette */}
        <MeshGradient
          colors={[
            "#070501", // MOLT BLACK
            "#191411", // MOLT BARK
            "#5d5446", // TAUPE
            "#747f8c", // ICE
            "#303c4b", // WATER
            "#915a2e", // CLAY
            "#3b4a36", // MOSS
            "#4fb1c5", // BOLT
          ]}
          distortion={0.4}
          swirl={0.15}
          grainMixer={0.05}
          grainOverlay={0}
          speed={0.15}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        {/* Mouse-reactive layer on top */}
        <div className="absolute inset-0" style={{ mixBlendMode: "screen" }}>
          <Shader className="h-full w-full">
            <ChromaFlow
              baseColor="#070501"
              upColor="#4fb1c5"
              downColor="#747f8c"
              leftColor="#915a2e"
              rightColor="#303c4b"
              intensity={0.6}
              radius={1.6}
              momentum={25}
              maskType="alpha"
              opacity={0.7}
            />
          </Shader>
        </div>
        {/* Dark overlay to deepen the overall look */}
        <div className="absolute inset-0 bg-[#070501]/40" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-opacity duration-700 md:px-12 md:py-6 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center transition-transform hover:scale-105"
        >
          <img
            src="/images/molt-logo.gif"
            alt="MOLT"
            className="h-10 w-auto md:h-14"
          />
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {["Home", "How We Work", "Results", "About", "Contact"].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm transition-colors ${
                currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                  currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
            Book a scoping session
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-xl md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-foreground" />
        </button>
      </nav>

      {/* Mobile fullscreen menu overlay */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <img
            src="/images/molt-logo.gif"
            alt="MOLT"
            className="h-10 w-auto"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center px-8">
          <div className="space-y-6">
            {["Home", "How We Work", "Results", "About", "Contact"].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(index)}
                className={`block font-serif text-3xl uppercase tracking-tight transition-colors ${
                  currentSection === index ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="px-8 pb-12">
          <MagneticButton
            size="lg"
            variant="primary"
            className="w-full"
            onClick={() => scrollToSection(4)}
          >
            Book a scoping session
          </MagneticButton>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } flex h-screen flex-col overflow-y-auto overflow-x-hidden md:flex-row md:overflow-x-auto md:overflow-y-hidden`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section className="flex min-h-screen w-full flex-col items-start justify-center px-6 pt-24 md:h-screen md:w-screen md:shrink-0 md:px-12">
          <div className="max-w-3xl">
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-serif text-4xl uppercase leading-[1.1] tracking-tight text-foreground duration-1000 md:text-5xl lg:text-6xl">
              <span className="text-balance">
                Growth means shedding what no longer fits.
                <br />
                It's time to MOLT.
              </span>
            </h1>
            <p className="mb-8 max-w-lg animate-in fade-in slide-in-from-bottom-4 font-sans text-base leading-relaxed text-foreground duration-1000 delay-200 md:text-lg">
              <span className="text-pretty">
                Bespoke e-learning designed for your business, built to engage like the content your people
                actually choose to watch — and delivered faster than ever before.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => scrollToSection(4)}
              >
                Book a scoping session
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(1)}>
                See how we work
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-in fade-in duration-1000 delay-500 md:block">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Scroll to explore</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>

        <ServicesSection />
        <WorkSection />
        <AboutSection scrollToSection={scrollToSection} />
        <ContactSection />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
