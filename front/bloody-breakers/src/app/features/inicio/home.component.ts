import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
constructor(private toastr: ToastrService) {}

ngOnInit() {
  this.toastr.success('Toastr funcionando', 'Éxito');
}

}
