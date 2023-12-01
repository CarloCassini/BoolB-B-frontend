import { reactive } from "vue";
// qui dentro mettimao tutti i data globali

export const store = reactive({
  esempio: "valore di ciccio",
  apiUrl:"http://localhost:8000/api",
  services:[]
});
