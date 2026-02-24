import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card'
import { generateAnalysis } from '../lib/skillExtraction'
import { saveAnalysis } from '../lib/storage'
import { Upload, Zap } from 'lucide-react'

const SAMPLE_JD = `We are hiring for a Senior Full Stack Engineer position!

Required Skills:
- 5+ years of experience in full-stack development
- Proficiency in JavaScript, TypeScript, and Python
- Strong knowledge of React, Next.js, and Node.js
- Experience with REST APIs and GraphQL
- PostgreSQL and MongoDB database design
- AWS and Docker expertise
- CI/CD pipeline implementation

Nice to Have:
- System Design and Architecture
- Machine Learning basics
- Kubernetes experience
- Data Structures and Algorithms mastery
- Git and Linux proficiency

Responsibilities:
- Design and implement scalable backend services
- Develop responsive React frontends
- Optimize database queries and performance
- Mentor junior developers on DSA and OOP concepts
- Lead technical interviews and code reviews

About the role:
This is a key position in our engineering team. You will work on critical systems handling millions of requests daily. Experience with networking concepts, OS fundamentals, and system design is crucial.`

export default function Analyze() {
  const navigate = useNavigate()
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [jdText, setJdText] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = () => {
    if (!jdText.trim()) {
      setError('Please paste a job description')
      return
    }

    setError('')
    setAnalyzing(true)

    // Simulate analysis with timeout
    setTimeout(() => {
      try {
        const analysis = generateAnalysis(jdText, company, role)
        const saved = saveAnalysis(analysis, company, role, jdText)

        if (saved) {
          // Navigate to results with the saved entry ID
          navigate(`/results/${saved.id}`)
        } else {
          setError('Failed to save analysis. Please try again.')
        }
      } catch (err) {
        setError('Error analyzing job description. Please try again.')
        console.error(err)
      } finally {
        setAnalyzing(false)
      }
    }, 500)
  }

  const handleSampleJD = () => {
    setCompany('Tech Corp')
    setRole('Senior Full Stack Engineer')
    setJdText(SAMPLE_JD)
    setError('')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Job Analysis</h1>
        <p className="text-slate-600">
          Paste your job description to get a personalized preparation plan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Google, Amazon, Meta"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Role (Optional)
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Senior Backend Engineer"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={jdText}
                  onChange={(e) => {
                    setJdText(e.target.value)
                    setError('')
                  }}
                  placeholder="Paste the complete job description here. Include skills, requirements, and responsibilities."
                  rows={12}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary font-mono text-sm"
                />
                <p className="text-xs text-slate-500 mt-2">
                  {jdText.length} characters
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={analyzing || !jdText.trim()}
                className="w-full bg-primary hover:bg-primary-dark disabled:bg-slate-300 text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                {analyzing ? 'Analyzing...' : 'Analyze Job Description'}
              </button>

              <button
                onClick={handleSampleJD}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-2 rounded-lg font-medium transition duration-200 text-sm"
              >
                Load Sample JD
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="w-5 h-5" />
                How it works
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3 text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">1. Paste JD</h4>
                <p>Paste any job description you're targeting</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-1">2. AI Analysis</h4>
                <p>Smart skill extraction and gap analysis</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-1">3. Get Plan</h4>
                <p>Personalized 7-day prep + interview questions</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
                <p className="text-blue-900 text-xs font-medium">
                  💡 Tip: More detailed JDs give better analysis
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What You Get</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-slate-600">
              <p>✓ Key skills extracted</p>
              <p>✓ Readiness score</p>
              <p>✓ 4-round interview prep</p>
              <p>✓ 7-day study plan</p>
              <p>✓ 10 likely interview questions</p>
              <p>✓ Saved to history</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
