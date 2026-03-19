import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav [class.scrolled]="scrolled">
      <div class="nav-logo">
        <span class="logo-text">M.W.</span>
        <span class="logo-dot"></span>
      </div>
      <ul class="nav-links" [class.open]="menuOpen">
        <li><a href="#skills"          (click)="menuOpen=false">Skills</a></li>
        <li><a href="#education"       (click)="menuOpen=false">Education</a></li>
        <li><a href="#experience"      (click)="menuOpen=false">Experience</a></li>
        <li><a href="#projects"        (click)="menuOpen=false">Projects</a></li>
        <li><a href="#certifications"  (click)="menuOpen=false">Certificates</a></li>
        <li><a href="#contact"         (click)="menuOpen=false" class="nav-contact-link">
          <span class="contact-pill">Contact</span>
        </a></li>
      </ul>
      <button class="hamburger" [class.open]="menuOpen" (click)="menuOpen=!menuOpen" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="nav-overlay" [class.visible]="menuOpen" (click)="menuOpen=false"></div>
  `,
  styles: [`
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; justify-content: space-between; align-items: center;
      padding: 22px 60px;
      transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
    }
    nav.scrolled {
      padding: 12px 60px;
      background: rgba(3,11,21,0.82);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-bottom: 1px solid rgba(77,184,255,0.08);
      box-shadow: 0 8px 40px rgba(0,0,0,0.3);
    }

    /* ── Logo ── */
    .nav-logo {
      display: flex; align-items: center; gap: 8px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.55rem; font-weight: 300;
      letter-spacing: 0.15em; color: var(--gold-light);
      cursor: default; user-select: none;
      transition: color 0.3s;
      &:hover { color: #fff; }
    }
    .logo-dot {
      width: 7px; height: 7px;
      background: var(--gold); border-radius: 50%;
      box-shadow: 0 0 10px var(--gold), 0 0 20px rgba(77,184,255,0.4);
      animation: pulse 2.5s ease-in-out infinite;
    }

    /* ── Links ── */
    .nav-links {
      display: flex; gap: 6px; list-style: none; align-items: center;
    }
    .nav-links a {
      text-decoration: none;
      color: rgba(148,188,220,0.75);
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.72rem; letter-spacing: 0.18em;
      text-transform: uppercase; font-weight: 500;
      padding: 7px 16px;
      border-radius: var(--radius-pill);
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
      position: relative;
      &:hover {
        color: var(--gold-light);
        background: rgba(77,184,255,0.08);
      }
    }

    /* Contact pill — stands out */
    .nav-contact-link {
      padding: 0 !important;
      background: transparent !important;
      &:hover { background: transparent !important; }
    }
    .contact-pill {
      display: inline-block;
      background: linear-gradient(135deg, var(--gold), #3aa8f0);
      background-size: 200% auto;
      color: #030b15 !important;
      padding: 8px 24px;
      border-radius: var(--radius-pill);
      font-weight: 700; font-size: 0.7rem;
      letter-spacing: 0.15em; text-transform: uppercase;
      transition: all 0.4s;
      box-shadow: 0 4px 15px rgba(77,184,255,0.3);
      animation: gradientShift 3s linear infinite;
    }
    .nav-contact-link:hover .contact-pill {
      box-shadow: 0 0 25px rgba(77,184,255,0.5);
      transform: translateY(-2px) scale(1.02);
    }

    /* ── Hamburger ── */
    .hamburger {
      display: none; flex-direction: column; gap: 5px; padding: 8px;
      background: rgba(77,184,255,0.06);
      border: 1px solid rgba(77,184,255,0.15);
      border-radius: var(--radius-sm);
      cursor: pointer;
      span {
        display: block; width: 22px; height: 1.5px;
        background: var(--gold-light); transition: all 0.3s;
        transform-origin: center;
      }
      &.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
      &.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
      &.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
    }

    .nav-overlay {
      display: none; position: fixed; inset: 0; z-index: 99;
      background: rgba(3,11,21,0.7); backdrop-filter: blur(4px);
      opacity: 0; transition: opacity 0.3s;
      &.visible { opacity: 1; }
    }

    @media (max-width: 900px) {
      nav { padding: 18px 24px; }
      nav.scrolled { padding: 12px 24px; }
      .hamburger { display: flex; z-index: 101; }
      .nav-overlay { display: block; pointer-events: none; }
      .nav-overlay.visible { pointer-events: all; }
      .nav-links {
        position: fixed; top: 0; right: -100%; bottom: 0;
        width: 72vw; max-width: 310px;
        flex-direction: column; gap: 4px;
        background: rgba(5,14,25,0.97);
        backdrop-filter: blur(24px);
        border-left: 1px solid rgba(77,184,255,0.12);
        border-radius: var(--radius-xl) 0 0 var(--radius-xl);
        padding: 90px 28px 40px;
        z-index: 100;
        transition: right 0.4s cubic-bezier(0.4,0,0.2,1);
        &.open { right: 0; }
        a { display: block; padding: 14px 18px; font-size: 0.82rem; border-radius: var(--radius-md); }
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  menuOpen = false;

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 60; }

  ngOnInit() { this.scrolled = window.scrollY > 60; }
}
