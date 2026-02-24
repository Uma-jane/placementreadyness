export default function Resources() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Learning Resources</h1>
      
      <div className="space-y-4">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">📚 Data Structures Guide</h3>
          <p className="text-slate-600 mb-4">Comprehensive guide covering all essential data structures.</p>
          <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded transition duration-200 text-sm">
            View Guide
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">🎥 Interview Preparation Videos</h3>
          <p className="text-slate-600 mb-4">Watch expert tips and strategies for cracking interviews.</p>
          <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded transition duration-200 text-sm">
            Watch Videos
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">📖 System Design Fundamentals</h3>
          <p className="text-slate-600 mb-4">Learn system design principles and real-world applications.</p>
          <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded transition duration-200 text-sm">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
