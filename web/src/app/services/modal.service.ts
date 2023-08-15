import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface ModalState {
  onEditMode: boolean;
  title: string;
  textInput: string;
  placeholder: string;
  close: () => void;
  delete: () => void;
  save: (text: string) => void;
  create: (text: string) => void;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _state$: BehaviorSubject<ModalState | undefined> = new BehaviorSubject<ModalState | undefined>(undefined);
  public state$: Observable<ModalState | undefined> = this._state$.asObservable();
  public isOpen$: Observable<boolean> = this.state$.pipe(map((state: ModalState | undefined) => !!state));

  public openModal(state: ModalState): void {
    this._state$.next(state);
  }

  public reset(): void {
    this._state$.next(undefined);
  }
}
