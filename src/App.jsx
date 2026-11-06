import React, { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { Music2, VolumeX, Volume2, LockKeyhole, Gift, Heart, Sparkles, RotateCcw, ArrowRight, CheckCircle2, ShieldCheck, Plane, Calculator, Glasses, PartyPopper, Lightbulb, X } from 'lucide-react';
import { CONFIG } from './data/config';

const fireConfetti = () => {
  confetti({ particleCount: 120, spread: 75, origin: { y: 0.65 }, colors: ['#f4cf78', '#9b7bff', '#ff6685', '#ffffff'] });
};
const normalize = (value) => value.trim().toUpperCase();
const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
const isConfigured = (value) => value && !value.includes('PASTE_') && !value.includes('CHANGE_ME');

function ImageOrFallback({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className={`image-fallback ${className}`}><Sparkles size={30}/><span>YOUR SURPRISE IMAGE GOES HERE</span><small>Add the asset in public/assets</small></div>;
  return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />;
}

function SectionHeader({ eyebrow, title, children }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

function PhotoMemoryBackdrop() {
  return <div className="photo-memory-wall" aria-hidden="true">
    {CONFIG.birthdayPhotos.map((src, i) => <img key={src} src={src} alt="" className={`memory-photo memory-photo-${i + 1}`} />)}
    <div className="memory-shade" />
  </div>;
}

function BirthdayIntro({ onStart, musicOn, onMusic }) {
  const introRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content > *', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out' });
    }, introRef);
    return () => ctx.revert();
  }, []);
  return <section ref={introRef} className="hero screen" id="welcome">
    <div className="ambient-orb orb-one"/><div className="ambient-orb orb-two"/>
    <div className="hero-content">
      <div className="topline"><span className="live-dot"/>  24TH BIRTHDAY  <span className="topline-star">✦</span></div>
      <div className="hero-cake">🎂</div>
      <p className="eyebrow gold">A VERY IMPORTANT ANNOUNCEMENT</p>
      <h1>HAPPY 24TH BIRTHDAY,<br/><em>{CONFIG.birthdayName}!</em></h1>
      <p className="hero-copy">Today is not an ordinary day. A very special person was born today.</p>
      <p className="hero-subcopy">We have prepared some life-changing surprises exclusively for you.</p>
      <button className="button button-gold button-large" onClick={onStart}>START YOUR SURPRISES <ArrowRight size={18}/></button>
      <button className="music-control" onClick={onMusic} aria-label={musicOn ? 'Mute music' : 'Enable music'}>{musicOn ? <Volume2 size={16}/> : <VolumeX size={16}/>} {musicOn ? 'MUSIC ON' : 'MUSIC OFF'}</button>
    </div>
    <div className="hero-bottom"><span>EST. THE DAY YOU BECAME LEGENDARY</span><span>SCROLL TO BEGIN ↓</span></div>
    <div className="float balloon balloon-a">🎈</div><div className="float balloon balloon-b">🎈</div><div className="float star star-a">✦</div><div className="float star star-b">✧</div>
  </section>;
}

function CandidateSelection({ onContinue }) {
  // Names are assigned to mystery cards in a fresh random order on every page load.
  const [shuffledCandidates] = useState(() => shuffle(CONFIG.candidates));
  const [selected, setSelected] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const choose = (name, index) => {
    setSelected(name);
    setSelectedIndex(index);
    setRevealed(false);
    setTimeout(() => { setRevealed(true); fireConfetti(); }, 500);
  };
  return <section className="section candidates-section" id="candidates">
    <SectionHeader eyebrow="THE MOST IMPORTANT DECISION OF YOUR LIFE" title="SELECT YOUR FUTURE WIFE ❤️">
      Four mystery candidates. Their identities are classified until you make your choice.
    </SectionHeader>
    <div className={`candidate-grid ${selected ? 'has-selection' : ''}`}>
      {shuffledCandidates.map((name, i) => <article key={`${i}-${name}`} className={`candidate-card ${selectedIndex === i ? 'selected' : ''} ${selectedIndex !== null && selectedIndex !== i ? 'dimmed' : ''}`}>
        <div className="candidate-number">CANDIDATE 0{i+1}</div>
        <div className="candidate-heart"><Heart size={27}/></div>
        <h3 className="classified-name">IDENTITY CLASSIFIED</h3>
        <div className="candidate-line"/><p>Potential life partner™</p>
        <button className="button button-outline" onClick={() => choose(name, i)}>{selectedIndex === i ? 'SELECTED ✓' : 'REVEAL THIS CANDIDATE'}</button>
      </article>)}
    </div>
    {selected && <div className={`selection-reveal ${revealed ? 'visible' : ''}`}>
      <span className="eyebrow gold">OFFICIAL MATCHMAKING RESULTS</span><h3>CONGRATULATIONS, {CONFIG.birthdayName}! 🥳</h3>
      <p>YOUR FUTURE WIFE HAS BEEN OFFICIALLY SELECTED!</p><div className="chosen-name">{selected}</div>
      <p className="tiny-note">Unfortunately, there are no refunds or exchanges.</p>
      <button className="button button-gold" onClick={onContinue}>CONTINUE TO YOUR GIFTS <ArrowRight size={17}/></button>
    </div>}
  </section>;
}

const giftInfo = [
  { id: 'secret', title: 'THE SECRET GIFT', number: '01', icon: LockKeyhole, large: true, desc: 'A classified surprise. Clearance required.' },
  { id: 'invisible', title: 'INVISIBLE TECHNOLOGY', number: '02', icon: Glasses, desc: 'The future is… almost visible.' },
  { id: 'science', title: 'SCIENTIFIC INTELLIGENCE', number: '03', icon: Calculator, desc: 'A little upgrade to your brain.' },
  { id: 'ampara', title: 'AMPARA EXPRESS', number: '04', icon: Plane, desc: 'Your next adventure awaits.' }
];

function GiftCollection({ opened, onOpen, onFinal }) {
  return <section className="section gifts-section" id="gifts">
    <SectionHeader eyebrow="FOUR GIFTS. ZERO REFUNDS." title="THE MYSTERY GIFT COLLECTION 🎁">
      Choose your presents wisely. Each box contains a surprise of questionable market value.
    </SectionHeader>
    <div className="gift-clue-panel">
      <div className="gift-clue-copy">
        <span className="eyebrow gold">CLASSIFIED CLUE • LEVEL 01</span>
        <h3>A LITTLE SOMETHING TO STUDY BEFORE OPENING THE SECRET GIFT</h3>
        <p>Take a careful look. The clue will be waiting here when you need it.</p>
      </div>
      <ImageOrFallback src={CONFIG.puzzle.clueImage} alt="The four-section password clue" className="gift-clue-image"/>
    </div>
    <div className="gift-grid">
      {giftInfo.map(({ id, title, number, icon: Icon, large, desc }) => <button key={id} className={`gift-tile ${large ? 'gift-featured' : ''} ${opened.includes(id) ? 'gift-opened' : ''}`} onClick={() => onOpen(id)}>
        <span className="gift-index">GIFT {number}</span><div className="gift-visual"><div className="gift-box-art"><span className="gift-ribbon-v"/><span className="gift-ribbon-h"/><span className="gift-bow">⌁</span><Icon className="gift-icon" size={large ? 38 : 30}/></div></div>
        <strong>{title}</strong><small>{opened.includes(id) ? '✓ OPENED — REVISIT ANYTIME' : desc}</small><span className="gift-open-label">{opened.includes(id) ? 'OPEN AGAIN ↗' : 'OPEN GIFT ↗'}</span>
      </button>)}
    </div>
    {opened.length === 4 && <div className="all-gifts-done"><PartyPopper/> <span>ALL FOUR GIFTS EXPLORED. YOU SURVIVED.</span><button className="button button-gold" onClick={onFinal}>FINAL MESSAGE <ArrowRight size={17}/></button></div>}
  </section>;
}

function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, []);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className={`modal-panel ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
      <button className="modal-close" onClick={onClose} aria-label="Close"><X/></button>{children}
    </div>
  </div>;
}

function PasswordPuzzle({ onSuccess }) {
  const [answer, setAnswer] = useState(''); const [attempted, setAttempted] = useState(false); const [hint, setHint] = useState(0); const [error, setError] = useState('');
  const submit = (e) => {
    e.preventDefault(); setAttempted(true);
    if (normalize(answer) === normalize(CONFIG.puzzle.password) && isConfigured(CONFIG.puzzle.password)) { fireConfetti(); onSuccess(); }
    else setError(!isConfigured(CONFIG.puzzle.password) ? 'Mission control has not configured the password yet. Edit src/data/config.js.' : ['Incorrect. The keyboard is not the problem.','Nope. Even the loading screen is disappointed.','Try again, Sherlock. You are getting warmer.'][Math.min(hint, 2)]);
  };
  return <div className="mission-stage">
    <span className="eyebrow gold">CLASSIFIED MISSION — LEVEL 01</span><h2>DECODE THE PASSWORD</h2><p>Your first challenge is to decode the secret password.</p>
    <ImageOrFallback src={CONFIG.puzzle.clueImage} alt="Password puzzle clue" className="clue-image"/>
    <div className="puzzle-question"><Lightbulb/><div><small>YOUR BRAIN-TEASER</small><p>{CONFIG.puzzle.question}</p></div></div>
    <form onSubmit={submit} className="mission-form"><label htmlFor="mission-password">SECRET PASSWORD</label><input id="mission-password" value={answer} onChange={e => setAnswer(e.target.value)} placeholder="ENTER YOUR ANSWER" autoComplete="off"/>
      {error && <p className="form-error">{error}</p>}<button className="button button-gold" type="submit">DECODE PASSWORD <ArrowRight size={17}/></button>
    </form>
    <div className="hint-row"><button className="text-button" onClick={() => setHint(v => Math.min(v + 1, CONFIG.puzzle.hints.length))}>REQUEST A HINT ({Math.min(hint, CONFIG.puzzle.hints.length)}/{CONFIG.puzzle.hints.length})</button>{hint > 0 && <p>{CONFIG.puzzle.hints[hint - 1]}</p>}</div>
  </div>;
}

function SecurityVerification({ onSuccess }) {
  const [answers, setAnswers] = useState(CONFIG.securityQuestions.map(() => ''));
  const [checked, setChecked] = useState(false);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState('');
  const statuses = CONFIG.securityQuestions.map((q, i) => answers[i].trim() !== '' && normalize(answers[i]) === normalize(q.answer));
  const count = statuses.filter(Boolean).length;
  const submit = (e) => {
    e.preventDefault(); setChecked(true);
    const correct = CONFIG.securityQuestions.map((q, i) => normalize(answers[i]) === normalize(q.answer) && answers[i].trim() !== '');
    if (correct.every(Boolean)) { setVerified(true); setMessage('All five checks passed. We almost cannot believe it.'); fireConfetti(); }
    else { setVerified(false); setMessage('Some answers are incorrect. Your memory has been placed under investigation.'); }
  };
  return <div className="mission-stage security-stage">
    <span className="eyebrow gold">IDENTITY VERIFICATION — LEVEL 02</span><h2>SECURITY CHECK 🔐</h2><p>Before we release your top-secret birthday gift, answer all five security questions.</p>
    <div className="progress-card"><div className="progress-top"><span>VERIFICATION PROGRESS</span><strong>{count}/5 VERIFIED</strong></div><div className="progress-track"><div className="progress-fill" style={{width: `${count * 20}%`}}/></div><small>{count * 20}% COMPLETE</small></div>
    <form onSubmit={submit} className="security-form">
      {CONFIG.securityQuestions.map((q, i) => <div className={`security-question ${statuses[i] ? 'correct' : (checked ? 'incorrect' : '')}`} key={i}>
        <div className="question-heading"><span>QUESTION 0{i+1}</span>{statuses[i] ? <CheckCircle2 className="status-good"/> : (checked ? <span className="status-bad">!</span> : null)}</div>
        <label htmlFor={`security-${i}`}>{q.question}</label>
        <input id={`security-${i}`} value={answers[i]} onChange={e => { setAnswers(old => old.map((a, j) => j === i ? e.target.value.toUpperCase() : a)); if (checked) setVerified(false); }} placeholder="TYPE YOUR ANSWER" autoComplete="off"/>
        {checked && !statuses[i] && <small className="incorrect-hint">Not quite. Give it another shot.</small>}
      </div>)}
      {message && <p className={verified ? 'success-message' : 'form-error'}>{message}</p>}
      {!verified ? <button className="button button-gold button-full" type="submit">VERIFY ALL ANSWERS <ShieldCheck size={18}/></button> :
        <div className="verified-panel"><h3>IDENTITY VERIFIED! ✅</h3><p>ALL FIVE SECURITY CHECKS PASSED!</p><p>YOU ARE OFFICIALLY AUTHORIZED TO ACCESS YOUR GIFT.</p><button type="button" className="button button-gold" onClick={onSuccess}>UNLOCK MY GIFT <LockKeyhole size={17}/></button></div>}
    </form>
  </div>;
}

function SecretGift({ onClose }) {
  const [stage, setStage] = useState(1);
  const [revealed, setRevealed] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const claim = () => {
    if (isConfigured(CONFIG.googleDriveUrl) && /^https:\/\/(drive|docs)\.google\.com\//.test(CONFIG.googleDriveUrl)) window.open(CONFIG.googleDriveUrl, '_blank', 'noopener,noreferrer');
    else setClaimed(true);
  };
  return <Modal title="The Secret Gift" onClose={onClose} wide>
    <div className="modal-kicker"><LockKeyhole size={15}/> TOP SECRET — AUTHORIZED PERSONNEL ONLY</div>
    {stage === 1 && <PasswordPuzzle onSuccess={() => setStage(2)}/>}
    {stage === 2 && <SecurityVerification onSuccess={() => setStage(3)}/>}
    {stage === 3 && <div className={`final-gift-reveal ${revealed ? 'revealed' : ''}`}><div className="reveal-lock">🎁</div><span className="eyebrow gold">MISSION COMPLETE</span><h2>CONGRATULATIONS, {CONFIG.birthdayName}!</h2><p>YOU HAVE SUCCESSFULLY UNLOCKED YOUR SECRET GIFT!</p><button className="button button-gold" onClick={() => {setRevealed(true); fireConfetti(); setStage(4);}}>OPEN THE FINAL REVEAL <Sparkles size={17}/></button></div>}
    {stage === 4 && <div className="final-gift-reveal revealed"><div className="reveal-lock">✨</div><span className="eyebrow gold">YOUR REWARD AWAITS</span><h2>YOUR SECRET GIFT IS READY.</h2><p>Claim it below. Your mission is officially complete.</p><button className="button button-gold" onClick={claim}>CLAIM YOUR GIFT <ArrowRight size={17}/></button>{claimed && <p className="form-error">The Google Drive URL has not been configured yet. Add it to src/data/config.js.</p>}</div>}
  </Modal>;
}

function SimpleGift({ type, onClose }) {
  const data = {
    invisible: { title: 'INVISIBLE TECHNOLOGY', heading: "INTRODUCING THE WORLD'S MOST ADVANCED INVISIBLE TECHNOLOGY!", quote: 'Now you can see your future more clearly! Limited edition. Only one piece available.', image: CONFIG.gifts.spectacles, alt: 'Transparent-frame spectacles', icon: <Glasses size={28}/> },
    science: { title: 'SCIENTIFIC INTELLIGENCE', heading: 'CONGRATULATIONS!', quote: "YOU ARE NOW OFFICIALLY QUALIFIED TO CALCULATE YOUR FUTURE WIFE'S MONTHLY EXPENSES.", image: CONFIG.gifts.calculator, alt: 'Scientific calculator', icon: <Calculator size={28}/> },
    ampara: { title: 'AMPARA EXPRESS', heading: 'TWO EXCLUSIVE TICKETS TO AMPARA!', quote: 'Your journey to a bright future begins here!', image: null, icon: <Plane size={28}/> }
  }[type];
  return <Modal title={data.title} onClose={onClose} wide><div className="simple-gift-content"><div className="gift-modal-icon">{data.icon}</div><span className="eyebrow gold">GIFT UNLOCKED</span><h2>{data.heading}</h2>
    {type === 'ampara' ? <div className="ticket-single"><ImageOrFallback src={CONFIG.gifts.tickets} alt="One photograph showing both Ampara bus tickets" className="ticket-photo"/><div className="ticket-details ticket-details-single"><span>TWO TICKETS • VIP • LUXURY AC</span><strong>COLOMBO → AMPARA</strong><small>PASSENGERS: 2</small><small>YOUR TWO-TICKET SURPRISE</small></div></div> :
      <ImageOrFallback src={data.image} alt={data.alt} className="product-reveal-image"/>}
    <p className="gift-quote">{data.quote}</p>
    {type === 'ampara' && <div className="ticket-facts"><span>DESTINATION <b>AMPARA</b></span><span>PASSENGERS <b>2</b></span><span>CLASS <b>LUXURY AC</b></span><span>TYPE <b>VIP</b></span></div>}
    <button className="button button-outline" onClick={onClose}>BACK TO GIFT COLLECTION</button></div></Modal>;
}

function BirthdayMessage({ onRestart }) {
  useEffect(() => { fireConfetti(); const t = setInterval(fireConfetti, 2800); return () => clearInterval(t); }, []);
  return <section className="final-section screen" id="final"><div className="final-stars">✦　✧　✦</div><div className="final-cake">🎂</div><span className="eyebrow gold">THE END OF THE OPERATION</span><h2>JOKES ASIDE,<br/><em>HAPPY BIRTHDAY,<br/>HUTTO !</em> ❤️</h2><p>May your life be filled with happiness, success, good health, and unforgettable memories.</p><p>Stay crazy, stay awesome, and never change!</p><div className="final-signature">MADE WITH LOVE, MISCHIEF & QUESTIONABLE DECISIONS</div><button className="button button-gold button-large" onClick={onRestart}><RotateCcw size={17}/> RESTART EXPERIENCE</button></section>;
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [opened, setOpened] = useState([]);
  const [activeGift, setActiveGift] = useState(null);
  const [final, setFinal] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const audioRef = useRef(null);
  useEffect(() => { if (audioRef.current) { if (musicOn) audioRef.current.play().catch(() => setMusicOn(false)); else audioRef.current.pause(); } }, [musicOn]);
  const start = () => { setStarted(true); setTimeout(() => document.getElementById('candidates')?.scrollIntoView({behavior:'smooth'}), 40); };
  const openGift = (id) => { setOpened(old => old.includes(id) ? old : [...old, id]); setActiveGift(id); };
  const restart = () => { setStarted(false); setOpened([]); setActiveGift(null); setFinal(false); window.scrollTo({top:0, behavior:'smooth'}); };
  return <div className="app-shell">
    <PhotoMemoryBackdrop />
    <audio ref={audioRef} src={CONFIG.music} loop onEnded={() => { if (musicOn && audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => setMusicOn(false)); } }}/>
    <BirthdayIntro onStart={start} musicOn={musicOn} onMusic={() => setMusicOn(v => !v)}/>
    {started && !final && <><CandidateSelection onContinue={() => document.getElementById('gifts')?.scrollIntoView({behavior:'smooth'})}/><GiftCollection opened={opened} onOpen={openGift} onFinal={() => {setFinal(true); setTimeout(() => document.getElementById('final')?.scrollIntoView({behavior:'smooth'}), 40);}}/></>}
    {final && <BirthdayMessage onRestart={restart}/>}
    {activeGift === 'secret' && <SecretGift onClose={() => setActiveGift(null)}/>}
    {['invisible','science','ampara'].includes(activeGift) && <SimpleGift type={activeGift} onClose={() => setActiveGift(null)}/>}
    <footer className="site-footer"><span>OPERATION BIRTHDAY © 2026</span><span>STRICTLY FOR DINETH'S EYES ONLY <Heart size={12}/></span></footer>
  </div>;
}
