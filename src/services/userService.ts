import User from "../models/userModel"
import { IUser } from "../interfaces/userInterface"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { clearCache, getCache, setCache } from "./cacheService"

export const registerUser = async (userData: {
  email: string
  password: string
  name: string
}): Promise<IUser> => {
  const { email, password, name } = userData

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({
    email,
    password: hashedPassword,
    name,
  })

  return await user.save()
}

export const authenticateUser = async (email: string, password: string) => {
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new Error("Invalid credentials");
      }
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "14d" }
      );
  
      return { token, user };
    } catch (error) {
      throw error;
    }
  };
  

export const getUserById = async (userId: string) => {
  const cachedUser = await getCache(`user:${userId}`)
  if (cachedUser) {
    return cachedUser
  }

  const user = await User.findById(userId).select("-password")

  if (user) {
    await setCache(`user:${userId}`, user, 3600)
  }

  return user
}

export const updateUser = async (
  userId: string,
  updateData: Partial<IUser>
) => {
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  }).select("-password")

  if (updatedUser) clearCache(`user:${userId}`)

  return updatedUser
}

export const resetPassword = async (email: string, newPassword: string) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  return await User.findOneAndUpdate({ email }, { password: hashedPassword })
}

export const generatePasswordResetToken = async(email: string) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    await setCache(`passwordResetToken:${user._id}`, token, 3600);

    return token;
}