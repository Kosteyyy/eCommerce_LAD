import User from "./UsersModel.js";

class UserService {
  async create(user) {
    const createdUser = await User.create(user);
    return {
      fullName: createdUser.fullName,
      id: createdUser.id,
      role: createdUser.role,
    };
  }

  async find(query) {
    const users = await User.find(query);
    let response = users.map((user) => {
      return {
        id: user.id,
        fullName: user.fullName,
        role: user.role,
      };
    });
    return response;
  }

  async getAll() {
    const user = await User.find();
    return user;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const user = await User.findById(id);
    return user;
  }

  async update(user) {
    if (!user.id) {
      throw new Error("Не указан ID");
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    return updatedUser;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const user = await User.findByIdAndDelete(id);
    return user;
  }
}

export default new UserService();
