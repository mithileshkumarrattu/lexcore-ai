import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  Home,
  Briefcase,
  Users,
  FileText,
  Shield,
  Gavel,
  Building,
  Heart,
  Car,
  Landmark,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="mb-4 mx-auto">
              Comprehensive Legal Services
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance text-center">
              Legal Help for <span className="gradient-text">Every Situation</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed text-center">
              From family matters to business disputes, from property issues to consumer rights—we cover all areas of
              Indian law.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="text-base">
                <Link href="/chat">
                  Get Help Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Our Legal Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance text-center">
              Expert AI assistance across all major areas of Indian law
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Family Law",
                description:
                  "Marriage, divorce, child custody, adoption, maintenance, domestic violence, and succession",
                examples: [
                  "Divorce procedures",
                  "Child custody rights",
                  "Maintenance claims",
                  "Domestic violence protection",
                ],
                color: "text-pink-600 dark:text-pink-400",
                bgColor: "bg-pink-600/10",
              },
              {
                icon: Home,
                title: "Property & Real Estate",
                description:
                  "Property disputes, land records, registration, tenancy, construction, and real estate transactions",
                examples: [
                  "Property registration",
                  "Tenant-landlord disputes",
                  "Property verification",
                  "Encroachment issues",
                ],
                color: "text-blue-600 dark:text-blue-400",
                bgColor: "bg-blue-600/10",
              },
              {
                icon: Briefcase,
                title: "Business & Corporate",
                description:
                  "Company formation, contracts, partnerships, GST, taxation, intellectual property, and compliance",
                examples: ["Business registration", "Contract drafting", "GST compliance", "Partnership agreements"],
                color: "text-purple-600 dark:text-purple-400",
                bgColor: "bg-purple-600/10",
              },
              {
                icon: Scale,
                title: "Consumer Rights",
                description:
                  "Product defects, service complaints, refunds, warranties, online shopping disputes, and consumer forums",
                examples: ["Consumer complaints", "Refund claims", "Product defect cases", "Service disputes"],
                color: "text-green-600 dark:text-green-400",
                bgColor: "bg-green-600/10",
              },
              {
                icon: Gavel,
                title: "Criminal Law",
                description:
                  "FIR filing, bail applications, criminal complaints, cyber crimes, and understanding criminal procedures",
                examples: ["FIR procedures", "Bail applications", "Criminal complaints", "Cyber crime reporting"],
                color: "text-red-600 dark:text-red-400",
                bgColor: "bg-red-600/10",
              },
              {
                icon: Briefcase,
                title: "Employment & Labor",
                description:
                  "Employment contracts, wrongful termination, workplace harassment, PF/ESI, and labor disputes",
                examples: ["Wrongful termination", "Workplace harassment", "Salary disputes", "PF/ESI claims"],
                color: "text-orange-600 dark:text-orange-400",
                bgColor: "bg-orange-600/10",
              },
              {
                icon: FileText,
                title: "Civil Litigation",
                description:
                  "Civil suits, injunctions, recovery suits, specific performance, and civil court procedures",
                examples: ["Civil suit filing", "Injunction applications", "Money recovery", "Specific performance"],
                color: "text-cyan-600 dark:text-cyan-400",
                bgColor: "bg-cyan-600/10",
              },
              {
                icon: Landmark,
                title: "Constitutional Rights",
                description:
                  "Fundamental rights, RTI applications, public interest litigation, and constitutional remedies",
                examples: ["RTI applications", "Fundamental rights", "PIL guidance", "Constitutional remedies"],
                color: "text-indigo-600 dark:text-indigo-400",
                bgColor: "bg-indigo-600/10",
              },
              {
                icon: Car,
                title: "Motor Vehicle & Traffic",
                description:
                  "Accident claims, insurance disputes, traffic violations, vehicle registration, and motor vehicle act",
                examples: ["Accident compensation", "Insurance claims", "Traffic challans", "Vehicle disputes"],
                color: "text-yellow-600 dark:text-yellow-400",
                bgColor: "bg-yellow-600/10",
              },
              {
                icon: Building,
                title: "Banking & Finance",
                description:
                  "Loan disputes, credit card issues, bank fraud, recovery notices, and financial regulations",
                examples: ["Loan disputes", "Credit card fraud", "Recovery notices", "Banking complaints"],
                color: "text-teal-600 dark:text-teal-400",
                bgColor: "bg-teal-600/10",
              },
              {
                icon: Shield,
                title: "Cyber Law & Privacy",
                description: "Online fraud, data privacy, cyber bullying, digital signatures, and IT Act violations",
                examples: ["Online fraud", "Data privacy", "Cyber bullying", "IT Act violations"],
                color: "text-violet-600 dark:text-violet-400",
                bgColor: "bg-violet-600/10",
              },
              {
                icon: Heart,
                title: "Senior Citizens & Welfare",
                description: "Senior citizen rights, pension issues, maintenance from children, and welfare schemes",
                examples: ["Maintenance rights", "Pension disputes", "Welfare schemes", "Elder abuse"],
                color: "text-rose-600 dark:text-rose-400",
                bgColor: "bg-rose-600/10",
              },
            ].map((service, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`absolute top-0 left-0 w-full h-1 ${service.bgColor}`} />
                <CardHeader>
                  <div className={`h-12 w-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">We can help with:</p>
                    <ul className="space-y-1">
                      {service.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className={`h-3 w-3 ${service.color} shrink-0 mt-1`} />
                          <span>{example}</span>
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

      {/* Document Services */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Document Generation Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance text-center">
              Get professionally formatted legal documents instantly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Legal Notices",
                items: ["Demand notice", "Eviction notice", "Defamation notice", "Cease & desist"],
              },
              {
                title: "Applications",
                items: ["RTI application", "Bail application", "Anticipatory bail", "Petition drafts"],
              },
              {
                title: "Agreements",
                items: ["Rental agreement", "Partnership deed", "Sale agreement", "Service contract"],
              },
              {
                title: "Complaints",
                items: ["Consumer complaint", "Police complaint", "Cyber crime complaint", "Civil complaint"],
              },
            ].map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary shrink-0 mt-0.5" />
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-center">
            Need Help with Any Legal Matter?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-balance text-center">
            Start a conversation with our AI assistant and get expert guidance in minutes
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/chat">
              Get Legal Help Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
