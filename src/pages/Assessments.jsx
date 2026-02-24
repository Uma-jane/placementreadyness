export default function Assessments() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Assessments</h1>
      
      <div className="space-y-4">
        {[
          { id: 1, title: 'JavaScript Fundamentals', difficulty: 'Beginner', score: 85 },
          { id: 2, title: 'React Basics', difficulty: 'Intermediate', score: 90 },
          { id: 3, title: 'Advanced Algorithms', difficulty: 'Advanced', score: 72 },
        ].map((assessment) => (
          <div key={assessment.id} className="bg-white border border-slate-200 rounded-lg p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{assessment.title}</h3>
              <p className="text-slate-600 text-sm">Difficulty: {assessment.difficulty}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{assessment.score}%</p>
              <button className="mt-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded transition duration-200 text-sm">
                Retake
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <p className="text-green-800">Complete assessments to track your progress and identify areas for improvement.</p>
      </div>
    </div>
  )
}
