import Icon from '../components/Icon.jsx'

export default function LandingScreen({ onStart }) {
  return <main className="landing-page">
    <div className="landing-top">
      <div className="brand-mark large"><span className="brand-sun">✦</span><span>kido</span></div>
      <span className="landing-note">Sedikit lebih mandiri, setiap hari.</span>
    </div>

    <section className="landing-hero">
      <div className="hero-art" aria-hidden="true">
        <div className="sun-disc">✦</div>
        <div className="hero-orbit orbit-one"/>
        <div className="hero-orbit orbit-two"/>
        <div className="hero-kid">🧒🏻</div>
        <div className="hero-star star-one">✦</div>
        <div className="hero-star star-two">✦</div>
        <div className="hero-cloud">☁</div>
        <span className="hero-label">satu kemenangan kecil<br/>setiap hari</span>
      </div>

      <div className="hero-copy">
        <span className="eyebrow">UNTUK ANAK YANG SEDANG TUMBUH</span>
        <h1>Small habits.<br/><em>Big kids.</em></h1>
        <p>Bantu anak membangun kebiasaan baik dan kemandirian, satu langkah kecil setiap hari.</p>
        <button className="button button-primary button-full" onClick={onStart}>Mulai rutinitas <Icon name="arrow" /></button>
        <div className="privacy-note"><span>✦</span> Dibuat untuk keluarga, bukan untuk menambah waktu layar</div>
      </div>
    </section>

    <div className="landing-footer"><span>KEBIASAAN</span><i/><span>LATIHAN</span><i/><span>TUMBUH</span><i/><span>MANDIRI</span></div>
  </main>
}
