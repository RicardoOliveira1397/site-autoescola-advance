import { siteUrl } from './paths';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Header, Footer, UnitCards, wa } from './Site';
import { AnimatedWords, Atmosphere, Journey, Marquee, Reveal, TiltCard, useQuietMotion } from './Motion';
import { ArrowUpRight, ArrowDown, CarFront, Bike, Check, Plus } from 'lucide-react';
const choices = [
    { name: 'Carro', code: 'B', icon: CarFront, copy: 'Sua rotina, no seu tempo. Aprenda a dirigir carro com orientação em cada etapa.' },
    { name: 'Moto', code: 'A', icon: Bike, copy: 'Novos caminhos sobre duas rodas. Comece sua formação para pilotar com segurança.' },
    { name: 'Carro + moto', code: 'AB', icon: CarFront, copy: 'Mais possibilidades para ir além. Conheça a formação para carro e moto.' },
];
export default function Home() {
    const [selected, setSelected] = useState(0);
    const quiet = useQuietMotion();
    const choice = choices[selected];
    return <><Header /><main id="conteudo">
    <section className="hero">
      <Atmosphere />
      <div className="hero-top"><span className="eyebrow"><i className="live-dot"/> DESDE 1994, FORMANDO NOVOS CAMINHOS.</span><span className="hero-index">CAMPINAS, SP ↗</span></div>
      <div className="hero-main">
        <div className="hero-copy">
          <h1><AnimatedWords text="Sua vida."/><br />Sua <em><AnimatedWords text="próxima" delay={0.12}/></em><br /><AnimatedWords text="direção." delay={0.25}/><span className="hero-arrow" aria-hidden="true">↗</span></h1>
          <Reveal delay={0.25}><p>A liberdade de ir começa com a confiança para dirigir. Dê o primeiro passo com a Advance.</p>
            <a className="button yellow" href={siteUrl("#caminho")}>Quero minha habilitação <ArrowUpRight size={23}/></a>
            <span className="hero-note">Carro, moto ou os dois. O caminho é seu.</span></Reveal>
        </div>
        <motion.div className="hero-visual" initial={quiet ? false : { opacity: 0, scale: 0.92, rotate: 4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: quiet ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <img src={siteUrl("/driving.jpg")} alt="Aluna ao volante acompanhada por instrutor" fetchPriority="high"/><div className="photo-shade"/>
          <span className="photo-caption">NOVOS COMEÇOS.<br />NOVAS POSSIBILIDADES.</span>
          <div className="photo-stamp"><span>NO SEU</span><strong>ritmo.</strong><span>NA SUA DIREÇÃO.</span></div>
          <span className="photo-number">01 / O PRIMEIRO PASSO</span>
        </motion.div>
      </div>
      <div className="hero-bottom"><span>Mais confiança a cada quilômetro.</span><a href={siteUrl("#caminho")}>EXPLORE SEU CAMINHO <ArrowDown size={17}/></a><span className="track" aria-hidden="true">↗ ↗ ↗</span></div>
    </section>
    <Marquee />
    <section className="courses section" id="caminho">
      <Reveal className="section-heading"><span className="eyebrow">01 — QUAL É O SEU PRÓXIMO PASSO?</span><div className="heading-row"><h2>Escolha seu<br /><em>ponto de partida.</em></h2><p>Da primeira habilitação a uma nova categoria.<br />A gente acompanha você.</p></div></Reveal>
      <Reveal className="course-panel">
        <div className="category-list" aria-label="Categorias de habilitação">{choices.map((c, i) => <button aria-pressed={selected === i} className={selected === i ? 'category active' : 'category'} key={c.code} onClick={() => setSelected(i)}><c.icon size={30}/><span>{c.name}<small>CATEGORIA {c.code}</small></span><ArrowUpRight size={25}/></button>)}</div>
        <TiltCard className={`category-detail category-tone-${selected}`}>
          <span className="eyebrow">PRIMEIRA HABILITAÇÃO</span>
          <motion.div key={choice.code} className="category-watermark" aria-hidden="true" initial={quiet ? false : { y: 35, rotate: -10, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ duration: quiet ? 0 : 0.45 }}>{choice.code}</motion.div>
          <h3>O começo de<br />muitos destinos.</h3><p aria-live="polite">{choice.copy}</p><a className="text-link" href={siteUrl("/primeira-habilitacao/")}>Conhecer a categoria {choice.code} <ArrowUpRight size={20}/></a>
        </TiltCard>
      </Reveal>
      <Reveal className="other-services"><span>Já tem habilitação?</span>{[['Adição de categoria', '/adicao-de-cnh/'], ['Reciclagem de CNH', '/reciclagem-cnh/'], ['Simulador virtual', '/simulador-virtual/']].map(([title, href]) => <a key={href} href={siteUrl(href)}>{title}<Plus size={18}/></a>)}</Reveal>
    </section>
    <section id="advance" className="about section">
      <Reveal className="about-photo"><img src={siteUrl("/unidade.jpg")} alt="Fachada de uma unidade da Autoescola Advance" loading="lazy"/><span>DE CAMPINAS. PARA OS SEUS CAMINHOS.</span><b className="photo-star" aria-hidden="true">✳</b></Reveal>
      <Reveal className="about-copy"><span className="eyebrow">02 — MUITO ALÉM DA CNH</span><h2>A confiança<br />vem com<br /><em>a experiência.</em></h2><p>Desde 1994, a Advance faz parte da história de quem aprende a dirigir em Campinas. Uma formação que começa na primeira aula e acompanha você para além do volante.</p><div className="about-points">{['Formação teórica e prática', 'Estrutura com simulador virtual', 'Unidades em Campinas'].map(t => <span key={t}><Check size={18}/>{t}</span>)}</div><a href={siteUrl("/quem-somos/")} className="text-link">Conheça a história da Advance <ArrowUpRight size={20}/></a></Reveal>
    </section>
    <Journey />
    <section className="locations section" id="unidades">
      <Reveal className="section-heading"><span className="eyebrow">03 — A GENTE ESTÁ PERTO</span><div className="heading-row"><h2>Seu caminho<br /><em>começa aqui.</em></h2><p>Encontre sua unidade em Campinas<br />e venha conhecer a Advance.</p></div></Reveal><UnitCards />
    </section>
    <section className="home-gallery section"><Reveal className="heading-row"><h2>Por dentro<br /><em>da Advance.</em></h2><a className="text-link" href={siteUrl("/fotos/")}>Conheça nossa estrutura <ArrowUpRight /></a></Reveal>
      <div className="home-gallery-grid">{['/gallery/IMG_0089.jpg', '/simulador.jpg', '/gallery/IMG_9705.jpg'].map((src, i) => <Reveal key={src} delay={i * 0.08}><a href={siteUrl("/fotos/")}><img src={siteUrl(src)} alt={['Unidade da Advance em Barão Geraldo', 'Simulador de direção', 'Veículo para formação profissional'][i]} loading="lazy"/><span>0{i + 1}<ArrowUpRight size={24}/></span></a></Reveal>)}</div>
    </section>
    <section className="final-cta"><Atmosphere /><span className="eyebrow">O PRÓXIMO PASSO É SEU.</span><a href={siteUrl(wa('Olá! Quero começar minha habilitação com a Advance.'))} target="_blank" rel="noreferrer">Vamos<br /><em>nessa?</em><ArrowUpRight aria-hidden="true"/></a><p>Fale com a nossa equipe e encontre seu ponto de partida.</p></section>
  </main><Footer /></>;
}
