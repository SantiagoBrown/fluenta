import type { Stage } from '../../types'
import { mod } from './helpers'

export const stageA1: Stage = {
  level: 'A1',
  title: 'Primeros pasos',
  tagline: 'El inglés que necesitas para no quedarte en blanco.',
  description:
    'Construye una base sólida para presentarte, entender instrucciones sencillas y participar en situaciones cotidianas de la oficina.',
  modules: [
    mod(
      'a1-m1',
      'A1',
      'First contact',
      'Presentaciones',
      'Preséntate, habla de tu equipo y entiende las primeras conversaciones en la oficina.',
      'Podrás presentarte y responder preguntas básicas sobre tu trabajo.',
      2.5,
      [
        {
          title: 'Hello, I’m…',
          subtitle: 'Presentaciones y verbo to be',
          objective: 'Presentarte y describir a las personas de tu equipo con el verbo to be.',
          minutes: 20,
          grammar: {
            title: 'El verbo to be',
            formula: 'I am · you are · he/she/it is · we/you/they are',
            explanation:
              'To be equivale a “ser” o “estar”. En inglés no se omite nunca: decimos “I am Ana”, no “I Ana”. En el habla se contrae: I’m, you’re, he’s, she’s, we’re, they’re.',
            examples: [
              'I’m Ana. I’m a project coordinator.',
              'She’s in the marketing team.',
              'They’re in a meeting right now.',
            ],
          },
          vocab: [
            { term: 'colleague', es: 'compañero/a de trabajo', example: 'This is my colleague, Daniel.' },
            { term: 'manager', es: 'jefe/a', example: 'My manager is in a meeting.' },
            { term: 'office', es: 'oficina', example: 'The office is on the third floor.' },
            { term: 'team', es: 'equipo', example: 'I work in the design team.' },
          ],
          phrases: [
            { en: 'Hi, I’m Ana. Nice to meet you.', es: 'Hola, soy Ana. Encantada de conocerte.' },
            { en: 'I work in the marketing team.', es: 'Trabajo en el equipo de marketing.' },
            { en: 'She’s our new colleague.', es: 'Ella es nuestra nueva compañera.' },
            { en: 'How’s your first day going?', es: '¿Cómo va tu primer día?' },
          ],
          dialogue: {
            context: 'Primer día en la oficina.',
            lines: [
              { speaker: 'Daniel', text: 'Hi, I’m Daniel. Are you the new designer?' },
              { speaker: 'Ana', text: 'Yes, I’m Ana. Nice to meet you.' },
              { speaker: 'Daniel', text: 'Welcome! I’m in the product team. Our manager is Maya.' },
              { speaker: 'Ana', text: 'Great. Is Maya here today?' },
              { speaker: 'Daniel', text: 'She’s in a meeting, but she’ll be back at eleven.' },
            ],
            question: {
              prompt: 'Who is Maya?',
              options: ['The manager', 'The new designer', 'A client', 'The receptionist'],
              answer: 0,
              explanation: 'Daniel dice “Our manager is Maya”.',
            },
          },
          check: {
            prompt: 'My colleague ___ in the Berlin office.',
            options: ['is', 'are', 'am', 'be'],
            answer: 0,
            explanation: '“My colleague” es tercera persona singular: is.',
          },
          task: {
            kind: 'speaking',
            title: 'Your 45-second introduction',
            prompt: 'Preséntate en voz alta: tu nombre, tu rol, tu equipo y una cosa que haces en tu trabajo.',
            points: ['Name and role', 'Team or department', 'One thing you do', 'A greeting or closing line'],
            model:
              'Hi, I’m Ana. I’m a product designer in the design team. I work on the mobile app and I collaborate with engineers every day. Nice to meet you.',
          },
        },
        {
          title: 'Numbers, time & requests',
          subtitle: 'Horarios, lugares y peticiones',
          objective: 'Preguntar por lugares y horas, y hacer peticiones sencillas con can.',
          minutes: 25,
          grammar: {
            title: 'There is / There are + can',
            formula: 'There is + singular · There are + plural · Can I/you + verbo?',
            explanation:
              'Usamos there is / there are para decir que algo existe. Can sirve para pedir permiso o pedir algo de forma sencilla: “Can I have…?”.',
            examples: [
              'There’s a coffee machine in the kitchen.',
              'There are two meeting rooms on this floor.',
              'Can I have a copy of the agenda?',
            ],
          },
          vocab: [
            { term: 'meeting', es: 'reunión', example: 'The meeting is at ten.' },
            { term: 'floor', es: 'planta / piso', example: 'The kitchen is on the second floor.' },
            { term: 'report', es: 'informe', example: 'I need the report by Friday.' },
            { term: 'email', es: 'correo electrónico', example: 'I sent you an email this morning.' },
          ],
          phrases: [
            { en: 'Can I have a copy, please?', es: '¿Me das una copia, por favor?' },
            { en: 'The meeting is at 10:30.', es: 'La reunión es a las 10:30.' },
            { en: 'It’s on the second floor.', es: 'Está en la segunda planta.' },
            { en: 'Sorry, could you repeat that?', es: 'Perdona, ¿podrías repetirlo?' },
          ],
          dialogue: {
            context: 'Ana busca la sala de reuniones.',
            lines: [
              { speaker: 'Ana', text: 'Excuse me, is there a meeting room on this floor?' },
              { speaker: 'Daniel', text: 'Yes, there are two. Room 2A is next to the stairs.' },
              { speaker: 'Ana', text: 'Thanks. And is there a printer here?' },
              { speaker: 'Daniel', text: 'There’s one in the kitchen, but it’s usually busy.' },
              { speaker: 'Ana', text: 'OK. Can I use the printer on the third floor?' },
              { speaker: 'Daniel', text: 'Sure. You need your card to log in.' },
            ],
            question: {
              prompt: 'Where is Room 2A?',
              options: ['Next to the stairs', 'In the kitchen', 'On the third floor', 'Next to reception'],
              answer: 0,
              explanation: 'Daniel dice “Room 2A is next to the stairs”.',
            },
          },
          check: {
            prompt: '___ a printer on this floor?',
            options: ['Is there', 'Are there', 'There is', 'Has there'],
            answer: 0,
            explanation: 'Con un sustantivo singular usamos “Is there…?”.',
          },
          task: {
            kind: 'writing',
            title: 'A short message to a colleague',
            prompt:
              'Escribe un mensaje corto a un compañero para confirmar una reunión. Incluye el día, la hora y el lugar.',
            points: ['Greeting', 'Day and time', 'Place', 'A closing line'],
            model:
              'Hi Daniel, just to confirm our meeting on Tuesday at 10:30. It’s in Room 2A on the second floor. See you there! Ana',
            minWords: 35,
          },
        },
      ],
    ),
    mod(
      'a1-m2',
      'A1',
      'Work basics',
      'La oficina',
      'Ubica objetos, pide ayuda y describe tu rutina diaria con frases simples.',
      'Podrás moverte por la oficina y hablar de tu día de trabajo.',
      2.5,
      [
        {
          title: 'Tools & places',
          subtitle: 'Objetos y preposiciones de lugar',
          objective: 'Pedir ayuda para encontrar objetos y describir dónde están.',
          minutes: 20,
          grammar: {
            title: 'Preposiciones de lugar',
            formula: 'in · on · at · next to · between · near',
            explanation:
              'In indica dentro de un espacio; on, sobre una superficie; at, en un punto concreto; next to, al lado de. No traduzcas literalmente del español: se dice “in the office”, “on the second floor”, “at reception”.',
            examples: [
              'The printer is next to the meeting room.',
              'Your laptop is on the desk.',
              'I’m at reception.',
            ],
          },
          vocab: [
            { term: 'desk', es: 'escritorio', example: 'My desk is near the window.' },
            { term: 'meeting room', es: 'sala de reuniones', example: 'The meeting room is on the left.' },
            { term: 'printer', es: 'impresora', example: 'The printer is not working.' },
            { term: 'password', es: 'contraseña', example: 'I forgot my password.' },
          ],
          phrases: [
            { en: 'It’s next to the stairs.', es: 'Está al lado de las escaleras.' },
            { en: 'The printer is on the left.', es: 'La impresora está a la izquierda.' },
            { en: 'I can’t log in.', es: 'No puedo iniciar sesión.' },
            { en: 'Try your company password.', es: 'Prueba con tu contraseña de la empresa.' },
          ],
          dialogue: {
            context: 'Ana no encuentra la impresora.',
            lines: [
              { speaker: 'Ana', text: 'Sorry, where’s the printer?' },
              { speaker: 'Daniel', text: 'It’s next to the meeting room, on the left.' },
              { speaker: 'Ana', text: 'Thanks. Do I need a password?' },
              { speaker: 'Daniel', text: 'Yes, your company password. It’s the same as your email.' },
              { speaker: 'Ana', text: 'Great. And is there paper in it?' },
              { speaker: 'Daniel', text: 'I think so. If not, ask reception.' },
            ],
            question: {
              prompt: 'What does Ana need to use the printer?',
              options: ['Her company password', 'A new card', 'Daniel’s laptop', 'A key'],
              answer: 0,
              explanation: 'Daniel dice que necesita su contraseña de la empresa.',
            },
          },
          check: {
            prompt: 'The printer is ___ the meeting room.',
            options: ['next to', 'next', 'on', 'at'],
            answer: 0,
            explanation: '“Next to” significa al lado de. “Next” solo no indica posición.',
          },
          task: {
            kind: 'speaking',
            title: 'Ask for help',
            prompt: 'Pide ayuda para encontrar un objeto de la oficina. Usa “Excuse me, where’s…?” y da las gracias.',
            points: ['Polite opening', 'Name an object', 'Ask a follow-up question', 'Thank the person'],
            model:
              'Excuse me, where’s the meeting room? Is it on this floor? … Thanks a lot for your help.',
          },
        },
        {
          title: 'A normal workday',
          subtitle: 'Presente simple y rutinas',
          objective: 'Describir tu rutina y hacer preguntas sobre horarios.',
          minutes: 25,
          grammar: {
            title: 'Presente simple + adverbios de frecuencia',
            formula: 'I/you/we/they work · he/she/it works · always / usually / sometimes / never',
            explanation:
              'El presente simple describe rutinas y hechos. Con he/she/it el verbo añade -s. Los adverbios de frecuencia van antes del verbo principal: “I usually start at nine”.',
            examples: [
              'I usually start at nine.',
              'We have a stand-up every morning.',
              'She sometimes works from home.',
            ],
          },
          vocab: [
            { term: 'stand-up', es: 'reunión breve de equipo', example: 'We have a stand-up at 9:15.' },
            { term: 'lunch break', es: 'pausa para comer', example: 'My lunch break is at one.' },
            { term: 'schedule', es: 'horario / agenda', example: 'My schedule is full today.' },
            { term: 'task', es: 'tarea', example: 'This task takes about an hour.' },
          ],
          phrases: [
            { en: 'I usually start at nine.', es: 'Normalmente empiezo a las nueve.' },
            { en: 'We have a stand-up every morning.', es: 'Tenemos una reunión breve cada mañana.' },
            { en: 'I sometimes work from home.', es: 'A veces trabajo desde casa.' },
            { en: 'What time do you finish?', es: '¿A qué hora terminas?' },
          ],
          dialogue: {
            context: 'Dos compañeros hablan de su rutina.',
            lines: [
              { speaker: 'Daniel', text: 'What time do you usually start?' },
              { speaker: 'Ana', text: 'I start at nine. We have a stand-up at 9:15.' },
              { speaker: 'Daniel', text: 'Same here. Do you work from home on Fridays?' },
              { speaker: 'Ana', text: 'Sometimes. It depends on my schedule.' },
              { speaker: 'Daniel', text: 'My lunch break is at one. Do you want to get coffee?' },
              { speaker: 'Ana', text: 'Sure, see you at one.' },
            ],
            question: {
              prompt: 'When is the stand-up?',
              options: ['At 9:15', 'At nine', 'At one', 'At five'],
              answer: 0,
              explanation: 'Ana dice que el stand-up es a las 9:15.',
            },
          },
          check: {
            prompt: 'She ___ from home on Fridays.',
            options: ['usually works', 'works usually', 'usually work', 'work usually'],
            answer: 0,
            explanation: 'El adverbio va antes del verbo, y con “she” el verbo lleva -s: usually works.',
          },
          task: {
            kind: 'writing',
            title: 'Describe your workday',
            prompt: 'Escribe un párrafo corto sobre tu día típico de trabajo: hora de inicio, reuniones, pausa y tareas.',
            points: ['Start time', 'One routine or meeting', 'Lunch break', 'One task you do'],
            model:
              'I usually start at nine. I check my emails and then we have a short team meeting. My lunch break is at one. In the afternoon, I work on client tasks and sometimes I have a call with my manager. I finish at six.',
            minWords: 45,
          },
        },
      ],
    ),
  ],
}
