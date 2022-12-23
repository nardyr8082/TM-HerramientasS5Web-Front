import { NumberInput } from '@angular/cdk/coercion'
import { StickyDirection } from '@angular/cdk/table'
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import {
  ExcelToJsonWithTemplateService,
  Excel2JsonInput
} from 'excel-to-json-with-template'
//Servicios
import { ApiService } from '../servicios/api/api.service'
import { configBdI } from '../modelos/configBd.interface'
//Dialogos
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogoComponent } from '../dialogo/dialogo.component'
import { log } from 'util'
//Conexion
import { ConexionDBComponent } from '../conexion-db/conexion-db.component'
//Interface to Table
export interface OrganData {
  OrganActivo: number
  OrganCodigo: number
  OrganDescripcion: string
  OrganEI: number
  OrganUI: number
  OrganFechaModif: Date
}
export interface RelacionOrganUnionData {
  OrganCodigo: number
  UnionCodigo: number
  UnionDescripcion: string
  UnionUI: number
  UnionFechaModif: Date
  UnionActivo: Date
}
export interface ReeupData {
  ReeupCod: number
  ReeupNom: string
  ReeupDir: string
  ReeupTelef: number
  ReeupCAE: number
  ReeupOrg: number
  ReeupSub: number
  ReeupNAE: number
  ReeupSiglas: number
  ReeupActivo: number
}
export interface PaisesData {
  PaisCodIntern: number
  PaisDescripcion: string
  PaisCiudadania: string
  PaisSiglas: string
  PaisSeleccionado: string
  PaisBandera: number
  PaisBandera_GXI: number
}
export interface ProvinciaData {
  ProvCod: number
  ProvNombre: string
}
export interface MunicipioData {
  ProvCod: number
  MunicCod: Number
  MunicNombre: string
}
export interface RepartosData {
  TRepartosCodigo: number
  ProvCod: number
  TRepartosNombre: string
  MunicCod: number
}
export interface NitData {
  NITCodigo: number
  NITDescrip: string
  NITReeupCod: number
  NITSiglas: string
  NITDirec: string
  NITDPA: number
  NAECOD: number
  NITSuborCod: number
}

@Component({
  selector: 'app-importar-nomencladores',
  templateUrl: './importar-nomencladores.component.html',
  styleUrls: ['./importar-nomencladores.component.css']
})
export class ImportarNomencladoresComponent implements OnInit, AfterViewInit {
  //varables d las tablas
  archivoControl: FormControl
  accept = '.xls,.xlsx'
  hojasExcels: any[] = []
  selectedHoja: any = ''
  paginado = [5, 10, 20]
  //Varianbles del diagolo
  dialogR: any
  requestCheckConecction: boolean = false
  resultCheckConecction: string = ''
  //Variables deshabilita botones despues d importar
  disableBotton: boolean = true
  // variables configuracion de la conexion
  configdb: any

  hide: boolean = true

  /* Datos tabla */
  displayedColumnsOrgan: any[] = [
    'OrganCodigo',
    'OrganDescripcion',
    'OrganEI',
    'OrganUI',
    'OrganFechaModif',
    'OrganActivo'
  ]
  displayedColumnsRelacionOrganUnion: any[] = [
    'OrganCodigo',
    'UnionCodigo',
    'UnionDescripcion',
    'UnionUI',
    'UnionFechaModif',
    'UnionActivo'
  ]
  displayedColumnsReeup: any[] = [
    'ReeupCod',
    'ReeupNom',
    'ReeupDir',
    'ReeupTelef',
    'ReeupCAE',
    'ReeupOrg',
    'ReeupSub',
    'ReeupNAE',
    'ReeupSiglas',
    'ReeupActivo'
  ]
  displayedColumnsPaises: any[] = [
    'PaisCodIntern',
    'PaisDescripcion',
    'PaisCiudadania',
    'PaisSiglas',
    'PaisSeleccionado',
    'PaisBandera',
    'PaisBandera_GXI'
  ]
  displayedColumnsProvincia: any[] = ['ProvCod', 'ProvNombre']
  displayedColumnsMunicipio: any[] = ['ProvCod', 'MunicCod', 'MunicNombre']
  displayedColumnsRepartos: any[] = [
    'TRepartosCodigo',
    'ProvCod',
    'TRepartosNombre',
    'MunicCod'
  ]
  displayedColumnsNit: any[] = [
    'NITCodigo',
    'NITDescrip',
    'NITReeupCod',
    'NITSiglas',
    'NITDirec',
    'NITDPA',
    'NAECOD',
    'NITSuborCod'
  ]
  /* Los DataSources */
  dataSourceOrgan: MatTableDataSource<OrganData>
  dataSourceRelacionOrganUnionData: MatTableDataSource<RelacionOrganUnionData>
  dataSourceReeup: MatTableDataSource<ReeupData>
  dataSourcePaises: MatTableDataSource<PaisesData>
  dataSourceProvincia: MatTableDataSource<ProvinciaData>
  dataSourceMunicipio: MatTableDataSource<MunicipioData>
  dataSourceRepartos: MatTableDataSource<RepartosData>
  dataSourceNit: MatTableDataSource<NitData>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor (
    private excel2JsonService: ExcelToJsonWithTemplateService,
    private api: ApiService,
    public dialog: MatDialog
  ) {
    this.archivoControl = new FormControl()
    this.dataSourceOrgan = new MatTableDataSource()
    this.dataSourceRelacionOrganUnionData = new MatTableDataSource()
    this.dataSourceReeup = new MatTableDataSource()
    this.dataSourcePaises = new MatTableDataSource()
    this.dataSourceProvincia = new MatTableDataSource()
    this.dataSourceMunicipio = new MatTableDataSource()
    this.dataSourceRepartos = new MatTableDataSource()
    this.dataSourceNit = new MatTableDataSource()
  }

  ngOnInit () {
    this.archivoControl.valueChanges.subscribe((files: any) => {
      //console.log(files);
      const jsonInput: Excel2JsonInput = {
        excelFileHandler: files
      }
      this.excel2JsonService.convertToJson(jsonInput).subscribe(jsonData => {
        this.hojasExcels = jsonData
      })
    })
  }

  receiveMessage ($event: any) {
  //  console.log($event)
    if ($event) {
      this.HabilitarBtn()

      /* console.log(localStorage.getItem('serverDB'))
      console.log(localStorage.getItem('intanceDB'))
      console.log(localStorage.getItem('nameDB'))
      console.log(localStorage.getItem('userDB'))
      console.log(localStorage.getItem('passDB')) */
      this.configdb = {
        server: localStorage.getItem('serverDB'),
        userName: localStorage.getItem('userDB'),
        password: this.api.DesEncriptar(localStorage.getItem('passDB'),1234),
        instanceName: localStorage.getItem('intanceDB'),
        database: localStorage.getItem('nameDB')
      }
      //  this.configdb = $event;
    }
    if ($event.status === 'INVALID') {
      this.disableBotton = true
    }

    //console.log($event)
  }

  HabilitarBtn () {
    this.disableBotton = false
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

  listarNomenclador (sH: any) {
    /* console.log(sH);
    console.log(sH.content); */

    if (sH['name'] == 'ORGANISMO') this.dataSourceOrgan.data = sH.content
    if (sH['name'] == 'RELACION ORG - UNION')
      this.dataSourceRelacionOrganUnionData.data = sH.content
    if (sH['name'] == 'REEUP') this.dataSourceReeup.data = sH.content
    if (sH['name'] == 'PAISES') this.dataSourcePaises.data = sH.content
    if (sH['name'] == 'PROV') this.dataSourceProvincia.data = sH.content
    if (sH['name'] == 'MUNICIPIOS') this.dataSourceMunicipio.data = sH.content
    if (sH['name'] == 'REPARTOS') this.dataSourceRepartos.data = sH.content
    if (sH['name'] == 'NIT') this.dataSourceNit.data = sH.content
  }

  ngAfterViewInit () {
    this.dataSourceOrgan.paginator = this.paginator
    this.dataSourceOrgan.sort = this.sort

    this.dataSourceRelacionOrganUnionData.paginator = this.paginator
    this.dataSourceRelacionOrganUnionData.sort = this.sort

    this.dataSourceReeup.paginator = this.paginator
    this.dataSourceReeup.sort = this.sort

    this.dataSourcePaises.paginator = this.paginator
    this.dataSourcePaises.sort = this.sort

    this.dataSourceProvincia.paginator = this.paginator
    this.dataSourceProvincia.sort = this.sort

    this.dataSourceMunicipio.paginator = this.paginator
    this.dataSourceMunicipio.sort = this.sort

    this.dataSourceRepartos.paginator = this.paginator
    this.dataSourceRepartos.sort = this.sort

    this.dataSourceNit.paginator = this.paginator
    this.dataSourceNit.sort = this.sort
  }

  applyFilter (event: Event, sH: any) {
    const filterValue = (event.target as HTMLInputElement).value
    if (sH['name'] == 'ORGANISMO') {
      this.dataSourceOrgan.filter = filterValue.trim().toLowerCase()
      if (this.dataSourceOrgan.paginator)
        this.dataSourceOrgan.paginator.firstPage()
    }
    if (sH['name'] == 'RELACION ORG - UNION') {
      this.dataSourceRelacionOrganUnionData.filter = filterValue
        .trim()
        .toLowerCase()
      if (this.dataSourceRelacionOrganUnionData.paginator)
        this.dataSourceRelacionOrganUnionData.paginator.firstPage()
    }
    if (sH['name'] == 'REEUP') {
      this.dataSourceReeup.filter = filterValue.trim().toLowerCase()
      if (this.dataSourceReeup.paginator)
        this.dataSourceReeup.paginator.firstPage()
    }
    if (sH['name'] == 'PAISES') {
      this.dataSourcePaises.filter = filterValue.trim().toLowerCase()
      if (this.dataSourcePaises.paginator)
        this.dataSourcePaises.paginator.firstPage()
    }
    if (sH['name'] == 'PROV') {
      this.dataSourceProvincia.filter = filterValue.trim().toLowerCase()
      if (this.dataSourceProvincia.paginator)
        this.dataSourceProvincia.paginator.firstPage()
    }
    if (sH['name'] == 'MUNICIPIOS') {
      this.dataSourceMunicipio.filter = filterValue.trim().toLowerCase()
      if (this.dataSourceMunicipio.paginator)
        this.dataSourceMunicipio.paginator.firstPage()
    }
    if (sH['name'] == 'REPARTOS') {
      this.dataSourceRepartos.filter = filterValue.trim().toLowerCase()
      if (this.dataSourceRepartos.paginator)
        this.dataSourceRepartos.paginator.firstPage()
    }
    if (sH['name'] == 'NIT') {
      this.dataSourceRepartos.filter = filterValue.trim().toLowerCase()
      if (this.dataSourceRepartos.paginator)
        this.dataSourceRepartos.paginator.firstPage()
    }
  }

  importarNomenclador (sh: any) {
    if (sh == '') {
      let rs = 'Importe el Doc, y seleccione el Nomenclador a importar'
      let d = 'ImportarNomVacio'
      this.openDialog(rs, d)
    } else {
      if (this.selectedHoja['name'] == 'REEUP') {
        let content = sh['content']
        for (let i = 0; i < content.length; i++) {
          content[i]['ReeupNAE'] =
            content[i]['ReeupNAE'] == 'NULL' ? 0 : content[i]['ReeupNAE']
        }
      }

      if (this.selectedHoja['name'] == 'PAISES') {
        let content = sh['content']
        for (let i = 0; i < content.length; i++) {
          content[i]['PaisCodIntern'] = content[i]['PaisCodIntern'].toString()
          //content[i]['PaisBandera'] = (content[i]['PaisBandera'] == 'NULL') ? null : content[i]['PaisBandera'];
          //content[i]['PaisBandera_GXI'] = (content[i]['PaisBandera_GXI'] !== 'NULL') ? null : content[i]['PaisBandera_GXI'];
        }
      }
      if (this.selectedHoja['name'] == 'MUNICIPIOS') {
        let content = sh['content']
        for (let i = 0; i < content.length; i++) {
          content[i]['MunicCod'] = parseInt(content[i]['MunicCod'])
        }
      }
      if (this.selectedHoja['name'] == 'NIT') {
        let content = sh['content']

        for (let i = 0; i < content.length; i++) {
          content[i]['NITCodigo'] = content[i]['NITCodigo'].toString()
          content[i]['NITReeupCod'] =
            content[i]['NITReeupCod'] !== undefined
              ? content[i]['NITReeupCod'].toString()
              : content[i]['NITReeupCod']
          content[i]['NITDPA'] =
            content[i]['NITDPA'] !== undefined
              ? content[i]['NITDPA'].toString()
              : content[i]['NITDPA']
          content[i]['NITSiglas'] =
            content[i]['NITSiglas'] === undefined
              ? 'NULL'
              : content[i]['NITDPA']
          content[i]['NITDPA'] =
            content[i]['NITDPA'] !== undefined
              ? content[i]['NITDPA'].toString()
              : content[i]['NITDPA']
        }
      }

      let rs = `Desea importar el nomenclador: ${sh['name']}`
      let d = 'ImportarNom'
      this.openDialog(rs, d)
      this.dialogR.afterClosed().subscribe((data: any) => {
        if (data) {
          this.requestCheckConecction = true

          sh['configdb'] = this.configdb
         // console.log(sh)
          this.api.ImportarNomenclador(sh).subscribe((data: any) => {
       //     console.log(data)

            this.resultCheckConecction = data
            let dialogo = 'ImportadoNom'

            if (this.resultCheckConecction !== '')
              this.requestCheckConecction = false
            this.openDialog(this.resultCheckConecction, dialogo)
            if (this.resultCheckConecction === 'Importado Nomenclador OK') {
              if (this.selectedHoja['name'] === 'PROV') {
                this.dataSourceProvincia.data = []
              }
              if (this.selectedHoja['name'] === 'ORGANISMO') {
                this.dataSourceOrgan.data = []
              }
              if (this.selectedHoja['name'] === 'RELACION ORG - UNION') {
                this.dataSourceRelacionOrganUnionData.data = []
              }
              if (this.selectedHoja['name'] === 'REEUP') {
                this.dataSourceReeup.data = []
              }
              if (this.selectedHoja['name'] === 'PAISES') {
                this.dataSourcePaises.data = []
              }
              if (this.selectedHoja['name'] === 'MUNICIPIOS') {
                this.dataSourceMunicipio.data = []
              }
              if (this.selectedHoja['name'] === 'REPARTOS') {
                this.dataSourceRepartos.data = []
              }
              if (this.selectedHoja['name'] === 'NIT') {
                this.dataSourceNit.data = []
              }
              this.disableBotton = true
            }
          })
        }
      })
    }
    //console.log(sh);
  }
}
