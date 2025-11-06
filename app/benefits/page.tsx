import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Languages,
  Clock,
  Smartphone,
  Lock,
  IndianRupee,
  FileText,
  Users,
  Zap,
  BookOpen,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

export default function BenefitsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="mb-4 mx-auto">
              Why Choose Us
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance text-center">
              Benefits of <span className="gradient-text">LexCore AI</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed text-center">
              Discover how our AI-powered legal assistant makes legal help accessible, affordable, and available to
              every Indian citizen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="text-base">
                <Link href="/chat">
                  Try It Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
                <Link href="/plans">View Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Benefits */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Why Thousands Choose LexCore AI</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance text-center">
              Modern legal assistance designed for India's diverse needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Languages,
                title: "True Multilingual Support",
                description:
                  "Get legal help in Hindi, Telugu, Bengali, Marathi, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Urdu, and English. Our AI understands regional legal nuances and cultural context.",
                benefits: [
                  "11 Indian languages supported",
                  "Natural language understanding",
                  "Regional legal context",
                  "Cultural sensitivity",
                ],
                color: "text-blue-600 dark:text-blue-400",
                bgColor: "bg-blue-600/10",
              },
              {
                icon: Clock,
                title: "24/7 Instant Availability",
                description:
                  "Legal emergencies don't wait for office hours. Get immediate assistance any time of day or night, from anywhere in India. No appointments, no waiting rooms.",
                benefits: [
                  "Always available",
                  "Instant responses",
                  "No appointment needed",
                  "Weekend & holiday support",
                ],
                color: "text-purple-600 dark:text-purple-400",
                bgColor: "bg-purple-600/10",
              },
              {
                icon: IndianRupee,
                title: "Affordable for Everyone",
                description:
                  "Start with our free plan or upgrade to premium for just ₹499/month. No hidden fees, no consultation charges. Legal help shouldn't break the bank.",
                benefits: ["Free basic plan", "Premium from ₹499/month", "No hidden charges", "Cancel anytime"],
                color: "text-green-600 dark:text-green-400",
                bgColor: "bg-green-600/10",
              },
              {
                icon: Smartphone,
                title: "Simple & User-Friendly",
                description:
                  "No legal jargon, no complicated forms. Just chat naturally about your problem. Works perfectly on mobile, tablet, or desktop. Designed for everyone, not just lawyers.",
                benefits: [
                  "Easy chat interface",
                  "Voice input support",
                  "Mobile-optimized",
                  "No technical knowledge needed",
                ],
                color: "text-orange-600 dark:text-orange-400",
                bgColor: "bg-orange-600/10",
              },
              {
                icon: Lock,
                title: "Privacy & Security First",
                description:
                  "Your conversations are encrypted and confidential. We never share your data with third parties. Your legal matters stay private, always.",
                benefits: ["End-to-end encryption", "No data sharing", "Secure storage", "GDPR compliant"],
                color: "text-red-600 dark:text-red-400",
                bgColor: "bg-red-600/10",
              },
              {
                icon: FileText,
                title: "Document Generation",
                description:
                  "Get professionally formatted legal documents instantly. From notices to complaints, RTI applications to affidavits—all ready to use and customizable.",
                benefits: [
                  "Instant document creation",
                  "Professional formatting",
                  "Customizable templates",
                  "Download in multiple formats",
                ],
                color: "text-cyan-600 dark:text-cyan-400",
                bgColor: "bg-cyan-600/10",
              },
              {
                icon: BookOpen,
                title: "Comprehensive Legal Database",
                description:
                  "Access to thousands of Indian laws, case precedents, and legal procedures. Powered by Indian Kanoon's extensive database of Supreme Court and High Court judgments.",
                benefits: [
                  "Indian Kanoon integration",
                  "Latest case laws",
                  "All major acts & statutes",
                  "Regular updates",
                ],
                color: "text-indigo-600 dark:text-indigo-400",
                bgColor: "bg-indigo-600/10",
              },
              {
                icon: Zap,
                title: "Fast & Accurate",
                description:
                  "Get detailed answers in seconds, not days. Our AI processes your query instantly and provides accurate, relevant information based on current Indian law.",
                benefits: ["Instant analysis", "Accurate responses", "Up-to-date information", "Context-aware answers"],
                color: "text-yellow-600 dark:text-yellow-400",
                bgColor: "bg-yellow-600/10",
              },
              {
                icon: Users,
                title: "For Every Indian",
                description:
                  "Whether you're a student, professional, business owner, or senior citizen—legal help is for everyone. No discrimination, no barriers, just equal access to justice.",
                benefits: ["All demographics welcome", "No prerequisites", "Equal access", "Inclusive design"],
                color: "text-pink-600 dark:text-pink-400",
                bgColor: "bg-pink-600/10",
              },
            ].map((benefit, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${benefit.bgColor}`} />
                <CardHeader>
                  <div className={`h-12 w-12 rounded-lg ${benefit.bgColor} flex items-center justify-center mb-4`}>
                    <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{benefit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {benefit.benefits.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={`h-4 w-4 ${benefit.color} shrink-0 mt-0.5`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">LexCore AI vs Traditional Legal Help</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance text-center">
              See how we compare to traditional legal services
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold">Feature</th>
                        <th className="text-center p-4 font-semibold">LexCore AI</th>
                        <th className="text-center p-4 font-semibold">Traditional Lawyer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: "Availability", lexcore: "24/7", traditional: "Office hours only" },
                        { feature: "Response Time", lexcore: "Instant", traditional: "Days to weeks" },
                        { feature: "Cost", lexcore: "Free - ₹499/mo", traditional: "₹5,000+ per consultation" },
                        { feature: "Languages", lexcore: "11 languages", traditional: "Limited" },
                        { feature: "Document Generation", lexcore: "Instant", traditional: "Days + extra fees" },
                        { feature: "Legal Database Access", lexcore: "Included", traditional: "Varies" },
                        { feature: "Follow-up Questions", lexcore: "Unlimited", traditional: "Additional charges" },
                        { feature: "Privacy", lexcore: "Encrypted", traditional: "Varies" },
                      ].map((row, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="p-4 font-medium">{row.feature}</td>
                          <td className="p-4 text-center">
                            <Badge variant="default" className="bg-green-600">
                              {row.lexcore}
                            </Badge>
                          </td>
                          <td className="p-4 text-center text-muted-foreground">{row.traditional}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-center">
            Experience the Benefits Yourself
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-balance text-center">
            Join thousands of Indians who are getting legal help the modern way
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/chat">
              Start Free Chat <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
