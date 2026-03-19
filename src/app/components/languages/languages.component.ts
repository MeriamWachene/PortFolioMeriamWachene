import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Language { name: string; level: string; percent: number; sub: string; flag: string; }

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="langues">
      <div class="section-header reveal">
        <div class="section-tag">Language Skills</div>
        <h2>The <em>languages</em><br>I speak</h2>
      </div>
      <div class="lang-grid">
        <div class="lang-item reveal" *ngFor="let lang of languages; let i = index" [id]="'lang-'+i">
          <div class="lang-card">
            <div class="lang-flag">{{ lang.flag }}</div>
            <div class="lang-info">
              <div class="lang-head">
                <div class="lang-name">{{ lang.name }}</div>
                <div class="lang-level">{{ lang.level }}</div>
              </div>
              <div class="lang-bar-wrap">
                <div class="lang-bar">
                  <div class="lang-fill" [style.width.%]="lang.percent"></div>
                </div>
                <span class="lang-pct">{{ lang.percent }}%</span>
              </div>
              <div class="lang-sub">{{ lang.sub }}</div>
            </div>
          </div>
          <div class="lang-segments">
            <span class="seg"
                  *ngFor="let s of getSegments(lang.percent)"
                  [class.filled]="s.filled"
                  [class.half]="s.half">
            </span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section {
      background: transparent;
    }
    .lang-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 28px; max-width: 900px;
    }
    .lang-item {
      opacity: 0; transform: translateY(24px);
      transition: opacity 0.6s, transform 0.6s;
      &.visible { opacity: 1; transform: translateY(0); }
    }
    .lang-card {
      display: flex; gap: 20px; align-items: flex-start;
      background: linear-gradient(135deg, rgba(10,25,41,0.85), rgba(7,19,31,0.9));
      border: 1px solid rgba(77,184,255,0.1);
      border-radius: var(--radius-xl);
      padding: 24px 22px; margin-bottom: 14px;
      transition: all 0.35s;
      &:hover {
        border-color: rgba(77,184,255,0.28);
        box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        transform: translateY(-2px);
      }
    }
    .lang-flag {
      font-size: 2.2rem; line-height: 1;
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
    }
    .lang-info { flex: 1; }
    .lang-head {
      display: flex; justify-content: space-between; align-items: baseline;
      margin-bottom: 14px;
    }
    .lang-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem; font-weight: 400; color: var(--cream);
    }
    .lang-level {
      font-size: 0.68rem; letter-spacing: 0.22em; color: var(--gold);
      text-transform: uppercase; font-family: 'Space Grotesk', sans-serif; font-weight: 600;
      background: rgba(77,184,255,0.07);
      border: 1px solid rgba(77,184,255,0.18);
      border-radius: var(--radius-pill);
      padding: 3px 12px;
    }
    .lang-bar-wrap {
      display: flex; align-items: center; gap: 12px; margin-bottom: 8px;
    }
    .lang-bar {
      flex: 1; height: 2px; background: rgba(255,255,255,0.07); position: relative;
    }
    .lang-fill {
      height: 100%;
      background: linear-gradient(to right, var(--gold), var(--gold-light));
      transform-origin: left; transform: scaleX(0);
      transition: transform 1.4s cubic-bezier(0.4,0,0.2,1) 0.3s;
      box-shadow: 0 0 8px rgba(77,184,255,0.5);
      .lang-item.visible & { transform: scaleX(1); }
    }
    .lang-pct {
      font-size: 0.68rem; color: var(--text-muted);
      font-family: 'Space Grotesk', sans-serif; white-space: nowrap;
    }
    .lang-sub {
      font-size: 0.72rem; color: var(--text-muted);
      font-family: 'Space Grotesk', sans-serif;
    }

    /* Dot segments */
    .lang-segments {
      display: flex; gap: 5px; padding: 0 4px;
    }
    .seg {
      flex: 1; height: 3px; background: rgba(77,184,255,0.1); border-radius: 2px;
      transition: background 0.3s, box-shadow 0.3s;
      &.filled {
        background: linear-gradient(to right, var(--gold), var(--gold-light));
        box-shadow: 0 0 6px rgba(77,184,255,0.4);
      }
      &.half { background: linear-gradient(to right, var(--gold), rgba(77,184,255,0.3)); }
    }
  `]
})
export class LanguagesComponent implements AfterViewInit {
  languages: Language[] = [
    { name: 'Arabic', level: 'Native', percent: 100, sub: 'Native language', flag: '🇹🇳' },
    { name: 'French', level: 'B2', percent: 85, sub: 'Advanced · Professional', flag: '🇫🇷' },
    { name: 'English', level: 'B2', percent: 85, sub: 'Advanced · Professional', flag: '🇬🇧' }
  ];

  getSegments(percent: number): { filled: boolean, half: boolean }[] {
    const total = 10;
    const filled = Math.floor(percent / 10);
    const half = (percent % 10) >= 5;
    return Array.from({ length: total }, (_, i) => ({
      filled: i < filled,
      half: i === filled && half
    }));
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 180);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('#langues .lang-item, #langues .reveal').forEach(el => observer.observe(el));
  }
}
