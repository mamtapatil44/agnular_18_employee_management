import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj ={
    email:'',
    password:''
  }
  router = inject(Router)

  onLogin(){
  if(this.loginObj.email === "mamta" && this.loginObj.password === '12345'){
    localStorage.setItem("user",this.loginObj.email)
  this.router.navigateByUrl('/master')
  }else{
    alert("Wrong credentials.....")
  }
  }
}
