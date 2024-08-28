import { Injectable } from '@angular/core';
import { PHILIPPINE_BANKS } from './bank-list';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  getPhilippineBanks() {
    return PHILIPPINE_BANKS;
  }
}