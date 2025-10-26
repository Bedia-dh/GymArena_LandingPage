import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export function ArenaHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient concrete-texture">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250929-WA0003-rA8RSOqnDpnB3HS6PSwb8uDHdL9N0v.jpg')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-40 h-40 bg-card rounded-full flex items-center justify-center border-4 border-primary/20">
              <div className="text-center">
                <div className="text-primary text-4xl mb-2 lightning-glow">
                  <Zap className="w-10 h-10 mx-auto" />
                </div>
              
                <div className="text-2xl font-bold text-foreground">ARENA</div>
                <div className="text-3xl font-bold text-primary">45</div>
                <div className="text-xs text-muted-foreground mt-1">EMS & F-TRAINING</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
          DARE TO BE <span className="text-primary lightning-glow">GREAT</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
          Transform your fitness journey with professional CrossFit coaching, advanced EMS training, and holistic
          Pilates in one powerful location.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4">
            Book EMS Session
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Explore Programs
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Members Transformed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">3</div>
            <div className="text-muted-foreground">Training Programs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}
