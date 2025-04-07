import { Component, OnDestroy, OnInit } from '@angular/core';
import { Credit } from '../../../model/credit';
import { Subscription } from 'rxjs';
import { Movie } from '../../../model/movie';
import { Actor } from '../../../model/actor';
import { CreditService } from '../../../service/credit.service';
import { MovieService } from '../../../service/movie.service';
import { ActorService } from '../../../service/actor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credit-create',
  standalone: false,
  templateUrl: './credit-create.component.html',
  styleUrl: './credit-create.component.css'
})
export class CreditCreateComponent implements OnInit, OnDestroy{
  title: string = "Credit-Create";
  //credit: Credit = new Credit();
  newCredit: Credit = new Credit();
  subscription!: Subscription;
  movies: Movie[] = [];
  actors: Actor[] = [];

  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ){}  
  ngOnInit(): void {
    this.subscription = this.movieSvc.list().subscribe({
      next: (resp) => {
        this.movies = resp;
      },
      error: (err) => {
        console.error(
          "Credit Create Error: error loading movies." + err.message
        );
      },
    });
    this.subscription = this.actorSvc.list().subscribe({
      next: (resp) => {
        this.actors = resp;
      },
      error: (err) => {
        console.error(
          "Credit Create Error: error loading actors" + err.message
        );
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addCredit(): void {
    this.subscription = this.creditSvc.add(this.newCredit).subscribe((resp) => {
      this.router.navigateByUrl("/credit-list");
    });
  }

  compMovie(a: Movie, b: Movie): boolean {
    return a && b && a.id == b.id;
  }

  compActor(a: Actor, b: Actor): boolean {
    return a && b && a.id == b.id;
  }
}
