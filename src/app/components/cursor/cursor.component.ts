import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  template: `
    <div class="cursor" #cursor></div>
    <div class="cursor-ring" #cursorRing></div>
    <div class="cursor-trail" #trail1></div>
    <div class="cursor-trail trail-2" #trail2></div>
    <div class="cursor-trail trail-3" #trail3></div>
  `,
  styles: [`
    .cursor {
      width: 7px; height: 7px;
      background: var(--gold);
      border-radius: 50%;
      position: fixed; top: 0; left: 0;
      pointer-events: none; z-index: 9999;
      box-shadow: 0 0 10px rgba(77,184,255,0.8);
      transition: transform 0.05s, background 0.2s, width 0.25s, height 0.25s;
      will-change: transform;
    }
    .cursor.on-link {
      width: 14px; height: 14px;
      background: rgba(77,184,255,0.2);
      box-shadow: 0 0 20px rgba(77,184,255,0.6);
    }
    .cursor-ring {
      width: 34px; height: 34px;
      border: 1.5px solid rgba(77,184,255,0.55);
      border-radius: 50%;
      position: fixed; top: 0; left: 0;
      pointer-events: none; z-index: 9998;
      transition: width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s;
      will-change: transform;
    }
    .cursor-ring.on-link {
      width: 50px; height: 50px;
      border-color: rgba(77,184,255,0.8);
    }
    .cursor-trail {
      width: 5px; height: 5px;
      background: rgba(77,184,255,0.35);
      border-radius: 50%;
      position: fixed; top: 0; left: 0;
      pointer-events: none; z-index: 9996;
      will-change: transform;
    }
    .trail-2 { width: 4px; height: 4px; background: rgba(77,184,255,0.2); z-index: 9995; }
    .trail-3 { width: 3px; height: 3px; background: rgba(77,184,255,0.1); z-index: 9994; }
  `]
})
export class CursorComponent implements AfterViewInit {
  @ViewChild('cursor')    cursorEl!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorRing') ringEl!: ElementRef<HTMLDivElement>;
  @ViewChild('trail1') trail1!: ElementRef<HTMLDivElement>;
  @ViewChild('trail2') trail2!: ElementRef<HTMLDivElement>;
  @ViewChild('trail3') trail3!: ElementRef<HTMLDivElement>;

  private mx = 0; private my = 0;
  private rx = 0; private ry = 0;
  private t1x = 0; private t1y = 0;
  private t2x = 0; private t2y = 0;
  private t3x = 0; private t3y = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    document.addEventListener('mousemove', (e) => {
      this.mx = e.clientX; this.my = e.clientY;
      this.cursorEl.nativeElement.style.transform = `translate(${this.mx - 3.5}px, ${this.my - 3.5}px)`;
    });

    document.addEventListener('mouseover', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, .cert-item, .skill-card, .exp-card');
      if (isInteractive) {
        this.cursorEl.nativeElement.classList.add('on-link');
        this.ringEl.nativeElement.classList.add('on-link');
      }
    });

    document.addEventListener('mouseout', (e: MouseEvent) => {
      const target = e.relatedTarget as HTMLElement;
      if (!target?.closest('a, button, [role="button"], input, textarea, select, .cert-item, .skill-card, .exp-card')) {
        this.cursorEl.nativeElement.classList.remove('on-link');
        this.ringEl.nativeElement.classList.remove('on-link');
      }
    });

    const animate = () => {
      // Ring follows with lag
      this.rx += (this.mx - this.rx) * 0.12;
      this.ry += (this.my - this.ry) * 0.12;
      this.ringEl.nativeElement.style.transform = `translate(${this.rx - 17}px, ${this.ry - 17}px)`;

      // Trails with increasing lag
      this.t1x += (this.mx - this.t1x) * 0.18;
      this.t1y += (this.my - this.t1y) * 0.18;
      this.trail1.nativeElement.style.transform = `translate(${this.t1x - 2.5}px, ${this.t1y - 2.5}px)`;

      this.t2x += (this.t1x - this.t2x) * 0.22;
      this.t2y += (this.t1y - this.t2y) * 0.22;
      this.trail2.nativeElement.style.transform = `translate(${this.t2x - 2}px, ${this.t2y - 2}px)`;

      this.t3x += (this.t2x - this.t3x) * 0.22;
      this.t3y += (this.t2y - this.t3y) * 0.22;
      this.trail3.nativeElement.style.transform = `translate(${this.t3x - 1.5}px, ${this.t3y - 1.5}px)`;

      requestAnimationFrame(animate);
    };
    animate();
  }
}
