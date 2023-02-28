import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private router: Router, private http: HttpClient) { }

  login() {
    const data = { email: this.email, password: this.password };
    this.http.post('/api/login', data).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/home']);
    }, (error) => {
      console.error(error);
    });
  }
}
