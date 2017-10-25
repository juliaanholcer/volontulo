import { Component, OnInit } from '@angular/core';

import { OffersService } from './offers.service';
import { Offer } from './offers.model';
import { environment } from '../../environments/environment';

@Component({
  selector: '<volontulo-offers>',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  providers: [OffersService]
})
export class OffersComponent implements OnInit {
  offers: Array<Offer>;

  constructor(private offersService: OffersService) { }

  ngOnInit() {
   this.offersService.getOffers()
    .subscribe(
      offers => {
        this.offers = offers;
        for (let offer of offers) {
              offer.viewUrl = environment.djangoRoot + '/offers/'+ offer.slug + '/'+ offer.id;
        }
      }
    );
  }
}
