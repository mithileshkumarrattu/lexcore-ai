import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <AlertTriangle className="h-16 w-16 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold">Legal Disclaimer</h1>
          <p className="text-muted-foreground">Important information about using LexCore AI</p>
        </div>

        <Card className="border-yellow-500/50">
          <CardHeader>
            <CardTitle className="text-yellow-600 dark:text-yellow-500">No Attorney-Client Relationship</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p className="font-semibold">
              Use of LexCore AI does not create an attorney-client relationship between you and LexCore AI or any of its
              operators, employees, or affiliates.
            </p>
            <p>
              The information provided through this Service is not legal advice and should not be treated as such. It is
              general information intended to help you understand legal concepts and procedures under Indian law.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Information Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              While we strive to provide accurate and up-to-date information, LexCore AI makes no representations or
              warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or
              availability of the information provided.
            </p>
            <p>
              Laws and regulations change frequently, and the information provided may not reflect the most current
              legal developments. Always verify information with current legal sources or consult with a qualified
              attorney.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              LexCore AI uses artificial intelligence to generate responses and documents. While our AI is trained on
              legal information, it may occasionally produce inaccurate, incomplete, or outdated information.
            </p>
            <p>
              You should always review AI-generated content carefully and verify it with authoritative legal sources or
              a qualified attorney before relying on it for any legal matter.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consult a Qualified Attorney</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p className="font-semibold">
              For specific legal advice tailored to your situation, you should always consult with a qualified attorney
              licensed to practice law in your jurisdiction.
            </p>
            <p>
              LexCore AI is designed to provide general legal information and assistance, but it cannot replace the
              personalized advice and representation that a qualified attorney can provide.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>No Guarantee of Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              LexCore AI makes no guarantees about the outcome of any legal matter. The information and documents
              provided are for informational purposes only and do not guarantee any particular result in legal
              proceedings.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              In no event shall LexCore AI, its operators, employees, or affiliates be liable for any direct, indirect,
              incidental, special, consequential, or punitive damages arising out of or relating to your use of the
              Service, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Reliance on information provided by the Service</li>
              <li>Errors or omissions in the information provided</li>
              <li>Loss of data or documents</li>
              <li>Adverse legal outcomes</li>
              <li>Any other damages or losses</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jurisdiction-Specific Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              LexCore AI provides information primarily related to Indian law. Laws vary by state and jurisdiction
              within India. The information provided may not be applicable to your specific jurisdiction or situation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Responsibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              By using LexCore AI, you acknowledge that you understand and accept this disclaimer. You agree to use the
              Service at your own risk and to seek professional legal advice when necessary.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              If you have any questions about this disclaimer, please contact us at:
              <br />
              Email: legal@lexcore.ai
              <br />
              Phone: +91 1800-LEXCORE
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
