import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  mainForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService) { }


  ngOnInit(): void {
    this.initMainForm()
  }

  private initMainForm() {
    this.mainForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.mainForm.value);
    this.authService.login(this.mainForm.value.email, this.mainForm.value.password);
  }
}
