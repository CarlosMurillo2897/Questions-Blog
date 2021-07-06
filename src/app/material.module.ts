import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule  } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatTooltipModule } from '@angular/material/tooltip';

const modules = [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatTooltipModule,
];

@NgModule({
    imports: modules,
    exports: modules,
})

export class MaterialModule {}