<script>
// import MyComponent from "./components/MyComponent.vue";
import axios from "axios";
import { store } from "../../data/store";
import ApartmentCard from "./ApartmentCard.vue";
import Map from "../partials/ui/Map.vue";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps";
import ContactButton from "../partials/ui/ContactButton.vue";

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
    Map,
    ContactButton,
  },
  mounted() {
    //chiamata appartamento singolo per latitudine e longitudine (TomTom)
    axios
      .get(store.apiUrl + "/apartments/" + this.$route.params.id)
      .then((response) => {
        this.apartment = response.data.results;

        if (this.apartment.latitude && this.apartment.longitude) {
          const latitude = parseFloat(this.apartment.latitude);
          const longitude = parseFloat(this.apartment.longitude);

          this.map = tt.map({
            key: "t7a52T1QnfuvZp7X85QvVlLccZeC5a9P",
            container: "map",
            center: [longitude, latitude],
            zoom: 16,
          });
          this.map.on("load", () => {
            let center = [longitude, latitude];
            let marker = new tt.Marker().setLngLat(center).addTo(this.map);
          });
        } else {
          console.error("I dati dell'appartamento non sono validi!");
        }
      })
      .catch((error) => console.error(error));
  },

  //--script per validazione lato client--//

  methods: {
    // validate & send form
    sendMessage(event) {
      let flag = true;
      flag = this.cechkValidation(flag);
      console.log(flag);
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
          apartment_id: this.apartment.id,
          name: document.getElementById("name").value,
          surname: document.getElementById("surname").value,
        };

        console.log(data);
        axios
          .post(this.store.apiUrl + "/message", data)
          .then((response) => {
            this.isSending = false;

            if (response.data.success) {
              console.log("ci siamo dentro");
              this.showSuccess = true;
              this.resetForm();
              this.reloadPage();
            } else {
              console.log("cs");
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
  },
};
</script>

<template>
  <div class="container">
    <h1 class="m-3">Dettagli appartamento {{ this.$route.params.id }}</h1>
    <ApartmentCard :apartment="apartment" :isDetail="true" v-if="apartment" />
    <ContactButton v-if="apartment" :apartment_id="this.apartment.id" />
    <div id="map" class="map">
      <Map
        :latitude="apartment.latitude"
        :longitude="apartment.longitude"
        v-if="apartment"
      ></Map>
    </div>
  </div>

  <!-- form messaggio -->
  <!-- <button
    type="button"
    class="styled-btn mt-3"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    data-bs-whatever="@fat"
  >
    contact the host
  </button>

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
              <div class="invalid-feedback">message can't be null.</div>
            </div>
            <input
              type="hidden"
              name="apartment_id"
              for="apartment_id"
              v-model="apartment_id"
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
  </div> -->
</template>

<style lang="scss" scoped>
.map {
  height: 400px;
  width: 100%;
}
</style>
