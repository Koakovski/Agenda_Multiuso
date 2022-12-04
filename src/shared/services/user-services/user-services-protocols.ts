import { UserModel } from "../../../domain/user";

export type CreateUserBody = Omit<UserModel, "id">;
export default interface IUserServices {
  createUser(createUserBody: CreateUserBody): Promise<void>;
  loadUsers(): Promise<UserModel[]>;
}
