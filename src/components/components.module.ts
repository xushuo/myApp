import { NgModule } from '@angular/core';
import { QuestionListComponent } from './question-list/question-list';
import {IonicPageModule} from "ionic-angular";
@NgModule({
	declarations: [QuestionListComponent],
	imports: [IonicPageModule],
	exports: [QuestionListComponent]
})
export class ComponentsModule {}
