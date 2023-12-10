<script>
import axios from "axios";
import { store } from "../../../data/store";

// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
      store,
    };
  },
  props: {
    apartment_id: Number,
  },

  methods: {
    sendMessage(event) {
      let flag = true;
      flag = this.cechkValidation(flag);
      if (!flag) {
        event.preventDefault();
      } else {
        // Verifica se è già in corso un invio
        if (this.isSending) {
          return;
        }

        this.isSending = true;

        let data = {
          sender_email: document.getElementById("sender_email").value,
          message: document.getElementById("message").value,
          apartment_id: this.apartment_id,
          name: document.getElementById("name").value,
          surname: document.getElementById("surname").value,
        };

        console.log("data : " + data);
        axios
          .post(this.store.apiUrl + "/message", data)
          .then((response) => {
            this.isSending = false;

            if (response.data.success) {
              this.showSuccess = true;
              this.resetForm();
              this.reloadPage();
            } else {
              this.showError = true;
              this.errors = response.data.errors;
            }
          })
          .catch((error) => {
            this.isSending = false;
            console.error(error);
          });
      }
    },
    // Reload the page
    reloadPage() {
      window.location.reload();
    },
    // clear form data after submit
    resetForm() {
      this.email_sender = "";
      this.text_message = "";
    },
    // validate & send form
    cechkValidation(flag) {
      flag = true;
      // Exclude validation for fields with the class 'no-validation'
      const form = document.getElementById("myForm");
      const fieldsToValidate = form.querySelectorAll(
        ".form-control:not(.no-validation)"
      );
      Array.from(fieldsToValidate).forEach((field) => {
        if (!field.checkValidity()) {
          flag = false;
        }
      });

      form.classList.add("was-validated");
      return flag;
    },
  },
};
</script>

<template>
  <div
    class="btn btn-style d-flex justify-content-center my-2"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    data-bs-whatever="@fat"
  >
    <h1>contact the host</h1>
  </div>
  <!-- <button
    type="button"
    class="styled-btn mt-3"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    data-bs-whatever="@fat"
  >
    contact the host
  </button> -->

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            v-if="!showSuccess"
            class="modal-title fs-5"
            id="exampleModalLabel"
          >
            New message
          </h1>
          <h1 v-if="showSuccess" class="m-0">Messaggio Inviato</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div v-if="!showSuccess" class="modal-body">
          <form
            class="needs-validation"
            method="post"
            id="myForm"
            @submit.prevent="sendMessage()"
          >
            <div class="input_container">
              <label class="input_label text-gradient me-3" for="name"
                >Name</label
              >
              <input
                type="name"
                class="form-control"
                id="name"
                v-model="name"
                ref="name"
                autocomplete="name"
              />
            </div>
            <div class="input_container mt-3">
              <label class="input_label text-gradient me-3" for="surname"
                >Surname</label
              >
              <input
                type="surname"
                class="form-control"
                id="surname"
                v-model="surname"
                ref="surname"
                autocomplete="surname"
              />
            </div>
            <div class="input_container">
              <label
                class="input_label text-gradient mt-3 me-3"
                for="email_sender"
                >Email*</label
              >
              <input
                type="email"
                class="form-control"
                id="sender_email"
                v-model="email_sender"
                ref="email"
                autocomplete="email"
                required
              />
              <!-- {{-- errore lato client --}} -->
              <div class="invalid-feedback">email can't be null.</div>
            </div>
            <div class="input_container mt-3">
              <label for="text_message" class="input_label text-gradient"
                >Descrizione*</label
              >
              <textarea
                class="form-control"
                id="message"
                rows="4"
                v-model="text_message"
                ref="message"
                for="text_message"
                required
              ></textarea>
              <!-- {{-- errore lato client --}} -->
              <div class="invalid-feedback">message can't be null.</div>
            </div>
            <input
              type="hidden"
              name="apartment_id"
              for="apartment_id"
              v-model="this.apartment_id"
            />
            <div class="modal-footer justify-content-between">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Chiudi
              </button>
              <button
                v-if="!showSuccess"
                type="submit"
                class="btn btn-success"
                @click="sendMessage"
              >
                Invia
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.suggestions-container {
  position: relative;
}
.suggestions {
  background-color: #ddd;
  z-index: 9;
  border: 1px solid #ff7977;
  border-radius: 0.5rem;
  box-shadow: 0px 5px 15px 3px #222222;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 5rem;
  overflow-y: auto;
  list-style: none;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
  li {
    cursor: pointer;
  }
  li:hover {
    // border-bottom: 1px solid #ff7977;
    box-shadow: inset 0 -2px 2px 0px #ff7977;

    background-color: #fff;
  }
}
.disabled {
  filter: grayscale(1);
}

.small-input {
  max-width: 5rem;
}
.big-input {
  // max-width: 20rem;
}
.input-styler {
  background-color: #fff;
  border: none;
  border-bottom: 1px solid #ff7977;
  color: #ff7977;
  text-align: center;
}
.input-styler:focus {
  outline: none; /* Rimuovi il bordo quando l'input è selezionato */
}

.primary-col {
  color: #ff7977;
  border: 1px solid #ff7977;
  border-radius: 0.5rem;
}
.range-styler {
  color: #ff7977;
  background-color: #ff7977;
}
/* Stili per il tipo "range" */
input[type="range"] {
  height: 10px; /* Altezza del cursore */
  appearance: none; /* Nasconde l'aspetto predefinito del cursore */
  background-color: #ddd; /* Colore di sfondo */
  outline: none; /* Rimuove il bordo di contorno */
  border-radius: 5px; /* Bordo arrotondato */
  margin: 10px 0; /* Margine superiore e inferiore */
}
/* Stili per il cursore del tipo "range" */
input[type="range"]::-webkit-slider-thumb {
  width: 20px; /* Larghezza del cursore */
  height: 20px; /* Altezza del cursore */
  background-color: #ff7977; /* Colore del cursore */
  border-radius: 50%; /* Bordo arrotondato */
  cursor: pointer; /* Cambia il cursore al passaggio sopra */
  -webkit-appearance: none; /* Nasconde l'aspetto predefinito del cursore in WebKit (Chrome, Safari, ecc.) */
  margin-top: 0px; /* Alcuni piccoli aggiustamenti di posizione */
  transition: 1s;
}
input[type="range"]::-webkit-slider-thumb:hover {
  transform: translate(2px, -2px);
  box-shadow: 0px 3px 10px 1px #222222;
  transition: 0.5s ease-in-out;
}
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.btn-style {
  background-color: transparent;
  border-radius: 0.5rem;
  border: 1px solid #ff7977;
  color: #ff7977;
  font-weight: 700;
  transition: 1s;
}
.btn-style:hover {
  background-color: #ff7977;
  color: #ffffff;
  transform: translate(2px, -2px);
  box-shadow: -3px 3px 10px 1px #222222;
  transition: 0.5s ease-in-out;
}
</style>
