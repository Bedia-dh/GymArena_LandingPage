import { Zap, Users, Trophy, Shield } from "lucide-react"

export function ArenaWhy() {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8 lightning-glow" />,
      title: "Advanced EMS Technology",
      description:
        "State-of-the-art Electrical Muscle Stimulation equipment that maximizes your workout efficiency in just 20 minutes.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Professional Coaching",
      description:
        "Certified trainers with years of experience in CrossFit, EMS, and Pilates to guide your fitness journey.",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Proven Results",
      description:
        "Join hundreds of members who have transformed their bodies and minds through our comprehensive programs.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Personalized Approach",
      description: "Every workout is tailored to your fitness level, goals, and any physical limitations you may have.",
    },
  ]

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Why Choose <span className="text-primary">Arena 45?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We're not just another gym. We're a community dedicated to helping you achieve extraordinary results through
            innovative training methods and expert guidance.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="mx-auto mb-6 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <div className="text-primary">{benefit.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground text-pretty">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-card rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">90%</div>
              <div className="text-muted-foreground">More Efficient with EMS</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">20min</div>
              <div className="text-muted-foreground">Average Session Time</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Happy Members</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5★</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
