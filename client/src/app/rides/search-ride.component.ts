import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Ride} from './ride';
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";


@Component({
  selector: 'search-ride.component',
  templateUrl: 'search-ride.component.html',
})

export class SearchRideComponent implements OnInit {
  searchRideForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { ride: Ride }, private fb: FormBuilder) {
  }

  search_ride_validation_messages = {
    'destination': [
      {type: 'required', message: 'Destination is required'},
      {type: 'minlength', message: 'Destination must be at least 2 characters long'},
      {type: 'maxlength', message: 'Destination cannot be more than 100 characters long'},
      {type: 'pattern', message: 'Destination must contain only numbers, letters, dashes, underscores, and dots'}
    ]
  }

  createForms() {
    this.searchRideForm = this.fb.group({
      destination: new FormControl('destination', Validators.compose([

        Validators.pattern('^[ a-zA-Z0-9.]+$'),
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.required
      ]))
    })
  }
  ngOnInit() {
    this.createForms();
  }
}
