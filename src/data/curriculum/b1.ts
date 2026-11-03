import type { Stage } from '../../types'
import { mod } from './helpers'

export const stageB1: Stage = {
  level: 'B1',
  title: 'Comunicación funcional',
  tagline: 'Deja de traducir y empieza a comunicar.',
  description:
    'Participa en reuniones, escribe actualizaciones profesionales y presenta ideas con estructura. El nivel que te permite trabajar en inglés sin bloquearse.',
  modules: [
    mod(
      'b1-m1',
      'B1',
      'Meetings',
      'Reuniones',
      'Abre, conduce y cierra reuniones; opina, discrepa y construye consenso.',
      'Podrás gestionar una reunión de trabajo y defender tu punto de vista con tacto.',
      4,
      [
        {
          title: 'Open, steer, close',
          subtitle: 'Conducir una reunión',
          objective: 'Abrir una reunión, reconducir el tema y cerrar con acciones claras.',
          minutes: 30,
          grammar: {
            title: 'Preguntas indirectas',
            formula: 'Could you tell me + sujeto + verbo? · Do you know when + sujeto + verbo?',
            explanation:
              'Las preguntas indirectas suavizan la petición y no invierten el orden sujeto-verbo: “Could you tell me when the meeting starts?”, nunca “when does the meeting start”.',
            examples: [
              'Could you tell me when the meeting starts?',
              'Do you know if the client is joining?',
              'Can we come back to that later?',
            ],
          },
          vocab: [
            { term: 'agenda', es: 'orden del día', example: 'The agenda has four items.' },
            { term: 'item', es: 'punto / asunto', example: 'Let’s move to the next item.' },
            { term: 'minutes', es: 'acta de reunión', example: 'I’ll share the minutes tomorrow.' },
            { term: 'action point', es: 'acción pendiente', example: 'Each action point needs an owner.' },
          ],
          phrases: [
            { en: 'Let’s get started.', es: 'Empecemos.' },
            { en: 'Can we come back to that?', es: '¿Podemos volver a eso?' },
            { en: 'To sum up, we have three priorities.', es: 'En resumen, tenemos tres prioridades.' },
            { en: 'I’ll take that action.', es: 'Yo me encargo de esa acción.' },
          ],
          dialogue: {
            context: 'Inicio de una reunión de proyecto.',
            lines: [
              { speaker: 'Maya', text: 'Good morning, everyone. Let’s get started. We have three items today.' },
              { speaker: 'Ana', text: 'Before we begin, could you tell me when the client review is?' },
              { speaker: 'Maya', text: 'It’s on Thursday at two. I’ll share the agenda after this call.' },
              { speaker: 'Daniel', text: 'I have a concern about the timeline, but it’s not urgent.' },
              { speaker: 'Maya', text: 'Let’s park that and come back to it after the budget item.' },
              { speaker: 'Maya', text: 'To sum up, Ana will send the report and Daniel will confirm the supplier.' },
            ],
            question: {
              prompt: 'When is the client review?',
              options: ['Thursday at two', 'Tuesday at ten', 'Friday morning', 'After the budget item'],
              answer: 0,
              explanation: 'Maya dice “It’s on Thursday at two”.',
            },
          },
          check: {
            prompt: 'Could you tell me when ___?',
            options: ['the meeting starts', 'does the meeting start', 'starts the meeting', 'will start the meeting'],
            answer: 0,
            explanation: 'En preguntas indirectas mantenemos el orden sujeto + verbo.',
          },
          task: {
            kind: 'speaking',
            title: 'Run a three-minute meeting',
            prompt:
              'Simula una reunión breve: abre, presenta dos puntos del orden del día, pide una opinión y cierra con una acción concreta.',
            points: ['Open the meeting', 'Present two items', 'Ask for an opinion', 'Close with an action and owner'],
            model:
              'Good morning. Let’s get started. We have two items: the launch date and the client feedback. Ana, what’s your view on the launch date? … To sum up, we’ll keep the date and Ana will send the updated plan by Friday.',
          },
        },
        {
          title: 'Opinions & disagreement',
          subtitle: 'Opinar y discrepar con tacto',
          objective: 'Expresar opiniones, discrepar y proponer un punto medio.',
          minutes: 30,
          grammar: {
            title: 'Comparar y suavizar',
            formula: 'more/less + adjetivo + than · I see your point, but… · I’d argue that…',
            explanation:
              'En inglés profesional la discrepancia se suaviza primero reconociendo el punto del otro: “I see your point, but…”. Los comparativos permiten matizar: “more expensive than”, “less risky than”.',
            examples: [
              'The new option is more expensive than the current one.',
              'I see your point, but the data suggests otherwise.',
              'I’d argue that we need a smaller pilot.',
            ],
          },
          vocab: [
            { term: 'concern', es: 'preocupación', example: 'My main concern is the timeline.' },
            { term: 'trade-off', es: 'disyuntiva', example: 'There’s a trade-off between speed and quality.' },
            { term: 'priority', es: 'prioridad', example: 'Reliability is our top priority.' },
            { term: 'consensus', es: 'consenso', example: 'We reached a consensus after the discussion.' },
          ],
          phrases: [
            { en: 'I see your point, but I’d like more data.', es: 'Entiendo tu punto, pero me gustaría tener más datos.' },
            { en: 'I’d argue that the opposite is true.', es: 'Yo diría que ocurre lo contrario.' },
            { en: 'How do you feel about this option?', es: '¿Qué te parece esta opción?' },
            { en: 'Can we find a middle ground?', es: '¿Podemos encontrar un punto medio?' },
          ],
          dialogue: {
            context: 'Debate sobre la fecha de lanzamiento.',
            lines: [
              { speaker: 'Maya', text: 'The client wants the launch in June. Is that realistic?' },
              { speaker: 'Daniel', text: 'I see your point, but I’d argue that June is too early. We haven’t tested the payment flow.' },
              { speaker: 'Maya', text: 'That’s a fair concern. How do you feel about a limited launch?' },
              { speaker: 'Daniel', text: 'A limited launch could work, but we’d need two more testers.' },
              { speaker: 'Ana', text: 'Can we find a middle ground? Launch the core product in June and the payment flow in July.' },
              { speaker: 'Maya', text: 'That sounds like a reasonable compromise. Let’s write it up.' },
            ],
            question: {
              prompt: 'What compromise does Ana propose?',
              options: ['Launch the core product in June and payments in July', 'Delay everything to July', 'Cancel the limited launch', 'Hire two more testers'],
              answer: 0,
              explanation: 'Ana propone lanzar el producto principal en junio y los pagos en julio.',
            },
          },
          check: {
            prompt: 'I see your point, ___ I think we need more data.',
            options: ['but', 'although', 'however', 'despite'],
            answer: 0,
            explanation: '“But” une dos cláusulas en una misma frase; “however” iría al inicio de otra oración.',
          },
          task: {
            kind: 'writing',
            title: 'A balanced opinion',
            prompt:
              'Tu equipo debate si pasar a cuatro días de oficina. Escribe tu opinión (100–130 palabras): reconoce el argumento contrario y propone una solución.',
            points: ['Your position', 'Acknowledge the other side', 'One reason with an example', 'A concrete proposal'],
            model:
              'I understand the case for four office days: face-to-face collaboration is valuable, especially for new employees. However, I’d argue that a fixed four-day rule may reduce focus time and exclude people with long commutes. In my experience, two anchor days plus one flexible day creates a better balance. Teams can plan workshops on the anchor days and protect deep work on the others. I suggest we trial this model for eight weeks and measure both delivery speed and employee satisfaction before making it permanent.',
            minWords: 90,
          },
        },
      ],
    ),
    mod(
      'b1-m2',
      'B1',
      'Written communication',
      'Escritura profesional',
      'Escribe actualizaciones claras, resuelve problemas por correo y mantén el tono adecuado.',
      'Podrás escribir correos y actualizaciones que se entiendan en una sola lectura.',
      4,
      [
        {
          title: 'Status updates & follow-ups',
          subtitle: 'Actualizaciones de estado',
          objective: 'Informar de progreso, bloqueos y próximos pasos con precisión.',
          minutes: 30,
          grammar: {
            title: 'Present perfect continuous',
            formula: 'have/has been + verbo-ing',
            explanation:
              'Usamos present perfect continuous para acciones que empezaron en el pasado y siguen ocurriendo o acaban de terminar: “We’ve been working on the integration since Monday”. Enfatiza la duración y el proceso.',
            examples: [
              'We’ve been testing the new flow all week.',
              'She’s been leading the project since March.',
              'I’ve been waiting for the vendor’s response.',
            ],
          },
          vocab: [
            { term: 'progress', es: 'progreso', example: 'We made good progress this week.' },
            { term: 'milestone', es: 'hito', example: 'The design milestone is complete.' },
            { term: 'blocker', es: 'bloqueo', example: 'The main blocker is the missing approval.' },
            { term: 'on track', es: 'según lo previsto', example: 'The project is on track for June.' },
          ],
          phrases: [
            { en: 'We’ve been working on the migration.', es: 'Hemos estado trabajando en la migración.' },
            { en: 'We’re on track to finish by Friday.', es: 'Vamos según lo previsto para terminar el viernes.' },
            { en: 'The main blocker is the vendor.', es: 'El principal bloqueo es el proveedor.' },
            { en: 'I’ll follow up by Thursday.', es: 'Haré seguimiento antes del jueves.' },
          ],
          dialogue: {
            context: 'Llamada semanal de seguimiento.',
            lines: [
              { speaker: 'Maya', text: 'How’s the Atlas project going?' },
              { speaker: 'Ana', text: 'We’ve been working on the data migration since Monday. We’re on track for the first milestone.' },
              { speaker: 'Maya', text: 'Great. Any blockers?' },
              { speaker: 'Ana', text: 'The main blocker is the vendor. They haven’t confirmed the export format yet.' },
              { speaker: 'Maya', text: 'Do you need me to call them?' },
              { speaker: 'Ana', text: 'That would help. I’ll send you the contact details and follow up by Thursday.' },
            ],
            question: {
              prompt: 'What is the main blocker?',
              options: ['The vendor hasn’t confirmed the export format', 'The data migration failed', 'The team missed a milestone', 'Maya is unavailable'],
              answer: 0,
              explanation: 'Ana dice que el proveedor aún no ha confirmado el formato de exportación.',
            },
          },
          check: {
            prompt: 'We ___ on the integration since Monday.',
            options: ['have been working', 'are working', 'worked', 'have work'],
            answer: 0,
            explanation: 'La acción empezó el lunes y continúa: present perfect continuous.',
          },
          task: {
            kind: 'writing',
            title: 'Weekly status update',
            prompt:
              'Escribe una actualización de 120–150 palabras para tu manager: progreso, un bloqueo, qué necesitas y cuándo será el próximo update.',
            points: ['Progress since last week', 'One blocker', 'What you need', 'Next update date'],
            model:
              'Subject: Weekly update — Atlas\n\nHi Maya,\n\nHere’s this week’s update. We’ve completed the data mapping and started the migration. The first milestone is on track for Friday.\n\nThe main blocker is the vendor’s export format. They haven’t confirmed it yet, which may delay testing by a few days. Could you help me escalate this? I’ve sent you the contact details separately.\n\nIf we get confirmation by Wednesday, we can keep the original timeline. Otherwise, I’ll propose a revised plan on Thursday.\n\nI’ll send the next update on Monday.\n\nBest,\nAna',
            minWords: 110,
          },
        },
        {
          title: 'Diplomatic problem-solving',
          subtitle: 'Resolver problemas por escrito',
          objective: 'Describir un problema, su impacto y una solución sin culpar a nadie.',
          minutes: 30,
          grammar: {
            title: 'Voz pasiva + primer condicional',
            formula: 'The invoice was sent… · If we + presente, we can + infinitivo',
            explanation:
              'La pasiva desplaza el foco de quién hizo algo al hecho en sí: “The invoice was sent to the wrong address”. Es útil para describir problemas sin señalar culpables. El primer condicional plantea soluciones reales: “If we resend it today, we can meet the deadline”.',
            examples: [
              'The invoice was sent to the wrong address.',
              'The issue was identified on Monday.',
              'If we resend it today, we can still meet the deadline.',
            ],
          },
          vocab: [
            { term: 'issue', es: 'problema / incidencia', example: 'We identified an issue with the invoice.' },
            { term: 'escalate', es: 'escalar', example: 'I’ll escalate this to the finance team.' },
            { term: 'resolve', es: 'resolver', example: 'We can resolve this by Friday.' },
            { term: 'impact', es: 'impacto', example: 'The impact on the client is limited.' },
          ],
          phrases: [
            { en: 'There seems to be an issue with the invoice.', es: 'Parece que hay un problema con la factura.' },
            { en: 'We’ve identified the cause.', es: 'Hemos identificado la causa.' },
            { en: 'If we act today, we can avoid a delay.', es: 'Si actuamos hoy, podemos evitar un retraso.' },
            { en: 'Let’s aim to resolve this by Friday.', es: 'Intentemos resolverlo antes del viernes.' },
          ],
          dialogue: {
            context: 'Llamada sobre una factura incorrecta.',
            lines: [
              { speaker: 'Client', text: 'We received the invoice, but the amount is wrong.' },
              { speaker: 'Ana', text: 'I’m sorry to hear that. There seems to be an issue with the discount line.' },
              { speaker: 'Client', text: 'Will this affect the payment date?' },
              { speaker: 'Ana', text: 'If we issue a corrected invoice today, you can still pay on time.' },
              { speaker: 'Client', text: 'OK. Can you confirm in writing?' },
              { speaker: 'Ana', text: 'Of course. I’ll send the corrected invoice and a short explanation this afternoon.' },
            ],
            question: {
              prompt: 'What is the problem with the invoice?',
              options: ['The amount is wrong', 'It was sent to the wrong client', 'It has no payment date', 'It was never received'],
              answer: 0,
              explanation: 'El cliente dice que el importe es incorrecto; Ana identifica la línea de descuento.',
            },
          },
          check: {
            prompt: 'The invoice ___ to the wrong address.',
            options: ['was sent', 'were sent', 'sent', 'has send'],
            answer: 0,
            explanation: 'Pasiva en pasado: was + participio (sent).',
          },
          task: {
            kind: 'writing',
            title: 'Fix it without blame',
            prompt:
              'Escribe un correo de 110–140 palabras a un cliente: reconoce el problema, explica el impacto real, propone una solución con fecha y evita culpar a nadie.',
            points: ['Acknowledge the issue', 'Explain the impact', 'Propose a solution with a date', 'Keep a calm, professional tone'],
            model:
              'Subject: Correction to invoice 2041\n\nDear Mr. Clark,\n\nThank you for flagging the discrepancy in invoice 2041. It appears that the discount line was calculated using the previous rate.\n\nThe practical impact is that the total is 1,200 euros too high. This does not affect your payment terms, and no late fees will apply.\n\nWe are issuing a corrected invoice today. If you receive it before Friday, you can proceed with the original payment date. I will confirm once it has been sent.\n\nPlease accept our apologies for the extra work this has caused.\n\nKind regards,\nAna',
            minWords: 100,
          },
        },
      ],
    ),
    mod(
      'b1-m3',
      'B1',
      'Presentations',
      'Presentaciones',
      'Estructura tus ideas, guía a la audiencia y describe datos con claridad.',
      'Podrás hacer una presentación breve y explicar resultados sin leer diapositivas.',
      4,
      [
        {
          title: 'Structure & signposting',
          subtitle: 'Estructura y señalización',
          objective: 'Abrir una presentación, guiar a la audiencia y cerrar con un mensaje claro.',
          minutes: 30,
          grammar: {
            title: 'Marcadores de discurso',
            formula: 'First · Next · Then · Finally · Let’s move on to… · To wrap up…',
            explanation:
              'Los signposts indican a la audiencia dónde estás: “First…”, “Let’s move on to…”, “To wrap up…”. Sin ellos, la audiencia tiene que adivinar la estructura. Una presentación breve necesita una apertura, dos o tres puntos y un cierre.',
            examples: [
              'Today I’ll cover three main areas.',
              'Let’s move on to the second point.',
              'To wrap up, I’ll summarize the key takeaway.',
            ],
          },
          vocab: [
            { term: 'overview', es: 'visión general', example: 'I’ll start with a quick overview.' },
            { term: 'key point', es: 'punto clave', example: 'The key point is the timeline.' },
            { term: 'takeaway', es: 'idea principal', example: 'The main takeaway is simple.' },
            { term: 'slide', es: 'diapositiva', example: 'This slide shows the budget.' },
          ],
          phrases: [
            { en: 'Today I’ll cover three main areas.', es: 'Hoy cubriré tres áreas principales.' },
            { en: 'Let’s move on to the next point.', es: 'Pasemos al siguiente punto.' },
            { en: 'The key takeaway is the timeline.', es: 'La idea clave es el calendario.' },
            { en: 'To wrap up, I’ll summarize the next steps.', es: 'Para terminar, resumiré los próximos pasos.' },
          ],
          dialogue: {
            context: 'Apertura de una presentación de resultados.',
            lines: [
              { speaker: 'Ana', text: 'Good morning. Today I’ll cover three areas: results, challenges and next steps.' },
              { speaker: 'Ana', text: 'First, a quick overview. Revenue grew by eight percent, and retention remained stable.' },
              { speaker: 'Ana', text: 'Let’s move on to the challenges. The main one is the delay in the finance module.' },
              { speaker: 'Ana', text: 'Now, the next steps. We plan to add two testers and review the plan on Friday.' },
              { speaker: 'Ana', text: 'To wrap up, the key takeaway is that we can still meet the deadline if we act this week.' },
              { speaker: 'Client', text: 'Thanks. Could you share the slide with the revised timeline?' },
            ],
            question: {
              prompt: 'What is the key takeaway?',
              options: ['They can meet the deadline if they act this week', 'Revenue fell by eight percent', 'The project is cancelled', 'They need a new client'],
              answer: 0,
              explanation: 'Ana cierra diciendo que pueden cumplir el plazo si actúan esta semana.',
            },
          },
          check: {
            prompt: '___ I’ll cover three main areas.',
            options: ['Today', 'Actually', 'Finally', 'However'],
            answer: 0,
            explanation: '“Today” sitúa la presentación; “finally” cerraría, no abriría.',
          },
          task: {
            kind: 'speaking',
            title: 'A 60-second presentation',
            prompt:
              'Presenta en un minuto el estado de un proyecto: apertura, dos puntos (progreso y riesgo) y cierre con una acción.',
            points: ['Clear opening', 'Two signposted points', 'One risk', 'Closing takeaway'],
            model:
              'Good morning. Today I’ll give a quick update on the Atlas project. First, progress: we’ve completed the data mapping and we’re on track for the first milestone. Next, the main risk: the vendor hasn’t confirmed the export format. To wrap up, we need approval for two temporary testers by Friday to protect the deadline.',
          },
        },
        {
          title: 'Trends & data',
          subtitle: 'Describir datos y tendencias',
          objective: 'Describir gráficos, comparar periodos y explicar una previsión.',
          minutes: 30,
          grammar: {
            title: 'Verbos de cambio y comparativos',
            formula: 'rise / fall / remain stable / peak · increase by 12% · compared with last year',
            explanation:
              'Para describir tendencias usa verbos precisos: rise (subir), fall (bajar), remain stable (mantenerse), peak (alcanzar el máximo). “Increase” es intransitivo; “raise” necesita objeto: “revenue rose”, “we raised prices”.',
            examples: [
              'Revenue rose by 12% last quarter.',
              'Costs remained stable compared with last year.',
              'Sales peaked in December.',
            ],
          },
          vocab: [
            { term: 'increase', es: 'aumentar', example: 'Sales increased by eight percent.' },
            { term: 'decline', es: 'disminuir', example: 'Demand declined in the second half.' },
            { term: 'peak', es: 'alcanzar el máximo', example: 'Traffic peaked in November.' },
            { term: 'forecast', es: 'previsión', example: 'Our forecast points to steady growth.' },
          ],
          phrases: [
            { en: 'Sales rose sharply in the second quarter.', es: 'Las ventas subieron bruscamente en el segundo trimestre.' },
            { en: 'This segment accounts for 40% of revenue.', es: 'Este segmento representa el 40% de los ingresos.' },
            { en: 'Compared with last year, costs are lower.', es: 'En comparación con el año pasado, los costes son menores.' },
            { en: 'We expect it to stabilize next quarter.', es: 'Esperamos que se estabilice el próximo trimestre.' },
          ],
          dialogue: {
            context: 'Presentación de resultados trimestrales.',
            lines: [
              { speaker: 'Ana', text: 'This slide shows revenue by quarter. We started at 120,000 and reached 172,000 in Q4.' },
              { speaker: 'Client', text: 'So the growth is consistent?' },
              { speaker: 'Ana', text: 'Mostly. There was a small decline in Q3, from 145 to 138, but Q4 recovered strongly.' },
              { speaker: 'Client', text: 'What about next year?' },
              { speaker: 'Ana', text: 'We forecast growth of around ten percent, assuming no major disruption.' },
              { speaker: 'Client', text: 'And which segment is driving that?' },
              { speaker: 'Ana', text: 'Enterprise accounts. They now account for 55% of total revenue.' },
            ],
            question: {
              prompt: 'What happened in Q3?',
              options: ['Revenue declined slightly', 'Revenue peaked', 'The client cancelled', 'Costs doubled'],
              answer: 0,
              explanation: 'Ana dice que hubo un pequeño descenso en el tercer trimestre, de 145 a 138.',
            },
          },
          check: {
            prompt: 'Revenue ___ by 12% last quarter.',
            options: ['rose', 'raised', 'risen', 'raise'],
            answer: 0,
            explanation: '“Rise” es intransitivo: revenue rose. “Raise” requiere un objeto.',
          },
          task: {
            kind: 'writing',
            title: 'Explain the chart',
            prompt:
              'Describe estos datos en 100–130 palabras: Q1 120k, Q2 145k, Q3 138k, Q4 172k. Señala la tendencia general, la caída de Q3 y una previsión.',
            points: ['Overall trend', 'The Q3 decline', 'A comparison', 'A forecast'],
            model:
              'Revenue grew from 120,000 euros in Q1 to 172,000 in Q4, an overall increase of 43%. Growth was strongest in Q2, when revenue rose by 21,000. There was a slight decline in Q3, from 145,000 to 138,000, mainly due to one large client delaying a renewal. Q4 recovered strongly and reached the highest point of the year. Compared with the previous year, the final quarter is 18% higher. We forecast continued growth of around 10% next year, assuming no major disruption in the enterprise segment.',
            minWords: 90,
          },
        },
      ],
    ),
  ],
}
