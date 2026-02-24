// localStorage utilities for history management
const HISTORY_KEY = 'placement_readiness_history'

export function saveAnalysis(analysis, company, role, jdText) {
  const entry = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    company: company || 'Untitled',
    role: role || 'General',
    jdText,
    extractedSkills: analysis.extractedSkills,
    readinessScore: analysis.readinessScore,
    checklist: analysis.checklist,
    plan: analysis.plan,
    questions: analysis.questions
  }

  try {
    const history = getHistory()
    history.unshift(entry) // Add to beginning (most recent first)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    return entry
  } catch (error) {
    console.error('Error saving analysis to localStorage:', error)
    return null
  }
}

export function getHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading history from localStorage:', error)
    return []
  }
}

export function getAnalysisById(id) {
  try {
    const history = getHistory()
    return history.find(entry => entry.id === id) || null
  } catch (error) {
    console.error('Error fetching analysis by ID:', error)
    return null
  }
}

export function deleteAnalysisById(id) {
  try {
    let history = getHistory()
    history = history.filter(entry => entry.id !== id)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    return true
  } catch (error) {
    console.error('Error deleting analysis:', error)
    return false
  }
}

export function updateAnalysis(id, updates) {
  try {
    let history = getHistory()
    const entryIndex = history.findIndex(entry => entry.id === id)
    
    if (entryIndex === -1) return null
    
    history[entryIndex] = {
      ...history[entryIndex],
      ...updates
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    return history[entryIndex]
  } catch (error) {
    console.error('Error updating analysis:', error)
    return null
  }
}

export function clearAllHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY)
    return true
  } catch (error) {
    console.error('Error clearing history:', error)
    return false
  }
}
