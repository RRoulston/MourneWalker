import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FallDetectionPage } from './fall-detection';

@NgModule({
  declarations: [
    FallDetectionPage,
  ],
  imports: [
    IonicPageModule.forChild(FallDetectionPage),
  ],
})
export class FallDetectionPageModule {}
