import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuComponent, TopbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
