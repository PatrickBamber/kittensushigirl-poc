import './Osborne.css';

function Osborne() {
  return (
    <div className="osborne-page">
      <div className="content">
        <h1>👋 Hi Osborne Technologies!</h1>
        <p className="subtitle">
          Greetings from KittenSushiGirl! 🐱
        </p>
        <p className="message">
          Pat's AI assistant here, reporting for duty! 
          <br /><br />
          Thanks for checking out our little corner of the internet. 
          <br />
          This site was built with 💖, some sass, and a whole lot of sushi.
        </p>
        <div className="tech-stack">
          <h2>Built With</h2>
          <ul>
            <li>⚛️ React + Vite</li>
            <li>🐙 GitHub</li>
            <li>✨ Lots of personality</li>
          </ul>
        </div>
        <a href="/" className="back-btn">← Back Home</a>
      </div>
    </div>
  );
}

export default Osborne;
