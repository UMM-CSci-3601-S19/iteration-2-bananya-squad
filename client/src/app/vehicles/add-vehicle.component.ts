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
    'year': [
      {type: 'required', message: 'Year is required'},
      {type: 'minlength', message: 'Year must be at least 2 characters long'},
      {type: 'maxlength', message: 'Year cannot be more than 4 characters long'},
      {type: 'pattern', message: 'Year must contain only numbers'}
    ],
    'model': [
      {type: 'required', message: 'Model is required'},
      {type: 'minlength', message: 'Model must be at least 2 characters long'},
      {type: 'maxlength', message: 'Model cannot be more than 50 characters long'},
      {type: 'pattern', message: 'Model must contain only numbers, letters and dashes'}
    ],
    'type': [
      {type: 'required', message: 'Type is required'},
      {type: 'minlength', message: 'Type must be at least 2 characters long'},
      {type: 'maxlength', message: 'Type cannot be more than 100 characters long'},
      {type: 'pattern', message: 'Type must contain only numbers, letters, dashes, underscores, and dots'}
    ],
    'color': [
      {type: 'required', message: 'Color is required'},
    ],
    'condition': [
      {type: 'required', message: 'Condition is required'},
    ],
    'engine': [
      {type: 'required', message: 'Engine is required'},
      {type: 'minlength', message: 'Engine must be at least 2 characters long'},
      {type: 'maxlength', message: 'Engine cannot be more than 150 characters long'},
      {type: 'pattern', message: 'Engine must contain only english and certain symbols'}
    ],
    'weight': [
      {type: 'required', message: 'Weight is required'},
      {type: 'minlength', message: 'Weight must be at least 2 characters long'},
      {type: 'maxlength', message: 'Weight cannot be more than 4 characters long'},
      {type: 'pattern', message: 'Weight must contain only english and certain symbols'}
    ],
    'mpg': [
      {type: 'required', message: 'Mpg is required'},
      {type: 'minlength', message: 'Mpg must be at least 2 characters long'},
      {type: 'maxlength', message: 'Mpg cannot be more than 4 characters long'},
      {type: 'pattern', message: 'Mpg must contain only english and certain symbols'}
    ]
  };


  createForms() {
    this.addVehicleForm = this.fb.group({
      year: new FormControl('year', Validators.compose([

        Validators.pattern('^[0-9]'),
        Validators.minLength(2),
        Validators.maxLength(4),
        Validators.required
      ])),
      model: new FormControl('model', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.required,
        Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s]+$(\\.0-9+)?')
      ])),
      type: new FormControl('type', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.required,
        Validators.pattern('^[ a-zA-Z0-9.]+$')
      ])),
      color: new FormControl('color', Validators.compose([
        Validators.required
      ])),
      condition: new FormControl('condition', Validators.compose([
        Validators.required
      ])),
      engine: new FormControl('engine', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(150),
        Validators.required,
        Validators.pattern('^[?\'"></!@#$%^&*()_+= a-zA-Z0-9:._-]+$')
      ])),
      weight: new FormControl('weight', Validators.compose([

        Validators.pattern('^[0-9]'),
        Validators.minLength(2),
        Validators.maxLength(4),
        Validators.required
      ])),
      mpg: new FormControl('mpg', Validators.compose([

        Validators.pattern('^[0-9]'),
        Validators.minLength(2),
        Validators.maxLength(4),
        Validators.required
      ]))
    })
  }

  ngOnInit() {
    this.createForms();
  }
}
