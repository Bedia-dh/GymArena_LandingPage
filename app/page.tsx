import { ArenaHero } from "@/components/arena-hero"
import { ArenaNavigation } from "@/components/arena-navigation"
import { ArenaPrograms } from "@/components/arena-programs"
import { ArenaBooking } from "@/components/arena-booking"
import { ArenaWhy } from "@/components/arena-why"
import { ArenaGallery } from "@/components/arena-gallery"
import { ArenaTestimonials } from "@/components/arena-testimonials"
import { ArenaContact } from "@/components/arena-contact"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ArenaNavigation />
      <ArenaHero />
      <ArenaPrograms />
      <ArenaBooking />
      <ArenaWhy />
      <ArenaGallery />
      <ArenaTestimonials />
      <ArenaContact />
    </div>
  )
}
