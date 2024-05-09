import http from "k6/http";

export const options = {
  // vus = Angka yang menentukan jumlah VU yang akan dijalankan secara bersamaan.
  vus: 10,
  // duration = Sebuah string yang menentukan total durasi uji coba.
  // di bawah terinputkan 30 detik jadi kita melakukan test selama 30 detik dengan 10 vus secara bersamaan
  duration: "10s",
};

// di bawah ini adalah fungsi yang akan di jalankan yang isinya adalah skenario testing kita
export default function () {
  const uniqueID = Math.floor(Math.random() * 1000000);
  const body = {
    username: `user${uniqueID}`,
    password: `password${uniqueID}`,
    name: `Dewa Angga${uniqueID}`,
  };
  http.post("http://localhost:3000/api/users", JSON.stringify(body), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
