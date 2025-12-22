// --- Fragenkatalog ---
const questions = [
    // Arbeitsverhalten
    { id: 'arb_zuverlaessig', category: 'Arbeitsweise', text: 'Ich halte mich genau an Absprachen und Regeln.' },
    { id: 'arb_tempo', category: 'Arbeitsweise', text: 'Ich werde mit Aufgaben in der Schule meistens rechtzeitig fertig.' },
    { id: 'arb_plan', category: 'Arbeitsweise', text: 'Bevor ich anfange, mache ich mir einen Plan.' },
    { id: 'arb_org', category: 'Arbeitsweise', text: 'Ich organisiere gerne, wer in einer Gruppe was macht.' },
    { id: 'arb_geschick', category: 'Arbeitsweise', text: 'Ich bin geschickt im Umgang mit Werkzeug oder Bastelmaterial.' },
    { id: 'arb_ordung', category: 'Arbeitsweise', text: 'Mein Arbeitsplatz ist meistens ordentlich.' },
    { id: 'arb_kreativ', category: 'Arbeitsweise', text: 'Ich habe oft neue Ideen und bin kreativ.' },
    { id: 'arb_problem', category: 'Arbeitsweise', text: 'Ich löse gerne knifflige Aufgaben oder Rätsel.' },

    // Lernverhalten
    { id: 'lern_selbst', category: 'Lernen', text: 'Ich kann Aufgaben erledigen, ohne ständig nachzufragen.' },
    { id: 'lern_ausdauer', category: 'Lernen', text: 'Wenn etwas schwierig ist, gebe ich nicht auf.' },
    { id: 'lern_konz', category: 'Lernen', text: 'Ich kann mich lange auf eine Sache konzentrieren.' },
    { id: 'lern_kapier', category: 'Lernen', text: 'Ich verstehe neue Dinge und Zusammenhänge schnell.' },
    { id: 'lern_motiv', category: 'Lernen', text: 'Ich lerne gerne neue Dinge.' },

    // Sozialverhalten
    { id: 'soz_team', category: 'Soziales', text: 'Ich arbeite gerne im Team.' },
    { id: 'soz_hilfe', category: 'Soziales', text: 'Ich helfe anderen gerne.' },
    { id: 'soz_kontakt', category: 'Soziales', text: 'Es fällt mir leicht, auf fremde Menschen zuzugehen.' },
    { id: 'soz_empathie', category: 'Soziales', text: 'Ich merke schnell, wie sich andere fühlen.' },
    { id: 'soz_streit', category: 'Soziales', text: 'Bei Streit versuche ich zu schlichten.' },

    // Fachkompetenzen / Interessen
    { id: 'fach_schreib', category: 'Interessen', text: 'Ich schreibe gerne Texte.' },
    { id: 'fach_mathe', category: 'Interessen', text: 'Ich kann gut mit Zahlen umgehen.' },
    { id: 'fach_natwi', category: 'Interessen', text: 'Bio, Chemie oder Physik interessieren mich.' },
    { id: 'fach_sprache', category: 'Interessen', text: 'Ich spreche oder lerne gerne Sprachen.' },
    { id: 'fach_pc', category: 'Interessen', text: 'Ich arbeite gerne am Computer.' },
    { id: 'fach_vernetz', category: 'Interessen', text: 'Ich kann Wissen gut verknüpfen.' },

    // Präferenzen
    { id: 'env_buero', category: 'Typfrage', text: 'Ich möchte lieber im Büro arbeiten als draußen/in einer Halle.' },
    { id: 'env_menschen', category: 'Typfrage', text: 'Ich möchte den ganzen Tag mit Menschen reden.' }
];

// State
let currentStep = 0;
let answers = {};
let graduation = "";
let lastActiveScreen = 'intro';

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
}

function closeInfo() {
    showScreen(lastActiveScreen);
}

function updateProgressBar() {
    const totalSteps = questions.length + 2; 
    const currentProgress = currentStep + 1; 
    const percentage = (currentProgress / totalSteps) * 100;
    document.getElementById('progressBar').style.width = `${percentage}%`;
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
    showScreen('quiz');
    renderQuestion();
    updateProgressBar();
}

function renderQuestion() {
    const q = questions[currentStep];
    document.getElementById('categoryBadge').innerText = q.category;
    document.getElementById('questionText').innerText = q.text;
    
    // Buttons zurücksetzen
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(btn => {
        btn.style.borderColor = 'transparent';
        btn.style.background = '#F9FAFB';
    });
}

function answer(value) {
    const q = questions[currentStep];
    answers[q.id] = value; 
    answers[q.id + '_text'] = q.text;

    // Visuelles Feedback
    const btnIndex = value - 1; 
    const btns = document.querySelectorAll('.option-btn');
    if(btns[btnIndex]) {
        btns[btnIndex].style.borderColor = '#CE1126'; // Bremer Rot
        btns[btnIndex].style.background = '#FFEBEE'; // Hellrot
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
    const hobbies = document.getElementById('hobbiesInput').value;
    const wishes = document.getElementById('wishesInput').value;

    let prompt = `Du bist ein freundlicher, motivierender Berufsberater für Schülerinnen und Schüler in Bremen.
Deine Aufgabe: Analysiere das Profil und schlage passende Berufe vor.

WICHTIG ZUR ANALYSE:
- "Soziales" hoch = Berufe mit Menschen (Pflege, Verkauf, Erziehung und so weiter).
- "Soziales" niedrig = Berufe mit Daten, Maschinen, IT und so weiter.
- "Lernen" hoch = Eher Studium oder anspruchsvolle Theorie-Ausbildung.
- "Lernen" praxisorientiert = Eher handwerkliche/duale Ausbildung.

STRUKTUR DEINER ANTWORT:
1. Schlage 3-5 konkrete Berufe oder Berufsfelder vor. 
   WICHTIG: Mische dabei gängige Berufe mit mindestens einem eher ungewöhnlichen oder weniger bekannten Beruf, der aber gut passen könnte.
2. Erkläre bei jedem Beruf kurz, warum er zu den Antworten passt.
3. Beende deine Antwort IMMER mit einer offenen Frage, um ein Gespräch zu starten.

PROFIL:
Schulabschluss: ${graduation}
Wohnort: Bremen

ANTWORTEN (Skala 1-4):
`;

    questions.forEach(q => {
        const val = answers[q.id];
        if(val !== undefined) {
             const valText = val === 1 ? 'Nein' : val === 2 ? 'Eher nicht' : val === 3 ? 'Eher ja' : 'Ja, voll';
             prompt += `- ${q.category}: ${q.text} -> ${valText} (${val}/4)\n`;
        }
    });

    prompt += `\nHobbys: ${hobbies}\nWünsche: ${wishes}\n`;

    document.getElementById('finalPrompt').value = prompt;
    showScreen('result');
}

function copyToClipboard() {
    const text = document.getElementById('finalPrompt');
    text.select();
    navigator.clipboard.writeText(text.value).then(() => {
        const btn = document.getElementById('copyBtn');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="ph-bold ph-check"></i> Kopiert!';
        btn.style.background = '#10B981'; // Grün für Erfolg
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = '#1F2937';
        }, 2000);
    });
}