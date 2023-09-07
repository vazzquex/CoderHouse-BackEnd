import Users from "../DAOs/users.dao.js";

import UserRepository from "../repositories/user.repository.js";

export const userService = new UserRepository(new Users());