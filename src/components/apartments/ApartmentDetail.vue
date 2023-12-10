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

  computed: {
    arrLat() {
      let allLat = [];
      allLat.push(this.apartment.latitude);
      return allLat;
    },
    arrLong() {
      let allLong = [];
      allLong.push(this.apartment.longitude);
      return allLong;
    },
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
  <div class="container display-back mt-3">
    <ApartmentCard :apartment="apartment" :isDetail="true" v-if="apartment" />
    <ContactButton v-if="apartment" :apartment_id="this.apartment.id" />
    <div id="map" class="map">
      <Map :latitude="arrLat" :longitude="arrLong" v-if="apartment"></Map>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map {
  height: 400px;
  width: 100%;
}
</style>
