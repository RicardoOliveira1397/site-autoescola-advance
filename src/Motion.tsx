import { siteUrl } from './paths';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, MotionConfig, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
const MotionPreference = createContext(false);
export const useQuietMotion = () => useContext(MotionPreference);
export function MotionProvider({ children }: {
    children: ReactNode;
}) {
    const systemReduced = useReducedMotion();
    const [paused, setPaused] = useState(false);
    const quiet = Boolean(systemReduced || paused);
    useEffect(() => {
        document.documentElement.dataset.motion = quiet ? 'off' : 'on';
        return () => { delete document.documentElement.dataset.motion; };
    }, [quiet]);
    return <MotionPreference.Provider value={quiet}>
    <MotionConfig reducedMotion={quiet ? 'always' : 'user'}>
      {children}
      {!systemReduced && <button className="motion-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Ativar animações' : 'Pausar animações'}>
        {paused ? <Play size={14}/> : <Pause size={14}/>}<span>{paused ? 'Ativar movimento' : 'Pausar movimento'}</span>
      </button>}
    </MotionConfig>
  </MotionPreference.Provider>;
}
export function Reveal({ children, className = '', delay = 0 }: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) {
    const quiet = useQuietMotion();
    return <motion.div className={className} initial={quiet ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} animate={quiet ? { opacity: 1, y: 0 } : undefined} viewport={{ once: true, amount: 0.12 }} transition={{ duration: quiet ? 0 : 0.65, delay: quiet ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>;
}
export function AnimatedWords({ text, delay = 0 }: {
    text: string;
    delay?: number;
}) {
    const quiet = useQuietMotion();
    return <span className="animated-words"><span className="sr-only">{text}</span><span aria-hidden="true">
    {text.split(' ').map((word, i) => <span className="word-mask" key={`${word}-${i}`}>
      <motion.span initial={quiet ? false : { y: '110%', rotate: 4 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: quiet ? 0 : 0.8, delay: quiet ? 0 : delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>
      {i < text.split(' ').length - 1 && ' '}
    </span>)}
  </span></span>;
}
export function Atmosphere() {
    return <div className="atmosphere" aria-hidden="true"><div className="glow glow-one"/><div className="glow glow-two"/>
    <svg className="orbit-lines" viewBox="0 0 700 700" fill="none"><circle cx="350" cy="350" r="310"/><circle cx="350" cy="350" r="250"/><circle cx="350" cy="350" r="190" strokeDasharray="10 15"/></svg>
    <span className="spark spark-one">✳</span><span className="spark spark-two">✳</span>
  </div>;
}
export function Marquee({ words = ['Seu ritmo.', 'Sua liberdade.', 'Sua próxima direção.'] }: {
    words?: string[];
}) {
    return <div className="marquee"><p className="sr-only">{words.join(' ')}</p><div className="marquee-track" aria-hidden="true">
    {[0, 1].map(copy => <div className="marquee-group" key={copy}>{words.map(word => <span key={word}>{word}<ArrowUpRight /></span>)}</div>)}
  </div></div>;
}
export function TiltCard({ children, className = '' }: {
    children: ReactNode;
    className?: string;
}) {
    const quiet = useQuietMotion();
    const rotateX = useSpring(0, { stiffness: 180, damping: 22 });
    const rotateY = useSpring(0, { stiffness: 180, damping: 22 });
    const reset = () => { rotateX.set(0); rotateY.set(0); };
    return <motion.div className={className} style={{ transformPerspective: 1000, rotateX: quiet ? 0 : rotateX, rotateY: quiet ? 0 : rotateY }} onPointerMove={event => {
            if (quiet || event.pointerType !== 'mouse')
                return;
            const rect = event.currentTarget.getBoundingClientRect();
            rotateX.set((0.5 - (event.clientY - rect.top) / rect.height) * 6);
            rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 6);
        }} onPointerLeave={reset} onBlur={reset}>{children}</motion.div>;
}
export function Journey() {
    const target = useRef<HTMLElement>(null);
    const quiet = useQuietMotion();
    const { scrollYProgress } = useScroll({ target, offset: ['start 85%', 'end 70%'] });
    const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 25 });
    const steps = [
        ['Vamos conversar', 'A gente entende seu momento e orienta a escolha da formação.'],
        ['Aprender. Praticar.', 'Teoria, prática e acompanhamento para ganhar confiança.'],
        ['Abrir caminhos', 'Preparação para seguir em frente com responsabilidade.'],
    ];
    return <section className="journey section" ref={target}>
    <Reveal><span className="eyebrow">DA VONTADE AO PRIMEIRO PASSO</span><h2>Todo caminho começa<br /><em>com um movimento.</em></h2></Reveal>
    <div className="journey-map">
      <svg viewBox="0 0 1100 130" preserveAspectRatio="none" className="journey-road" aria-hidden="true">
        <path d="M30 90 C210 90 185 25 370 25 S610 105 760 105 S940 25 1070 25" className="road-base"/>
        <motion.path d="M30 90 C210 90 185 25 370 25 S610 105 760 105 S940 25 1070 25" className="road-progress" style={{ pathLength: quiet ? 1 : progress }}/>
      </svg>
      <div className="journey-steps">{steps.map(([title, text], i) => <Reveal key={title} delay={i * 0.08}>
        <span className="journey-number">0{i + 1}<ArrowUpRight size={22}/></span><h3>{title}</h3><p>{text}</p>
      </Reveal>)}</div>
    </div>
    <a className="text-link" href={siteUrl("/primeira-habilitacao/")}>Entenda sua formação <ArrowUpRight size={20}/></a>
  </section>;
}
