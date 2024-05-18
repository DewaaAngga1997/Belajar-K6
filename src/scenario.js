import execution from "k6/execution";
import { createContact } from "./helper/contact.js";
import { loginUser, registerUser } from "./helper/user.js";

export const options = {
  scenarios: {
    userRegistration: {
      exec: "userRegistration",
      executor: "shared-iterations",
      vus: 5,
      iterations: 200,
      maxDuration: "30s",
    },
    contactCreation: {
      exec: "contactCreation",
      executor: "constant-vus",
      vus: 5,
      duration: "30s",
    },
  },
};

export function userRegistration() {
  const uniqueID = Math.floor(Math.random() * 1000000);
  const registerRequest = {
    username: `user${uniqueID}`,
    password: `password${uniqueID}`,
    name: `Dewa Angga${uniqueID}`,
  };

  registerUser(registerRequest);
}

export function contactCreation() {
  const username = `user${execution.vu.idInInstance}`;

  const loginRequest = {
    username: username,
    password: "123456",
  };
  const loginResponse = loginUser(loginRequest);
  const token = loginResponse.json().data.token;

  const contact = {
    first_name: "kontak",
    last_name: "contoh",
    email: `kontak@gmail.com`,
  };
  createContact(token, contact);
}
