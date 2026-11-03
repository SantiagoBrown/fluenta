import type { Stage } from '../../types'
import { mod } from './helpers'

export const stageA2: Stage = {
  level: 'A2',
  title: 'Base laboral',
  tagline: 'Desenvuélvete con confianza en el día a día.',
  description:
    'Aprende a presentar a otras personas, hacer small talk, escribir correos básicos y resolver situaciones habituales sin depender de traducciones.',
  modules: [
    mod(
      'a2-m1',
      'A2',
      'People at work',
      'Relaciones',
      'Habla de roles, equipos y experiencia; mantén conversaciones informales con naturalidad.',
      'Podrás presentar a un colega y sostener una conversación breve de oficina.',
      3,
      [
        {
          title: 'Introduce yourself and others',
          subtitle: 'Roles, equipos y preguntas',
          objective: 'Presentar a un colega y preguntar por su rol y experiencia.',
          minutes: 25,
          grammar: {
            title: 'Preguntas en presente simple + posesivos',
            formula: 'What do you do? · Where does she work? · my / your / his / her / our / their',
            explanation:
              'Para preguntar por el trabajo usamos “What do you do?”. Con he/she/it aparece el auxiliar does y el verbo vuelve a su forma base. Los posesivos cambian según la persona: his (de él), her (de ella), their (de ellos).',
            examples: [
              'What do you do in the team?',
              'Which department does she work in?',
              'His role is technical lead.',
            ],
          },
          vocab: [
            { term: 'department', es: 'departamento', example: 'She works in the finance department.' },
            { term: 'role', es: 'puesto / rol', example: 'My role is product analyst.' },
            { term: 'experience', es: 'experiencia', example: 'He has five years of experience.' },
            { term: 'background', es: 'formación / trayectoria', example: 'Her background is in economics.' },
          ],
          phrases: [
            { en: 'I’m in charge of the design team.', es: 'Estoy a cargo del equipo de diseño.' },
            { en: 'She works in finance.', es: 'Ella trabaja en finanzas.' },
            { en: 'What do you do exactly?', es: '¿Qué haces exactamente?' },
            { en: 'I’ve been here for two years.', es: 'Llevo aquí dos años.' },
          ],
          dialogue: {
            context: 'Ana conoce a un nuevo compañero.',
            lines: [
              { speaker: 'Ana', text: 'Hi, I’m Ana. I don’t think we’ve met.' },
              { speaker: 'Marco', text: 'I’m Marco. I joined last week. I’m in the finance department.' },
              { speaker: 'Ana', text: 'Welcome! What do you do there?' },
              { speaker: 'Marco', text: 'I’m a financial analyst. I work on forecasting and reporting.' },
              { speaker: 'Ana', text: 'Nice. My role is product designer. I’m in charge of the mobile app.' },
              { speaker: 'Marco', text: 'That sounds interesting. How long have you been here?' },
            ],
            question: {
              prompt: 'What is Marco’s role?',
              options: ['Financial analyst', 'Product designer', 'Design manager', 'Forecasting manager'],
              answer: 0,
              explanation: 'Marco dice “I’m a financial analyst”.',
            },
          },
          check: {
            prompt: '___ department does she work in?',
            options: ['Which', 'Where', 'What', 'Who'],
            answer: 0,
            explanation: 'Para preguntar por un departamento concreto usamos “Which department…?”.',
          },
          task: {
            kind: 'speaking',
            title: 'Introduce a colleague',
            prompt: 'Presenta a un colega (real o imaginario): nombre, rol, departamento y una responsabilidad.',
            points: ['Name and role', 'Department', 'One responsibility', 'A detail about their experience'],
            model:
              'This is Marco. He’s a financial analyst in the finance department. He works on forecasting and reporting, and he has five years of experience in the sector.',
          },
        },
        {
          title: 'Small talk that works',
          subtitle: 'Conversaciones informales',
          objective: 'Iniciar y mantener small talk con el past simple.',
          minutes: 25,
          grammar: {
            title: 'Past simple',
            formula: 'regular: work → worked · irregular: go → went · did + base verb for questions',
            explanation:
              'El past simple describe acciones terminadas. Los verbos regulares añaden -ed; muchos comunes son irregulares (go/went, have/had, meet/met). En preguntas y negativas usamos did + verbo base.',
            examples: [
              'How was your weekend?',
              'Did you enjoy the workshop?',
              'I met the client on Monday.',
            ],
          },
          vocab: [
            { term: 'weekend', es: 'fin de semana', example: 'My weekend was very relaxing.' },
            { term: 'project', es: 'proyecto', example: 'The project started in April.' },
            { term: 'join', es: 'incorporarse', example: 'I joined the company last year.' },
            { term: 'recently', es: 'recientemente', example: 'We recently changed our process.' },
          ],
          phrases: [
            { en: 'How was your weekend?', es: '¿Qué tal el fin de semana?' },
            { en: 'Did you do anything nice?', es: '¿Hiciste algo interesante?' },
            { en: 'That sounds great.', es: 'Suena genial.' },
            { en: 'How about you?', es: '¿Y tú?' },
          ],
          dialogue: {
            context: 'Conversación junto a la cafetera.',
            lines: [
              { speaker: 'Daniel', text: 'Morning! How was your weekend?' },
              { speaker: 'Ana', text: 'Really good, thanks. I went hiking on Saturday. How about you?' },
              { speaker: 'Daniel', text: 'Nice! I stayed home and watched a series. Did you enjoy the workshop on Friday?' },
              { speaker: 'Ana', text: 'Yes, it was useful. I met the new research team.' },
              { speaker: 'Daniel', text: 'That sounds great. I missed it because I was with a client.' },
            ],
            question: {
              prompt: 'What did Ana do on Saturday?',
              options: ['She went hiking', 'She watched a series', 'She met a client', 'She stayed home'],
              answer: 0,
              explanation: 'Ana dice “I went hiking on Saturday”.',
            },
          },
          check: {
            prompt: '___ you enjoy the workshop yesterday?',
            options: ['Did', 'Do', 'Have', 'Were'],
            answer: 0,
            explanation: 'Pregunta en past simple: Did + sujeto + verbo base.',
          },
          task: {
            kind: 'writing',
            title: 'A quick Monday message',
            prompt: 'Escribe un mensaje a un compañero para retomar una conversación del viernes: pregunta por su fin de semana y cuenta algo que hiciste.',
            points: ['Friendly greeting', 'A question about their weekend', 'One thing you did', 'A follow-up question'],
            model:
              'Hi Daniel, how was your weekend? I went hiking on Saturday and it was great. Did you do anything nice? Let’s catch up at lunch. Ana',
            minWords: 40,
          },
        },
      ],
    ),
    mod(
      'a2-m2',
      'A2',
      'Email essentials',
      'Correo profesional',
      'Escribe correos claros y educados: peticiones, confirmaciones, disculpas y seguimiento.',
      'Podrás escribir un correo profesional breve sin sonar brusco ni demasiado formal.',
      3,
      [
        {
          title: 'Polite requests',
          subtitle: 'Peticiones educadas',
          objective: 'Hacer peticiones por correo con could y would.',
          minutes: 25,
          grammar: {
            title: 'Could / Would para la cortesía',
            formula: 'Could you + base verb? · Would it be possible to + base verb? · I’d appreciate it if + past',
            explanation:
              'Could y would suavizan una petición. “Send me the file” suena a orden; “Could you send me the file?” es profesional y neutro. “Would it be possible to…?” es aún más formal.',
            examples: [
              'Could you send me the updated file?',
              'Would it be possible to move the call to Friday?',
              'I’d appreciate it if you could confirm by Thursday.',
            ],
          },
          vocab: [
            { term: 'attach', es: 'adjuntar', example: 'Could you attach the latest version?' },
            { term: 'forward', es: 'reenviar', example: 'I’ll forward the email to the team.' },
            { term: 'confirm', es: 'confirmar', example: 'Please confirm the meeting time.' },
            { term: 'available', es: 'disponible', example: 'Are you available on Friday morning?' },
          ],
          phrases: [
            { en: 'Could you please send the file?', es: '¿Podrías enviar el archivo, por favor?' },
            { en: 'Would it be possible to move the call?', es: '¿Sería posible cambiar la llamada?' },
            { en: 'I’d appreciate it if you could confirm.', es: 'Te agradecería que lo confirmaras.' },
            { en: 'Please find attached the updated report.', es: 'Adjunto el informe actualizado.' },
          ],
          dialogue: {
            context: 'Llamada breve para revisar un correo.',
            lines: [
              { speaker: 'Maya', text: 'Did you get my email about the client meeting?' },
              { speaker: 'Ana', text: 'Yes, thanks. I have a question about the attachment.' },
              { speaker: 'Maya', text: 'Of course. What do you need?' },
              { speaker: 'Ana', text: 'Could you forward the original version? The numbers look different.' },
              { speaker: 'Maya', text: 'Sure, I’ll send it this afternoon. Are you available at four to review it?' },
              { speaker: 'Ana', text: 'Four works for me. Thanks!' },
            ],
            question: {
              prompt: 'What does Ana ask Maya to do?',
              options: ['Forward the original version', 'Call the client', 'Change the meeting time', 'Send a new contract'],
              answer: 0,
              explanation: 'Ana pide reenviar la versión original porque los números parecen distintos.',
            },
          },
          check: {
            prompt: 'Would it be possible ___ the meeting to Friday?',
            options: ['to move', 'move', 'moving', 'moved'],
            answer: 0,
            explanation: 'La estructura es “Would it be possible to + infinitivo”.',
          },
          task: {
            kind: 'writing',
            title: 'Request a file politely',
            prompt:
              'Escribe un correo breve a un compañero para pedirle la versión más reciente de un informe y proponer una llamada de 15 minutos.',
            points: ['Subject line', 'Polite request', 'Reason', 'Proposed time'],
            model:
              'Subject: Updated Q3 report\n\nHi Maya,\n\nCould you please send me the latest version of the Q3 report? I’d like to check the figures before our client call.\n\nWould you be available for a 15-minute call on Thursday at 10:00?\n\nThanks in advance,\nAna',
            minWords: 55,
          },
        },
        {
          title: 'Confirm, apologize, follow up',
          subtitle: 'Seguimiento y disculpas',
          objective: 'Confirmar, disculparte por un retraso y hacer seguimiento por escrito.',
          minutes: 25,
          grammar: {
            title: 'Present perfect vs past simple',
            formula: 'I sent it yesterday · I’ve just sent it · I’ll follow up tomorrow',
            explanation:
              'Usamos past simple con un momento concreto del pasado (yesterday, on Monday). Usamos present perfect cuando el momento no se especifica o el resultado es relevante ahora (I’ve sent it). Para el futuro, will o I’ll.',
            examples: [
              'I sent the report yesterday.',
              'I’ve just sent you the updated version.',
              'I’ll get back to you by Friday.',
            ],
          },
          vocab: [
            { term: 'delay', es: 'retraso', example: 'Sorry for the delay in my reply.' },
            { term: 'update', es: 'actualización', example: 'Here’s a quick update on the project.' },
            { term: 'schedule', es: 'programar', example: 'I’ll schedule the call for Monday.' },
            { term: 'apology', es: 'disculpa', example: 'Please accept my apology for the confusion.' },
          ],
          phrases: [
            { en: 'Just following up on my previous email.', es: 'Solo hago seguimiento de mi correo anterior.' },
            { en: 'Apologies for the delay.', es: 'Disculpa el retraso.' },
            { en: 'I’ll get back to you by Friday.', es: 'Te responderé antes del viernes.' },
            { en: 'Please confirm receipt.', es: 'Por favor, confirma la recepción.' },
          ],
          dialogue: {
            context: 'Mensaje de voz sobre un retraso.',
            lines: [
              { speaker: 'Maya', text: 'Hi Ana, it’s Maya. I’m calling about the vendor contract.' },
              { speaker: 'Maya', text: 'I’m sorry for the delay. Legal sent some comments this morning.' },
              { speaker: 'Maya', text: 'I’ll send you the revised version by five today.' },
              { speaker: 'Maya', text: 'Could you confirm receipt and let me know if anything is missing?' },
              { speaker: 'Maya', text: 'Thanks, and sorry again for the wait.' },
            ],
            question: {
              prompt: 'What will Maya send by five?',
              options: ['The revised contract', 'A legal invoice', 'A meeting invitation', 'A vendor list'],
              answer: 0,
              explanation: 'Maya dice que enviará la versión revisada del contrato antes de las cinco.',
            },
          },
          check: {
            prompt: 'I ___ the report yesterday.',
            options: ['sent', 'have sent', 'send', 'was send'],
            answer: 0,
            explanation: 'Con “yesterday” usamos past simple: sent.',
          },
          task: {
            kind: 'writing',
            title: 'Apologize and recover',
            prompt:
              'Escribe un correo a un cliente para disculparte por enviar un informe dos días tarde. Explica brevemente qué pasó, adjunta la versión final y propone una llamada.',
            points: ['Apology', 'Brief explanation', 'Attachment confirmation', 'Next step'],
            model:
              'Subject: Final report attached\n\nDear Mr. Clark,\n\nPlease accept my apologies for the delay in sending the report. We needed to verify some figures with our finance team.\n\nPlease find the final version attached. I would be happy to walk you through the key changes on a short call this week.\n\nKind regards,\nAna',
            minWords: 60,
          },
        },
      ],
    ),
  ],
}
