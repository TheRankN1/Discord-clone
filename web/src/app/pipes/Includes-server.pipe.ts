import {Pipe, PipeTransform} from "@angular/core";
import {ServerInterface} from "../interfaces/server.interface";
import {BehaviorSubject} from "rxjs";

@Pipe({
  name : 'includesServer'
})

export class IncludesServerPipe implements PipeTransform{
  transform(loggedUserServers$:BehaviorSubject<Array<ServerInterface>> , server:ServerInterface ): boolean {
      return loggedUserServers$.value.includes(server);
  }
}
