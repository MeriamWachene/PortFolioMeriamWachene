import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-wrapper" [class.fade-out]="fadeOut">
      <!-- Animated Network Background -->
      <div class="network-bg"></div>
      
      <!-- Overlay for depth -->
      <div class="vignette"></div>

      <div class="loader-content">
        <div class="logo-viewport">
          <div class="glass-sphere"></div>
          <div class="orbit-container">
            <div class="orbit-ring gold"></div>
            <div class="orbit-ring blue"></div>
            <div class="orbit-ring white"></div>
          </div>
          <div class="initials-container">
            <span class="initial letter-m">M</span>
            <span class="initial letter-w">W</span>
          </div>
        </div>

        <div class="status-box">
          <div class="progress-container">
            <div class="progress-fill"></div>
            <div class="progress-glow"></div>
          </div>
          <div class="loading-info">
            <span class="status-text">Synchronizing Neural Links</span>
            <span class="status-percentage">010101</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { --gold: #4db8ff; --blue: #4db8ff; --navy: #050a14; }

    .loader-wrapper {
      position: fixed; inset: 0;
      background: var(--navy);
      z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), visibility 1s;
      overflow: hidden;
    }

    .loader-wrapper.fade-out { opacity: 0; visibility: hidden; }

    /* ── Background ── */
    .network-bg {
      position: absolute; inset: -10%;
      background: url('/assets/loader-bg.png') center/cover no-repeat;
      opacity: 0.25;
      filter: contrast(1.2) brightness(0.8);
      animation: panBackground 20s linear infinite;
      z-index: 0;
    }

    .vignette {
      position: absolute; inset: 0;
      background: radial-gradient(circle at center, transparent 20%, rgba(5,10,20,0.8) 100%);
      z-index: 1;
    }

    /* ── Logo Viewport ── */
    .loader-content {
      position: relative; z-index: 2;
      display: flex; flex-direction: column; align-items: center; gap: 40px;
    }

    .logo-viewport {
      position: relative;
      width: 200px; height: 200px;
      display: flex; align-items: center; justify-content: center;
    }

    .glass-sphere {
      position: absolute; width: 140px; height: 140px;
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(8px);
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.05);
      box-shadow: inset 0 0 30px rgba(77,184,255,0.1);
    }

    .orbit-container {
      position: absolute; inset: 0;
      transform-style: preserve-3d;
      perspective: 1000px;
    }

    .orbit-ring {
      position: absolute; inset: 20px;
      border: 1px solid transparent;
      border-radius: 50%;
    }

    .orbit-ring.gold {
      border-top-color: var(--gold);
      animation: rotate3D 3s linear infinite;
    }

    .orbit-ring.blue {
      inset: 40px;
      border-right-color: var(--blue);
      animation: rotate3D 2.5s linear infinite reverse;
    }

    .orbit-ring.white {
      inset: 60px;
      border-bottom-color: rgba(255,255,255,0.2);
      animation: rotate3D 4s linear infinite;
    }

    /* ── Initials ── */
    .initials-container {
      display: flex; gap: 4px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.5rem; font-weight: 300;
      color: #fff;
    }

    .initial {
      display: inline-block;
      text-shadow: 0 0 20px rgba(197, 160, 89, 0.4);
      animation: initialFloat 3s ease-in-out infinite alternate;
    }

    .letter-m { color: var(--gold); animation-delay: 0s; }
    .letter-w { color: #fff; animation-delay: 1.5s; }

    /* ── Status Box ── */
    .status-box {
      width: 260px;
      display: flex; flex-direction: column; gap: 12px;
    }

    .progress-container {
      height: 2px; background: rgba(255,255,255,0.05);
      position: relative; overflow: hidden;
      border-radius: 2px;
    }

    .progress-fill {
      position: absolute; left: -100%; top: 0; height: 100%; width: 100%;
      background: linear-gradient(90deg, transparent, var(--gold), var(--blue), transparent);
      animation: sweepProgress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    .loading-info {
      display: flex; justify-content: space-between;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.6rem; letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.3);
    }

    /* ── Animations ── */
    @keyframes panBackground {
      0% { transform: scale(1.1) translate(0, 0); }
      50% { transform: scale(1.1) translate(-2%, -2%); }
      100% { transform: scale(1.1) translate(0, 0); }
    }

    @keyframes rotate3D {
      from { transform: rotate3d(1, 1, 0, 0deg); }
      to { transform: rotate3d(1, 1, 0, 360deg); }
    }

    @keyframes initialFloat {
      from { transform: translateY(0) scale(1); opacity: 0.8; }
      to { transform: translateY(-8px) scale(1.05); opacity: 1; }
    }

    @keyframes sweepProgress {
      0% { left: -100%; }
      50% { left: 0%; }
      100% { left: 100%; }
    }
  `]
})
export class LoaderComponent {
  @Input() fadeOut = false;
}
