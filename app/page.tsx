import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Users,
  GraduationCap,
  Languages,
  Clock,
  Lock,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  FileText,
  UserCheck,
  MessageSquare,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="mb-4 mx-auto">
              Powered by AI
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance text-center">
              Legal Aid for Every Indian <span className="gradient-text">Through AI Innovation</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed text-center">
              Get instant legal guidance in your language. AI-powered assistance for documents, processes, and your
              legal rights—available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="text-base">
                <Link href="/chat">
                  Chat Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
                <Link href="/plans">See Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Who We Are</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance text-center">
              Empowering Indian citizens with accessible, AI-driven legal support
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Legal Protection</CardTitle>
                <CardDescription className="leading-relaxed">
                  Understand your rights and get guidance on legal processes across India
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Equal Access</CardTitle>
                <CardDescription className="leading-relaxed">
                  Breaking barriers to legal help—available to everyone, everywhere in India
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Legal Education</CardTitle>
                <CardDescription className="leading-relaxed">
                  Learn about Indian law, your rights, and legal procedures in simple terms
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance text-center">
              Four simple steps to get the legal help you need
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                icon: Languages,
                title: "Language Selection",
                description: "Choose from 10 Indian languages plus English",
              },
              {
                step: "2",
                icon: MessageSquare,
                title: "Describe Your Issue",
                description: "Tell us your legal problem in your own words",
              },
              {
                step: "3",
                icon: FileText,
                title: "Get Guidance",
                description: "Receive step-by-step legal advice and documents",
              },
              {
                step: "4",
                icon: UserCheck,
                title: "Take Action",
                description: "Follow the process with our AI assistant",
              },
            ].map((service, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {service.step}
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 mt-2">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Why Choose LexCore AI</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance text-center">
              Modern legal assistance designed for India
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Languages,
                title: "Multilingual Support",
                description: "Get help in Hindi, Telugu, Bengali, Marathi, Tamil, and 6 more languages",
              },
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Legal guidance whenever you need it, day or night",
              },
              {
                icon: Smartphone,
                title: "Simple Interface",
                description: "Easy to use on any device—no legal jargon",
              },
              {
                icon: Lock,
                title: "Privacy Focused",
                description: "Your conversations and documents are secure and confidential",
              },
            ].map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <benefit.icon className="h-8 w-8 text-primary mb-3" />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance text-center">
              Start free, upgrade when you need more
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "Free",
                description: "Perfect for getting started",
                features: [
                  "10 AI conversations per month",
                  "All 10 languages supported",
                  "Basic document templates",
                  "Community access",
                ],
                cta: "Start Free",
                href: "/chat",
              },
              {
                name: "Premium",
                price: "₹499",
                period: "/month",
                description: "For regular legal needs",
                features: [
                  "Unlimited AI conversations",
                  "Priority response time",
                  "Advanced document generation",
                  "Voice input/output",
                  "Document analysis & OCR",
                  "Priority community support",
                ],
                cta: "Get Premium",
                href: "/plans",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For organizations",
                features: [
                  "Everything in Premium",
                  "Custom integrations",
                  "Dedicated support",
                  "Team management",
                  "API access",
                  "Custom training",
                ],
                cta: "Contact Sales",
                href: "/contact",
              },
            ].map((plan, index) => (
              <Card key={index} className={plan.popular ? "border-primary border-2 relative" : ""}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <CardDescription className="leading-relaxed">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                    <Link href={plan.cta === "Start Free" ? "/chat" : plan.href}>{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-center">Ready to Get Started?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-balance text-center">
            Join thousands of Indians getting legal help through AI
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/chat">
              Chat for Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
