import { Component } from '@angular/core';
import { LayoutComponent } from "../../components/layout/layout.component";
import { BannerComponent } from "../../components/banner/banner.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [LayoutComponent, BannerComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}
