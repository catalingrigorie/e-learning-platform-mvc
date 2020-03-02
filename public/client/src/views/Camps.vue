<template>
  <v-content class="">
    <Navigation />
    <CampsWrapper />
    <Footer />
  </v-content>
</template>

<script>
// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import CampsWrapper from "../components/CampsWrapper";

export default {
  name: "Home",
  components: {
    Navigation,
    Footer,
    CampsWrapper
  },

  data() {
    return {};
  }
};
</script>
