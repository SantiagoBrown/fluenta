import type { Stage } from '../../types'
import { mod } from './helpers'

export const stageC1: Stage = {
  level: 'C1',
  title: 'Dominio ejecutivo',
  tagline: 'Habla como el profesional que ya eres.',
  description:
    'Comunica con matiz, influye en decisiones estratégicas y escribe con la precisión de un entorno ejecutivo internacional.',
  modules: [
    mod(
      'c1-m1',
      'C1',
      'Executive presence',
      'Presencia ejecutiva',
      'Lidera conversaciones estratégicas, gestiona la ambigüedad e influye en stakeholders.',
      'Podrás dirigir una discusión ejecutiva y defender una posición con evidencia y matiz.',
      6,
      [
        {
          title: 'Lead strategic discussions',
          subtitle: 'Dirigir con claridad en la ambigüedad',
          objective: 'Estructurar una discusión estratégica y gestionar desacuerdos complejos.',
          minutes: 40,
          grammar: {
            title: 'Inversión y marcadores de discurso',
            formula: 'Not only did we…, but we also… · What matters most is… · That said, …',
            explanation:
              'La inversión enfatiza una idea: “Not only did we meet the target, but we also improved retention”. En discusiones estratégicas, los marcadores (“Let’s step back”, “That said”, “What matters most”) ordenan el pensamiento y dan tiempo para formular.',
            examples: [
              'Not only did we meet the target, but we also improved retention.',
              'What matters most is the quality of the decision.',
              'That said, we should test the assumption before committing.',
            ],
          },
          vocab: [
            { term: 'strategic', es: 'estratégico', example: 'This is a strategic decision, not a tactical one.' },
            { term: 'alignment', es: 'alineación', example: 'The meeting confirmed alignment across regions.' },
            { term: 'mandate', es: 'mandato', example: 'The team has a clear mandate to simplify the process.' },
            { term: 'ambiguity', es: 'ambigüedad', example: 'We need to act despite the ambiguity.' },
          ],
          phrases: [
            { en: 'Let’s step back for a moment.', es: 'Demos un paso atrás un momento.' },
            { en: 'The way I see it, we have two options.', es: 'Desde mi punto de vista, tenemos dos opciones.' },
            { en: 'What would it take to make this work?', es: '¿Qué haría falta para que esto funcione?' },
            { en: 'Let’s park that and return to the main decision.', es: 'Dejemos eso y volvamos a la decisión principal.' },
          ],
          dialogue: {
            context: 'Reunión de liderazgo sobre la expansión a un nuevo mercado.',
            lines: [
              { speaker: 'Chair', text: 'We have limited data on the new market. Should we wait or move now?' },
              { speaker: 'Ana', text: 'Let’s step back for a moment. What would it take to make a decision with confidence?' },
              { speaker: 'Daniel', text: 'A pilot would give us better data, but it delays revenue by two quarters.' },
              { speaker: 'Ana', text: 'The way I see it, we have two options: a small pilot now or a full launch later.' },
              { speaker: 'Chair', text: 'What matters most is not being late to the market.' },
              { speaker: 'Ana', text: 'That said, a failed launch is more expensive than a delayed one. I’d favor a contained pilot with a clear exit point.' },
              { speaker: 'Chair', text: 'Agreed. Let’s define the pilot scope and review in eight weeks.' },
            ],
            question: {
              prompt: 'What does Ana recommend?',
              options: ['A contained pilot with a clear exit point', 'A full launch immediately', 'Waiting two quarters', 'Cancelling the expansion'],
              answer: 0,
              explanation: 'Ana se inclina por un piloto contenido con un punto de salida claro.',
            },
          },
          check: {
            prompt: 'Not only ___ the target, but we also improved retention.',
            options: ['did we meet', 'we met', 'we did meet', 'have we met'],
            answer: 0,
            explanation: 'Tras “not only” al inicio se invierte el orden con el auxiliar: did we meet.',
          },
          task: {
            kind: 'speaking',
            title: 'Lead a strategic discussion',
            prompt:
              'Dirige una discusión de tres minutos sobre si entrar en un nuevo mercado ahora o esperar. Abre, enmarca el problema, pide perspectivas y cierra con una decisión condicional.',
            points: ['Frame the decision', 'Invite two perspectives', 'Name the key trade-off', 'Close with a conditional decision'],
            model:
              'Let’s step back for a moment. The real question is not whether the market is attractive, but what level of evidence we need before committing. Daniel, what’s your view on the risk? … The way I see it, the trade-off is speed versus learning. That said, a failed launch would cost more than a short delay. I suggest a contained pilot with a clear exit point, and a decision in eight weeks based on two metrics.',
          },
        },
        {
          title: 'Influence stakeholders',
          subtitle: 'Construir narrativa y buy-in',
          objective: 'Adaptar el mensaje a distintos stakeholders y construir credibilidad.',
          minutes: 40,
          grammar: {
            title: 'Hedging y estructuras retóricas',
            formula: 'The evidence points to… · I’d go so far as to say… · What’s at stake is…',
            explanation:
              'El hedging calibra la fuerza de una afirmación: “The evidence points to…” es más defendible que “This proves…”. Las estructuras retóricas (“What’s at stake is…”) conectan los datos con lo que le importa a la audiencia.',
            examples: [
              'The evidence points to a clear shift in behavior.',
              'I’d go so far as to say this is an existential risk.',
              'What’s at stake here is our credibility with enterprise clients.',
            ],
          },
          vocab: [
            { term: 'stakeholder', es: 'parte interesada', example: 'Each stakeholder has a different priority.' },
            { term: 'buy-in', es: 'apoyo', example: 'We need buy-in from the regional leads.' },
            { term: 'narrative', es: 'narrativa', example: 'The narrative should focus on customer value.' },
            { term: 'credibility', es: 'credibilidad', example: 'Consistency builds credibility over time.' },
          ],
          phrases: [
            { en: 'The evidence points to a change in demand.', es: 'La evidencia apunta a un cambio en la demanda.' },
            { en: 'I’d go so far as to say this is urgent.', es: 'Incluso diría que esto es urgente.' },
            { en: 'What’s at stake here is client trust.', es: 'Lo que está en juego es la confianza del cliente.' },
            { en: 'Let me put this into perspective.', es: 'Permíteme poner esto en perspectiva.' },
          ],
          dialogue: {
            context: 'Presentación a un stakeholder escéptico.',
            lines: [
              { speaker: 'Investor', text: 'Why should we prioritize this now? The numbers look small.' },
              { speaker: 'Ana', text: 'Let me put this into perspective. The segment is small today, but it accounts for 60% of new enterprise demand.' },
              { speaker: 'Investor', text: 'That’s a projection, not a fact.' },
              { speaker: 'Ana', text: 'Fair point. The evidence points to that direction, though I’d treat the 60% as an upper estimate.' },
              { speaker: 'Investor', text: 'And if you’re wrong?' },
              { speaker: 'Ana', text: 'What’s at stake is our credibility with enterprise clients. That’s why I’m proposing a six-month pilot with a fixed budget, not a full commitment.' },
              { speaker: 'Investor', text: 'That’s a more defensible ask. Send me the pilot design.' },
            ],
            question: {
              prompt: 'How does Ana respond to the investor’s skepticism?',
              options: ['She acknowledges the estimate and proposes a limited pilot', 'She insists the projection is exact', 'She ends the meeting', 'She asks for a larger budget'],
              answer: 0,
              explanation: 'Ana reconoce que el 60% es una estimación superior y propone un piloto de seis meses.',
            },
          },
          check: {
            prompt: 'The evidence ___ a clear shift in customer behavior.',
            options: ['points to', 'point to', 'is point to', 'pointing'],
            answer: 0,
            explanation: '“Evidence” es incontable y singular: points to.',
          },
          task: {
            kind: 'writing',
            title: 'Persuasive memo',
            prompt:
              'Escribe un memo de 160–200 palabras a un stakeholder escéptico para conseguir apoyo a un piloto. Reconoce el riesgo, aporta evidencia y explica qué está en juego.',
            points: ['Acknowledge their concern', 'Evidence with a caveat', 'What is at stake', 'A specific, limited ask'],
            model:
              'Subject: A contained pilot for the enterprise segment\n\nDear Elena,\n\nThank you for challenging the projections. You’re right that the segment is small today, and I don’t want to overstate the case. The evidence points to a clear shift in demand: enterprise enquiries have grown 28% year on year, and our win rate in that segment is 14 points above the average.\n\nThat said, the 60% figure in the deck is an upper estimate, not a forecast. I would treat it as a hypothesis to test rather than a reason to commit.\n\nWhat’s at stake is our credibility with enterprise clients. If we enter with a partial offer, we may struggle to recover. If we wait too long, competitors will set the standard.\n\nI’m therefore asking for a six-month pilot with a fixed budget and two clear success metrics, not a full investment. If the metrics are not met, we stop. I would welcome 20 minutes to review the design with you.',
            minWords: 150,
          },
        },
      ],
    ),
    mod(
      'c1-m2',
      'C1',
      'Advanced writing',
      'Escritura avanzada',
      'Escribe con cohesión, concisión y el registro adecuado para audiencias ejecutivas.',
      'Podrás producir propuestas y correos con tono preciso, incluso en situaciones delicadas.',
      6,
      [
        {
          title: 'Executive summaries & proposals',
          subtitle: 'Concisión y cohesión',
          objective: 'Escribir un resumen ejecutivo y una propuesta de una página.',
          minutes: 40,
          grammar: {
            title: 'Cohesión y concisión',
            formula: 'This proposal outlines… · Subject to… · We seek approval to…',
            explanation:
              'Un texto ejecutivo prioriza la información: problema, recomendación, evidencia, riesgo y petición. La cohesión se logra repitiendo conceptos clave (no sinónimos vagos) y usando conectores precisos. “Subject to” introduce una condición formal.',
            examples: [
              'This proposal outlines the scope and expected impact.',
              'Subject to board approval, the pilot will begin in May.',
              'We seek approval to proceed with phase one.',
            ],
          },
          vocab: [
            { term: 'concise', es: 'conciso', example: 'The summary is concise but complete.' },
            { term: 'scope', es: 'alcance', example: 'The scope excludes external clients.' },
            { term: 'deliverable', es: 'entregable', example: 'The first deliverable is a risk assessment.' },
            { term: 'contingency', es: 'contingencia', example: 'We included a 10% contingency in the budget.' },
          ],
          phrases: [
            { en: 'This proposal outlines the recommended approach.', es: 'Esta propuesta describe el enfoque recomendado.' },
            { en: 'The recommended course of action is to phase the launch.', es: 'El curso de acción recomendado es lanzar por fases.' },
            { en: 'Subject to approval, we will begin in May.', es: 'Sujeto a aprobación, empezaremos en mayo.' },
            { en: 'We seek approval to proceed with phase one.', es: 'Solicitamos aprobación para proceder con la fase uno.' },
          ],
          dialogue: {
            context: 'Lectura de una propuesta ante el comité.',
            lines: [
              { speaker: 'Ana', text: 'This proposal outlines a two-phase rollout and the resources required.' },
              { speaker: 'Chair', text: 'What exactly is in scope?' },
              { speaker: 'Ana', text: 'Phase one covers the enterprise segment and excludes external partners. The first deliverable is a risk assessment.' },
              { speaker: 'Chair', text: 'What if the vendor is late?' },
              { speaker: 'Ana', text: 'We’ve included a 10% contingency and a fallback supplier. Subject to approval, we would begin in May.' },
              { speaker: 'Chair', text: 'And what are you asking us to approve today?' },
              { speaker: 'Ana', text: 'We seek approval to proceed with phase one and release the initial budget.' },
            ],
            question: {
              prompt: 'What is Ana asking the committee to approve?',
              options: ['Phase one and its initial budget', 'The full rollout', 'A new vendor contract', 'A change to the scope'],
              answer: 0,
              explanation: 'Ana pide aprobar la fase uno y liberar el presupuesto inicial.',
            },
          },
          check: {
            prompt: 'The recommended course of action ___ to phase the rollout.',
            options: ['is', 'are', 'be', 'were'],
            answer: 0,
            explanation: 'El sujeto es “course of action” (singular): is.',
          },
          task: {
            kind: 'writing',
            title: 'One-page proposal',
            prompt:
              'Escribe una propuesta ejecutiva de 180–220 palabras para aprobar un piloto. Incluye problema, alcance, entregables, impacto esperado, riesgo y petición.',
            points: ['Problem and recommendation', 'Scope and exclusions', 'Expected impact', 'Risk, contingency and ask'],
            model:
              'Proposal: enterprise onboarding pilot\n\nProblem: enterprise clients take an average of 38 days to complete onboarding, compared with our 21-day target. The delay is associated with a 12-point drop in first-year retention.\n\nRecommendation: run a six-month pilot to redesign the first two onboarding stages, starting with 25 enterprise accounts.\n\nScope: the pilot covers onboarding, training and support handover. It excludes pricing changes and external partners. The first deliverable is a validated journey map, followed by a redesigned welcome sequence.\n\nExpected impact: based on the platform team’s trial, we expect a 30% reduction in time to value and a three-point improvement in retention. The estimated cost is 180,000 euros, including a 10% contingency.\n\nRisk: the pilot may delay the standard onboarding roadmap. To mitigate this, we will ring-fence two engineers and review progress every two weeks. If the metrics are not met by month four, we will stop and reintegrate the team.\n\nWe seek approval to proceed with phase one and release the initial budget of 90,000 euros.',
            minWords: 160,
          },
        },
        {
          title: 'Tone, nuance & precision',
          subtitle: 'Registro y matiz',
          objective: 'Ajustar el tono, evitar ambigüedad no deseada y reescribir mensajes delicados.',
          minutes: 40,
          grammar: {
            title: 'Registro y connotación',
            formula: 'I’d suggest… rather than… · This may be perceived as… · To be precise, … · That said, …',
            explanation:
              'El mismo contenido puede sonar colaborativo o acusatorio. “You failed to…” acusa; “The report was not submitted on time” describe. El matiz se construye con modales, voz pasiva y precisión léxica. “That said” introduce una objeción sin romper el tono.',
            examples: [
              'I’d suggest narrowing the scope rather than extending the deadline.',
              'This may be perceived as a lack of commitment.',
              'To be precise, the delay affected two of the five milestones.',
            ],
          },
          vocab: [
            { term: 'nuance', es: 'matiz', example: 'The message loses nuance when it is shortened.' },
            { term: 'assert', es: 'afirmar con firmeza', example: 'She asserted that the data was incomplete.' },
            { term: 'imply', es: 'implicar / dar a entender', example: 'The email implies that the decision was final.' },
            { term: 'mitigate', es: 'mitigar', example: 'We can mitigate the risk with clearer communication.' },
          ],
          phrases: [
            { en: 'I’d suggest narrowing the scope rather than extending the deadline.', es: 'Sugeriría reducir el alcance en lugar de ampliar el plazo.' },
            { en: 'This may be perceived as a lack of commitment.', es: 'Esto puede percibirse como falta de compromiso.' },
            { en: 'To be precise, only two milestones were affected.', es: 'Para ser precisos, solo se vieron afectados dos hitos.' },
            { en: 'That said, the timeline remains optimistic.', es: 'Dicho esto, el calendario sigue siendo optimista.' },
          ],
          dialogue: {
            context: 'Revisión editorial de un correo delicado.',
            lines: [
              { speaker: 'Editor', text: 'This sentence — “You ignored our request” — is too direct for a client email.' },
              { speaker: 'Ana', text: 'I want to be clear that the request wasn’t addressed. How would you phrase it?' },
              { speaker: 'Editor', text: 'Describe the fact, not the intention: “The request does not appear to have been addressed.”' },
              { speaker: 'Ana', text: 'Doesn’t that sound too soft?' },
              { speaker: 'Editor', text: 'It’s precise. Then you can add the impact: “As a result, the review was delayed by a week.” That said, keep the request for action explicit.' },
              { speaker: 'Ana', text: 'So: fact, impact, request. That’s clearer and harder to dispute.' },
            ],
            question: {
              prompt: 'What structure does the editor recommend?',
              options: ['Fact, impact, request', 'Apology, excuse, deadline', 'Opinion, accusation, warning', 'Greeting, summary, signature'],
              answer: 0,
              explanation: 'El editor propone describir el hecho, el impacto y luego una petición explícita.',
            },
          },
          check: {
            prompt: 'That said, the timeline ___ optimistic.',
            options: ['may be', 'maybe', 'may is', 'may being'],
            answer: 0,
            explanation: '“May” + verbo base: may be. “Maybe” es un adverbio, no un verbo.',
          },
          task: {
            kind: 'writing',
            title: 'Rewrite with precision',
            prompt:
              'Reescribe este correo para un cliente manteniendo la firmeza pero eliminando la acusación: “You ignored our request and missed the deadline. This is unacceptable. Send the files today.” (120–150 palabras).',
            points: ['Describe facts, not intentions', 'State the impact', 'Keep the request explicit', 'Preserve a professional tone'],
            model:
              'Subject: Outstanding files and revised timeline\n\nDear Mr. Clark,\n\nI’m writing regarding the files requested on 12 April. As of today, they have not been received, and the review has consequently been delayed by one week. This affects the launch date we agreed in March.\n\nTo be precise, the delay concerns two of the five workstreams, not the full programme. That said, we need the outstanding files to confirm whether the original date remains achievable.\n\nCould you send the two remaining files by Thursday, 2 May? If that is not possible, please let us know today so we can agree on a revised plan.\n\nI’d suggest a short call on Wednesday to confirm the path forward.\n\nKind regards,\nAna',
            minWords: 110,
          },
        },
      ],
    ),
    mod(
      'c1-m3',
      'C1',
      'Career acceleration',
      'Carrera',
      'Domina entrevistas, negocación salarial y conversaciones de crecimiento profesional.',
      'Podrás contar tu impacto con estructura STAR y negociar tu siguiente paso con confianza.',
      6,
      [
        {
          title: 'Behavioral interviews (STAR)',
          subtitle: 'Contar tu impacto',
          objective: 'Responder preguntas de comportamiento con la estructura STAR y métricas.',
          minutes: 40,
          grammar: {
            title: 'Tiempos narrativos',
            formula: 'The situation was… · I had been… · I took the initiative to… · As a result, we…',
            explanation:
              'Una respuesta STAR (Situation, Task, Action, Result) combina past simple para acciones concretas, past continuous para contexto y past perfect para lo anterior. El resultado debe ser medible: porcentaje, plazo, ahorro o impacto en el equipo.',
            examples: [
              'The situation was challenging: we had three weeks and no dedicated budget.',
              'I had been leading the project for two months when the supplier withdrew.',
              'As a result, we launched on time and reduced costs by 18%.',
            ],
          },
          vocab: [
            { term: 'achievement', es: 'logro', example: 'My biggest achievement was reducing churn.' },
            { term: 'ownership', es: 'responsabilidad', example: 'I took ownership of the client relationship.' },
            { term: 'setback', es: 'contratiempo', example: 'The main setback was losing a key supplier.' },
            { term: 'measurable', es: 'medible', example: 'The impact was measurable within one quarter.' },
          ],
          phrases: [
            { en: 'The situation was particularly challenging because…', es: 'La situación era especialmente difícil porque…' },
            { en: 'My task was to stabilize the project.', es: 'Mi tarea era estabilizar el proyecto.' },
            { en: 'I took the initiative to bring the teams together.', es: 'Tomé la iniciativa de reunir a los equipos.' },
            { en: 'As a result, we reduced costs by 18%.', es: 'Como resultado, redujimos los costes un 18%.' },
          ],
          dialogue: {
            context: 'Entrevista de comportamiento para un puesto senior.',
            lines: [
              { speaker: 'Interviewer', text: 'Tell me about a time you turned around a difficult project.' },
              { speaker: 'Ana', text: 'The situation was challenging: we had three weeks to launch and our main supplier had just withdrawn.' },
              { speaker: 'Interviewer', text: 'What was your specific role?' },
              { speaker: 'Ana', text: 'I was the project lead. My task was to protect the launch date without compromising quality.' },
              { speaker: 'Ana', text: 'I took the initiative to bring design and engineering together, and we re-scoped two features.' },
              { speaker: 'Interviewer', text: 'And what happened?' },
              { speaker: 'Ana', text: 'As a result, we launched on time, and support tickets were 25% lower than the previous release.' },
            ],
            question: {
              prompt: 'What was the result of Ana’s actions?',
              options: ['They launched on time with 25% fewer support tickets', 'They delayed the launch', 'They cancelled two features permanently', 'They hired a new supplier'],
              answer: 0,
              explanation: 'Ana cierra con el resultado medible: lanzamiento a tiempo y 25% menos tickets.',
            },
          },
          check: {
            prompt: 'By the time the project ended, we ___ three markets.',
            options: ['had launched', 'have launched', 'launched', 'were launching'],
            answer: 0,
            explanation: 'La acción es anterior a otro momento pasado: past perfect, had launched.',
          },
          task: {
            kind: 'speaking',
            title: 'Your STAR answer',
            prompt:
              'Responde en 90 segundos a “Tell me about a time you faced a setback”. Usa STAR y termina con un resultado medible.',
            points: ['Situation in one sentence', 'Task and your ownership', 'Two concrete actions', 'Measurable result'],
            model:
              'The situation was challenging: we were two weeks from launch when a key supplier withdrew. I was the project lead, and my task was to protect the date without compromising quality. I took the initiative to bring design and engineering together, re-scoped two non-critical features and personally negotiated a short-term contract with a backup supplier. As a result, we launched on time and support tickets were 25% lower than the previous release.',
          },
        },
        {
          title: 'Negotiate scope & salary',
          subtitle: 'Negociar tu siguiente paso',
          objective: 'Negociar salario, alcance y flexibilidad con datos y sin confrontación.',
          minutes: 40,
          grammar: {
            title: 'Condicionales y modalidad avanzada',
            formula: 'If the scope were…, I would expect… · I’d be open to… if… · Is there flexibility on…?',
            explanation:
              'En una negociación, los condicionales permiten explorar sin comprometerte: “If the scope were larger, I would expect…”. “I’d be open to… if…” señala flexibilidad condicionada. Evita “I want” y usa “I’d expect”, “I’d be looking for”.',
            examples: [
              'If the scope were larger, I would expect a higher base.',
              'I’d be open to a performance-based package if the targets are realistic.',
              'Is there flexibility on the start date?',
            ],
          },
          vocab: [
            { term: 'compensation', es: 'remuneración', example: 'The compensation package includes a bonus.' },
            { term: 'scope', es: 'alcance del puesto', example: 'The scope includes two direct reports.' },
            { term: 'flexibility', es: 'flexibilidad', example: 'I’d value flexibility on remote work.' },
            { term: 'benchmark', es: 'referencia de mercado', example: 'The benchmark for this role is 75,000.' },
          ],
          phrases: [
            { en: 'Based on my research, the range is 70 to 80.', es: 'Según mi investigación, el rango es de 70 a 80.' },
            { en: 'I’d be open to a bonus if the targets are realistic.', es: 'Estaría abierto a un bonus si los objetivos son realistas.' },
            { en: 'Is there flexibility on the start date?', es: '¿Hay flexibilidad con la fecha de inicio?' },
            { en: 'Let’s find a package that works for both of us.', es: 'Busquemos un paquete que funcione para ambos.' },
          ],
          dialogue: {
            context: 'Negociación de oferta para un puesto de liderazgo.',
            lines: [
              { speaker: 'Recruiter', text: 'We’re offering 72,000 plus a 10% bonus. Does that work for you?' },
              { speaker: 'Ana', text: 'Thank you. Based on my research and the scope of the role, the range for this level is closer to 78 to 84.' },
              { speaker: 'Recruiter', text: 'That’s above our initial range. What would justify it?' },
              { speaker: 'Ana', text: 'The role includes two direct reports and regional responsibility, which wasn’t in the original description.' },
              { speaker: 'Recruiter', text: 'We could go to 78, but the bonus would be capped at 8%.' },
              { speaker: 'Ana', text: 'I’d be open to that if the targets are realistic and there’s flexibility on remote work.' },
              { speaker: 'Recruiter', text: 'Let’s find a package that works for both of us. I’ll confirm by Friday.' },
            ],
            question: {
              prompt: 'What does Ana use to justify a higher salary?',
              options: ['The expanded scope of the role', 'A competing offer', 'Her commute', 'The bonus cap'],
              answer: 0,
              explanation: 'Ana menciona los dos reportes directos y la responsabilidad regional añadidos al alcance.',
            },
          },
          check: {
            prompt: 'If the scope ___ larger, I would expect a higher salary.',
            options: ['were', 'is', 'will be', 'had been'],
            answer: 0,
            explanation: 'Segundo condicional: If + past simple (were) + would + infinitivo.',
          },
          task: {
            kind: 'speaking',
            title: 'Negotiate your offer',
            prompt:
              'Negocia una oferta en 2 minutos: agradece, presenta tu benchmark, justifica con alcance, pide flexibilidad y propón un paquete.',
            points: ['Appreciate the offer', 'Anchor with a benchmark', 'Justify with scope or impact', 'Ask for flexibility and close'],
            model:
              'Thank you, I’m excited about the role. Based on my research and the scope, the range for this level is 78 to 84. The role includes two direct reports and regional responsibility, which is broader than the original description. I’d be open to 80 with an 8% bonus if the targets are realistic, and I’d value flexibility on remote work. Let’s find a package that works for both of us.',
          },
        },
      ],
    ),
  ],
}
