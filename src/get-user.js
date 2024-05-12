import execution from "k6/execution";
import { getUser, loginUser } from "./helper/user.js";

export const options = {
  // vus = Angka yang menentukan jumlah VU yang akan dijalankan secara bersamaan.
  vus: 10,
  // duration = Sebuah string yang menentukan total durasi uji coba.
  // di bawah terinputkan 30 detik jadi kita melakukan test selama 30 detik dengan 10 vus secara bersamaan
  duration: "10s",
};

// di bawah ini adalah fungsi yang akan di jalankan yang isinya adalah skenario testing untuk melakukan registrasi
export default function () {
  const username = `user${execution.vu.idInInstance}`;

  // di bawah ini adalah fungsi yang akan di jalankan yang isinya adalah skenario testing untuk melakukan login
  const loginRequest = {
    username: username,
    password: "123456",
  };

  const loginResponse = loginUser(loginRequest);

  // currentResponseBody  = Mengambil body response dalam bentuk json
  const loginBodyResponse = loginResponse.json();

  // di bawah ini adalah fungsi yang akan di jalankan yang isinya adalah skenario testing untuk melakukan mengambil current user (user saat ini)
  getUser(loginBodyResponse.data.token);
}
