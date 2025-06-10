import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; // Para os ícones

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}