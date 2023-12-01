import { createApp } from "vue";
// importo il router
import { router } from "./router/router";

// importo il css di bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// importo le regole javascript di bootstap
import * as bootstrap from "bootstrap";

// importo fontawesome
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faEnvelope ,faBed, faWifi, faCar, faPersonSwimming, faDoorOpen, faBath, faWater, faTrain, faLocationCrosshairs, faDumbbell, faMugSaucer, faBellConcierge, faToilet, faMaximize } from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(faEnvelope, faBed, faWifi, faCar,faPersonSwimming, faDoorOpen, faBath, faWater, faTrain, faLocationCrosshairs, faDumbbell, faMugSaucer, faBellConcierge, faToilet, faMaximize );

import "./assets/scss/style.scss";
import App from "./App.vue";

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
// app.component("AppLoading", AppLoading);
app.use(router);
app.mount("#app");
// /* Set up using Vue 3 */
// import { createApp } from 'vue'
// import App from './App.vue'

// /* import the fontawesome core */
// import { library } from '@fortawesome/fontawesome-svg-core'

// /* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// /* import specific icons */
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

// /* add icons to the library */
// library.add(faUserSecret)

// createApp(App)
// .component('font-awesome-icon', FontAwesomeIcon)
// .mount('#app')