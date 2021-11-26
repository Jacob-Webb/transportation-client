import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Angular CDK imports
import { FlexLayoutModule } from '@angular/flex-layout';

// Toastr Notifications
import { ToastrModule } from 'ngx-toastr';

// JWT 
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexLayoutModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexLayoutModule,
    ToastrModule
  ]
})
export class SharedModule { }
