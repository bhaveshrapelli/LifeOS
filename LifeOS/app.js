/* ============================================
   LIFEOS — Personal Transformation Tracker
   Application Logic
   ============================================ */

// ============================================
// DATA & CONSTANTS
// ============================================

const PHASES = [
  { id: 1, name: 'Foundation', emoji: '⚡', start: '2026-07-25', end: '2026-09-30', color: '#e94560' },
  { id: 2, name: 'Acceleration', emoji: '🚀', start: '2026-10-01', end: '2026-12-31', color: '#f5a623' },
  { id: 3, name: 'Transformation', emoji: '🔥', start: '2027-01-01', end: '2027-04-30', color: '#7209b7' },
  { id: 4, name: 'Dominance', emoji: '👑', start: '2027-05-01', end: '2027-10-31', color: '#4361ee' },
  { id: 5, name: 'Scale', emoji: '🏗️', start: '2027-11-01', end: '2028-04-30', color: '#00c9a7' },
  { id: 6, name: 'Empire', emoji: '🌟', start: '2028-05-01', end: '2028-11-15', color: '#00d4ff' }
];

// Journey start date — Day 1
const JOURNEY_START = new Date('2026-07-25T00:00:00');

const PHASE_MILESTONES = {
  1: [
    { text: '90-day meditation streak', domain: 'mental' },
    { text: 'Bench press bodyweight', domain: 'physical' },
    { text: '5K under 25 min', domain: 'stamina' },
    { text: '3 ML projects deployed', domain: 'career' },
    { text: '500+ LinkedIn followers', domain: 'career' },
    { text: 'Boxing fundamentals', domain: 'physical' }
  ],
  2: [
    { text: 'Bench 1.25× bodyweight', domain: 'physical' },
    { text: '10K under 50 min', domain: 'stamina' },
    { text: '2 Toastmasters speeches', domain: 'vocal' },
    { text: 'First AI product revenue', domain: 'career' },
    { text: 'Find co-founder', domain: 'career' },
    { text: 'Cold shower daily streak', domain: 'mental' }
  ],
  3: [
    { text: 'Bench 1.5× bodyweight', domain: 'physical' },
    { text: 'Half-marathon under 1:50', domain: 'stamina' },
    { text: 'Speak at tech meetup', domain: 'vocal' },
    { text: 'Startup MVP launched', domain: 'career' },
    { text: '5 paying pilot customers', domain: 'career' },
    { text: 'Vipassana retreat', domain: 'mental' }
  ],
  4: [
    { text: 'Full marathon sub-3:45', domain: 'stamina' },
    { text: 'Speak at 2+ conferences', domain: 'vocal' },
    { text: '$50-100K MRR', domain: 'career' },
    { text: '$2-5M seed raised', domain: 'career' },
    { text: 'TechCrunch coverage', domain: 'career' }
  ],
  5: [
    { text: 'First ultra-marathon', domain: 'stamina' },
    { text: '$500K-1M MRR', domain: 'career' },
    { text: '$15-30M Series A', domain: 'career' },
    { text: 'International expansion', domain: 'career' }
  ],
  6: [
    { text: '$1B valuation', domain: 'career' },
    { text: '100+ team members', domain: 'career' },
    { text: 'Known name in AI', domain: 'career' }
  ]
};

const DAILY_SCHEDULE = [
  { time: '5:00 AM', task: 'Wake up — Cold water face wash, hydrate', domain: 'health' },
  { time: '5:15 AM', task: 'Meditation (15 min Vipassana)', domain: 'mental' },
  { time: '5:30 AM', task: 'Journaling — 3 intentions, 1 fear', domain: 'mental' },
  { time: '5:40 AM', task: 'Vocal warm-up — Lip trills, diaphragm', domain: 'vocal' },
  { time: '6:00 AM', task: 'Gym / Boxing session (90 min)', domain: 'physical' },
  { time: '7:30 AM', task: 'Shower + High-protein breakfast', domain: 'health' },
  { time: '8:00 AM', task: 'Running session (30-45 min)', domain: 'stamina' },
  { time: '9:00 AM', task: 'AI news + arXiv paper reading', domain: 'career' },
  { time: '9:30 AM', task: 'Deep Learning study / Work block', domain: 'career' },
  { time: '1:00 PM', task: 'Lunch + rest', domain: 'health' },
  { time: '2:00 PM', task: 'Project building / Coding', domain: 'career' },
  { time: '5:00 PM', task: 'Reading aloud practice (15 min)', domain: 'vocal' },
  { time: '5:30 PM', task: 'Networking / LinkedIn / Content', domain: 'career' },
  { time: '6:30 PM', task: 'Dinner + Family / Social time', domain: 'balance' },
  { time: '7:30 PM', task: 'Book reading (1 hour)', domain: 'mental' },
  { time: '8:30 PM', task: 'Evening reflection + Plan tomorrow', domain: 'mental' },
  { time: '9:30 PM', task: 'Sleep (7.5 hours)', domain: 'health' }
];

const HABITS = [
  { id: 'meditation', name: 'Meditation', icon: '🧘', domain: 'mental' },
  { id: 'journaling', name: 'Journaling', icon: '📝', domain: 'mental' },
  { id: 'workout', name: 'Workout', icon: '💪', domain: 'physical' },
  { id: 'running', name: 'Running', icon: '🏃', domain: 'stamina' },
  { id: 'vocal', name: 'Vocal Practice', icon: '🎤', domain: 'vocal' },
  { id: 'deepwork', name: 'Deep Work', icon: '💻', domain: 'career' },
  { id: 'reading', name: 'Reading', icon: '📚', domain: 'mental' }
];

const SCORECARD_METRICS = [
  { id: 'meditation_days', label: 'Meditation Sessions', icon: '🧘', target: 7, domain: 'mental' },
  { id: 'journal_days', label: 'Journaling Days', icon: '📝', target: 7, domain: 'mental' },
  { id: 'training_sessions', label: 'Training Sessions', icon: '💪', target: 6, domain: 'physical' },
  { id: 'km_run', label: 'Kilometers Run', icon: '🏃', target: 35, domain: 'stamina' },
  { id: 'vocal_sessions', label: 'Vocal Practice', icon: '🎤', target: 5, domain: 'vocal' },
  { id: 'deep_work_hours', label: 'Deep Work Hours', icon: '💻', target: 35, domain: 'career' },
  { id: 'linkedin_posts', label: 'LinkedIn Posts', icon: '📢', target: 1, domain: 'career' },
  { id: 'people_networked', label: 'People Networked', icon: '🤝', target: 5, domain: 'career' },
  { id: 'pages_read', label: 'Pages Read', icon: '📚', target: 100, domain: 'general' }
];

const BOOKS = [
  { title: 'Atomic Habits', author: 'James Clear', phase: '1-2', domain: 'Habits', domainClass: 'mental' },
  { title: 'Meditations', author: 'Marcus Aurelius', phase: '1-2', domain: 'Stoicism', domainClass: 'mental' },
  { title: 'The Power of Now', author: 'Eckhart Tolle', phase: '1-2', domain: 'Mindfulness', domainClass: 'mental' },
  { title: 'Deep Work', author: 'Cal Newport', phase: '1-2', domain: 'Productivity', domainClass: 'career' },
  { title: 'Set Your Voice Free', author: 'Roger Love', phase: '1-2', domain: 'Vocal', domainClass: 'vocal' },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', phase: '3-4', domain: 'Cognition', domainClass: 'mental' },
  { title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', phase: '3-4', domain: 'Startup', domainClass: 'career' },
  { title: 'Zero to One', author: 'Peter Thiel', phase: '3-4', domain: 'Startup', domainClass: 'career' },
  { title: "Man's Search for Meaning", author: 'Viktor Frankl', phase: '3-4', domain: 'Purpose', domainClass: 'mental' },
  { title: 'The 48 Laws of Power', author: 'Robert Greene', phase: '3-4', domain: 'Strategy', domainClass: 'mental' },
  { title: 'The Lean Startup', author: 'Eric Ries', phase: '5-6', domain: 'Startup', domainClass: 'career' },
  { title: 'Blitzscaling', author: 'Reid Hoffman', phase: '5-6', domain: 'Scale', domainClass: 'career' },
  { title: 'Shoe Dog', author: 'Phil Knight', phase: '5-6', domain: 'Inspiration', domainClass: 'mental' },
  { title: 'The Almanack of Naval Ravikant', author: 'Eric Jorgenson', phase: '5-6', domain: 'Wealth', domainClass: 'career' },
  { title: 'High Output Management', author: 'Andy Grove', phase: '5-6', domain: 'Leadership', domainClass: 'career' }
];

const QUOTES = [
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "What we fear doing most is usually what we most need to do.", author: "Tim Ferriss" },
  { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
  { text: "Champions aren't made in gyms. Champions are made from something deep inside them.", author: "Muhammad Ali" },
  { text: "I'm not the smartest. I'm not the most talented. But I will not be outworked.", author: "Mike Tyson" },
  { text: "Run when you can, walk if you have to, crawl if you must; just never give up.", author: "Dean Karnazes" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your mind is a garden, your thoughts are seeds. You can grow flowers or you can grow weeds.", author: "Unknown" },
  { text: "Every next level of your life will demand a different version of you.", author: "Leonardo DiCaprio" }
];

const REVIEW_QUESTIONS = [
  "What were my 3 biggest wins this month?",
  "Where did I fall short and why?",
  "What's changing in AI/world that affects my plan?",
  "Am I on track for the current phase milestone?",
  "What's my #1 priority for next month?",
  "Am I taking care of my health and relationships?"
];

// ============================================
// STATE MANAGEMENT
// ============================================

const STORAGE_KEY = 'lifeos_data';

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaultData();
  } catch { return getDefaultData(); }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  // Show save indicator
  const indicator = document.getElementById('saveIndicator');
  if (indicator) {
    indicator.classList.add('saved');
    indicator.textContent = '✅ Saved';
    setTimeout(() => {
      indicator.classList.remove('saved');
      indicator.textContent = '💾 Auto-saved';
    }, 1500);
  }
}

// ============================================
// DATA BACKUP & RESTORE
// ============================================

function exportData() {
  // Fallback to JSON download if jsPDF is not available (offline)
  if (!window.jspdf) {
    const blob = new Blob([JSON.stringify(appData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LifeOS_Backup_${formatDate(new Date())}.json`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
    showToast('JSON backup downloaded! 📦 (PDF unavailable offline)');
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentW = pageW - margin * 2;
  let y = margin;

  // Colors
  const primary = [233, 69, 96];
  const dark = [30, 30, 40];
  const gray = [120, 120, 140];
  const white = [255, 255, 255];

  function checkPage(needed = 20) {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function sectionTitle(text) {
    checkPage(18);
    y += 6;
    doc.setFillColor(...primary);
    doc.roundedRect(margin, y, contentW, 10, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...white);
    doc.text(text, margin + 4, y + 7);
    y += 16;
    doc.setTextColor(...dark);
  }

  function label(text, x, yPos) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text(text, x, yPos);
  }

  function value(text, x, yPos) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...dark);
    doc.text(String(text), x, yPos);
  }

  // ===== COVER / TITLE =====
  doc.setFillColor(...primary);
  doc.rect(0, 0, pageW, 55, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(...white);
  doc.text('LifeOS Report', margin, 28);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Personal Transformation Tracker', margin, 38);
  doc.setFontSize(10);
  doc.text(`Exported: ${formatDateDisplay(new Date())}`, margin, 48);
  y = 65;
  doc.setTextColor(...dark);

  // ===== CURRENT PHASE =====
  const phase = getCurrentPhase();
  sectionTitle(`Current Phase: Phase ${phase.id} — ${phase.name} ${phase.emoji}`);
  label('Period:', margin, y);
  value(`${phase.start} to ${phase.end}`, margin + 20, y);
  y += 8;

  // ===== HABIT STREAKS =====
  sectionTitle('Habit Streaks');
  HABITS.forEach(h => {
    checkPage(7);
    const s = getStreak(h.id);
    label(`${h.name}:`, margin, y);
    value(`${s} day${s !== 1 ? 's' : ''} ${s >= 7 ? '(on fire!)' : ''}`, margin + 40, y);
    y += 6;
  });

  // ===== PERSONAL RECORDS =====
  sectionTitle('Personal Records');
  const pr = appData.personalRecords;
  const prItems = [
    { k: 'Bench Press', v: `${pr.bench || 0} kg` },
    { k: 'Deadlift', v: `${pr.deadlift || 0} kg` },
    { k: 'Squat', v: `${pr.squat || 0} kg` },
    { k: 'Pull-ups', v: `${pr.pullups || 0} reps` }
  ];
  prItems.forEach(item => {
    checkPage(7);
    label(`${item.k}:`, margin, y);
    value(item.v, margin + 40, y);
    y += 6;
  });

  // ===== WEEKLY SCORECARD (latest 4 weeks) =====
  sectionTitle('Weekly Scorecard (Recent Weeks)');
  const weekIds = Object.keys(appData.weeklyScores).sort().slice(-4);
  if (weekIds.length === 0) {
    value('No weekly scores recorded yet.', margin, y);
    y += 8;
  } else {
    weekIds.forEach(wk => {
      checkPage(14 + SCORECARD_METRICS.length * 6);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...primary);
      doc.text(wk, margin, y);
      y += 6;
      doc.setTextColor(...dark);
      const scores = appData.weeklyScores[wk];
      SCORECARD_METRICS.forEach(m => {
        checkPage(6);
        const val = scores[m.id] || 0;
        label(`${m.label}:`, margin + 4, y);
        value(`${val} / ${m.target}`, margin + 55, y);
        y += 5;
      });
      y += 4;
    });
  }

  // ===== WORKOUT LOG (last 15) =====
  sectionTitle('Workout Log (Recent)');
  const recentWorkouts = appData.workouts.slice().reverse().slice(0, 15);
  if (recentWorkouts.length === 0) {
    value('No workouts logged yet.', margin, y);
    y += 8;
  } else {
    // Table header
    checkPage(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text('Date', margin, y);
    doc.text('Type', margin + 30, y);
    doc.text('Notes', margin + 70, y);
    y += 2;
    doc.setDrawColor(200, 200, 210);
    doc.line(margin, y, pageW - margin, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...dark);
    recentWorkouts.forEach(w => {
      checkPage(7);
      doc.setFontSize(9);
      doc.text(w.date || '', margin, y);
      doc.text(w.type || '', margin + 30, y);
      const notesText = doc.splitTextToSize(w.notes || '—', contentW - 70);
      doc.text(notesText, margin + 70, y);
      y += Math.max(6, notesText.length * 4.5);
    });
  }

  // ===== RUNNING LOG (last 15) =====
  sectionTitle('Running Log (Recent)');
  const recentRuns = appData.runningLog.slice().reverse().slice(0, 15);
  if (recentRuns.length === 0) {
    value('No runs logged yet.', margin, y);
    y += 8;
  } else {
    checkPage(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text('Date', margin, y);
    doc.text('Distance', margin + 35, y);
    doc.text('Duration', margin + 60, y);
    doc.text('Pace', margin + 85, y);
    y += 2;
    doc.setDrawColor(200, 200, 210);
    doc.line(margin, y, pageW - margin, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...dark);
    recentRuns.forEach(r => {
      checkPage(7);
      doc.setFontSize(9);
      doc.text(r.date || '', margin, y);
      doc.text(`${r.distance} km`, margin + 35, y);
      doc.text(`${r.duration} min`, margin + 60, y);
      const pace = r.duration && r.distance ? (r.duration / r.distance).toFixed(1) : '—';
      doc.text(`${pace} min/km`, margin + 85, y);
      y += 6;
    });
  }

  // ===== READING LIST =====
  sectionTitle('Reading List');
  BOOKS.forEach(book => {
    checkPage(7);
    const status = appData.books[book.title] || 'not_started';
    const statusText = status === 'completed' ? '[DONE]' : status === 'reading' ? '[READING]' : '[—]';
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(status === 'completed' ? [34, 139, 34] : status === 'reading' ? [30, 100, 200] : [...gray]);
    doc.text(statusText, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...dark);
    doc.text(`${book.title} — ${book.author}`, margin + 22, y);
    y += 6;
  });

  // ===== MILESTONES =====
  sectionTitle('Milestones Progress');
  PHASES.forEach(phase => {
    const milestones = PHASE_MILESTONES[phase.id] || [];
    if (milestones.length === 0) return;
    checkPage(10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...primary);
    doc.text(`Phase ${phase.id}: ${phase.name}`, margin, y);
    y += 6;
    doc.setTextColor(...dark);
    milestones.forEach(m => {
      checkPage(6);
      const done = appData.milestones[m.text] || false;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`${done ? '[x]' : '[ ]'} ${m.text}`, margin + 4, y);
      y += 5;
    });
    y += 3;
  });

  // ===== MONTHLY REVIEWS =====
  const reviewMonths = Object.keys(appData.monthlyReviews).sort();
  if (reviewMonths.length > 0) {
    sectionTitle('Monthly Reviews');
    reviewMonths.forEach(monthId => {
      checkPage(14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...primary);
      doc.text(monthId, margin, y);
      y += 6;
      const answers = appData.monthlyReviews[monthId] || [];
      REVIEW_QUESTIONS.forEach((q, i) => {
        checkPage(14);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...dark);
        doc.text(`${i + 1}. ${q}`, margin + 2, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...gray);
        const ans = answers[i] || '(no answer)';
        const lines = doc.splitTextToSize(ans, contentW - 8);
        doc.text(lines, margin + 4, y);
        y += lines.length * 4.5 + 3;
      });
      y += 4;
    });
  }

  // ===== FOOTER on last page =====
  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.text('LifeOS — Personal Transformation Tracker', pageW / 2, pageH - 8, { align: 'center' });

  // Save
  doc.save(`LifeOS_Report_${formatDate(new Date())}.pdf`);
  showToast('PDF report downloaded! 📄');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        // Validate it has expected keys
        if (imported.habits !== undefined && imported.dailyTasks !== undefined) {
          appData = { ...getDefaultData(), ...imported };
          saveData();
          showToast('Data restored successfully! 🎉');
          renderSection(currentSection);
        } else {
          showToast('Invalid backup file format', 'error');
        }
      } catch {
        showToast('Error reading backup file', 'error');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function clearAllData() {
  if (confirm('⚠️ This will delete ALL your progress data. This cannot be undone!\n\nAre you sure?')) {
    if (confirm('Really sure? Export a backup first if needed.')) {
      appData = getDefaultData();
      saveData();
      showToast('All data cleared');
      renderSection(currentSection);
    }
  }
}

function getDefaultData() {
  return {
    habits: {},          // { "2026-03-17": { meditation: true, ... } }
    dailyTasks: {},      // { "2026-03-17": { "0": true, ... } }
    workouts: [],        // [{ date, type, exercises: [{name, sets, reps, weight}] }]
    runningLog: [],      // [{ date, distance, duration }]
    books: {},           // { "Atomic Habits": "not_started"|"reading"|"completed" }
    weeklyScores: {},    // { "2026-W12": { meditation_days: 7, ... } }
    monthlyReviews: {},  // { "2026-03": ["answer1", ...] }
    personalRecords: { bench: 0, deadlift: 0, squat: 0, pullups: 0 },
    milestones: {}       // { "90-day meditation streak": true }
  };
}

let appData = loadData();

// ============================================
// UTILITIES
// ============================================

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function formatDateDisplay(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatMonthYear(date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function getWeekId(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  const weekNum = 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

function getMonthId(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getCurrentPhase() {
  const now = new Date();
  for (const phase of PHASES) {
    if (now >= new Date(phase.start) && now <= new Date(phase.end)) return phase;
  }
  // If before all phases, return first; if after, return last
  if (now < new Date(PHASES[0].start)) return PHASES[0];
  return PHASES[PHASES.length - 1];
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getStreak(habitId) {
  let streak = 0;
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (true) {
    const key = formatDate(d);
    if (appData.habits[key] && appData.habits[key][habitId]) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function getDayNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const start = new Date(JOURNEY_START);
  start.setHours(0, 0, 0, 0);
  const diff = Math.floor((d - start) / 86400000) + 1;
  return diff >= 1 ? diff : null;
}

function formatDayLabel(date) {
  const dayNum = getDayNumber(date);
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const monthName = d.toLocaleDateString('en-US', { month: 'long' });
  if (dayNum !== null) {
    return `Day ${dayNum} · ${monthName} ${day}/${month}/${year}`;
  }
  return formatDateDisplay(date);
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ============================================
// NAVIGATION
// ============================================

let currentSection = 'dashboard';

function navigateTo(section) {
  currentSection = section;
  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.section === section);
  });
  // Update sections
  document.querySelectorAll('.section').forEach(s => {
    s.classList.toggle('active', s.id === `section-${section}`);
  });
  // Render the section
  renderSection(section);
}

function renderSection(section) {
  switch (section) {
    case 'dashboard': renderDashboard(); break;
    case 'schedule': renderSchedule(); break;
    case 'habits': renderHabits(); break;
    case 'scorecard': renderScorecard(); break;
    case 'timeline': renderTimeline(); break;
    case 'workout': renderWorkout(); break;
    case 'reading': renderReading(); break;
    case 'review': renderReview(); break;
  }
}

// ============================================
// DASHBOARD
// ============================================

function renderDashboard() {
  const today = new Date();
  const phase = getCurrentPhase();
  const todayStr = formatDate(today);

  // Greeting
  const hour = today.getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17) greeting = 'Good evening';

  document.getElementById('dashGreeting').innerHTML = `${greeting}, <span>Bhavesh</span> 🔥`;
  document.getElementById('dashDate').textContent = formatDayLabel(today);

  // Phase indicator in sidebar
  document.getElementById('phaseNameSidebar').textContent = `Phase ${phase.id}: ${phase.name}`;
  document.getElementById('phaseDatesSidebar').textContent =
    `${new Date(phase.start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — ${new Date(phase.end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;

  // Domain cards
  const domains = [
    { key: 'mental', name: 'Mental', icon: '🧠', habits: ['meditation', 'journaling', 'reading'] },
    { key: 'physical', name: 'Physical', icon: '💪', habits: ['workout'] },
    { key: 'stamina', name: 'Stamina', icon: '🏃', habits: ['running'] },
    { key: 'vocal', name: 'Vocal', icon: '🎤', habits: ['vocal'] },
    { key: 'career', name: 'Career', icon: '💻', habits: ['deepwork'] }
  ];

  const domainGrid = document.getElementById('domainGrid');
  domainGrid.innerHTML = domains.map(d => {
    // Calculate 7-day completion rate
    let done = 0, total = 0;
    for (let i = 0; i < 7; i++) {
      const dt = new Date(today);
      dt.setDate(dt.getDate() - i);
      const key = formatDate(dt);
      d.habits.forEach(h => {
        total++;
        if (appData.habits[key] && appData.habits[key][h]) done++;
      });
    }
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const streak = d.habits.length === 1 ? getStreak(d.habits[0]) : Math.min(...d.habits.map(getStreak));
    const circumference = 2 * Math.PI * 36;
    const offset = circumference - (pct / 100) * circumference;

    return `
      <div class="domain-card ${d.key}">
        <div class="domain-icon">${d.icon}</div>
        <div class="domain-name">${d.name}</div>
        <div class="progress-ring-container">
          <svg class="progress-ring" width="90" height="90">
            <circle class="progress-ring-bg" cx="45" cy="45" r="36"/>
            <circle class="progress-ring-fill ${d.key}" cx="45" cy="45" r="36"
              stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
          </svg>
          <div class="progress-ring-text">${pct}%</div>
        </div>
        <div class="streak">${streak > 0 ? `<span class="fire">🔥</span> ${streak} day streak` : 'Start today!'}</div>
      </div>
    `;
  }).join('');

  // Quote
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  document.getElementById('quoteText').innerHTML = `"${quote.text}" <div class="quote-author">— ${quote.author}</div>`;

  // Today's tasks summary
  const tasksData = appData.dailyTasks[todayStr] || {};
  const completed = Object.values(tasksData).filter(Boolean).length;
  const totalTasks = DAILY_SCHEDULE.length;
  document.getElementById('dashTasksCompleted').textContent = `${completed}/${totalTasks} tasks`;
  document.getElementById('dashTasksBar').style.width = `${(completed / totalTasks) * 100}%`;

  // Upcoming tasks
  const upcomingEl = document.getElementById('dashUpcoming');
  const upcomingTasks = DAILY_SCHEDULE.filter((_, i) => !tasksData[String(i)]).slice(0, 5);
  upcomingEl.innerHTML = upcomingTasks.map(t => `
    <div style="display:flex;align-items:center;gap:10px;padding:6px 0;font-size:13px;">
      <span class="schedule-domain-tag ${t.domain}" style="min-width:60px;text-align:center;">${t.time}</span>
      <span>${t.task}</span>
    </div>
  `).join('') || '<p style="color:var(--text-muted);font-size:13px;">All tasks completed! 🎉</p>';
}

// ============================================
// DAILY SCHEDULE
// ============================================

let scheduleDate = new Date();

function renderSchedule() {
  const dateStr = formatDate(scheduleDate);
  document.getElementById('scheduleCurrentDate').textContent = formatDayLabel(scheduleDate);

  const tasksData = appData.dailyTasks[dateStr] || {};
  const completed = Object.values(tasksData).filter(Boolean).length;
  const total = DAILY_SCHEDULE.length;
  const pct = Math.round((completed / total) * 100);

  document.getElementById('scheduleCompletionFill').style.width = `${pct}%`;
  document.getElementById('scheduleCompletionText').textContent = `${pct}%`;

  const list = document.getElementById('scheduleList');
  list.innerHTML = DAILY_SCHEDULE.map((item, i) => {
    const done = tasksData[String(i)] || false;
    return `
      <div class="schedule-item ${done ? 'completed' : ''}" data-index="${i}">
        <div class="schedule-check" onclick="toggleScheduleTask('${dateStr}', ${i})"></div>
        <div class="schedule-time">${item.time}</div>
        <div class="schedule-task">${item.task}</div>
        <div class="schedule-domain-tag ${item.domain}">${item.domain}</div>
      </div>
    `;
  }).join('');
}

function toggleScheduleTask(dateStr, index) {
  if (!appData.dailyTasks[dateStr]) appData.dailyTasks[dateStr] = {};
  appData.dailyTasks[dateStr][String(index)] = !appData.dailyTasks[dateStr][String(index)];
  saveData();
  renderSchedule();
}

function prevDay() {
  scheduleDate.setDate(scheduleDate.getDate() - 1);
  renderSchedule();
}

function nextDay() {
  scheduleDate.setDate(scheduleDate.getDate() + 1);
  renderSchedule();
}

// ============================================
// HABIT TRACKER
// ============================================

let habitMonth = new Date();

function renderHabits() {
  const year = habitMonth.getFullYear();
  const month = habitMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const today = new Date();

  document.getElementById('habitMonthLabel').textContent = formatMonthYear(habitMonth);

  // Day headers
  const headersEl = document.getElementById('habitDayHeaders');
  headersEl.innerHTML = '';
  for (let d = 1; d <= daysInMonth; d++) {
    headersEl.innerHTML += `<div class="habit-day-header">${d}</div>`;
  }

  // Habit rows
  const gridEl = document.getElementById('habitGrid');
  gridEl.innerHTML = HABITS.map(habit => {
    let cells = '';
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dateStr = formatDate(date);
      const isFuture = date > today;
      const done = appData.habits[dateStr] && appData.habits[dateStr][habit.id];
      cells += `<div class="habit-cell ${done ? 'done ' + habit.domain : ''} ${isFuture ? 'future' : ''}"
        ${!isFuture ? `onclick="toggleHabit('${dateStr}', '${habit.id}')"` : ''}
        title="${dateStr}"></div>`;
    }
    return `
      <div class="habit-row">
        <div class="habit-row-label"><span>${habit.icon}</span> ${habit.name}</div>
        <div class="habit-cells">${cells}</div>
      </div>
    `;
  }).join('');

  // Streaks
  const streaksEl = document.getElementById('habitStreaks');
  streaksEl.innerHTML = HABITS.map(h => {
    const s = getStreak(h.id);
    return `<div class="streak-badge">
      <span>${h.icon}</span>
      <span class="streak-num" style="color:${s >= 7 ? 'var(--accent-gold)' : 'var(--text-secondary)'}">${s}</span>
      <span style="color:var(--text-muted)">${h.name}</span>
      ${s >= 7 ? '🔥' : ''}
    </div>`;
  }).join('');
}

function toggleHabit(dateStr, habitId) {
  if (!appData.habits[dateStr]) appData.habits[dateStr] = {};
  appData.habits[dateStr][habitId] = !appData.habits[dateStr][habitId];
  saveData();
  renderHabits();
}

function prevHabitMonth() {
  habitMonth.setMonth(habitMonth.getMonth() - 1);
  renderHabits();
}

function nextHabitMonth() {
  habitMonth.setMonth(habitMonth.getMonth() + 1);
  renderHabits();
}

// ============================================
// WEEKLY SCORECARD
// ============================================

let scorecardDate = new Date();

function renderScorecard() {
  const weekId = getWeekId(scorecardDate);
  document.getElementById('scorecardWeekLabel').textContent = `Week of ${scorecardDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  const data = appData.weeklyScores[weekId] || {};
  const gridEl = document.getElementById('scorecardGrid');

  gridEl.innerHTML = SCORECARD_METRICS.map(m => {
    const val = data[m.id] || 0;
    const pct = Math.min(100, Math.round((val / m.target) * 100));
    return `
      <div class="scorecard-item">
        <div class="scorecard-label"><span>${m.icon}</span> ${m.label}</div>
        <div class="scorecard-bar-wrapper">
          <div class="scorecard-bar ${m.domain}" style="width:${pct}%"></div>
        </div>
        <input type="number" class="scorecard-input" value="${val}" min="0"
          data-metric="${m.id}" data-week="${weekId}"
          onchange="updateScorecard('${weekId}', '${m.id}', this.value)">
        <div class="scorecard-target">/ ${m.target}</div>
      </div>
    `;
  }).join('');
}

function updateScorecard(weekId, metricId, value) {
  if (!appData.weeklyScores[weekId]) appData.weeklyScores[weekId] = {};
  appData.weeklyScores[weekId][metricId] = parseInt(value) || 0;
  saveData();
  renderScorecard();
}

function prevWeek() {
  scorecardDate.setDate(scorecardDate.getDate() - 7);
  renderScorecard();
}

function nextWeek() {
  scorecardDate.setDate(scorecardDate.getDate() + 7);
  renderScorecard();
}

// ============================================
// PHASE TIMELINE
// ============================================

function renderTimeline() {
  const now = new Date();
  const currentPhase = getCurrentPhase();
  const container = document.getElementById('timelineContainer');

  container.innerHTML = `<div class="timeline-line"></div>` + PHASES.map(phase => {
    const start = new Date(phase.start);
    const end = new Date(phase.end);
    const isActive = phase.id === currentPhase.id;
    const isCompleted = now > end;
    const milestones = PHASE_MILESTONES[phase.id] || [];

    return `
      <div class="timeline-phase">
        <div class="timeline-dot ${isActive ? 'active' : ''}" style="background:${phase.color}"></div>
        <div class="timeline-phase-card ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}">
          <div class="timeline-phase-header">
            <span class="timeline-phase-num" style="background:${phase.color}22;color:${phase.color}">
              PHASE ${phase.id}
            </span>
            <span class="timeline-phase-title">${phase.emoji} ${phase.name}</span>
            <span class="timeline-phase-dates">
              ${start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — ${end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>
          <div class="timeline-milestones">
            ${milestones.map(m => {
      const done = appData.milestones[m.text] || false;
      return `<span class="milestone-tag ${done ? 'done' : ''}"
                onclick="toggleMilestone('${m.text.replace(/'/g, "\\'")}')" style="cursor:pointer"
                title="Click to toggle">${done ? '✅' : '⬜'} ${m.text}</span>`;
    }).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleMilestone(text) {
  appData.milestones[text] = !appData.milestones[text];
  saveData();
  renderTimeline();
  showToast(appData.milestones[text] ? 'Milestone achieved! 🏆' : 'Milestone unmarked');
}

// ============================================
// WORKOUT LOG
// ============================================

let workoutTab = 'log'; // log | running | prs

function renderWorkout() {
  // Tabs
  document.querySelectorAll('.workout-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === workoutTab);
  });

  const contentEl = document.getElementById('workoutContent');

  if (workoutTab === 'prs') {
    renderPRs(contentEl);
  } else if (workoutTab === 'running') {
    renderRunning(contentEl);
  } else {
    renderWorkoutLog(contentEl);
  }
}

function renderPRs(container) {
  const pr = appData.personalRecords;
  container.innerHTML = `
    <div class="pr-grid">
      ${['bench', 'deadlift', 'squat', 'pullups'].map(k => `
        <div class="pr-card">
          <div class="pr-label">${k.charAt(0).toUpperCase() + k.slice(1)}</div>
          <div class="pr-value">${pr[k] || 0}</div>
          <div class="pr-unit">${k === 'pullups' ? 'reps' : 'kg'}</div>
          <div style="margin-top:8px;">
            <input type="number" class="scorecard-input" value="${pr[k] || 0}" min="0"
              style="width:70px" onchange="updatePR('${k}', this.value)" placeholder="Update">
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function updatePR(key, value) {
  const num = parseInt(value) || 0;
  if (num > (appData.personalRecords[key] || 0)) {
    showToast(`New PR! ${key}: ${num} 🏆`);
  }
  appData.personalRecords[key] = num;
  saveData();
  renderWorkout();
}

function renderRunning(container) {
  const runs = appData.runningLog.slice().reverse().slice(0, 20);
  const totalKm = appData.runningLog.reduce((s, r) => s + (parseFloat(r.distance) || 0), 0);

  container.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:20px;">
      <div class="pr-card"><div class="pr-label">Total Runs</div><div class="pr-value">${appData.runningLog.length}</div></div>
      <div class="pr-card"><div class="pr-label">Total KM</div><div class="pr-value">${totalKm.toFixed(1)}</div></div>
      <div class="pr-card"><div class="pr-label">Avg Distance</div><div class="pr-value">${appData.runningLog.length ? (totalKm / appData.runningLog.length).toFixed(1) : 0}</div><div class="pr-unit">km</div></div>
    </div>

    <div class="workout-form">
      <h4 style="margin-bottom:12px;font-size:14px;">Log a Run</h4>
      <div class="form-row">
        <div class="form-group" style="flex:1">
          <label>Date</label>
          <input type="date" id="runDate" value="${formatDate(new Date())}">
        </div>
        <div class="form-group" style="flex:1">
          <label>Distance (km)</label>
          <input type="number" id="runDistance" step="0.1" placeholder="5.0">
        </div>
        <div class="form-group" style="flex:1">
          <label>Duration (minutes)</label>
          <input type="number" id="runDuration" placeholder="30">
        </div>
        <div class="form-group">
          <label>&nbsp;</label>
          <button class="btn btn-primary btn-sm" onclick="addRun()">+ Add</button>
        </div>
      </div>
    </div>

    <div class="workout-history-list">
      ${runs.map((r, i) => `
        <div class="workout-history-item">
          <div class="workout-history-date">${r.date}</div>
          <div class="workout-history-type" style="color:var(--accent-green)">🏃 Run</div>
          <div class="workout-history-detail">${r.distance} km in ${r.duration} min — Pace: ${r.duration && r.distance ? (r.duration / r.distance).toFixed(1) : '?'} min/km</div>
          <button class="workout-delete-btn" onclick="deleteRun(${appData.runningLog.length - 1 - i})">✕</button>
        </div>
      `).join('') || '<p style="color:var(--text-muted);padding:16px;">No runs logged yet. Start running! 🏃</p>'}
    </div>
  `;
}

function addRun() {
  const date = document.getElementById('runDate').value;
  const distance = document.getElementById('runDistance').value;
  const duration = document.getElementById('runDuration').value;
  if (!date || !distance) return showToast('Please fill date and distance', 'error');
  appData.runningLog.push({ date, distance: parseFloat(distance), duration: parseInt(duration) || 0 });
  saveData();
  showToast('Run logged! 🏃');
  renderWorkout();
}

function deleteRun(index) {
  appData.runningLog.splice(index, 1);
  saveData();
  renderWorkout();
}

function renderWorkoutLog(container) {
  const workouts = appData.workouts.slice().reverse().slice(0, 20);

  container.innerHTML = `
    <div class="workout-form">
      <h4 style="margin-bottom:12px;font-size:14px;">Log Workout</h4>
      <div class="form-row">
        <div class="form-group" style="flex:1">
          <label>Date</label>
          <input type="date" id="workoutDate" value="${formatDate(new Date())}">
        </div>
        <div class="form-group" style="flex:1.5">
          <label>Type</label>
          <select id="workoutType">
            <option value="Upper Push">Upper Push</option>
            <option value="Lower Body">Lower Body</option>
            <option value="Boxing">Boxing</option>
            <option value="Upper Pull">Upper Pull</option>
            <option value="Full Body Power">Full Body Power</option>
            <option value="Boxing + Core">Boxing + Core</option>
            <option value="Active Recovery">Active Recovery</option>
          </select>
        </div>
        <div class="form-group" style="flex:2">
          <label>Notes / Exercises</label>
          <input type="text" id="workoutNotes" placeholder="e.g. Bench 80kg×8, Squat 100kg×5">
        </div>
        <div class="form-group">
          <label>&nbsp;</label>
          <button class="btn btn-primary btn-sm" onclick="addWorkout()">+ Add</button>
        </div>
      </div>
    </div>

    <div class="workout-history-list">
      ${workouts.map((w, i) => `
        <div class="workout-history-item">
          <div class="workout-history-date">${w.date}</div>
          <div class="workout-history-type" style="color:var(--accent-red)">💪 ${w.type}</div>
          <div class="workout-history-detail">${w.notes || 'No details'}</div>
          <button class="workout-delete-btn" onclick="deleteWorkout(${appData.workouts.length - 1 - i})">✕</button>
        </div>
      `).join('') || '<p style="color:var(--text-muted);padding:16px;">No workouts logged yet. Hit the gym! 💪</p>'}
    </div>
  `;
}

function addWorkout() {
  const date = document.getElementById('workoutDate').value;
  const type = document.getElementById('workoutType').value;
  const notes = document.getElementById('workoutNotes').value;
  if (!date) return showToast('Please select a date', 'error');
  appData.workouts.push({ date, type, notes });
  saveData();
  showToast('Workout logged! 💪');
  renderWorkout();
}

function deleteWorkout(index) {
  appData.workouts.splice(index, 1);
  saveData();
  renderWorkout();
}

function switchWorkoutTab(tab) {
  workoutTab = tab;
  renderWorkout();
}

// ============================================
// READING LIST
// ============================================

function renderReading() {
  const container = document.getElementById('readingContent');
  const phases = { '1-2': 'Phase 1–2: Foundation', '3-4': 'Phase 3–4: Transformation', '5-6': 'Phase 5–6: Empire' };

  container.innerHTML = Object.entries(phases).map(([key, label]) => {
    const phaseBooks = BOOKS.filter(b => b.phase === key);
    return `
      <div class="reading-phase-section">
        <div class="reading-phase-title">📖 ${label}</div>
        <div class="book-grid">
          ${phaseBooks.map(book => {
      const status = appData.books[book.title] || 'not_started';
      const statusLabel = status === 'completed' ? '✅ Done' : status === 'reading' ? '📖 Reading' : 'Not Started';
      return `
              <div class="book-card">
                <div class="book-icon">📚</div>
                <div class="book-info">
                  <div class="book-title">${book.title}</div>
                  <div class="book-author">${book.author}</div>
                  <span class="book-domain-tag schedule-domain-tag ${book.domainClass}">${book.domain}</span>
                </div>
                <button class="book-status-btn ${status}" onclick="cycleBookStatus('${book.title.replace(/'/g, "\\'")}')">${statusLabel}</button>
              </div>
            `;
    }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function cycleBookStatus(title) {
  const current = appData.books[title] || 'not_started';
  const next = current === 'not_started' ? 'reading' : current === 'reading' ? 'completed' : 'not_started';
  appData.books[title] = next;
  saveData();
  if (next === 'completed') showToast(`Finished "${title}"! 📚🎉`);
  renderReading();
}

// ============================================
// MONTHLY REVIEW
// ============================================

let reviewDate = new Date();

function renderReview() {
  const monthId = getMonthId(reviewDate);
  document.getElementById('reviewMonthLabel').textContent = formatMonthYear(reviewDate);

  const data = appData.monthlyReviews[monthId] || [];
  const container = document.getElementById('reviewForm');

  container.innerHTML = REVIEW_QUESTIONS.map((q, i) => `
    <div class="review-question">
      <div class="review-question-label">
        <span class="review-question-num">${i + 1}</span>
        ${q}
      </div>
      <textarea class="review-textarea" data-month="${monthId}" data-index="${i}"
        placeholder="Write your answer here..."
        onchange="updateReview('${monthId}', ${i}, this.value)">${data[i] || ''}</textarea>
    </div>
  `).join('') + `
    <button class="btn btn-primary" onclick="saveReview()" style="margin-top:8px;">💾 Save Review</button>
  `;
}

function updateReview(monthId, index, value) {
  if (!appData.monthlyReviews[monthId]) appData.monthlyReviews[monthId] = [];
  appData.monthlyReviews[monthId][index] = value;
}

function saveReview() {
  saveData();
  showToast('Monthly review saved! 📝');
}

function prevReviewMonth() {
  reviewDate.setMonth(reviewDate.getMonth() - 1);
  renderReview();
}

function nextReviewMonth() {
  reviewDate.setMonth(reviewDate.getMonth() + 1);
  renderReview();
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Nav clicks — only for items with data-section (skip action buttons like Export/Import/Clear)
  document.querySelectorAll('.nav-item[data-section]').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.section));
  });

  // Workout tabs
  document.querySelectorAll('.workout-tab').forEach(t => {
    t.addEventListener('click', () => switchWorkoutTab(t.dataset.tab));
  });

  // Initialize dashboard
  navigateTo('dashboard');
});
