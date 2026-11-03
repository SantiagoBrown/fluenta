import type { ListeningClip, PlacementQuestion, ReadingPassage, WritingPrompt } from '../types'

/**
 * Banco adaptativo de gramática y vocabulario.
 * 45 preguntas calibradas de A1 a C1. El motor selecciona 14 según el desempeño.
 */
export const questionBank: PlacementQuestion[] = [
  // ── A1 · dificultad 1 ────────────────────────────────────────────────
  {
    id: 'g-a1-1',
    skill: 'grammar',
    level: 'A1',
    difficulty: 1,
    prompt: 'Hi, I ___ Marta. I’m the new designer.',
    options: ['am', 'is', 'are', 'be'],
    answer: 0,
    explanation: 'Con “I” usamos siempre “am”: I am / I’m.',
  },
  {
    id: 'g-a1-2',
    skill: 'grammar',
    level: 'A1',
    difficulty: 1,
    prompt: 'She ___ in the London office.',
    options: ['works', 'work', 'working', 'is work'],
    answer: 0,
    explanation: 'En presente simple, la tercera persona singular (she) añade -s: she works.',
  },
  {
    id: 'g-a1-3',
    skill: 'grammar',
    level: 'A1',
    difficulty: 1,
    prompt: '___ you have a minute to check this?',
    options: ['Do', 'Are', 'Have', 'Does'],
    answer: 0,
    explanation: 'Las preguntas en presente simple con “you” usan el auxiliar “do”.',
  },
  {
    id: 'g-a1-4',
    skill: 'grammar',
    level: 'A1',
    difficulty: 1,
    prompt: 'The meeting is ___ Tuesday at 10.',
    options: ['in', 'on', 'at', 'to'],
    answer: 1,
    explanation: 'Usamos “on” con días de la semana: on Tuesday.',
  },
  {
    id: 'g-a1-5',
    skill: 'grammar',
    level: 'A1',
    difficulty: 1,
    prompt: 'This is Tom. ___ is our new analyst.',
    options: ['He', 'She', 'It', 'They'],
    answer: 0,
    explanation: '“Tom” es un hombre, por lo que usamos el pronombre “he”.',
  },
  {
    id: 'g-a1-6',
    skill: 'grammar',
    level: 'A1',
    difficulty: 1,
    prompt: 'I ___ coffee every morning before stand-up.',
    options: ['drink', 'drinks', 'drinking', 'am drink'],
    answer: 0,
    explanation: 'Con “I” el presente simple no lleva -s: I drink.',
  },
  {
    id: 'v-a1-1',
    skill: 'vocabulary',
    level: 'A1',
    difficulty: 1,
    prompt: 'A person who leads a team is a ___.',
    options: ['manager', 'assistant', 'intern', 'client'],
    answer: 0,
    explanation: '“Manager” es la persona que dirige o gestiona un equipo.',
  },
  {
    id: 'v-a1-2',
    skill: 'vocabulary',
    level: 'A1',
    difficulty: 1,
    prompt: 'You use a ___ to write emails.',
    options: ['keyboard', 'printer', 'scanner', 'headset'],
    answer: 0,
    explanation: '“Keyboard” es el teclado con el que escribes.',
  },

  // ── A2 · dificultad 2 ────────────────────────────────────────────────
  {
    id: 'g-a2-1',
    skill: 'grammar',
    level: 'A2',
    difficulty: 2,
    prompt: 'I’ve worked at this company ___ three years.',
    options: ['since', 'for', 'from', 'during'],
    answer: 1,
    explanation: '“For” se usa con periodos de tiempo (three years); “since” con un punto de inicio.',
  },
  {
    id: 'g-a2-2',
    skill: 'grammar',
    level: 'A2',
    difficulty: 2,
    prompt: 'Could you ___ me the updated file?',
    options: ['send', 'sends', 'sending', 'sent'],
    answer: 0,
    explanation: 'Después de “could you” usamos el verbo en infinitivo sin “to”.',
  },
  {
    id: 'g-a2-3',
    skill: 'grammar',
    level: 'A2',
    difficulty: 2,
    prompt: 'This report is ___ than the previous one.',
    options: ['more detailed', 'most detailed', 'detailed more', 'more detail'],
    answer: 0,
    explanation: 'El comparativo de un adjetivo largo se forma con “more”: more detailed than.',
  },
  {
    id: 'g-a2-4',
    skill: 'grammar',
    level: 'A2',
    difficulty: 2,
    prompt: 'We need to ___ the meeting until Thursday.',
    options: ['postpone', 'postponed', 'postponing', 'postponement'],
    answer: 0,
    explanation: 'Después de “need to” usamos el infinitivo: need to postpone.',
  },
  {
    id: 'g-a2-5',
    skill: 'grammar',
    level: 'A2',
    difficulty: 2,
    prompt: 'She’s responsible ___ the quarterly budget.',
    options: ['of', 'for', 'to', 'with'],
    answer: 1,
    explanation: 'La colocación correcta es “responsible for”.',
  },
  {
    id: 'g-a2-6',
    skill: 'grammar',
    level: 'A2',
    difficulty: 2,
    prompt: 'If the client calls, ___ a message, please.',
    options: ['take', 'takes', 'taking', 'took'],
    answer: 0,
    explanation: 'En el imperativo usamos el verbo base: take a message.',
  },
  {
    id: 'v-a2-1',
    skill: 'vocabulary',
    level: 'A2',
    difficulty: 2,
    prompt: 'Please ___ the document to the email.',
    options: ['attach', 'join', 'connect', 'add'],
    answer: 0,
    explanation: '“Attach” es adjuntar un archivo a un correo.',
  },
  {
    id: 'v-a2-2',
    skill: 'vocabulary',
    level: 'A2',
    difficulty: 2,
    prompt: 'A ___ is the fixed time by which something must be finished.',
    options: ['deadline', 'schedule', 'meeting', 'break'],
    answer: 0,
    explanation: '“Deadline” es la fecha o hora límite de entrega.',
  },

  // ── B1 · dificultad 3 ────────────────────────────────────────────────
  {
    id: 'g-b1-1',
    skill: 'grammar',
    level: 'B1',
    difficulty: 3,
    prompt: 'I’m looking forward to ___ the new team.',
    options: ['meet', 'meeting', 'met', 'to meet'],
    answer: 1,
    explanation: '“Look forward to” va seguido de gerundio (-ing).',
  },
  {
    id: 'g-b1-2',
    skill: 'grammar',
    level: 'B1',
    difficulty: 3,
    prompt: 'By the time we arrived, the meeting ___.',
    options: ['already started', 'had already started', 'has already started', 'was already starting'],
    answer: 1,
    explanation: 'Para una acción anterior a otra en el pasado usamos past perfect: had already started.',
  },
  {
    id: 'g-b1-3',
    skill: 'grammar',
    level: 'B1',
    difficulty: 3,
    prompt: 'If I ___ more time, I’d review the contract today.',
    options: ['have', 'had', 'will have', 'would have'],
    answer: 1,
    explanation: 'Segundo condicional: If + past simple, would + infinitivo.',
  },
  {
    id: 'g-b1-4',
    skill: 'grammar',
    level: 'B1',
    difficulty: 3,
    prompt: 'The proposal must ___ by Friday.',
    options: ['be submitted', 'submit', 'submitted', 'be submit'],
    answer: 0,
    explanation: 'Pasiva con modal: must + be + participio pasado.',
  },
  {
    id: 'g-b1-5',
    skill: 'grammar',
    level: 'B1',
    difficulty: 3,
    prompt: 'Could you keep me ___ the loop on this?',
    options: ['in', 'on', 'at', 'with'],
    answer: 0,
    explanation: 'La expresión fija es “keep someone in the loop”.',
  },
  {
    id: 'g-b1-6',
    skill: 'grammar',
    level: 'B1',
    difficulty: 3,
    prompt: 'We’ve been working ___ this project since March.',
    options: ['in', 'on', 'for', 'at'],
    answer: 1,
    explanation: 'Se trabaja “on” un proyecto: work on a project.',
  },
  {
    id: 'v-b1-1',
    skill: 'vocabulary',
    level: 'B1',
    difficulty: 3,
    prompt: 'To “postpone” a meeting means to ___.',
    options: ['cancel it', 'move it to a later time', 'make it shorter', 'repeat it'],
    answer: 1,
    explanation: '“Postpone” significa aplazar o mover a una fecha posterior.',
  },
  {
    id: 'v-b1-2',
    skill: 'vocabulary',
    level: 'B1',
    difficulty: 3,
    prompt: 'If you “follow up”, you ___.',
    options: ['check on progress', 'make a new plan', 'end a project', 'complain formally'],
    answer: 0,
    explanation: '“Follow up” es hacer seguimiento de algo pendiente.',
  },
  {
    id: 'v-b1-3',
    skill: 'vocabulary',
    level: 'B1',
    difficulty: 3,
    prompt: '“Stakeholders” are people who ___.',
    options: ['have an interest in a project', 'work only in IT', 'own the company', 'attend every meeting'],
    answer: 0,
    explanation: 'Los stakeholders son todas las partes interesadas o afectadas por un proyecto.',
  },

  // ── B2 · dificultad 4 ────────────────────────────────────────────────
  {
    id: 'g-b2-1',
    skill: 'grammar',
    level: 'B2',
    difficulty: 4,
    prompt: 'Had we known about the delay, we ___ differently.',
    options: ['would act', 'would have acted', 'had acted', 'will act'],
    answer: 1,
    explanation: 'Tercer condicional invertido: Had + sujeto + participio, would have + participio.',
  },
  {
    id: 'g-b2-2',
    skill: 'grammar',
    level: 'B2',
    difficulty: 4,
    prompt: 'The team is expected ___ the deadline.',
    options: ['meeting', 'to meet', 'meet', 'met'],
    answer: 1,
    explanation: '“Be expected to” + infinitivo: is expected to meet.',
  },
  {
    id: 'g-b2-3',
    skill: 'grammar',
    level: 'B2',
    difficulty: 4,
    prompt: '___ the budget cuts, the project moved forward.',
    options: ['Despite', 'Although', 'However', 'Even'],
    answer: 0,
    explanation: '“Despite” va seguido de sustantivo; “although” necesitaría una cláusula completa.',
  },
  {
    id: 'g-b2-4',
    skill: 'grammar',
    level: 'B2',
    difficulty: 4,
    prompt: 'I’d rather you ___ the client directly.',
    options: ['call', 'called', 'calling', 'to call'],
    answer: 1,
    explanation: '“I’d rather you” + past simple para expresar preferencia sobre otra persona.',
  },
  {
    id: 'g-b2-5',
    skill: 'grammar',
    level: 'B2',
    difficulty: 4,
    prompt: 'She’s not only efficient ___ extremely reliable.',
    options: ['and', 'but also', 'as well', 'also'],
    answer: 1,
    explanation: 'La correlación correcta es “not only … but also …”.',
  },
  {
    id: 'g-b2-6',
    skill: 'grammar',
    level: 'B2',
    difficulty: 4,
    prompt: 'The report ___ by the board yesterday.',
    options: ['approved', 'was approved', 'has approved', 'is approving'],
    answer: 1,
    explanation: 'Pasiva en pasado simple: was + participio pasado.',
  },
  {
    id: 'v-b2-1',
    skill: 'vocabulary',
    level: 'B2',
    difficulty: 4,
    prompt: 'To “mitigate” a risk means to ___ it.',
    options: ['reduce', 'ignore', 'create', 'increase'],
    answer: 0,
    explanation: '“Mitigate” significa reducir la gravedad o el impacto de algo.',
  },
  {
    id: 'v-b2-2',
    skill: 'vocabulary',
    level: 'B2',
    difficulty: 4,
    prompt: '“Feasible” most nearly means ___.',
    options: ['possible', 'expensive', 'urgent', 'confidential'],
    answer: 0,
    explanation: '“Feasible” describe algo viable o factible.',
  },
  {
    id: 'v-b2-3',
    skill: 'vocabulary',
    level: 'B2',
    difficulty: 4,
    prompt: 'To “leverage” a resource means to ___.',
    options: ['use it to your advantage', 'replace it', 'hide it', 'sell it'],
    answer: 0,
    explanation: '“Leverage” es aprovechar o sacar ventaja de un recurso.',
  },
  {
    id: 'v-b2-4',
    skill: 'vocabulary',
    level: 'B2',
    difficulty: 4,
    prompt: '“Ambiguous” instructions are ___.',
    options: ['unclear', 'too detailed', 'too long', 'illegal'],
    answer: 0,
    explanation: '“Ambiguous” significa que admite más de una interpretación; poco claro.',
  },

  // ── C1 · dificultad 5 ────────────────────────────────────────────────
  {
    id: 'g-c1-1',
    skill: 'grammar',
    level: 'C1',
    difficulty: 5,
    prompt: 'Were the merger to proceed, it ___ significant restructuring.',
    options: ['entails', 'would entail', 'will entail', 'had entailed'],
    answer: 1,
    explanation: 'Condicional invertido formal: Were + sujeto + to + infinitivo, would + infinitivo.',
  },
  {
    id: 'g-c1-2',
    skill: 'grammar',
    level: 'C1',
    difficulty: 5,
    prompt: 'Little ___ that the deal would collapse.',
    options: ['we knew', 'did we know', 'we did know', 'had we known'],
    answer: 1,
    explanation: 'Tras “little” al inicio de oración se invierte el orden: did we know.',
  },
  {
    id: 'g-c1-3',
    skill: 'grammar',
    level: 'C1',
    difficulty: 5,
    prompt: 'The board deferred the decision, ___ more time for analysis.',
    options: ['allowing', 'allowed', 'to allow', 'allows'],
    answer: 0,
    explanation: 'La participial clause “allowing…” expresa el resultado de la acción principal.',
  },
  {
    id: 'g-c1-4',
    skill: 'grammar',
    level: 'C1',
    difficulty: 5,
    prompt: 'It is imperative that the report ___ by Monday.',
    options: ['is', 'be', 'will be', 'was'],
    answer: 1,
    explanation: 'Tras “it is imperative that” se usa el subjuntivo: be submitted.',
  },
  {
    id: 'g-c1-5',
    skill: 'grammar',
    level: 'C1',
    difficulty: 5,
    prompt: 'His argument is persuasive, ___ it overlooks the regulatory risk.',
    options: ['albeit', 'although', 'despite', 'nevertheless'],
    answer: 1,
    explanation: '“Although” introduce una cláusula con sujeto y verbo; “albeit” iría con una frase sin verbo.',
  },
  {
    id: 'g-c1-6',
    skill: 'grammar',
    level: 'C1',
    difficulty: 5,
    prompt: '___ had she finished the presentation when the fire alarm went off.',
    options: ['Hardly', 'No sooner', 'Rarely', 'Scarcely'],
    answer: 0,
    explanation: '“Hardly … when” es la correlación correcta; “no sooner” se combina con “than”.',
  },
  {
    id: 'v-c1-1',
    skill: 'vocabulary',
    level: 'C1',
    difficulty: 5,
    prompt: 'To “circumvent” a rule is to ___ it.',
    options: ['avoid', 'follow', 'enforce', 'rewrite'],
    answer: 0,
    explanation: '“Circumvent” es evitar o sortear una norma, a menudo de forma ingeniosa.',
  },
  {
    id: 'v-c1-2',
    skill: 'vocabulary',
    level: 'C1',
    difficulty: 5,
    prompt: '“Pragmatic” decisions are based on ___.',
    options: ['practical results', 'emotions', 'tradition', 'ideology'],
    answer: 0,
    explanation: '“Pragmatic” se centra en lo práctico y en resultados reales.',
  },
  {
    id: 'v-c1-3',
    skill: 'vocabulary',
    level: 'C1',
    difficulty: 5,
    prompt: 'If a proposal is “tenable”, it is ___.',
    options: ['defensible', 'impossible', 'expensive', 'popular'],
    answer: 0,
    explanation: '“Tenable” describe una posición que se puede defender o sostener.',
  },
  {
    id: 'v-c1-4',
    skill: 'vocabulary',
    level: 'C1',
    difficulty: 5,
    prompt: 'To “underscore” a point is to ___ it.',
    options: ['emphasize', 'ignore', 'repeat', 'oppose'],
    answer: 0,
    explanation: '“Underscore” significa subrayar o enfatizar una idea.',
  },
]

export const readingPassages: ReadingPassage[] = [
  {
    id: 'r-a1',
    level: 'A1',
    title: 'New coffee machine',
    kind: 'Aviso interno',
    text: `Subject: New coffee machine

Hi everyone,

We have a new coffee machine in the kitchen on the second floor. It is next to the window. You can use it from 8 a.m. to 6 p.m. The coffee is free, but please bring your own cup. Tea and hot chocolate are also available.

On Monday, the machine will be cleaned from 12 p.m. to 1 p.m., so it will not work during lunch.

If you have a problem, please call Facilities at extension 204.

Thank you,
Facilities Team`,
    questions: [
      {
        prompt: 'Where is the new coffee machine?',
        options: ['In the kitchen on the second floor', 'In the meeting room', 'At reception', 'On the third floor'],
        answer: 0,
        explanation: 'El aviso dice “in the kitchen on the second floor”.',
      },
      {
        prompt: 'When can you NOT use the machine?',
        options: ['Monday from 12 p.m. to 1 p.m.', 'Every morning before 8 a.m.', 'Friday afternoon', 'After 6 p.m.'],
        answer: 0,
        explanation: 'El lunes estará en limpieza de 12 a 1, justo en la hora de comer.',
      },
      {
        prompt: 'What should you bring?',
        options: ['Your own cup', 'Your own coffee', 'A chair', 'A key'],
        answer: 0,
        explanation: 'El texto pide “bring your own cup”.',
      },
      {
        prompt: 'Who should you call if there is a problem?',
        options: ['Facilities, extension 204', 'The kitchen team', 'Your manager', 'The coffee supplier'],
        answer: 0,
        explanation: 'El aviso indica llamar a Facilities a la extensión 204.',
      },
    ],
  },
  {
    id: 'r-a2',
    level: 'A2',
    title: 'The new hybrid schedule',
    kind: 'Correo de dirección',
    text: `From: People Operations
To: All staff
Subject: Our new hybrid schedule

Hi everyone,

Starting next month, we will move to a hybrid schedule. Employees will work from the office on Tuesdays and Thursdays. On Mondays, Wednesdays and Fridays, you can work from home if your role allows it.

The office will remain open every day for people who prefer to come in. However, the number of desks is limited, so please book a desk before 5 p.m. on the day before you visit.

Team meetings should take place on office days whenever possible. If your team needs a different arrangement, discuss it with your manager and send the final schedule to People Operations by the 20th.

We will review the new schedule after three months. Your feedback is important, so there will be a short survey in June.

Best regards,
People Operations`,
    questions: [
      {
        prompt: 'On which days must employees go to the office?',
        options: ['Tuesdays and Thursdays', 'Mondays and Fridays', 'Every day', 'Wednesdays only'],
        answer: 0,
        explanation: 'El correo establece oficina obligatoria martes y jueves.',
      },
      {
        prompt: 'What do employees need to do before visiting the office?',
        options: ['Book a desk by 5 p.m. the day before', 'Ask their manager for permission', 'Print the schedule', 'Arrive before 9 a.m.'],
        answer: 0,
        explanation: 'Hay que reservar escritorio antes de las 5 p.m. del día anterior.',
      },
      {
        prompt: 'What is the deadline for a different team arrangement?',
        options: ['The 20th', 'The end of the month', 'June', 'Three months from now'],
        answer: 0,
        explanation: 'Deben enviar el horario final a People Operations antes del día 20.',
      },
      {
        prompt: 'How will the company collect feedback?',
        options: ['With a survey in June', 'In a meeting next week', 'By email to managers', 'Through a phone call'],
        answer: 0,
        explanation: 'El texto menciona una encuesta breve en junio.',
      },
    ],
  },
  {
    id: 'r-b1',
    level: 'B1',
    title: 'Why so many meetings fail',
    kind: 'Artículo de opinión',
    text: `Most professionals spend hours in meetings every week, yet many of them leave without a clear idea of what was decided. The problem is rarely the people in the room. More often, it is the lack of structure.

A good meeting starts before anyone joins the call. The organizer should define one clear purpose and decide who genuinely needs to attend. Inviting everyone “just in case” makes the conversation slower and less focused. An agenda helps, but only if it lists decisions to be made rather than topics to be discussed.

During the meeting, the person leading should protect the time. That means interrupting gently when a conversation goes off topic and making sure quieter participants have a chance to speak. It also means separating discussion from decision. A useful habit is to end every agenda item with a simple question: “What are we doing next, and who owns it?”

Finally, meetings need a clear ending. Summarizing the main points and confirming action points takes two minutes but saves hours of confusion later. If no decision is needed and no discussion is required, a short written update is almost always better than a call.

Organizations that treat meetings as a tool rather than a habit tend to move faster and waste less energy.`,
    questions: [
      {
        prompt: 'According to the text, what is the main cause of unsuccessful meetings?',
        options: ['A lack of structure', 'Too few participants', 'Poor internet connection', 'Long agendas'],
        answer: 0,
        explanation: 'El texto afirma que el problema “is rarely the people” y suele ser “the lack of structure”.',
      },
      {
        prompt: 'What should an agenda focus on?',
        options: ['Decisions to be made', 'Every possible topic', 'A list of attendees', 'The meeting room'],
        answer: 0,
        explanation: 'El texto dice que la agenda ayuda si incluye decisiones, no solo temas.',
      },
      {
        prompt: 'What does the writer suggest asking at the end of each item?',
        options: ['What are we doing next, and who owns it?', 'Who wants to leave early?', 'When is the next holiday?', 'Why are we here?'],
        answer: 0,
        explanation: 'Es la pregunta textual que propone el autor.',
      },
      {
        prompt: 'When is a written update preferable to a meeting?',
        options: ['When no decision or discussion is needed', 'When the team is large', 'When the manager is traveling', 'When the meeting is online'],
        answer: 0,
        explanation: 'El texto recomienda una actualización escrita si no hace falta decidir ni debatir.',
      },
    ],
  },
  {
    id: 'r-b2',
    level: 'B2',
    title: 'The quiet rise of asynchronous work',
    kind: 'Informe de tendencias',
    text: `For years, the default response to almost any work question was a meeting. Today, a growing number of companies are experimenting with asynchronous communication: written updates, recorded videos and shared documents that people can review when it suits them.

The appeal is obvious. A 2025 survey of 1,200 knowledge workers found that employees lost an average of 6.4 hours per week to unnecessary meetings. Among teams that adopted structured async updates, reported meeting time fell by 31%, while the number of decisions documented in writing rose sharply. Supporters argue that this creates a more thoughtful culture: people have time to prepare, and quieter team members are less likely to be interrupted.

Yet asynchronous work is not a simple solution. Without clear norms, channels multiply and information becomes fragmented. New employees, in particular, can struggle to build relationships when most communication happens in writing. Several organizations report that informal mentoring has declined, even as productivity metrics have improved.

The most effective model appears to be hybrid in the truest sense: asynchronous work for information sharing, planning and deep work; synchronous time for complex problem-solving, conflict resolution and relationship building. The distinction matters. Companies that simply replace meetings with endless messages often reproduce the same inefficiency in a different format.

In short, the question is not whether meetings are good or bad. It is whether each interaction is designed for the outcome it needs to produce.`,
    questions: [
      {
        prompt: 'What did the 2025 survey find?',
        options: ['Workers lost about 6.4 hours a week to unnecessary meetings', 'Async teams were 31% less productive', 'Most employees preferred written updates', 'Meetings had increased by 31%'],
        answer: 0,
        explanation: 'El informe cita 6,4 horas semanales perdidas en reuniones innecesarias.',
      },
      {
        prompt: 'What is one risk of asynchronous work mentioned in the text?',
        options: ['Information can become fragmented', 'Employees stop using documents', 'Decisions are never documented', 'Meetings become longer'],
        answer: 0,
        explanation: 'Sin normas claras, los canales se multiplican y la información se fragmenta.',
      },
      {
        prompt: 'Which group may find async work particularly difficult?',
        options: ['New employees building relationships', 'Senior managers', 'Remote engineers', 'External clients'],
        answer: 0,
        explanation: 'El texto señala que los nuevos empleados pueden tener dificultades para crear relaciones.',
      },
      {
        prompt: 'What is the author’s conclusion?',
        options: ['Each interaction should match its intended outcome', 'Meetings should be eliminated entirely', 'Async work is always more efficient', 'Companies should return to the office'],
        answer: 0,
        explanation: 'La conclusión es que hay que diseñar cada interacción según el resultado que se busca.',
      },
    ],
  },
  {
    id: 'r-c1',
    level: 'C1',
    title: 'Leading through ambiguity',
    kind: 'Ensayo de liderazgo',
    text: `Leaders are frequently described as people who provide clarity. In practice, the most demanding moments of leadership are rarely those in which the information is available and the path is obvious. They are the moments when the data is incomplete, the stakeholders disagree and the cost of waiting exceeds the cost of being wrong.

The temptation in such situations is to project certainty. After all, teams often look to their leaders for reassurance, and indecision can be contagious. Yet false certainty carries its own price: it discourages dissent, narrows the range of options considered and makes organizations slower to correct course when new evidence emerges. The challenge, therefore, is not to eliminate ambiguity but to make it productive.

Experienced leaders tend to do three things well. First, they name the uncertainty explicitly. Rather than pretending that a decision is final, they distinguish between what is known, what is assumed and what remains to be tested. Second, they establish decision rules in advance: who decides, what would change their minds and when the decision will be revisited. This reduces the political cost of adjusting course later. Third, they create small, reversible experiments instead of betting the organization on a single forecast.

None of this guarantees a good outcome. It does, however, build the conditions in which good judgment can emerge. Teams are more likely to surface inconvenient information when admitting uncertainty is rewarded rather than punished. And stakeholders are more willing to commit to a direction when they understand the reasoning behind it, even if they do not fully agree.

Clarity, in other words, is less about having all the answers than about being transparent regarding the questions that remain.`,
    questions: [
      {
        prompt: 'What is the central argument of the essay?',
        options: ['Leaders should make ambiguity productive rather than eliminate it', 'Leaders must always project certainty', 'Data should determine every decision', 'Stakeholders should decide in uncertain times'],
        answer: 0,
        explanation: 'El ensayo sostiene que el reto no es eliminar la ambigüedad sino hacerla productiva.',
      },
      {
        prompt: 'What is one cost of false certainty mentioned by the author?',
        options: ['It discourages dissent and narrows options', 'It slows down decision-making', 'It requires more data', 'It reduces stakeholder commitment'],
        answer: 0,
        explanation: 'La falsa certeza desalienta el disenso y reduce las opciones consideradas.',
      },
      {
        prompt: 'Which practice do experienced leaders use?',
        options: ['Setting decision rules and review points in advance', 'Waiting until all information is available', 'Avoiding reversible experiments', 'Keeping uncertainty private'],
        answer: 0,
        explanation: 'El texto menciona reglas de decisión, criterios de cambio y fechas de revisión.',
      },
      {
        prompt: 'What does “clarity” mean in the author’s view?',
        options: ['Being transparent about the questions that remain', 'Having all the answers', 'Avoiding disagreement', 'Making decisions quickly'],
        answer: 0,
        explanation: 'La última frase redefine claridad como transparencia sobre lo que aún no se sabe.',
      },
    ],
  },
]

export const listeningClips: ListeningClip[] = [
  {
    id: 'l-a1',
    level: 'A1',
    title: 'A call to reception',
    context: 'Una llamada breve a recepción.',
    lines: [
      { speaker: 'Reception', text: 'Good morning, Westfield Office. How can I help you?' },
      { speaker: 'Caller', text: 'Hi, this is Daniel from the design team. I have a meeting with Anna at ten.' },
      { speaker: 'Reception', text: 'Anna is on the third floor, room 3B. The lift is next to the stairs.' },
      { speaker: 'Caller', text: 'Great, thank you. And is there a coffee machine on that floor?' },
      { speaker: 'Reception', text: 'Yes, in the kitchen. It is free, but you need your own cup.' },
    ],
    questions: [
      {
        prompt: 'Who is Daniel meeting?',
        options: ['Anna', 'The receptionist', 'His manager', 'A client'],
        answer: 0,
        explanation: 'Daniel dice que tiene una reunión con Anna a las diez.',
      },
      {
        prompt: 'Where is the meeting?',
        options: ['Room 3B on the third floor', 'The kitchen', 'The reception desk', 'Room 10B'],
        answer: 0,
        explanation: 'Recepción indica la habitación 3B en la tercera planta.',
      },
      {
        prompt: 'What does Daniel need for coffee?',
        options: ['His own cup', 'A coin', 'A key card', 'Nothing'],
        answer: 0,
        explanation: 'El café es gratis, pero hay que llevar tu propia taza.',
      },
    ],
  },
  {
    id: 'l-a2',
    level: 'A2',
    title: 'Voicemail about the office move',
    context: 'Un mensaje de voz sobre una mudanza de oficina.',
    lines: [
      { speaker: 'Sofia', text: 'Hi, this is Sofia from Facilities. I’m calling about the office move on Friday.' },
      { speaker: 'Sofia', text: 'Your team will be on the fourth floor, near the meeting rooms. Please pack your things on Thursday afternoon.' },
      { speaker: 'Sofia', text: 'The IT team will move your computers on Friday morning, so please take your laptop home on Thursday.' },
      { speaker: 'Sofia', text: 'If you need boxes, come to reception before Wednesday. And please label every box with your name and department.' },
      { speaker: 'Sofia', text: 'Call me back on extension 312 if you have any questions. Thanks!' },
    ],
    questions: [
      {
        prompt: 'When is the office move?',
        options: ['Friday', 'Thursday', 'Wednesday', 'Monday'],
        answer: 0,
        explanation: 'Sofia dice que la mudanza es el viernes.',
      },
      {
        prompt: 'What should employees do on Thursday?',
        options: ['Pack their things and take their laptop home', 'Move the computers', 'Collect boxes from IT', 'Work from home'],
        answer: 0,
        explanation: 'Deben empacar el jueves y llevarse el portátil a casa.',
      },
      {
        prompt: 'Where can they get boxes?',
        options: ['At reception', 'On the fourth floor', 'From the IT team', 'In the meeting rooms'],
        answer: 0,
        explanation: 'Los materiales están en recepción antes del miércoles.',
      },
      {
        prompt: 'What must be on every box?',
        options: ['Name and department', 'A phone number', 'The office address', 'A list of contents'],
        answer: 0,
        explanation: 'Piden etiquetar cada caja con nombre y departamento.',
      },
    ],
  },
  {
    id: 'l-b1',
    level: 'B1',
    title: 'Hybrid meetings, a podcast clip',
    context: 'Un fragmento de pódcast sobre reuniones híbridas.',
    lines: [
      { speaker: 'Host', text: 'So, Laura, many teams are now hybrid. What’s the biggest mistake you see in hybrid meetings?' },
      { speaker: 'Laura', text: 'I’d say it’s treating remote participants as guests. People in the room talk to each other, and the people online can’t follow the conversation.' },
      { speaker: 'Host', text: 'How do you fix that?' },
      { speaker: 'Laura', text: 'Simple things help. Everyone joins with their own laptop, even in the office. The chair repeats questions before answering them, and we use the chat for comments so remote voices aren’t lost.' },
      { speaker: 'Host', text: 'And does that slow things down?' },
      { speaker: 'Laura', text: 'At first, maybe a little. But teams that do it well actually make decisions faster, because everyone has the same information.' },
    ],
    questions: [
      {
        prompt: 'What is Laura’s main criticism of hybrid meetings?',
        options: ['Remote participants are treated as guests', 'They are too short', 'They use too much technology', 'They happen too often'],
        answer: 0,
        explanation: 'Laura dice que se trata a los remotos como invitados y no pueden seguir la conversación.',
      },
      {
        prompt: 'What does she recommend for people in the office?',
        options: ['Join with their own laptop', 'Speak more loudly', 'Take notes for remote colleagues', 'Leave the room'],
        answer: 0,
        explanation: 'Recomienda que todos se conecten con su propio portátil, incluso en la oficina.',
      },
      {
        prompt: 'What is the benefit she mentions?',
        options: ['Faster decisions because everyone has the same information', 'Shorter meetings', 'Fewer meetings', 'Better slides'],
        answer: 0,
        explanation: 'Al final señala que así se decide más rápido al compartir la misma información.',
      },
    ],
  },
  {
    id: 'l-b2',
    level: 'B2',
    title: 'A project update with numbers',
    context: 'Actualización de un proyecto para el comité directivo.',
    lines: [
      { speaker: 'Priya', text: 'Thanks for joining. I’ll keep this short. The migration is now 78% complete, up from 54% last month.' },
      { speaker: 'Priya', text: 'We’ve moved 12,000 accounts so far, and the error rate has dropped to 0.4%, which is below our 1% target.' },
      { speaker: 'Priya', text: 'However, we’re seeing a delay in the finance module. The vendor delivered the documentation two weeks late, so testing has shifted.' },
      { speaker: 'Priya', text: 'The current plan gets us to the original deadline, but only if we add two temporary testers for three weeks. That would cost around 18,000 euros.' },
      { speaker: 'Priya', text: 'My recommendation is to approve the testers. The alternative is to delay the launch by ten days, which would affect the client commitment.' },
      { speaker: 'Chair', text: 'Can you send the cost breakdown by tomorrow? We’ll decide on Thursday.' },
    ],
    questions: [
      {
        prompt: 'What is the current completion rate?',
        options: ['78%', '54%', '12%', '0.4%'],
        answer: 0,
        explanation: 'Priya dice que la migración está al 78%, frente al 54% del mes anterior.',
      },
      {
        prompt: 'What is causing the delay?',
        options: ['Late documentation from the vendor', 'A higher error rate', 'A lack of accounts', 'An absent team member'],
        answer: 0,
        explanation: 'El proveedor entregó la documentación dos semanas tarde.',
      },
      {
        prompt: 'What does Priya recommend?',
        options: ['Approving two temporary testers', 'Delaying the launch ten days', 'Reducing the scope', 'Hiring a new vendor'],
        answer: 0,
        explanation: 'Su recomendación es aprobar dos testers temporales durante tres semanas.',
      },
      {
        prompt: 'What does the chair ask for?',
        options: ['A cost breakdown by tomorrow', 'A new deadline', 'A client meeting', 'A replacement vendor'],
        answer: 0,
        explanation: 'El presidente pide el desglose de costes para mañana y decidirán el jueves.',
      },
    ],
  },
  {
    id: 'l-c1',
    level: 'C1',
    title: 'The negotiation workshop',
    context: 'Extracto de un taller sobre negociación con stakeholders.',
    lines: [
      { speaker: 'Coach', text: 'Most people enter a negotiation assuming the pie is fixed. Why is that a mistake?' },
      { speaker: 'Participant', text: 'Because the other side may value things differently. If we focus only on price, we might miss payment terms, scope or timing.' },
      { speaker: 'Coach', text: 'Exactly. The skilled move is to surface those underlying interests before you start trading numbers. What do you do when the other party makes an aggressive opening?' },
      { speaker: 'Participant', text: 'I try not to react. I ask how they arrived at that figure, and what would need to be true for a different number to work.' },
      { speaker: 'Coach', text: 'Good. That reframes the conversation from a contest to a joint diagnosis. And if they won’t move?' },
      { speaker: 'Participant', text: 'Then I make my walk-away point explicit, but calmly. I’d rather protect the relationship and revisit later than agree to something I can’t deliver.' },
    ],
    questions: [
      {
        prompt: 'Why does the coach say a fixed-pie mindset is a mistake?',
        options: ['The other side may value different things', 'Price is always the most important factor', 'Negotiations should be avoided', 'Concessions are always necessary'],
        answer: 0,
        explanation: 'El participante señala que la otra parte puede valorar de forma distinta precio, plazos o alcance.',
      },
      {
        prompt: 'What does the participant do when facing an aggressive opening?',
        options: ['Ask how they arrived at the figure', 'Immediately counter-offer', 'End the negotiation', 'Accept to preserve the relationship'],
        answer: 0,
        explanation: 'Prefiere preguntar cómo llegaron a esa cifra antes de reaccionar.',
      },
      {
        prompt: 'How does the coach describe that approach?',
        options: ['A joint diagnosis rather than a contest', 'A hard bargaining tactic', 'A way to avoid conflict', 'A legal requirement'],
        answer: 0,
        explanation: 'El coach lo llama “joint diagnosis” en lugar de un concurso.',
      },
      {
        prompt: 'What does the participant do if the other side won’t move?',
        options: ['State a calm walk-away point', 'Lower the price', 'Escalate to a manager', 'Sign anyway'],
        answer: 0,
        explanation: 'Expone su límite con calma y prefiere retomar la conversación más adelante.',
      },
    ],
  },
]

export const writingPrompts: WritingPrompt[] = [
  {
    id: 'w-a2',
    level: 'A2',
    title: 'Reschedule a meeting',
    situation:
      'Tienes una reunión con un cliente el martes a las 10:00, pero no puedes asistir. Necesitas moverla al jueves a la misma hora.',
    task: 'Write an email to the client. Apologize, propose a new time and confirm what you will prepare for the meeting.',
    points: ['An apology', 'A new day and time', 'A reason (brief and professional)', 'What you will send before the meeting'],
    minWords: 80,
    maxWords: 130,
    model: `Subject: Rescheduling our meeting

Dear Mr. Clark,

I am writing to apologize for a change to our meeting. Unfortunately, I will not be able to attend on Tuesday at 10:00. Would it be possible to move our meeting to Thursday at 10:00 instead?

I will send the updated proposal by Wednesday afternoon so that you have time to review it before we speak.

I am sorry for any inconvenience this may cause. Please let me know if Thursday works for you.

Best regards,
Alex`,
  },
  {
    id: 'w-b1',
    level: 'B1',
    title: 'Weekly status update',
    situation:
      'Tu manager te pide un update por escrito del proyecto en el que trabajas. El proyecto va bien en general, pero hay un bloqueo con el proveedor de datos.',
    task: 'Write a status update for your manager. Summarize progress, explain the blocker and propose next steps with a date.',
    points: ['Progress since last week', 'One blocker', 'What you need or propose', 'A date for the next update'],
    minWords: 120,
    maxWords: 180,
    model: `Subject: Weekly update — Atlas project

Hi Maya,

Here is a quick update on the Atlas project.

We have completed the user research phase and shared the findings with the design team. The first prototype is now in testing, and we expect initial feedback by Friday.

The main blocker is the data supplier. They have not yet confirmed the format of the export, which may delay the integration work by one week. I have scheduled a call with them on Thursday and will ask for a written commitment.

If the format is confirmed this week, we can keep the original timeline. Otherwise, I suggest moving the integration milestone to the 24th and informing the client.

I will send the next update on Monday.

Best,
Alex`,
  },
  {
    id: 'w-b2',
    level: 'B2',
    title: 'A proposal for leadership',
    situation:
      'Tu equipo pierde demasiado tiempo en reuniones de estatus. Propones sustituir la reunión semanal por actualizaciones escritas y una sesión quincenal de decisiones.',
    task: 'Write a short proposal to the leadership team. Explain the problem, your recommendation, the expected impact and the main risk.',
    points: ['The problem and its cost', 'A clear recommendation', 'Expected impact', 'One risk and how to mitigate it'],
    minWords: 150,
    maxWords: 210,
    model: `Subject: Proposal — replacing the weekly status meeting

Dear Leadership Team,

Our weekly status meeting currently involves nine people for sixty minutes, which represents roughly nine hours of work per week. In practice, most of that time is spent sharing information rather than making decisions.

I recommend replacing the weekly call with a written update submitted every Monday, plus a biweekly decision session limited to those who need to contribute. The written format would give everyone a consistent record and allow people to read at a time that suits them.

Based on a trial with the platform team last quarter, this approach reduced meeting time by around 40% without slowing delivery. It also improved documentation, since decisions were captured in writing.

The main risk is that informal coordination may decline. To mitigate this, we would keep a short optional social slot on Fridays and review the model after six weeks.

I would welcome the opportunity to run a four-week pilot with one additional team.

Best regards,
Alex`,
  },
  {
    id: 'w-c1',
    level: 'C1',
    title: 'Responding to a difficult stakeholder',
    situation:
      'Un stakeholder influyente cuestiona públicamente la fecha de lanzamiento y sugiere recortar el alcance para cumplirla. Tú crees que recortar el alcance dañaría la propuesta de valor.',
    task: 'Write a response that acknowledges the concern, defends your position with evidence and proposes a decision path.',
    points: ['Acknowledge the stakeholder’s concern', 'Defend the scope with evidence', 'Offer a concrete alternative', 'Propose who decides and when'],
    minWords: 160,
    maxWords: 230,
    model: `Subject: Re: Launch date and scope

Dear Daniel,

Thank you for raising this openly. I share your concern about the launch date, and I agree that we cannot simply assume the current plan will hold without addressing the risk.

However, I would caution against reducing the scope at this stage. Our pilot data showed that the reporting module is the feature most closely linked to renewal intent: 68% of participants cited it as the reason they would upgrade. Removing it would allow us to launch on time, but it would significantly weaken the commercial case.

A more balanced option would be to launch the core experience on the original date while delivering the reporting module to a limited group four weeks later. This protects the value proposition and gives us real usage data before the full release.

If you agree, I suggest we ask the product council to review this option on Thursday and confirm the decision by Friday. I am happy to prepare a one-page summary of the trade-offs beforehand.

Best regards,
Alex`,
  },
]

export const levelWordBank = {
  advanced: [
    'mitigate', 'leverage', 'feasible', 'ambiguous', 'stakeholder', 'alignment', 'trade-off', 'rationale',
    'coherent', 'nuance', 'tenable', 'circumvent', 'pragmatic', 'underscore', 'compelling', 'constraint',
    'contingency', 'deliverable', 'initiative', 'insight', 'robust', 'substantiate', 'implication', 'priority',
    'allocate', 'anticipate', 'consolidate', 'differentiate', 'facilitate', 'incentive', 'integrate', 'optimize',
    'perceive', 'reinforce', 'retain', 'sustain', 'underlying', 'viable', 'warrant', 'yield',
  ],
  connectors: [
    'however', 'therefore', 'moreover', 'furthermore', 'nevertheless', 'consequently', 'although', 'whereas',
    'in addition', 'for instance', 'as a result', 'on the other hand', 'in contrast', 'that said', 'in short',
    'overall', 'firstly', 'secondly', 'finally', 'given that', 'provided that', 'despite', 'while', 'since',
  ],
}
