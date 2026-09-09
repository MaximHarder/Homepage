import { createI18n } from 'vue-i18n'

// Helpers to sort praktikaItems by date (descending)
function parseDatumEnd(datum: string): number {
  const parts = datum.split('-')
  const end = parts[1] ?? ''
  if (end === '') return Date.UTC(9999, 11, 31)
  const seg = end.split('.')
  let year = 0
  let month = 11
  if (seg.length === 2) {
    const m = parseInt(seg[0], 10)
    const y = parseInt(seg[1], 10)
    year = isNaN(y) ? 0 : y
    month = isNaN(m) ? 11 : Math.max(0, Math.min(11, m - 1))
  } else if (seg.length === 1) {
    const y = parseInt(seg[0], 10)
    year = isNaN(y) ? 0 : y
    month = 11
  }
  return Date.UTC(year, month, 28)
}

function parseDatumStart(datum: string): number {
  const start = datum.includes('-') ? datum.split('-')[0] : datum
  const seg = start.split('.')
  let year = 0
  let month = 0
  if (seg.length === 2) {
    const m = parseInt(seg[0], 10)
    const y = parseInt(seg[1], 10)
    year = isNaN(y) ? 0 : y
    month = isNaN(m) ? 0 : Math.max(0, Math.min(11, m - 1))
  } else if (seg.length === 1) {
    const y = parseInt(seg[0], 10)
    year = isNaN(y) ? 0 : y
    month = 0
  }
  return Date.UTC(year, month, 1)
}

function sortPraktika<T extends { from: string }>(items: readonly T[] | T[]): T[] {
  return [...items].sort((a, b) => {
    const aEnd = parseDatumEnd(a.from)
    const bEnd = parseDatumEnd(b.from)
    if (aEnd !== bEnd) return bEnd - aEnd
    const aStart = parseDatumStart(a.from)
    const bStart = parseDatumStart(b.from)
    return bStart - aStart
  })
}

const messages = {
  de: {
    nav: {
      home: 'Startseite',
      cv: 'Lebenslauf',
      services: 'Dienstleistungen',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
      contact: 'Unverbindlich anfragen',
    },

    labels: { praktika: 'Praktika', ausbildung: 'Ausbildung', schule: 'Schule' },
    start: {
      title: 'Softwareentwickler in NRW – Web & Backend | Maxim Harder',
      heroRole: 'Front- / Back-End Entwickler',
      ctaContact: 'Unverbindlich anfragen',
      ctaServices: 'Leistungen & Preise',
      about: 'Über mich',
      aboutSub: 'Kurze Information über meine Person und diese Website',
      altProfile: 'Profilbild',
      profile: {
        email: 'E-Mail',
        location: 'Wohnort',
        availability: 'Verfügbarkeit',
        availabilityValue: 'Begrenzte Kapazitäten – Projekte nach Absprache',
        languages: 'Sprachen',
        languagesList: 'Deutsch, Russisch, Englisch',
        technologies: 'Technologien',
        technologiesList: 'PHP, Python, Java, JavaScript, C#',
      },
      welcome: 'Herzlich willkommen auf meiner persönlichen Webseite!',
      ageLine:
        'Mein Name ist Maxim Harder, ich bin {age} Jahre alt und seit 2020 als Programmierer in der IT-Branche tätig.',
      paragraphs: [
        'Meine Leidenschaft für die Mediengestaltung begann schon in der achten Klasse, als ich die ersten Clan- und Gilden-Webseiten für Browsergames erstellte. Ich merkte schnell, dass mir das Design und die technische Umsetzung mehr Spaß machten als die Spiele selbst. Mit dieser Leidenschaft begann ich auch, <strong>Open-Source-Projekte</strong> für das russische CMS <strong>DLE (DataLife Engine)</strong> zu entwickeln und auf meinem Forum <a href="https://devcraft.club" target="_blank" class="text-blue-600 hover:text-blue-700">devcraft.club</a> zu veröffentlichen.',
        'Nach meiner Ausbildung zum gestaltungstechnischen Assistenten im Jahr 2015 vertiefte ich mein Wissen in der Webentwicklung und erkannte, wie wichtig die Verbindung von <strong>Frontend</strong> und <strong>Backend</strong> ist. So entschied ich mich, meine Programmierkenntnisse weiter auszubauen.',
        'Im Jahr 2020 schloss ich meine Ausbildung zum <strong>Fachinformatiker für Anwendungsentwicklung</strong> erfolgreich ab. Seitdem arbeite ich als Programmierer in verschiedenen Unternehmen und habe mich auf die Sprachen <strong>PHP</strong>, <strong>Python</strong> und <strong>Java</strong> spezialisiert.',
        'Um meine Kenntnisse weiter zu vertiefen, habe ich mein Fachabitur nachgeholt und studiere seit 2023 berufsbegleitend <strong>Angewandte Informatik</strong> an der <strong>FH Iserlohn</strong>.',
      ],
      offerTitle: 'Was ich für Dienstleistungen anbiete',
      offerList: [
        'Frontend: performante, zugängliche Weboberflächen (HTML, CSS, JS, Vue, React)',
        'Backend: belastbare Schnittstellen und Services (PHP, Python, Java, SQL, NodeJS)',
        'Windows-Apps: kleine bis mittlere Tools (C#, SQL)',
        'Individuelle Webanwendungen: maßgeschneidert nach Anforderung',
      ],
      techTitle: 'Technische Schwerpunkte',
      techList: [
        'CSS: Tailwind, Bootstrap, Fomantic, Bulma, natives CSS3',
        'JS: Vue, React, NodeJS, jQuery',
        'PHP: 7.x–8.x, Symfony, Laravel, Twig',
        'SQL: MySQL, PostgreSQL',
        'Frameworks: Django (Python), Spring Boot (Java), JavaFX (Java)',
        'APIs: Konzeption, Implementierung und Integration',
        'Betrieb: Pflege und Hosting kleinerer Webseiten',
        'Programmiersprachen: <b>Python</b>, <b>PHP</b>, <b>Java</b>, C#, JavaScript, SQL',
      ],
    },
    services: {
      badgeTransparent: 'Transparent',
      title: 'Leistungen',
      subtitle:
        'Leistungen mit transparenter Preisbasis – pauschal oder auf Stundenbasis, je nach Bedarf.',
      addToOffer: 'Zum Angebot hinzufügen',
      subtotalTitle: 'Zwischensumme',
      subtotalSubtitle: 'Aufgelistete Leistungen und deren Preis',
      price: 'Preis',
      hourly: 'Stundensatz',
      flat: 'Pauschal',
      requestOffer: 'Unverbindliches Angebot anfragen',
      calcTitle: 'Rechner',
      calcSubtitle: 'Berechnung basierend auf den obigen Parametern',
      hoursLabel: 'Stunden (mind. 8)',
      hourlyRateLabel: 'Stundensatz (€)',
      flatLabel: 'Pauschalbetrag (€)',
      distanceKm: 'Entfernung (km)',
      priority: 'Erhöhte Priorität (+200 %)',
      tableIntro:
        'In der Tabelle sind die wichtigsten Zahlen zusammengefasst, die bei der Berechnung relevant sind.',
      orientationBadge: 'Unverbindliche Orientierung',
      table: { kind: 'Art', value: 'Zahl' },
      rows: {
        hourlyRate: { title: 'Stundensatz', desc: 'Der pauschale Stundensatz für meinen Aufwand' },
        additionalCosts: {
          title: 'Zusätzliche Kosten',
          desc: 'Indirekte Kosten der Entwicklung: Lizenzen, Material, etc.',
        },
        bab: {
          title: 'Allgemeiner Aufschlag',
          desc: 'Aufschlag für Strom-, Wasser-, etc. auf die Gesamtsumme',
        },
        vat: { title: 'Mehrwertsteuer', desc: 'Diese muss ich auch zahlen' },
        priority: {
          title: 'Priorität',
          desc: 'Aufschlag für die erhöhte Priorität. Andere Aufträge werden verschoben.',
        },
        distance: {
          title: 'Entfernung',
          desc: 'Ab mehr als 10 km (auf der Seite noch nicht verrechnet).',
        },
      },
      or: 'oder',
      disclaimer:
        'Alle Zahlen sind unverbindlich и dienen der Veranschaulichung. Ein konkretes Angebot erhalten Sie nach kurzer Abstimmung.',
      items: {
        lastenheft: {
          name: 'Lasten-/Pflichtenheft',
          desc: 'Basisanforderungen, grobes Konzept, изформулиerte Lösungen.',
        },
        htmlthemeframe: {
          name: 'HTML-Schablone (Framework)',
          desc: 'Umsetzung von Vorlage in HTML5/CSS3 mit Framework (Bootstrap, Fomantic, etc.).',
        },
        htmltheme: {
          name: 'HTML-Schablone',
          desc: 'Individuelle HTML5/CSS3-Umsetzung ohne Framework.',
        },
        cmsplugin: { name: 'CMS Erweiterung', desc: 'Erweiterung/Plugin für CMS (DLE).' },
        custom_web: { name: 'Eigene Webanwendung', desc: 'Webanwendung in PHP, Python oder Java.' },
        custom_win: {
          name: 'Eigene Anwendung',
          desc: 'Desktop-Anwendung in C#, Python oder Java.',
        },
        admin: {
          name: 'Administrierung',
          desc: 'Pflege der Webseite, Hosting (mtl. Zusatzleistung).',
        },
      },
      remove: 'Entfernen',
      minHoursNote: 'Mindeststundeneinsatz je nach Leistung',
      calcModeLabel: 'Berechnungsart:',
      overwriteSumNote: 'Summe der gewählten Leistungen kann hier überschrieben werden',
      distanceNote: 'Pauschale: {rate} €/km (Berechnung ab 10 km)',
      chargeableKmLabel: 'Verrechnete km:',
      settingsTitle: 'Einstellungen',
      settingsBab: 'Allg. Aufschlag (Betriebskosten %)',
      settingsVat: 'MwSt (%)',
      settingsDistance: 'Entfernung €/km',
      summary: {
        baseNet: 'Basis (netto)',
        babAmount: 'Allgem. Aufschlag ({percent} %)',
        subtotal: 'Zwischensumme',
        vat: 'MwSt ({percent} %)',
        totalGross: 'Gesamt (brutto)',
      },
    },
    cookie: {
      text: 'Diese Website nutzt technisch notwendige Cookies und lokale Speichermechanismen sowie Cloudflare Turnstile zur Abwehr von Spam/Bots. Es werden keine Tracking‑/Marketing‑Cookies gesetzt.',
      more: 'Mehr erfahren',
      ok: 'OK',
    },
    footer: {
      imprint: 'Impressum',
      privacyLink: 'Datenschutz',
      github: 'Github',
      devcraft: 'DevCraftClub',
      xing: 'Xing Profil',
      sitemap: 'Sitemap',
      toTop: 'Nach oben',
    },
    legal: { 
      lastUpdated: 'Zuletzt aktualisiert:',
      imprint: {
        title: 'Impressum',
        subtitle: 'Angaben gemäß § 5 TMG',
        providerTitle: 'Diensteanbieter',
        contactTitle: 'Kontakt',
        responsibleTitle: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
        liabilityContentTitle: 'Haftung für Inhalte',
        liabilityContentText: 'Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
        liabilityLinksTitle: 'Haftung für Links',
        liabilityLinksText: 'Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
        copyrightTitle: 'Urheberrecht',
        copyrightText: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
      },
      privacy: {
        title: 'Datenschutzerklärung',
        subtitle: 'Informationen über die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten',
        controllerTitle: 'Verantwortlicher für die Datenverarbeitung',
        serverLogsTitle: 'Server-Logs',
        serverLogsText: 'Bei jedem Zugriff auf diese Website werden automatisch Informationen in sogenannten Server-Log-Dateien gespeichert. Diese umfassen: IP-Adresse, Browsertyp, Betriebssystem, Referrer-URL, aufgerufene Seite, Uhrzeit des Zugriffs. Diese Daten werden ausschließlich zur Sicherstellung des ordnungsgemäßen Betriebs der Website und zur Abwehr von Angriffen verwendet und nach 7 Tagen gelöscht.',
        cookiesTitle: 'Cookies',
        cookiesText: 'Diese Website verwendet nur technisch notwendige Cookies, die für die Grundfunktionalität erforderlich sind. Diese werden nicht für Tracking oder Analysezwecke verwendet.',
        turnstileCookiesText: 'Für den Cloudflare Turnstile Sicherheitscheck werden temporäre Cookies gesetzt, die nach der Sitzung automatisch gelöscht werden.',
        contactFormTitle: 'Kontaktformular',
        contactFormText: 'Wenn Sie das Kontaktformular nutzen, werden Ihre Angaben (Name, E-Mail, Nachricht) nur zur Bearbeitung Ihrer Anfrage verwendet. Die Daten werden nicht an Dritte weitergegeben und nach Abschluss der Bearbeitung gelöscht.',
        contactFormMailto: 'Alternativ können Sie mich direkt per E-Mail kontaktieren: info at maximharder punkt de',
        turnstileTitle: 'Cloudflare Turnstile',
        turnstileText: 'Das Kontaktformular ist mit Cloudflare Turnstile geschützt, um Spam und automatisierte Angriffe zu verhindern. Dabei werden keine personenbezogenen Daten an Cloudflare übertragen. Weitere Informationen finden Sie in der Cloudflare Datenschutzerklärung.',
        rightsTitle: 'Ihre Rechte',
        rightsText: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Bei Fragen zur Datenverarbeitung kontaktieren Sie mich bitte direkt.',
        hostingTitle: 'Hosting',
        hostingText: 'Diese Website wird auf Servern gehostet, die sich in Deutschland befinden. Der Hosting-Anbieter hat Zugriff auf Server-Logs, die IP-Adressen enthalten können. Dies erfolgt auf Grundlage unseres berechtigten Interesses an der Bereitstellung einer sicheren und effizienten Website.',
      }
    },
    contact: {
      title: 'Unverbindlich anfragen',
      subtitle: 'Erhalten Sie innerhalb von 24 Stunden eine Rückmeldung.',
      name: 'Ihr Name',
      namePlaceholder: 'Vor- und Nachname',
      email: 'E‑Mail',
      message: 'Projekt / Nachricht',
      messagePlaceholder: 'Beschreiben Sie kurz Ihr Vorhaben (Ziele, Budgetrahmen, Zeit)...',
      captchaTitle: 'Sicherheitsprüfung',
      captchaAria: 'Ergebnis der Rechenaufgabe',
      reload: 'Neu laden',
      captchaError: 'Bitte lösen Sie die Aufgabe korrekt.',
      turnstileTitle: 'Cloudflare‑Sicherheitscheck',
      turnstileError: 'Bitte bestätigen Sie den Sicherheitscheck.',
      pricesAgree: {
        before: 'Ich habe die',
        link: 'Preise',
        after: 'gesehen und bin mit diesen einverstanden.',
      },
      privacyAgree: { before: 'Ich habe die', link: 'Datenschutzhinweise', after: 'gelesen.' },
      sending: 'Senden...',
      send: 'Nachricht senden',
      success:
        'Vielen Dank! Ihre Nachricht wurde vorbereitet. Ihr E‑Mail‑Programm öffnet sich gleich.',
      mail: {
        subject: 'Anfrage von',
        name: 'Name',
        email: 'E‑Mail',
        pricesAccepted: 'Preise akzeptiert',
        turnstileChecked: 'Turnstile geprüft',
        message: 'Nachricht',
        yes: 'Ja',
      },
    },
    cv: {
      praktikaBadge: 'Praxis',
      praktikaTitle: 'Berufliche Praxis',
      praktikaSub: 'Ausgewählte Stationen',
      ausbildungBadge: 'Ausbildung',
      ausbildungTitle: 'Ausbildung',
      ausbildungSub: 'Qualifikationen',
      schuleBadge: 'Schule',
      schuleTitle: 'Schulbildung',
      schuleSub: 'Stationen',
      totalExperience:
        'Gesamte Entwicklungserfahrung: {years} {yearsLabel}, {months} {monthsLabel}',
      praktikaItems: sortPraktika([
        {
          company: 'Bruckmann Steuerungstechnik GmbH',
          from: '04.2025',
          to: null,
          description: 'Anwendungsentwickler',
          specs: [{ name: 'Java' }, { name: 'React' }, { name: 'JavaScript' }, { name: 'PostgreSQL' }, { name: 'Docker' }, { name: 'Spring Boot' }],
          jobTasks: [{ name: 'Entwicklung von Software' }, { name: 'Erweiterung der Bestandsanwendungen' }],
          relevant: true,
        },
        {
          company: 'Weltraumkommando der Bundeswehr',
          from: '10.2021',
          to: '03.2025',
          description: 'Anwendungsentwickler',
          specs: [{ name: 'Java' }, { name: 'PHP' }, { name: 'JavaScript' }, { name: 'PostgreSQL' }, { name: 'Spring Boot' }, { name: 'Python' }],
          jobTasks: [
            { name: 'Projektmanagement' },
            { name: 'Ausbau des IT der Weltraumwetterberatungszentrale' },
            { name: 'Entwicklung der Webanwendungen und Analysetools' },
            { name: 'Optimierung und Reorganisierung der Abläufe' },
            { name: 'Aufgaben des mittleren Dienstes' },
          ],
          relevant: true,
        },
        {
          company: 'Joint Analytical Systems GmbH',
          from: '09.2017',
          to: '09.2021',
          description: 'Anwendungsentwickler',
          specs: [{ name: 'PHP' }, { name: 'JavaScript' }, { name: 'PostgreSQL' }, { name: 'C#' }, { name: 'Python' }, { name: 'MS SQL' }],
          jobTasks: [
            { name: 'Digitale Zeiterfassung' },
            { name: 'ERP- und CRM-System' },
            { name: 'Homepagepflege' },
            { name: 'interne Entwicklung' },
          ],
          relevant: true,
        },
        {
          company: 'antony Systemhaus GmbH',
          from: '06.2016',
          to: '06.2016',
          description: 'Anwendungsentwickler (Praktikum)',
          specs: [{ name: 'JavaScript' }],
          jobTasks: [{ name: 'Erstellen von Landingpages' }],
          relevant: true,
        },
        {
          company: 'Amazon Fullfilment GmbH',
          from: '11.2015',
          to: '12.2015',
          description: 'Versandmitarbeiter',
          specs: [],
          jobTasks: [],
          relevant: false,
        },
        {
          company: 'MG Systems GmbH',
          from: '06.2015',
          to: '07.2015',
          description: 'Mediengestalter',
          specs: [{ name: 'Adobe Photoshop' }, { name: 'Adobe Premiere Pro' }],
          jobTasks: [
            { name: 'Filmen von Produkten' },
            { name: 'Foto- und Videomontage' },
            { name: 'Fotografieren von Produkten' },
            { name: 'Farbausgleich zwischen realen und Bildschirmfarben' },
          ],
          relevant: false,
        },
        {
          company: 'MG Systems GmbH',
          from: '04.2015',
          to: '04.2015',
          description: 'Mediengestalter',
          specs: [{ name: 'Adobe Photoshop' }, { name: 'Adobe Premiere Pro' }],
          jobTasks: [
            { name: 'Filmen von Produkten' },
            { name: 'Foto- und Videomontage' },
            { name: 'Fotografieren von Produkten' },
            { name: 'Farbausgleich zwischen realen und Bildschirmfarben' },
          ],
          relevant: false,
        },
        {
          company: 'MG Systems GmbH',
          from: '02.2015',
          to: '02.2015',
          description: 'Mediengestalter',
          specs: [{ name: 'Adobe Photoshop' }, { name: 'Adobe Premiere Pro' }],
          jobTasks: [
            { name: 'Filmen von Produkten' },
            { name: 'Foto- und Videomontage' },
            { name: 'Fotografieren von Produkten' },
            { name: 'Farbausgleich zwischen realen und Bildschirmfarben' },
          ],
          relevant: false,
        },
        {
          company: 'Rechtsanwaltskanzlei Oberdorfer & Truhm',
          from: '07.2014',
          to: '07.2014',
          description: 'Webdesign (Praktikum)',
          specs: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }, { name: 'PHP' }],
          jobTasks: [{ name: 'Erstellen vom neuen Design der Homepage' }],
          relevant: true,
        },
        {
          company: 'Satchkov Immobilien',
          from: '05.2013',
          to: '06.2013',
          description: 'Webdesign (Praktikum)',
          specs: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }, { name: 'PHP' }],
          jobTasks: [{ name: 'Anpassung des Webdesigns an CMS WordPress' }],
          relevant: true,
        },
        {
          company: 'Setassistenz bei Dreharbeiten von „Demon in Me"',
          from: '10.2011',
          to: '10.2011',
          description: 'Unter https://youtu.be/uNFqRlF3RBc zu finden',
          specs: [],
          jobTasks: [{ name: 'Arbeiten mit Licht und Nebel' }, { name: 'Setassistenz' }],
          relevant: false,
        },
        {
          company: 'mScb - Markus Schubert',
          from: '05.2009',
          to: '05.2009',
          description: 'Webdesigner (Praktikum)',
          specs: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
          jobTasks: [{ name: 'Gestalten von Webseiten' }, { name: 'Erstellen von hausinternen Seiten' }],
          relevant: true,
        },
      ]),
      ausbildungItems: sortPraktika([
        {
          company: 'Joint Analytical Systems GmbH',
          from: '2017',
          to: '2020',
          description: 'als Fachinformatiker Anwendungsentwicklung',
        },
        {
          company: 'BSZ e.o. plauen',
          from: '2012',
          to: '2015',
          description: 'als gestaltungstechnischer Assistent, Schwerpunkt Grafik',
        },
        {
          company: 'Mediadesign Hochschule Berlin',
          from: '2011',
          to: '2012',
          description: 'als Mediengestalter Bild und Ton (nicht abgeschlossen)',
        },
      ]),
      schuleItems: sortPraktika([
        {
          company: 'FH Iserlohn',
          from: '2023',
          description: 'Bachelor, berufsbegleitendes Studium (in Iserlohn)',
        },
        {
          company: 'Berufskollege für Technik Moers',
          from: '2018',
          to: '2020',
          description: 'Fachabitur, Abendschulform (in Moers)',
        },
        {
          company: 'Dr.-Chr.-Hufeland-Mittelschule',
          from: '2010',
          to: '2011',
          description: 'Realschulabschluss (in Plauen)',
        },
        {
          company: 'Lessing-Gymnasium',
          from: '2004',
          to: '2010',
          description: 'in Plauen',
        },
        {
          company: 'Grundschule Am Wartberg',
          from: '2002',
          to: '2004',
          description: 'in Plauen',
        },
        {
          company: 'Gymnasium Nr. 5',
          from: '1999',
          to: '2002',
          description: 'in Rudnyj, Kasachstan',
        },
      ]),
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      cv: 'Резюме',
      services: 'Услуги',
      imprint: 'Выходные данные',
      privacy: 'Конфиденциальность',
      contact: 'Оставить заявку',
    },
    labels: { praktika: 'Практика', ausbildung: 'Обучение', schule: 'Школа' },
    start: {
      title: 'Максим Гардер — Разработка ПО: Веб, Бэкенд, Приложения',
      heroRole: 'Разработчик Frontend / Backend',
      ctaContact: 'Оставить заявку',
      ctaServices: 'Услуги и цены',
      about: 'Обо мне',
      aboutSub: 'Краткая информация обо мне и об этом сайте',
      altProfile: 'Фото профиля',
      profile: {
        email: 'E‑mail',
        location: 'Место жительства',
        availability: 'Доступность',
        availabilityValue: 'Ограниченная занятость — проекты по согласованию',
        languages: 'Языки',
        languagesList: 'Немецкий, Русский, Английский',
        technologies: 'Технологии',
        technologiesList: 'PHP, Python, Java, JavaScript, C#',
      },
      welcome: 'Добро пожаловать на мою персональную страницу!',
      ageLine:
        'Меня зовут Максим Гардер, мне {age} лет, с 2020 года работаю программистом в IT‑сфере.',
      paragraphs: [
        'Моя страсть к медиадизайну началась ещё в школе, когда я создавал сайты кланов и гильдий для браузерных игр. Мне быстро стало ясно, что дизайн и техническая реализация увлекают меня больше самих игр. Позже я начал публиковать <strong>Open‑Source‑проекты</strong> для CMS <strong>DLE (DataLife Engine)</strong> на форуме <a href="https://devcraft.club" target="_blank" class="text-blue-600 hover:text-blue-700">devcraft.club</a>.',
        'После обучения на графического ассистента (2015) я углубился в веб‑разработку и понял важность связки <strong>Frontend</strong> + <strong>Backend</strong>.',
        'В 2020 году успешно завершил обучение по специальности <strong>разработчик программного обеспечения</strong> (Fachinformatiker AE). С тех пор работаю программистом и специализируюсь на <strong>PHP</strong>, <strong>Python</strong> и <strong>Java</strong>.',
        'Чтобы расширить знания, я получил среднее высшее образование (Fachabitur) и с 2023 года заочно изучаю <strong>Прикладную информатику</strong> в <strong>FH Iserlohn</strong>.',
      ],
      offerTitle: 'Какие услуги я предлагаю',
      offerList: [
        'Frontend: быстрые и доступные web‑интерфейсы (HTML, CSS, JS, Vue)',
        'Backend: надежные API и сервисы (PHP, Python, Java, SQL, NodeJS)',
        'Windows‑приложения: утилиты малого/среднего масштаба (C#, SQL)',
        'Индивидуальные web‑решения под задачу',
      ],
      techTitle: 'Технические компетенции',
      techList: [
        'CSS: Tailwind, Bootstrap, Fomantic, Bulma, нативный CSS3',
        'JS: Vue, React, NodeJS, jQuery',
        'PHP: 7.x–8.x, Symfony, Laravel, Twig',
        'SQL: MySQL, PostgreSQL',
        'Фреймворки: Django (Python), Spring Boot (Java), JavaFX (Java)',
        'API: проектирование, реализация и интеграция',
        'Эксплуатация: поддержка и хостинг небольших сайтов',
        'Языки программирования: <b>Python</b>, <b>PHP</b>, <b>Java</b>, C#, JavaScript, SQL',
      ],
    },
    services: {
      badgeTransparent: 'Прозрачно',
      title: 'Услуги',
      subtitle:
        'Прозрачная основа ценообразования — фиксированная цена или почасовая оплата по потребности.',
      addToOffer: 'Добавить к предложению',
      subtotalTitle: 'Промежуточный итог',
      subtotalSubtitle: 'Перечень услуг и их стоимость',
      price: 'Цена',
      hourly: 'Почасовая оплата',
      flat: 'Фиксировано',
      requestOffer: 'Запросить предложение',
      calcTitle: 'Калькулятор',
      calcSubtitle: 'Расчет на основе параметров выше',
      hoursLabel: 'Часы (мин. 8)',
      hourlyRateLabel: 'Ставка (€)',
      flatLabel: 'Фиксированная сумма (€)',
      distanceKm: 'Расстояние (км)',
      priority: 'Повышенный приоритет (+200 %)',
      tableIntro: 'В таблице собраны ключевые числа, важные для расчёта.',
      orientationBadge: 'Ориентир',
      table: { kind: 'Тип', value: 'Значение' },
      rows: {
        hourlyRate: { title: 'Почасовая ставка', desc: 'Базовая почасовая ставка за мою работу' },
        additionalCosts: {
          title: 'Дополнительные расходы',
          desc: 'Косвенные расходы разработки: лицензии, материалы, etc.',
        },
        bab: {
          title: 'Общая надбавка',
          desc: 'Надбавка за коммунальные и прочие расходы на итоговую сумму',
        },
        vat: { title: 'НДС', desc: 'Налог к оплате' },
        priority: {
          title: 'Приоритет',
          desc: 'Надбавка за повышенный приоритет. Другие задачи откладываются.',
        },
        distance: { title: 'Расстояние', desc: 'Свыше 10 км (на сайте пока не рассчитывается).' },
      },
      or: 'или',
      disclaimer:
        'Все цифры являются ориентировочными. Конкретное предложение — после короткого согласования.',
      items: {
        lastenheft: {
          name: 'ТЗ/Техническое задание',
          desc: 'Базовые требования, концепция, формализованные решения.',
        },
        htmlthemeframe: {
          name: 'HTML-шаблон (фреймворк)',
          desc: 'Верстка шаблона в HTML5/CSS3 с фреймворком (Bootstrap, Fomantic, etc.).',
        },
        htmltheme: {
          name: 'HTML-шаблон',
          desc: 'Индивидуальная верстка HTML5/CSS3 без фреймворков.',
        },
        cmsplugin: { name: 'Расширение CMS', desc: 'Плагин/модуль для CMS (DLE).' },
        custom_web: { name: 'Веб‑приложение', desc: 'Разработка на PHP, Python или Java.' },
        custom_win: { name: 'Приложение', desc: 'Десктоп‑приложение на C#, Python или Java.' },
        admin: {
          name: 'Администрирование',
          desc: 'Поддержка сайта, хостинг (ежемесячная доп. услуга).',
        },
      },
      remove: 'Удалить',
      minHoursNote: 'Минимальные часы зависят от услуги',
      calcModeLabel: 'Режим расчёта:',
      overwriteSumNote: 'Сумму выбранных услуг можно переопределить здесь',
      distanceNote: 'Плата: {rate} €/км (расчёт от 10 км)',
      chargeableKmLabel: 'Учтённые км:',
      settingsTitle: 'Настройки',
      settingsBab: 'Общая надбавка (эксплуатац. %)',
      settingsVat: 'НДС (%)',
      settingsDistance: 'Расстояние €/км',
      summary: {
        baseNet: 'База (нетто)',
        babAmount: 'Общая надбавка ({percent} %)',
        subtotal: 'Промежуточный итог',
        vat: 'НДС ({percent} %)',
        totalGross: 'Итого (брутто)',
      },
    },
    cookie: {
      text: 'Этот сайт использует технически необходимые файлы cookie и локальное хранилище, а также Cloudflare Turnstile для защиты от спама/ботов. Маркетинговые cookie не используются.',
      more: 'Подробнее',
      ok: 'OK',
    },
    footer: {
      imprint: 'Выходные данные',
      privacyLink: 'Конфиденциальность',
      github: 'Github',
      devcraft: 'DevCraftClub',
      xing: 'Профиль Xing',
      sitemap: 'Sitemap',
      toTop: 'Наверх',
    },
    legal: { 
      lastUpdated: 'Последнее обновление:',
      imprint: {
        title: 'Выходные данные',
        subtitle: 'Информация согласно § 5 TMG',
        providerTitle: 'Поставщик услуг',
        contactTitle: 'Контакт',
        responsibleTitle: 'Ответственный за содержание согласно § 55 Abs. 2 RStV',
        liabilityContentTitle: 'Ответственность за содержание',
        liabilityContentText: 'Как поставщик услуг я несу ответственность за собственное содержание на этих страницах согласно общим законам в соответствии с § 7 Abs.1 TMG. Однако согласно §§ 8-10 TMG я как поставщик услуг не обязан контролировать переданную или сохранённую стороннюю информацию или искать обстоятельства, указывающие на незаконную деятельность.',
        liabilityLinksTitle: 'Ответственность за ссылки',
        liabilityLinksText: 'Моё предложение содержит ссылки на внешние веб-сайты третьих лиц, на содержание которых я не имею влияния. Поэтому я не могу нести ответственность за это стороннее содержание. За содержание связанных страниц всегда отвечает соответствующий поставщик или оператор страниц.',
        copyrightTitle: 'Авторское право',
        copyrightText: 'Содержание и работы, созданные операторами страниц на этих страницах, подчиняются немецкому авторскому праву. Воспроизведение, обработка, распространение и любой вид использования за пределами авторского права требуют письменного согласия соответствующего автора или создателя.',
      },
      privacy: {
        title: 'Политика конфиденциальности',
        subtitle: 'Информация о сборе, обработке и использовании ваших персональных данных',
        controllerTitle: 'Ответственный за обработку данных',
        serverLogsTitle: 'Серверные логи',
        serverLogsText: 'При каждом обращении к этому веб-сайту автоматически сохраняется информация в так называемых серверных лог-файлах. К ним относятся: IP-адрес, тип браузера, операционная система, URL-источник, запрошенная страница, время обращения. Эти данные используются исключительно для обеспечения надлежащей работы веб-сайта и защиты от атак и удаляются через 7 дней.',
        cookiesTitle: 'Файлы cookie',
        cookiesText: 'Этот веб-сайт использует только технически необходимые файлы cookie, которые требуются для основной функциональности. Они не используются для отслеживания или анализа.',
        turnstileCookiesText: 'Для проверки безопасности Cloudflare Turnstile устанавливаются временные файлы cookie, которые автоматически удаляются после сессии.',
        contactFormTitle: 'Контактная форма',
        contactFormText: 'При использовании контактной формы ваши данные (имя, e-mail, сообщение) используются только для обработки вашего запроса. Данные не передаются третьим лицам и удаляются после завершения обработки.',
        contactFormMailto: 'Альтернативно вы можете связаться со мной напрямую по e-mail: info at maximharder punkt de',
        turnstileTitle: 'Cloudflare Turnstile',
        turnstileText: 'Контактная форма защищена Cloudflare Turnstile для предотвращения спама и автоматизированных атак. При этом персональные данные не передаются в Cloudflare. Дополнительную информацию можно найти в политике конфиденциальности Cloudflare.',
        rightsTitle: 'Ваши права',
        rightsText: 'Вы имеете право на информацию, исправление, удаление и ограничение обработки ваших персональных данных. При вопросах по обработке данных, пожалуйста, свяжитесь со мной напрямую.',
        hostingTitle: 'Хостинг',
        hostingText: 'Этот веб-сайт размещается на серверах, расположенных в Германии. Провайдер хостинга имеет доступ к серверным логам, которые могут содержать IP-адреса. Это происходит на основе нашего законного интереса в обеспечении безопасного и эффективного веб-сайта.',
      }
    },
    contact: {
      title: 'Оставить заявку',
      subtitle: 'Ответ в течение 24 часов.',
      name: 'Ваше имя',
      namePlaceholder: 'Имя и фамилия',
      email: 'E‑mail',
      message: 'Проект / Сообщение',
      messagePlaceholder: 'Кратко опишите задачу (цели, бюджет, сроки)...',
      captchaTitle: 'Проверка безопасности',
      captchaAria: 'Результат примера',
      reload: 'Обновить',
      captchaError: 'Пожалуйста, решите задачу верно.',
      turnstileTitle: 'Проверка Cloudflare',
      turnstileError: 'Пожалуйста, подтвердите проверку.',
      pricesAgree: { before: 'Я ознакомился с', link: 'Ценами', after: 'и согласен с ними.' },
      privacyAgree: { before: 'Я прочитал', link: 'Политику конфиденциальности', after: '.' },
      sending: 'Отправка...',
      send: 'Отправить сообщение',
      success: 'Спасибо! Ваше письмо подготовлено. Сейчас откроется почтовая программа.',
      mail: {
        subject: 'Заявка от',
        name: 'Имя',
        email: 'E‑mail',
        pricesAccepted: 'Цены приняты',
        turnstileChecked: 'Turnstile подтверждён',
        message: 'Сообщение',
        yes: 'Да',
      },
    },
    cv: {
      praktikaBadge: 'Практика',
      praktikaTitle: 'Профессиональная практика',
      praktikaSub: 'Избранные места',
      ausbildungBadge: 'Обучение',
      ausbildungTitle: 'Образование',
      ausbildungSub: 'Квалификации',
      schuleBadge: 'Школа',
      schuleTitle: 'Школьное образование',
      schuleSub: 'Этапы',
      totalExperience: 'Общий опыт разработки: {years} {yearsLabel}, {months} {monthsLabel}',
      praktikaItems: sortPraktika([
        {
          company: 'Bruckmann Steuerungstechnik GmbH',
          from: '04.2025',
          to: null,
          description: 'Разработчик приложений',
          specs: [{ name: 'Java' }, { name: 'React' }, { name: 'JavaScript' }, { name: 'PostgreSQL' }, { name: 'Docker' }, { name: 'Spring Boot' }],
          jobTasks: [{ name: 'Разработка программного обеспечения' }, { name: 'Расширение существующих приложений' }],
          relevant: true,
        },
        {
          company: 'German Space Command (Weltraumkommando der Bundeswehr)',
          from: '10.2021',
          to: '03.2025',
          description: 'Разработчик приложений',
          specs: [{ name: 'Java' }, { name: 'PHP' }, { name: 'JavaScript' }, { name: 'PostgreSQL' }, { name: 'Spring Boot' }, { name: 'Python' }],
          jobTasks: [
            { name: 'Управление проектами' },
            { name: 'Развитие ИТ центра консультаций по космической погоде' },
            { name: 'Разработка веб-приложений и инструментов анализа' },
            { name: 'Оптимизация и реорганизация процессов' },
            { name: 'Задачи среднего звена' },
          ],
          relevant: true,
        },
        {
          company: 'Joint Analytical Systems GmbH',
          from: '09.2017',
          to: '09.2021',
          description: 'Разработчик приложений',
          specs: [{ name: 'PHP' }, { name: 'JavaScript' }, { name: 'PostgreSQL' }, { name: 'C#' }, { name: 'Python' }, { name: 'MS SQL' }],
          jobTasks: [
            { name: 'Цифровой учёт времени' },
            { name: 'ERP и CRM система' },
            { name: 'Поддержка сайта' },
            { name: 'Внутренняя разработка' },
          ],
          relevant: true,
        },
        {
          company: 'antony Systemhaus GmbH',
          from: '06.2016',
          to: '06.2016',
          description: 'Разработчик приложений (практика)',
          specs: [{ name: 'JavaScript' }],
          jobTasks: [{ name: 'Создание лендингов' }],
          relevant: true,
        },
        {
          company: 'Amazon Fullfilment GmbH',
          from: '11.2015',
          to: '12.2015',
          description: 'Сотрудник отгрузки',
          specs: [],
          jobTasks: [],
          relevant: false,
        },
        {
          company: 'MG Systems GmbH',
          from: '06.2015',
          to: '07.2015',
          description: 'Медиадизайнер',
          specs: [{ name: 'Adobe Photoshop' }, { name: 'Adobe Premiere Pro' }],
          jobTasks: [
            { name: 'Съёмка продуктов' },
            { name: 'Фото- и видеомонтаж' },
            { name: 'Фотографирование продуктов' },
            { name: 'Цветокоррекция между реальными и экранными цветами' },
          ],
          relevant: false,
        },
        {
          company: 'MG Systems GmbH',
          from: '04.2015',
          to: '04.2015',
          description: 'Медиадизайнер',
          specs: [{ name: 'Adobe Photoshop' }, { name: 'Adobe Premiere Pro' }],
          jobTasks: [
            { name: 'Съёмка продуктов' },
            { name: 'Фото- и видеомонтаж' },
            { name: 'Фотографирование продуктов' },
            { name: 'Цветокоррекция между реальными и экранными цветами' },
          ],
          relevant: false,
        },
        {
          company: 'MG Systems GmbH',
          from: '02.2015',
          to: '02.2015',
          description: 'Медиадизайнер',
          specs: [{ name: 'Adobe Photoshop' }, { name: 'Adobe Premiere Pro' }],
          jobTasks: [
            { name: 'Съёмка продуктов' },
            { name: 'Фото- и видеомонтаж' },
            { name: 'Фотографирование продуктов' },
            { name: 'Цветокоррекция между реальными и экранными цветами' },
          ],
          relevant: false,
        },
        {
          company: 'Адвокатская контора Oberdorfer & Truhm',
          from: '07.2014',
          to: '07.2014',
          description: 'Веб-дизайн (практика)',
          specs: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }, { name: 'PHP' }],
          jobTasks: [{ name: 'Создание нового дизайна сайта' }],
          relevant: true,
        },
        {
          company: 'Satchkov Immobilien',
          from: '05.2013',
          to: '06.2013',
          description: 'Веб-дизайн (практика)',
          specs: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }, { name: 'PHP' }],
          jobTasks: [{ name: 'Адаптация веб-дизайна под CMS WordPress' }],
          relevant: true,
        },
        {
          company: 'Ассистент на съёмках «Demon in Me»',
          from: '10.2011',
          to: '10.2011',
          description: 'Доступно по ссылке https://youtu.be/uNFqRlF3RBc',
          specs: [],
          jobTasks: [{ name: 'Работа со светом и туманом' }, { name: 'Ассистирование на съёмках' }],
          relevant: false,
        },
        {
          company: 'mScb - Markus Schubert',
          from: '05.2009',
          to: '05.2009',
          description: 'Веб-дизайнер (практика)',
          specs: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
          jobTasks: [{ name: 'Дизайн веб-страниц' }, { name: 'Создание внутренних страниц компании' }],
          relevant: true,
        },
      ]),
      ausbildungItems: sortPraktika([
        {
          company: 'Joint Analytical Systems GmbH',
          from: '2017',
          to: '2020',
          description: 'Разработчик ПО (FIAE)',
        },
        {
          company: 'BSZ e.o. plauen',
          from: '2012',
          to: '2015',
          description: 'Графический ассистент',
        },
        {
          company: 'Mediadesign Hochschule Berlin',
          from: '2011',
          to: '2012',
          description: 'Кинооператор (не окончено)',
        },
      ]),
      schuleItems: sortPraktika([
        {
          company: 'FH Iserlohn',
          from: '2023',
          description: 'Бакалвариат, заочно',
        },
        {
          company: 'Berufskollege für Technik Moers',
          from: '2011',
          to: '2013',
          description: 'Среднее высшее образование (Fachabitur, вечерняя форма)',
        },
        {
          company: 'Dr.-Chr.-Hufeland-Mittelschule',
          from: '2007',
          to: '2011',
          description: 'Среднее образование',
        },
        {
          company: 'Lessing-Gymnasium',
          from: '2005',
          to: '2007',
          description: 'Среднее образование',
        },
        {
          company: 'Grundschule Am Wartberg',
          from: '2001',
          to: '2005',
          description: 'Начальная школа',
        },
        {
          company: 'Gymnasium Nr. 5',
          from: '1998',
          to: '2001',
          description: 'Начальная школа',
        },
      ]),
    },
  },
} as const

const localeFromStorage = (typeof window !== 'undefined' && localStorage.getItem('locale')) || 'de'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localeFromStorage,
  fallbackLocale: 'de',
  // createI18n expects mutable LocaleMessages; `as const` messages need a widen
  messages: { ...messages },
})


