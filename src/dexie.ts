import Dexie from 'dexie';

export class MyAppDatabase extends Dexie {
    contacts!: Dexie.Table<IContact, number>;
    emails!: Dexie.Table<IEmailAddress, number>;
    phones!: Dexie.Table<IPhoneNumber, number>;
    
    constructor(dbName: string) {  
        super(dbName);

        //
        // Define tables and indexes
        // (Here's where the implicit table props are dynamically created)
        //
        this.version(1).stores({
            contacts: '++id, first, last',
            emails: '++id, contactId, type, email',
            phones: '++id, contactId, type, phone',
        });
    }
}
  
// By defining the interface of table records,
// you get better type safety and code completion
export interface IContact {
    id?: number; // Primary key. Optional (autoincremented)
    first: string; // First name
    last: string; // Last name
}

export interface IEmailAddress {
    id?: number;
    contactId: number; // "Foreign key" to an IContact
    type: string; // Type of email such as "work", "home" etc...
    email: string; // The email address
}

export interface IPhoneNumber {
    id?: number;
    contactId: number;
    type: string;
    phone: string;
}

//export const db = new MyAppDatabase('TestDB');
const db = new MyAppDatabase('TestDB');
export {db}