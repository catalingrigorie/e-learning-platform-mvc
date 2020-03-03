<template>
  <v-content>
    <Navigation />
    <SingleCamp />
    <Footer />
  </v-content>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import SingleCamp from "@/components/SingleCamp.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    Navigation,
    Footer,
    SingleCamp
  },
  created() {}
};
</script>

<style lang="css"></style>
