import { Component, OnInit } from '@angular/core'
import { ConexionDBComponent } from '../conexion-db/conexion-db.component'
import {
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  Form
} from '@angular/forms'
import { ApiService } from '../servicios/api/api.service'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogoComponent } from '../dialogo/dialogo.component'

interface Operaciones {
  value: string
  viewValue: string
}

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  //configuracion de conexion
  configDB: any=''
  selectedValue: string = ''
  loading: boolean = false
  dialogoR: any
  formConecDB: any
  disablebtn: boolean = false
  //formulario
  gestionUsuarioAdminForm = new FormGroup({
    operacionSelected: new FormControl('', Validators.required)
  })

  constructor (private api: ApiService, public dialog: MatDialog) {}

  operaciones: Operaciones[] = [
    { value: 'admin', viewValue: 'Actualizar contraseña' },
    { value: 'desbloquear', viewValue: 'Desbloquear usuarios' }
  ]

  ngOnInit (): void {
   // console.log(this.selectedValue)
  }

  receiveMessage (event: any) {
   // this.formConecDB = event
  }

  onSendOperacion (form: any) {
    this.configDB = {
      server: localStorage.getItem('serverDB'),
      userName: localStorage.getItem('userDB'),
      password: this.api.DesEncriptar(localStorage.getItem('passDB'), 1234),
      instanceName: localStorage.getItem('intanceDB'),
      database: localStorage.getItem('nameDB')
    }
    form['configDB'] = this.configDB


    if ( form['operacionSelected'] !== undefined && this.configDB !== '')
     {
      let rs = `Decea ejecutar la operacion: ${form['operacionSelected']}?`
      let d = `Gestion Usuario`
      this.OpenDialogo(rs, d)
      this.dialogoR.afterClosed().subscribe((data: string) => {
        if (data === 'ok') {
          this.loading = true
          this.api.OperacionGestionUsuarioAdmin(form).subscribe({
            next: data => {
          //    console.log(data)
              this.OpenDialogo(data, 'Respuesta Gestion Usuario')
              this.loading = false
              this.disablebtn = false
            },
            error: err => {
          //    console.log(err)
              this.OpenDialogo(err.message, 'Respuesta Gestion Usuario')
              this.loading = false
            }
          })
        }
      })
    }
  }

  OpenDialogo (
    rs: string /*lo q dice el dialogo*/,
    d: string /*el tipo de dialogo*/
  ) {
    this.dialogoR = this.dialog.open(DialogoComponent, {
      data: {
        rs,
        d
      }
    })
  }
}
