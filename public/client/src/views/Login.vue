<template>
  <v-content>
    <Bar />
    <v-container fluid class="fill-height height bg-color">
      <LoginForm />
    </v-container>
    <Footer />
  </v-content>
</template>

<script>
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";
import Bar from "../components/Bar";

export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {},
  components: {
    LoginForm,
    Footer,
    Bar
  }
};
</script>

<style lang="css" scoped>
.height {
  height: 75% !important;
}

.bg-color {
  background-color: #c7c7c72b;
}
</style>
