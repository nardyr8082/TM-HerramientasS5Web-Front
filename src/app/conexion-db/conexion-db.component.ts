import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  Form
} from '@angular/forms'
//Servicios
import { ApiService } from '../servicios/api/api.service'
import { configBdI } from '../modelos/configBd.interface'
//Dialogos
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogoComponent } from '../dialogo/dialogo.component'
import { log } from 'util'
@Component({
  selector: 'app-conexion-db',
  templateUrl: './conexion-db.component.html',
  styleUrls: ['./conexion-db.component.css']
})
export class ConexionDBComponent implements OnInit {
  //Variables Conf BD
  valueServidor: string = ''
  valueBD: string = ''
  valueUserServe: string = ''
  valueIntancia: string = ''
  //Varianbles del diagolo
  dialogR: any
  requestCheckConecction: boolean = false
  resultCheckConecction: string = ''
  //Variables deshabilita botones despues d importar
  disableBotton: boolean = false

  

  configBDForm = new FormGroup({
    server: new FormControl(
      localStorage.getItem('serverDB'),
      Validators.required
    ),
    database: new FormControl(
      localStorage.getItem('nameDB'),
      Validators.required
    ),
    userName: new FormControl(
      localStorage.getItem('userDB'),
      Validators.required
    ),
    password: new FormControl(this.api.DesEncriptar(localStorage.getItem('passDB'), 1234), Validators.required),
    instanceName: new FormControl(localStorage.getItem('intanceDB'))
  })

  hide: boolean = true
  //Evento enviado al padre
  @Output() formEvent = new EventEmitter<any>()

  constructor (private api: ApiService, public dialog: MatDialog) {}

  ngOnInit (): void {
 
    /*   this.configBDForm.value['server']=localStorage.getItem('serverDB')
    this.configBDForm.value['database']=localStorage.getItem('nameDB')
    this.configBDForm.value['userName']=localStorage.getItem('userDB')
    this.configBDForm.value['password']=this.DesEncriptar(localStorage.getItem('passDB'),1234); 
    this.configBDForm.value['instanceName']=localStorage.getItem('intanceDB')
    console.log(this.configBDForm)
    console.log(this.configBDForm.value['server']) */
  }

  HabilitarBtn () {
    this.disableBotton = false
  }
  //Chequea conf del servidor d bd
  onCheckConection (form: any) {
    form['server'] = form['server'] === '.' ? 'localhost' : form['server']
    form['password'] = form['password']
    localStorage.setItem('serverDB', form['server'])
    //console.log(form)
    this.requestCheckConecction = true
    let dialogo: string = 'Conexion'
    this.api.SendParametros(form).subscribe(
      data => {
        this.resultCheckConecction = data
        if (this.resultCheckConecction !== '')
          this.requestCheckConecction = false
        this.openDialog(this.resultCheckConecction, dialogo)
      //  console.log(this.resultCheckConecction)
        if (this.resultCheckConecction == 'Conexion correcta..') {
          localStorage.setItem('serverDB', form['server'])
          localStorage.setItem('intanceDB', form['instanceName'])
          localStorage.setItem('nameDB', form['database'])
          localStorage.setItem('userDB', form['userName'])
          localStorage.setItem(
            'passDB',
            this.api.Encriptar(form['password'], 1234)
          )

          this.formEvent.emit(this.resultCheckConecction)
        }
      },
      error => {
     //   console.log(error)
        this.resultCheckConecction = `Servidor no encontrado: ${error.message}`
        if (this.resultCheckConecction !== '')
          this.requestCheckConecction = false
        this.openDialog(this.resultCheckConecction, dialogo)
      }
    )
  }

  limpiarConexcion (form: any) {
    if (form.status === 'VALID') {
      form.reset()
      this.formEvent.emit(form)
    }
  }

  openDialog (
    rs: string /*lo q dice el dialogo*/,
    d: string /*el tipo de dialogo*/
  ) {
    this.dialogR = this.dialog.open(DialogoComponent, {
      data: {
        rs,
        d
      }
    })
  }
}
