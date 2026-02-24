import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card'
import { getAnalysisById, updateAnalysis } from '../lib/storage'
import { ChevronRight, AlertCircle, Copy, Download, CheckCircle2, AlertCircle as AlertIcon } from 'lucide-react'

export default function Results() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [skillConfidence, setSkillConfidence] = useState({})
  const [liveScore, setLiveScore] = useState(0)
  const [copied, setCopied] = useState('')
  const [expandedRound, setExpandedRound] = useState(null)

  useEffect(() => {
    if (id) {
      const data = getAnalysisById(id)
      if (data) {
        setAnalysis(data)
        // Load existing skill confidence or initialize
        setSkillConfidence(data.skillConfidenceMap || {})
        // Calculate initial live score
        calculateLiveScore(data, data.skillConfidenceMap || {})
      }
    }
    setLoading(false)
  }, [id])

  const calculateLiveScore = (analysisData, confidenceMap) => {
    let score = analysisData.readinessScore || 0
    
    // Get all skills from the analysis
    const allSkills = Object.values(analysisData.extractedSkills || {}).flat()
    
    // Adjust score based on confidence
    allSkills.forEach(skill => {
      const confidence = confidenceMap[skill]
      if (confidence === 'know') {
        score += 2
      } else if (confidence === 'practice') {
        score -= 2
      }
    })
    
    // Bound to 0-100
    score = Math.max(0, Math.min(100, score))
    setLiveScore(score)
  }

  const toggleSkillConfidence = (skill, currentConfidence) => {
    let newConfidence
    if (currentConfidence === 'know') {
      newConfidence = 'practice'
    } else if (currentConfidence === 'practice') {
      newConfidence = null // Reset to default
    } else {
      newConfidence = 'know'
    }

    const updatedConfidence = { ...skillConfidence }
    if (newConfidence === null) {
      delete updatedConfidence[skill]
    } else {
      updatedConfidence[skill] = newConfidence
    }

    setSkillConfidence(updatedConfidence)
    calculateLiveScore(analysis, updatedConfidence)

    // Save to localStorage
    updateAnalysis(id, { skillConfidenceMap: updatedConfidence })
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const download7DayPlan = () => {
    const planText = analysis.plan
      .map(day => `${day.day}\n${day.topics.map(t => `  • ${t}`).join('\n')}`)
      .join('\n\n')
    const dataUri = `data:text/plain;charset=utf-8,${encodeURIComponent(planText)}`
    const link = document.createElement('a')
    link.href = dataUri
    link.download = `7-day-plan-${id}.txt`
    link.click()
  }

  const downloadChecklist = () => {
    const checklistText = analysis.checklist
      .map(round => `${round.round}\n${round.items.map(item => `  ✓ ${item}`).join('\n')}`)
      .join('\n\n')
    const dataUri = `data:text/plain;charset=utf-8,${encodeURIComponent(checklistText)}`
    const link = document.createElement('a')
    link.href = dataUri
    link.download = `interview-checklist-${id}.txt`
    link.click()
  }

  const downloadQuestions = () => {
    const questionsText = analysis.questions
      .map((q, idx) => `${idx + 1}. ${q}`)
      .join('\n\n')
    const dataUri = `data:text/plain;charset=utf-8,${encodeURIComponent(questionsText)}`
    const link = document.createElement('a')
    link.href = dataUri
    link.download = `interview-questions-${id}.txt`
    link.click()
  }

  const downloadFullAnalysis = () => {
    const fullText = `
PLACEMENT READINESS ANALYSIS
Company: ${analysis.company}
Role: ${analysis.role}
Generated: ${new Date(analysis.createdAt).toLocaleString()}
Current Readiness Score: ${liveScore}/100

=== EXTRACTED SKILLS ===
${Object.entries(analysis.extractedSkills)
  .map(([category, skills]) => `${category}: ${skills.join(', ')}`)
  .join('\n')}

=== 7-DAY PREPARATION PLAN ===
${analysis.plan
  .map(day => `${day.day}\n${day.topics.map(t => `  • ${t}`).join('\n')}`)
  .join('\n\n')}

=== INTERVIEW ROUND CHECKLIST ===
${analysis.checklist
  .map(round => `${round.round}\n${round.items.map(item => `  ✓ ${item}`).join('\n')}`)
  .join('\n\n')}

=== 10 LIKELY INTERVIEW QUESTIONS ===
${analysis.questions.map((q, idx) => `${idx + 1}. ${q}`).join('\n\n')}
    `.trim()

    const dataUri = `data:text/plain;charset=utf-8,${encodeURIComponent(fullText)}`
    const link = document.createElement('a')
    link.href = dataUri
    link.download = `analysis-${analysis.company}-${id}.txt`
    link.click()
  }

  const getWeakSkills = () => {
    const weak = []
    Object.entries(skillConfidence).forEach(([skill, confidence]) => {
      if (confidence === 'practice') {
        weak.push(skill)
      }
    })
    return weak.slice(0, 3)
  }

  const weakSkills = getWeakSkills()

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

      {/* Live Readiness Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Readiness Score (Live)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-6">
            <div className="text-5xl font-bold text-primary">
              {liveScore}
            </div>
            <div className="flex-1">
              <div className="w-full bg-slate-200 rounded-full h-4 mb-2">
                <div
                  className="bg-primary h-4 rounded-full transition-all duration-300"
                  style={{ width: `${liveScore}%` }}
                />
              </div>
              <p className="text-sm text-slate-600">
                {liveScore >= 80
                  ? 'Excellent! You have strong preparation.'
                  : liveScore >= 60
                  ? 'Good progress! Keep practicing.'
                  : liveScore >= 40
                  ? 'Getting there! Focus on key areas.'
                  : 'Start with fundamentals and core concepts.'}
              </p>
              {liveScore !== analysis.readinessScore && (
                <p className="text-xs text-slate-500 mt-2">
                  Base: {analysis.readinessScore} • Adjusted by skill confidence
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extracted Skills - Interactive */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Key Skills Extracted</CardTitle>
          <p className="text-sm text-slate-600 mt-1">
            Mark skills you know to adjust your readiness score
          </p>
        </CardHeader>
        <CardContent>
          {Object.keys(analysis.extractedSkills).length === 0 ? (
            <p className="text-slate-600">No specific skills detected. General fresher stack recommended.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="font-semibold text-slate-900 mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => {
                      const confidence = skillConfidence[skill]
                      const isKnow = confidence === 'know'
                      const isPractice = confidence === 'practice'

                      return (
                        <button
                          key={skill}
                          onClick={() => toggleSkillConfidence(skill, confidence)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            isKnow
                              ? 'bg-green-100 text-green-800 border-2 border-green-400'
                              : isPractice
                              ? 'bg-amber-100 text-amber-800 border-2 border-amber-400'
                              : 'bg-primary/10 text-primary border-2 border-primary/20 hover:border-primary'
                          }`}
                          title={`Click to cycle: ${confidence ? (isKnow ? 'Reset' : 'Know') : 'Know'} → Practice → Reset`}
                        >
                          {isKnow && '✓ '}
                          {isPractice && '→ '}
                          {skill}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              <div className="mt-6 text-sm text-slate-600 border-t pt-4">
                <p className="font-medium text-slate-900 mb-2">Legend:</p>
                <div className="space-y-1 text-xs">
                  <div className="flex gap-2 items-center">
                    <div className="px-2 py-1 rounded bg-primary/10 text-primary">Default</div>
                    <span>No confidence set (base score)</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="px-2 py-1 rounded bg-green-100 text-green-800">✓ Know</div>
                    <span>+2 to score</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="px-2 py-1 rounded bg-amber-100 text-amber-800">→ Practice</div>
                    <span>-2 from score</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => {
                const planText = analysis.plan
                  .map(day => `${day.day}\n${day.topics.map(t => `  • ${t}`).join('\n')}`)
                  .join('\n\n')
                copyToClipboard(planText, 'plan')
              }}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                copied === 'plan'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
              }`}
            >
              <Copy className="w-4 h-4" />
              {copied === 'plan' ? 'Copied!' : 'Copy Plan'}
            </button>

            <button
              onClick={() => {
                const checklistText = analysis.checklist
                  .map(round => `${round.round}\n${round.items.map(item => `  ✓ ${item}`).join('\n')}`)
                  .join('\n\n')
                copyToClipboard(checklistText, 'checklist')
              }}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                copied === 'checklist'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
              }`}
            >
              <Copy className="w-4 h-4" />
              {copied === 'checklist' ? 'Copied!' : 'Copy Checklist'}
            </button>

            <button
              onClick={() => {
                const questionsText = analysis.questions
                  .map((q, idx) => `${idx + 1}. ${q}`)
                  .join('\n\n')
                copyToClipboard(questionsText, 'questions')
              }}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                copied === 'questions'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
              }`}
            >
              <Copy className="w-4 h-4" />
              {copied === 'questions' ? 'Copied!' : 'Copy Questions'}
            </button>

            <button
              onClick={downloadFullAnalysis}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download All
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Interview Rounds */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">4-Round Interview Checklist</h2>
        {analysis.checklist.map((roundData, idx) => (
          <Card
            key={idx}
            className={`cursor-pointer transition ${
              expandedRound === idx ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setExpandedRound(expandedRound === idx ? null : idx)}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                {roundData.round}
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${
                    expandedRound === idx ? 'rotate-90' : ''
                  }`}
                />
              </CardTitle>
            </CardHeader>
            {expandedRound === idx && (
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
            )}
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

      {/* Action Next Section */}
      {weakSkills.length > 0 && (
        <Card className="border-2 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-amber-900">
              <AlertIcon className="w-5 h-5" />
              Action Next: Focus Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-900">
                Top {weakSkills.length} weak skill{weakSkills.length !== 1 ? 's' : ''} to focus on:
              </p>
              <div className="space-y-2">
                {weakSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-amber-900 bg-white p-2 rounded">
                    <span className="font-bold text-amber-600">{idx + 1}.</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-amber-200">
              <p className="text-sm font-semibold text-slate-900 mb-2">Suggested Next Action:</p>
              <p className="text-sm text-slate-700 mb-3">
                Start with <strong>Day 1-2: Foundations & Core CS</strong> from your 7-day plan. Focus on topics related to your weak skills.
              </p>
              <button
                onClick={() => {
                  const element = document.querySelector('h2')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="text-sm bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded font-medium transition"
              >
                Jump to Plan
              </button>
            </div>
          </CardContent>
        </Card>
      )}

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
