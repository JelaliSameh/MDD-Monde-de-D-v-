import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { MeComponent } from 'src/app/pages/me/me.component';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SessionService } from 'src/app/services/session.service';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { RegisterComponent } from 'src/app/pages/auth/register/register.component';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ThemesComponent } from 'src/app/pages/themes/themes.component';
import { ArticlesComponent } from 'src/app/pages/articles/articles.component';
import { CreationArticleComponent } from 'src/app/pages/creation-article/creation-article.component';
import { ArticlesDetailComponent } from 'src/app/pages/articles-detail/articles-detail.component';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { ISubscriptionServiceToken, ITopicServiceToken } from 'src/app/interfaces/tokens';

// Import FlexLayoutModule ici
import { FlexLayoutModule } from '@angular/flex-layout';

// Fonction pour initialiser l'application
export function initializeApp(sessionService: SessionService) {
  return (): Promise<any> => { 
    return sessionService.loadSession();
  }
}

// Constante pour les modules Angular Material
const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
];

// Constante pour les modules Angular de base
const angularModules = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FlexLayoutModule, // Ajouté ici
  HttpClientModule,
  ReactiveFormsModule,
  CommonModule,
  FormsModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MeComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ThemesComponent,
    ArticlesComponent,
    CreationArticleComponent, 
    ArticlesDetailComponent
  ],
  imports: [
    ...angularModules, 
    ...materialModules 
  ],
  providers: [
    { provide: ITopicServiceToken, useClass: SubscriptionService },
    { provide: ISubscriptionServiceToken, useClass: SubscriptionService },
    SessionService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [SessionService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
