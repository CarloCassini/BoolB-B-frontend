<script>
// import MyComponent from "./components/MyComponent.vue";
import axios from "axios";
import { store } from "../../data/store";
import ApartmentCard from "./ApartmentCard.vue";

export default {
  data() {
    return {
      apartment: null,
      text_message: "",
      store,
    };
  },

  components: {
    ApartmentCard,
  },
  created() {
    axios
      .get(store.apiUrl + "/apartments/" + this.$route.params.id)
      .then((response) => {
        this.apartment = response.data.results;
        console.log(this.apartment);
        console.log(store.apiUrl + "/apartments/" + this.$route.params.id);
      });
  },

  methods: {
      // validate & send form
      sendMessage(event) {
        // console.log('ciccio');
      if (!this.validateForm()) {
        event.preventDefault();
      } else {
        // Verifica se è già in corso un invio
        if (this.isSending) {
          return;
        }
       
        this.isSending = true;

        let data = {
          sender_email: document.getElementById('sender_email').value,
          message: document.getElementById('message').value,
          apartment_id: this.apartment.id,
          name: 'ciccio',
          surname: 'cicciolino',
        };
        console.log(this.store.apiUrl + "message/store");
        console.log(data);

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
      this.apartment_id = "";
    },

    // Validate all form when click
    validateForm() {
      let isValid = true;

      const email = this.$refs.email;
      const message = this.$refs.message;

      if (this.email_sender.trim() === "") {
        this.setError(email, "Email richiesta");
        isValid = false;
      } else if (this.email_sender.trim().length < 5) {
        this.setError(email, "Minino 5 caratteri");
        isValid = false;
      } else if (this.email_sender.trim().length > 255) {
        this.setError(email, "Massimo 255 caratteri");
        isValid = false;
      } else if (!this.validateEmail(this.email_sender.trim())) {
        this.setError(email, "Email non valida");
        isValid = false;
      } else {
        this.setSuccess(email);
      }

      if (this.text_message.trim() === "") {
        this.setError(message, "Messaggio richiesto");
        isValid = false;
      } else if (this.text_message.trim().length < 5) {
        this.setError(message, `Minimo 5 caratteri`);
        isValid = false;
      } else {
        this.setSuccess(message);
      }

      return isValid;
    },

    // Validate form on input
    validate(event) {
      const element = event.target;

      switch (element.type) {
        case "email":
          if (this.email_sender.trim() === "") {
            this.setError(element, "Email richiesta");
          } else if (this.email_sender.trim().length < 5) {
            this.setError(element, "Minino 5 caratteri");
          } else if (this.email_sender.trim().length > 255) {
            this.setError(element, "Massimo 255 caratteri");
          } else if (!this.validateEmail(this.email_sender.trim())) {
            this.setError(element, "Email non valida");
          } else {
            this.setSuccess(element);
          }
          break;

        case "textarea":
          if (this.text_message.trim() === "") {
            this.setError(element, "Messaggio richiesto");
          } else if (this.text_message.trim().length < 5) {
            this.setError(element, `Minimo 5 caratteri`);
          } else {
            this.setSuccess(element);
          }
          break;
      }
    },

    // Validate email
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    // Set error style
    setError(element, message) {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector(".error");

      errorDisplay.innerText = message;
      inputControl.classList.add("error");
      inputControl.classList.remove("success");
    },

    // Set success style
    setSuccess(element) {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector(".error");

      errorDisplay.innerText = "";
      inputControl.classList.add("success");
      inputControl.classList.remove("error");
    },

    // Prevent submit when click enter
    preventFormSubmitOnEnter(event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    },
  }
};


</script>

<template>
  <div class="container">
    <h1 class="my-3">Dettagli appartamento {{ this.$route.params.id }}</h1>
    <ApartmentCard :apartment="apartment" :isDetail="true" v-if="apartment" />
  </div>

  <!-- form messaggio -->

  <button type="button" class="styled-btn mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal"
      data-bs-whatever="@fat">
      Contatta per Info
    </button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 v-if="!showSuccess" class="modal-title fs-5" id="exampleModalLabel">
              Nuovo Messaggio
            </h1>
            <h1 v-if="showSuccess" class="m-0">Messaggio Inviato</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div v-if="!showSuccess" class="modal-body">
            <form method="post" id="myForm" @submit.prevent="sendMessage()">
              <div class="input_container">
                <label class="input_label text-gradient" for="email_sender">Email</label>
                <font-awesome-icon :icon="['fas', 'envelope']" class="icon" />
                <input type="email" class="input_field" id="sender_email" v-model="email_sender" ref="email"
                  @input="validate" @keydown.enter.prevent="preventFormSubmitOnEnter" autocomplete="email" />
                <div class="error"></div>
              </div>
              <div class="input_container">
                <label for="text_message" class="input_label text-gradient">Descrizione</label>
                <textarea class="form-control" id="message" rows="3" v-model="text_message" ref="message"
                  @input="validate" @keydown.enter.prevent="preventFormSubmitOnEnter" for="text_message"></textarea>
                <div class="error"></div>
              </div>
              <input type="hidden" name="apartment_id" for="apartment_id" v-model="apartment_id" />
              <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Chiudi
                </button>
                <button v-if="!showSuccess" type="submit" class="styled-btn" @click="sendMessage">
                  Invia
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  
</template>



<style lang="scss" scoped></style>
