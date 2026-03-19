import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Education {
  num: string;
  date: string;
  bodyHtml: string;
  institution: string;
  spec: string;
  badge?: string;
  photos: string[];
  _cur: number;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="education">

      <div class="edu-block" *ngFor="let edu of education; let odd = odd"
           [class.reversed]="odd">

        <!-- ── Photo ── -->
        <div class="edu-photo">
          <div class="photo-ring"></div>
          <div
            class="photo-slide"
            *ngFor="let p of edu.photos; let i = index"
            [class.active]="edu._cur === i"
          >
            <img [src]="p" [alt]="edu.institution" />
          </div>
          <div class="photo-vignette" [class.vignette-left]="odd"></div>

          <div class="photo-nav" *ngIf="edu.photos.length > 1">
            <button class="nav-btn" (click)="slide(edu, -1)">&#8592;</button>
            <div class="photo-dots">
              <span
                class="ph-dot"
                *ngFor="let p of edu.photos; let i = index"
                [class.active]="edu._cur === i"
                (click)="edu._cur = i"
              ></span>
            </div>
            <button class="nav-btn" (click)="slide(edu, 1)">&#8594;</button>
            <span class="photo-counter">{{ edu._cur + 1 }} / {{ edu.photos.length }}</span>
          </div>
        </div>

        <!-- ── Text ── -->
        <div class="edu-text">
          <div class="block-num">{{ edu.num }}</div>

          <div class="edu-tag">
            <span class="tag-line"></span>
            {{ edu.date }}
          </div>

          <div class="edu-body" [innerHTML]="getSafeHtml(edu.bodyHtml)"></div>

          <div class="edu-divider">
            <div class="divider-glow"></div>
          </div>

          <div class="edu-meta">
            <span class="inst">{{ edu.institution }}</span>
            <span class="spec">{{ edu.spec }}</span>
          </div>

          <span class="edu-badge" *ngIf="edu.badge">
            <span class="badge-star">★</span> {{ edu.badge }}
          </span>
        </div>

      </div>
    </section>
  `,
  styles: [`
    section {
      background: transparent;
      color: var(--cream);
      padding: 0;
    }

    /* ── Block ── */
    .edu-block {
      display: flex;
      min-height: 480px;
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid rgba(77,184,255,0.05);
      transition: border-color 0.4s;
      &:last-child { border-bottom: none; }
      &:hover { border-color: rgba(77,184,255,0.12); }
    }
    .edu-block.reversed { flex-direction: row-reverse; }

    /* ── Photo ── */
    .edu-photo {
      width: 45%; flex-shrink: 0;
      position: relative; overflow: hidden;
      background: #040c17;
    }
    .photo-ring {
      position: absolute; inset: -2px; z-index: 3;
      background: transparent;
      border: 1px solid rgba(77,184,255,0.08);
      pointer-events: none;
    }
    .photo-slide {
      position: absolute; inset: 0;
      opacity: 0; transform: scale(1.05);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .photo-slide.active { opacity: 1; transform: scale(1); }
    .photo-slide img {
      width: 100%; height: 100%; object-fit: cover; object-position: top center;
      filter: brightness(0.75) saturate(0.8);
      display: block; transition: filter 0.5s;
    }
    .edu-block:hover .photo-slide.active img { filter: brightness(0.88) saturate(1); }

    .photo-vignette {
      position: absolute; inset: 0; z-index: 1;
      background: linear-gradient(to right, transparent 40%, #050f1e 100%);
      pointer-events: none;
    }
    .photo-vignette.vignette-left {
      background: linear-gradient(to left, transparent 40%, #050f1e 100%);
    }

    /* nav */
    .photo-nav {
      position: absolute; bottom: 1.4rem; left: 1.4rem;
      z-index: 2; display: flex; align-items: center; gap: 10px;
    }
    .nav-btn {
      width: 32px; height: 32px; border-radius: 50%;
      border: 1px solid rgba(77,184,255,0.3);
      background: rgba(4,12,23,0.75); color: var(--gold);
      font-size: 13px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(8px); transition: all 0.25s;
      &:hover { background: rgba(77,184,255,0.18); border-color: rgba(77,184,255,0.6); }
    }
    .photo-dots { display: flex; gap: 5px; align-items: center; }
    .ph-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: rgba(77,184,255,0.22); cursor: pointer; transition: all 0.3s;
    }
    .ph-dot.active {
      background: var(--gold); width: 18px; border-radius: 3px;
      box-shadow: 0 0 8px rgba(77,184,255,0.6);
    }
    .photo-counter { font-size: 0.58rem; color: rgba(77,184,255,0.5); letter-spacing: 0.14em; }

    /* ── Text ── */
    .edu-text {
      flex: 1;
      padding: 3.5rem 3.5rem 3rem 4rem;
      display: flex; flex-direction: column; justify-content: center;
      position: relative;
    }
    .edu-block.reversed .edu-text { padding: 3.5rem 4rem 3rem 3.5rem; }

    /* ghost number */
    .block-num {
      position: absolute; top: 1.2rem; right: 2rem;
      font-size: 6rem; font-weight: 700;
      font-family: 'Cormorant Garamond', serif;
      background: linear-gradient(135deg, rgba(77,184,255,0.06), rgba(77,184,255,0.02));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1; pointer-events: none; user-select: none;
    }

    .edu-tag {
      display: flex; align-items: center; gap: 12px;
      font-size: 0.62rem; letter-spacing: 0.28em;
      color: var(--gold); text-transform: uppercase; margin-bottom: 1.6rem;
      font-family: 'Space Grotesk', sans-serif; font-weight: 600;
    }
    .tag-line { display: block; width: 32px; height: 1px; background: linear-gradient(to right, var(--gold), transparent); flex-shrink: 0; }

    .edu-body {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.6rem; font-weight: 400;
      line-height: 1.55; color: #d4e8f8; max-width: 440px; margin-bottom: 1.8rem;
    }
    .edu-body ::ng-deep .teal-dot {
      display: inline-block; width: 7px; height: 7px; border-radius: 50%;
      background: var(--gold); box-shadow: 0 0 10px rgba(77,184,255,0.8);
      vertical-align: middle; margin: 0 4px;
    }

    .edu-divider { margin-bottom: 1.4rem; position: relative; }
    .divider-glow {
      width: 48px; height: 1px;
      background: linear-gradient(to right, rgba(77,184,255,0.5), transparent);
    }

    .edu-meta { display: flex; flex-direction: column; gap: 5px; margin-bottom: 1.4rem; }
    .inst { font-size: 0.74rem; color: rgba(77,184,255,0.8); line-height: 1.5; font-family: 'Space Grotesk', sans-serif; }
    .spec { font-size: 0.62rem; color: rgba(232,244,255,0.25); text-transform: uppercase; letter-spacing: 0.1em; font-family: 'Space Grotesk', sans-serif; }

    .edu-badge {
      display: inline-flex; align-items: center; gap: 7px;
      font-size: 0.68rem; color: var(--gold);
      background: rgba(77,184,255,0.06);
      border: 1px solid rgba(77,184,255,0.2);
      padding: 5px 14px; width: fit-content;
      transition: all 0.3s; font-family: 'Space Grotesk', sans-serif;
      &:hover { background: rgba(77,184,255,0.12); border-color: rgba(77,184,255,0.4); }
    }
    .badge-star { color: var(--gold); font-size: 0.65rem; }

    @media (max-width: 700px) {
      .edu-block, .edu-block.reversed { flex-direction: column; }
      .edu-photo { width: 100%; height: 260px; }
      .photo-vignette, .photo-vignette.vignette-left {
        background: linear-gradient(to bottom, transparent 55%, #050f1e 100%);
      }
      .edu-text { padding: 2rem 1.5rem; }
    }
  `]
})
export class EducationComponent {
  education: Education[] = [
    {
      num: '01',
      date: '2022 — 2025',
      bodyHtml: `Engineering Degree in<br>Computer Science <span class="teal-dot"></span><br>Cloud Computing &amp; DevOps.`,
      institution: 'ESPRIT — Private Higher School of Engineering and Technologies · Tunis',
      spec: 'Software Engineering · DevOps · Distributed Architecture',
      badge: 'Graduated with honors',
      photos: ['assets/sa.jpeg', 'assets/sa1.jpeg'],
      _cur: 0,
    },
    {
      num: '02',
      date: '2019 — 2022',
      bodyHtml: `Bachelor's Degree in<br>Business Intelligence <span class="teal-dot"></span><br>Data &amp; Decision Systems.`,
      institution: 'FSJEGJ — Faculty of Legal, Economic and Management Sciences · Jendouba',
      spec: 'Data Analysis · Web Development · Information Systems',
      photos: ['assets/Jan.jpeg'],
      _cur: 0,
    },
  ];

  constructor(private sanitizer: DomSanitizer) {}

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  slide(edu: Education, dir: number): void {
    edu._cur = (edu._cur + dir + edu.photos.length) % edu.photos.length;
  }
}