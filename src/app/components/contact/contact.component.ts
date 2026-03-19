import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact">
      <div class="contact-grid-bg"></div>
      <div class="contact-inner">
        <div class="contact-left">
          <div class="section-tag">Let's work together</div>
          <h2>Get in<br><em>touch</em></h2>
          <p class="contact-desc">
            Available for job opportunities, DevOps/Cloud missions, and technical collaborations.
            I respond within 24 hours.
          </p>
          <div class="contact-links">
            <a href="mailto:meriam.wachene@esprit.tn" class="contact-link">
              <div class="contact-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <div class="link-label">Email</div>
                <div>meriam.wachene&#64;esprit.tn</div>
              </div>
            </a>
            <a href="tel:+21628478498" class="contact-link">
              <div class="contact-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
              </div>
              <div>
                <div class="link-label">Phone</div>
                <div>+216 28 478 498</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/wachenmeriam" target="_blank" class="contact-link">
              <div class="contact-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div>
                <div class="link-label">LinkedIn</div>
                <div>linkedin.com/in/wachenmeriam</div>
              </div>
            </a>
            <div class="contact-link">
              <div class="contact-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div class="link-label">Location</div>
                <div>Béja, Tunis, Tunisia</div>
              </div>
            </div>
          </div>
        </div>

        <form class="form" (ngSubmit)="handleSubmit()">
          <div class="form-group" [class.has-value]="form.name">
            <input type="text" [(ngModel)]="form.name" name="name" id="f-name" placeholder=" ">
            <label for="f-name">Your name</label>
            <div class="form-line"></div>
          </div>
          <div class="form-group" [class.has-value]="form.email">
            <input type="email" [(ngModel)]="form.email" name="email" id="f-email" placeholder=" ">
            <label for="f-email">Email address</label>
            <div class="form-line"></div>
          </div>
          <div class="form-group" [class.has-value]="form.subject">
            <input type="text" [(ngModel)]="form.subject" name="subject" id="f-subj" placeholder=" ">
            <label for="f-subj">Subject</label>
            <div class="form-line"></div>
          </div>
          <div class="form-group" [class.has-value]="form.message">
            <textarea [(ngModel)]="form.message" name="message" id="f-msg" placeholder=" "></textarea>
            <label for="f-msg">Message</label>
            <div class="form-line"></div>
          </div>
          <button type="submit" class="submit-btn" [class.loading]="loading" [class.sent]="sent">
            <span class="btn-text" *ngIf="!loading && !sent">Send message →</span>
            <span class="btn-spinner" *ngIf="loading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </span>
            <span class="btn-check" *ngIf="sent">✓ Message sent!</span>
          </button>
        </form>
      </div>
    </section>
  `,
  styles: [`
    section {
      background: transparent;
      position: relative; overflow: hidden;
    }
    .contact-grid-bg {
      position: absolute; inset: 0; pointer-events: none;
      background: transparent;
    }
    .contact-inner {
      display: grid; grid-template-columns: 0.9fr 1.1fr;
      gap: 80px; align-items: start;
      max-width: 1100px; position: relative; z-index: 1;
    }
    .contact-left { }
    .contact-desc {
      color: rgba(232,244,255,0.55); line-height: 1.85;
      margin: 28px 0 44px; font-size: 0.9rem; max-width: 400px;
      font-family: 'Space Grotesk', sans-serif;
    }
    .contact-links { display: flex; flex-direction: column; gap: 20px; }
    .contact-link {
      display: flex; align-items: center; gap: 18px;
      text-decoration: none; color: var(--cream);
      font-size: 0.85rem; transition: all 0.3s;
      font-family: 'Space Grotesk', sans-serif;
      &:hover { color: var(--gold-light); }
      &:hover .contact-icon {
        background: rgba(77,184,255,0.12);
        border-color: rgba(77,184,255,0.4);
        box-shadow: 0 0 18px rgba(77,184,255,0.15);
      }
    }
    .contact-icon {
      width: 42px; height: 42px; min-width: 42px;
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--text-muted); transition: all 0.35s;
    }
    .link-label {
      font-size: 0.62rem; letter-spacing: 0.18em; color: var(--text-muted);
      text-transform: uppercase; margin-bottom: 2px;
    }

    /* ── Form ── */
    .form { display: flex; flex-direction: column; gap: 28px; }
    .form-group {
      position: relative;
      label {
        position: absolute; left: 0; top: 14px;
        font-size: 0.78rem; color: var(--text-muted);
        font-family: 'Space Grotesk', sans-serif;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        transform-origin: left top;
      }
    }
    input, textarea {
      background: transparent; border: none;
      border-bottom: 1px solid rgba(77,184,255,0.15);
      color: var(--cream); padding: 14px 0 10px;
      width: 100%;
      font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem;
      outline: none;

      &:focus + label,
      &:not(:placeholder-shown) + label {
        transform: translateY(-22px) scale(0.82);
        color: var(--gold);
      }
      &:focus { border-bottom-color: transparent; }
      &::placeholder { color: transparent; }
    }
    .form-line {
      position: absolute; bottom: 0; left: 0;
      height: 1px; width: 0;
      background: linear-gradient(to right, var(--gold), var(--gold-light));
      transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
    }
    .form-group:focus-within .form-line { width: 100%; }
    textarea { min-height: 120px; resize: none; }

    /* ── Submit ── */
    .submit-btn {
      align-self: flex-start;
      padding: 16px 44px;
      background: linear-gradient(135deg, var(--gold), #3aa8f0);
      color: var(--navy); border: none;
      border-radius: var(--radius-pill);
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.78rem; letter-spacing: 0.2em;
      text-transform: uppercase; font-weight: 600;
      cursor: none; position: relative; overflow: hidden;
      min-width: 180px;
      transition: all 0.35s;
      display: flex; align-items: center; justify-content: center;

      &:hover { box-shadow: 0 8px 30px rgba(77,184,255,0.35); transform: translateY(-2px); }
      &.loading { background: rgba(77,184,255,0.15); color: var(--gold); border: 1px solid rgba(77,184,255,0.3); }
      &.sent { background: linear-gradient(135deg, #34d399, #10b981); color: #fff; }
    }
    .btn-spinner svg { animation: rotateGlow 1s linear infinite; }

    @media (max-width: 900px) {
      .contact-inner { grid-template-columns: 1fr; gap: 48px; }
    }
  `]
})
export class ContactComponent {
  form = { name: '', email: '', subject: '', message: '' };
  sent = false;
  loading = false;

  handleSubmit() {
    if (this.loading || this.sent) return;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.sent = true;
      setTimeout(() => {
        this.sent = false;
        this.form = { name: '', email: '', subject: '', message: '' };
      }, 3500);
    }, 1500);
  }
}
