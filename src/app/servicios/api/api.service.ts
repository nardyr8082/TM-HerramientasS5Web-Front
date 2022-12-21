import { Injectable } from '@angular/core'
import { configBdI } from '../../modelos/configBd.interface'
import { ResponseI } from '../../modelos/response.interface'
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = 'http://localhost:8082/'

  constructor (private http: HttpClient) {}

  SendParametros (form: configBdI): Observable<any> {
    console.log()
    let direccion = this.url + 'loginparambasedatos'
    console.log(this.http.post<HttpResponse<any>>(direccion, form))
    return this.http.post<HttpResponse<any>>(direccion, form)
  }

  ImportarNomenclador (nomJson: any): Observable<any> {
    let dir = this.url + 'importarnomenclador';
    return this.http.post<any>(dir, nomJson)
  }

  OperacionGestionUsuarioAdmin (operacion: any): Observable<any> {
    console.log(operacion);
    
    let direccion = this.url + 'gestuseradmin';
    return this.http.post<HttpResponse<any>>(direccion, operacion)
  }

  Encriptar(value:any,llave:number)
   {
    let M=0;
    let N=0;
    let ValorEntero=0;
    let TextoEncriptado = "";
    let  texto=value;
  for (M = 0; M < texto.length; M=M+1)
      {
      N=M+1;
      ValorEntero = (texto.substring(M,N)).charCodeAt(0) + llave;
      TextoEncriptado = TextoEncriptado + String.fromCharCode(ValorEntero);
      }
      value=''
      
   return TextoEncriptado;
  
  }

  DesEncriptar(value:any,llave:number)
    {
	    let M=0,N=0;
       let ValorEntero=0;
       let TextoDesEncriptado = "";
	let	texto=value;
		for (M = 0; M < texto.length; M=M+1)
        {
		    N=M+1;
            ValorEntero = (texto.substring(M,N)).charCodeAt(0) - llave;
            TextoDesEncriptado = TextoDesEncriptado + String.fromCharCode(ValorEntero);
        }		
        value=''
		return TextoDesEncriptado
		
    }  

}
