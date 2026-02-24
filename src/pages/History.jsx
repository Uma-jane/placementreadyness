import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card'
import { getHistory, deleteAnalysisById } from '../lib/storage'
import { Trash2, ArrowRight, Plus } from 'lucide-react'

export default function History() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = getHistory()
    setHistory(data)
    setLoading(false)
  }, [])

  const handleDelete = (id) => {
    if (confirm('Delete this analysis? This cannot be undone.')) {
      const success = deleteAnalysisById(id)
      if (success) {
        setHistory(history.filter(entry => entry.id !== id))
      }
    }
  }

  const handleViewResults = (id) => {
    navigate(`/results/${id}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analysis History</h1>
          <p className="text-slate-600 mt-1">
            {loading ? 'Loading...' : `${history.length} saved analyses`}
          </p>
        </div>
        <button
          onClick={() => navigate('/analyze')}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Analysis
        </button>
      </div>

      {/* Empty State */}
      {!loading && history.length === 0 && (
        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No analyses yet</h3>
              <p className="text-slate-600 mb-6">
                Create your first job analysis to get a personalized preparation plan
              </p>
              <button
                onClick={() => navigate('/analyze')}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Analyze a Job Description
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* History List */}
      {!loading && history.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((entry) => {
            const date = new Date(entry.createdAt)
            const dateStr = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
            const timeStr = date.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })

            // Get skill categories count
            const categoriesCount = Object.keys(entry.extractedSkills).length

            return (
              <Card key={entry.id} className="hover:border-primary hover:shadow-md transition cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {entry.company}
                      </h3>
                      <p className="text-sm text-slate-600">{entry.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {entry.readinessScore}
                      </div>
                      <p className="text-xs text-slate-500">/ 100</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-50 p-3 rounded">
                      <p className="text-xs text-slate-600">Skills Found</p>
                      <p className="text-lg font-bold text-slate-900">{categoriesCount}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <p className="text-xs text-slate-600">Saved</p>
                      <p className="text-xs font-medium text-slate-900 mt-1">{dateStr}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleViewResults(entry.id)}
                      className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      View Results
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
