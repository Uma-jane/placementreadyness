import { useNavigate } from 'react-router-dom'
import { Code, Video, BarChart3 } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Ace Your Placement
          </h1>
          <p className="text-xl text-slate-700 mb-8">
            Practice, assess, and prepare for your dream job
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            Why Choose Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Practice Problems Card */}
            <div className="rounded-lg border border-slate-200 p-8 hover:shadow-lg transition duration-200">
              <div className="flex justify-center mb-4">
                <Code className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">
                Practice Problems
              </h3>
              <p className="text-slate-600 text-center">
                Solve hundreds of coding problems and improve your skills.
              </p>
            </div>

            {/* Mock Interviews Card */}
            <div className="rounded-lg border border-slate-200 p-8 hover:shadow-lg transition duration-200">
              <div className="flex justify-center mb-4">
                <Video className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">
                Mock Interviews
              </h3>
              <p className="text-slate-600 text-center">
                Practice with AI-powered mock interviews tailored to your level.
              </p>
            </div>

            {/* Track Progress Card */}
            <div className="rounded-lg border border-slate-200 p-8 hover:shadow-lg transition duration-200">
              <div className="flex justify-center mb-4">
                <BarChart3 className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">
                Track Progress
              </h3>
              <p className="text-slate-600 text-center">
                Monitor your improvement with detailed analytics and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Placement Readiness Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
