import { last } from "rxjs";

export class Actor {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    birthdate: Date;
  
    constructor(
      id: number = 0,
      firstName: string = '',
      lastName: string = "",
      gender: string = '',
      birthdate: Date = new Date(0)
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.birthdate = birthdate;
    }
}
