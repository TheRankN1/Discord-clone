import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ChannelTypeEnum } from '../enums/channel-type.enum';
import { ModalType } from '../types/modal.type';

export interface ModalState {
  onEditMode: boolean;
  title: string;
  textInput: string;
  placeholder: string;
  color?: string;
  type: ModalType;
  close?: () => void;
  delete?: () => void;
  save?: (text: string, type: ChannelTypeEnum) => void;
  create?: (text: string, type: ChannelTypeEnum, color: string) => void;
  data?: any;
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
