import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {GifsResult, GiphyFetch} from "@giphy/js-fetch-api";
import {
  debounceTime,
  distinctUntilChanged,
  from,
  map,
  observable,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil, tap
} from "rxjs";
import {TuiDialogService} from "@taiga-ui/core";
import {GiphyViewDetaisComponent} from "../../components/giphy-view-detais/giphy-view-detais.component";
import {TuiDestroyService} from "@taiga-ui/cdk";
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-giphy-management',
  templateUrl: './giphy-management.component.html',
  styleUrls: ['./giphy-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class GiphyManagementComponent {

  index = 0;
  giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");
  searchInputControl: FormControl = new FormControl();
  readonly giphy$: Observable<any> = from(this.giphyFetch.trending({offset: 0, limit: 50})).pipe(
    map((response) => {
      return response.data.map(item => item ? item : []);
    })
  );

  constructor(
      private readonly dialogService: TuiDialogService,
      private readonly injector: Injector,
      private readonly destroy$: TuiDestroyService,
      private readonly router: Router
  ) {
    this.searchInputControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchQuery) =>
        searchQuery
          ? this.giphyFetch.search(searchQuery)
          : '')
    ).subscribe();
  }

  openGiphyDialog(id: string): void {
    this.dialogService
      .open(new PolymorpheusComponent(GiphyViewDetaisComponent, this.injector), {
        label: 'Giphy',
        size: 'l',
        data: id
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  onOpen(id: string): void {
    void this.router.navigate([], {
      queryParams: { id },
      queryParamsHandling: 'merge',
    });
    this.openGiphyDialog(id);
  }

  onChangeValue(connector: any, value: string | null): void {
    connector.propertyValue = value;
  }
}
