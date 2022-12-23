import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { log } from 'util';
@Component({
  selector: 'app-dialogo-hijo',
  templateUrl: './dialogo-hijo.component.html',
  styleUrls: ['./dialogo-hijo.component.css']
})
export class DialogoHijoComponent implements OnInit {
  version:any;
  constructor(    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogoHijoComponent>) { }
  
  ngOnInit(): void {
   // console.log(this.data);
    this.version=this.data.formValues['version']
    
    
  }

  CompilarVer(){
    let contenido='Este es el contenido del archivo';
    let nombre='VerSiscont5.exe';
    const a = document.createElement("a");
        const archivo = new Blob([contenido], { type: 'exe' });
        const url = URL.createObjectURL(archivo);
        a.href = url;
        a.download = nombre;
        a.click();
        URL.revokeObjectURL(url);
  }

}
