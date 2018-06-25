import { Address } from './address';

export class Patient {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  addresses: Address[];
  active: boolean;
}
