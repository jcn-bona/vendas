import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { HomeComponent } from './home/home.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styles: ``,
    imports: [CommonModule, RouterOutlet, MatButtonModule, MatSlideToggle, HomeComponent]
})
export class AppComponent {
  
}
