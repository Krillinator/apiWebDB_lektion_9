import { Role, User } from "@/utils/types/user"
import mongoose, { Schema } from "mongoose"

const rolesSchema = new Schema<Role>({
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: String,
    required: true,
  },
  authorities: {
    type: String,
    required: true,
  },
})

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    roles: {
      type: [rolesSchema],
    },
  },
  { strict: true }
)

userSchema.methods.fullName = function () {
  return `${this.name}` // Debug
}

export const UserModel =
  mongoose.models.UserModel ||
  mongoose.model<User>("UserModel", userSchema, "users")
