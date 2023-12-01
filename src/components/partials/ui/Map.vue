<script>
export default {
  data() {
    return {
      map: null,
      apiKey: "LA_TUA_CHIAVE_API_TOMTOM",
      address: "Via esempio, 123, Città",
    };
  },
  mounted() {
    // Inizializzazione della mappa al momento del caricamento del componente
    this.initMap();
  },
  methods: {
    initMap() {
      tt.setProductInfo("VueTomTomExample", "1.0.0"); // Opzionale

      // Inizializzazione della mappa utilizzando Vue refs
      this.map = tt.map({
        key: this.apiKey,
        container: this.$refs.map,
        style: "tomtom://vector/1/basic-main",
        center: [0, 0], // Coordinate di default, verranno sovrascritte
        zoom: 15,
      });

      // Effettua la richiesta di geocoding a TomTom API per ottenere le coordinate dall'indirizzo
      tt.services
        .geocodeSearch({ query: this.address })
        .go()
        .then((response) => {
          position = response.results[0].position;
          this.map.setCenter([position.lat, position.lon]);

          // Aggiungi un marker per l'appartamento
          marker = new tt.Marker()
            .setLngLat([position.lon, position.lat])
            .addTo(this.map);
        })
        .catch((error) => {
          console.error(
            "Si è verificato un errore durante il geocoding:",
            error
          );
        });
    },
  },
};
</script>

<template>
  <div>
    <h1>Dettaglio dell'Appartamento</h1>
    <!-- Elemento HTML per la mappa -->
    <div ref="map" class="map"></div>
  </div>
</template>

<style></style>
