import { check, fail } from "k6";
import http from "k6/http";

export const options = {
  // vus = Angka yang menentukan jumlah VU yang akan dijalankan secara bersamaan.
  vus: 10,
  // duration = Sebuah string yang menentukan total durasi uji coba.
  // di bawah terinputkan 30 detik jadi kita melakukan test selama 30 detik dengan 10 vus secara bersamaan
  duration: "10s",
};

// di bawah ini adalah fungsi yang akan di jalankan yang isinya adalah skenario testing untuk melakukan registrasi
export default function () {
  const uniqueID = Math.floor(Math.random() * 1000000);
  const registerRequest = {
    username: `user${uniqueID}`,
    password: `password${uniqueID}`,
    name: `Dewa Angga${uniqueID}`,
  };
  const registerResponse = http.post("http://localhost:3000/api/users", JSON.stringify(registerRequest), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const checkRegister = check(registerResponse, {
    "register response status must 200": (response) => response.status === 200,
    "register response data must not null": (response) => response.json().data !== null,
  });

  //ini adalah pengecekan status response dengan fungsi fail
  if (!checkRegister) {
    fail(`Failed to register user${uniqueID}`);
  }

  // di bawah ini adalah fungsi yang akan di jalankan yang isinya adalah skenario testing untuk melakukan login
  const loginRequest = {
    username: `user${uniqueID}`,
    password: `password${uniqueID}`,
  };

  const loginResponse = http.post("http://localhost:3000/api/users/login", JSON.stringify(loginRequest), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const checkLogin = check(loginResponse, {
    "login response status must 200": (response) => response.status === 200,
    "login response token must exists": (response) => response.json().data.token != null,
  });

  //ini adalah pengecekan login response dengan fungsi fail
  if (!checkLogin) {
    fail(`Failed to login user${uniqueID}`);
  }

  // currentResponseBody  = Mengambil body response dalam bentuk json
  const loginBodyResponse = loginResponse.json();

  // di bawah ini adalah fungsi yang akan di jalankan yang isinya adalah skenario testing untuk melakukan mengambil current user (user saat ini)
  const currentResponse = http.get("http://localhost:3000/api/users/current", {
    headers: {
      Accept: "application/json",
      Authorization: loginBodyResponse.data.token,
    },
  });

  const checkCurrent = check(currentResponse, {
    "current response status must 200": (response) => response.status === 200,
    "current response data must not null": (response) => response.json().data !== null,
  });

  //ini adalah pengecekan current response dengan fungsi fail
  if (!checkCurrent) {
    fail(`Failed to get user${uniqueID}`);
  }

  // currentResponseBody = Mengambil body response current user dalam bentuk json
  const currentResponseBody = currentResponse.json();
}
