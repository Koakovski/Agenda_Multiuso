import { ContactModel } from "./contacts";

export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  contacts?: ContactModel[];
};
