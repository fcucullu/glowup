export interface Phrase {
  id: string;
  category: string;
  english: string;
  spanish: string;
  pronunciation_tip: string;
  audio_text: string;
  formality: number;
}

export type ExerciseType = 'listen_identify' | 'respond_choose' | 'phrase_complete' | 'pronunciation';

export interface Exercise {
  id: string;
  type: ExerciseType;
  category: string;
  question_en: string;
  question_es: string;
  options?: string[];
  correct_answer: string;
  explanation_es: string;
  audio_text?: string;
}

export const categories = [
  { id: 'greetings', name: 'Saludos y bienvenida', icon: '👋' },
  { id: 'appointments', name: 'Citas y horarios', icon: '📅' },
  { id: 'directions', name: 'Indicaciones', icon: '🚪' },
  { id: 'waiting', name: 'Esperas y demoras', icon: '⏳' },
  { id: 'payments', name: 'Pagos y precios', icon: '💳' },
  { id: 'questions', name: 'Preguntas frecuentes', icon: '❓' },
  { id: 'problems', name: 'Problemas y quejas', icon: '⚠️' },
  { id: 'goodbye', name: 'Despedida y seguimiento', icon: '👋' },
];

export const phrases: Phrase[] = [
  // Greetings & Welcome
  { id: 'g1', category: 'greetings', english: 'Good morning, welcome to our clinic', spanish: 'Buenos días, bienvenido/a a nuestra clínica', pronunciation_tip: 'GUD MOR-ning. "Morning" rima con "warning".', audio_text: 'Good morning, welcome to our clinic', formality: 2 },
  { id: 'g2', category: 'greetings', english: 'Hi, do you have an appointment?', spanish: 'Hola, ¿tiene cita?', pronunciation_tip: 'Du yu jav an a-POINT-ment? La "t" final es suave.', audio_text: 'Hi, do you have an appointment?', formality: 1 },
  { id: 'g3', category: 'greetings', english: 'What name is the appointment under?', spanish: '¿A nombre de quién es la cita?', pronunciation_tip: 'Wot NEIM is de a-POINT-ment AN-der? "Under" suena como "ander".', audio_text: 'What name is the appointment under?', formality: 2 },
  { id: 'g4', category: 'greetings', english: 'Please have a seat, someone will be with you shortly', spanish: 'Por favor, tome asiento, alguien estará con usted en breve', pronunciation_tip: 'Plís jav a SIT. "Seat" rima con "meet". SHORT-li = pronto.', audio_text: 'Please have a seat, someone will be with you shortly', formality: 3 },
  { id: 'g5', category: 'greetings', english: 'Can I offer you some water or tea while you wait?', spanish: '¿Puedo ofrecerle agua o té mientras espera?', pronunciation_tip: 'Can ai O-fer yu som WO-ter or TI wail yu WEIT?', audio_text: 'Can I offer you some water or tea while you wait?', formality: 2 },
  { id: 'g6', category: 'greetings', english: 'Your therapist will be right with you', spanish: 'Su terapeuta estará con usted enseguida', pronunciation_tip: 'Yor THE-ra-pist wil bi RAIT wid yu. "Therapist" empieza con "TH" suave.', audio_text: 'Your therapist will be right with you', formality: 2 },

  // Appointments & Scheduling
  { id: 'a1', category: 'appointments', english: 'Your appointment is at 3pm', spanish: 'Su cita es a las 3pm', pronunciation_tip: 'Yor a-POINT-ment is at TRI pi em.', audio_text: 'Your appointment is at 3 PM', formality: 2 },
  { id: 'a2', category: 'appointments', english: 'Would you like to reschedule?', spanish: '¿Le gustaría reprogramar?', pronunciation_tip: 'Wud yu LAIK tu ri-SCHE-diul? "Reschedule" = ri-SCHE-diul.', audio_text: 'Would you like to reschedule?', formality: 2 },
  { id: 'a3', category: 'appointments', english: "I'm sorry, we're fully booked today", spanish: 'Lo siento, estamos completos hoy', pronunciation_tip: 'Aim SO-ri, wir FU-li BUKT tu-DEI. "Booked" rima con "cooked".', audio_text: "I'm sorry, we're fully booked today", formality: 2 },
  { id: 'a4', category: 'appointments', english: 'We have an opening at 3pm, would that work?', spanish: 'Tenemos un hueco a las 3pm, ¿le vendría bien?', pronunciation_tip: 'Wi jav an O-pe-ning. "Opening" = hueco disponible.', audio_text: 'We have an opening at 3 PM, would that work?', formality: 2 },
  { id: 'a5', category: 'appointments', english: 'Your session will last approximately one hour', spanish: 'Su sesión durará aproximadamente una hora', pronunciation_tip: 'Yor SE-shon wil last a-PROX-i-met-li wan AUR.', audio_text: 'Your session will last approximately one hour', formality: 3 },
  { id: 'a6', category: 'appointments', english: 'We need to take your details for the first visit', spanish: 'Necesitamos tomar sus datos para la primera visita', pronunciation_tip: 'Wi nid tu teik yor DI-teils. "Details" = DI-teils, no "de-tails".', audio_text: 'We need to take your details for the first visit', formality: 2 },

  // Directions & Navigation
  { id: 'd1', category: 'directions', english: 'Please follow me to room D', spanish: 'Por favor, sígame a la sala D', pronunciation_tip: 'Plís FO-lou mi tu rum DI. "Follow" = FO-lou.', audio_text: 'Please follow me to room D', formality: 2 },
  { id: 'd2', category: 'directions', english: 'The restroom is down the hall on your left', spanish: 'El baño está al fondo del pasillo a su izquierda', pronunciation_tip: 'De REST-rum is DAUN de jol on yor LEFT.', audio_text: 'The restroom is down the hall on your left', formality: 2 },
  { id: 'd3', category: 'directions', english: 'Please change into the robe provided', spanish: 'Por favor, cámbiese a la bata proporcionada', pronunciation_tip: 'Plís CHEINCH in-tu de ROUB pro-VAI-ded. "Robe" = ROUB.', audio_text: 'Please change into the robe provided', formality: 3 },
  { id: 'd4', category: 'directions', english: 'You can leave your belongings in the locker', spanish: 'Puede dejar sus pertenencias en el casillero', pronunciation_tip: 'Yu can LIV yor bi-LON-gings in de LO-ker.', audio_text: 'You can leave your belongings in the locker', formality: 2 },
  { id: 'd5', category: 'directions', english: 'The waiting area is just through those doors', spanish: 'La sala de espera está justo por esas puertas', pronunciation_tip: 'De WEI-ting E-ria is yast TRU dous DORS.', audio_text: 'The waiting area is just through those doors', formality: 2 },

  // Waiting & Delays
  { id: 'w1', category: 'waiting', english: 'One moment please, let me check', spanish: 'Un momento por favor, déjeme verificar', pronunciation_tip: 'Wan MO-ment plís, let mi CHEK.', audio_text: 'One moment please, let me check', formality: 2 },
  { id: 'w2', category: 'waiting', english: "I'm sorry for the wait, it will just be a few more minutes", spanish: 'Disculpe la espera, serán solo unos minutos más', pronunciation_tip: 'Aim SO-ri for de WEIT. "Wait" rima con "late".', audio_text: "I'm sorry for the wait, it will just be a few more minutes", formality: 2 },
  { id: 'w3', category: 'waiting', english: 'Your therapist is running about 10 minutes behind', spanish: 'Su terapeuta lleva unos 10 minutos de retraso', pronunciation_tip: 'Yor THE-ra-pist is RA-ning a-BAUT ten MI-nits bi-JAIND.', audio_text: 'Your therapist is running about 10 minutes behind', formality: 2 },
  { id: 'w4', category: 'waiting', english: 'Would you like to reschedule or wait?', spanish: '¿Prefiere reprogramar o esperar?', pronunciation_tip: 'Wud yu laik tu ri-SCHE-diul or WEIT?', audio_text: 'Would you like to reschedule or wait?', formality: 2 },
  { id: 'w5', category: 'waiting', english: 'Thank you for your patience', spanish: 'Gracias por su paciencia', pronunciation_tip: 'Zenk yu for yor PEI-shens. "Patience" = PEI-shens.', audio_text: 'Thank you for your patience', formality: 3 },

  // Payments & Prices
  { id: 'p1', category: 'payments', english: 'The total comes to 85 euros', spanish: 'El total es de 85 euros', pronunciation_tip: 'De TOU-tal cams tu EI-ti faiv YU-rous.', audio_text: 'The total comes to 85 euros', formality: 2 },
  { id: 'p2', category: 'payments', english: 'We accept card and cash', spanish: 'Aceptamos tarjeta y efectivo', pronunciation_tip: 'Wi ak-SEPT card and cash. "Accept" = ak-SEPT.', audio_text: 'We accept card and cash', formality: 2 },
  { id: 'p3', category: 'payments', english: 'Would you like to pay now or at the end?', spanish: '¿Desea pagar ahora o al final?', pronunciation_tip: 'Wud yu laik tu PEI nau or at de END?', audio_text: 'Would you like to pay now or at the end?', formality: 2 },
  { id: 'p4', category: 'payments', english: 'Here is your receipt', spanish: 'Aquí tiene su recibo', pronunciation_tip: 'Jir is yor ri-SIT. "Receipt" = ri-SIT (la "p" es muda).', audio_text: 'Here is your receipt', formality: 2 },
  { id: 'p5', category: 'payments', english: 'We have a special offer on packages right now', spanish: 'Tenemos una oferta especial en paquetes ahora mismo', pronunciation_tip: 'Wi jav a SPE-shal O-fer on PA-ke-ches rait nau.', audio_text: 'We have a special offer on packages right now', formality: 2 },
  { id: 'p6', category: 'payments', english: 'Would you like to add a tip?', spanish: '¿Le gustaría dejar propina?', pronunciation_tip: 'Wud yu laik tu ad a TIP? Corto y directo.', audio_text: 'Would you like to add a tip?', formality: 1 },

  // Common Client Questions
  { id: 'q1', category: 'questions', english: "There's parking available behind the building", spanish: 'Hay estacionamiento detrás del edificio', pronunciation_tip: 'Ders PAR-king a-VEI-la-bol bi-JAIND de BIL-ding.', audio_text: "There's parking available behind the building", formality: 2 },
  { id: 'q2', category: 'questions', english: 'No, we provide everything you need', spanish: 'No, nosotros proporcionamos todo lo que necesita', pronunciation_tip: 'Nou, wi pro-VAID EV-ri-zing yu nid.', audio_text: 'No, we provide everything you need', formality: 2 },
  { id: 'q3', category: 'questions', english: 'We require 24 hours notice for cancellations', spanish: 'Requerimos 24 horas de antelación para cancelaciones', pronunciation_tip: 'Wi ri-KUAIR tuen-ti for AURS NOU-tis for can-se-LEI-shons.', audio_text: 'We require 24 hours notice for cancellations', formality: 3 },
  { id: 'q4', category: 'questions', english: 'Yes, the password is on the card at reception', spanish: 'Sí, la contraseña está en la tarjeta de recepción', pronunciation_tip: 'Yes, de PAS-word is on de card at ri-SEP-shon.', audio_text: 'Yes, the password is on the card at reception', formality: 1 },
  { id: 'q5', category: 'questions', english: 'Our facials start at 60 euros', spanish: 'Nuestros tratamientos faciales empiezan en 60 euros', pronunciation_tip: 'Aur FEI-shals start at SIX-ti YU-rous. "Facials" = FEI-shals.', audio_text: 'Our facials start at 60 euros', formality: 2 },

  // Problems & Complaints
  { id: 'pr1', category: 'problems', english: "I'm sorry to hear that, let me get the manager", spanish: 'Lamento escuchar eso, déjeme llamar al gerente', pronunciation_tip: 'Aim SO-ri tu JIR dat, let mi get de MA-na-cher.', audio_text: "I'm sorry to hear that, let me get the manager", formality: 3 },
  { id: 'pr2', category: 'problems', english: 'I apologize for the inconvenience', spanish: 'Pido disculpas por la molestia', pronunciation_tip: 'Ai a-PO-lo-chaiz for de in-con-VI-niens.', audio_text: 'I apologize for the inconvenience', formality: 3 },
  { id: 'pr3', category: 'problems', english: "We'll do our best to fix this for you", spanish: 'Haremos todo lo posible para solucionarlo', pronunciation_tip: 'Wil du aur BEST tu FIX dis for yu.', audio_text: "We'll do our best to fix this for you", formality: 2 },
  { id: 'pr4', category: 'problems', english: 'Would you like to speak with someone?', spanish: '¿Le gustaría hablar con alguien?', pronunciation_tip: 'Wud yu laik tu SPIK wid SAM-wan?', audio_text: 'Would you like to speak with someone?', formality: 2 },
  { id: 'pr5', category: 'problems', english: 'I understand your frustration, let me see what I can do', spanish: 'Entiendo su frustración, déjeme ver qué puedo hacer', pronunciation_tip: 'Ai an-der-STAND yor fras-TREI-shon. "Frustration" = fras-TREI-shon.', audio_text: 'I understand your frustration, let me see what I can do', formality: 3 },

  // Goodbye & Follow-up
  { id: 'bye1', category: 'goodbye', english: 'Thank you for coming, have a lovely day!', spanish: '¡Gracias por venir, que tenga un lindo día!', pronunciation_tip: 'Zenk yu for CA-ming, jav a LAV-li dei! "Lovely" = LAV-li.', audio_text: 'Thank you for coming, have a lovely day!', formality: 2 },
  { id: 'bye2', category: 'goodbye', english: 'Would you like to book your next appointment?', spanish: '¿Le gustaría reservar su próxima cita?', pronunciation_tip: 'Wud yu laik tu BUK yor next a-POINT-ment?', audio_text: 'Would you like to book your next appointment?', formality: 2 },
  { id: 'bye3', category: 'goodbye', english: "We'll send you a reminder before your next visit", spanish: 'Le enviaremos un recordatorio antes de su próxima visita', pronunciation_tip: 'Wil send yu a ri-MAIN-der bi-FOR yor next VI-sit.', audio_text: "We'll send you a reminder before your next visit", formality: 2 },
  { id: 'bye4', category: 'goodbye', english: "Don't forget to check our special offers", spanish: 'No olvide revisar nuestras ofertas especiales', pronunciation_tip: 'Dont for-GET tu CHEK aur SPE-shal O-fers.', audio_text: "Don't forget to check our special offers", formality: 1 },
  { id: 'bye5', category: 'goodbye', english: 'See you next time!', spanish: '¡Hasta la próxima!', pronunciation_tip: 'Si yu NEXT taim! Corto y amigable.', audio_text: 'See you next time!', formality: 1 },
];

export const exercises: Exercise[] = [
  // listen_identify exercises
  { id: 'ex1', type: 'listen_identify', category: 'greetings', question_en: 'Good morning, welcome to our clinic', question_es: '¿Qué dijo la recepcionista?', options: ['Buenos días, bienvenido a nuestra clínica', 'Buenas tardes, ¿tiene cita?', 'Por favor, tome asiento', 'Su terapeuta llegará pronto'], correct_answer: 'Buenos días, bienvenido a nuestra clínica', explanation_es: '"Good morning, welcome to our clinic" significa "Buenos días, bienvenido a nuestra clínica".', audio_text: 'Good morning, welcome to our clinic' },
  { id: 'ex2', type: 'listen_identify', category: 'appointments', question_en: "I'm sorry, we're fully booked today", question_es: '¿Qué dijo la recepcionista?', options: ['Estamos completos hoy', 'Tenemos un hueco disponible', 'Su cita es mañana', 'Puede venir cuando quiera'], correct_answer: 'Estamos completos hoy', explanation_es: '"Fully booked" significa que no hay citas disponibles.', audio_text: "I'm sorry, we're fully booked today" },
  { id: 'ex3', type: 'listen_identify', category: 'payments', question_en: 'We accept card and cash', question_es: '¿Qué dijo la recepcionista?', options: ['Aceptamos tarjeta y efectivo', 'Solo aceptamos efectivo', 'El pago es por adelantado', 'No aceptamos tarjeta'], correct_answer: 'Aceptamos tarjeta y efectivo', explanation_es: '"Card and cash" = tarjeta y efectivo. "Accept" = aceptar.', audio_text: 'We accept card and cash' },
  { id: 'ex4', type: 'listen_identify', category: 'waiting', question_en: 'Your therapist is running about 10 minutes behind', question_es: '¿Qué dijo la recepcionista?', options: ['Su terapeuta lleva 10 minutos de retraso', 'Su terapeuta está corriendo', 'Faltan 10 minutos para su cita', 'Su terapeuta ya llegó'], correct_answer: 'Su terapeuta lleva 10 minutos de retraso', explanation_es: '"Running behind" significa llevar retraso, no correr literalmente.', audio_text: 'Your therapist is running about 10 minutes behind' },
  { id: 'ex5', type: 'listen_identify', category: 'directions', question_en: 'The restroom is down the hall on your left', question_es: '¿Qué dijo la recepcionista?', options: ['El baño está al fondo a la izquierda', 'El baño está a la derecha', 'El baño está arriba', 'No hay baño disponible'], correct_answer: 'El baño está al fondo a la izquierda', explanation_es: '"Down the hall" = al fondo del pasillo. "On your left" = a su izquierda.', audio_text: 'The restroom is down the hall on your left' },
  { id: 'ex6', type: 'listen_identify', category: 'goodbye', question_en: 'Would you like to book your next appointment?', question_es: '¿Qué te preguntó?', options: ['Si quieres reservar tu próxima cita', 'Si quieres cancelar tu cita', 'Si la cita fue bien', 'Si necesitas algo más'], correct_answer: 'Si quieres reservar tu próxima cita', explanation_es: '"Book" en este contexto significa reservar, no libro.', audio_text: 'Would you like to book your next appointment?' },
  { id: 'ex7', type: 'listen_identify', category: 'problems', question_en: 'I apologize for the inconvenience', question_es: '¿Qué dijo la recepcionista?', options: ['Pido disculpas por la molestia', 'No es mi problema', 'Vuelva otro día', 'No puedo ayudarle'], correct_answer: 'Pido disculpas por la molestia', explanation_es: '"Apologize" = disculparse. "Inconvenience" = molestia o inconveniencia.', audio_text: 'I apologize for the inconvenience' },
  { id: 'ex8', type: 'listen_identify', category: 'questions', question_en: 'We require 24 hours notice for cancellations', question_es: '¿Qué dijo la recepcionista?', options: ['Se requieren 24 horas de antelación para cancelar', 'Puede cancelar en cualquier momento', 'Las cancelaciones son gratuitas', 'No se permiten cancelaciones'], correct_answer: 'Se requieren 24 horas de antelación para cancelar', explanation_es: '"Require" = requerir. "Notice" = aviso previo. "Cancellations" = cancelaciones.', audio_text: 'We require 24 hours notice for cancellations' },

  // respond_choose exercises
  { id: 'ex9', type: 'respond_choose', category: 'greetings', question_en: 'A client just walked in', question_es: 'Un cliente acaba de llegar. ¿Qué le dirías?', options: ['Good morning, welcome to our clinic', 'Goodbye, see you next time', 'Your total is 85 euros'], correct_answer: 'Good morning, welcome to our clinic', explanation_es: 'Al recibir a un cliente, lo correcto es darle la bienvenida con un saludo cordial.' },
  { id: 'ex10', type: 'respond_choose', category: 'appointments', question_en: 'A client wants to change their appointment', question_es: 'Un cliente quiere cambiar su cita. ¿Qué le dirías?', options: ['Would you like to reschedule?', 'Here is your receipt', 'The restroom is on your left'], correct_answer: 'Would you like to reschedule?', explanation_es: '"Reschedule" significa reprogramar. Es la frase correcta para ofrecer un cambio de cita.' },
  { id: 'ex11', type: 'respond_choose', category: 'waiting', question_en: 'The therapist is delayed', question_es: 'El terapeuta se retrasó. ¿Qué le dices al cliente?', options: ["I'm sorry for the wait, it will just be a few more minutes", 'Would you like to add a tip?', 'Please change into the robe provided'], correct_answer: "I'm sorry for the wait, it will just be a few more minutes", explanation_es: 'Siempre disculparse por la espera y dar una estimación de tiempo.' },
  { id: 'ex12', type: 'respond_choose', category: 'payments', question_en: 'A client asks how they can pay', question_es: 'Un cliente pregunta cómo puede pagar. ¿Qué le dices?', options: ['We accept card and cash', 'Please follow me to room D', 'Thank you for your patience'], correct_answer: 'We accept card and cash', explanation_es: '"We accept card and cash" informa sobre los métodos de pago disponibles.' },
  { id: 'ex13', type: 'respond_choose', category: 'problems', question_en: 'A client is upset about the service', question_es: 'Un cliente está molesto con el servicio. ¿Qué le dices?', options: ['I understand your frustration, let me see what I can do', 'See you next time!', 'We have a special offer on packages'], correct_answer: 'I understand your frustration, let me see what I can do', explanation_es: 'Ante una queja, es importante mostrar empatía y ofrecer una solución.' },
  { id: 'ex14', type: 'respond_choose', category: 'directions', question_en: 'A client asks where the bathroom is', question_es: 'Un cliente pregunta dónde está el baño. ¿Qué le dices?', options: ['The restroom is down the hall on your left', 'Would you like to reschedule?', 'The total comes to 85 euros'], correct_answer: 'The restroom is down the hall on your left', explanation_es: '"Restroom" es la forma educada de decir "baño" en inglés.' },
  { id: 'ex15', type: 'respond_choose', category: 'goodbye', question_en: 'A client is leaving after their session', question_es: 'Un cliente se va después de su sesión. ¿Qué le dices?', options: ['Thank you for coming, have a lovely day!', 'One moment please, let me check', "I'm sorry, we're fully booked today"], correct_answer: 'Thank you for coming, have a lovely day!', explanation_es: 'Una despedida cálida deja una buena impresión en el cliente.' },

  // phrase_complete exercises
  { id: 'ex16', type: 'phrase_complete', category: 'greetings', question_en: 'Please have a ___, someone will be with you shortly', question_es: 'Completa la frase: "Please have a ___, someone will be with you shortly"', options: ['seat', 'sit', 'chair', 'place'], correct_answer: 'seat', explanation_es: '"Have a seat" es la expresión correcta para pedir a alguien que se siente.' },
  { id: 'ex17', type: 'phrase_complete', category: 'appointments', question_en: 'We have an ___ at 3pm, would that work?', question_es: 'Completa: "We have an ___ at 3pm, would that work?"', options: ['opening', 'open', 'space', 'hour'], correct_answer: 'opening', explanation_es: '"Opening" significa hueco o espacio disponible en la agenda.' },
  { id: 'ex18', type: 'phrase_complete', category: 'directions', question_en: 'Please ___ me to room D', question_es: 'Completa: "Please ___ me to room D"', options: ['follow', 'go', 'come', 'walk'], correct_answer: 'follow', explanation_es: '"Follow me" = "sígame". Es la forma estándar de guiar a alguien.' },
  { id: 'ex19', type: 'phrase_complete', category: 'payments', question_en: 'Here is your ___', question_es: 'Completa: "Here is your ___"', options: ['receipt', 'recipe', 'receive', 'recite'], correct_answer: 'receipt', explanation_es: '"Receipt" (ri-SIT) = recibo. Cuidado: "recipe" = receta de cocina.' },
  { id: 'ex20', type: 'phrase_complete', category: 'waiting', question_en: 'Thank you for your ___', question_es: 'Completa: "Thank you for your ___"', options: ['patience', 'patient', 'waiting', 'time'], correct_answer: 'patience', explanation_es: '"Patience" (PEI-shens) = paciencia. "Patient" es el adjetivo o sustantivo (paciente).' },
  { id: 'ex21', type: 'phrase_complete', category: 'problems', question_en: "I'm sorry to hear that, let me get the ___", question_es: 'Completa: "I\'m sorry to hear that, let me get the ___"', options: ['manager', 'doctor', 'police', 'boss'], correct_answer: 'manager', explanation_es: '"Manager" = gerente. Es la persona a quien acudir ante problemas serios.' },
  { id: 'ex22', type: 'phrase_complete', category: 'goodbye', question_en: "Don't forget to ___ our special offers", question_es: 'Completa: "Don\'t forget to ___ our special offers"', options: ['check', 'see', 'watch', 'look'], correct_answer: 'check', explanation_es: '"Check" = revisar/consultar. "Check our offers" = revisar nuestras ofertas.' },
  { id: 'ex23', type: 'phrase_complete', category: 'questions', question_en: 'Our facials ___ at 60 euros', question_es: 'Completa: "Our facials ___ at 60 euros"', options: ['start', 'begin', 'cost', 'are'], correct_answer: 'start', explanation_es: '"Start at" indica el precio mínimo. "Our facials start at 60€" = empiezan en 60€.' },

  // pronunciation exercises
  { id: 'ex24', type: 'pronunciation', category: 'greetings', question_en: 'Can I offer you some water or tea while you wait?', question_es: 'Practica la pronunciación de esta frase:', options: [], correct_answer: 'Can I offer you some water or tea while you wait?', explanation_es: 'Enfócate en "offer" (O-fer) y "while" (wail). La "w" en "water" y "wait" se pronuncia redondeando los labios.', audio_text: 'Can I offer you some water or tea while you wait?' },
  { id: 'ex25', type: 'pronunciation', category: 'appointments', question_en: 'Your session will last approximately one hour', question_es: 'Practica la pronunciación de esta frase:', options: [], correct_answer: 'Your session will last approximately one hour', explanation_es: '"Approximately" (a-PROX-i-met-li) es la palabra más difícil. Practica dividirla en sílabas.', audio_text: 'Your session will last approximately one hour' },
  { id: 'ex26', type: 'pronunciation', category: 'payments', question_en: 'We have a special offer on packages right now', question_es: 'Practica la pronunciación de esta frase:', options: [], correct_answer: 'We have a special offer on packages right now', explanation_es: '"Special" = SPE-shal (no "espesial"). "Packages" = PA-ke-ches.', audio_text: 'We have a special offer on packages right now' },
  { id: 'ex27', type: 'pronunciation', category: 'problems', question_en: 'I understand your frustration, let me see what I can do', question_es: 'Practica la pronunciación de esta frase:', options: [], correct_answer: 'I understand your frustration, let me see what I can do', explanation_es: '"Frustration" = fras-TREI-shon. La "u" suena como "a" corta.', audio_text: 'I understand your frustration, let me see what I can do' },
  { id: 'ex28', type: 'pronunciation', category: 'directions', question_en: 'You can leave your belongings in the locker', question_es: 'Practica la pronunciación de esta frase:', options: [], correct_answer: 'You can leave your belongings in the locker', explanation_es: '"Belongings" = bi-LON-gings. "Locker" = LO-ker (como en español).', audio_text: 'You can leave your belongings in the locker' },
  { id: 'ex29', type: 'pronunciation', category: 'questions', question_en: "There's parking available behind the building", question_es: 'Practica la pronunciación de esta frase:', options: [], correct_answer: "There's parking available behind the building", explanation_es: '"Available" = a-VEI-la-bol. "Behind" = bi-JAIND. "Building" = BIL-ding.', audio_text: "There's parking available behind the building" },
  { id: 'ex30', type: 'pronunciation', category: 'goodbye', question_en: "We'll send you a reminder before your next visit", question_es: 'Practica la pronunciación de esta frase:', options: [], correct_answer: "We'll send you a reminder before your next visit", explanation_es: '"Reminder" = ri-MAIN-der. "Visit" = VI-sit (la "s" suena como "z").', audio_text: "We'll send you a reminder before your next visit" },
];

/**
 * Returns 5 exercises for today, rotating through content based on day of year.
 * Each day gives a different mix of exercise types.
 */
export function getDailyExercises(): Exercise[] {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Shuffle exercises deterministically based on day
  const shuffled = [...exercises].sort((a, b) => {
    const hashA = simpleHash(a.id + dayOfYear);
    const hashB = simpleHash(b.id + dayOfYear);
    return hashA - hashB;
  });

  // Pick 5, ensuring a mix of types
  const types: ExerciseType[] = ['listen_identify', 'respond_choose', 'phrase_complete', 'pronunciation', 'listen_identify'];
  const dayTypes = types.map((t, i) => types[(i + dayOfYear) % types.length]);

  const selected: Exercise[] = [];
  const used = new Set<string>();

  for (const type of dayTypes) {
    const match = shuffled.find(e => e.type === type && !used.has(e.id));
    if (match) {
      selected.push(match);
      used.add(match.id);
    }
  }

  // Fill remaining slots if needed
  while (selected.length < 5) {
    const match = shuffled.find(e => !used.has(e.id));
    if (!match) break;
    selected.push(match);
    used.add(match.id);
  }

  return selected;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}

export function speakText(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  utterance.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en-US'));
  if (enVoice) utterance.voice = enVoice;
  window.speechSynthesis.speak(utterance);
}
