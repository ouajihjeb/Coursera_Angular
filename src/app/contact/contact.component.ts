import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';

import { Feedback, ContactType } from '../shared/feedback';
import { switchMap } from 'rxjs/operators';

//import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FeedbackService } from '../services/feedback.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  Feedbackcopy: Feedback;

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbacksub = null;
  showForm = true;
  contactType = ContactType;
  errMess: string;

  @ViewChild('fform') feedbackFormDirective;



  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,private feedbackservice: FeedbackService) {

    this.createForm();
   }

  ngOnInit(): void {


  }


  createForm() {

    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
    lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
    telnum: ['', [Validators.required, Validators.pattern] ],
    email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''


    });
    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }



  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };



  

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }



          
  




  onSubmit() {
    this.feedback = this.feedbackForm.value;
    
    console.log(this.feedback);
    this.showForm=false;
    this.feedbackservice.SubmitFeedback(this.feedback)
      .subscribe(feedback => {
        this.feedbacksub = feedback; 
        this.feedback = null;
        setTimeout(() => { this.feedbacksub = null; this.showForm = true; }, 5000);
      },
      error => console.log(error.status, error.message));
  this.feedbackForm.reset({
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contacttype: 'None',
    message: ''
  });
  this.feedbackFormDirective.resetForm();
}
}
