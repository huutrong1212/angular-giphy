import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {filter, from, map, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {tuiIsPresent} from "@taiga-ui/cdk";
import {GiphyFetch} from "@giphy/js-fetch-api";
import {IGif} from "@giphy/js-types";

@Component({
  selector: 'app-giphy-view-detais',
  templateUrl: './giphy-view-detais.component.html',
  styleUrls: ['./giphy-view-detais.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiphyViewDetaisComponent implements OnInit {
  giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");
  objIGif!: IGif;
  imageURLTrusted: any;

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParamMap.pipe(
      map((map) => map.get('id')),
      filter(tuiIsPresent),
        switchMap((giphyId) => from(this.giphyFetch.gif(giphyId))
          .pipe(
            map(res => {
              this.objIGif = res.data;
              this.imageURLTrusted = this.objIGif.images?.fixed_width.url;
            })
          )
        )
    ).subscribe();
  }

  ngOnInit(): void {}

}
