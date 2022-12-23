import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { DialogoHijoComponent } from './dialogo-hijo/dialogo-hijo.component';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {
  respuesta: string = '';
  tipo_dialogo: string = '';
  //Varianbles del diagoloHijo
  dialogR: any;
  accept = '.txt';
  versionadoForm = new FormGroup({
    version: new FormControl('', [Validators.required, Validators.pattern(/^([0-9\.])*$/)]),
    descripcion: new FormControl(),
    archivo: new FormControl()

  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogoComponent>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
   // console.log(this.data)
    this.respuesta = this.data.rs
    this.tipo_dialogo = this.data.d
  }

  onGenerarVersionado(form: any) {
   // console.log(form);
    let formValues = form.value
    if (form.status === 'VALID') {
      this.dialogR = this.dialog.open(DialogoHijoComponent, {
        data: {
          formValues
        }
      });
    }


  }

  closeDialog() {
    this.dialogRef.close('ok');
  }

}
