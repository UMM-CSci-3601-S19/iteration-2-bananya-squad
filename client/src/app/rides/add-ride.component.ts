import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Ride} from './ride';
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";



@Component({
  selector: 'add-ride.component',
  templateUrl: 'add-ride.component.html',
})

export class AddRideComponent implements OnInit {
  addRideForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { ride: Ride }, private fb: FormBuilder) {
  }

  add_ride_validation_messages = {
    'destination': [
      {type: 'required', message: 'Destination is required'},
      {type: 'minlength', message: 'Destination must be at least 2 characters long'},
      {type: 'maxlength', message: 'Destination cannot be more than 100 characters long'},
      {type: 'pattern', message: 'Destination must contain only numbers, letters, dashes, underscores, and dots'}
    ],
    'origin': [
      {type: 'required', message: 'Origin is required'},
      {type: 'minlength', message: 'Origin must be at least 2 characters long'},
      {type: 'maxlength', message: 'Origin cannot be more than 100 characters long'},
      {type: 'pattern', message: 'Origin must contain only numbers, letters, dashes, underscores, and dots'}
    ],
    'departureDate': [
      {type: 'required', message: 'Departure Date is required'},
    ],
    'departureTime': [
      {type: 'required', message: 'Departure Time is required'},
    ],
    'notes': [
      {type: 'required', message: 'Notes is required'},
      {type: 'minlength', message: 'Notes must be at least 2 characters long'},
      {type: 'maxlength', message: 'Notes cannot be more than 150 characters long'},
      {type: 'pattern', message: 'notes must contain only english and certain symbols'}
    ]
  };

  createForms() {
    this.addRideForm = this.fb.group({
      destination: new FormControl('destination', Validators.compose([

        Validators.pattern('^[ a-zA-Z0-9.]+$'),
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.required
      ])),
      origin: new FormControl('origin', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.required,
        Validators.pattern('^[ a-zA-Z0-9.]+$')
      ])),
      departureDate: new FormControl('departureDate', Validators.compose([
        Validators.required
        ])),
      departureTime: new FormControl('departureTime', Validators.compose([
        Validators.required
      ])),
      notes: new FormControl('notes', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(150),
        Validators.required,
        Validators.pattern('^[?\'"></!@#$%^&*()_+= a-zA-Z0-9:._-]+$')
      ]))

    })
  }

  ngOnInit() {
    this.createForms();
  }

}
