import { FeedbackService } from './../services/feedback.service';
import { Feedback, ContactType } from './../shared/feedback';
import { Component, OnInit, createPlatformFactory, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display:block'

  },
  animations:[
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType=ContactType;
  errMess: string="";
  submitting: boolean=false;
  feedbackResult:Feedback;
  showFeedback:boolean=false;



  formErrors={
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required':  'Email is required.',
      'email':   'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder,
      private feedbackService: FeedbackService) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm(){
    this.feedbackForm=this.fb.group({
      firstname:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum:[0,[Validators.required, Validators.pattern]],
      email:['',[Validators.required, Validators.email]],
      agree: false,
      contactType: 'None',
      message:''
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }
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

  onSubmit(){
    this.feedback=this.feedbackForm.value;
    this.submitting=true;
    console.log(this.feedback);
    this.feedbackService.submitFeedback(this.feedback).subscribe(
      feedback=> {this.feedbackResult=feedback;
      this.submitting=false;
      this.showFeedback=true;
      setTimeout(()=>{
        this.showFeedback=false;
      },3000);},
      errmess=> {this.errMess=errmess,
      this.submitting=false;});
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum: 0,
      email: '',
      agree: false,
      contactType:'None',
      message:''
    });
    this.feedbackFormDirective.resetForm();
  }

}
