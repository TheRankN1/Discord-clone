import {NgModule} from "@angular/core";
import {SearchRoutesModule} from "./search.routes";
import {ServerModule} from "../server/server.module";

@NgModule({
  imports: [SearchRoutesModule , ServerModule],
})
export class SearchModule {

}
