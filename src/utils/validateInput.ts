type TInputType = "email" | "password" | "name";

export function validateInput(data: string, type: TInputType) {
  const validateRole = {
    email: /^[\w.-]+@[\w-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-zA-Z])(?=.*[!@#*])(?=.*[0-9]).{12,}$/,
    name: /^[가-힣]{2,4}$/,
  };

  return validateRole[type].test(data);
}
