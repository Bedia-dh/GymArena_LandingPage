"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Dumbbell, Heart, Loader2 } from "lucide-react"
import { programsApi, type Program } from "@/lib/api"

// Icon mapping for program icons
const iconMap: Record<string, any> = {
  Zap: Zap,
  Dumbbell: Dumbbell,
  Heart: Heart,
}

export function ArenaPrograms() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      setIsLoading(true)
      const response = await programsApi.getAll({ available: true })
      if (response.success && response.data) {
        setPrograms(response.data)
      }
    } catch (err: any) {
      console.error("Error fetching programs:", err)
      setError("Failed to load programs. Please try again later.")
      // Fallback to default programs
      setPrograms([])
    } finally {
      setIsLoading(false)
    }
  }

  // Fallback programs if API fails
  const fallbackPrograms = [
    {
      _id: "1",
      title: "CrossFit Training",
      slug: "crossfit",
      description: "High-intensity functional fitness that builds strength, endurance, and mental toughness through varied workouts.",
      shortDescription: "High-intensity functional fitness",
      features: ["Professional Coaching", "Scalable Workouts", "Community Support", "Competition Prep"],
      price: 0,
      duration: "1 hour",
      sessionsPerWeek: 3,
      icon: "Dumbbell",
      isFeatured: false,
      available: true,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "2",
      title: "EMS Training",
      slug: "ems",
      description: "Revolutionary Electrical Muscle Stimulation technology that amplifies your workout efficiency by up to 90%.",
      shortDescription: "20-Minute EMS Technology Sessions",
      features: ["20-Minute Sessions", "Full Body Activation", "Faster Results", "Low Impact"],
      price: 99,
      duration: "20 minutes",
      sessionsPerWeek: 2,
      icon: "Zap",
      isFeatured: true,
      available: true,
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "3",
      title: "Pilates",
      slug: "pilates",
      description: "Mind-body training focused on core strength, flexibility, and postural alignment for holistic wellness.",
      shortDescription: "Mind-body training for core strength",
      features: ["Core Strengthening", "Flexibility Focus", "Injury Prevention", "Stress Relief"],
      price: 0,
      duration: "45 minutes",
      sessionsPerWeek: 2,
      icon: "Heart",
      isFeatured: false,
      available: true,
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  const displayPrograms = programs.length > 0 ? programs : fallbackPrograms

  if (isLoading) {
    return (
      <section id="programs" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading programs...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="programs" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Choose Your <span className="text-primary">Training Path</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Whether you're seeking strength, efficiency, or balance, Arena 45 offers distinct programs designed to
            unlock your potential.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPrograms.map((program, index) => {
            const IconComponent = iconMap[program.icon] || Zap
            
            return (
              <Card
                key={program._id}
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                  program.isFeatured
                    ? "border-primary bg-card ring-2 ring-primary/20"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                {program.isFeatured && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold">
                    FEATURED
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`mx-auto mb-4 p-3 rounded-full ${
                      program.isFeatured ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{program.title}</CardTitle>
                  <CardDescription className="text-muted-foreground text-base">{program.shortDescription || program.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-2">
                    {program.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      program.isFeatured
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Book {program.title}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
