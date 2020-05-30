<template>
  <div class="App" />
</template>

<script>
import gmapsInit from "../../services/googleMaps";

export default {
  name: "App",
  props: ["lat", "lng"],

  async mounted() {
    try {
      const google = await gmapsInit();
      const pos = {
        lat: this.lat,
        lng: Number(this.lng),
      };
      const map = new google.maps.Map(this.$el, {
        center: pos,
        zoom: 16,
      });
      const marker = new google.maps.Marker({
        position: map.getCenter(),
        visible: true,
        center: pos,
        title: "Bootcamp",
      });

      marker.setMap(map);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.App {
  width: 100%;
  height: 350px;
}
</style>
