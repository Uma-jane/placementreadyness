export default function Practice() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Practice Problems</h1>
      
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Available Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Arrays', 'Strings', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting'].map((category) => (
            <button
              key={category}
              className="bg-primary hover:bg-primary-dark text-white p-4 rounded-lg font-semibold transition duration-200"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-800">Select a category to start practicing coding problems.</p>
      </div>
    </div>
  )
}
