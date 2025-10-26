"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Loader2 } from "lucide-react"
import { testimonialsApi, type Testimonial } from "@/lib/api"

export function ArenaTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true)
      const response = await testimonialsApi.getAll({ approved: true, featured: true })
      if (response.success && response.data) {
        setTestimonials(response.data)
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err)
      // Fallback to default testimonials
      setTestimonials([])
    } finally {
      setIsLoading(false)
    }
  }

  // Fallback testimonials
  const fallbackTestimonials: Testimonial[] = [
    {
      _id: "1",
      name: "Sarah Johnson",
      role: "Marketing Executive",
      image: "/professional-woman-smiling.png",
      rating: 5,
      text: "Arena 45's EMS training has completely transformed my fitness routine. In just 20 minutes, I get a workout that feels like 2 hours at a regular gym. The results speak for themselves!",
      program: "ems",
      approved: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "2",
      name: "Mike Rodriguez",
      role: "Software Engineer",
      image: "/professional-man-athletic.jpg",
      rating: 5,
      text: "The CrossFit program here is incredible. The coaches are knowledgeable, supportive, and really push you to achieve your best. I've never been stronger or more confident.",
      program: "crossfit",
      approved: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "3",
      name: "Emma Chen",
      role: "Yoga Instructor",
      image: "/woman-yoga-instructor-peaceful.jpg",
      rating: 5,
      text: "The Pilates classes at Arena 45 have improved my core strength and flexibility tremendously. The instructors are top-notch and the atmosphere is incredibly motivating.",
      program: "pilates",
      approved: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            What Our Members <span className="text-primary">Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Don't just take our word for it. Hear from real members who have transformed their lives at Arena 45.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial) => (
            <Card key={testimonial._id} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 text-pretty">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
