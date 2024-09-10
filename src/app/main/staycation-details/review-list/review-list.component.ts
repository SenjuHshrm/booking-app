import { Component, inject, Input, OnInit } from '@angular/core';
import { RateAndCommentComponent } from '../rate-and-comment/rate-and-comment.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StaycationService } from 'src/app/services/staycation.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Review } from 'src/app/interfaces/review';
import { Fullname } from 'src/app/interfaces/profile';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { Address } from '../../accounts-settings/account-verification/account-verification.component';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit {
  @Input() public didCheckOut: boolean = false;
  @Input() public details: any;

  public initialLoading: boolean = true;
  public seeMoreLoading: boolean = false;

  public reviews: Review[] = [];
  public ratings: null[] = Array.from(Array(5));
  public total: number = 0;
  public hasNextPage: boolean = false;
  private currentPage: number = 1;
  public limit: number = 15;

  private _subs: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);
  private staycationId: string = '';

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private _staycation: StaycationService,
    private _util: BasicUtilService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.staycationId = <string>params.get('id');
      this.initialLoading = true;
      this._getReviewListing(this.limit, this.currentPage);
    });
  }

  private _getReviewListing(l: number, p: number): void {
    this._subs.add(
      this._staycation.getReviewList(this.staycationId, l, p).subscribe({
        next: (res) => {
          this.reviews = [
            ...(res.list.map((review: Review) => ({
              ...review,
              expand: false,
            })) as Review[]),
            ...this.reviews,
          ];
          this.total = res.total as number;
          this.hasNextPage = (p - 1) * l + l < this.total;
          this.initialLoading = false;
          this.seeMoreLoading = false;
        },
        error: ({ error }) => {
          this._snack.open(error.code || 'Failed to get reviews.', '', {
            duration: 1000,
          });
          this.initialLoading = false;
          this.seeMoreLoading = false;
        },
      })
    );
  }

  public addrateComment(): void {
    const create = this.dialog.open(RateAndCommentComponent, {
      panelClass: 'custom-addrate-dialog',
      data: {
        host: this.details.host,
        staycationId: this.details._id,
      },
    });

    create.afterClosed().subscribe((res) => {
      if (res.success) {
        this.reviews.unshift(res.data as Review);
        this.total++;
      }
    });
  }

  seeMoreReviewText(_id: string) {
    const ind = this.reviews.findIndex((e: Review) => e._id === _id);
    this.reviews[ind].expand = !this.reviews[ind].expand;
  }

  setFullname(fullName: Fullname): string {
    return this._util.constructName(fullName);
  }

  setSrc(src: string): string {
    const haveGravatar = src.includes('gravatar.com');
    return haveGravatar ? src : this._util.setImgUrl(src);
  }

  setAddress(address: Address): string {
    return this._util.constructAddress(address);
  }

  seeMoreReviews(): void {
    if (this.initialLoading || this.seeMoreLoading) return;
    this.currentPage++;
    this.seeMoreLoading = true;
    this._getReviewListing(this.limit, this.currentPage);
  }

  get reviewCount(): string {
    return `${this.total} review${this.total > 1 ? 's' : ''}`;
  }
}
