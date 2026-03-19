import { Component, AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  type: string;
  subtitle?: string;
  description?: string;
  modules?: string[];
  techStack?: { category: string; items: string }[];
  showcase?: {
    architecture?: string;
    images?: string[];
    video?: string;
  };
  logo?: string;
  activeImgIndex?: number; // Internal state for gallery
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience">
      <div class="section-header reveal">
        <div class="section-tag">Professional Experience</div>
        <h2>What I've <em>achieved</em><br>in the field</h2>
      </div>

      <div class="timeline">
        <div class="timeline-line">
          <div class="timeline-line-fill" #lineEl></div>
        </div>

        <div class="exp-item reveal"
             *ngFor="let exp of experiences; let i = index; let odd = odd"
             [class.right]="odd"
             [class.centered]="i === 0 || i === 1 || i === 2 || i === 3">
          <!-- Timeline node -->
          <div class="timeline-node">
            <div class="node-ring"></div>
            <div class="node-dot"></div>
          </div>

          <!-- Card -->
          <div class="exp-card" [class.exp-card--hero]="i === 0">
            <div class="card-accent"></div>
            <div class="exp-header">
              <div class="exp-meta">
                <span class="exp-type">{{ exp.type }}</span>
                <div *ngIf="exp.logo" class="exp-logo-wrap">
                   <img [src]="exp.logo" [alt]="exp.company" class="exp-logo">
                </div>
              </div>
              <div class="exp-period">{{ exp.period }}</div>
            </div>
            <div class="exp-title">{{ exp.title }}</div>
            <div class="exp-company">
              <span class="company-dot"></span>
              {{ exp.company }} · <span class="exp-location">{{ exp.location }}</span>
            </div>

            <!-- Split Layout for Hero/Detailed roles -->
            <div class="exp-card-body-split" *ngIf="exp.description">
              <div class="exp-content-col">
                <div *ngIf="exp.subtitle" class="exp-subtitle">{{ exp.subtitle }}</div>
                <p *ngIf="exp.description" class="exp-desc">{{ exp.description }}</p>

                <div *ngIf="exp.modules" class="exp-modules">
                  <div class="module-title">Key Contributions:</div>
                  <div class="module-grid">
                    <span class="module-tag" *ngFor="let mod of exp.modules">{{ mod }}</span>
                  </div>
                </div>

                <div *ngIf="exp.bullets && exp.bullets.length > 0" class="exp-impact-section">
                  <div class="impact-title">Impact & Results:</div>
                  <ul class="exp-bullets-mini">
                    <li *ngFor="let b of exp.bullets">
                      <span class="bullet-dot"></span>
                      {{ b }}
                    </li>
                  </ul>
                </div>

                <div *ngIf="exp.techStack" class="exp-tech-section">
                  <div class="tech-title">Technologies:</div>
                  <div *ngFor="let tech of exp.techStack" class="tech-row">
                    <span class="tech-cat">{{ tech.category }} — </span>
                    <span class="tech-items">{{ tech.items }}</span>
                  </div>
                </div>
              </div>

              <div class="exp-logo-col">
                <div *ngIf="exp.logo" class="exp-hero-logo-box">
                   <img [src]="exp.logo" [alt]="exp.company" class="exp-hero-logo">
                </div>
              </div>
            </div>

            <!-- Standard layout for others -->
            <ng-container *ngIf="!exp.description">
              <ul class="exp-bullets">
                <li *ngFor="let b of exp.bullets">
                  <span class="bullet-icon">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  {{ b }}
                </li>
              </ul>
            </ng-container>

            <!-- Media Showcase -->
            <div *ngIf="exp.showcase" class="exp-showcase">
              <div class="showcase-nav">
                <button [class.active]="activeShowcase === 'arch'" (click)="activeShowcase = 'arch'">Demo</button>
                <button *ngIf="exp.showcase.video" [class.active]="activeShowcase === 'video'" (click)="activeShowcase = 'video'">App Demo</button>
              </div>
              <div class="showcase-content">
                <div *ngIf="activeShowcase === 'arch'" class="arch-view animate-fadeIn">
                  <div class="gallery-wrapper" *ngIf="exp.showcase.images && exp.showcase.images.length > 0">
                    <img [src]="exp.showcase.images[exp.activeImgIndex || 0]" alt="Demo Image" class="showcase-img gallery-img">
                    
                    <div class="gallery-nav" *ngIf="exp.showcase.images.length > 1">
                      <button class="nav-btn prev" (click)="prevImg(exp, $event)" title="Previous Image">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      <span class="gallery-counter">{{ (exp.activeImgIndex || 0) + 1 }} / {{ exp.showcase.images.length }}</span>
                      <button class="nav-btn next" (click)="nextImg(exp, $event)" title="Next Image">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <ng-container *ngIf="!exp.showcase.images">
                    <img [src]="exp.showcase.architecture || 'assets/architect.png'" alt="System Architecture" class="showcase-img">
                  </ng-container>

                  <div class="img-overlay">
                     <span>{{ (exp.showcase.images && exp.showcase.images.length > 1) ? 'Project Gallery' : 'Modern Architecture' }}</span>
                  </div>
                </div>
                <div *ngIf="activeShowcase === 'video'" class="video-view animate-fadeIn">
                  <video controls class="showcase-img" [src]="exp.showcase.video || 'assets/PFE Meriam Wachene  (1).mp4'">
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section {
      background: transparent;
      position: relative;
    }

    /* ── Timeline wrapper ── */
    .timeline {
      position: relative;
      padding: 0 0 20px;
    }

    /* Vertical connector line */
    .timeline-line {
      position: absolute;
      left: 50%; top: 0; bottom: 0;
      width: 1px;
      background: rgba(77,184,255,0.08);
      transform: translateX(-50%);
    }
    .timeline-line-fill {
      position: absolute; top: 0; left: 0; right: 0;
      background: linear-gradient(to bottom, var(--gold), rgba(77,184,255,0.3));
      transform-origin: top;
      transform: scaleY(0);
      transition: transform 1.5s cubic-bezier(0.4,0,0.2,1);
      &.visible { transform: scaleY(1); }
    }

    /* ── Item ── */
    .exp-item {
      display: flex;
      justify-content: flex-end;
      position: relative;
      margin-bottom: 48px;
      padding-right: calc(50% + 40px);
      padding-left: 0;

      &.right {
        justify-content: flex-start;
        padding-right: 0;
        padding-left: calc(50% + 40px);
        .exp-card { text-align: left; }
      }

      &.centered {
        justify-content: center;
        padding: 0 20px;
        margin-bottom: 80px;
        .exp-card {
           max-width: 950px;
           text-align: left;
           .exp-header { justify-content: space-between; margin-bottom: 24px; }
           .exp-meta { flex-direction: row; align-items: center; }
           .exp-logo-wrap { display: none; } /* Hide the small logo version in split layout */
        }
        .timeline-node { display: none; }
      }
    }
    
    /* ── Split Hero Layout ── */
    .exp-card-body-split {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 40px;
      margin-bottom: 24px;
      align-items: start;
    }
    .exp-hero-logo-box {
      background: rgba(255, 255, 255, 0.98);
      padding: 30px;
      border-radius: var(--radius-lg);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      position: sticky; top: 20px;
      aspect-ratio: 1;
    }
    .exp-hero-logo {
      width: 100%; height: auto;
      max-height: 140px;
      object-fit: contain;
    }
    
    .exp-content-col {
      display: flex; flex-direction: column;
    }
    @media (max-width: 900px) {
      .exp-card-body-split {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      .exp-logo-col { order: -1; }
      .exp-hero-logo-box { aspect-ratio: auto; height: 120px; }
    }

    /* Timeline node */
    .timeline-node {
      position: absolute;
      left: 50%; top: 28px;
      transform: translateX(-50%);
      z-index: 2;
    }
    .node-dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: var(--gold);
      box-shadow: 0 0 14px rgba(77,184,255,0.6);
      position: relative; z-index: 1;
    }
    .node-ring {
      position: absolute;
      top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: 24px; height: 24px; border-radius: 50%;
      border: 1px solid rgba(77,184,255,0.35);
      animation: pulse 3s ease-in-out infinite;
    }

    /* ── Card ── */
    .exp-card {
      background: linear-gradient(135deg, rgba(10,25,41,0.92), rgba(7,19,31,0.96));
      border: 1px solid rgba(77,184,255,0.1);
      border-radius: var(--radius-xl);
      padding: 28px 30px;
      width: 100%;
      position: relative; overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4,0,0.2,1);

      &:hover {
        border-color: rgba(77,184,255,0.3);
        box-shadow: 0 16px 48px rgba(0,0,0,0.4), 0 0 30px rgba(77,184,255,0.06);
        transform: translateY(-3px);
      }
      &:hover .card-accent { transform: scaleX(1); }
    }

    .card-accent {
      position: absolute; top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(to right, var(--gold), rgba(77,184,255,0.4), transparent);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
    }

    .exp-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 12px;
    }
    .exp-type {
      font-size: 0.6rem; letter-spacing: 0.22em; text-transform: uppercase;
      color: var(--gold); font-family: 'Space Grotesk', sans-serif; font-weight: 600;
      background: rgba(77,184,255,0.07);
      border: 1px solid rgba(77,184,255,0.18);
      border-radius: var(--radius-pill);
      padding: 4px 14px;
    }

    /* Logo Styling */
    .exp-logo-wrap {
      width: 100px; height: 32px;
      padding: 4px 10px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: var(--radius-sm);
      display: flex; align-items: center; justify-content: center;
      margin-left: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .exp-logo {
      max-width: 100%; max-height: 100%;
      object-fit: contain;
    }

    .exp-period {
      font-size: 0.68rem; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--text-muted);
      font-family: 'Space Grotesk', sans-serif;
      background: rgba(77,184,255,0.04);
      border: 1px solid rgba(77,184,255,0.1);
      border-radius: var(--radius-pill);
      padding: 4px 14px;
    }

    .exp-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem; font-weight: 400;
      margin-bottom: 8px; color: var(--cream);
    }
    .exp-company {
      display: flex; align-items: center; gap: 8px;
      font-size: 0.8rem; color: rgba(77,184,255,0.85);
      margin-bottom: 18px; font-family: 'Space Grotesk', sans-serif;
    }
    .company-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: var(--gold); box-shadow: 0 0 6px var(--gold);
    }
    .exp-location { color: rgba(90,122,150,0.8); }

    .exp-bullets { list-style: none; display: flex; flex-direction: column; gap: 9px; }
    .exp-bullets li {
      font-size: 0.84rem; color: rgba(232,244,255,0.55);
      line-height: 1.65; padding-left: 22px; position: relative;
      font-family: 'Space Grotesk', sans-serif;
    }
    .bullet-icon {
      position: absolute; left: 0; top: 3px;
      color: var(--gold); opacity: 0.8;
    }

    /* ── New Detailed styles ── */
    .exp-card--hero {
      border-color: rgba(77,184,255,0.25);
      background: linear-gradient(145deg, rgba(12, 31, 48, 0.95), rgba(7, 19, 31, 0.98));
    }
    .exp-subtitle {
      font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
      color: var(--gold-light); font-family: 'Space Grotesk', sans-serif;
      margin-bottom: 12px; font-weight: 600;
    }
    .exp-impact-section {
      margin: 20px 0;
      .impact-title {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: var(--gold);
        opacity: 0.8;
        margin-bottom: 12px;
      }
    }
    .exp-bullets-mini {
      list-style: none; padding: 0; margin: 0;
      li {
        display: flex; align-items: flex-start; gap: 10px;
        color: rgba(255,255,255,0.8); font-size: 0.95rem;
        line-height: 1.6; margin-bottom: 8px;
        .bullet-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold); margin-top: 8px; flex-shrink: 0;
          box-shadow: 0 0 8px var(--gold);
        }
      }
    }
    .tech-title {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--gold);
      opacity: 0.8;
      margin-bottom: 12px;
    }
    .exp-desc {
      font-size: 0.88rem; line-height: 1.7; color: rgba(232,244,255,0.7);
      margin-bottom: 22px; font-family: 'Space Grotesk', sans-serif;
    }
    .exp-modules { margin-bottom: 24px; }
    .module-title {
      font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;
      letter-spacing: 0.1em; margin-bottom: 10px; font-family: 'Space Grotesk', sans-serif;
    }
    .module-grid { display: flex; flex-wrap: wrap; gap: 8px; }
    .module-tag {
      background: rgba(77,184,255,0.08); border: 1px solid rgba(77,184,255,0.15);
      padding: 4px 12px; border-radius: var(--radius-pill);
      font-size: 0.65rem; color: var(--cream); font-family: 'Space Grotesk', sans-serif;
    }
    .exp-tech-section {
      background: rgba(0,0,0,0.2); border-radius: var(--radius-md);
      padding: 16px; margin-bottom: 28px;
    }
    .tech-row {
      font-size: 0.72rem; line-height: 1.6; font-family: 'Space Grotesk', sans-serif;
      margin-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,0.03);
      padding-bottom: 4px;
      &:last-child { border-bottom: none; margin-bottom: 0; }
    }
    .tech-cat { color: var(--gold); font-weight: 600; }
    .tech-items { color: rgba(232,244,255,0.6); }

    /* ── Showcase ── */
    .exp-showcase {
      margin-top: 20px; border-top: 1px solid rgba(77,184,255,0.1);
      padding-top: 20px;
    }
    .showcase-nav {
      display: flex; gap: 12px; margin-bottom: 16px;
    }
    .showcase-nav button {
      background: transparent; border: 1px solid rgba(77,184,255,0.2);
      color: var(--text-muted); border-radius: var(--radius-pill);
      padding: 6px 16px; font-size: 0.7rem; cursor: pointer;
      transition: all 0.3s; font-family: 'Space Grotesk', sans-serif;
      &:hover { border-color: var(--gold); color: var(--gold-light); }
      &.active { background: var(--gold); color: var(--navy); border-color: var(--gold); font-weight: 600; }
    }
    .showcase-content {
      border-radius: var(--radius-lg); overflow: hidden;
      background: #000; position: relative; aspect-ratio: 16/9;
    }
    .showcase-img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.5s;
    }
    .img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent 40%);
      display: flex; align-items: flex-end; padding: 20px; opacity: 0;
      transition: opacity 0.3s;
    }
    .showcase-content:hover .img-overlay { opacity: 1; }
    .showcase-content:hover .showcase-img { transform: scale(1.05); }
    .img-overlay span { color: var(--gold-light); font-size: 0.75rem; letter-spacing: 0.1em; }

    .gallery-wrapper {
      position: relative; width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
    }
    .gallery-nav {
      position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 15px;
      background: rgba(10, 25, 47, 0.8);
      padding: 8px 16px; border-radius: 30px;
      backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);
      z-index: 10;
    }
    .nav-btn {
      background: none; border: none; color: var(--gold);
      cursor: pointer; padding: 5px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.3s;
      &:hover { background: rgba(255,255,255,0.1); transform: scale(1.1); }
    }
    .gallery-counter {
      color: white; font-size: 0.8rem; font-family: 'Space Grotesk', sans-serif;
      min-width: 40px; text-align: center;
    }
    .gallery-img { transition: opacity 0.4s ease-in-out; }

    .video-view { height: 100%; }
    .video-placeholder {
      height: 100%; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 16px;
      background: linear-gradient(135deg, #0a192f, #02060f);
    }
    .play-btn {
      width: 80px; height: 80px; border-radius: 50%;
      background: rgba(77,184,255,0.2); border: 1px solid var(--gold);
      display: flex; align-items: center; justify-content: center;
      color: var(--gold); transition: all 0.3s;
      &:hover { transform: scale(1.1); background: var(--gold); color: var(--navy); }
    }
    .animate-fadeIn { animation: fadeIn 0.4s ease-out; }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .timeline-line { left: 18px; }
      .exp-item, .exp-item.right {
        padding-left: 52px; padding-right: 0;
        justify-content: flex-start;
      }
      .timeline-node { left: 18px; }
    }
  `]
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChildren('lineEl') lineEls!: QueryList<ElementRef>;
  activeShowcase: 'arch' | 'video' = 'arch';

  experiences: Experience[] = [
    {
      type: 'Internship',
      title: 'DevSecOps & Software Engineering Intern',
      company: 'Kromberg & Schubert',
      period: 'Feb 2025 — Aug 2025 · 6 Months',
      location: 'Beja, Tunisie',
      subtitle: 'Enterprise IT Platform · Cloud Automation',
      description: 'Spearheaded the development of a flagship, DevSecOps-driven IT management ecosystem, unifying fragmented resource tracking into a cohesive automated platform. Secured the software supply chain by integrating automated security gates and orchestrating cloud-native deployments on Azure AKS.',
      modules: [
        'Centralized Resource Management', 'DevSecOps Pipeline Orchestration',
        'Automated Security Gates', 'Cloud Infrastructure-as-Code'
      ],
      techStack: [
        { category: 'Development', items: 'Spring Boot, Angular' },
        { category: 'CI/CD & DevOps', items: 'Jenkins, Docker, Azure AKS, Helm' },
        { category: 'Security', items: 'SonarQube, Trivy, GitLeaks, OWASP ZAP, Checkov' },
        { category: 'Observability', items: 'Prometheus, Grafana' }
      ],
      showcase: {
        architecture: 'assets/architect.png',
        video: 'assets/PFE Meriam Wachene  (1).mp4'
      },
      logo: 'assets/ks_logo.jpeg',
      bullets: [
        'Built a centralized high-availability platform for global IT inventory and lifecycle automation',
        'Implemented rigorous DevSecOps compliance: Achieved 95% code coverage and zero critical vulnerabilities',
        'Automated multi-stage production deployments on Azure AKS using Helm and Docker orchestration',
        'Established full-stack observability with real-time alerting for infrastructure and application health',
        'Accelerated infrastructure provisioning by 70% using Terraform and Ansible automation'
      ]
    },
    {
      type: 'Internship',
      title: 'Software Engineering Intern',
      company: 'DataDoIt',
      period: 'Jul 2024 — Sep 2024',
      location: 'Manouba, Tunisie',
      subtitle: 'GreenTech & Sustainability Platform · DevSecOps',
      description: 'Pioneered a high-impact sustainability platform designed to digitize the global carbon footprint of industrial operations. Engineered complex data pipelines to process raw environmental metrics into sophisticated, data-driven sustainability strategies.',
      modules: [
        'Automated DevSecOps Lifecycle', 'CI/CD & Artifact Management',
        'Security Compliance Scanning', 'Sustainability Data Analytics'
      ],
      techStack: [
        { category: 'Development', items: 'Angular, Spring Boot, MySQL' },






































        
        { category: 'CI/CD Automation', items: 'Jenkins, Docker, Nexus' },
        { category: 'DevSecOps', items: 'SonarQube, Trivy, Azure' },
        { category: 'Orchestration', items: 'Kubernetes, Helm' },
        { category: 'Observability', items: 'Prometheus, Grafana' }
      ],
      showcase: {
        images: ['assets/data.png', 'assets/data1.png']
      },
      logo: 'assets/datadoit.png',
      bullets: [
        'Successfully digitized carbon tracking and reporting for 50+ diverse industrial facilities',
        'Achieved an 85% measurable improvement in data accuracy and reporting precision',
        'Automated 60% of manual regulatory compliance and sustainability reporting tasks'
      ],
      activeImgIndex: 0
    },
    {
      type: 'Internship',
      title: 'Software Engineering Intern',
      company: 'DataDoIt',
      period: 'Jul 2023 — Sep 2023',
      location: 'Manouba, Tunisie',
      subtitle: 'Real-Time AI Analytics & Decision Support',
      description: 'Architected a high-performance, cloud-native analytics engine that translates AI smart-camera telemetry into actionable operational KPIs. Enabled data-driven strategic decision-making through real-time visualization of complex behavioral patterns.',
      modules: [
        'Authentication & Role-Based Access', 'Real-Time Insights Dashboards',
        'High-Throughput Data Management', 'Full-Stack System Monitoring'
      ],
      techStack: [
        { category: 'Frontend', items: 'Angular, Bootstrap' },
        { category: 'Backend & Data', items: 'Spring Boot, MongoDB' },
        { category: 'CI/CD & Flow', items: 'Jenkins, GitHub, Maven, Docker' },
        { category: 'Cloud Infrastructure', items: 'AWS, Terraform, Ansible, Helm' },
        { category: 'Quality & Compliance', items: 'Prometheus, Grafana, SonarQube, Trivy, OWASP ZAP, JUnit, Mockito' }
      ],
      logo: 'assets/datadoit.png',
      showcase: {
        images: ['assets/data2.png']
      },
      bullets: [
        'Engineered a secure administrative portal with complex role-based authentication and authorization',
        'Developed interactive, low-latency dashboards for monitoring footfall, occupancy, and behavioral metrics',
        'Designed a high-throughput storage layer for efficient ingestion of real-time camera telemetry'
      ],
      activeImgIndex: 0
    },
    {
      type: 'Internship',
      title: 'BI Developer & Data Analyst',
      company: 'Kromberg & Schubert',
      period: 'Feb 2022 — Apr 2022',
      location: 'Béja, Tunisia',
      subtitle: 'Consumables Management & BI Analytics',
      description: 'Developed a consumables management application using React, Node.js, and MongoDB. Created data visualization and analytics dashboards using Talend and Power BI.',
      modules: [
        'Consumables Tracking', 'Warehouse Management', 'Inventory Analysis',
        'Data Visualization', 'Report Automation', 'ETL Processing'
      ],
      techStack: [
        { category: 'Development', items: 'React, Node.js, MongoDB' },
        { category: 'Data & ETL', items: 'Talend Open Studio, SQL' },
        { category: 'Analytics', items: 'Power BI' },
        { category: 'Testing', items: 'Postman' }
      ],
      showcase: {
        architecture: 'assets/krom.png', // This will be the screenshot gallery
        video: ''
      },
      logo: 'assets/ks_logo.jpeg',
      bullets: []
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 150);
      });
    }, { threshold: 0.06 });

    document.querySelectorAll('#experience .reveal').forEach(el => revealObserver.observe(el));

    // Animate timeline line fill
    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-line-fill').forEach(el => lineObserver.observe(el));
  }

  nextImg(exp: Experience, event: Event) {
    event.stopPropagation();
    if (!exp.showcase?.images) return;
    const current = exp.activeImgIndex || 0;
    exp.activeImgIndex = (current + 1) % exp.showcase.images.length;
  }

  prevImg(exp: Experience, event: Event) {
    event.stopPropagation();
    if (!exp.showcase?.images) return;
    const current = exp.activeImgIndex || 0;
    exp.activeImgIndex = (current - 1 + exp.showcase.images.length) % exp.showcase.images.length;
  }
}
