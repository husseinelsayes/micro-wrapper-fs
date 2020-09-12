import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './services/auth-guard';
import { OAuthService, OAuthModule } from 'angular-oauth2-oidc';
import { HeaderSidebarLargeComponent } from './components/header-sidebar-large/header-sidebar-large.component';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { InterceptorService } from './services/interceptor.service';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { ExcerptPipe } from './pipes/excerpt.pipe';
import { GetValueByKeyPipe } from './pipes/get-value-by-key.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  swipeEasing : true,
  suppressScrollX: true
};

@NgModule({
  declarations: [
    SpinnerComponent,
    AppComponent,
    HeaderSidebarLargeComponent,
    FooterComponent,
    RelativeTimePipe,
    ExcerptPipe,
    GetValueByKeyPipe
  ],
  imports: [
    NgbModule,
    SharedDirectivesModule,
    PerfectScrollbarModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(
      [
        
      ]
    )
  ],
  providers: [
    OAuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
