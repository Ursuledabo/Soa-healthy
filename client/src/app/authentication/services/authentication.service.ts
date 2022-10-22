import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const res =  this.http.post("http://localhost:3000/patient/login", {email, password});
    console.log(res);
  }


  signup(email: string, password: string, name: string, address: string, contact: string, isMale: boolean, bloodGroup: string) {
    const res = this.http.post('http://localhost:3000/patient/signup', {email, password, name, address, contact, isMale, bloodGroup});
    console.log(res);
  }
}
