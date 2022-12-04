import { UserModel } from "../../../domain/user";
import axiosInstance from "../axios.config";
import IUserServices, { CreateUserBody } from "./user-services-protocols";

const usersEndpoint = "users.json";

class UserServices implements IUserServices {
  async createUser(createUserBody: CreateUserBody): Promise<any> {
    await axiosInstance.post(usersEndpoint, createUserBody);
  }

  async loadUsers(): Promise<UserModel[]> {
    const response: any = await axiosInstance.get(usersEndpoint);
    const users: UserModel[] = [];
    if (!response) {
      return users;
    }

    for (const key in response) {
      const user: UserModel = {
        id: key,
        name: response[key].name,
        email: response[key].email,
        password: response[key].password,
        contacts: response[key].contacts,
      };

      users.push(user);
    }

    return users;
  }
}

export default new UserServices();
