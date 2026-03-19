import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  color: string;
  icon: string;
  period: string;
  links: { label: string; href: string }[];
  highlights?: string[];
  modules?: string[];
  techStack?: { category: string; items: string }[];
  showcase?: { images?: string[]; video?: string };
  activeImgIndex?: number;
  activeView?: 'images' | 'video';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects">
      <!-- Background elements -->
      <div class="proj-ambient proj-ambient-1"></div>
      <div class="proj-ambient proj-ambient-2"></div>

      <div class="container">
        <div class="section-header reveal">
          <div class="premium-tag">Portfolio Showcase</div>
          <h2 class="premium-title">Featured <em>Projects</em></h2>
          <div class="title-underline"></div>
        </div>

        <div class="proj-grid">
          <div class="proj-card reveal"
               *ngFor="let p of projects; let i = index"
               [style.--proj-color]="p.color"
               [class.proj-card--wide]="i === 0">

            <!-- Premium glass surface effect -->
            <div class="glass-surface"></div>
            <div class="shine-effect"></div>
            
            <div class="card-inner">
              <!-- Left Column: Information -->
              <div class="proj-info-col">
                <div class="proj-header">
                  <div class="proj-type-pill">FEATURED PROJECT</div>
                  <div class="proj-period">{{ p.period }}</div>
                </div>

                <div class="proj-title-group">
                  <div class="proj-subtitle">{{ p.subtitle }}</div>
                  <h3 class="proj-title">{{ p.title }}</h3>
                </div>

                <p class="proj-desc">{{ p.description }}</p>

                <div class="detailed-sections" *ngIf="p.modules || p.techStack || p.highlights">
                  <div *ngIf="p.modules" class="p-section">
                    <div class="p-section-label">Core Architecture:</div>
                    <div class="tag-cloud">
                      <span class="p-tag" *ngFor="let mod of p.modules">{{ mod }}</span>
                    </div>
                  </div>

                  <div *ngIf="p.highlights && p.highlights.length > 0" class="p-section">
                    <div class="p-section-label">Key Deliverables:</div>
                    <ul class="p-highlights">
                      <li *ngFor="let h of p.highlights">
                        <span class="hl-icon">✦</span> {{ h }}
                      </li>
                    </ul>
                  </div>

                  <div *ngIf="p.techStack" class="p-section">
                    <div class="p-section-label">Technical Ecosystem:</div>
                    <div class="tech-grid">
                      <div *ngFor="let tech of p.techStack" class="tech-item">
                        <span class="tech-category">{{ tech.category }}:</span>
                        <span class="tech-value">{{ tech.items }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="proj-footer">
                  <div class="proj-tags" *ngIf="p.tags">
                    <span class="simple-tag" *ngFor="let tag of p.tags">{{ tag }}</span>
                  </div>
                  
                  <div class="proj-links" *ngIf="p.links.length">
                    <a *ngFor="let link of p.links" [href]="link.href" target="_blank" class="premium-btn">
                      {{ link.label }} <span class="arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Right Column: Visual Showcase -->
              <div class="proj-visual-col" *ngIf="p.showcase">
                <!-- Navigation for multiple showcase types -->
                <div class="showcase-tabs" *ngIf="p.showcase.images && p.showcase.video">
                  <button [class.active]="(p.activeView || 'images') === 'images'" (click)="p.activeView = 'images'">Gallery</button>
                  <button [class.active]="p.activeView === 'video'" (click)="p.activeView = 'video'">Video Demo</button>
                </div>

                <div class="gallery-container">
                  <div class="gallery-viewport">
                    <!-- Image Gallery View -->
                    <ng-container *ngIf="(p.activeView || 'images') === 'images' && p.showcase.images">
                      <img [src]="p.showcase.images[p.activeImgIndex || 0]" alt="Project Showcase" class="featured-img">
                      
                      <!-- Advanced Navigation Overlay -->
                      <div class="gallery-controls" *ngIf="p.showcase.images.length > 1">
                        <button class="g-nav-btn prev" (click)="prevImg(p, $event)">
                          <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <div class="dots-indicator">
                          <span *ngFor="let img of p.showcase.images; let idx = index" 
                                class="dot" [class.active]="(p.activeImgIndex || 0) === idx"></span>
                        </div>
                        <button class="g-nav-btn next" (click)="nextImg(p, $event)">
                          <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                      </div>
                    </ng-container>

                    <!-- Video View (Automatic fallback if no images) -->
                    <ng-container *ngIf="(p.activeView === 'video' || (!p.showcase.images && p.showcase.video))">
                      <video controls class="featured-video" [src]="p.showcase.video">
                        Your browser does not support the video tag.
                      </video>
                    </ng-container>
                  </div>
                </div>
              </div>
            </div>
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
      overflow: hidden;
      padding-top: 140px;
      color: rgba(255,255,255,0.9);
    }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 30px; position: relative; z-index: 2; }

    .projects-container {
      max-width: 1400px;
      margin: 0 auto;
      --accent-color: var(--gold);
      --accent-glow: rgba(77, 184, 255, 0.4);
    }
/* ── Ambient Effects ── */
    .proj-ambient {
      position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.12; pointer-events: none;
    }
    .proj-ambient-1 { width: 600px; height: 600px; top: -10%; left: -5%; background: radial-gradient(circle, #4db8ff, transparent); }
    .proj-ambient-2 { width: 500px; height: 500px; bottom: 5%; right: -5%; background: radial-gradient(circle, #4db8ff, transparent); }

    /* ── Section Header ── */
    .section-header { text-align: center; margin-bottom: 80px; }
    .premium-tag {
      font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; letter-spacing: 0.25em;
      text-transform: uppercase; color: var(--gold); margin-bottom: 15px; font-weight: 600;
    }
    .premium-title {
      font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-weight: 300;
      color: #fff; margin-bottom: 20px;
    }
    .premium-title em { font-style: italic; color: var(--gold-light); }
    .title-underline { width: 60px; height: 2px; background: var(--gold); margin: 0 auto; }

    /* ── Project Grid ── */
    .proj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 30px; }

    /* ── Premium Card ── */
    .proj-card {
      position: relative; border-radius: 24px; background: rgba(7, 19, 31, 0.4);
      border: 1px solid rgba(255,255,255,0.06); padding: 30px;
      transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
      overflow: hidden;
    }
    .glass-surface {
      position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); pointer-events: none;
    }
    .shine-effect {
      position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
      transform: skewX(-20deg); transition: 0.8s; pointer-events: none;
    }
    .proj-card:hover {
      transform: translateY(-8px); border-color: rgba(77, 184, 255, 0.3);
      box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 20px rgba(77, 184, 255, 0.05);
    }
    .proj-card:hover .shine-effect { left: 150%; }

    /* ── Card Layout ── */
    .card-inner { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 30px; }
    
    .proj-card--wide {
      grid-column: 1 / -1;
    }
    .proj-card--wide .card-inner {
      flex-direction: column; align-items: stretch; gap: 40px;
    }
    .proj-info-col { display: flex; flex-direction: column; }
    .proj-visual-col { min-height: 420px; width: 100%; }

    /* ── Info Content ── */
    .proj-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
    .proj-type-pill {
      font-size: 0.65rem; color: var(--gold); background: rgba(77, 184, 255, 0.1);
      padding: 5px 12px; border-radius: 30px; border: 1px solid rgba(77, 184, 255, 0.2);
      letter-spacing: 0.12em; font-weight: 600;
    }
    .proj-period { font-family: 'Space Grotesk', sans-serif; font-size: 0.7rem; color: rgba(255,255,255,0.4); letter-spacing: 0.1em; }

    .proj-title-group { margin-bottom: 20px; }
    .proj-subtitle { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 8px; }
    .proj-title { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 300; line-height: 1.1; color: #fff; }

    .proj-desc { 
      font-family: 'Space Grotesk', sans-serif; font-size: 0.95rem; line-height: 1.8; color: rgba(255,255,255,0.6); 
      margin-bottom: 35px; max-width: 600px;
    }

    /* ── Detailed Sections ── */
    .detailed-sections { display: flex; flex-direction: column; gap: 25px; margin-bottom: 40px; }
    .p-section-label { font-size: 0.7rem; color: var(--gold); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 12px; font-weight: 600; opacity: 0.8; }
    
    .tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
    .p-tag { font-size: 0.75rem; padding: 6px 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; }

    .p-highlights { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
    .p-highlights li { display: flex; align-items: flex-start; gap: 12px; font-size: 0.9rem; color: rgba(255,255,255,0.7); line-height: 1.5; }
    .hl-icon { color: var(--gold); font-size: 0.8rem; }

    .tech-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
    .tech-item { font-size: 0.85rem; color: rgba(255,255,255,0.5); display: flex; gap: 10px; line-height: 1.4; }
    .tech-category { color: var(--gold-light); font-weight: 500; min-width: 140px; }

    /* ── Visual Showcase ── */
    .showcase-tabs {
      display: flex; gap: 10px; margin-bottom: 15px;
    }
    .showcase-tabs button {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.6); padding: 6px 16px; border-radius: 20px;
      font-size: 0.7rem; cursor: pointer; transition: 0.3s;
      font-family: 'Space Grotesk', sans-serif;
    }
    .showcase-tabs button:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .showcase-tabs button.active { background: var(--gold); color: #000; border-color: var(--gold); font-weight: 600; }

    .gallery-container { height: 100%; border-radius: 20px; overflow: hidden; position: relative; box-shadow: 0 30px 60px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); background: #000; }
    .gallery-viewport { height: 100%; position: relative; display: flex; align-items: center; justify-content: center; background: #000; }
    .featured-img { width: 100%; height: 100%; object-fit: cover; }
    .featured-video { width: 100%; max-height: 100%; outline: none; }

    .gallery-controls {
      position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 20px; padding: 10px 20px;
      background: rgba(3, 11, 21, 0.7); backdrop-filter: blur(10px); border-radius: 50px; border: 1px solid rgba(255,255,255,0.12);
    }
    .g-nav-btn {
      background: none; border: none; color: #fff; cursor: pointer; padding: 5px; opacity: 0.6; transition: 0.3s;
      svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
    }
    .g-nav-btn:hover { opacity: 1; color: var(--gold); }
    
    .dots-indicator { display: flex; gap: 6px; }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.2); transition: 0.3s; }
    .dot.active { width: 15px; border-radius: 10px; background: var(--gold); }

    /* ── Footer Elements ── */
    .proj-footer { display: flex; flex-direction: column; gap: 25px; }
    .proj-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .simple-tag { font-size: 0.65rem; color: rgba(255,255,255,0.4); border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2px; }

    .premium-btn {
      display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: var(--gold-light);
      font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
      transition: gap 0.3s;
    }
    .premium-btn:hover { color: #fff; gap: 18px; }
    .premium-btn .arrow { font-size: 1.1rem; }

    /* ── Responsive ── */
    @media (max-width: 1200px) {
      .proj-card--wide .card-inner { flex-direction: column; }
      .proj-visual-col { min-height: 500px; }
    }
    @media (max-width: 900px) {
      .premium-title { font-size: 2.5rem; }
      .proj-grid { grid-template-columns: 1fr; }
      .proj-visual-col { min-height: 400px; }
      .container { padding: 0 25px; }
    }
  `]
})
export class ProjectsComponent implements AfterViewInit {
  projects: Project[] = [
    {
      title: 'Elife Center',
      subtitle: 'Cloud-Native Enterprise Ecosystem',
      description: 'A high-performance, scalable platform engineered with a modern microservices approach. Leveraging Spring Boot and Angular, the system is fully orchestrated on Microsoft Azure with a heavy focus on automated DevOps lifecycles, robust security auditing, and comprehensive real-time observability.',
      period: '2023 - PRESENT',
      color: '#4db8ff',
      icon: '☁️',
      techStack: [
        { category: 'Artifact Management', items: 'Nexus Repository' },
        { category: 'Backend', items: 'Spring Boot, MySQL, Maven' },
        { category: 'Cloud', items: 'Microsoft Azure' },
        { category: 'DevOps & CI/CD', items: 'Jenkins, Docker, Kubernetes' },
        { category: 'Frontend', items: 'Angular' },
        { category: 'Monitoring', items: 'Prometheus, Grafana' },
        { category: 'Security', items: 'SonarQube, Trivy, Kubeaudit' }
      ],
      highlights: [
        'Streamlined delivery cycles via fully automated Jenkins-based CI/CD pipelines.',
        'Achieved superior scalability and high availability through Kubernetes orchestration on Azure.',
        'Hardened system security using automated SonarQube, Trivy, and Kubeaudit integrations.',
        'Empowered data-driven decisions with advanced Prometheus and Grafana monitoring dashboards.'
      ],
      modules: [
        'Automated CI/CD',
        'Cloud-Native Arch',
        'Security Auditing',
        'Real-time Observability'
      ],
      showcase: {
        images: [
          'assets/A2.jpeg',
          'assets/A4.jpeg',
          'assets/A3.jpeg',
          'assets/A1.jpeg',
          'assets/elife-devops-pipeline.png'
        
          
        ]
      },
      links: [],
      activeImgIndex: 0
    },
    {
      title: 'EspritCollab',
      subtitle: 'Private Cloud Infrastructure & Orchestration',
      description: 'A high-availability collaboration ecosystem engineered with Spring Boot, Angular, and MySQL. Deployed on a private OpenStack cloud infrastructure, the platform ensures total data sovereignty and high performance through automated DevSecOps pipelines and Kubernetes orchestration.',
      period: '2024 - PRESENT',
      color: '#4db8ff',
      icon: '🤝',
      techStack: [
        { category: 'Cloud Infrastructure', items: 'OpenStack (Private), Azure (Hybrid Integration)' },
        { category: 'Backend', items: 'Spring Boot, MySQL' },
        { category: 'DevOps', items: 'Docker, Kubernetes' },
        { category: 'Frontend', items: 'Angular' },
        { category: 'Monitoring', items: 'Prometheus, Grafana' }
      ],
      highlights: [
        'Built on private OpenStack infrastructure to ensure 100% data control and secure on-premises hosting.',
        'Leveraged Docker and Kubernetes for seamless microservices communication and resilient service delivery.',
        'Secure on-premises deployment with hybrid cloud integration for maximum flexibility.',
        'Established full-stack observability with real-time metrics and proactive platform health alerting.'
      ],
      modules: [
        'Private Cloud Deployment',
        'OpenStack Orchestration',
        'Automated K8s Delivery',
        'Proactive Monitoring'
      ],
      showcase: {
        video: 'assets/EspritCollab PI.mp4'
      },
      links: [],
      activeImgIndex: 0
    },
    {
      title: 'Station Ski',
      subtitle: 'Cloud-Native Microservices & DevSecOps',
      description: 'An enterprise-grade platform comprising 11 microservices, architected for high scalability and security. Leveraged a comprehensive DevSecOps lifecycle on Azure AKS, integrating automated security gates, infrastructure-as-code with Terraform, and real-time observability to ensure a resilient, production-ready cloud deployment.',
      period: '2023 - 2024',
      color: '#4db8ff',
      icon: '⛷️',
      techStack: [
        { category: 'Cloud & Orchestration', items: 'Azure AKS, Kubernetes, Terraform' },
        { category: 'DevSecOps & Security', items: 'Jenkins, SonarQube, Trivy, GitLeaks, OWASP' },
        { category: 'Backend & Data', items: 'Spring Boot, MySQL, Maven, Nexus' },
        { category: 'Frontend', items: 'Angular' },
        { category: 'Monitoring', items: 'Prometheus, Grafana' }
      ],
      highlights: [
        'Orchestrated 11 microservices on Azure AKS, achieving seamless scalability and automated high availability.',
        'Hardened the software supply chain using automated SonarQube quality gates and Trivy security scanning.',
        'Automated multi-stage deployments with Jenkins CI/CD pipelines and infrastructure-as-code via Terraform.',
        'Established full-stack observability with real-time alerting and performance visualization across all services.'
      ],
      modules: [
        '11 Microservices Arch',
        'Azure AKS Deployment',
        'DevSecOps Compliance',
        'Real-Time Observability'
      ],
      showcase: {
        images: [
          'assets/station-ski-arch.png',
          'assets/station-ski-jenkins.png'
        ]
      },
      links: [],
      activeImgIndex: 0
    }
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 120);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('#projects .reveal').forEach(el => observer.observe(el));
  }

  nextImg(p: Project, event: Event) {
    event.stopPropagation();
    if (!p.showcase?.images) return;
    const current = p.activeImgIndex || 0;
    p.activeImgIndex = (current + 1) % p.showcase.images.length;
  }

  prevImg(p: Project, event: Event) {
    event.stopPropagation();
    if (!p.showcase?.images) return;
    const current = p.activeImgIndex || 0;
    p.activeImgIndex = (current - 1 + p.showcase.images.length) % p.showcase.images.length;
  }
}
