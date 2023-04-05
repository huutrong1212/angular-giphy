import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {GiphyFetch} from "@giphy/js-fetch-api";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  from,
  map,
  Observable, of,
  switchMap,
  takeUntil
} from "rxjs";
import {TuiDialogService} from "@taiga-ui/core";
import {GiphyViewDetaisComponent} from "../../components/giphy-view-detais/giphy-view-detais.component";
import {TuiDestroyService} from "@taiga-ui/cdk";
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {GifsResult, ResultPagination} from "@giphy/js-fetch-api/src/result-types";
import {IGif} from "@giphy/js-types";

@Component({
  selector: 'app-giphy-management',
  templateUrl: './giphy-management.component.html',
  styleUrls: ['./giphy-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class GiphyManagementComponent {

  giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");
  limit = 10;
  offset = 0;
  indexGif = 0;
  indexEmoji = 0;
  loading = true;
  searchInputControl: FormControl = new FormControl();
  pagination!: ResultPagination;
  gifs$!: Observable<any[]>;

  emoji$: Observable<any[]> = from(this.giphyFetch.emoji()).pipe(
    map((response) => {
      return response.data.map(item => item ? item : []);
    })
  )

  constructor(
      private readonly dialogService: TuiDialogService,
      private readonly injector: Injector,
      private readonly destroy$: TuiDestroyService,
      private readonly router: Router
  ) {
    this.searchInputControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchQuery) => {
        return searchQuery
          ? this.gifs$ = from(this.giphyFetch.search(searchQuery)).pipe(
            map(res => {
              this.loading = false;
              this.pagination = res.pagination;
              return res.data.map(item => item ? item : []);
            })
          )
          : ''
      }
    )).subscribe();

    this.fetchData();
  }

  fetchData(){
    this.gifs$ = from(this.giphyFetch.trending({offset: this.offset, limit: 10})).pipe(
      map((response) => {
        this.loading = false;
        this.pagination = response.pagination;
        return response.data.map(item => item ? item : []);
      })
    );
  };

  openGiphyDialog(id: string): void {
    this.dialogService
      .open(new PolymorpheusComponent(GiphyViewDetaisComponent, this.injector), {
        label: 'GIFs details',
        size: 'l',
        data: id
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  onOpenDialog(id: string): void {
    void this.router.navigate([], {
      queryParams: { id },
      queryParamsHandling: 'merge',
    });
    this.openGiphyDialog(id);
  }

  goToPage(event: number): void {
    this.offset = event;
    this.fetchData();
  }
}
