import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import {Params, ActivatedRoute } from "@angular/router";
import {Location } from "@angular/common";
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comment } from './../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;
  commentForm: FormGroup;

  // @Input()
  dish:Dish;
  errMess: string;
  dishIds: string[];

  prev:string;
  next:string;

  
  formErrors={
    'name': '',
    'comment':''
  };

  validationMessages = {
    'name': {
      'required': 'Author Name is required.',
      'minlength': 'Author Name must be at least 2 characters long.',
      'maxlength': 'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':  'Comment is required.',
    },
  };
  commentData: any;
  comment:Comment;

  constructor(private dishService: DishService,
    private location: Location,
    private route:ActivatedRoute,private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(dishIds=> this.dishIds=dishIds);
    this.route.params.pipe(switchMap((params: Params)=>this.dishService.getDish(params['id'])))
      .subscribe((dish) => {
        this.dish=dish;
        this.setPrevNext(dish.id);
      },
      errmess=> this.errMess=<any>errmess);
    this.createForm();

  }

  createForm(){
    this.commentForm=this.fb.group({
      name:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      slider: [5],
      comment:['',[Validators.required]]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    debugger;
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

  setPrevNext(dishId: string){
    const index= this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length + index-1)% this.dishIds.length];
    this.next= this.dishIds[(this.dishIds.length+index+1)% this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }

  onSubmit(){
    this.commentData=this.commentForm.value;
    this.comment={
      'comment':this.commentData['comment'],
      'author': this.commentData['name'],
      'rating':this.commentData['slider'],
      'date':new Date().toDateString(),
    }
    this.dish.comments.push(this.comment);
    console.log(this.comment);
    this.commentForm.reset({
      name:'',
      slider: 5,
      comment:''
    });
    // this.commentFormDirective.resetForm();
  }


}
