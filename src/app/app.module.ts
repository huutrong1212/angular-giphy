import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiButtonModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GiphyManagementComponent} from "../../libs/giphy/src/lib/pages/giphy-management/giphy-management.component";
import {TuiCarouselModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {
  GiphyViewDetaisComponent
} from "../../libs/giphy/src/lib/components/giphy-view-detais/giphy-view-detais.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    GiphyManagementComponent,
    GiphyViewDetaisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiInputModule,
    ReactiveFormsModule
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
