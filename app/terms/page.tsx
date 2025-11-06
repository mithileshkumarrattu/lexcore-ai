import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              By accessing and using LexCore AI ("the Service"), you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              LexCore AI provides AI-powered legal information and assistance related to Indian law. The Service
              includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Legal information and guidance</li>
              <li>Document templates and generation</li>
              <li>Legal case references from Indian Kanoon</li>
              <li>Community forum for legal discussions</li>
              <li>Multilingual support for Indian languages</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. User Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>You agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate information when using the Service</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Not misuse or abuse the Service</li>
              <li>Not share your account credentials with others</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Disclaimer of Legal Advice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p className="font-semibold">IMPORTANT: LexCore AI does not provide legal advice.</p>
            <p>
              The information provided by LexCore AI is for informational purposes only and should not be construed as
              legal advice. The Service is not a substitute for professional legal counsel. For specific legal advice
              tailored to your situation, please consult with a qualified lawyer.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              LexCore AI and its operators shall not be liable for any direct, indirect, incidental, special, or
              consequential damages resulting from the use or inability to use the Service, including but not limited to
              damages for loss of profits, data, or other intangible losses.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Modifications to Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              We reserve the right to modify or discontinue the Service at any time without notice. We shall not be
              liable to you or any third party for any modification, suspension, or discontinuance of the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of India, without
              regard to its conflict of law provisions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              Email: support@lexcore.ai
              <br />
              Phone: +91 1800-LEXCORE
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
