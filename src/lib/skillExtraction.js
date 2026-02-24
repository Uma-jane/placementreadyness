// Skill keywords database organized by category
const SKILL_KEYWORDS = {
  'Core CS': {
    keywords: ['dsa', 'data structures', 'algorithms', 'oop', 'object-oriented', 'dbms', 'database management', 'os', 'operating system', 'networks', 'networking', 'tcp/ip', 'http', 'system design'],
    important: true
  },
  'Languages': {
    keywords: ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'go', 'golang', 'rust', 'kotlin'],
    important: true
  },
  'Web': {
    keywords: ['react', 'next.js', 'nextjs', 'node.js', 'nodejs', 'express', 'rest', 'graphql', 'webpack', 'vue', 'angular', 'html', 'css'],
    important: false
  },
  'Data': {
    keywords: ['sql', 'mongodb', 'nosql', 'postgresql', 'mysql', 'redis', 'elasticsearch', 'firebase', 'cassandra'],
    important: false
  },
  'Cloud/DevOps': {
    keywords: ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'gitlab', 'github', 'linux', 'terraform', 'devops'],
    important: false
  },
  'Testing': {
    keywords: ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'jest', 'mocha', 'testing', 'qa', 'automation'],
    important: false
  }
}

export function extractSkills(jdText) {
  if (!jdText || typeof jdText !== 'string') {
    return {
      detected: {},
      categories: []
    }
  }

  const textLower = jdText.toLowerCase()
  const detected = {}
  const categories = []

  for (const [category, data] of Object.entries(SKILL_KEYWORDS)) {
    const foundSkills = []

    for (const keyword of data.keywords) {
      // Use word boundaries to avoid partial matches
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      if (regex.test(textLower)) {
        foundSkills.push(keyword.charAt(0).toUpperCase() + keyword.slice(1))
      }
    }

    if (foundSkills.length > 0) {
      detected[category] = [...new Set(foundSkills)] // Remove duplicates
      categories.push(category)
    }
  }

  return {
    detected,
    categories,
    totalCategories: categories.length
  }
}

export function generateReadinessScore(jdText, company, role, skills) {
  let score = 35 // Base score

  // +5 per category detected (max 30)
  const categoryBonus = Math.min(skills.totalCategories * 5, 30)
  score += categoryBonus

  // +10 if company provided
  if (company && company.trim().length > 0) {
    score += 10
  }

  // +10 if role provided
  if (role && role.trim().length > 0) {
    score += 10
  }

  // +10 if JD is substantial (> 800 chars after trimming)
  if (jdText && jdText.trim().length > 800) {
    score += 10
  }

  return Math.min(score, 100)
}

export function generateRoundChecklist(skills, role = '') {
  const ro = role.toLowerCase()
  const isBackend = ro.includes('backend') || ro.includes('server')
  const isFrontend = ro.includes('frontend') || ro.includes('ui')
  const isFullStack = ro.includes('fullstack') || ro.includes('full-stack') || (!isBackend && !isFrontend)
  const isDataRole = ro.includes('data') || ro.includes('analytics')

  return [
    {
      round: 'Round 1: Aptitude & Basics',
      items: [
        '✓ Quantitative aptitude (time, distance, percentages)',
        '✓ Logical reasoning (puzzles, patterns)',
        '✓ Data interpretation (tables, graphs)',
        '✓ English comprehension (grammar, vocabulary)',
        '✓ Decision-making scenarios',
        '✓ Basic problem-solving'
      ]
    },
    {
      round: 'Round 2: Core CS & DSA',
      items: [
        '✓ Data structures (arrays, linked lists, trees, graphs)',
        '✓ Sorting & searching algorithms',
        'OOP' in (skills.detected || {}) ? '✓ OOP concepts (inheritance, polymorphism, abstraction)' : '- OOP basics',
        'DBMS' in (skills.detected || {}) ? '✓ Database fundamentals & normalization' : '- Database concepts',
        '✓ Time & space complexity analysis',
        '✓ Problem-solving with optimal solutions',
        '✓ System design fundamentals'
      ]
    },
    {
      round: 'Round 3: Technical Interview',
      items: [
        isFrontend || isFullStack ? '✓ Frontend frameworks (React/Vue/Angular)' : '- Frontend basics',
        isBackend || isFullStack ? '✓ Backend development & APIs' : '- Backend concepts',
        isDataRole ? '✓ SQL queries & optimization' : (skills.detected['Data'] ? '✓ SQL proficiency' : '- Database queries'),
        skills.detected['Cloud/DevOps'] ? '✓ Cloud deployment & DevOps' : '- Cloud concepts',
        '✓ Project walkthrough & decisions',
        '✓ Code quality & best practices',
        '✓ Debugging & optimization'
      ]
    },
    {
      round: 'Round 4: HR & Managerial',
      items: [
        '✓ Behavioral questions (STAR method)',
        '✓ Team collaboration & communication',
        '✓ Conflict resolution scenarios',
        '✓ Achievements & impact stories',
        '✓ Company & role knowledge',
        '✓ Salary & expectations discussion',
        '✓ Questions for the interviewer'
      ]
    }
  ]
}

export function generate7DayPlan(skills, role = '') {
  const hasWeb = skills.detected['Web']
  const hasData = skills.detected['Data']
  const hasCore = skills.detected['Core CS']
  const hasLang = skills.detected['Languages']
  const hasCloud = skills.detected['Cloud/DevOps']

  return [
    {
      day: 'Day 1-2: Foundations & Core CS',
      topics: [
        'Review: Big O notation, Time/Space complexity',
        'Core topics: Arrays, Strings, Linked Lists',
        hasCore ? 'DBMS basics (keys, relationships, normalization)' : 'Database fundamentals',
        'OS fundamentals: Processes, Memory, Threads',
        'Quick revision of fundamentals'
      ]
    },
    {
      day: 'Day 3-4: DSA Deep Dive & Coding',
      topics: [
        'Trees & Graphs (BFS, DFS, traversals)',
        'Sorting, Searching, & Hashing',
        'Common problem patterns (Two pointers, Sliding window)',
        hasLang ? `Practice with your strongest language (${hasLang[0]})` : 'Practice coding problems',
        '20+ medium-level coding problems'
      ]
    },
    {
      day: 'Day 5: Tech Stack & Projects',
      topics: [
        hasWeb ? 'Frontend: Component design & state management' : 'Web development basics',
        hasData ? 'Database design & optimization' : 'SQL query optimization',
        'Project review: How you built & decisions made',
        hasCloud ? 'Deployment & DevOps overview' : 'Deployment concepts',
        'Resume alignment with role'
      ]
    },
    {
      day: 'Day 6: Mock Interviews & Questions',
      topics: [
        'Solve 10 behavioral interview questions',
        'Technical mock with peer or platform',
        'Optimize previously solved problems',
        'Test yourself on random DSA problems',
        'Prepare for common follow-up questions'
      ]
    },
    {
      day: 'Day 7: Revision & Weak Areas',
      topics: [
        'Revise hardest topics from Days 1-4',
        'Quick DSA algorithm review',
        'Mock final round (full time)',
        'System design discussion',
        'Final confidence check'
      ]
    }
  ]
}

export function generateInterviewQuestions(skills, role = '') {
  const questions = []

  // Core CS questions
  if (skills.detected['Core CS']) {
    questions.push(
      'Explain the difference between stack and heap memory. When would you use each?',
      'How would you approach designing a database schema for a complex system?',
      'Describe a time you optimized code. What was the bottleneck?'
    )
  }

  // DSA focused
  if (skills.detected['Core CS']) {
    questions.push(
      'How would you find the Kth largest element in an unsorted array efficiently?',
      'Explain when you would use a hash table vs. a binary search tree.'
    )
  }

  // Languages
  if (skills.detected['Languages']) {
    const lang = skills.detected['Languages'][0]
    if (lang.toLowerCase() === 'java') {
      questions.push('Explain the difference between checked and unchecked exceptions in Java.')
    } else if (lang.toLowerCase() === 'python') {
      questions.push('What are decorators in Python and how do you use them?')
    } else if (lang.toLowerCase() === 'javascript' || lang.toLowerCase() === 'typescript') {
      questions.push('Explain closures in JavaScript and provide a practical example.')
    }
  }

  // Web Development
  if (skills.detected['Web']) {
    questions.push(
      'How does React\'s virtual DOM improve performance?',
      'Explain the difference between REST and GraphQL.'
    )
  }

  // Database
  if (skills.detected['Data']) {
    questions.push('Explain database indexing. What types of indexes do you know?')
  }

  // Cloud/DevOps
  if (skills.detected['Cloud/DevOps']) {
    questions.push('How would you containerize a Node.js application with Docker?')
  }

  // Behavioral questions - always include
  const behavioralQuestions = [
    'Tell me about a challenging project you worked on. How did you overcome the obstacles?',
    'Describe a time you had to learn something new quickly. How did you approach it?'
  ]

  // Combine and ensure exactly 10
  const allQuestions = [...questions, ...behavioralQuestions]
  
  // If we have fewer than 10, add generic questions
  const genericQuestions = [
    'What are your strengths and how do they relate to this role?',
    'Where do you see yourself in 5 years?',
    'Why are you interested in this company?',
    'How do you handle debugging production issues?',
    'Describe your experience with version control systems.'
  ]

  while (allQuestions.length < 10) {
    const random = genericQuestions[Math.floor(Math.random() * genericQuestions.length)]
    if (!allQuestions.includes(random)) {
      allQuestions.push(random)
    }
  }

  return allQuestions.slice(0, 10)
}

export function generateAnalysis(jdText, company, role) {
  const skills = extractSkills(jdText)
  const readinessScore = generateReadinessScore(jdText, company, role, skills)
  const checklist = generateRoundChecklist(skills, role)
  const plan = generate7DayPlan(skills, role)
  const questions = generateInterviewQuestions(skills, role)

  return {
    extractedSkills: skills.detected,
    readinessScore,
    checklist,
    plan,
    questions,
    skillsTotalCategories: skills.totalCategories
  }
}
