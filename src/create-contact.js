import execution from "k6/execution";
import { loginUser } from "./helper/user.js";
import { createContact } from "./helper/contact.js";

export const options = {
  // vus = Angka yang menentukan jumlah VU yang akan dijalankan secara bersamaan.
  vus: 10,
  // duration = Sebuah string yang menentukan total durasi uji coba.
  // di bawah terinputkan 30 detik jadi kita melakukan test selama 30 detik dengan 10 vus secara bersamaan
  duration: "10s",
};

// sebelum kita membuat kontak kita harus login dan mendapatkan token
export function getToken() {
  const username = `user${execution.vu.idInInstance}`;

  // di bawah ini adalah fungsi yang akan di jalankan yang isinya adalah skenario testing untuk melakukan login
  const loginRequest = {
    username: username,
    password: "123456",
  };

  const loginResponse = loginUser(loginRequest);

  // currentResponseBody  = Mengambil body response dalam bentuk json
  const loginBodyResponse = loginResponse.json();
  return loginBodyResponse.data.token;
}

// di sini kita akan melakukan setup data yang akan kita masukan
export function setup() {
  const totalContact = Number(__ENV.TOTAL_CONTACT) || 10;
  const data = [];
  for (let i = 0; i < totalContact; i++) {
    data.push({
      first_name: "kontak",
      last_name: `ke-${i}`,
      email: `kontak-${i}@gmail.com`,
    });
  }
  return data;
}

// lalu kita akan melakukan membuat kontak dengan cara POST data
export default function (data) {
  const token = getToken();
  for (let i = 0; i < data.length; i++) {
    const contact = data[i];
    createContact(token, contact);
  }
}

export function teardown(data) {
  console.info(`Finish create ${data.length} contacts`);
}
