import { ContactModel } from "../../../domain/contacts";
import axiosInstance from "../axios.config";
import IContactsService, { CreateContactBody } from "./contacts-services-protocols";

function getContactsEndpoint(userId: string) {
  return `users/${userId}/contacts.json`;
}

function getContactEndpoint(userId: string, contactId: string) {
  return getContactsEndpoint(userId).replace(".json", `/${contactId}.json`);
}

class ContactsService implements IContactsService {
  async createContact(
    userId: string,
    createContactBody: CreateContactBody
  ): Promise<void> {
    await axiosInstance.post(getContactsEndpoint(userId), createContactBody);
  }

  async getAllContacts(userId: string): Promise<ContactModel[]> {
    const response: any = await axiosInstance.get(getContactsEndpoint(userId));

    const contacts: ContactModel[] = [];
    if (!response) {
      return contacts;
    }

    for (const key in response) {
      const contact: ContactModel = {
        id: key,
        name: response[key].name,
        phone: response[key].phone,
      };

      contacts.push(contact);
    }

    return contacts;
  }

  async deleteContact(userId: string, contactId: string): Promise<void> {
    await axiosInstance.delete(getContactEndpoint(userId, contactId));
  }
}

export default new ContactsService();
