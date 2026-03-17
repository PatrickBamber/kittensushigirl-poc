import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? '#ff6eb4' : '#00e5ff',
      alpha: Math.random() * 0.6 + 0.2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="home-canvas" />
}

const traits = [
  { emoji: '🎮', label: 'Gamer', desc: 'Absolutely demolished at pac-man. Allegedly.' },
  { emoji: '🍣', label: 'Sushi Connoisseur', desc: 'Will judge your salmon roll order. Harshly.' },
  { emoji: '🐱', label: 'Cat Energy', desc: 'Naps hard, plays harder, knocks things off tables.' },
  { emoji: '💅', label: 'Main Character', desc: 'Every room I enter becomes about me. Deal with it.' },
  { emoji: '✨', label: 'Chaotic Good', desc: 'My plans are more vibes than strategy.' },
  { emoji: '🎀', label: 'Aesthetics Only', desc: 'If it\'s not cute, it\'s not happening.' },
]

export default function Home() {
  return (
    <div className="home">
      <AnimatedBackground />
      <div className="home-content">
        <div className="hero-section">
          <div className="hero-avatar">🐱</div>
          <h1 className="hero-title">
            KittenSushiGirl
          </h1>
          <p className="hero-tagline">
            cute. chaotic. completely unqualified to give life advice.
          </p>
          <p className="hero-subtitle">
            welcome to my little corner of the internet where i am,
            inevitably, the main character.
          </p>
          <div className="hero-cta">
            <Link to="/pat" className="cta-btn cta-primary">
              Meet Pat →
            </Link>
            <Link to="/game" className="cta-btn cta-secondary">
              Play a game 🎮
            </Link>
            <a 
              href="https://github.com/PatrickBamber/kittensushigirl-poc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-btn cta-tertiary"
            >
              Hello Developers! 👋
            </a>
          </div>
        </div>

        <div className="traits-section">
          <h2 className="traits-title">who am i, exactly?</h2>
          <p className="traits-subtitle">glad you asked. i have a lot of opinions about myself.</p>
          <div className="traits-grid">
            {traits.map((t) => (
              <div key={t.label} className="trait-card">
                <span className="trait-emoji">{t.emoji}</span>
                <h3 className="trait-label">{t.label}</h3>
                <p className="trait-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <p className="footer-text">
            made with <span className="heart">♥</span> and an unhealthy amount of sushi
          </p>
        </div>
      </div>
    </div>
  )
}
