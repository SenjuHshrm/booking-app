import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rate-and-comment',
  templateUrl: './rate-and-comment.component.html',
  styleUrls: ['./rate-and-comment.component.scss']
})
export class RateAndCommentComponent implements OnInit, OnDestroy {

  rating: number = 0;          
  hoveredRating: number = 0;    
  maxRating: number = 5;       
  stars: boolean[] = Array(this.maxRating).fill(false); 

  publicComments: string = '';
  privateFeedback: string = '';


  constructor(

    public dialogRef: MatDialogRef<RateAndCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {

  }

  ngOnInit(): void {
 
  }

  ngOnDestroy(): void {
 
  }

  closeDialog(): void {
    this.dialogRef.close();
  }



  rate(star: number): void {
    this.rating = star;
  }


  hoverRating(star: number): void {
    this.hoveredRating = star;
  }


  submitReview(): void {
    const reviewData = {
      rating: this.rating,
      publicComments: this.publicComments,
      privateFeedback: this.privateFeedback
    };
    console.log(reviewData);

  }

  }

  

