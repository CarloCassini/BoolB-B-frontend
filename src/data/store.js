import { reactive } from "vue";
// qui dentro mettimao tutti i data globali
export const store = reactive({
  esempio: "valore di ciccio",
  apiUrl:'http://127.0.0.1:8000/api',
});
