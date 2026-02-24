import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'
import { ChevronRight, Calendar } from 'lucide-react'

// Circular Progress Component
function CircularProgress({ value, max = 100, size = 200 }) {
  const percentage = (value / max) * 100
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="8"
      />
      {/* Animated circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#6366f1"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="transition-all duration-500"
      />
    </svg>
  )
}

// Weekly Goals Day Circle
function DayCircle({ day, hasActivity }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition ${
          hasActivity
            ? 'bg-primary text-white'
            : 'bg-slate-200 text-slate-600'
        }`}
      >
        {day.slice(0, 1)}
      </div>
      <span className="text-xs text-slate-500">{day}</span>
    </div>
  )
}

export default function Dashboard() {
  const skillData = [
    { skill: 'DSA', value: 75 },
    { skill: 'System Design', value: 60 },
    { skill: 'Communication', value: 80 },
    { skill: 'Resume', value: 85 },
    { skill: 'Aptitude', value: 70 },
  ]

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const activityDays = ['Mon', 'Tue', 'Wed', 'Fri', 'Sun']

  const assessments = [
    {
      id: 1,
      title: 'DSA Mock Test',
      time: 'Tomorrow, 10:00 AM',
      type: 'DSA',
    },
    {
      id: 2,
      title: 'System Design Review',
      time: 'Wed, 2:00 PM',
      type: 'Design',
    },
    {
      id: 3,
      title: 'HR Interview Prep',
      time: 'Friday, 11:00 AM',
      type: 'HR',
    },
  ]

  const readinessScore = 72
  const maxScore = 100
  const weeklyProblems = 12
  const weeklyGoal = 20

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

      {/* Top Row: Readiness + Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Readiness */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <CircularProgress value={readinessScore} max={maxScore} size={200} />
                <div className="absolute text-center">
                  <div className="text-4xl font-bold text-primary">
                    {readinessScore}
                  </div>
                  <div className="text-sm text-primary">/ {maxScore}</div>
                  <div className="text-xs text-slate-500 mt-2">Readiness Score</div>
                </div>
              </div>
              <p className="mt-6 text-center text-slate-600 text-sm">
                You're doing great! Keep up with your practice schedule.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Skill Breakdown Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row: Continue Practice + Weekly Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Practice */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Continue Practice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900">
                Dynamic Programming
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Last accessed: 2 hours ago
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Progress</span>
                <span className="font-semibold text-slate-900">3/10</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: '30%' }}
                />
              </div>
            </div>
            <button className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2">
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Problems Solved</span>
                <span className="font-semibold text-slate-900">
                  {weeklyProblems}/{weeklyGoal} this week
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(weeklyProblems / weeklyGoal) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              {days.map((day) => (
                <DayCircle
                  key={day}
                  day={day}
                  hasActivity={activityDays.includes(day)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Assessments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Upcoming Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className="flex items-start justify-between border border-slate-200 rounded-lg p-4 hover:border-primary transition"
              >
                <div className="flex gap-4 items-start flex-1">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {assessment.title}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {assessment.time}
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition">
                  View
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
