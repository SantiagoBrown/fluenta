import type { Stage } from '../../types'
import { mod } from './helpers'

export const stageB2: Stage = {
  level: 'B2',
  title: 'Fluidez profesional',
  tagline: 'Influye, negocia y gestiona conversaciones difíciles.',
  description:
    'Pasa de “defenderme” a “liderar la conversación”: propuestas, objeciones, feedback, conflictos e informes con impacto.',
  modules: [
    mod(
      'b2-m1',
      'B2',
      'Persuasion & negotiation',
      'Influencia',
      'Construye propuestas sólidas, anticipa objeciones y negocia con intereses, no solo posiciones.',
      'Podrás defender una propuesta y cerrar un acuerdo razonable en inglés.',
      5,
      [
        {
          title: 'Proposals & framing',
          subtitle: 'Propuestas que se entienden',
          objective: 'Presentar una propuesta con justificación, beneficios y condiciones.',
          minutes: 35,
          grammar: {
            title: 'Condicionales y hedging',
            formula: 'If we were to + infinitivo, we would… · This would allow us to… · It may be worth…',
            explanation:
              'El segundo condicional (“If we were to…, we would…”) presenta escenarios hipotéticos con distancia y tacto. El hedging (may, might, could, it seems) evita afirmaciones absolutas y protege la credibilidad cuando los datos no son completos.',
            examples: [
              'If we were to extend the pilot, we would reach more users.',
              'This would allow us to test the model with lower risk.',
              'It may be worth reviewing the pricing before launch.',
            ],
          },
          vocab: [
            { term: 'proposal', es: 'propuesta', example: 'The proposal outlines three options.' },
            { term: 'rationale', es: 'justificación', example: 'The rationale is based on client demand.' },
            { term: 'upside', es: 'ventaja / potencial', example: 'The upside is faster adoption.' },
            { term: 'feasible', es: 'viable', example: 'The plan is feasible within six weeks.' },
          ],
          phrases: [
            { en: 'The rationale behind this is client demand.', es: 'La justificación es la demanda de los clientes.' },
            { en: 'If we were to extend the pilot, we would learn more.', es: 'Si ampliáramos el piloto, aprenderíamos más.' },
            { en: 'This would allow us to reduce risk.', es: 'Esto nos permitiría reducir el riesgo.' },
            { en: 'From a cost perspective, it makes sense.', es: 'Desde el punto de vista de costes, tiene sentido.' },
          ],
          dialogue: {
            context: 'Presentación de una propuesta al comité de producto.',
            lines: [
              { speaker: 'Ana', text: 'Thanks for your time. I’d like to propose extending the pilot by six weeks.' },
              { speaker: 'Maya', text: 'What’s the rationale? We already have initial data.' },
              { speaker: 'Ana', text: 'The current sample is small. If we were to extend it, we would reach two additional markets.' },
              { speaker: 'Daniel', text: 'What’s the downside?' },
              { speaker: 'Ana', text: 'It would delay the full launch by one month. But it would allow us to validate pricing before we commit.' },
              { speaker: 'Maya', text: 'That seems feasible. Send us the revised plan by Friday.' },
            ],
            question: {
              prompt: 'What is the main benefit of extending the pilot?',
              options: ['It would validate pricing in more markets', 'It would launch the product sooner', 'It would reduce the team size', 'It would eliminate the need for data'],
              answer: 0,
              explanation: 'Ana dice que permitiría validar el precio antes de comprometerse.',
            },
          },
          check: {
            prompt: 'If we ___ the pilot, we would reach more users.',
            options: ['were to extend', 'extended to', 'extend', 'will extend'],
            answer: 0,
            explanation: 'El segundo condicional formal usa “If we were to + infinitivo”.',
          },
          task: {
            kind: 'writing',
            title: 'A one-page proposal',
            prompt:
              'Propón a tu equipo un cambio de proceso (por ejemplo, reuniones asíncronas). Escribe 150–180 palabras: problema, propuesta, justificación, impacto y riesgo.',
            points: ['The problem and its cost', 'A clear proposal', 'Rationale and expected impact', 'One risk and mitigation'],
            model:
              'Proposal: replace the weekly status meeting with a written update\n\nProblem: nine people attend a sixty-minute status meeting every week, which represents nine hours of work. Most of the time is spent sharing information rather than making decisions.\n\nProposal: replace the weekly call with a written update every Monday and a biweekly decision session for those who need to contribute.\n\nRationale: a similar trial in the platform team reduced meeting time by 40% and improved documentation. Written updates also allow colleagues in different time zones to participate.\n\nRisk: informal coordination may decline. To mitigate this, we would keep an optional social slot on Fridays and review the model after six weeks. If successful, we would extend it to two additional teams.',
            minWords: 140,
          },
        },
        {
          title: 'Objections & concessions',
          subtitle: 'Negociar sin perder la relación',
          objective: 'Responder a objeciones, hacer concesiones y explorar intereses.',
          minutes: 35,
          grammar: {
            title: 'Concesión e inversión',
            formula: 'While I appreciate…, … · Despite + sustantivo · We’d be willing to… provided that…',
            explanation:
              'Las concesiones reconocen la otra posición antes de contraargumentar. “Despite” va con sustantivo o gerundio; “although” con cláusula. “Provided that” introduce una condición estricta: “We’d accept, provided that the deadline moves”.',
            examples: [
              'While I appreciate the urgency, we can’t compromise on quality.',
              'Despite the initial cost, the long-term savings are significant.',
              'We’d be willing to reduce the scope, provided that the deadline stays.',
            ],
          },
          vocab: [
            { term: 'objection', es: 'objeción', example: 'The main objection is the implementation cost.' },
            { term: 'concession', es: 'concesión', example: 'We made a concession on the payment terms.' },
            { term: 'constraint', es: 'restricción', example: 'Time is the biggest constraint.' },
            { term: 'leverage', es: 'poder de negociación', example: 'Our data gives us leverage in the discussion.' },
          ],
          phrases: [
            { en: 'That’s a fair point; however, the risk remains.', es: 'Es un punto válido; sin embargo, el riesgo persiste.' },
            { en: 'While I appreciate the offer, we need more clarity.', es: 'Agradezco la oferta, pero necesitamos más claridad.' },
            { en: 'What if we phase the rollout?', es: '¿Y si hacemos el despliegue por fases?' },
            { en: 'We’d be willing to compromise, provided that the date holds.', es: 'Estaríamos dispuestos a ceder si se mantiene la fecha.' },
          ],
          dialogue: {
            context: 'Negociación con un proveedor.',
            lines: [
              { speaker: 'Vendor', text: 'We can deliver by June, but the price would increase by 15%.' },
              { speaker: 'Ana', text: 'That’s a fair point, given the timeline. However, a 15% increase is above our budget.' },
              { speaker: 'Vendor', text: 'We could reduce it to 10% if you commit to a two-year contract.' },
              { speaker: 'Ana', text: 'While I appreciate the flexibility, we can’t commit for two years without a pilot.' },
              { speaker: 'Ana', text: 'What if we start with a six-month pilot and revisit the price after that?' },
              { speaker: 'Vendor', text: 'That could work. We’d be willing to do 12% for the pilot, provided that we review in six months.' },
            ],
            question: {
              prompt: 'What does Ana propose?',
              options: ['A six-month pilot with a price review', 'A two-year contract', 'A 15% price increase', 'Cancelling the project'],
              answer: 0,
              explanation: 'Ana propone un piloto de seis meses y revisar el precio después.',
            },
          },
          check: {
            prompt: '___ the initial cost, the long-term savings are significant.',
            options: ['Despite', 'Although', 'However', 'Even'],
            answer: 0,
            explanation: '“Despite” + sustantivo (“the initial cost”); “although” requeriría una cláusula completa.',
          },
          task: {
            kind: 'speaking',
            title: 'Negotiate a deadline',
            prompt:
              'Negocia con un cliente que quiere el proyecto dos semanas antes. Reconoce su necesidad, explica la restricción, ofrece una alternativa y pide algo a cambio.',
            points: ['Acknowledge their priority', 'State your constraint', 'Offer a phased alternative', 'Ask for a concession'],
            model:
              'I understand the need to launch before the campaign. However, delivering two weeks earlier would mean skipping the security review, which I’m not comfortable with. What if we launch the core features on your date and add reporting two weeks later? In exchange, we’d need the final content by Monday.',
          },
        },
      ],
    ),
    mod(
      'b2-m2',
      'B2',
      'Difficult conversations',
      'Conversaciones difíciles',
      'Da feedback, resuelve conflictos y comunica malas noticias sin dañar la relación.',
      'Podrás abordar tensiones y desacuerdos con lenguaje profesional y orientado a soluciones.',
      5,
      [
        {
          title: 'Feedback that lands',
          subtitle: 'Feedback constructivo',
          objective: 'Dar feedback sobre comportamiento e impacto sin atacar a la persona.',
          minutes: 35,
          grammar: {
            title: 'Modales y lenguaje indirecto',
            formula: 'I’d like to flag… · One thing to consider is… · How can we avoid…?',
            explanation:
              'Para dar feedback, describe el comportamiento y su impacto antes de pedir un cambio. Los modales (could, might, would) y las preguntas abiertas reducen la defensividad. Evita “you always…” y usa ejemplos concretos.',
            examples: [
              'I’d like to flag something about the last client call.',
              'One thing to consider is how the delay affected the team.',
              'How can we avoid this going forward?',
            ],
          },
          vocab: [
            { term: 'feedback', es: 'retroalimentación', example: 'The feedback from the client was positive.' },
            { term: 'behavior', es: 'comportamiento', example: 'The behavior had a clear impact on the team.' },
            { term: 'expectation', es: 'expectativa', example: 'We need to align on expectations.' },
            { term: 'ownership', es: 'responsabilidad / apropiación', example: 'Taking ownership means following up.' },
          ],
          phrases: [
            { en: 'I’d like to flag something with you.', es: 'Me gustaría comentarte algo.' },
            { en: 'One thing to consider is the impact on the team.', es: 'Un aspecto a considerar es el impacto en el equipo.' },
            { en: 'What impact did that have?', es: '¿Qué impacto tuvo eso?' },
            { en: 'How can we avoid this going forward?', es: '¿Cómo podemos evitar esto en adelante?' },
          ],
          dialogue: {
            context: 'Conversación de feedback entre manager y colaborador.',
            lines: [
              { speaker: 'Maya', text: 'Thanks for making time. I’d like to flag something about the client call on Monday.' },
              { speaker: 'Daniel', text: 'OK. Was there a problem?' },
              { speaker: 'Maya', text: 'You shared the draft figures before finance had validated them. The client questioned the numbers in the meeting.' },
              { speaker: 'Daniel', text: 'I see. I thought the figures were final.' },
              { speaker: 'Maya', text: 'One thing to consider is how that affected the client’s confidence. How can we avoid this going forward?' },
              { speaker: 'Daniel', text: 'I could add a validation step to my checklist and confirm with finance before sharing.' },
              { speaker: 'Maya', text: 'That sounds like a good next step. Let’s review it in two weeks.' },
            ],
            question: {
              prompt: 'What was the issue with Daniel’s client call?',
              options: ['He shared figures before they were validated', 'He missed the call', 'He shared the wrong client name', 'He cancelled a meeting'],
              answer: 0,
              explanation: 'Maya señala que compartió cifras antes de que finanzas las validara.',
            },
          },
          check: {
            prompt: 'I’d like ___ something with you.',
            options: ['to flag', 'flag', 'flagging', 'flagged'],
            answer: 0,
            explanation: '“Would like” va seguido de infinitivo con to.',
          },
          task: {
            kind: 'writing',
            title: 'Feedback in writing',
            prompt:
              'Escribe un mensaje de 120–150 palabras a un compañero: describe un comportamiento concreto, su impacto y una petición de cambio. Mantén un tono respetuoso.',
            points: ['Specific behavior', 'Impact on the team or client', 'A clear request', 'Support or next step'],
            model:
              'Hi Daniel,\n\nI wanted to follow up on Monday’s client call. You shared the draft figures before finance had validated them, and the client questioned the numbers during the meeting. This affected their confidence in our reporting and put the team in a difficult position.\n\nCould we agree that finance validates any client-facing figures before they are shared? A quick confirmation in the project channel would be enough.\n\nI appreciate the work you’ve done on the analysis, and I think this small step will make the next review much smoother.\n\nThanks,\nMaya',
            minWords: 100,
          },
        },
        {
          title: 'Conflict resolution',
          subtitle: 'Mediar y desescalar',
          objective: 'Mediar entre dos partes, aclarar malentendidos y acordar próximos pasos.',
          minutes: 35,
          grammar: {
            title: 'Pasiva y estilo indirecto',
            formula: 'It seems there’s been… · She said (that)… · We agreed that…',
            explanation:
              'La pasiva y el estilo indirecto permiten describir conflictos sin señalar culpables: “The deadline was missed” en lugar de “You missed the deadline”. En reported speech, el tiempo verbal retrocede: “I sent it” → “She said she had sent it”.',
            examples: [
              'It seems there’s been a misunderstanding about the scope.',
              'She said the file had already been sent.',
              'We agreed that the review would happen on Friday.',
            ],
          },
          vocab: [
            { term: 'tension', es: 'tensión', example: 'There was tension between the two teams.' },
            { term: 'escalate', es: 'agravar / escalar', example: 'The issue escalated after the meeting.' },
            { term: 'mediator', es: 'mediador/a', example: 'We asked HR to act as a mediator.' },
            { term: 'agreement', es: 'acuerdo', example: 'The agreement covers the next two months.' },
          ],
          phrases: [
            { en: 'It seems there’s been a misunderstanding.', es: 'Parece que ha habido un malentendido.' },
            { en: 'We both want the project to succeed.', es: 'Ambos queremos que el proyecto salga bien.' },
            { en: 'Would you be open to a short reset meeting?', es: '¿Estarías abierto a una reunión breve para resetear?' },
            { en: 'Let’s agree on next steps.', es: 'Acordemos los próximos pasos.' },
          ],
          dialogue: {
            context: 'Mediación entre diseño e ingeniería.',
            lines: [
              { speaker: 'Maya', text: 'Thanks both. It seems there’s been a misunderstanding about the handover.' },
              { speaker: 'Ana', text: 'The design team sent the final files on Monday, but engineering received an older version.' },
              { speaker: 'Daniel', text: 'We were told the files weren’t ready, so we started with what we had.' },
              { speaker: 'Maya', text: 'It sounds like the message was lost between two channels. We both want the launch to succeed.' },
              { speaker: 'Ana', text: 'Would you be open to a short reset meeting tomorrow?' },
              { speaker: 'Daniel', text: 'Yes. Let’s agree on one source of truth for the files and a weekly check-in.' },
              { speaker: 'Maya', text: 'Good. I’ll document the agreement and share it today.' },
            ],
            question: {
              prompt: 'What caused the problem?',
              options: ['A message was lost between two channels', 'The design files were never sent', 'Engineering refused to start', 'The launch was cancelled'],
              answer: 0,
              explanation: 'Maya sugiere que el mensaje se perdió entre dos canales.',
            },
          },
          check: {
            prompt: 'She said she ___ the email already.',
            options: ['had sent', 'sent', 'has sent', 'send'],
            answer: 0,
            explanation: 'En reported speech, el past simple retrocede a past perfect: had sent.',
          },
          task: {
            kind: 'speaking',
            title: 'Mediate a disagreement',
            prompt:
              'Media un desacuerdo entre dos colegas sobre un retraso. Aclara los hechos, evita culpar y cierra con un acuerdo y próximos pasos.',
            points: ['Neutral opening', 'Clarify what happened', 'Name the shared goal', 'Agree on next steps'],
            model:
              'Thanks both for joining. It seems there’s been a misunderstanding about the handover. My understanding is that the files were sent on Monday, but an older version was used. I don’t think anyone acted in bad faith. We all want the launch to succeed, so let’s agree on one source of truth and a weekly check-in. I’ll document the agreement today.',
          },
        },
      ],
    ),
    mod(
      'b2-m3',
      'B2',
      'Reporting',
      'Informes',
      'Resume información compleja, distingue hechos de interpretaciones y recomienda acciones.',
      'Podrás escribir un resumen ejecutivo y una recomendación basada en datos.',
      5,
      [
        {
          title: 'Summarize complexity',
          subtitle: 'Resumir sin perder precisión',
          objective: 'Sintetizar hallazgos, explicar causas y reconocer limitaciones.',
          minutes: 35,
          grammar: {
            title: 'Cláusulas relativas y nominalización',
            formula: '…, which… · the decline in demand · the implementation of the policy',
            explanation:
              'Las cláusulas relativas añaden información sin crear una frase nueva: “The decline, which began in March, has continued”. La nominalización convierte verbos en sustantivos (“implement” → “implementation”) y da un tono más formal y compacto.',
            examples: [
              'The decline, which began in March, has continued.',
              'The implementation of the policy reduced delays.',
              'This is driven by a change in customer behavior.',
            ],
          },
          vocab: [
            { term: 'finding', es: 'hallazgo', example: 'The main finding is a drop in retention.' },
            { term: 'insight', es: 'conclusión útil', example: 'The survey provides a useful insight.' },
            { term: 'driver', es: 'factor determinante', example: 'Price is the main driver of churn.' },
            { term: 'limitation', es: 'limitación', example: 'The main limitation is the sample size.' },
          ],
          phrases: [
            { en: 'The data suggests a change in behavior.', es: 'Los datos sugieren un cambio de comportamiento.' },
            { en: 'This is driven by higher acquisition costs.', es: 'Esto se debe al aumento de los costes de adquisición.' },
            { en: 'It’s worth noting that the sample is small.', es: 'Cabe señalar que la muestra es pequeña.' },
            { en: 'Given the limited data, we should be cautious.', es: 'Dados los datos limitados, debemos ser prudentes.' },
          ],
          dialogue: {
            context: 'Briefing de un analista al equipo directivo.',
            lines: [
              { speaker: 'Analyst', text: 'The main finding is a nine-point drop in retention among new customers.' },
              { speaker: 'Maya', text: 'Do we know what’s driving it?' },
              { speaker: 'Analyst', text: 'It’s driven by onboarding, which became longer after the pricing change.' },
              { speaker: 'Daniel', text: 'Could it be seasonal?' },
              { speaker: 'Analyst', text: 'It’s possible. It’s worth noting that the sample covers only one quarter.' },
              { speaker: 'Maya', text: 'So what do you recommend?' },
              { speaker: 'Analyst', text: 'Given the limited data, I’d recommend a targeted fix to onboarding before changing the pricing model.' },
            ],
            question: {
              prompt: 'What is driving the drop in retention?',
              options: ['A longer onboarding process', 'Seasonal demand', 'Higher prices', 'A smaller sample'],
              answer: 0,
              explanation: 'El analista dice que se debe al onboarding, que se alargó tras el cambio de precios.',
            },
          },
          check: {
            prompt: 'The decline, ___ began in March, has continued.',
            options: ['which', 'what', 'that it', 'who'],
            answer: 0,
            explanation: 'Usamos “which” para una cláusula relativa explicativa tras una coma.',
          },
          task: {
            kind: 'writing',
            title: 'Executive summary',
            prompt:
              'Resume en 140–170 palabras un estudio que muestra una caída de retención del 9% en clientes nuevos, asociada a un onboarding más largo. Incluye hallazgo, causa probable, limitación y recomendación.',
            points: ['Main finding with data', 'Likely driver', 'A limitation', 'A recommendation'],
            model:
              'Executive summary: new-customer retention\n\nRetention among customers acquired in the last quarter fell by nine percentage points, from 82% to 73%. The decline is concentrated in the first 30 days and affects all regions, although it is strongest in the self-service segment.\n\nThe data points to onboarding as the main driver. Since the pricing update in March, the average time to complete onboarding has increased from 4.2 to 6.8 days. Customers who complete onboarding within five days retain at similar rates to last year.\n\nIt is worth noting that the sample covers a single quarter and may include seasonal effects. We should validate the finding with the next cohort.\n\nWe recommend a targeted redesign of the first two onboarding steps before making further pricing changes, and a review of retention performance in six weeks.',
            minWords: 130,
          },
        },
        {
          title: 'Recommendations & impact',
          subtitle: 'Recomendar con evidencia',
          objective: 'Formular recomendaciones, cuantificar el impacto y anticipar riesgos.',
          minutes: 35,
          grammar: {
            title: 'Subjuntivo y conectores',
            formula: 'We recommend that + sujeto + verbo base · Given… · provided that… · as a result…',
            explanation:
              'Tras verbos como recommend, suggest o propose se usa el subjuntivo: “We recommend that the plan be approved”. Los conectores precisos (given, provided that, as a result) muestran relaciones lógicas y hacen que la recomendación sea fácil de evaluar.',
            examples: [
              'We recommend that the plan be approved.',
              'Given the current data, a phased rollout is safer.',
              'As a result, we expect a 12% reduction in support tickets.',
            ],
          },
          vocab: [
            { term: 'recommend', es: 'recomendar', example: 'We recommend a phased rollout.' },
            { term: 'prioritize', es: 'priorizar', example: 'We should prioritize the security review.' },
            { term: 'impact', es: 'impacto', example: 'The expected impact is a 10% cost reduction.' },
            { term: 'rollout', es: 'despliegue', example: 'The rollout will start in two regions.' },
          ],
          phrases: [
            { en: 'We recommend that the pilot be extended.', es: 'Recomendamos que se amplíe el piloto.' },
            { en: 'The expected impact is a 12% reduction in tickets.', es: 'El impacto esperado es una reducción del 12% en tickets.' },
            { en: 'This carries a risk of customer confusion.', es: 'Esto conlleva un riesgo de confusión en el cliente.' },
            { en: 'We suggest phasing the rollout.', es: 'Sugerimos hacer el despliegue por fases.' },
          ],
          dialogue: {
            context: 'Preguntas del consejo tras una recomendación.',
            lines: [
              { speaker: 'Chair', text: 'You recommend a phased rollout. Why not launch everywhere at once?' },
              { speaker: 'Ana', text: 'Given the support capacity, a full launch would create a backlog. A phased rollout lets us test demand.' },
              { speaker: 'Chair', text: 'What impact do you expect?' },
              { speaker: 'Ana', text: 'We expect a 12% reduction in support tickets and a faster onboarding for new clients.' },
              { speaker: 'Daniel', text: 'And what’s the main risk?' },
              { speaker: 'Ana', text: 'Customer confusion about availability. We’d mitigate that with clear communication and a waitlist.' },
              { speaker: 'Chair', text: 'Fine. Let’s approve the first phase and review in four weeks.' },
            ],
            question: {
              prompt: 'Why does Ana recommend a phased rollout?',
              options: ['To avoid a support backlog and test demand', 'To reduce the price', 'To delay the project', 'To avoid customer communication'],
              answer: 0,
              explanation: 'Ana menciona la capacidad de soporte y la posibilidad de probar la demanda.',
            },
          },
          check: {
            prompt: 'We recommend that the plan ___ approved.',
            options: ['be', 'is', 'will be', 'was'],
            answer: 0,
            explanation: 'Tras “recommend that” se usa el subjuntivo: be approved.',
          },
          task: {
            kind: 'writing',
            title: 'Recommendation memo',
            prompt:
              'Escribe un memo de 150–180 palabras recomendando un despliegue por fases. Incluye evidencia, impacto esperado, riesgo y mitigación.',
            points: ['Recommendation', 'Evidence', 'Expected impact', 'Risk and mitigation'],
            model:
              'Recommendation: phased rollout of the new client portal\n\nWe recommend that the new portal be rolled out in two phases, starting with the enterprise segment in April and extending to all clients in June.\n\nThe pilot with 40 enterprise clients showed a 22% reduction in onboarding time and a 12% decrease in support tickets. Given the current support capacity, a full launch would risk a backlog during the first weeks.\n\nThe expected impact of the phased approach is a smoother transition, with support volume spread over two months. It also allows us to collect feedback before the wider release.\n\nThe main risk is customer confusion about availability. To mitigate this, we would publish a clear timeline, offer a waitlist and brief account managers before each phase. We suggest reviewing results after four weeks and confirming the second phase only if ticket volume remains stable.\n\nWe seek approval to begin phase one in April.',
            minWords: 140,
          },
        },
      ],
    ),
  ],
}
