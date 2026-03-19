import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { NetworkCanvasComponent } from './components/network-canvas/network-canvas.component';
import { CursorComponent } from './components/cursor/cursor.component';
import { LoaderComponent } from './components/loader/loader.component';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    SkillsComponent,
    EducationComponent,
    ExperienceComponent,
    ProjectsComponent,
    CertificationsComponent,
    LanguagesComponent,
    ContactComponent,
    FooterComponent,
    NetworkCanvasComponent,
    CursorComponent,
    LoaderComponent
  ],
  template: `
    <app-loader [fadeOut]="!isLoading"></app-loader>
    <app-cursor></app-cursor>
    <app-network-canvas></app-network-canvas>
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-skills></app-skills>
      <app-education></app-education>
      <app-experience></app-experience>
      <app-projects></app-projects>
      <app-certifications></app-certifications>
      <app-languages></app-languages>
      <app-contact></app-contact>
    </main>
    <app-footer></app-footer>
  `
})
export class AppComponent implements OnInit {
  isLoading = true;

  ngOnInit() {
    // Initializing premium experience
    setTimeout(() => {
      this.isLoading = false;
    }, 2200);
  }
}
