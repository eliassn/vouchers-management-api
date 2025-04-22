import User from '../models/user.js'

export async function createUserService(userData) {
  const newUser = new User(userData)
  return await newUser.save()
}
