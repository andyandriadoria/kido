import Icon from '../components/Icon.jsx'
import KidoLogo from '../components/KidoLogo.jsx'
import KidoKidsIllustration from '../components/KidoKidsIllustration.jsx'
export default function LandingScreen({ onStart }) {
  return <main className="landing-page">
    <div className="landing-top"><KidoLogo large /><span className="landing-note">A little more independent, every day.</span></div>
    <section className="landing-hero">
      <div className="hero-art"><div className="sun-disc">✦</div><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><KidoKidsIllustration /><div className="hero-star star-one">✦</div><div className="hero-star star-two">✦</div><span className="hero-label">one small win<br/>at a time</span></div>
      <div className="hero-copy"><span className="eyebrow">For growing-up days</span><h1>Small habits.<br/><em>Big kids.</em></h1><p>Help your child build everyday habits and the confidence to do more on their own.</p>
      <button className="button button-primary button-full" onClick={onStart}>Get Started Free <Icon name="arrow" /></button>
      <div className="landing-benefits"><span><i>✓</i> Easy daily routines</span><span><i>✓</i> Progress you can celebrate</span><span><i>✓</i> More independence over time</span></div>
      <div className="privacy-note"><span>✦</span> Made for families, one day at a time</div></div>
    </section>
    <div className="landing-footer"><span>HABITS</span><i/><span>PRACTICE</span><i/><span>PROGRESS</span><i/><span>INDEPENDENCE</span><i/><span>GRADUATION</span></div>
  </main>
}
