import { ContactModel } from "../../../domain/contacts";

export type CreateContactBody = Omit<ContactModel, "id">;

export default interface IContactsService {
  createContact(userId: string, createContactBody: CreateContactBody): Promise<void>;
  getAllContacts(userId: string): Promise<ContactModel[]>;
  deleteContact(userId: string, contactId: string): Promise<void>;
}
