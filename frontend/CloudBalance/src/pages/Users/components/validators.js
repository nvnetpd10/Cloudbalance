const isValidPassword = (password) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/;
  return regex.test(password);
};

export const validateUserForm = ({ form, isEdit, assignedAccounts }) => {
  const newErrors = {};

  if (!form.firstName.trim()) newErrors.firstName = "First name is required";
  if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
  if (!form.email.trim()) newErrors.email = "Email is required";
  if (!form.role.trim()) newErrors.role = "Role is required";

  if (!isEdit) {
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (!isValidPassword(form.password)) {
      newErrors.password =
        "Min 5 chars, 1 letter, 1 number & 1 special character required";
    }
  } else if (form.password.trim() && !isValidPassword(form.password)) {
    newErrors.password =
      "Min 5 chars, 1 letter, 1 number & 1 special character required";
  }

  if (form.role === "Customer" && assignedAccounts.length === 0) {
    newErrors.accounts = "Customer must have at least one account assigned";
  }

  return newErrors;
};
