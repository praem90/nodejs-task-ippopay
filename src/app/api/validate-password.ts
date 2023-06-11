'use server'

import PasswordValidator from '../../Validators/Password/validator'

export const validatePassword = async (data: FormData) => {
  console.log(data)
  const password = data.get("password")?.toString();
  if (password) {
    const res = PasswordValidator(password)
    console.log(res)
  }
}