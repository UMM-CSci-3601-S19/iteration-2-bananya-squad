import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Vehicle} from "./vehicle";
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";


@Component({
  selector: 'add-vehicle.component',
  templateUrl: 'add-vehicle.component.html',
})

export class AddVehicleComponent implements OnInit {
  addVehicleForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { vehicle: Vehicle }, private fb: FormBuilder) {
  }

  add_vehicle_validation_messages = {
    'model': [
      {type: 'required', message: 'Model is required'},
      {type: 'minlength', message: 'Model must be at least 2 characters long'},
      {type: 'maxlength', message: 'Model cannot be more than 50 characters long'},
      {type: 'pattern', message: 'Model must contain only numbers, letters and dashes'}
    ],
    'color': [
      {type: 'required', message: 'Color is required'},
      {type: 'minlength', message: 'Color must be at least 2 characters long'},
      {type: 'maxlength', message: 'Color cannot be more than 25 characters long'},
      {type: 'pattern', message: 'Color must contain only letters'}
    ],
    'mpg': [
      {type: 'minlength', message: 'Mpg must be at least 2 characters long'},
      {type: 'maxlength', message: 'Mpg cannot be more than 3 characters long'},
      {type: 'pattern', message: 'Mpg must contain only numbers'}
    ]
  };


  createForms() {
    this.addVehicleForm = this.fb.group({
      model: new FormControl('model', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.required,
        Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s]+$(\\.0-9+)?')
      ])),
      color: new FormControl('color', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern('[A-Za-z A-Za-z]*')
      ])),
      mpg: new FormControl('mpg', Validators.compose([
        Validators.minLength(0),
        Validators.maxLength(3),
        Validators.pattern('[0-9]*'),
      ]))
    })
  }

  ngOnInit() {
    this.createForms();
  }
}
