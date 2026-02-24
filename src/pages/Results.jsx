import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card'
import { getAnalysisById } from '../lib/storage'
import { ChevronRight, AlertCircle } from 'lucide-react'

export default function Results() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const data = getAnalysisById(id)
      if (data) {
        setAnalysis(data)
      }
    }
    setLoading(false)
  }, [id])

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!analysis) {
    return (
      <div className="max-w-2xl">
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Analysis Not Found</h3>
                <p className="text-slate-600 mb-4">The analysis you're looking for doesn't exist.</p>
                <button
                  onClick={() => navigate('/analyze')}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition"
                >
                  Create New Analysis
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const date = new Date(analysis.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analysis Results</h1>
          <p className="text-slate-600 mt-1">
            {analysis.company} • {analysis.role} • {date}
          </p>
        </div>
        <button
          onClick={() => navigate('/analyze')}
          className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-lg transition"
        >
          New Analysis
        </button>
      </div>

      {/* Readiness Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Readiness Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-6">
            <div className="text-5xl font-bold text-primary">
              {analysis.readinessScore}
            </div>
            <div className="flex-1">
              <div className="w-full bg-slate-200 rounded-full h-4 mb-2">
                <div
                  className="bg-primary h-4 rounded-full transition-all duration-300"
                  style={{ width: `${analysis.readinessScore}%` }}
                />
              </div>
              <p className="text-sm text-slate-600">
                {analysis.readinessScore >= 80
                  ? 'Excellent! You have strong preparation.'
                  : analysis.readinessScore >= 60
                  ? 'Good progress! Keep practicing.'
                  : analysis.readinessScore >= 40
                  ? 'Getting there! Focus on key areas.'
                  : 'Start with fundamentals and core concepts.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extracted Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Extracted Skills</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(analysis.extractedSkills).length === 0 ? (
            <p className="text-slate-600">No specific skills detected. General fresher stack recommended.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="font-semibold text-slate-900 mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interview Rounds */}
      <div className="space-y-4">
        {analysis.checklist.map((roundData, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-lg">{roundData.round}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {roundData.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex gap-3 text-sm text-slate-700">
                    <span className="flex-shrink-0 mt-0.5 text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 7-Day Plan */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">7-Day Preparation Plan</h2>
        {analysis.plan.map((dayPlan, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-lg">{dayPlan.day}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dayPlan.topics.map((topic, topicIdx) => (
                  <li key={topicIdx} className="flex gap-3 text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 flex-shrink-0 text-primary mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interview Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">10 Likely Interview Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {analysis.questions.map((question, idx) => (
              <li key={idx} className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <p className="text-slate-700 pt-0.5">{question}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Back Button */}
      <button
        onClick={() => navigate('/history')}
        className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-2 rounded-lg transition"
      >
        ← Back to History
      </button>
    </div>
  )
}
