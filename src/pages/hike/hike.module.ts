import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HikePage } from './hike';

@NgModule({
  declarations: [
    HikePage,
  ],
  imports: [
    IonicPageModule.forChild(HikePage),
  ],
})
export class HikePageModule {}
