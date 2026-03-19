import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillCategory {
  icon: string;
  name: string;
  tags: string[];
  color: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills">
      <div class="section-header reveal">
        <div class="section-tag">Technical Arsenal</div>
        <h2>Skills &amp; <em>Technologies</em></h2>
      </div>
      <div class="skills-grid">
        <div class="skill-card reveal"
             *ngFor="let cat of categories; let i = index"
             [style.--accent]="cat.color"
             (mousemove)="onTilt($event, i)"
             (mouseleave)="resetTilt(i)"
             [id]="'skill-card-'+i">
          <div class="card-glow"></div>
          <div class="card-top-line"></div>
          <div class="skill-cat-icon">{{ cat.icon }}</div>
          <div class="skill-cat-name">{{ cat.name }}</div>
          <div class="skill-tags">
            <span class="skill-tag"
                  *ngFor="let tag of cat.tags; let ti = index"
                  [style.animation-delay]="(ti * 0.05) + 's'">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section {
      background: transparent;
      position: relative; overflow: hidden;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(295px, 1fr));
      gap: 18px;
    }

    /* ── Card ── */
    .skill-card {
      background: linear-gradient(135deg, rgba(10,25,41,0.9), rgba(7,19,31,0.95));
      border: 1px solid rgba(77,184,255,0.1);
      border-radius: var(--radius-xl);
      padding: 32px 28px;
      position: relative; overflow: hidden;
      transform-style: preserve-3d;
      will-change: transform;
      transition: border-color 0.4s, box-shadow 0.4s;
      cursor: default;

      &:hover {
        border-color: rgba(77,184,255,0.28);
        box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(77,184,255,0.15);
      }
      &:hover .card-glow { opacity: 1; }
      &:hover .card-top-line { width: 100%; }
      &:hover .skill-tag { animation: popIn 0.35s forwards; }
    }

    /* top accent line */
    .card-top-line {
      position: absolute; top: 0; left: 0;
      height: 1.5px; width: 0;
      background: linear-gradient(to right, var(--accent, var(--gold)), transparent);
      transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
    }

    /* inner glow on hover */
    .card-glow {
      position: absolute; inset: 0; opacity: 0;
      background: radial-gradient(ellipse 60% 60% at 50% 20%, rgba(77,184,255,0.06), transparent);
      transition: opacity 0.5s;
      pointer-events: none;
    }

    .skill-cat-icon {
      font-size: 1.6rem; margin-bottom: 16px;
      display: inline-flex; align-items: center; justify-content: center;
      width: 52px; height: 52px;
      background: rgba(77,184,255,0.07);
      border: 1px solid rgba(77,184,255,0.12);
      border-radius: var(--radius-md);
      transition: all 0.3s;
      .skill-card:hover & {
        background: rgba(77,184,255,0.14);
        box-shadow: 0 0 20px rgba(77,184,255,0.15);
      }
    }

    .skill-cat-name {
      font-size: 0.68rem; letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--accent, var(--gold));
      margin-bottom: 20px;
      font-family: 'Space Grotesk', sans-serif; font-weight: 600;
    }

    .skill-tags { display: flex; flex-wrap: wrap; gap: 7px; }
    .skill-tag {
      font-size: 0.7rem; padding: 5px 14px;
      background: rgba(77,184,255,0.06);
      border: 1px solid rgba(77,184,255,0.12);
      border-radius: var(--radius-pill);
      color: rgba(232,244,255,0.75);
      font-family: 'Space Grotesk', sans-serif;
      transition: all 0.25s;
      opacity: 0;
      .skill-card.visible & { animation: popIn 0.4s forwards; }
      &:hover {
        background: rgba(77,184,255,0.14);
        color: var(--gold-light);
        border-color: rgba(77,184,255,0.35);
        transform: translateY(-1px);
      }
    }
  `]
})
export class SkillsComponent implements AfterViewInit {
  categories: SkillCategory[] = [
    { icon: '⚡', name: 'Frontend', color: 'var(--gold)',
      tags: ['Angular', 'React', 'Bootstrap', 'HTML5', 'CSS3'] },
    { icon: '⚙️', name: 'Backend', color: 'var(--gold-light)',
      tags: ['Spring Boot', 'Node.js', 'Java', 'REST APIs'] },
    { icon: '🗄️', name: 'Databases', color: 'var(--gold)',
      tags: ['MySQL', 'MongoDB', 'PostgreSQL'] },
    { icon: '🚀', name: 'DevOps / CI-CD', color: 'var(--gold-light)',
      tags: ['Jenkins', 'Docker', 'Kubernetes', 'Helm', 'Trivy', 'OWASP', 'Ansible'] },
    { icon: '☁️', name: 'Cloud', color: 'var(--gold)',
      tags: ['OpenStack', 'Microsoft Azure', 'AWS'] },
    { icon: '🌐', name: 'Networks & Security', color: 'var(--gold-light)',
      tags: ['TCP/IP', 'Routage & Switching', 'CCNA (Cisco)', 'Grafana'] },
    { icon: '🖥️', name: 'Systems & Tools', color: 'var(--gold)',
      tags: ['Linux / Unix', 'Windows', 'VMware', 'VirtualBox', 'Git'] },
    { icon: '📊', name: 'Data & BI', color: 'var(--gold-light)',
      tags: ['Power BI', 'Talend (ETL)', 'Postman'] }
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 100);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('#skills .reveal, #skills .skill-card').forEach(el => observer.observe(el));
  }

  onTilt(event: MouseEvent, index: number) {
    const card = document.getElementById('skill-card-' + index);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
  }

  resetTilt(index: number) {
    const card = document.getElementById('skill-card-' + index);
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1), border-color 0.4s, box-shadow 0.4s';
    setTimeout(() => { card.style.transition = ''; }, 500);
  }
}
