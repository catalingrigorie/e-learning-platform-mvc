<template>
  <v-content>
    <Navigation />
    <CreateCamp />
    <Footer />
  </v-content>
</template>

<script>
import Navigation from "../components/Navigation/Navigation.vue";
import Footer from "@/components/Footer/Footer.vue";
import CreateCamp from "../components/Camps/CreateCamp";

export default {
  components: {
    Navigation,
    Footer,
    CreateCamp,
  },

  data() {
    return {
      camps: null,
    };
  },
  methods: {},
};
</script>
