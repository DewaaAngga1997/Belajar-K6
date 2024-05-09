import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 20 },
    { duration: "10s", target: 10 },
    { duration: "10s", target: 0 },
  ],
};

// di bawah ini adalah fungsi yang akan di jalankan yang isinya adalah skenario testing kita
export default function () {
  // http.get() = Mengirim permintaan HTTP GET ke server.
  http.get("http://localhost:3000/ping");
  // sleep() = Menunggu selama 1 detik. jadi kita menunggu selama 1 detik setelah permintaan dijalankan.baru akan dijalankan lagi
  sleep(1);
}
