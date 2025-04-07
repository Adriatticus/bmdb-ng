import { Component } from '@angular/core';
import { Actor } from '../../../model/actor';
import { Subscription } from 'rxjs';
import { ActorService } from '../../../service/actor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor-detail',
  standalone: false,
  templateUrl: './actor-detail.component.html',
  styleUrl: './actor-detail.component.css'
})
export class ActorDetailComponent {
  title: string = 'Actor-Detail';
  actorId!: number;
  actor!: Actor;
  subscription!: Subscription;

  constructor(
    private actorSvc: ActorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // get the actorId from the URL
    this.actRoute.params.subscribe((parms) => {
      this.actorId = parms['id'];
      // get the actor for the id
      this.subscription = this.actorSvc.getById(this.actorId).subscribe({
        next: (resp) => {
          this.actor = resp;
        },
        error: (err) => {
          console.log('Error retrieving actor: ', err);
        },
      });
    });
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete() {
    this.actorSvc.delete(this.actorId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/actor-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
