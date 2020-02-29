<template>
  <v-content>
    <Navigation />
    <v-container fluid fill-height class="height bg-color">
      <RegisterForm />
    </v-container>
    <Footer />
  </v-content>
</template>

<script>
import Navigation from "../components/Navigation";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";

export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {},
  components: {
    Navigation,
    RegisterForm,
    Footer
  }
};
</script>

<style lang="css">
.height {
  height: 70% !important;
}

.bg-color {
  background-color: #c7c7c72b;
}
</style>
