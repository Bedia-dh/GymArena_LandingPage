"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ArenaGallery() {
  const images = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250929-WA0020-Ty7I6eXwDve5czpsln7C18PDQbxUcw.jpg",
      alt: "Arena 45 Storefront",
      caption: "Welcome to Arena 45",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250929-WA0005-dZBOBJUUDrY2dEsQ4jqKtuKXdH9Vh3.jpg",
      alt: "Arena 45 Interior Logo",
      caption: "Industrial Design Aesthetic",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250929-WA0003-rA8RSOqnDpnB3HS6PSwb8uDHdL9N0v.jpg",
      alt: "Training in Progress",
      caption: "Professional Training Environment",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250929-WA0004-F4PkW5ZQ1stsF4JSML8kj7s0GnjoFu.jpg",
      alt: "Arena 45 Logo Detail",
      caption: "Attention to Detail",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250929-WA0016-AYCmWuESTjuTziTOhI5qN88MUJeUSQ.jpg",
      alt: "Motivational Stairway",
      caption: "Dare to Be Great",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Experience <span className="text-primary">Arena 45</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Step inside our world-class facility designed to inspire greatness and deliver results.
          </p>
        </div>

        {/* Gallery */}
        <div className="relative">
          {/* Main Image */}
          <div className="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-card">
            <img
              src={images[currentIndex].src || "/placeholder.svg"}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">{images[currentIndex].caption}</h3>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border hover:bg-background"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border hover:bg-background"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative aspect-video rounded-lg overflow-hidden transition-all ${
                index === currentIndex
                  ? "ring-2 ring-primary scale-105"
                  : "hover:scale-105 opacity-70 hover:opacity-100"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
