const validate = (state) => {
  const ret = [];

  if (!state.firstName) {
    ret.push("First name is required!");
  }

  if (!state.lastName) {
    ret.push("Last name is required!");
  }

  if (!state.username) {
    ret.push("Username is required!");
  }

  if (!state.email) {
    ret.push("Email is required!");
  }

  if (!state.email?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
    ret.push("Email is invalid!");
  }

  if (!state.password) {
    ret.push("Password is required!");
  }

  if (state.password?.length < 6) {
    ret.push("Password must be at least 6 characters!");
  }

  return ret;
};

const withFullName = (state) => ({
  ...state,
  fullName: `${state.firstName} ${state.lastName}`,
});

export default {
  createUser(newUser) {
    const errors = validate(newUser);
    if (errors.length) {
      throw new Error(`User error: ${errors.join("")}`);
    }

    return { ...newUser, ...withFullName(newUser) };
  },
};
