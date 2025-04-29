import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mundo } from '../../models/mundo.model';

@Component({
  selector: 'app-mundo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mundo.component.html',
  styleUrls: ['./mundo.component.scss']
})
export class MundoComponent {
  @Input() mundo!: Mundo;
}
