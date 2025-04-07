import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Credit } from '../../../model/credit';
import { CreditService } from '../../../service/credit.service';
import { Movie } from '../../../model/movie';
import { Actor } from '../../../model/actor';
import { ActorService } from '../../../service/actor.service';
import { MovieService } from '../../../service/movie.service';

@Component({
  selector: 'app-credit-edit',
  standalone: false,
  templateUrl: './credit-edit.component.html',
  styleUrl: './credit-edit.component.css'
})
export class CreditEditComponent implements OnInit, OnDestroy{
  title: string = 'Credit-Edit';
  credit: Credit = new Credit();
  creditId!: number;
  subscription!: Subscription;
  movies: Movie[] = [];
  actors: Actor[] = [];

  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get the creditId from the URL
    this.actRoute.params.subscribe((parms) => {
      this.creditId = parms['id'];
      // get the credit for the id
      this.subscription = this.creditSvc.getById(this.creditId).subscribe({
        next: (resp) => {
          this.credit = resp;
        },
        error: (err) => {
          console.log('Error retrieving credit: ', err);
        },
      });
    });
    this.subscription = this.movieSvc.list().subscribe({
      next: (resp) => {
        this.movies = resp;
      },
      error: (err) => {
        console.error(
          "Credit Edit Error: error loading movies." + err.message
        );
      },
    });
    this.subscription = this.actorSvc.list().subscribe({
      next: (resp) => {
        this.actors = resp;
      },
      error: (err) => {
        console.error(
          "Credit Edit Error: error loading actors." + err.message
        );
      },
    });
    //throw new Error('Method not implemented.');
  }

  save() {
    this.creditSvc.update(this.credit).subscribe({
      next: (resp) => {
        this.credit = resp;
        this.router.navigateByUrl('/credit-list');
      },
      error: (err) => {
        console.log('error saving credit', err);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compMovie(a: Movie, b: Movie): boolean {
    return a && b && a.id == b.id;
  }

  compActor(a: Actor, b: Actor): boolean {
    return a && b && a.id == b.id;
  }
}
