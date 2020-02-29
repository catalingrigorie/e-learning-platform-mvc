<template>
  <v-content class="">
    <Navigation />
    <Footer />
  </v-content>
</template>

<script>
// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Navigation,
    Footer
  },

  data() {
    return {};
  }
};
</script>
