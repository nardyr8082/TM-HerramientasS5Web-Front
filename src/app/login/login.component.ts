import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  hide = true;
  selected = 0;
  pass: string = '';
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.validarPassword();
  }

  validarPassword(){
    if(localStorage.getItem('')) this.router.navigate(['login']);
    return this.router.navigate(['login'])
  }

onLogin(){
  if(this.passwordFormControl.value=='Siscont5*')
  {
    this.router.navigate(['/cascaron/soporte']);
    localStorage.setItem('password',this.passwordFormControl.value);
  }
  
}

}



