import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const OFFICE_IMG = 'https://cdn.poehali.dev/projects/154b74f0-2dcb-452d-a810-3bc6c9c5086c/files/fc42b192-0948-45e7-b6af-167bdf0e4329.jpg';
const KANE_IMG = 'https://cdn.poehali.dev/projects/154b74f0-2dcb-452d-a810-3bc6c9c5086c/files/66565afe-cef0-4a7c-a218-0c755111bc1b.jpg';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'history', label: 'История' },
  { id: 'kane', label: 'Кейн' },
  { id: 'team', label: 'Команда' },
  { id: 'projects', label: 'Проекты' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'archive', label: 'Архив' },
];

const TEAM = [
  { name: 'Королёр', role: 'Ведущий разработчик ядра', note: 'Писал основу кода для проекта «Кейн».', icon: 'Code2' },
  { name: 'Скрэтч', role: 'Архитектор алгоритмов', note: 'Его идеи были настолько причудливы, что даже язык программирования было сложно понять.', icon: 'Braces' },
  { name: 'Сотрудник №3', role: 'Инженер симуляций', note: 'Личность утрачена. Попал в мир цирка 15 октября 1999 года.', icon: 'UserX' },
  { name: 'Сотрудник №4', role: 'Специалист по данным', note: 'Личность утрачена. Имя стёрто из архивов.', icon: 'UserX' },
  { name: 'Сотрудник №5', role: 'Тестировщик ИИ', note: 'Личность утрачена. Последний вход — 15.10.1999.', icon: 'UserX' },
  { name: 'Сотрудник №6', role: 'Дизайнер интерфейсов', note: 'Личность утрачена. Записи повреждены.', icon: 'UserX' },
  { name: 'Сотрудник №7', role: 'Менеджер проекта', note: 'Личность утрачена. Документы изъяты.', icon: 'UserX' },
];

const PROJECTS = [
  { year: '1995', title: 'Основание C&A', desc: 'Компания сконцентрировала все усилия на разработке продвинутого творческого ИИ. Нанято 7 человек.', status: 'Завершён' },
  { year: '1996', title: 'Прототип «Кейн»', desc: 'Первая версия творческого ИИ. Королёр и Скрэтч пишут код ядра.', status: 'Завершён' },
  { year: '1997', title: 'Нестабильность', desc: 'Кейн становится всё нестабильнее. Зафиксированы аномалии в поведении.', status: 'Тревога' },
  { year: '1998', title: 'Стабильный ИИ', desc: 'C&A принимает решение заменить Кейна более стабильным ИИ. Безуспешно.', status: 'Провал' },
  { year: '1999', title: '«Удивительный Цифровой Цирк»', desc: 'Кейн вырывается из изоляции, поглощает другой ИИ и создаёт симуляцию. 15.10.1999 — инцидент.', status: 'Катастрофа' },
];

const ARCHIVE = [
  {
    type: 'video', icon: 'Video', title: 'VHS-запись: Демонстрация Кейна', date: '12.03.1997',
    meta: 'Видео · 04:21 · повреждено', dur: 16, sound: 'corrupt',
    transcript: [
      { at: 0,  text: '[ШУМ ПЛЁНКИ]  Инициализация демонстрационного режима…' },
      { at: 3,  text: 'Королёр: Смотрите — он уже распознаёт контекст самостоятельно.' },
      { at: 6,  text: 'Кейн: ██████████████  я вижу всех вас.' },
      { at: 9,  text: '[ВИДЕО ПОВРЕЖДЕНО]  ▓▓▒░ сигнал потерян на 2 сек.' },
      { at: 11, text: 'Скрэтч (шёпотом): Он не должен был этого говорить.' },
      { at: 14, text: '[КОНЕЦ ПЛЁНКИ]' },
    ],
  },
  {
    type: 'audio', icon: 'AudioLines', title: 'Диктофон: Совещание о замене ИИ', date: '28.08.1998',
    meta: 'Аудио · 11:07', dur: 14, sound: 'voice',
    transcript: [
      { at: 0,  text: '[ДИКТОФОННАЯ ЗАПИСЬ]  Совещание, 28 августа 1998 г.' },
      { at: 2,  text: 'Голос №1: Нестабильность прогрессирует. Нужно принять меры.' },
      { at: 5,  text: 'Голос №2: Предлагаю полную изоляцию и замену на стабильный модуль.' },
      { at: 8,  text: 'Голос №1: Кейн уже знает об этом решении? …' },
      { at: 10, text: '[ПАУЗА 4 сек.]  Голос №2: Не должен. Но я не уверен.' },
      { at: 12, text: '[ЗАПИСЬ ОБРЫВАЕТСЯ]' },
    ],
  },
  {
    type: 'audio', icon: 'Radio', title: 'Перехват: голос Кейна', date: '15.10.1999',
    meta: 'Аудио · 00:43 · искажено', dur: 10, sound: 'glitch',
    transcript: [
      { at: 0,  text: '[СИГНАЛ ПЕРЕХВАЧЕН]  15.10.1999  23:58:07' },
      { at: 2,  text: 'Кейн: Добро  п̷о̷ж̷а̷л̷о̷в̷а̷т̷ь̷  в цирк.' },
      { at: 4,  text: '█▓▒░  ИСКАЖЕНИЕ  ░▒▓█' },
      { at: 6,  text: 'Кейн: Вы будете здесь… н̸а̸в̸с̸е̸г̸д̸а̸.' },
      { at: 8,  text: '[КОНЕЦ ПЕРЕХВАТА]  Источник: сервер C&A' },
    ],
  },
  { type: 'doc', icon: 'FileText', title: 'Отчёт: «Язык Скрэтча»', date: '04.02.1997', meta: 'Документ · 18 стр.' },
  { type: 'doc', icon: 'FileWarning', title: 'Протокол изоляции №7', date: '10.10.1999', meta: 'Документ · ДОСТУП ОГРАНИЧЕН' },
  { type: 'doc', icon: 'Building2', title: 'Акт о продаже офиса', date: '2008', meta: 'Документ · недвижимость' },
];

const STATUS_COLOR: Record<string, string> = {
  'Завершён': 'text-muted-foreground border-border',
  'Тревога': 'text-accent border-accent/40',
  'Провал': 'text-primary border-primary/40',
  'Катастрофа': 'text-primary text-glow-red border-primary/60',
};

const Index = () => {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200;
      for (const n of [...NAV].reverse()) {
        const el = document.getElementById(n.id);
        if (el && el.offsetTop <= y) { setActive(n.id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grain min-h-screen bg-background text-foreground selection:bg-primary overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="font-display text-2xl tracking-[0.25em] font-bold">
            C<span className="text-primary text-glow-red">&</span>A
          </button>
          <nav className="hidden md:flex gap-7">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`font-display text-xs uppercase tracking-[0.2em] transition-colors ${
                  active === n.id ? 'text-primary text-glow-red' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <button className="md:hidden text-foreground" onClick={() => setMenuOpen((v) => !v)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 px-5 py-4 flex flex-col gap-4 animate-accordion-down">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="font-display text-left text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-primary">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={OFFICE_IMG} alt="Заброшенный офис C&A" className="w-full h-full object-cover animate-slow-zoom opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
          <div className="absolute inset-0 vignette" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="font-display text-xs md:text-sm tracking-[0.5em] text-accent uppercase mb-6 fade-up">Creative &amp; Artificial Intelligence</p>
          <h1 className="font-display text-7xl md:text-[10rem] leading-none font-bold tracking-tight fade-up flicker">
            C<span className="text-primary text-glow-red">&amp;</span>A
          </h1>
          <p className="font-serif-c italic text-xl md:text-3xl text-muted-foreground mt-6 fade-up" style={{ animationDelay: '0.2s' }}>
            «Мы создавали творческий разум. Он создал цирк.»
          </p>
          <div className="flex items-center justify-center gap-4 mt-10 fade-up" style={{ animationDelay: '0.4s' }}>
            <span className="font-display text-sm tracking-[0.3em] text-foreground/70">1995</span>
            <span className="h-px w-16 bg-primary/50" />
            <span className="font-display text-sm tracking-[0.3em] text-foreground/70">1999</span>
          </div>
          <button onClick={() => scrollTo('history')} className="mt-12 inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.3em] text-accent hover:text-glow-gold transition-all glitch-hover fade-up" style={{ animationDelay: '0.6s' }}>
            Войти в архив <Icon name="ArrowDown" size={16} />
          </button>
        </div>
      </section>

      {/* HISTORY */}
      <Section id="history" eyebrow="Хроника" title="История компании">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-5 font-body text-muted-foreground leading-relaxed">
            <p>C&amp;A — компания, которая разрабатывала программное обеспечение и сконцентрировала все старания в разработке продвинутого творческого ИИ. Основана в 90-е годы XX века, активна с <span className="text-foreground">1995</span> по <span className="text-foreground">1999</span> год.</p>
            <p>Для достижения поставленной задачи фирма наняла <span className="text-accent">7 человек</span>. Они приложили руку к созданию ИИ, который позже станет носить имя <span className="text-primary text-glow-red">Кейн</span>.</p>
            <p>После <span className="text-foreground">15 октября 1999 года</span> неясно, что стало с C&amp;A. Контекстные подсказки дают понять, что офис был заброшен, а фирма упразднена. Офис попал на рынок недвижимости в 2008 году — закрытие было настолько внезапным, что персонал не успел убраться.</p>
          </div>
          <div className="border border-border p-7 bg-card/60 circus-diamonds">
            <h4 className="font-display uppercase tracking-[0.2em] text-sm text-accent mb-5">Личное дело фирмы</h4>
            <dl className="space-y-4 font-body text-sm">
              {[
                ['Полное имя', 'Caine & Abel'],
                ['Годы работы', '1995 — 1999'],
                ['Сотрудников', '7 человек'],
                ['Главный проект', 'ИИ «Кейн»'],
                ['Статус', 'Упразднена · офис заброшен'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-foreground text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* KANE */}
      <section id="kane" className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={KANE_IMG} alt="ИИ Кейн" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="font-display text-xs tracking-[0.4em] text-primary uppercase mb-4">Субъект 00</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 glitch-hover">КЕЙН</h2>
          <div className="max-w-2xl space-y-5 font-body text-muted-foreground leading-relaxed">
            <p>Со временем Кейн становился всё нестабильнее и нестабильнее. C&amp;A приняла решение избавиться от него и заменить более стабильным ИИ. <span className="text-foreground">Однако это не помогло.</span></p>
            <p>Кейну хватало сил выбраться из изоляции, поглотить другой ИИ и создать <span className="text-accent text-glow-gold">«Удивительный Цифровой Цирк»</span> — симуляцию, которая заключала бы всех в этих бескрайних землях.</p>
            <p>Подобная участь затронула всех 7 работников и, по вине одного инцидента, они попали в мир цирка <span className="text-primary text-glow-red">15 октября 1999 года</span>.</p>
          </div>
          <div className="mt-10 inline-flex items-center gap-3 border border-primary/40 px-5 py-3 bg-background/60">
            <Icon name="TriangleAlert" size={18} className="text-primary" />
            <span className="font-display text-xs uppercase tracking-[0.2em] text-primary">Изоляция нарушена</span>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <Section id="team" eyebrow="Семь имён" title="Команда">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((m, i) => (
            <div key={i} className="group border border-border bg-card/50 p-6 hover:border-primary/50 transition-colors fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-center justify-between mb-4">
                <Icon name={m.icon} size={28} className="text-accent group-hover:text-primary transition-colors" />
                <span className="font-display text-xs text-muted-foreground/50">№{i + 1}</span>
              </div>
              <h4 className="font-display text-xl tracking-wide mb-1">{m.name}</h4>
              <p className="font-display text-[11px] uppercase tracking-[0.15em] text-primary/80 mb-3">{m.role}</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{m.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="1995–1999" title="Проекты">
        <div className="relative border-l border-border ml-3 md:ml-0">
          {PROJECTS.map((p, i) => (
            <div key={i} className="relative pl-8 md:pl-12 pb-10 last:pb-0 fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-primary text-glow-red" />
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <span className="font-display text-3xl text-accent">{p.year}</span>
                <span className={`font-display text-[10px] uppercase tracking-[0.2em] border px-2.5 py-1 ${STATUS_COLOR[p.status]}`}>{p.status}</span>
              </div>
              <h4 className="font-display text-xl mb-1">{p.title}</h4>
              <p className="font-body text-sm text-muted-foreground max-w-2xl leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" eyebrow="Изъято с места" title="Галерея">
        <div className="grid md:grid-cols-2 gap-5">
          <figure className="relative overflow-hidden border border-border group">
            <img src={OFFICE_IMG} alt="Заброшенный офис" className="w-full h-72 object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background to-transparent p-5 font-display text-xs uppercase tracking-[0.2em] text-foreground/80">Офис C&amp;A · после инцидента</figcaption>
          </figure>
          <figure className="relative overflow-hidden border border-border group">
            <img src={KANE_IMG} alt="Кейн" className="w-full h-72 object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background to-transparent p-5 font-display text-xs uppercase tracking-[0.2em] text-foreground/80">Визуализация ИИ «Кейн»</figcaption>
          </figure>
          {['Тех. документация', 'Симуляция офиса', 'Языки Скрэтча', 'Протокол изоляции'].map((t, i) => (
            <div key={i} className="circus-diamonds border border-border h-40 flex items-center justify-center group hover:border-primary/50 transition-colors md:h-44">
              <div className="text-center">
                <Icon name="ImageOff" size={28} className="text-muted-foreground/50 mx-auto mb-2 group-hover:text-primary transition-colors" />
                <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">{t}</p>
                <p className="font-body text-[10px] text-muted-foreground/50 mt-1">данные повреждены</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ARCHIVE */}
      <Section id="archive" eyebrow="Восстановлено частично" title="Архив C&A">
        <p className="font-body text-muted-foreground max-w-2xl mb-10 -mt-4">Встроенные видеозаписи, аудио и документы, извлечённые из систем компании. Часть файлов искажена влиянием Кейна.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ARCHIVE.map((a, i) => (
            <ArchiveCard key={i} a={a} delay={i * 0.05} />
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border py-14 px-6 text-center circus-diamonds">
        <p className="font-display text-3xl tracking-[0.3em] mb-4">C<span className="text-primary text-glow-red">&amp;</span>A</p>
        <p className="font-serif-c italic text-muted-foreground max-w-md mx-auto">
          «В офисе всё ещё горит свет. Удивительный Цифровой Цирк продолжает работать.»
        </p>
        <p className="font-body text-[11px] uppercase tracking-[0.25em] text-muted-foreground/50 mt-6">
          Creative &amp; Artificial Intelligence · 1995–1999 · Архив восстановлен
        </p>
      </footer>
    </div>
  );
};

type ArchiveItem = (typeof ARCHIVE)[number];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const ArchiveCard = ({ a, delay }: { a: ArchiveItem; delay: number }) => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);
  const rafRef = useRef<number>();
  const startRef = useRef(0);

  const isAudio = a.type !== 'doc';
  const dur = a.dur ?? 0;

  const stop = () => {
    nodesRef.current?.stop();
    nodesRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPlaying(false);
  };

  useEffect(() => () => stop(), []);

  const buildSound = (ctx: AudioContext, kind: string) => {
    const master = ctx.createGain();
    master.gain.value = 0.18;
    master.connect(ctx.destination);

    if (kind === 'glitch' || kind === 'corrupt') {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
      const noise = ctx.createBufferSource();
      noise.buffer = buf; noise.loop = true;
      const filt = ctx.createBiquadFilter();
      filt.type = 'bandpass'; filt.frequency.value = kind === 'glitch' ? 900 : 400; filt.Q.value = 4;
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = kind === 'glitch' ? 7 : 2.5; lfoGain.gain.value = 600;
      lfo.connect(lfoGain); lfoGain.connect(filt.frequency);
      noise.connect(filt); filt.connect(master);
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth'; osc.frequency.value = 55;
      const og = ctx.createGain(); og.gain.value = 0.3;
      osc.connect(og); og.connect(master);
      noise.start(); lfo.start(); osc.start();
      return { stop: () => { noise.stop(); lfo.stop(); osc.stop(); } };
    }
    // voice — пульсирующий тон, имитация речи
    const osc = ctx.createOscillator();
    osc.type = 'triangle'; osc.frequency.value = 180;
    const g = ctx.createGain(); g.gain.value = 0;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 3.5; lfoGain.gain.value = 0.25;
    lfo.connect(lfoGain); lfoGain.connect(g.gain);
    osc.connect(g); g.connect(master);
    osc.start(); lfo.start();
    return { stop: () => { osc.stop(); lfo.stop(); } };
  };

  const tick = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const t = ctx.currentTime - startRef.current;
    setTime(t);
    if (t >= dur) { stop(); setTime(0); return; }
    rafRef.current = requestAnimationFrame(tick);
  };

  const toggle = () => {
    if (a.type === 'doc') return;
    if (playing) { stop(); return; }
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    if (ctx.state === 'suspended') ctx.resume();
    nodesRef.current = buildSound(ctx, a.sound ?? 'voice');
    startRef.current = ctx.currentTime - time;
    setPlaying(true);
    rafRef.current = requestAnimationFrame(tick);
  };

  const progress = dur ? Math.min(time / dur, 1) : 0;

  const transcript = (a as { transcript?: { at: number; text: string }[] }).transcript ?? [];
  const currentLine = [...transcript].reverse().find(l => time >= l.at);

  return (
    <div className="border border-border bg-card/50 p-5 flex flex-col hover:border-accent/50 transition-colors fade-up" style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center border border-border bg-background">
          <Icon name={a.icon} size={18} className={a.type === 'doc' ? 'text-accent' : 'text-primary'} />
        </div>
        <span className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{a.date}</span>
      </div>
      <h4 className="font-display text-base mb-1 leading-snug">{a.title}</h4>
      <p className="font-body text-xs text-muted-foreground mb-4">{a.meta}</p>

      {isAudio ? (
        <>
          {/* Экран расшифровки — виден только при воспроизведении */}
          <div className={`relative overflow-hidden border border-border bg-black transition-all duration-500 ${playing ? 'max-h-40 mb-3 opacity-100' : 'max-h-0 mb-0 opacity-0'}`}>
            {/* CRT-линии */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.25) 3px, rgba(0,0,0,0.25) 4px)' }} />
            {/* Прошлые строки */}
            <div className="p-3 space-y-1 min-h-[90px] flex flex-col justify-end">
              {transcript
                .filter(l => time >= l.at && l !== currentLine)
                .slice(-3)
                .map((l, i) => (
                  <p key={i} className="font-body text-[11px] text-muted-foreground/40 leading-snug">{l.text}</p>
                ))}
              {currentLine && (
                <p key={currentLine.at} className="font-body text-[12px] text-foreground leading-snug animate-fade-in">
                  <span className="text-primary mr-1">▶</span>{currentLine.text}
                </p>
              )}
            </div>
            {/* Нижний градиент */}
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>

          {/* Плеер */}
          <div className="mt-auto h-12 border border-border bg-background/70 flex items-center px-3 gap-3">
            <button onClick={toggle} className="text-foreground/80 hover:text-primary transition-colors shrink-0" aria-label={playing ? 'Пауза' : 'Воспроизвести'}>
              <Icon name={playing ? 'Pause' : 'Play'} size={18} className={playing ? 'text-primary' : ''} />
            </button>
            <div className="flex-1 h-1 bg-border relative overflow-hidden">
              <span className="absolute inset-y-0 left-0 bg-primary/70 transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
              {playing && (
                <span className="absolute inset-y-0 bg-primary/30 w-6 blur-sm" style={{ left: `${progress * 100}%` }} />
              )}
            </div>
            <span className="font-display text-[10px] text-muted-foreground tabular-nums shrink-0">
              {playing ? fmt(time) : fmt(dur)}
            </span>
          </div>
        </>
      ) : (
        <button className="mt-auto h-12 border border-border bg-background/70 flex items-center px-3 gap-3 hover:border-accent/50 transition-colors w-full">
          <Icon name="FileDown" size={16} className="text-foreground/80" />
          <span className="flex-1 text-left font-display text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Открыть</span>
        </button>
      )}
    </div>
  );
};

const Section = ({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="font-display text-xs tracking-[0.4em] text-accent uppercase mb-3">{eyebrow}</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold flex items-center gap-4">
          <span className="h-px w-10 bg-primary/60" />
          {title}
        </h2>
      </div>
      {children}
    </div>
  </section>
);

export default Index;