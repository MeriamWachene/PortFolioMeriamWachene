import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number; pulse: number;
  speed: number; brightness: number;
}

@Component({
  selector: 'app-network-canvas',
  standalone: true,
  template: `<canvas #canvas style="position:fixed;top:0;left:0;pointer-events:none;z-index:0;opacity:0.55;"></canvas>`,
})
export class NetworkCanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private nodes: Node[] = [];
  private mouseX = -999; private mouseY = -999;
  private readonly NODE_COUNT = 70;
  private readonly MAX_DIST = 180;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:resize')
  onResize() { this.resize(); }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.initNodes();
    document.addEventListener('mousemove', (e) => { this.mouseX = e.clientX; this.mouseY = e.clientY; });
    this.draw();
  }

  private resize() {
    const c = this.canvasRef.nativeElement;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }

  private initNodes() {
    for (let i = 0; i < this.NODE_COUNT; i++) {
      this.nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: 1.5 + Math.random() * 2.5,
        pulse: Math.random() * Math.PI * 2,
        speed: 0.012 + Math.random() * 0.018,
        brightness: 0.6 + Math.random() * 0.4
      });
    }
  }

  private draw() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const n of this.nodes) {
      n.pulse += n.speed;
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      const dx = n.x - this.mouseX, dy = n.y - this.mouseY;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 120) {
        n.vx += (dx / d) * 0.08; n.vy += (dy / d) * 0.08;
        const speed = Math.sqrt(n.vx*n.vx + n.vy*n.vy);
        if (speed > 1.5) { n.vx = n.vx/speed*1.5; n.vy = n.vy/speed*1.5; }
      }
    }

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i+1; j < this.nodes.length; j++) {
        const a = this.nodes[i], b = this.nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < this.MAX_DIST) {
          const alpha = (1 - dist / this.MAX_DIST) * 0.45;
          const gradient = this.ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          gradient.addColorStop(0, `rgba(77,184,255,${alpha * a.brightness})`);
          gradient.addColorStop(1, `rgba(100,200,255,${alpha * b.brightness})`);
          this.ctx.beginPath();
          this.ctx.strokeStyle = gradient;
          this.ctx.lineWidth = 0.6;
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
        }
      }
    }

    for (const n of this.nodes) {
      const pulse = 0.7 + Math.sin(n.pulse) * 0.3;
      const r = n.r * pulse;
      const alpha = 0.6 + Math.sin(n.pulse) * 0.4;
      const grd = this.ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
      grd.addColorStop(0, `rgba(100,210,255,${alpha * 0.35 * n.brightness})`);
      grd.addColorStop(0.4, `rgba(77,184,255,${alpha * 0.1 * n.brightness})`);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2);
      this.ctx.fillStyle = grd;
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(200,235,255,${alpha * n.brightness})`;
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.draw());
  }
}
