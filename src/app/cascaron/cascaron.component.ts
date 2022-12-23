import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

//Dialogos
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogoComponent } from '../dialogo/dialogo.component';

@Component({
  selector: 'app-cascaron',
  templateUrl: './cascaron.component.html',
  styleUrls: ['./cascaron.component.css']
})
export class CascaronComponent implements OnInit {
  showFiller = true;
  panelOpenState = true;
  titulo_component: string = '';
  ruta_component: any = '';
//Varianbles del dialogo
dialogR: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private rutas: Router,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.ruta_component = this.route.snapshot.paramMap.get('id');
   // console.log(this.ruta_component);
    this.ruta_component.toString();
    this.validarPassword()

  }
  validarPassword() {
    if ((localStorage.getItem('password') == '') && (this.ruta_component !== 'cliente')) this.rutas.navigate(['login']);
  }

  exit() {
    this.rutas.navigate(['login']);
    localStorage.setItem('password', '');
    localStorage.setItem('serverDB','');
    localStorage.setItem('intanceDB','');
    localStorage.setItem('nameDB','');
    localStorage.setItem('userDB','');
    localStorage.setItem('passDB','');
  }

  openDialog(d: string /*el tipo de dialogo*/) {
    this.dialogR = this.dialog.open(DialogoComponent, {
      maxWidth: '350px',
      minWidth: '100px',
      maxHeight: '100vh',
      width: '100%',
      data: {
        d
      }
    });

  }


}
