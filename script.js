// --- Fragenkatalog (Erweitert auf 35 Fragen) ---
const questions = [
    // 1. Arbeitsverhalten & Arbeitsweise
    { id: 'arb_zuverlaessig', category: 'Arbeitsweise', text: 'Ich halte mich genau an Absprachen und Regeln.' },
    { id: 'arb_plan', category: 'Arbeitsweise', text: 'Bevor ich anfange, mache ich mir einen Plan.' },
    { id: 'arb_org', category: 'Arbeitsweise', text: 'Ich organisiere gerne, wer in einer Gruppe was macht.' },
    { id: 'arb_ordung', category: 'Arbeitsweise', text: 'Mein Arbeitsplatz ist meistens ordentlich.' },
    { id: 'arb_tempo', category: 'Arbeitsweise', text: 'Ich arbeite zügig und werde rechtzeitig fertig.' },
    { id: 'arb_routine', category: 'Arbeitsweise', text: 'Ich mag feste Abläufe, bei denen ich genau weiß, was zu tun ist.' }, // NEU: Routine vs. Chaos

    // 2. Lernverhalten & Denken
    { id: 'lern_selbst', category: 'Lernen', text: 'Ich kann Aufgaben erledigen, ohne ständig nachzufragen.' },
    { id: 'lern_ausdauer', category: 'Lernen', text: 'Wenn etwas schwierig ist, gebe ich nicht auf.' },
    { id: 'lern_konz', category: 'Lernen', text: 'Ich kann mich lange auf eine Sache konzentrieren.' },
    { id: 'lern_kapier', category: 'Lernen', text: 'Ich verstehe neue Dinge und Zusammenhänge schnell.' },
    { id: 'lern_problem', category: 'Lernen', text: 'Ich löse gerne knifflige Rätsel oder logische Probleme.' },

    // 3. Sozialverhalten
    { id: 'soz_team', category: 'Soziales', text: 'Ich arbeite lieber im Team als alleine.' },
    { id: 'soz_kontakt', category: 'Soziales', text: 'Es fällt mir leicht, fremde Menschen anzusprechen.' },
    { id: 'soz_empathie', category: 'Soziales', text: 'Ich merke schnell, wenn es anderen nicht gut geht.' },
    { id: 'soz_streit', category: 'Soziales', text: 'Bei Streit versuche ich zu schlichten.' },
    { id: 'soz_fuehrung', category: 'Soziales', text: 'Ich übernehme gerne die Verantwortung für eine Gruppe.' }, // NEU: Führung

    // 4. Interessen & Fachkompetenzen (Stark erweitert)
    // Handwerk & Technik
    { id: 'fach_handwerk', category: 'Interessen', text: 'Ich arbeite gerne mit meinen Händen (Bauen, Reparieren, Basteln).' }, // NEU
    { id: 'fach_technik', category: 'Interessen', text: 'Mich interessiert, wie Maschinen oder Technik funktionieren.' }, // NEU
    
    // PC & Medien
    { id: 'fach_pc', category: 'Interessen', text: 'Ich kenne mich gut am Computer aus und löse PC-Probleme selbst.' },
    { id: 'fach_medien', category: 'Interessen', text: 'Ich erstelle gerne Fotos, Videos oder Social-Media Posts.' }, // NEU
    
    // Kreativität
    { id: 'fach_kunst', category: 'Interessen', text: 'Ich bin kreativ und gestalte gerne Dinge (Zeichnen, Design).' }, // NEU
    { id: 'fach_schreib', category: 'Interessen', text: 'Ich schreibe gerne Texte oder Geschichten.' },
    
    // Theorie & Zahlen
    { id: 'fach_mathe', category: 'Interessen', text: 'Ich kann gut mit Zahlen umgehen und rechne gerne.' },
    { id: 'fach_natwi', category: 'Interessen', text: 'Naturwissenschaften (Bio, Chemie, Physik) finde ich spannend.' },
    { id: 'fach_sprache', category: 'Interessen', text: 'Ich spreche oder lerne gerne Fremdsprachen.' },
    
    // Menschen & Service
    { id: 'fach_pflege', category: 'Interessen', text: 'Ich kümmere mich gerne um Menschen, die Hilfe brauchen.' }, // NEU
    { id: 'fach_kinder', category: 'Interessen', text: 'Ich beschäftige mich gerne mit Kindern.' }, // NEU
    { id: 'fach_verkauf', category: 'Interessen', text: 'Ich kann andere gut von meiner Meinung überzeugen oder Dinge verkaufen.' }, // NEU

    // 5. Typ & Umgebung
    { id: 'env_buero', category: 'Typfrage', text: 'Ich möchte später lieber im Büro arbeiten als in einer Werkstatt.' },
    { id: 'env_draussen', category: 'Typfrage', text: 'Ich bin gerne draußen, egal wie das Wetter ist.' }, // NEU
    { id: 'env_koerper', category: 'Typfrage', text: 'Ich möchte mich bei der Arbeit körperlich anstrengen (Anpacken).' }, // NEU
    { id: 'env_unterwegs', category: 'Typfrage', text: 'Ich fände es toll, beruflich viel unterwegs zu sein (Fahrzeuge, Reisen).' } // NEU
];

// --- Dark Mode Management ---
function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    
    if (!darkModeToggle || !darkModeIcon) return;
    
    // Funktion zum Setzen des Themes
    function setTheme(mode) {
        const root = document.documentElement;
        root.classList.remove('dark-mode', 'light-mode');
        
        if (mode === 'dark') {
            root.classList.add('dark-mode');
            darkModeIcon.className = 'ph-bold ph-sun';
            darkModeToggle.setAttribute('aria-label', 'Light Mode aktivieren');
        } else if (mode === 'light') {
            root.classList.add('light-mode');
            darkModeIcon.className = 'ph-bold ph-moon';
            darkModeToggle.setAttribute('aria-label', 'Dark Mode aktivieren');
        } else {
            // Auto mode - folge System-Präferenz
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                root.classList.add('dark-mode');
                darkModeIcon.className = 'ph-bold ph-sun';
            } else {
                root.classList.add('light-mode');
                darkModeIcon.className = 'ph-bold ph-moon';
            }
            darkModeToggle.setAttribute('aria-label', 'Dark Mode umschalten');
        }
        
        localStorage.setItem('darkMode', mode);
    }
    
    // Initialisierung
    if (savedMode) {
        setTheme(savedMode);
    } else {
        // Keine gespeicherte Präferenz - folge System
        setTheme('auto');
    }
    
    // Toggle-Button Event
    darkModeToggle.addEventListener('click', () => {
        const currentMode = localStorage.getItem('darkMode') || 'auto';
        let nextMode;
        
        if (currentMode === 'auto') {
            nextMode = 'dark';
        } else if (currentMode === 'dark') {
            nextMode = 'light';
        } else {
            nextMode = 'auto';
        }
        
        setTheme(nextMode);
    });
    
    // System-Präferenz-Änderungen überwachen (nur wenn auto aktiv)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const currentMode = localStorage.getItem('darkMode') || 'auto';
        if (currentMode === 'auto') {
            setTheme('auto');
        }
    });
}

// Initialisiere Dark Mode beim Laden
document.addEventListener('DOMContentLoaded', initDarkMode);

// State
let currentStep = 0;
let answers = {};
let graduation = "";
let lastActiveScreen = 'intro';
let lastCategory = null;

// DOM Referenzen
const screens = {
    intro: document.getElementById('intro-screen'),
    quiz: document.getElementById('quiz-screen'),
    text: document.getElementById('text-screen'),
    result: document.getElementById('result-screen'),
    info: document.getElementById('info-screen') 
};

// --- Navigation ---

function showScreen(screenKey) {
    const target = screens[screenKey];
    if (!target) return;

    // Alle Screens ausblenden
    Object.values(screens).forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });

    // Neuen Screen anzeigen
    target.classList.remove('hidden');
    // Kurzer Timeout für CSS Animation
    setTimeout(() => target.classList.add('active'), 10);
    window.scrollTo(0, 0);
}

function openInfo() {
    // Merken wo wir waren
    for (const [key, element] of Object.entries(screens)) {
        if (!element.classList.contains('hidden') && key !== 'info') {
            lastActiveScreen = key;
            break;
        }
    }
    showScreen('info');
    // Bottom-Nav ausblenden im Info-Screen
    document.querySelector('.bottom-nav').classList.add('hidden');
}

function closeInfo() {
    showScreen(lastActiveScreen);
    // Bottom-Nav wieder einblenden
    document.querySelector('.bottom-nav').classList.remove('hidden');
}

function updateProgressBar() {
    const totalSteps = questions.length + 2; 
    const currentProgress = currentStep + 1; 
    const percentage = (currentProgress / totalSteps) * 100;
    const progressBar = document.getElementById('progressBar');
    const progressWrapper = document.querySelector('.progress-wrapper');
    
    progressBar.style.width = `${percentage}%`;
    
    // ARIA-Attribute für Progress Bar
    if (progressWrapper) {
        progressWrapper.setAttribute('aria-valuenow', Math.round(percentage));
        progressWrapper.setAttribute('aria-valuetext', `${Math.round(percentage)}% abgeschlossen`);
    }
    
    // Entferne border-radius wenn 100% erreicht
    if (percentage >= 100) {
        progressBar.style.borderRadius = '0';
    }
    
    // Kategorie-Info im Fortschrittsbalken anzeigen
    if (currentStep < questions.length) {
        const q = questions[currentStep];
        const categoryInfo = document.getElementById('progressCategoryInfo');
        if (categoryInfo) {
            // Zähle Fragen in dieser Kategorie
            const categoryQuestions = questions.filter(qq => qq.category === q.category);
            const categoryIndex = categoryQuestions.findIndex(qq => qq.id === q.id);
            const categoryProgress = categoryIndex + 1;
            const categoryTotal = categoryQuestions.length;
            
            categoryInfo.textContent = `${q.category} ${categoryProgress}/${categoryTotal}`;
            categoryInfo.style.display = 'block';
            categoryInfo.setAttribute('aria-label', `Aktuelle Kategorie: ${q.category}, Frage ${categoryProgress} von ${categoryTotal}`);
        }
    } else {
        const categoryInfo = document.getElementById('progressCategoryInfo');
        if (categoryInfo) {
            categoryInfo.style.display = 'none';
        }
    }
}


// --- Motivations-Feedback ---
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const emojis = {
        success: ['🎉', '✨', '👏', '💪', '🚀', '⭐'],
        info: ['💡', '📝', '🎯']
    };
    
    const emoji = emojis[type] ? emojis[type][Math.floor(Math.random() * emojis[type].length)] : '✨';
    toast.textContent = `${emoji} ${message}`;
    toast.className = `toast toast-${type} toast-show`;
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    // Für Screenreader: Text auch als aria-label setzen
    toast.setAttribute('aria-label', message);
    
    setTimeout(() => {
        toast.classList.remove('toast-show');
        // Nach Animation zurücksetzen
        setTimeout(() => {
            toast.textContent = '';
            toast.removeAttribute('aria-label');
        }, 300);
    }, 2000);
}

function getMotivationalMessage(step, total) {
    const percentage = (step / total) * 100;
    const messages = [
        { threshold: 25, text: '25% geschafft!' },
        { threshold: 50, text: '50% geschafft!' },
        { threshold: 75, text: '75% geschafft!' },
        { threshold: 90, text: 'Fast fertig!' }
    ];

    for (let i = messages.length - 1; i >= 0; i--) {
        if (percentage >= messages[i].threshold) {
            return messages[i].text;
        }
    }
    return 'Weiter so!';
}

// --- Swipe Feedback ---
function addSwipeFeedback(button) {
    button.style.transform = 'scale(0.96)';
    button.style.boxShadow = '0 2px 8px rgba(206, 17, 38, 0.2)';
}

function removeSwipeFeedback(button) {
    button.style.transform = '';
    button.style.boxShadow = '';
}

// --- Quiz Logik ---

function startQuiz() {
    const gradSelect = document.getElementById('graduation');
    if (!gradSelect.value) {
        alert("Bitte wähle erst deinen Abschluss aus.");
        return;
    }
    graduation = gradSelect.value;
    currentStep = 0; 
    answers = {}; // Reset answers
    lastCategory = null; // Reset category tracking
    showScreen('quiz');
    renderQuestion();
    updateProgressBar();
}

function renderQuestion() {
    const q = questions[currentStep];
    const categoryBadge = document.getElementById('categoryBadge');
    const questionText = document.getElementById('questionText');
    
    categoryBadge.innerText = q.category;
    categoryBadge.setAttribute('aria-label', `Aktuelle Kategorie: ${q.category}`);
    
    questionText.innerText = q.text;
    questionText.setAttribute('aria-label', `Frage ${currentStep + 1} von ${questions.length}: ${q.text}`);
    
    // Buttons zurücksetzen
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach((btn, index) => {
        btn.style.borderColor = 'transparent';
        btn.style.background = '';
        btn.setAttribute('aria-checked', 'false');
        btn.setAttribute('aria-current', 'false');
    });
    
    // Setze aria-current für aktuelle Frage
    const quizScreen = document.getElementById('quiz-screen');
    if (quizScreen) {
        quizScreen.setAttribute('aria-current', 'step');
    }
    
    // Motivations-Feedback nur bei Kategorie-Wechsel
    if (lastCategory !== null && lastCategory !== q.category) {
        const message = getMotivationalMessage(currentStep, questions.length);
        showToast(message);
    }
    lastCategory = q.category;
}

function answer(value) {
    const q = questions[currentStep];
    answers[q.id] = value; 
    answers[q.id + '_text'] = q.text;

    // Visuelles Feedback
    const btnIndex = value - 1; 
    const btns = document.querySelectorAll('.option-btn');
    
    // Alle Buttons zurücksetzen
    btns.forEach(btn => {
        btn.setAttribute('aria-checked', 'false');
        btn.style.borderColor = 'transparent';
        btn.style.background = '';
    });
    
    // Ausgewählten Button markieren
    if(btns[btnIndex]) {
        btns[btnIndex].style.borderColor = '#CE1126'; // Bremer Rot
        btns[btnIndex].style.background = '#FFEBEE'; // Hellrot
        btns[btnIndex].setAttribute('aria-checked', 'true');
        
        // ARIA-Label für Screenreader
        const labels = ['Nein', 'Eher nicht', 'Eher ja', 'Ja, voll'];
        btns[btnIndex].setAttribute('aria-label', `Antwort: ${labels[btnIndex]} - Ausgewählt`);
    }

    // Weiter zur nächsten Frage
    setTimeout(() => {
        if (currentStep < questions.length - 1) {
            currentStep++;
            renderQuestion();
            updateProgressBar();
        } else {
            currentStep++;
            updateProgressBar();
            showScreen('text');
        }
    }, 200);
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderQuestion();
        updateProgressBar();
    } else {
        showScreen('intro');
    }
}

// --- Ergebnis ---

function finishQuiz() {
    // Wir nutzen .trim(), um leere Eingaben (nur Leerzeichen) zu erkennen
    const hobbies = document.getElementById('hobbiesInput').value.trim();
    const wishes = document.getElementById('wishesInput').value.trim();

    let prompt = `Du bist ein freundlicher, motivierender Berufsberater für Schülerinnen und Schüler in Bremen.
Deine Aufgabe: Analysiere das Profil und schlage passende Berufe vor.

WICHTIG ZUR ANALYSE:
- "Soziales" hoch = Berufe mit Menschen (Pflege, Verkauf, Erziehung und so weiter).
- "Soziales" niedrig = Berufe mit Daten, Maschinen, IT und so weiter.
- "Lernen" hoch = Eher Studium oder anspruchsvolle Theorie-Ausbildung.
- "Lernen" praxisorientiert = Eher handwerkliche/duale Ausbildung.
- Achte auf spezielle Interessen wie Handwerk, Medien oder Pflege.

STRUKTUR DEINER ANTWORT:
1. Schlage 5-7 konkrete Berufe oder Berufsfelder vor.
   WICHTIG: Mische dabei gängige Berufe mit mindestens zwei eher ungewöhnlichen oder weniger bekannten Berufen, die aber gut passen könnten.
2. Erkläre bei jedem Beruf kurz, warum er zu den Antworten passt.
3. Beende deine Antwort IMMER mit einer offenen Frage, um ein Gespräch zu starten.
4. Gib abschließend Tipps, wie man das Gespräch fortsetzen kann, z.B. "Du kannst mich fragen: 'Was könnte mich noch interessieren an den Berufen?', 'Was sind Vorteile und Nachteile des Berufs?', 'Was macht daran Spaß?' oder 'Wie sieht ein typischer Arbeitstag aus?', 'Welche Berufe passen noch wahrscheinlich zu mir?'".

PROFIL:
Schulabschluss: ${graduation}
Wohnort: Bremen

ANTWORTEN (Skala 1-4):
`;

    questions.forEach(q => {
        const val = answers[q.id];
        if(val !== undefined) {
             const valText = val === 1 ? 'Nein' : val === 2 ? 'Eher nicht' : val === 3 ? 'Eher ja' : 'Ja, voll';
             // Kategorie im Prompt mitgeben hilft der KI bei der Einordnung
             prompt += `- ${q.category}: ${q.text} -> ${valText} (${val}/4)\n`;
        }
    });

    // Logik: Füge die Labels nur hinzu, wenn Text eingegeben wurde
    if (hobbies.length > 0) {
        prompt += `\nHobbys: ${hobbies}\n`;
    }
    
    if (wishes.length > 0) {
        prompt += `Wünsche: ${wishes}\n`;
    }

    document.getElementById('finalPrompt').value = prompt;
    
    // Direkt zum Prompt
    showScreen('result');
}

function copyToClipboard() {
    const text = document.getElementById('finalPrompt');
    text.select();
    navigator.clipboard.writeText(text.value).then(() => {
        const btn = document.getElementById('copyBtn');
        const originalContent = btn.innerHTML;
        const originalAriaLabel = btn.getAttribute('aria-label');
        btn.innerHTML = '<i class="ph-bold ph-check" aria-hidden="true"></i> Kopiert!';
        btn.setAttribute('aria-label', 'Prompt erfolgreich kopiert');
        btn.style.background = '#10B981'; // Grün für Erfolg
        showToast('Prompt kopiert!');
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.setAttribute('aria-label', originalAriaLabel || 'Prompt in Zwischenablage kopieren');
            btn.style.background = '#1F2937';
        }, 2000);
    }).catch(() => {
        showToast('Fehler beim Kopieren', 'info');
    });
}

// --- Download-Funktion ---
function downloadPrompt() {
    const prompt = document.getElementById('finalPrompt').value;
    const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `berufsberatung-profil-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Prompt heruntergeladen!');
}

// --- Speichern/Laden mit localStorage ---
function saveResult() {
    const prompt = document.getElementById('finalPrompt').value;
    const timestamp = new Date().toISOString();
    const resultData = {
        prompt,
        timestamp,
        graduation,
        answers: { ...answers },
        hobbies: document.getElementById('hobbiesInput').value.trim(),
        wishes: document.getElementById('wishesInput').value.trim()
    };

    let savedResults = JSON.parse(localStorage.getItem('berufsberatung_results') || '[]');
    savedResults.push(resultData);

    // Maximal 10 Ergebnisse speichern
    if (savedResults.length > 10) {
        savedResults = savedResults.slice(-10);
    }

    localStorage.setItem('berufsberatung_results', JSON.stringify(savedResults));
    showToast('Ergebnis gespeichert!');
    loadSavedResults();
}

function loadSavedResults() {
    const savedResults = JSON.parse(localStorage.getItem('berufsberatung_results') || '[]');
    const section = document.getElementById('savedResultsSection');
    const list = document.getElementById('savedResultsList');
    
    if (!section || !list) return;
    
    if (savedResults.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    list.innerHTML = '';
    
    savedResults.reverse().forEach((result, index) => {
        const date = new Date(result.timestamp);
        const dateStr = date.toLocaleDateString('de-DE', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const actualIndex = savedResults.length - 1 - index;
        const item = document.createElement('div');
        item.className = 'saved-result-item';
        item.setAttribute('role', 'listitem');
        item.setAttribute('aria-label', `Gespeichertes Profil ${actualIndex + 1} vom ${dateStr}`);
        item.innerHTML = `
            <div class="saved-result-info">
                <strong>Profil #${savedResults.length - index}</strong>
                <span>${dateStr}</span>
            </div>
            <div class="saved-result-actions">
                <button class="btn-load" onclick="loadResult(${actualIndex})" aria-label="Profil ${actualIndex + 1} laden">
                    <i class="ph-bold ph-arrow-clockwise" aria-hidden="true"></i> Laden
                </button>
                <button class="btn-delete" onclick="deleteResult(${actualIndex})" aria-label="Profil ${actualIndex + 1} löschen">
                    <i class="ph-bold ph-trash" aria-hidden="true"></i>
                </button>
            </div>
        `;
        list.appendChild(item);
    });
}

function loadResult(index) {
    const savedResults = JSON.parse(localStorage.getItem('berufsberatung_results') || '[]');
    if (index < 0 || index >= savedResults.length) return;

    const result = savedResults[savedResults.length - 1 - index];
    document.getElementById('finalPrompt').value = result.prompt;
    showToast('Ergebnis geladen!');
}

function deleteResult(index) {
    let savedResults = JSON.parse(localStorage.getItem('berufsberatung_results') || '[]');
    const actualIndex = savedResults.length - 1 - index;
    savedResults.splice(actualIndex, 1);
    localStorage.setItem('berufsberatung_results', JSON.stringify(savedResults));
    loadSavedResults();
    showToast('Ergebnis gelöscht!');
}

// Lade gespeicherte Ergebnisse beim Öffnen des Result-Screens
const originalShowScreen = showScreen;
function showScreenWithLoad(screenKey) {
    originalShowScreen(screenKey);
    if (screenKey === 'result') {
        setTimeout(loadSavedResults, 100);
    }
}
// Überschreibe showScreen
showScreen = showScreenWithLoad;