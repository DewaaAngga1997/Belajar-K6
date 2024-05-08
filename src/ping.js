import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // vus = Angka yang menentukan jumlah VU yang akan dijalankan secara bersamaan.
  vus: 10,
  // duration = Sebuah string yang menentukan total durasi uji coba.
  // di bawah terinputkan 30 detik jadi kita melakukan test selama 30 detik dengan 10 vus secara bersamaan
  duration: "30s",
};

// di bawah ini adalah fungsi yang akan di jalankan yang isinya adalah skenario testing kita
export default function () {
  // http.get() = Mengirim permintaan HTTP GET ke server.
  http.get("http://localhost:3000/ping");
  // sleep() = Menunggu selama 1 detik. jadi kita menunggu selama 1 detik setelah permintaan dijalankan.baru akan dijalankan lagi
  sleep(1);
}
