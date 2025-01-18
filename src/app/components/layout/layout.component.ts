import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  loaderService= inject(LoaderService)
  isLoading = this.loaderService.loader$;


  router = inject(Router);


  onLogout(){
    localStorage.removeItem('user')
    this.router.navigateByUrl('/login')
  }
}
