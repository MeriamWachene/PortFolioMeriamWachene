import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero">
      <div class="hero-bg"></div>
      <div class="hero-grid-lines"></div>
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>

      <!-- Photo side -->
      <div class="hero-image-side">
        <div class="hero-photo-frame">
          <!-- Rotating glow ring -->
          <div class="glow-ring"></div>
          <div class="glow-ring glow-ring-2"></div>
          <img class="hero-photo" src="assets/photo.png" alt="Meriam Wachene"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="photo-placeholder">
            <span>M.W.</span>
          </div>
          <div class="hero-photo-glow"></div>
          <div class="hero-badge">
            <div class="badge-num">1+</div>
            <div class="badge-label">Years of<br>Experience</div>
          </div>
          <!-- Floating decorations -->
          <div class="float-tag float-tag-1">
            <span class="ft-dot"></span> DevOps Engineer
          </div>
          <div class="float-tag float-tag-2">
            <span class="ft-dot"></span> Cloud Architect
          </div>
        </div>
      </div>

      <!-- Content side -->
      <div class="hero-content">
        <div class="hero-tag">Computer Engineer</div>
        <h1>Meriam<br><em>Wachene</em></h1>
        <div class="hero-role">
          <span class="role-static">Expert in </span>
          <span class="role-typed">{{ displayedRole }}<span class="cursor-blink">|</span></span>
        </div>
        <p class="hero-summary">
          DevOps and Cloud Engineer with hands-on experience in CI/CD pipelines, containerization, and monitoring.
          Passionate about automation, cloud infrastructure, and building reliable, scalable systems.
        </p>
        <div class="hero-chips">
          <span class="chip" *ngFor="let chip of chips; let i = index" [style.animation-delay]="(i * 0.08 + 0.9) + 's'">{{ chip }}</span>
        </div>
        <div class="hero-cta">
          <a href="#contact" class="btn-primary">
            <span class="btn-inner">Get in touch</span>
            <span class="btn-shine"></span>
          </a>
          <a href="assets/Meriam-Wachene-CV.pdf" target="_blank" class="btn-download">
            <span class="btn-dl-icon">↓</span>
            <span>Download CV</span>
          </a>
          <a href="#experience" class="btn-outline">View work →</a>
        </div>
      </div>
    </section>

    <!-- Contact bar -->
    <div class="contact-bar">
      <a href="mailto:meriam.wachene@esprit.tn" class="contact-bar-item">
        <div class="contact-bar-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        meriam.wachene&#64;esprit.tn
      </a>
      <a href="tel:+21628478498" class="contact-bar-item">
        <div class="contact-bar-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
        </div>
        +216 28 478 498
      </a>
      <a href="https://www.linkedin.com/in/wachenmeriam" target="_blank" class="contact-bar-item">
        <div class="contact-bar-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        </div>
        linkedin.com/in/wachenmeriam
      </a>
      <div class="contact-bar-item">
        <div class="contact-bar-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        Béja, Tunisia
      </div>
    </div>
  `,
  styles: [`
    #hero {
      min-height: 100vh;
      display: grid; grid-template-columns: 0.9fr 1.1fr;
      align-items: center; padding: 120px 60px 80px;
      position: relative; overflow: hidden;
      gap: 40px;
    }

    /* ── Background ── */
    .hero-bg {
      position: absolute; inset: 0;
      background: transparent;
    }
    .hero-grid-lines {
      position: absolute; inset: 0;
      background-image:
        repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(77,184,255,0.02) 80px),
        repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(77,184,255,0.015) 80px);
    }
    .hero-orb {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(60px); opacity: 0.12;
    }
    .hero-orb-1 {
      width: 480px; height: 480px; left: -100px; top: 10%;
      background: radial-gradient(circle, #4db8ff, transparent);
      animation: float 8s ease-in-out infinite;
    }
    .hero-orb-2 {
      width: 320px; height: 320px; right: 5%; bottom: 10%;
      background: radial-gradient(circle, #7b5ea7, transparent);
      animation: float 10s ease-in-out infinite reverse;
    }

    /* ── Image side ── */
    .hero-image-side {
      order: 1; position: relative; z-index: 2;
      display: flex; justify-content: center; align-items: center;
    }
    .hero-photo-frame {
      position: relative; width: 380px; height: 480px;
      border-radius: var(--radius-lg);
    }

    /* Glowing animated ring */
    .glow-ring {
      position: absolute; inset: -16px;
      border-radius: 4px;
      border: 1px solid transparent;
      background: linear-gradient(var(--navy), var(--navy)) padding-box,
                  linear-gradient(135deg, rgba(77,184,255,0.5), transparent 40%, rgba(77,184,255,0.3)) border-box;
      animation: rotateGlow 8s linear infinite;
      pointer-events: none; z-index: 0;
    }
    .glow-ring-2 {
      inset: -28px; opacity: 0.3;
      animation-duration: 12s; animation-direction: reverse;
      background: linear-gradient(var(--navy), var(--navy)) padding-box,
                  linear-gradient(135deg, rgba(123,94,167,0.6), transparent 50%, rgba(77,184,255,0.4)) border-box;
    }

    .hero-photo {
      width: 100%; height: 100%; object-fit: cover; object-position: top;
      position: relative; z-index: 1;
      filter: contrast(1.05) brightness(0.95) saturate(0.9);
      animation: fadeIn 1.2s 0.5s both;
      border-radius: var(--radius-lg);
    }
    .photo-placeholder {
      display: none;
      border-radius: var(--radius-lg);
      width: 100%; height: 100%;
      background: linear-gradient(135deg, var(--navy-light), var(--navy-mid));
      border: 1px solid var(--glass-border);
      align-items: center; justify-content: center;
      font-family: 'Cormorant Garamond', serif;
      font-size: 4rem; color: var(--gold-light);
      position: relative; z-index: 1;
    }
    .hero-photo-glow {
      position: absolute; bottom: -60px; left: -60px;
      width: 220px; height: 220px;
      background: radial-gradient(circle, rgba(77,184,255,0.18), transparent 70%);
      z-index: 0; animation: pulse 4s ease-in-out infinite;
    }

    /* Badge */
    .hero-badge {
      position: absolute; bottom: -20px; right: -16px;
      background: linear-gradient(135deg, #0c1929, #0a1621);
      border: 1px solid rgba(77,184,255,0.25);
      padding: 18px 26px; z-index: 3;
      border-radius: var(--radius-lg);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(77,184,255,0.08);
      backdrop-filter: blur(12px);
    }
    .badge-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.4rem;
      background: linear-gradient(135deg, var(--gold), var(--gold-light));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text; line-height: 1;
    }
    .badge-label {
      font-size: 0.62rem; color: var(--text-muted);
      letter-spacing: 0.18em; text-transform: uppercase; margin-top: 4px;
      font-family: 'Space Grotesk', sans-serif;
    }

    /* Floating tags */
    .float-tag {
      position: absolute;
      display: flex; align-items: center; gap: 8px;
      background: rgba(7,19,31,0.85); backdrop-filter: blur(16px);
      border: 1px solid rgba(77,184,255,0.2);
      padding: 8px 18px; z-index: 3;
      border-radius: var(--radius-pill);
      font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--gold-light); font-family: 'Space Grotesk', sans-serif; font-weight: 500;
      white-space: nowrap;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .float-tag-1 { top: 40px; left: -30px; animation: float 5s ease-in-out infinite; }
    .float-tag-2 { bottom: 60px; left: -24px; animation: float 6s ease-in-out infinite reverse; }
    .ft-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--gold); box-shadow: 0 0 6px var(--gold);
      animation: pulse 2s ease-in-out infinite;
    }

    /* ── Content ── */
    .hero-content { position: relative; z-index: 2; order: 2; }

    .hero-tag {
      font-size: 0.68rem; letter-spacing: 0.38em;
      text-transform: uppercase; color: var(--gold);
      margin-bottom: 24px;
      display: flex; align-items: center; gap: 14px;
      animation: fadeUp 0.8s 0.2s both;
      font-family: 'Space Grotesk', sans-serif; font-weight: 500;
      &::before { content: ''; width: 36px; height: 1px; background: linear-gradient(to right, var(--gold), transparent); }
    }

    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3.5rem, 5.5vw, 6.5rem);
      font-weight: 300; line-height: 0.95;
      margin-bottom: 22px;
      animation: fadeUp 0.8s 0.4s both;
      em {
        font-style: italic;
        background: linear-gradient(135deg, #4db8ff, #93d4ff, #c8eaff);
        background-size: 200% auto;
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }
    }

    .hero-role {
      font-size: 1rem; letter-spacing: 0.06em;
      margin-bottom: 28px;
      animation: fadeUp 0.8s 0.55s both;
      font-family: 'Space Grotesk', sans-serif;
    }
    .role-static { color: var(--text-muted); }
    .role-typed {
      color: var(--gold-light); font-weight: 500;
      border-right: none;
    }
    .cursor-blink {
      display: inline-block;
      color: var(--gold);
      animation: typeBlink 0.8s step-end infinite;
    }

    .hero-summary {
      font-size: 0.92rem; color: rgba(245,240,232,0.58);
      line-height: 1.85; max-width: 480px; margin-bottom: 40px;
      animation: fadeUp 0.8s 0.7s both;
    }

    /* ── Tech chips ── */
    .hero-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 44px; }
    .chip {
      font-size: 0.68rem; letter-spacing: 0.14em;
      text-transform: uppercase; padding: 7px 16px;
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-pill);
      color: var(--text-muted);
      font-family: 'Space Grotesk', sans-serif; font-weight: 500;
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
      opacity: 0;
      animation: popIn 0.5s forwards;
      background: var(--glass);
      &:hover {
        border-color: var(--gold);
        color: var(--gold-light);
        background: rgba(77,184,255,0.08);
        box-shadow: 0 0 16px rgba(77,184,255,0.12);
        transform: translateY(-2px);
      }
    }

    /* ── CTA Buttons ── */
    .hero-cta { display: flex; gap: 16px; align-items: center; animation: fadeUp 0.8s 1s both; flex-wrap: wrap; }

    .btn-primary {
      padding: 15px 38px;
      background: linear-gradient(135deg, var(--gold), #3aa8f0);
      color: var(--navy); text-decoration: none;
      font-size: 0.76rem; letter-spacing: 0.2em;
      text-transform: uppercase; font-weight: 600;
      font-family: 'Space Grotesk', sans-serif;
      border-radius: var(--radius-pill);
      transition: all 0.3s; position: relative; overflow: hidden;
      box-shadow: 0 4px 20px rgba(77,184,255,0.25);
      .btn-inner { position: relative; z-index: 1; }
      .btn-shine {
        position: absolute; top: 0; left: -100%;
        width: 60%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
        transition: left 0.5s;
      }
      &:hover .btn-shine { left: 150%; }
      &:hover { box-shadow: 0 8px 32px rgba(77,184,255,0.4); transform: translateY(-2px); }
    }

    .btn-download {
      display: flex; align-items: center; gap: 10px;
      padding: 14px 28px;
      background: transparent;
      border: 1px solid rgba(77,184,255,0.35);
      border-radius: var(--radius-pill);
      color: var(--gold-light);
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.76rem; letter-spacing: 0.2em;
      text-transform: uppercase; cursor: none;
      text-decoration: none;
      transition: all 0.3s; position: relative; overflow: hidden;
      &::before {
        content: ''; position: absolute; inset: 0;
        background: linear-gradient(135deg, rgba(77,184,255,0.12), rgba(77,184,255,0.06));
        transform: translateY(100%); transition: transform 0.3s;
      }
      &:hover::before { transform: translateY(0); }
      &:hover { border-color: var(--gold); box-shadow: 0 0 20px rgba(77,184,255,0.15); transform: translateY(-2px); }
    }
    .btn-dl-icon {
      font-size: 1rem; line-height: 1;
      animation: bounceDown 1.8s ease-in-out infinite;
    }

    .btn-outline {
      padding: 14px 28px;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: var(--radius-pill);
      color: rgba(232,244,255,0.6); text-decoration: none;
      font-size: 0.76rem; letter-spacing: 0.18em; text-transform: uppercase;
      font-family: 'Space Grotesk', sans-serif;
      transition: all 0.3s;
      &:hover { border-color: rgba(77,184,255,0.4); color: var(--gold-light); transform: translateY(-2px); }
    }

    /* ── Contact bar ── */
    .contact-bar {
      background: rgba(7,19,31,0.8);
      backdrop-filter: blur(20px);
      padding: 22px 60px;
      display: flex; gap: 48px; align-items: center;
      border-top: 1px solid rgba(77,184,255,0.1);
      border-bottom: 1px solid rgba(77,184,255,0.08);
      flex-wrap: wrap;
    }
    .contact-bar-item {
      display: flex; align-items: center; gap: 12px;
      font-size: 0.78rem; color: var(--text-muted);
      font-family: 'Space Grotesk', sans-serif;
      text-decoration: none; transition: color 0.3s;
      &:hover { color: var(--gold-light); }
    }
    .contact-bar-icon {
      width: 32px; height: 32px;
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-sm);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.3s;
      color: var(--text-muted);
    }
    .contact-bar-item:hover .contact-bar-icon {
      background: rgba(77,184,255,0.1);
      color: var(--gold-light);
      border-color: rgba(77,184,255,0.4);
      box-shadow: 0 0 12px rgba(77,184,255,0.18);
    }

    @media (max-width: 900px) {
      #hero { grid-template-columns: 1fr; padding: 110px 24px 64px; }
      .hero-image-side { order: 1; margin-bottom: 48px; }
      .hero-content { order: 2; }
      .hero-photo-frame { width: 280px; height: 360px; }
      .float-tag-1, .float-tag-2 { display: none; }
      .contact-bar { padding: 18px 24px; gap: 20px; }
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  chips = ['Docker', 'Kubernetes', 'Jenkins', 'Azure', 'AWS', 'Angular', 'Spring Boot'];

  private roles = ['DevOps', 'Cloud Computing', 'Full-Stack Dev', 'CI/CD Pipelines'];
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: any;

  displayedRole = '';
  currentRoleText = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.typeNext();
    }, 100);
  }

  typeNext() {
    const fullText = this.roles[this.roleIndex];
    if (this.isDeleting) {
      this.displayedRole = fullText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.displayedRole = fullText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    this.cdr.detectChanges();

    let delay = this.isDeleting ? 60 : 100;

    if (!this.isDeleting && this.charIndex === fullText.length) {
      delay = 1800;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      delay = 400;
    }

    this.timer = setTimeout(() => this.typeNext(), delay);
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }
}
