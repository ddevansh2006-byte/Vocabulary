'use strict';
/* ═══════════════════════════════════════════════════════════════
   DEUTSCH MEISTER — app.js
   German Vocabulary & Verb Training SPA
═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   VOCABULARY DATA
   Fields: word, translation, pos, exampleDe, exampleEn, verbMeta?
───────────────────────────────────────────────*/
const VOCAB = [
  // VERBS
  { word:'sein',         translation:'to be',                pos:'verb',      exampleDe:'Ich bin müde.',                   exampleEn:'I am tired.',              verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'bin',du:'bist',er:'ist',wir:'sind',ihr:'seid',sie:'sind'}} },
  { word:'haben',        translation:'to have',              pos:'verb',      exampleDe:'Sie hat ein Buch.',               exampleEn:'She has a book.',           verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'habe',du:'hast',er:'hat',wir:'haben',ihr:'habt',sie:'haben'}} },
  { word:'werden',       translation:'to become / will',     pos:'verb',      exampleDe:'Er wird Arzt.',                   exampleEn:'He will become a doctor.',  verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'werde',du:'wirst',er:'wird',wir:'werden',ihr:'werdet',sie:'werden'}} },
  { word:'können',       translation:'can / to be able to',  pos:'verb',      exampleDe:'Kannst du mir helfen?',           exampleEn:'Can you help me?',         verbMeta:{modal:true,  separable:false, irregular:true,  conjugations:{ich:'kann',du:'kannst',er:'kann',wir:'können',ihr:'könnt',sie:'können'}} },
  { word:'müssen',       translation:'must / to have to',    pos:'verb',      exampleDe:'Ich muss gehen.',                 exampleEn:'I must go.',               verbMeta:{modal:true,  separable:false, irregular:true,  conjugations:{ich:'muss',du:'musst',er:'muss',wir:'müssen',ihr:'müsst',sie:'müssen'}} },
  { word:'wollen',       translation:'to want to',           pos:'verb',      exampleDe:'Wir wollen reisen.',              exampleEn:'We want to travel.',        verbMeta:{modal:true,  separable:false, irregular:true,  conjugations:{ich:'will',du:'willst',er:'will',wir:'wollen',ihr:'wollt',sie:'wollen'}} },
  { word:'sollen',       translation:'should / to be supposed to', pos:'verb', exampleDe:'Du sollst nicht lügen.',         exampleEn:'You should not lie.',       verbMeta:{modal:true,  separable:false, irregular:true,  conjugations:{ich:'soll',du:'sollst',er:'soll',wir:'sollen',ihr:'sollt',sie:'sollen'}} },
  { word:'dürfen',       translation:'may / to be allowed',  pos:'verb',      exampleDe:'Darf ich hereinkommen?',          exampleEn:'May I come in?',            verbMeta:{modal:true,  separable:false, irregular:true,  conjugations:{ich:'darf',du:'darfst',er:'darf',wir:'dürfen',ihr:'dürft',sie:'dürfen'}} },
  { word:'mögen',        translation:'to like',               pos:'verb',      exampleDe:'Ich mag Schokolade.',             exampleEn:'I like chocolate.',         verbMeta:{modal:true,  separable:false, irregular:true,  conjugations:{ich:'mag',du:'magst',er:'mag',wir:'mögen',ihr:'mögt',sie:'mögen'}} },
  { word:'gehen',        translation:'to go',                 pos:'verb',      exampleDe:'Ich gehe zur Schule.',            exampleEn:'I go to school.',          verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'gehe',du:'gehst',er:'geht',wir:'gehen',ihr:'geht',sie:'gehen'}} },
  { word:'kommen',       translation:'to come',               pos:'verb',      exampleDe:'Er kommt aus Deutschland.',      exampleEn:'He comes from Germany.',    verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'komme',du:'kommst',er:'kommt',wir:'kommen',ihr:'kommt',sie:'kommen'}} },
  { word:'sagen',        translation:'to say',                pos:'verb',      exampleDe:'Was sagst du?',                   exampleEn:'What are you saying?',     verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'sage',du:'sagst',er:'sagt',wir:'sagen',ihr:'sagt',sie:'sagen'}} },
  { word:'machen',       translation:'to make / to do',       pos:'verb',      exampleDe:'Was machst du heute?',            exampleEn:'What are you doing today?',verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'mache',du:'machst',er:'macht',wir:'machen',ihr:'macht',sie:'machen'}} },
  { word:'wissen',       translation:'to know (a fact)',      pos:'verb',      exampleDe:'Ich weiß es nicht.',              exampleEn:'I don\'t know.',            verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'weiß',du:'weißt',er:'weiß',wir:'wissen',ihr:'wisst',sie:'wissen'}} },
  { word:'kennen',       translation:'to know (a person)',    pos:'verb',      exampleDe:'Kennst du Maria?',               exampleEn:'Do you know Maria?',       verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'kenne',du:'kennst',er:'kennt',wir:'kennen',ihr:'kennt',sie:'kennen'}} },
  { word:'sehen',        translation:'to see',                pos:'verb',      exampleDe:'Ich sehe einen Vogel.',           exampleEn:'I see a bird.',            verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'sehe',du:'siehst',er:'sieht',wir:'sehen',ihr:'seht',sie:'sehen'}} },
  { word:'geben',        translation:'to give',               pos:'verb',      exampleDe:'Gib mir das Buch.',               exampleEn:'Give me the book.',        verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'gebe',du:'gibst',er:'gibt',wir:'geben',ihr:'gebt',sie:'geben'}} },
  { word:'sprechen',     translation:'to speak',              pos:'verb',      exampleDe:'Er spricht Deutsch.',             exampleEn:'He speaks German.',        verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'spreche',du:'sprichst',er:'spricht',wir:'sprechen',ihr:'sprecht',sie:'sprechen'}} },
  { word:'denken',       translation:'to think',              pos:'verb',      exampleDe:'Ich denke, es regnet.',           exampleEn:'I think it\'s raining.',    verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'denke',du:'denkst',er:'denkt',wir:'denken',ihr:'denkt',sie:'denken'}} },
  { word:'arbeiten',     translation:'to work',               pos:'verb',      exampleDe:'Sie arbeitet als Lehrerin.',      exampleEn:'She works as a teacher.',  verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'arbeite',du:'arbeitest',er:'arbeitet',wir:'arbeiten',ihr:'arbeitet',sie:'arbeiten'}} },
  { word:'lernen',       translation:'to learn',              pos:'verb',      exampleDe:'Ich lerne jeden Tag.',            exampleEn:'I learn every day.',       verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'lerne',du:'lernst',er:'lernt',wir:'lernen',ihr:'lernt',sie:'lernen'}} },
  { word:'lesen',        translation:'to read',               pos:'verb',      exampleDe:'Liest du gerne Bücher?',          exampleEn:'Do you like reading books?',verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'lese',du:'liest',er:'liest',wir:'lesen',ihr:'lest',sie:'lesen'}} },
  { word:'schreiben',    translation:'to write',              pos:'verb',      exampleDe:'Schreib mir eine Nachricht.',     exampleEn:'Write me a message.',      verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'schreibe',du:'schreibst',er:'schreibt',wir:'schreiben',ihr:'schreibt',sie:'schreiben'}} },
  { word:'finden',       translation:'to find',               pos:'verb',      exampleDe:'Ich kann meinen Schlüssel nicht finden.', exampleEn:'I can\'t find my key.',verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'finde',du:'findest',er:'findet',wir:'finden',ihr:'findet',sie:'finden'}} },
  { word:'kaufen',       translation:'to buy',                pos:'verb',      exampleDe:'Ich kaufe ein neues Handy.',      exampleEn:'I\'m buying a new phone.',  verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'kaufe',du:'kaufst',er:'kauft',wir:'kaufen',ihr:'kauft',sie:'kaufen'}} },
  { word:'fahren',       translation:'to drive / to travel',  pos:'verb',      exampleDe:'Wir fahren nach Berlin.',         exampleEn:'We\'re driving to Berlin.', verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'fahre',du:'fährst',er:'fährt',wir:'fahren',ihr:'fahrt',sie:'fahren'}} },
  { word:'wohnen',       translation:'to live / to reside',   pos:'verb',      exampleDe:'Ich wohne in München.',           exampleEn:'I live in Munich.',        verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'wohne',du:'wohnst',er:'wohnt',wir:'wohnen',ihr:'wohnt',sie:'wohnen'}} },
  { word:'essen',        translation:'to eat',                pos:'verb',      exampleDe:'Was isst du zum Frühstück?',      exampleEn:'What do you eat for breakfast?',verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'esse',du:'isst',er:'isst',wir:'essen',ihr:'esst',sie:'essen'}} },
  { word:'trinken',      translation:'to drink',              pos:'verb',      exampleDe:'Ich trinke Kaffee.',              exampleEn:'I drink coffee.',           verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'trinke',du:'trinkst',er:'trinkt',wir:'trinken',ihr:'trinkt',sie:'trinken'}} },
  { word:'schlafen',     translation:'to sleep',              pos:'verb',      exampleDe:'Er schläft acht Stunden.',        exampleEn:'He sleeps eight hours.',    verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'schlafe',du:'schläfst',er:'schläft',wir:'schlafen',ihr:'schlaft',sie:'schlafen'}} },
  { word:'helfen',       translation:'to help',               pos:'verb',      exampleDe:'Kann ich dir helfen?',            exampleEn:'Can I help you?',          verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'helfe',du:'hilfst',er:'hilft',wir:'helfen',ihr:'helft',sie:'helfen'}} },
  { word:'anrufen',      translation:'to call (by phone)',    pos:'verb',      exampleDe:'Ich rufe dich an.',               exampleEn:'I\'ll call you.',           verbMeta:{modal:false, separable:true,  irregular:true,  conjugations:{ich:'rufe…an',du:'rufst…an',er:'ruft…an',wir:'rufen…an',ihr:'ruft…an',sie:'rufen…an'}} },
  { word:'aufstehen',    translation:'to get up',             pos:'verb',      exampleDe:'Ich stehe um 7 Uhr auf.',         exampleEn:'I get up at 7 o\'clock.',   verbMeta:{modal:false, separable:true,  irregular:true,  conjugations:{ich:'stehe…auf',du:'stehst…auf',er:'steht…auf',wir:'stehen…auf',ihr:'steht…auf',sie:'stehen…auf'}} },
  { word:'einkaufen',    translation:'to go shopping',        pos:'verb',      exampleDe:'Wir kaufen jeden Samstag ein.',   exampleEn:'We go shopping every Saturday.',verbMeta:{modal:false,separable:true, irregular:false, conjugations:{ich:'kaufe…ein',du:'kaufst…ein',er:'kauft…ein',wir:'kaufen…ein',ihr:'kauft…ein',sie:'kaufen…ein'}} },
  { word:'fernsehen',    translation:'to watch TV',           pos:'verb',      exampleDe:'Er sieht abends fern.',           exampleEn:'He watches TV in the evenings.',verbMeta:{modal:false,separable:true, irregular:true,  conjugations:{ich:'sehe…fern',du:'siehst…fern',er:'sieht…fern',wir:'sehen…fern',ihr:'seht…fern',sie:'sehen…fern'}} },
  { word:'sich freuen',  translation:'to be happy / look forward to', pos:'verb', exampleDe:'Ich freue mich auf den Urlaub.', exampleEn:'I\'m looking forward to the holiday.',verbMeta:{modal:false,separable:false,irregular:false,reflexive:true, conjugations:{ich:'freue mich',du:'freust dich',er:'freut sich',wir:'freuen uns',ihr:'freut euch',sie:'freuen sich'}} },
  { word:'verstehen',    translation:'to understand',         pos:'verb',      exampleDe:'Verstehst du mich?',              exampleEn:'Do you understand me?',    verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'verstehe',du:'verstehst',er:'versteht',wir:'verstehen',ihr:'versteht',sie:'verstehen'}} },
  { word:'beginnen',     translation:'to begin',              pos:'verb',      exampleDe:'Der Film beginnt um 20 Uhr.',     exampleEn:'The film begins at 8 pm.', verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'beginne',du:'beginnst',er:'beginnt',wir:'beginnen',ihr:'beginnt',sie:'beginnen'}} },
  { word:'brauchen',     translation:'to need',               pos:'verb',      exampleDe:'Ich brauche mehr Zeit.',          exampleEn:'I need more time.',        verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'brauche',du:'brauchst',er:'braucht',wir:'brauchen',ihr:'braucht',sie:'brauchen'}} },
  { word:'laufen',       translation:'to run / to walk',      pos:'verb',      exampleDe:'Sie läuft jeden Morgen.',         exampleEn:'She runs every morning.',  verbMeta:{modal:false, separable:false, irregular:true,  conjugations:{ich:'laufe',du:'läufst',er:'läuft',wir:'laufen',ihr:'lauft',sie:'laufen'}} },

  // --- NEW VERBS FROM DOCUMENT ---
  { word:'vorbeigleitet', translation:'diverted', pos:'verb', exampleDe:'Das Schiff ist am Ufer vorbeigleitet.', exampleEn:'The ship glided past the shore.', verbMeta:{modal:false, separable:true, irregular:true, conjugations:{ich:'gleite...vorbei',du:'gleitest...vorbei',er:'gleitet...vorbei',wir:'gleiten...vorbei',ihr:'gleitet...vorbei',sie:'gleiten...vorbei'}} },
  { word:'gewesen', translation:'been', pos:'verb', exampleDe:'Ich bin noch nie dort gewesen.', exampleEn:'I have never been there.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'bin',du:'bist',er:'ist',wir:'sind',ihr:'seid',sie:'sind'}} },
  { word:'festgestellt', translation:'noted', pos:'verb', exampleDe:'Es wurde ein Fehler festgestellt.', exampleEn:'An error was noted.', verbMeta:{modal:false, separable:true, irregular:false, conjugations:{ich:'stelle...fest',du:'stellst...fest',er:'stellt...fest',wir:'stellen...fest',ihr:'stellt...fest',sie:'stellen...fest'}} },
  { word:'bestätigt', translation:'confirmed', pos:'verb', exampleDe:'Die Reservierung wurde bestätigt.', exampleEn:'The reservation was confirmed.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'bestätige',du:'bestätigst',er:'bestätigt',wir:'bestätigen',ihr:'bestätigt',sie:'bestätigen'}} },
  { word:'unterstützen', translation:'to support', pos:'verb', exampleDe:'Wir werden dich bei dem Projekt unterstützen.', exampleEn:'We will support you with the project.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'unterstütze',du:'unterstützt',er:'unterstützt',wir:'unterstützen',ihr:'unterstützt',sie:'unterstützen'}} },
  { word:'gelten', translation:'to apply', pos:'verb', exampleDe:'Diese Regeln gelten ab morgen.', exampleEn:'These rules apply from tomorrow.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'gelte',du:'giltst',er:'gilt',wir:'gelten',ihr:'geltet',sie:'gelten'}} },
  { word:'einrichten', translation:'to arrange / to establish', pos:'verb', exampleDe:'Wir wollen das neue Büro einrichten.', exampleEn:'We want to set up the new office.', verbMeta:{modal:false, separable:true, irregular:false, conjugations:{ich:'richte...ein',du:'richtest...ein',er:'richtet...ein',wir:'richten...ein',ihr:'richtet...ein',sie:'richten...ein'}} },
  { word:'betreten', translation:'to enter', pos:'verb', exampleDe:'Bitte den Raum nicht betreten.', exampleEn:'Please do not enter the room.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'betrete',du:'betrittst',er:'betritt',wir:'betreten',ihr:'betretet',sie:'betreten'}} },
  { word:'vorzeigen', translation:'to show sth', pos:'verb', exampleDe:'Können Sie bitte Ihren Ausweis vorzeigen?', exampleEn:'Can you please show your ID?', verbMeta:{modal:false, separable:true, irregular:false, conjugations:{ich:'zeige...vor',du:'zeigst...vor',er:'zeigt...vor',wir:'zeigen...vor',ihr:'zeigt...vor',sie:'zeigen...vor'}} },
  { word:'unterbrochen', translation:'to interrupt', pos:'verb', exampleDe:'Die Sitzung wurde kurz unterbrochen.', exampleEn:'The meeting was briefly interrupted.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'unterbreche',du:'unterbrichst',er:'unterbricht',wir:'unterbrechen',ihr:'unterbrecht',sie:'unterbrechen'}} },
  { word:'umgeleitet', translation:'diverted', pos:'verb', exampleDe:'Der Verkehr wurde wegen der Baustelle umgeleitet.', exampleEn:'Traffic was diverted due to the construction site.', verbMeta:{modal:false, separable:true, irregular:false, conjugations:{ich:'leite...um',du:'leitest...um',er:'leitet...um',wir:'leiten...um',ihr:'leitet...um',sie:'leiten...um'}} },
  { word:'vorführen', translation:'to show', pos:'verb', exampleDe:'Er wollte uns seine neue Erfindung vorführen.', exampleEn:'He wanted to show us his new invention.wh', verbMeta:{modal:false, separable:true, irregular:false, conjugations:{ich:'führe...vor',du:'führst...vor',er:'führt...vor',wir:'führen...vor',ihr:'führt...vor',sie:'führen...vor'}} },
  { word:'entgehen', translation:'to escape', pos:'verb', exampleDe:'Wir konnten der Gefahr knapp entgehen.', exampleEn:'We were just able to escape the danger.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'entgehe',du:'entgehst',er:'entgeht',wir:'entgehen',ihr:'entgeht',sie:'entgehen'}} },
  { word:'freilegten', translation:'opening', pos:'verb', exampleDe:'Archäologen freilegten die alten Ruinen.', exampleEn:'Archaeologists uncovered the old ruins.', verbMeta:{modal:false, separable:true, irregular:false, conjugations:{ich:'lege...frei',du:'legst...frei',er:'legt...frei',wir:'legen...frei',ihr:'legt...frei',sie:'legen...frei'}} },
  { word:'stoßen', translation:'to push', pos:'verb', exampleDe:'Pass auf, dass du niemanden stoßen.', exampleEn:'Be careful not to push anyone.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'stoße',du:'stößt',er:'stößt',wir:'stoßen',ihr:'stoßt',sie:'stoßen'}} },
  { word:'beeinträchtigen', translation:'to hamper', pos:'verb', exampleDe:'Lärm kann die Konzentration beeinträchtigen.', exampleEn:'Noise can hamper concentration.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'beeinträchtige',du:'beeinträchtigst',er:'beeinträchtigt',wir:'beeinträchtigen',ihr:'beeinträchtigt',sie:'beeinträchtigen'}} },
  { word:'leiden', translation:'to suffer', pos:'verb', exampleDe:'Er musste unter der Hitze leiden.', exampleEn:'He had to suffer from the heat.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'leide',du:'leidest',er:'leidet',wir:'leiden',ihr:'leidet',sie:'leiden'}} },
  { word:'anregen', translation:'encourage', pos:'verb', exampleDe:'Wir möchten die Diskussion anregen.', exampleEn:'We want to encourage the discussion.', verbMeta:{modal:false, separable:true, irregular:false, conjugations:{ich:'rege...an',du:'regst...an',er:'regt...an',wir:'regen...an',ihr:'regt...an',sie:'regen...an'}} },
  { word:'wahrzunehmen', translation:'to perceive', pos:'verb', exampleDe:'Es ist wichtig, die Natur wahrzunehmen.', exampleEn:'It is important to perceive nature.', verbMeta:{modal:false, separable:true, irregular:true, conjugations:{ich:'nehme...wahr',du:'nimmst...wahr',er:'nimmt...wahr',wir:'nehmen...wahr',ihr:'nehmt...wahr',sie:'nehmen...wahr'}} },
  { word:'hinterfragen', translation:'question', pos:'verb', exampleDe:'Man sollte nicht alles sofort glauben, sondern hinterfragen.', exampleEn:'One shouldn\'t believe everything immediately but question it.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'hinterfrage',du:'hinterfragst',er:'hinterfragt',wir:'hinterfragen',ihr:'hinterfragt',sie:'hinterfragen'}} },
  { word:'lenken', translation:'to steer / drive / direct', pos:'verb', exampleDe:'Er kann den Bus sicher lenken.', exampleEn:'He can steer the bus safely.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'lenke',du:'lenkst',er:'lenkt',wir:'lenken',ihr:'lenkt',sie:'lenken'}} },
  { word:'einbrennen', translation:'to bake / to burn it', pos:'verb', exampleDe:'Die Sonne wird sich in den Boden einbrennen.', exampleEn:'The sun will burn into the ground.', verbMeta:{modal:false, separable:true, irregular:true, conjugations:{ich:'brenne...ein',du:'brennst...ein',er:'brennt...ein',wir:'brennen...ein',ihr:'brennt...ein',sie:'brennen...ein'}} },
  { word:'verbrennen', translation:'to burn', pos:'verb', exampleDe:'Das trockene Holz wird schnell verbrennen.', exampleEn:'The dry wood will burn quickly.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'verbrenne',du:'verbrennst',er:'verbrennt',wir:'verbrennen',ihr:'verbrennt',sie:'verbrennen'}} },
  { word:'drehen', translation:'to spin / twist / turn sth.', pos:'verb', exampleDe:'Du musst den Schlüssel zweimal drehen.', exampleEn:'You have to turn the key twice.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'drehe',du:'drehst',er:'dreht',wir:'drehen',ihr:'dreht',sie:'drehen'}} },
  { word:'weisen', translation:'to show / point north/south', pos:'verb', exampleDe:'Die Schilder weisen den Weg zum Bahnhof.', exampleEn:'The signs point the way to the station.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'weise',du:'weist',er:'weist',wir:'weisen',ihr:'weist',sie:'weisen'}} },
  { word:'eignen', translation:'to suitable / proper for', pos:'verb', exampleDe:'Diese Schuhe eignen sich für Wanderungen.', exampleEn:'These shoes are suitable for hikes.', verbMeta:{modal:false, separable:false, irregular:false, reflexive:true, conjugations:{ich:'eigne mich',du:'eignest dich',er:'eignet sich',wir:'eignen uns',ihr:'eignet euch',sie:'eignen sich'}} },
  { word:'entstehen', translation:'to arise / develop', pos:'verb', exampleDe:'Hier wird bald ein neuer Park entstehen.', exampleEn:'A new park will develop/arise here soon.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'entstehe',du:'entstehst',er:'entsteht',wir:'entstehen',ihr:'entsteht',sie:'entstehen'}} },
  { word:'erkennen', translation:'to recognize', pos:'verb', exampleDe:'Ich konnte ihn im Dunkeln kaum erkennen.', exampleEn:'I could hardly recognize him in the dark.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'erkenne',du:'erkennst',er:'erkennt',wir:'erkennen',ihr:'erkennt',sie:'erkennen'}} },
  { word:'Kriegen', translation:'to get / to catch', pos:'verb', exampleDe:'Wir müssen den Zug noch kriegen.', exampleEn:'We still have to catch the train.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'kriege',du:'kriegst',er:'kriegt',wir:'kriegen',ihr:'kriegt',sie:'kriegen'}} },
  { word:'prägen', translation:'embossing / stamping / coining', pos:'verb', exampleDe:'Diese Erfahrungen werden dich für das Leben prägen.', exampleEn:'These experiences will shape/coin you for life.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'präge',du:'prägst',er:'prägt',wir:'prägen',ihr:'prägt',sie:'prägen'}} },
  { word:'verlieren', translation:'to lose / to drop', pos:'verb', exampleDe:'Wir dürfen den Mut nicht verlieren.', exampleEn:'We must not lose courage.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'verliere',du:'verlierst',er:'verliert',wir:'verlieren',ihr:'verliert',sie:'verlieren'}} },
  { word:'reizt', translation:'irritate sth.', pos:'verb', exampleDe:'Der Staub reizt meine Augen.', exampleEn:'The dust irritates my eyes.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'reize',du:'reizt',er:'reizt',wir:'reizen',ihr:'reizt',sie:'reizen'}} },
  { word:'gemerkt', translation:'realized', pos:'verb', exampleDe:'Ich habe sofort gemerkt, dass etwas nicht stimmt.', exampleEn:'I realized immediately that something was wrong.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'merke',du:'merkst',er:'merkt',wir:'merken',ihr:'merkt',sie:'merken'}} },
  { word:'schaut', translation:'looks', pos:'verb', exampleDe:'Er schaut aus dem Fenster.', exampleEn:'He looks out of the window.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'schaue',du:'schaust',er:'schaut',wir:'schauen',ihr:'schaut',sie:'schauen'}} },
  { word:'geholt', translation:'fetched', pos:'verb', exampleDe:'Ich habe das Paket bei der Post geholt.', exampleEn:'I fetched/picked up the package from the post office.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'hole',du:'holst',er:'holt',wir:'holen',ihr:'holt',sie:'holen'}} },
  { word:'geweint', translation:'cried', pos:'verb', exampleDe:'Das Kind hat den ganzen Tag geweint.', exampleEn:'The child cried all day.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'weine',du:'weinst',er:'weint',wir:'weinen',ihr:'weint',sie:'weinen'}} },
  { word:'miaut', translation:'mewed', pos:'verb', exampleDe:'Die kleine Katze miaut leise.', exampleEn:'The little cat is mewing softly.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'miaue',du:'miaust',er:'miaut',wir:'miauen',ihr:'miaut',sie:'miauen'}} },
  { word:'fordern', translation:'to demand', pos:'verb', exampleDe:'Die Arbeiter fordern höhere Löhne.', exampleEn:'The workers demand higher wages.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'fordere',du:'forderst',er:'fordert',wir:'fordern',ihr:'fordert',sie:'fordern'}} },
  { word:'zeigt', translation:'depicts', pos:'verb', exampleDe:'Diese Grafik zeigt den Fortschritt.', exampleEn:'This graphic shows/depicts the progress.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'zeige',du:'zeigst',er:'zeigt',wir:'zeigen',ihr:'zeigt',sie:'zeigen'}} },
  { word:'gelingen', translation:'to succeed', pos:'verb', exampleDe:'Hoffentlich wird der Plan gelingen.', exampleEn:'Hopefully, the plan will succeed.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'gelinge',du:'gelingst',er:'gelingt',wir:'gelingen',ihr:'gelingt',sie:'gelingen'}} },
  { word:'beitragen', translation:'to contribute', pos:'verb', exampleDe:'Jeder sollte etwas zum Umweltschutz beitragen.', exampleEn:'Everyone should contribute something to environmental protection.', verbMeta:{modal:false, separable:true, irregular:true, conjugations:{ich:'trage...bei',du:'trägst...bei',er:'trägt...bei',wir:'tragen...bei',ihr:'tragt...bei',sie:'tragen...bei'}} },
  { word:'glauben', translation:'to believe', pos:'verb', exampleDe:'Ich kann es kaum glauben.', exampleEn:'I can hardly believe it.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'glaube',du:'glaubst',er:'glaubt',wir:'glauben',ihr:'glaubt',sie:'glauben'}} },
  { word:'entscheidet', translation:'decided', pos:'verb', exampleDe:'Er entscheidet sich für die rote Jacke.', exampleEn:'He decides on the red jacket.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'entscheide',du:'entscheidest',er:'entscheidet',wir:'entscheiden',ihr:'entscheidet',sie:'entscheiden'}} },
  { word:'genießen', translation:'to enjoy', pos:'verb', exampleDe:'Wir wollen das schöne Wetter genießen.', exampleEn:'We want to enjoy the beautiful weather.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'genieße',du:'genießt',er:'genießt',wir:'genießen',ihr:'genießt',sie:'genießen'}} },
  { word:'fand', translation:'to find', pos:'verb', exampleDe:'Er fand seinen Schlüssel unter dem Tisch.', exampleEn:'He found his key under the table.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'finde',du:'findest',er:'findet',wir:'finden',ihr:'findet',sie:'finden'}} },
  { word:'liest', translation:'to read', pos:'verb', exampleDe:'Sie liest gerne Romane.', exampleEn:'She likes to read novels.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'lese',du:'liest',er:'liest',wir:'lesen',ihr:'lest',sie:'lesen'}} },
  { word:'Gestiegen(steigen)', translation:'to rise / to climb', pos:'verb', exampleDe:'Die Benzinpreise sind wieder gestiegen.', exampleEn:'Gas prices have risen again.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'steige',du:'steigst',er:'steigt',wir:'steigen',ihr:'steigt',sie:'steigen'}} },
  { word:'dienten', translation:'to serve', pos:'verb', exampleDe:'Diese Gebäude dienten früher als Fabriken.', exampleEn:'These buildings used to serve as factories.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'diene',du:'dienst',er:'dient',wir:'dienen',ihr:'dient',sie:'dienen'}} },
  { word:'brannte', translation:'to burn', pos:'verb', exampleDe:'Das Licht im Flur brannte noch.', exampleEn:'The light in the hallway was still burning/on.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'brenne',du:'brennst',er:'brennt',wir:'brennen',ihr:'brennt',sie:'brennen'}} },
  { word:'bietet', translation:'offers / provides', pos:'verb', exampleDe:'Das Hotel bietet einen kostenlosen Parkplatz.', exampleEn:'The hotel offers a free parking space.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'biete',du:'bietest',er:'bietet',wir:'bieten',ihr:'bietet',sie:'bieten'}} },
  { word:'aufzubauen', translation:'to build / set up', pos:'verb', exampleDe:'Wir müssen die Möbel noch aufzubauen.', exampleEn:'We still have to set up the furniture.', verbMeta:{modal:false, separable:true, irregular:false, conjugations:{ich:'baue...auf',du:'baust...auf',er:'baut...auf',wir:'bauen...auf',ihr:'baut...auf',sie:'bauen...auf'}} },
  { word:'befriedigt', translation:'satisfied / fulfilled', pos:'verb', exampleDe:'Das Ergebnis hat ihn nicht ganz befriedigt.', exampleEn:'The result did not quite satisfy him.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'befriedige',du:'befriedigst',er:'befriedigt',wir:'befriedigen',ihr:'befriedigt',sie:'befriedigen'}} },
  { word:'reicht', translation:'is enough / suffices', pos:'verb', exampleDe:'Das Geld reicht für eine Woche.', exampleEn:'The money is enough for one week.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'reiche',du:'reichst',er:'reicht',wir:'reichen',ihr:'reicht',sie:'reichen'}} },
  { word:'gilt', translation:'is valid / applies / counts', pos:'verb', exampleDe:'Das Ticket gilt nur für die zweite Klasse.', exampleEn:'The ticket is only valid for second class.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'gelte',du:'giltst',er:'gilt',wir:'gelten',ihr:'geltet',sie:'gelten'}} },
  { word:'zeigen', translation:'to show / to display', pos:'verb', exampleDe:'Können Sie mir den Weg auf der Karte zeigen?', exampleEn:'Can you show me the way on the map?', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'zeige',du:'zeigst',er:'zeigt',wir:'zeigen',ihr:'zeigt',sie:'zeigen'}} },
  { word:'überprüft', translation:'checked / verified', pos:'verb', exampleDe:'Alle Details wurden sorgfältig überprüft.', exampleEn:'All details were carefully checked.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'überprüfe',du:'überprüfst',er:'überprüft',wir:'überprüfen',ihr:'überprüft',sie:'überprüfen'}} },
  { word:'steigen', translation:'to rise / increase', pos:'verb', exampleDe:'Wir müssen auf den Berg steigen.', exampleEn:'We have to climb/rise up the mountain.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'steige',du:'steigst',er:'steigt',wir:'steigen',ihr:'steigt',sie:'steigen'}} },
  { word:'Vertreten', translation:'to advocate', pos:'verb', exampleDe:'Wir vertreten die Interessen unserer Kunden.', exampleEn:'We advocate/represent the interests of our customers.', verbMeta:{modal:false, separable:false, irregular:true, conjugations:{ich:'vertrete',du:'vertrittst',er:'vertritt',wir:'vertreten',ihr:'vertretet',sie:'vertreten'}} },
  { word:'belegten', translation:'to proved', pos:'verb', exampleDe:'Die Beweise belegten seine Unschuld.', exampleEn:'The evidence proved his innocence.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'belege',du:'belegst',er:'belegt',wir:'belegen',ihr:'belegt',sie:'belegen'}} },
  { word:'vermarktet', translation:'marketed', pos:'verb', exampleDe:'Die neue Software wird weltweit vermarktet.', exampleEn:'The new software is being marketed worldwide.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'vermarkte',du:'vermarktest',er:'vermarktet',wir:'vermarkten',ihr:'vermarktet',sie:'vermarkten'}} },
  { word:'befreit', translation:'rid / freed', pos:'verb', exampleDe:'Er wurde von seinen Pflichten befreit.', exampleEn:'He was freed from his duties.', verbMeta:{modal:false, separable:false, irregular:false, conjugations:{ich:'befreie',du:'befreist',er:'befreit',wir:'befreien',ihr:'befreit',sie:'befreien'}} },

  // NOUNS
  { word:'die Zeit',     translation:'time',                  pos:'noun',      exampleDe:'Die Zeit vergeht schnell.',       exampleEn:'Time passes quickly.' },
  { word:'das Haus',     translation:'house / home',          pos:'noun',      exampleDe:'Das Haus ist sehr groß.',         exampleEn:'The house is very large.' },
  { word:'die Arbeit',   translation:'work / job',            pos:'noun',      exampleDe:'Die Arbeit macht mir Spaß.',      exampleEn:'I enjoy the work.' },
  { word:'das Kind',     translation:'child',                 pos:'noun',      exampleDe:'Das Kind spielt im Garten.',      exampleEn:'The child plays in the garden.' },
  { word:'die Schule',   translation:'school',                pos:'noun',      exampleDe:'Die Schule beginnt um 8 Uhr.',    exampleEn:'School starts at 8 o\'clock.' },
  { word:'das Leben',    translation:'life',                  pos:'noun',      exampleDe:'Das Leben ist schön.',            exampleEn:'Life is beautiful.' },
  { word:'die Stadt',    translation:'city / town',           pos:'noun',      exampleDe:'Ich lebe in einer großen Stadt.',  exampleEn:'I live in a big city.' },
  { word:'das Land',     translation:'country / countryside', pos:'noun',      exampleDe:'Auf dem Land ist es ruhig.',      exampleEn:'In the countryside it is quiet.' },
  { word:'die Sprache',  translation:'language',              pos:'noun',      exampleDe:'Deutsch ist eine schöne Sprache.', exampleEn:'German is a beautiful language.' },
  { word:'das Wetter',   translation:'weather',               pos:'noun',      exampleDe:'Das Wetter ist heute gut.',       exampleEn:'The weather is good today.' },
  { word:'der Freund',   translation:'friend (male)',         pos:'noun',      exampleDe:'Mein Freund ist sehr nett.',      exampleEn:'My friend is very nice.' },
  { word:'die Familie',  translation:'family',                pos:'noun',      exampleDe:'Meine Familie ist groß.',         exampleEn:'My family is large.' },
  { word:'das Geld',     translation:'money',                 pos:'noun',      exampleDe:'Ich habe nicht viel Geld.',       exampleEn:'I don\'t have much money.' },
  { word:'der Mensch',   translation:'person / human being',  pos:'noun',      exampleDe:'Der Mensch ist sozial.',          exampleEn:'Humans are social beings.' },
  { word:'die Frage',    translation:'question',              pos:'noun',      exampleDe:'Das ist eine gute Frage.',        exampleEn:'That is a good question.' },
  { word:'die Antwort',  translation:'answer',                pos:'noun',      exampleDe:'Ich kenne die Antwort nicht.',    exampleEn:'I don\'t know the answer.' },
  { word:'das Buch',     translation:'book',                  pos:'noun',      exampleDe:'Das Buch ist sehr interessant.',  exampleEn:'The book is very interesting.' },
  { word:'der Tag',      translation:'day',                   pos:'noun',      exampleDe:'Guten Tag!',                     exampleEn:'Good day!' },
  { word:'die Nacht',    translation:'night',                 pos:'noun',      exampleDe:'Die Nacht war ruhig.',            exampleEn:'The night was quiet.' },
  { word:'das Jahr',     translation:'year',                  pos:'noun',      exampleDe:'Das Jahr hat 365 Tage.',          exampleEn:'The year has 365 days.' },
  { word:'der Weg',      translation:'way / path',            pos:'noun',      exampleDe:'Der Weg ist lang.',               exampleEn:'The path is long.' },
  { word:'die Welt',     translation:'world',                 pos:'noun',      exampleDe:'Die Welt ist rund.',              exampleEn:'The world is round.' },
  { word:'das Wort',     translation:'word',                  pos:'noun',      exampleDe:'Was bedeutet dieses Wort?',       exampleEn:'What does this word mean?' },
  { word:'die Hand',     translation:'hand',                  pos:'noun',      exampleDe:'Gib mir deine Hand.',             exampleEn:'Give me your hand.' },
  { word:'das Essen',    translation:'food / meal',           pos:'noun',      exampleDe:'Das Essen ist sehr lecker.',      exampleEn:'The food is very delicious.' },
  { word:'die Straße',   translation:'street / road',         pos:'noun',      exampleDe:'Die Straße ist breit.',           exampleEn:'The street is wide.' },
  { word:'der Bahnhof',  translation:'train station',         pos:'noun',      exampleDe:'Der Bahnhof ist in der Mitte.',   exampleEn:'The train station is in the center.' },
  { word:'der Zug',      translation:'train',                 pos:'noun',      exampleDe:'Der Zug fährt nach Hamburg.',     exampleEn:'The train goes to Hamburg.' },
  { word:'das Handy',    translation:'mobile phone',          pos:'noun',      exampleDe:'Mein Handy ist kaputt.',          exampleEn:'My phone is broken.' },
  { word:'der Computer', translation:'computer',              pos:'noun',      exampleDe:'Ich arbeite am Computer.',        exampleEn:'I work at the computer.' },

  // --- NEW NOUNS FROM DOCUMENT ---
  { word:'die Luft', translation:'air', pos:'noun', exampleDe:'Die frische Luft tut gut.', exampleEn:'The fresh air feels good.' },
  { word:'der Wettkampf', translation:'competition', pos:'noun', exampleDe:'Sie trainiert hart für den Wettkampf.', exampleEn:'She is training hard for the competition.' },
  { word:'der Ladenschluss', translation:'shop closing time', pos:'noun', exampleDe:'Wir müssen uns vor dem Ladenschluss beeilen.', exampleEn:'We have to hurry before shop closing time.' },
  { word:'die Gelegenheit', translation:'opportunities', pos:'noun', exampleDe:'Das ist eine großartige Gelegenheit.', exampleEn:'That is a great opportunity.' },
  { word:'die Versicherung', translation:'insurance', pos:'noun', exampleDe:'Hast du eine Versicherung für dein Auto?', exampleEn:'Do you have insurance for your car?' },
  { word:'das Gelände', translation:'ground / area', pos:'noun', exampleDe:'Das Gelände ist sehr weitläufig.', exampleEn:'The grounds/area are very extensive.' },
  { word:'das Kennzeichen', translation:'badge / marks', pos:'noun', exampleDe:'Sie trägt ein spezielles Kennzeichnen.', exampleEn:'She is wearing a special badge.' },
  { word:'das Schienennetz', translation:'rail network', pos:'noun', exampleDe:'Das Schienennetz wird modernisiert.', exampleEn:'The rail network is being modernized.' },
  { word:'die Vorsicht', translation:'attention / caution', pos:'noun', exampleDe:'Vorsicht an der Bahnsteigkante!', exampleEn:'Caution at the platform edge!' },
  { word:'die Essgewohnheiten', translation:'eating habit', pos:'noun', exampleDe:'Gesunde Essgewohnheiten sind wichtig.', exampleEn:'Healthy eating habits are important.' },
  { word:'das Amt', translation:'office', pos:'noun', exampleDe:'Ich muss heute noch zum Amt gehen.', exampleEn:'I still have to go to the office/agency today.' },
  { word:'die Höhle', translation:'cave', pos:'noun', exampleDe:'In den Bergen gibt es eine tiefe Höhle.', exampleEn:'There is a deep cave in the mountains.' },
  { word:'die Zentralfigur', translation:'central figure', pos:'noun', exampleDe:'Wer ist die Zentralfigur in dieser Geschichte?', exampleEn:'Who is the central figure in this story?' },
  { word:'die Feuchtigkeit', translation:'humidity', pos:'noun', exampleDe:'Die hohe Feuchtigkeit macht uns zu schaffen.', exampleEn:'The high humidity is bothering us.' },
  { word:'das Schaf', translation:'sheep', pos:'noun', exampleDe:'Das weiße Schaf steht auf der Wiese.', exampleEn:'The white sheep is standing in the meadow.' },
  { word:'das Schneewittchen', translation:'snow white', pos:'noun', exampleDe:'Schneewittchen ist ein bekanntes Märchen.', exampleEn:'Snow White is a famous fairy tale.' },
  { word:'das Dornröschen', translation:'sleeping beauty', pos:'noun', exampleDe:'Dornröschen schlief hundert Jahre.', exampleEn:'Sleeping Beauty slept for a hundred years.' },
  { word:'die Führung', translation:'guidance', pos:'noun', exampleDe:'Wir buchten eine Führung durch das Museum.', exampleEn:'We booked a tour/guidance through the museum.' },
  { word:'die Fledermaus', translation:'bat', pos:'noun', exampleDe:'Die Fledermaus schläft am Tag.', exampleEn:'The bat sleeps during the day.' },
  { word:'der Schrecken', translation:'fear', pos:'noun', exampleDe:'Sie bekam einen großen Schrecken.', exampleEn:'She got a big fright/fear.' },
  { word:'der Dienst', translation:'service', pos:'noun', exampleDe:'Er hat heute Spätdienst.', exampleEn:'He has late service/shift today.' },
  { word:'die Betreuung', translation:'care', pos:'noun', exampleDe:'Die Betreuung der Senioren ist sehr gut.', exampleEn:'The care of the seniors is very good.' },
  { word:'die Wut', translation:'anger at sth.', pos:'noun', exampleDe:'Er schrie vor lauter Wut.', exampleEn:'He screamed out of pure anger.' },
  { word:'rappt', translation:'meeting', pos:'noun', exampleDe:'Wir haben heute ein wichtiges rappt.', exampleEn:'We have an important meeting today.' },
  { word:'die Flut', translation:'flood', pos:'noun', exampleDe:'Nach dem Regen kam die große Flut.', exampleEn:'After the rain came the great flood.' },
  { word:'die Bildung', translation:'education', pos:'noun', exampleDe:'Bildung öffnet viele Türen.', exampleEn:'Education opens many doors.' },
  { word:'die Herstellung', translation:'production / manufacturing', pos:'noun', exampleDe:'Die Herstellung der Produkte erfolgt lokal.', exampleEn:'The production of the products happens locally.' },
  { word:'die Marktreife', translation:'marketability / market maturity', pos:'noun', exampleDe:'Das neue Modell hat die Marktreife erreicht.', exampleEn:'The new model has reached market maturity.' },
  { word:'die Abschaffung', translation:'cancellation', pos:'noun', exampleDe:'Sie forderten die Abschaffung der Regeln.', exampleEn:'They demanded the cancellation/abolition of the rules.' },
  { word:'die Vertretung', translation:'representation / substitution', pos:'noun', exampleDe:'Er arbeitet heute als Vertretung für den Lehrer.', exampleEn:'He is working as a substitute for the teacher today.' },
  { word:'das Gedächtnis', translation:'memory / mind', pos:'noun', exampleDe:'Er hat ein wirklich gutes Gedächtnis.', exampleEn:'He has a really good memory.' },
  { word:'der Steigende', translation:'rising / increasing', pos:'noun', exampleDe:'Der steigende Bedarf an Energie ist ein Problem.', exampleEn:'The rising demand for energy is a problem.' },
  { word:'das Tierheim', translation:'zoo / animal home', pos:'noun', exampleDe:'Wir haben unsere Katze aus dem Tierheim.', exampleEn:'We got our cat from the animal shelter.' },
  { word:'das Ziel', translation:'target / goal', pos:'noun', exampleDe:'Wir haben unser Ziel fast erreicht.', exampleEn:'We have almost reached our goal.' },
  { word:'die Sprachförderung', translation:'language promotion', pos:'noun', exampleDe:'Sprachförderung ist für Kinder sehr wichtig.', exampleEn:'Language promotion is very important for children.' },
  { word:'die Dusche', translation:'shower', pos:'noun', exampleDe:'Ich brauche jetzt eine kalte Dusche.', exampleEn:'I need a cold shower now.' },
  { word:'die Zutaten', translation:'ingredients', pos:'noun', exampleDe:'Hast du alle Zutaten für den Kuchen?', exampleEn:'Do you have all the ingredients for the cake?' },
  { word:'das Schließfach', translation:'locker / storage locker', pos:'noun', exampleDe:'Du kannst deine Tasche ins Schließfach legen.', exampleEn:'You can put your bag in the locker.' },
  { word:'die Bienenvölker', translation:'Bee colonies', pos:'noun', exampleDe:'Der Imker kümmert sich um seine Bienenvölker.', exampleEn:'The beekeeper takes care of his bee colonies.' },
  { word:'die Bienen', translation:'bees', pos:'noun', exampleDe:'Bienen sind wichtig für die Natur.', exampleEn:'Bees are important for nature.' },
  { word:'die Sammelflüge', translation:'flights made to collect food / things', pos:'noun', exampleDe:'Die Bienen kehren von ihren Sammelflügen zurück.', exampleEn:'The bees return from their collection flights.' },
  { word:'der Museumshonig', translation:'museum honey', pos:'noun', exampleDe:'Wir haben ein Glas Museumshonig gekauft.', exampleEn:'We bought a jar of museum honey.' },
  { word:'die Forschung', translation:'research', pos:'noun', exampleDe:'In der medizinischen Forschung gibt es Fortschritte.', exampleEn:'There is progress in medical research.' },
  { word:'die Berufserfahrungen', translation:'work experience', pos:'noun', exampleDe:'Sie hat bereits viele Berufserfahrungen gesammelt.', exampleEn:'She has already gathered a lot of work experience.' },
  { word:'der Mitgliedsausweis', translation:'membership card / id', pos:'noun', exampleDe:'Bitte bringen Sie Ihren Mitgliedsausweis mit.', exampleEn:'Please bring your membership card.' },
  { word:'die Gebühr', translation:'fee / charge', pos:'noun', exampleDe:'Die Gebühr muss sofort bezahlt werden.', exampleEn:'The fee must be paid immediately.' },
  { word:'die Sandalen', translation:'sandals', pos:'noun', exampleDe:'Im Urlaub trage ich am liebsten Sandalen.', exampleEn:'On vacation, I like wearing sandals best.' },
  { word:'die Lautstärke', translation:'volume / sound level', pos:'noun', exampleDe:'Bitte senken Sie die Lautstärke.', exampleEn:'Please lower the volume.' },
  { word:'der Empfangsbereich', translation:'reception area / lobby', pos:'noun', exampleDe:'Wir warten im Empfangsbereich auf Sie.', exampleEn:'We are waiting for you in the reception area.' },
  { word:'die Gründe', translation:'reasons', pos:'noun', exampleDe:'Es gibt viele Gründe für diese Entscheidung.', exampleEn:'There are many reasons for this decision.' },
  { word:'der Designergürtel', translation:'designer belt', pos:'noun', exampleDe:'Er hat sich einen teuren Designergürtel gekauft.', exampleEn:'He bought an expensive designer belt.' },
  { word:'das Zubehör', translation:'accessories', pos:'noun', exampleDe:'Das Zubehör für die Kamera ist teuer.', exampleEn:'The accessories for the camera are expensive.' },
  { word:'der Leseausweis', translation:'reader\'s pass', pos:'noun', exampleDe:'Vergessen Sie nicht Ihren Leseausweis.', exampleEn:'Don\'t forget your reader\'s pass/library card.' },
  { word:'die Ausleihe', translation:'lending / loan', pos:'noun', exampleDe:'Die Ausleihe von Büchern ist kostenlos.', exampleEn:'The lending of books is free.' },
  { word:'die Leihfrist', translation:'circulation period / period of loan', pos:'noun', exampleDe:'Die Leihfrist kann online verlängert werden.', exampleEn:'The loan period can be extended online.' },
  { word:'die Verhaltensregeln', translation:'rules of conduct', pos:'noun', exampleDe:'Bitte beachten Sie die Verhaltensregeln.', exampleEn:'Please observe the rules of conduct.' },
  { word:'das Ähnliche', translation:'what not', pos:'noun', exampleDe:'Wir verkaufen Brot, Kuchen und Ähnliches.', exampleEn:'We sell bread, cake, and the like/what not.' },

  // ADJECTIVES
  { word:'groß',         translation:'big / tall',            pos:'adjective', exampleDe:'Das ist ein großes Haus.',        exampleEn:'That is a big house.' },
  { word:'klein',        translation:'small / little',        pos:'adjective', exampleDe:'Das Kind ist noch klein.',        exampleEn:'The child is still small.' },
  { word:'gut',          translation:'good',                  pos:'adjective', exampleDe:'Das ist eine gute Idee.',         exampleEn:'That is a good idea.' },
  { word:'schlecht',     translation:'bad',                   pos:'adjective', exampleDe:'Das Wetter ist heute schlecht.',  exampleEn:'The weather is bad today.' },
  { word:'schön',        translation:'beautiful / nice',      pos:'adjective', exampleDe:'Was für ein schöner Tag!',        exampleEn:'What a beautiful day!' },
  { word:'alt',          translation:'old',                   pos:'adjective', exampleDe:'Das Gebäude ist sehr alt.',       exampleEn:'The building is very old.' },
  { word:'neu',          translation:'new',                   pos:'adjective', exampleDe:'Ich habe ein neues Auto.',        exampleEn:'I have a new car.' },
  { word:'wichtig',      translation:'important',             pos:'adjective', exampleDe:'Das ist sehr wichtig.',           exampleEn:'That is very important.' },
  { word:'interessant',  translation:'interesting',           pos:'adjective', exampleDe:'Das Buch ist interessant.',       exampleEn:'The book is interesting.' },
  { word:'schnell',      translation:'fast / quick',          pos:'adjective', exampleDe:'Er ist sehr schnell.',            exampleEn:'He is very fast.' },
  { word:'langsam',      translation:'slow',                  pos:'adjective', exampleDe:'Fahr langsamer!',                 exampleEn:'Drive more slowly!' },
  { word:'teuer',        translation:'expensive',             pos:'adjective', exampleDe:'Das ist zu teuer.',               exampleEn:'That is too expensive.' },
  { word:'billig',       translation:'cheap',                 pos:'adjective', exampleDe:'Das Hemd ist billig.',            exampleEn:'The shirt is cheap.' },
  { word:'jung',         translation:'young',                 pos:'adjective', exampleDe:'Sie ist noch jung.',              exampleEn:'She is still young.' },
  { word:'müde',         translation:'tired',                 pos:'adjective', exampleDe:'Ich bin sehr müde.',              exampleEn:'I am very tired.' },
  { word:'glücklich',    translation:'happy',                 pos:'adjective', exampleDe:'Er ist glücklich.',               exampleEn:'He is happy.' },
  { word:'richtig',      translation:'correct / right',       pos:'adjective', exampleDe:'Die Antwort ist richtig.',        exampleEn:'The answer is correct.' },
  { word:'falsch',       translation:'wrong / incorrect',     pos:'adjective', exampleDe:'Das ist falsch.',                 exampleEn:'That is wrong.' },
  { word:'einfach',      translation:'simple / easy',         pos:'adjective', exampleDe:'Das ist einfach.',                exampleEn:'That is simple.' },
  { word:'schwierig',    translation:'difficult',             pos:'adjective', exampleDe:'Die Aufgabe ist schwierig.',      exampleEn:'The task is difficult.' },

  // ADVERBS
  { word:'auch',         translation:'also / too',            pos:'adverb',    exampleDe:'Ich komme auch.',                 exampleEn:'I\'m coming too.' },
  { word:'noch',         translation:'still / yet',           pos:'adverb',    exampleDe:'Er schläft noch.',               exampleEn:'He is still sleeping.' },
  { word:'schon',        translation:'already',               pos:'adverb',    exampleDe:'Bist du schon fertig?',           exampleEn:'Are you already done?' },
  { word:'immer',        translation:'always',                pos:'adverb',    exampleDe:'Er ist immer pünktlich.',         exampleEn:'He is always punctual.' },
  { word:'nie',          translation:'never',                 pos:'adverb',    exampleDe:'Ich esse nie Fleisch.',           exampleEn:'I never eat meat.' },
  { word:'oft',          translation:'often',                 pos:'adverb',    exampleDe:'Sie geht oft spazieren.',         exampleEn:'She often goes for a walk.' },
  { word:'manchmal',     translation:'sometimes',             pos:'adverb',    exampleDe:'Manchmal bin ich müde.',          exampleEn:'Sometimes I am tired.' },
  { word:'hier',         translation:'here',                  pos:'adverb',    exampleDe:'Ich bin hier.',                   exampleEn:'I am here.' },
  { word:'dort',         translation:'there',                 pos:'adverb',    exampleDe:'Er ist dort.',                    exampleEn:'He is there.' },
  { word:'sehr',         translation:'very',                  pos:'adverb',    exampleDe:'Das ist sehr schön.',             exampleEn:'That is very beautiful.' },
  { word:'gern(e)',      translation:'gladly / with pleasure', pos:'adverb',   exampleDe:'Ich helfe dir gerne.',            exampleEn:'I\'m happy to help you.' },
  { word:'leider',       translation:'unfortunately',         pos:'adverb',    exampleDe:'Leider kann ich nicht kommen.',   exampleEn:'Unfortunately I can\'t come.' },
  { word:'vielleicht',   translation:'perhaps / maybe',       pos:'adverb',    exampleDe:'Vielleicht komme ich später.',    exampleEn:'Maybe I\'ll come later.' },
  { word:'trotzdem',     translation:'nevertheless / still',  pos:'adverb',    exampleDe:'Es regnet, trotzdem gehe ich.',  exampleEn:'It\'s raining, nevertheless I\'m going.' },

  // OTHER (prepositions, conjunctions, articles, pronouns)
  { word:'mit',          translation:'with',                  pos:'other',     exampleDe:'Ich komme mit dir.',              exampleEn:'I\'m coming with you.' },
  { word:'ohne',         translation:'without',               pos:'other',     exampleDe:'Kaffee ohne Zucker.',             exampleEn:'Coffee without sugar.' },
  { word:'für',          translation:'for',                   pos:'other',     exampleDe:'Das ist für dich.',               exampleEn:'That is for you.' },
  { word:'weil',         translation:'because',               pos:'other',     exampleDe:'Ich bleibe, weil ich müde bin.', exampleEn:'I\'m staying because I\'m tired.' },
  { word:'dass',         translation:'that (conjunction)',    pos:'other',     exampleDe:'Ich weiß, dass er kommt.',        exampleEn:'I know that he is coming.' },
  { word:'obwohl',       translation:'although / even though', pos:'other',    exampleDe:'Obwohl es regnet, gehe ich.',    exampleEn:'Although it rains, I\'m going.' },
  { word:'wenn',         translation:'when / if',             pos:'other',     exampleDe:'Wenn ich Zeit habe, komme ich.', exampleEn:'If I have time, I\'ll come.' },
  { word:'während',      translation:'while / during',        pos:'other',     exampleDe:'Während ich esse, lese ich.',    exampleEn:'While I eat, I read.' },
];

/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────────*/
const state = {
  view: 'explorer',
  search: '',
  posFilter: 'all',
  sort: 'alpha-de',
  mastered: new Set(),
  fc: { deck: [], index: 0, flipped: false },
  quiz: {
    questions: [], current: 0, score: 0,
    streak: 0, bestStreak: 0, results: [],
    mode: 'mc-de-en', pos: 'all', count: 10,
  },
  vh: { search: '', cat: 'all' },
};

/* ─────────────────────────────────────────────
   LOCAL STORAGE
───────────────────────────────────────────────*/
function loadStorage() {
  try {
    const m = localStorage.getItem('dm_mastered');
    if (m) state.mastered = new Set(JSON.parse(m));
    const t = localStorage.getItem('dm_theme');
    if (t === 'light') document.body.classList.add('light');
  } catch(e){}
}
function saveStorage() {
  try {
    localStorage.setItem('dm_mastered', JSON.stringify([...state.mastered]));
  } catch(e){}
}
function loadRecords() {
  try { return JSON.parse(localStorage.getItem('dm_records') || '[]'); } catch(e){ return []; }
}
function saveRecord(rec) {
  try {
    const r = loadRecords();
    r.unshift(rec);
    localStorage.setItem('dm_records', JSON.stringify(r.slice(0,10)));
  } catch(e){}
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────*/
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}
function posBadge(pos) {
  return `<span class="pos-badge pos-${pos}">${pos === 'other' ? 'other' : pos}</span>`;
}
function updateMasteredCount() {
  document.getElementById('masteredCount').textContent = state.mastered.size;
  document.getElementById('statMastered').textContent = state.mastered.size;
}

/* ─────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────────*/
function switchView(v) {
  state.view = v;
  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
  const section = document.getElementById('view-'+v);
  if (section) { section.classList.add('active'); void section.offsetWidth; }
  document.querySelectorAll(`[data-view="${v}"]`).forEach(el => el.classList.add('active'));
  if (v === 'flashcards') initFlashcards();
  if (v === 'verbhub') renderVerbHub();
  if (v === 'quiz') renderQuizRecords();
}

/* ─────────────────────────────────────────────
   EXPLORER VIEW
───────────────────────────────────────────────*/
function getFilteredVocab() {
  let words = VOCAB.filter(w => {
    if (state.posFilter !== 'all' && w.pos !== state.posFilter) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      return w.word.toLowerCase().includes(q) || w.translation.toLowerCase().includes(q);
    }
    return true;
  });
  switch (state.sort) {
    case 'alpha-de':  words.sort((a,b)=>a.word.localeCompare(b.word,'de')); break;
    case 'alpha-en':  words.sort((a,b)=>a.translation.localeCompare(b.translation,'en')); break;
    case 'pos':       words.sort((a,b)=>a.pos.localeCompare(b.pos)); break;
    case 'mastered':
      words.sort((a,b) => {
        const am = state.mastered.has(a.word) ? 1 : 0;
        const bm = state.mastered.has(b.word) ? 1 : 0;
        return am - bm;
      }); break;
  }
  return words;
}

function renderExplorer() {
  const words = getFilteredVocab();
  const grid = document.getElementById('wordGrid');
  document.getElementById('statShowing').textContent = words.length;
  document.getElementById('statTotal').textContent = VOCAB.length;

  if (!words.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-dim)">No words match your search.</div>`;
    return;
  }

  grid.innerHTML = words.map(w => `
    <div class="word-card ${state.mastered.has(w.word) ? 'mastered' : ''}" data-word="${escHtml(w.word)}">
      <div class="wc-top">
        <div class="wc-de">${escHtml(w.word)}</div>
        ${posBadge(w.pos)}
      </div>
      <div class="wc-en">${escHtml(w.translation)}</div>
      ${w.exampleDe ? `<div class="wc-example">${escHtml(w.exampleDe)}<div class="wc-example-en">${escHtml(w.exampleEn||'')}</div></div>` : ''}
    </div>
  `).join('');
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ─────────────────────────────────────────────
   FLASHCARDS VIEW
───────────────────────────────────────────────*/
function getFlashcardDeck() {
  const filter = document.getElementById('fcFilter').value;
  let words = VOCAB.filter(w => {
    if (filter === 'verb') return w.pos === 'verb';
    if (filter === 'noun') return w.pos === 'noun';
    if (filter === 'adjective') return w.pos === 'adjective';
    if (filter === 'unmastered') return !state.mastered.has(w.word);
    return true;
  });
  return words;
}

function initFlashcards(doShuffle = false) {
  let deck = getFlashcardDeck();
  if (doShuffle) deck = shuffle(deck);
  state.fc.deck = deck;
  state.fc.index = 0;
  state.fc.flipped = false;
  renderFlashcard();
  renderMasteredList();
}

function renderFlashcard() {
  const { deck, index } = state.fc;
  const card = document.getElementById('fcCard');
  const total = deck.length;
  document.getElementById('fcCounter').textContent = total ? `Card ${index+1} of ${total}` : 'No cards';
  const pct = total ? ((index+1)/total*100) : 0;
  document.getElementById('fcProgressBar').style.width = pct+'%';

  if (!total) {
    document.getElementById('fcFrontWord').textContent = '–';
    document.getElementById('fcFrontPos').innerHTML = '';
    document.getElementById('fcBackTranslation').textContent = '–';
    document.getElementById('fcBackExample').textContent = '';
    document.getElementById('fcBackExampleEn').textContent = '';
    return;
  }

  const w = deck[index];
  card.classList.remove('flipped');
  state.fc.flipped = false;

  document.getElementById('fcFrontPos').innerHTML = posBadge(w.pos);
  document.getElementById('fcFrontWord').textContent = w.word;
  document.getElementById('fcBackTranslation').textContent = w.translation;
  document.getElementById('fcBackExample').textContent = w.exampleDe || '';
  document.getElementById('fcBackExampleEn').textContent = w.exampleEn || '';
}

function renderMasteredList() {
  const list = document.getElementById('fcMasteredList');
  const wrap = document.getElementById('fcMasteredWrap');
  if (state.mastered.size === 0) { wrap.style.display = 'none'; return; }
  wrap.style.display = '';
  list.innerHTML = [...state.mastered].map(w =>
    `<span class="fc-mastered-tag">${escHtml(w)}</span>`
  ).join('');
}

/* ─────────────────────────────────────────────
   QUIZ ENGINE
───────────────────────────────────────────────*/
function buildQuizDeck() {
  const pos = state.quiz.pos;
  let pool = VOCAB.filter(w => pos === 'all' || w.pos === pos);
  if (pool.length < 4) { showToast('Not enough words for a quiz!'); return false; }
  pool = shuffle(pool);
  const n = Math.min(state.quiz.count, pool.length);
  state.quiz.questions = pool.slice(0, n).map(w => buildQuestion(w, pool));
  state.quiz.current = 0;
  state.quiz.score = 0;
  state.quiz.streak = 0;
  state.quiz.bestStreak = 0;
  state.quiz.results = [];
  return true;
}

function buildQuestion(w, pool) {
  const modes = ['mc-de-en','mc-en-de','spell'];
  let mode = state.quiz.mode;
  if (mode === 'mixed') mode = modes[Math.floor(Math.random()*modes.length)];

  let question, answer, options;
  if (mode === 'mc-de-en' || mode === 'spell') {
    question = w.word; answer = w.translation;
  } else {
    question = w.translation; answer = w.word;
  }

  if (mode !== 'spell') {
    const distractors = shuffle(pool.filter(x => x.word !== w.word))
      .slice(0, 3)
      .map(x => mode === 'mc-de-en' ? x.translation : x.word);
    options = shuffle([answer, ...distractors]);
  }

  return { word: w, mode, question, answer, options };
}

function renderQuizQuestion() {
  const q = state.quiz.questions[state.quiz.current];
  const total = state.quiz.questions.length;
  const idx = state.quiz.current;

  document.getElementById('hudQ').textContent = `${idx+1}/${total}`;
  document.getElementById('hudScore').textContent = state.quiz.score;
  document.getElementById('quizProgressBar').style.width = (idx/total*100)+'%';
  document.getElementById('quizQuestion').textContent = q.question;
  document.getElementById('quizFeedback').textContent = '';

  const modeLabel = { 'mc-de-en':'DE → EN', 'mc-en-de':'EN → DE', 'spell':'Spelling' };
  document.getElementById('quizModeTag').textContent = modeLabel[q.mode] || q.mode;

  const card = document.getElementById('quizCard');
  card.className = 'quiz-card';

  if (q.mode === 'spell') {
    document.getElementById('quizOptions').innerHTML = '';
    document.getElementById('quizOptions').style.display = 'none';
    const sw = document.getElementById('quizSpellWrap');
    sw.classList.remove('hidden');
    const si = document.getElementById('spellInput');
    si.value = '';
    si.disabled = false;
    setTimeout(() => si.focus(), 50);
  } else {
    document.getElementById('quizSpellWrap').classList.add('hidden');
    const opts = document.getElementById('quizOptions');
    opts.style.display = '';
    opts.innerHTML = q.options.map(o => `
      <button class="quiz-option" data-opt="${escHtml(o)}">${escHtml(o)}</button>
    `).join('');
  }
}

function handleAnswer(chosen, wasCorrect) {
  const q = state.quiz.questions[state.quiz.current];
  const card = document.getElementById('quizCard');
  const fb = document.getElementById('quizFeedback');

  if (wasCorrect) {
    state.quiz.score++;
    state.quiz.streak++;
    if (state.quiz.streak > state.quiz.bestStreak) state.quiz.bestStreak = state.quiz.streak;
    card.classList.add('correct');
    fb.textContent = '✓ Correct!';
    fb.style.color = 'var(--sage)';
  } else {
    state.quiz.streak = 0;
    card.classList.add('wrong');
    fb.textContent = `✕ Correct answer: ${q.answer}`;
    fb.style.color = 'var(--rose)';
  }

  state.quiz.results.push({ word: q.word, correct: wasCorrect, given: chosen });

  // Disable inputs
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.opt === q.answer) btn.classList.add('show-correct');
    if (btn.dataset.opt === chosen && !wasCorrect) btn.classList.add('selected-wrong');
    if (btn.dataset.opt === chosen && wasCorrect) btn.classList.add('selected-correct');
  });
  document.getElementById('spellInput').disabled = true;

  setTimeout(() => {
    state.quiz.current++;
    if (state.quiz.current >= state.quiz.questions.length) {
      showQuizResults();
    } else {
      renderQuizQuestion();
    }
  }, wasCorrect ? 900 : 1500);
}

function showQuizResults() {
  document.getElementById('quizActive').classList.add('hidden');
  const res = document.getElementById('quizResults');
  res.classList.remove('hidden');

  const total = state.quiz.questions.length;
  const score = state.quiz.score;
  const pct = Math.round(score/total*100);

  document.getElementById('resultsPct').textContent = pct+'%';
  document.getElementById('rCorrect').textContent = score;
  document.getElementById('rWrong').textContent = total - score;
  document.getElementById('rStreak').textContent = state.quiz.bestStreak;

  const grade = pct >= 90 ? '🏆 Excellent!' : pct >= 70 ? '⭐ Good job!' : pct >= 50 ? '📚 Keep studying!' : '💪 Keep going!';
  document.getElementById('resultsGrade').textContent = grade;

  // Animate ring
  const circumference = 314;
  const offset = circumference - (pct/100)*circumference;
  setTimeout(() => {
    document.getElementById('ringFill').style.strokeDashoffset = offset;
  }, 100);

  // Review
  const review = document.getElementById('resultsReview');
  const wrongs = state.quiz.results.filter(r => !r.correct);
  if (wrongs.length) {
    review.innerHTML = `<div class="results-review-title">Review incorrect answers:</div>` +
      wrongs.map(r => `
        <div class="review-item">
          <span class="review-icon">✕</span>
          <span class="review-de">${escHtml(r.word.word)}</span>
          <span class="review-en">${escHtml(r.word.translation)}</span>
        </div>
      `).join('');
  } else {
    review.innerHTML = `<div style="color:var(--sage);text-align:center;padding:12px">🎉 Perfect score!</div>`;
  }

  // Save record
  saveRecord({ mode: state.quiz.mode, pos: state.quiz.pos, score, total, pct, date: new Date().toLocaleDateString() });
  renderQuizRecords();
}

function renderQuizRecords() {
  const records = loadRecords();
  const el = document.getElementById('quizRecords');
  if (!records.length) {
    el.innerHTML = `<div style="color:var(--text-dim);font-size:13px">No quiz history yet.</div>`;
    return;
  }
  el.innerHTML = records.slice(0,5).map(r => `
    <div class="quiz-record">
      <span class="qr-mode">${r.mode}·${r.pos}</span>
      <span>${r.score}/${r.total}</span>
      <span class="qr-score">${r.pct}%</span>
      <span style="color:var(--text-dim);font-size:11px">${r.date}</span>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   VERB HUB VIEW
───────────────────────────────────────────────*/
const VERB_CATS = {
  modal:     w => w.verbMeta?.modal,
  separable: w => w.verbMeta?.separable,
  reflexive: w => w.verbMeta?.reflexive,
  irregular: w => w.verbMeta?.irregular && !w.verbMeta?.modal,
};

function getFilteredVerbs() {
  const q = state.vh.search.toLowerCase();
  const cat = state.vh.cat;
  return VOCAB.filter(w => {
    if (w.pos !== 'verb') return false;
    if (q && !w.word.toLowerCase().includes(q) && !w.translation.toLowerCase().includes(q)) return false;
    if (cat !== 'all' && !VERB_CATS[cat]?.(w)) return false;
    return true;
  });
}

function renderVerbHub() {
  const verbs = getFilteredVerbs();
  const grid = document.getElementById('vhGrid');

  if (!verbs.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-dim)">No verbs match.</div>`;
    return;
  }

  grid.innerHTML = verbs.map(w => {
    const m = w.verbMeta || {};
    const tags = [];
    if (m.modal)     tags.push(`<span class="vh-tag modal">Modal</span>`);
    if (m.separable) tags.push(`<span class="vh-tag separable">Separable</span>`);
    if (m.reflexive) tags.push(`<span class="vh-tag">Reflexive</span>`);
    if (m.irregular && !m.modal) tags.push(`<span class="vh-tag irregular">Irregular</span>`);
    if (!m.modal && !m.separable && !m.reflexive && !m.irregular) tags.push(`<span class="vh-tag">Regular</span>`);

    return `
      <div class="vh-card" data-verb="${escHtml(w.word)}">
        <div class="vh-infinitive">${escHtml(w.word)}</div>
        <div class="vh-translation">${escHtml(w.translation)}</div>
        <div class="vh-tags">${tags.join('')}</div>
        ${w.exampleDe ? `<div class="vh-quick-drill">"${escHtml(w.exampleDe)}"</div>` : ''}
      </div>
    `;
  }).join('');
}

function openVerbModal(verbWord) {
  const w = VOCAB.find(x => x.word === verbWord);
  if (!w || !w.verbMeta) return;
  const m = w.verbMeta;
  const conj = m.conjugations || {};

  const pronouns = {ich:'ich',du:'du',er:'er/sie/es',wir:'wir',ihr:'ihr',sie:'sie/Sie'};
  const conjRows = Object.entries(pronouns).map(([k,label]) => `
    <div class="conj-row">
      <span class="conj-pronoun">${label}</span>
      <span class="conj-form">${escHtml(conj[k] || '–')}</span>
    </div>
  `).join('');

  const tags = [];
  if (m.modal)     tags.push('<span class="vh-tag modal">Modal</span>');
  if (m.separable) tags.push('<span class="vh-tag separable">Separable</span>');
  if (m.reflexive) tags.push('<span class="vh-tag">Reflexive</span>');
  if (m.irregular) tags.push('<span class="vh-tag irregular">Irregular</span>');

  document.getElementById('verbModalContent').innerHTML = `
    <div style="margin-bottom:16px">${tags.join(' ')}</div>
    <div class="modal-verb-title">${escHtml(w.word)}</div>
    <div class="modal-verb-en">${escHtml(w.translation)}</div>

    <div class="modal-section">
      <div class="modal-section-title">Present Tense (Präsens)</div>
      <div class="conj-grid">${conjRows}</div>
    </div>

    ${w.exampleDe ? `
    <div class="modal-section">
      <div class="modal-section-title">Example</div>
      <div class="modal-example"><strong>${escHtml(w.exampleDe)}</strong></div>
      <div class="modal-example" style="border-left-color:var(--teal)">${escHtml(w.exampleEn||'')}</div>
    </div>` : ''}

    <div class="modal-section">
      <div class="modal-section-title">Quick Tips</div>
      <div style="font-size:13px;color:var(--text-sub);line-height:1.7">
        ${m.modal ? '• Modal verbs are used with an infinitive: <em>Ich kann schwimmen</em> (I can swim).<br>• They have no -t in 1st/3rd person singular.' : ''}
        ${m.separable ? '• Separable verb: the prefix goes to the END of the clause in main sentences.<br>• Example: <em>Ich rufe dich <strong>an</strong></em>.' : ''}
        ${m.reflexive ? '• Reflexive verb: requires a reflexive pronoun (mich, dich, sich…).' : ''}
        ${m.irregular && !m.modal ? '• Irregular verb: the stem vowel changes in du/er forms. Learn them individually!' : ''}
        ${!m.modal&&!m.separable&&!m.reflexive&&!m.irregular ? '• Regular weak verb: follows standard -en conjugation pattern.' : ''}
      </div>
    </div>

    <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
      <button class="btn-primary" onclick="startVerbQuiz('${escHtml(w.word)}')">Quiz this verb ›</button>
      <button class="btn-${state.mastered.has(w.word)?'danger':'success'}" onclick="toggleMasteredVerb('${escHtml(w.word)}')">
        ${state.mastered.has(w.word) ? '✕ Unmark mastered' : '✓ Mark mastered'}
      </button>
    </div>
  `;

  document.getElementById('verbModal').classList.remove('hidden');
}

function startVerbQuiz(verbWord) {
  closeVerbModal();
  switchView('quiz');
  document.getElementById('quizPos').value = 'verb';
  state.quiz.mode = 'mc-de-en';
  state.quiz.pos = 'verb';
  showToast(`Starting verb quiz!`);
}

function toggleMasteredVerb(word) {
  if (state.mastered.has(word)) { state.mastered.delete(word); showToast(`Unmarked: ${word}`); }
  else { state.mastered.add(word); showToast(`Mastered: ${word} ✓`); }
  saveStorage();
  updateMasteredCount();
  openVerbModal(word); // re-render
}

function closeVerbModal() {
  document.getElementById('verbModal').classList.add('hidden');
}

/* ─────────────────────────────────────────────
   EVENT BINDING
───────────────────────────────────────────────*/
function bindEvents() {
  // Navigation
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light');
    try { localStorage.setItem('dm_theme', document.body.classList.contains('light') ? 'light' : 'dark'); } catch(e){}
  });

  // Explorer: search
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  searchInput.addEventListener('input', () => {
    state.search = searchInput.value;
    searchInput.parentElement.classList.toggle('has-value', !!state.search);
    renderExplorer();
  });
  searchClear.addEventListener('click', () => {
    searchInput.value = ''; state.search = '';
    searchInput.parentElement.classList.remove('has-value');
    renderExplorer();
  });

  // Explorer: filter chips
  document.getElementById('filterChips').addEventListener('click', e => {
    const chip = e.target.closest('[data-pos]');
    if (!chip) return;
    document.querySelectorAll('#filterChips .chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    state.posFilter = chip.dataset.pos;
    renderExplorer();
  });

  // Explorer: sort
  document.getElementById('sortSelect').addEventListener('change', e => {
    state.sort = e.target.value;
    renderExplorer();
  });

  // Flashcards: filter
  document.getElementById('fcFilter').addEventListener('change', () => initFlashcards());
  document.getElementById('fcShuffle').addEventListener('click', () => initFlashcards(true));
  document.getElementById('fcReset').addEventListener('click', () => {
    state.mastered.clear(); saveStorage();
    updateMasteredCount();
    initFlashcards();
    renderMasteredList();
    showToast('Progress reset.');
  });

  // Flashcard: flip
  document.getElementById('fcCard').addEventListener('click', () => {
    if (!state.fc.deck.length) return;
    state.fc.flipped = !state.fc.flipped;
    document.getElementById('fcCard').classList.toggle('flipped', state.fc.flipped);
  });

  // Flashcard: prev / next
  document.getElementById('fcPrev').addEventListener('click', () => {
    if (!state.fc.deck.length) return;
    state.fc.index = (state.fc.index - 1 + state.fc.deck.length) % state.fc.deck.length;
    renderFlashcard();
  });
  document.getElementById('fcNext').addEventListener('click', () => {
    if (!state.fc.deck.length) return;
    state.fc.index = (state.fc.index + 1) % state.fc.deck.length;
    renderFlashcard();
  });

  // Flashcard: mastered
  document.getElementById('fcMarkMastered').addEventListener('click', () => {
    if (!state.fc.deck.length) return;
    const w = state.fc.deck[state.fc.index];
    state.mastered.add(w.word);
    saveStorage(); updateMasteredCount();
    renderMasteredList();
    showToast(`✓ Mastered: ${w.word}`);
    state.fc.index = (state.fc.index + 1) % state.fc.deck.length;
    renderFlashcard();
  });
  document.getElementById('fcMarkWrong').addEventListener('click', () => {
    if (!state.fc.deck.length) return;
    const w = state.fc.deck[state.fc.index];
    state.mastered.delete(w.word);
    saveStorage(); updateMasteredCount();
    renderMasteredList();
    state.fc.index = (state.fc.index + 1) % state.fc.deck.length;
    renderFlashcard();
  });

  // Keyboard for flashcards
  document.addEventListener('keydown', e => {
    if (state.view !== 'flashcards') return;
    if (e.key === 'ArrowRight') document.getElementById('fcNext').click();
    if (e.key === 'ArrowLeft')  document.getElementById('fcPrev').click();
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); document.getElementById('fcCard').click(); }
    if (e.key === 'm' || e.key === 'M') document.getElementById('fcMarkMastered').click();
  });

  // Quiz: count slider
  const qCount = document.getElementById('qCount');
  qCount.addEventListener('input', () => {
    state.quiz.count = parseInt(qCount.value);
    document.getElementById('qCountLabel').textContent = state.quiz.count;
  });

  // Quiz: start
  document.getElementById('startQuiz').addEventListener('click', () => {
    state.quiz.mode = document.querySelector('[name="quizMode"]:checked').value;
    state.quiz.pos = document.getElementById('quizPos').value;
    state.quiz.count = parseInt(document.getElementById('qCount').value);

    if (!buildQuizDeck()) return;

    document.getElementById('quizSetup').classList.add('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizActive').classList.remove('hidden');
    renderQuizQuestion();
  });

  // Quiz: options
  document.getElementById('quizOptions').addEventListener('click', e => {
    const btn = e.target.closest('.quiz-option');
    if (!btn || btn.disabled) return;
    const q = state.quiz.questions[state.quiz.current];
    handleAnswer(btn.dataset.opt, btn.dataset.opt === q.answer);
  });

  // Quiz: spelling
  document.getElementById('spellSubmit').addEventListener('click', () => {
    const q = state.quiz.questions[state.quiz.current];
    const val = document.getElementById('spellInput').value.trim();
    const correct = val.toLowerCase() === q.answer.toLowerCase();
    handleAnswer(val, correct);
  });
  document.getElementById('spellInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('spellSubmit').click();
  });

  // Quiz: quit
  document.getElementById('quitQuiz').addEventListener('click', () => {
    document.getElementById('quizActive').classList.add('hidden');
    document.getElementById('quizSetup').classList.remove('hidden');
  });

  // Quiz: retry / new
  document.getElementById('retryQuiz').addEventListener('click', () => {
    buildQuizDeck();
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizActive').classList.remove('hidden');
    document.getElementById('ringFill').style.strokeDashoffset = '314';
    renderQuizQuestion();
  });
  document.getElementById('newQuiz').addEventListener('click', () => {
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizSetup').classList.remove('hidden');
    document.getElementById('ringFill').style.strokeDashoffset = '314';
  });

  // Verb Hub: search
  document.getElementById('vhSearch').addEventListener('input', e => {
    state.vh.search = e.target.value;
    renderVerbHub();
  });

  // Verb Hub: category chips
  document.querySelectorAll('[data-vhcat]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('[data-vhcat]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.vh.cat = chip.dataset.vhcat;
      renderVerbHub();
    });
  });

  // Verb Hub: card click → modal
  document.getElementById('vhGrid').addEventListener('click', e => {
    const card = e.target.closest('.vh-card');
    if (card) openVerbModal(card.dataset.verb);
  });

  // Modal close
  document.getElementById('verbModalClose').addEventListener('click', closeVerbModal);
  document.getElementById('verbModal').addEventListener('click', e => {
    if (e.target === document.getElementById('verbModal')) closeVerbModal();
  });

  // Mobile nav
  buildMobileNav();
}

function buildMobileNav() {
  const nav = document.createElement('nav');
  nav.className = 'mobile-nav';
  nav.innerHTML = `
    <button class="nav-btn active" data-view="explorer"><span class="nav-icon">◈</span>Explorer</button>
    <button class="nav-btn" data-view="flashcards"><span class="nav-icon">⟁</span>Cards</button>
    <button class="nav-btn" data-view="quiz"><span class="nav-icon">◉</span>Quiz</button>
    <button class="nav-btn" data-view="verbhub"><span class="nav-icon">⌘</span>Verbs</button>
  `;
  document.body.appendChild(nav);
  nav.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view);
      nav.querySelectorAll('[data-view]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────────*/
function init() {
  loadStorage();
  bindEvents();
  renderExplorer();
  updateMasteredCount();
  document.getElementById('statTotal').textContent = VOCAB.length;
  document.getElementById('statShowing').textContent = VOCAB.length;

  // Staggered card entrance animation
  setTimeout(() => {
    document.querySelectorAll('.word-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(14px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        card.style.opacity = '';
        card.style.transform = '';
      }, i * 25);
    });
  }, 50);
}

document.addEventListener('DOMContentLoaded', init);


