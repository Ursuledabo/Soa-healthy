import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  mainForm!: FormGroup;
  step1Form!: FormGroup;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  step2Form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
  }

  private initFormControls() {
    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.step1Form = this.formBuilder.group({
      email: this.formBuilder.control('', Validators.required),
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    });
    this.step2Form = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      address: this.formBuilder.control('', Validators.required),
      contact: this.formBuilder.control('', [Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('[0-9]*$')]),
      isMale: this.formBuilder.control('true', Validators.required),
      bloodGroup: this.formBuilder.control('', Validators.required)
    });
  }

  private initMainForm() {
    this.mainForm = this.formBuilder.group({
      step1: this.step1Form,
      step2: this.step2Form
    });
  }

  onSubmit() : void {
    console.log(this.mainForm.value);
  }

  getErrorMessage(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return 'Merci d\'entrer une adresse mail valide';
    } else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
    } else {
      return 'Ce champ contient une erreur';
    }
  }
}
