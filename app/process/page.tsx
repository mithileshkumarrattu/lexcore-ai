import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, MessageSquare, Search, CheckCircle2, ArrowRight, Clock, Users, Shield, Sparkles } from "lucide-react"

export default function ProcessPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="mb-4 mx-auto">
              Simple & Transparent
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance text-center">
              How <span className="gradient-text">LexCore AI</span> Works
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed text-center">
              Get legal assistance in minutes with our AI-powered platform. Simple, fast, and available in your
              language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="text-base">
                <Link href="/chat">
                  Start Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Your Journey to Legal Help</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance text-center">
              Four simple steps from question to solution
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                icon: MessageSquare,
                title: "Ask Your Question",
                description:
                  "Start a conversation with our AI assistant. Describe your legal issue in simple terms, in any of our 11 supported languages. No legal jargon needed—just explain your situation naturally.",
                features: [
                  "Type or use voice input",
                  "Choose from 11 Indian languages",
                  "Get instant acknowledgment",
                  "Privacy-protected conversations",
                ],
                color: "text-blue-600 dark:text-blue-400",
                bgColor: "bg-blue-600/10",
              },
              {
                step: "02",
                icon: Search,
                title: "AI Analysis & Research",
                description:
                  "Our AI analyzes your question and searches through thousands of Indian legal documents, case laws, and statutes from Indian Kanoon. It understands context and finds the most relevant legal information for your specific situation.",
                features: [
                  "Real-time legal database search",
                  "Context-aware analysis",
                  "Citation of relevant laws",
                  "Case law references",
                ],
                color: "text-purple-600 dark:text-purple-400",
                bgColor: "bg-purple-600/10",
              },
              {
                step: "03",
                icon: FileText,
                title: "Get Detailed Guidance",
                description:
                  "Receive a comprehensive response with step-by-step instructions, required documents, fees, timelines, and your legal rights. All information is presented in clear, simple language in your chosen language.",
                features: ["Step-by-step action plan", "Document templates", "Fee breakdowns", "Timeline estimates"],
                color: "text-green-600 dark:text-green-400",
                bgColor: "bg-green-600/10",
              },
              {
                step: "04",
                icon: CheckCircle2,
                title: "Take Action",
                description:
                  "Follow the guidance provided, download any generated documents, and take the necessary steps. You can always come back to ask follow-up questions or get clarification on any step of the process.",
                features: [
                  "Download legal documents",
                  "Save conversation history",
                  "Ask follow-up questions",
                  "Track your progress",
                ],
                color: "text-orange-600 dark:text-orange-400",
                bgColor: "bg-orange-600/10",
              },
            ].map((step, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-2 h-full ${step.bgColor}`} />
                <CardHeader className="pl-8">
                  <div className="flex items-start gap-6">
                    <div className={`h-16 w-16 rounded-xl ${step.bgColor} flex items-center justify-center shrink-0`}>
                      <step.icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className={step.color}>
                          Step {step.step}
                        </Badge>
                        <CardTitle className="text-2xl">{step.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base leading-relaxed">{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-8">
                  <div className="ml-[88px]">
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className={`h-4 w-4 ${step.color} shrink-0 mt-0.5`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">What Makes Us Different</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance text-center">
              Advanced technology meets legal expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered",
                description: "Advanced AI trained on Indian legal system",
              },
              {
                icon: Clock,
                title: "Instant Responses",
                description: "Get answers in seconds, not days",
              },
              {
                icon: Users,
                title: "Multilingual",
                description: "Support for 11 Indian languages",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your data is encrypted and protected",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
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
            Experience the future of legal assistance today
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/chat">
              Start Your First Chat <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
