import { Component, inject, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../core/services/login.service';
import { UsuarioActual } from '../../models/usuarioActual.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  private loginService = inject(LoginService);

  // Signal reactivo para el usuario actual
  readonly usuario: Signal<UsuarioActual | null> = signal(this.loginService.obtenerUsuario());
}
