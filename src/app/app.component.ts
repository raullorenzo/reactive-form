import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { GLOBAL } from '../entities/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title;
  public rForm: FormGroup;
  public post: any;
  public description: string;
  public name: string;
  public email: string;
  public phone: number;
  public titleAlert: string;
  public titleAlertPhone: string;
  public titleAlertEmail: string;
  public messageName: string;
  public messageCheckBox: string;
  public messageInfo: string;
  // public valueStatus: boolean;

  constructor(private fb: FormBuilder) {

    this.title = GLOBAL.title;
    this.description  = '';
    this.name = '';
    this.email = '';
    this.titleAlert = GLOBAL.titleAlertRequired;
    this.messageName = GLOBAL.messageDescription;
    this.messageCheckBox = GLOBAL.messageCheckBox;
    this.messageInfo = GLOBAL.messageInfo;
    this.titleAlertPhone = GLOBAL.titleAlertPhone;
    this.titleAlertEmail = GLOBAL.titleAlertEmail;

    this.rForm = fb.group({
      'name': [null, Validators.required],
      'email': [null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      'phone': [null, Validators.compose([Validators.required, Validators.pattern(/^[679]{1}[0-9]{8}$/)])],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'validate' : false
    });

  }

  ngOnInit() {
    this.validateForm();
  }

  validateForm() {
    console.log(this.rForm.get('validate').value);
    this.rForm.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate) {
          this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = GLOBAL.titleAlertMinName;
        } else {
          this.rForm.get('name').setValidators(Validators.required);
          this.titleAlert = GLOBAL.titleAlertRequired;
        }
        this.rForm.get('name').updateValueAndValidity();
      },
      (error) => {
        console.log(<any>error);
      }
    );
    this.rForm.reset();
  }

  changeValue(value) {
    console.log(value.value);
    // this.valueStatus = value.value;
  }

  addPost(post) {
    this.description = post.description;
    this.name = post.name;
    this.phone = post.phone;
    this.email = post.email;
  }

}
