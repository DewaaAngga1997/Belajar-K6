import { check } from "k6";
import http from "k6/http";

export function createContact(token, contact) {
  const contactResponse = http.post("http://localhost:3000/api/contacts", JSON.stringify(contact), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  check(contactResponse, {
    "create contact response status must 200": (response) => response.status === 200,
  });
  return contactResponse;
}
