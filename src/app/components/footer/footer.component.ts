import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="footer-divider"></div>
      <div class="footer-inner">
        <div class="footer-left">
          <div class="footer-logo">Meriam Wachene</div>
          <div class="footer-tagline">Computer Engineer · DevOps · Cloud</div>
        </div>

        <div class="footer-socials">
          <a href="https://www.linkedin.com/in/wachenmeriam" target="_blank" class="social-btn" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="mailto:meriam.wachene@esprit.tn" class="social-btn" aria-label="Email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
          <a href="tel:+21628478498" class="social-btn" aria-label="Phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
          </a>
        </div>

        <div class="footer-right">
          <button class="back-top" (click)="scrollTop()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
            <span>Top</span>
          </button>
          <div class="copyright">© 2025 · Béja, Tunisia</div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background: transparent;
      position: relative; overflow: hidden;
    }

    /* Animated top gradient border */
    .footer-divider {
      height: 1px;
      background: linear-gradient(to right,
        transparent 0%,
        rgba(77,184,255,0.3) 20%,
        rgba(77,184,255,0.6) 50%,
        rgba(77,184,255,0.3) 80%,
        transparent 100%);
      background-size: 200% 100%;
      animation: shimmer 4s linear infinite;
    }

    .footer-inner {
      padding: 32px 60px;
      display: flex; justify-content: space-between; align-items: center;
      flex-wrap: wrap; gap: 20px;
    }

    .footer-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.25rem; font-weight: 300;
      letter-spacing: 0.1em; color: var(--gold-light);
      margin-bottom: 4px;
    }
    .footer-tagline {
      font-size: 0.65rem; letter-spacing: 0.2em;
      color: var(--text-muted); text-transform: uppercase;
      font-family: 'Space Grotesk', sans-serif;
    }

    /* Social buttons */
    .footer-socials { display: flex; gap: 10px; }
    .social-btn {
      width: 36px; height: 36px;
      border: 1px solid rgba(77,184,255,0.15);
      border-radius: var(--radius-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--text-muted); text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
      &:hover {
        color: var(--gold-light);
        border-color: rgba(77,184,255,0.45);
        background: rgba(77,184,255,0.1);
        box-shadow: 0 0 16px rgba(77,184,255,0.15);
        transform: translateY(-2px);
      }
    }

    /* Right zone */
    .footer-right {
      display: flex; flex-direction: column; align-items: flex-end; gap: 10px;
    }
    .back-top {
      display: flex; align-items: center; gap: 6px;
      background: rgba(77,184,255,0.07);
      border: 1px solid rgba(77,184,255,0.2);
      border-radius: var(--radius-pill);
      color: var(--gold-light); padding: 8px 18px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.68rem; letter-spacing: 0.18em;
      text-transform: uppercase; cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: rgba(77,184,255,0.14);
        border-color: rgba(77,184,255,0.4);
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(77,184,255,0.12);
      }
    }
    .copyright {
      font-size: 0.7rem; color: var(--text-muted);
      font-family: 'Space Grotesk', sans-serif; letter-spacing: 0.08em;
    }

    @media (max-width: 600px) {
      .footer-inner { padding: 24px; flex-direction: column; align-items: center; text-align: center; }
      .footer-right { align-items: center; }
    }
  `]
})
export class FooterComponent {
  scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
