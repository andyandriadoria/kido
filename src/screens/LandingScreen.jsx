import Icon from '../components/Icon.jsx'
export default function LandingScreen({ onStart }) {
  return <main className="landing-page">
    <div className="landing-top"><div className="brand-mark large"><span className="brand-sun">✦</span><span>kido</span></div><span className="landing-note">A little more independent, every day.</span></div>
    <section className="landing-hero">
      <div className="hero-art" aria-hidden="true"><div className="sun-disc">✦</div><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-kid">🧒🏻</div><div className="hero-star star-one">✦</div><div className="hero-star star-two">✦</div><div className="hero-cloud">☁</div><span className="hero-label">one small win<br/>at a time</span></div>
      <div className="hero-copy"><span className="eyebrow">For growing-up days</span><h1>Small habits.<br/><em>Big kids.</em></h1><p>Help your child build everyday habits and the confidence to do more on their own.</p>
      <button className="button button-primary button-full" onClick={onStart}>Build our routine <Icon name="arrow" /></button>
      <div className="privacy-note"><span>✦</span> Made for families, one day at a time</div></div>
    </section>
    <div className="landing-footer"><span>HABITS</span><i/><span>PRACTICE</span><i/><span>GROW</span><i/><span>INDEPENDENCE</span></div>
  </main>
}
