<template>
  <v-content>
    <Bar />
    <LoginForm />
    <Footer />
  </v-content>
</template>

<script>
import LoginForm from "../components/Authentication/LoginForm";
import Footer from "../components/Footer/Footer.vue";
import Bar from "../components/Navigation/Bar";

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
.bg-color {
  background-color: #c7c7c72b;
}
</style>
