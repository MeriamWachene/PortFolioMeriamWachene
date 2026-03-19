import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Cert {
  name: string;
  badge: string;
  imageUrl: string;
  certUrl?: string;
  color: string;
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="certifications">
      <div class="section-header reveal">
        <div class="section-tag">Official Recognitions</div>
        <h2>My <em>certifications</em><br>&amp; training</h2>
      </div>

      <div class="cert-grid">
        <div
          class="cert-item reveal"
          *ngFor="let cert of certs"
          (click)="open(cert)"
          (mousemove)="onTilt($event)"
          (mouseleave)="resetTilt($event)">
          <div class="cert-thumb-wrap">
            <img [src]="cert.imageUrl" [alt]="cert.name" class="cert-thumb" loading="lazy" />
            <div class="cert-overlay">
              <span class="overlay-text">View ↗</span>
            </div>
          </div>
          <div class="cert-info">
            <div class="cert-name">{{ cert.name }}</div>
            <span class="cert-badge" [style.--badge-color]="cert.color">{{ cert.badge }}</span>
          </div>
          <div class="cert-shimmer"></div>
        </div>
      </div>

      <!-- MODAL -->
      <div class="modal-backdrop" *ngIf="selected" (click)="close()">
        <div class="modal-box" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="close()">✕</button>
          <img [src]="selected!.imageUrl" [alt]="selected!.name" class="modal-img" />
          <div class="modal-footer">
            <span class="cert-badge modal-badge" [style.--badge-color]="selected!.color">{{ selected!.badge }}</span>
            <p>{{ selected!.name }}</p>
            <a *ngIf="selected!.certUrl" [href]="selected!.certUrl" target="_blank" class="modal-link">
              Verify Certificate ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    section {
      background: transparent;
      position: relative;
    }

    /* ── Grid ── */
    .cert-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 18px;
    }

    /* ── Card ── */
    .cert-item {
      border: 1px solid rgba(77,184,255,0.1);
      background: linear-gradient(135deg, rgba(10,25,41,0.9), rgba(7,19,31,0.95));
      overflow: hidden; cursor: pointer;
      position: relative;
      border-radius: var(--radius-xl);
      transform-style: preserve-3d;
      transition: border-color 0.4s, box-shadow 0.4s;

      &:hover {
        border-color: rgba(77,184,255,0.32);
        box-shadow: 0 24px 60px rgba(0,0,0,0.45), 0 0 30px rgba(77,184,255,0.06);
        .cert-overlay { opacity: 1; }
        .cert-thumb { transform: scale(1.05); filter: brightness(0.85) saturate(1.1); }
        .cert-shimmer { animation: shimmer 1.5s linear 1 forwards; }
      }
    }

    /* Shimmer sweep */
    .cert-shimmer {
      position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(105deg,
        transparent 30%,
        rgba(255,255,255,0.08) 50%,
        transparent 70%);
      background-size: 200% 100%;
      background-position: -200% center;
      opacity: 0;
      .cert-item:hover & { opacity: 1; }
    }

    /* ── Thumbnail ── */
    .cert-thumb-wrap {
      position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden;
      background: #050e1a;
    }
    .cert-thumb {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), filter 0.4s;
      filter: brightness(0.82) saturate(0.85);
    }
    .cert-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(77,184,255,0.25), rgba(123,94,167,0.2));
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.35s;
      .overlay-text {
        color: #fff; font-size: 0.78rem;
        letter-spacing: 0.2em; text-transform: uppercase;
        border: 1px solid rgba(255,255,255,0.5);
        padding: 8px 24px; font-family: 'Space Grotesk', sans-serif; font-weight: 500;
        backdrop-filter: blur(4px);
      }
    }

    /* ── Card footer ── */
    .cert-info {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 16px 18px; flex-direction: column;
    }
    .cert-name {
      font-size: 0.82rem; line-height: 1.5; flex: 1;
      color: var(--cream); font-family: 'Space Grotesk', sans-serif;
    }
    .cert-badge {
      font-size: 0.58rem; letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--badge-color, var(--gold));
      border: 1px solid var(--badge-color, rgba(77,184,255,0.3));
      background: color-mix(in srgb, var(--badge-color, var(--gold)) 10%, transparent);
      border-radius: var(--radius-pill);
      padding: 3px 12px; white-space: nowrap;
      font-family: 'Space Grotesk', sans-serif; font-weight: 600;
    }

    /* ── Reveal ── */
    .reveal {
      opacity: 0; transform: translateY(20px) scale(0.98);
      transition: opacity 0.5s, transform 0.5s;
      &.visible { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* ── Modal ── */
    .modal-backdrop {
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(0,0,0,0.8);
      backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      animation: fadeIn 0.25s ease;
    }
    .modal-box {
      position: relative;
      background: linear-gradient(135deg, #0a192a, #060f1a);
      border: 1px solid rgba(77,184,255,0.25);
      border-radius: var(--radius-xl);
      max-width: 800px; width: 100%;
      overflow: hidden;
      box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(77,184,255,0.05);
      animation: scaleIn 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    .modal-close {
      position: absolute; top: 14px; right: 16px; z-index: 2;
      background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.12);
      color: var(--cream); width: 34px; height: 34px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 0.85rem; transition: all 0.25s;
      &:hover { background: rgba(77,184,255,0.25); border-color: rgba(77,184,255,0.5); }
    }
    .modal-img {
      width: 100%; display: block;
      max-height: 65vh; object-fit: contain;
    }
    .modal-footer {
      padding: 18px 24px;
      display: flex; align-items: center; gap: 14px;
      border-top: 1px solid rgba(255,255,255,0.06);
      flex-wrap: wrap;
      p { font-size: 0.88rem; flex: 1; margin: 0; font-family: 'Space Grotesk', sans-serif; }
    }
    .modal-badge { /* inherits .cert-badge */ }
    .modal-link {
      font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(77,184,255,0.85); text-decoration: none;
      font-family: 'Space Grotesk', sans-serif; white-space: nowrap;
      &:hover { color: #fff; }
    }
  `]
})
export class CertificationsComponent implements AfterViewInit {
  selected: Cert | null = null;

  certs: Cert[] = [
    { name: 'Scrum Fundamentals Certified', badge: 'Agile', imageUrl: 'assets/scrum fund.jpeg', color: '#f97316' },
    { name: 'Scrum for Operations and DevOps Fundamentals Certified', badge: 'Agile', imageUrl: 'assets/Devscrum.jpeg', color: '#f97316' },
    { name: 'AZ-900: Microsoft Azure Fundamentals', badge: 'Cloud', imageUrl: 'assets/AZ900.png', certUrl: 'https://learn.microsoft.com/api/credentials/share/...', color: '#38bdf8' },
    { name: 'Introduction to Microsoft Azure Cloud Services', badge: 'Cloud', imageUrl: 'assets/cloudservice.png', color: '#38bdf8' },
    { name: 'Microsoft Azure Management Tools and Security Solutions', badge: 'Cloud', imageUrl: 'assets/tools.png', color: '#38bdf8' },
    { name: 'AWS Cloud Practitioner (CLF-C02)', badge: 'Cloud', imageUrl: 'assets/AWS.jpeg', color: '#f59e0b' },
    { name: 'Jenkins For Beginners — KodeKloud', badge: 'DevOps', imageUrl: 'assets/jenkins.png', color: '#7b5ea7' },
    { name: 'Kubernetes For the Absolute Beginners — KodeKloud', badge: 'DevOps', imageUrl: 'assets/kubernetes.png', color: '#7b5ea7' },
    { name: 'Docker — KodeKloud', badge: 'DevOps', imageUrl: 'assets/Docker.jpeg', color: '#7b5ea7' },
    { name: 'Learning Linux Basics Course — KodeKloud', badge: 'Linux', imageUrl: 'assets/linux.png', color: '#64748b' },
    { name: 'DevOps Foundation Professional Certification — DFPC', badge: 'DevOps', imageUrl: 'assets/M4.jpeg', color: '#7b5ea7' },
    { name: 'Introduction To Artificial Intelligence', badge: 'AI', imageUrl: 'assets/M9.jpeg', color: '#ec4899' },
    { name: 'Introduction To Cybersecurity', badge: 'Security', imageUrl: 'assets/m1.jpeg', color: '#ef4444' },
    { name: 'CCNAv7', badge: 'Cisco', imageUrl: 'assets/ccna.png', color: '#34d399' },
  ];

  open(cert: Cert) { this.selected = cert; document.body.style.overflow = 'hidden'; }
  close() { this.selected = null; document.body.style.overflow = ''; }

  onTilt(event: MouseEvent) {
    const card = (event.currentTarget as HTMLElement);
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(6px)`;
  }

  resetTilt(event: MouseEvent) {
    const card = (event.currentTarget as HTMLElement);
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1), border-color 0.4s, box-shadow 0.4s';
    setTimeout(() => { card.style.transition = ''; }, 500);
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 70);
      });
    }, { threshold: 0.05 });
    document.querySelectorAll('#certifications .reveal').forEach(el => observer.observe(el));
  }
}
