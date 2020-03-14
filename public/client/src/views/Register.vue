<template>
  <v-content>
    <Bar />
    <RegisterForm />
    <Footer />
  </v-content>
</template>

<script>
import RegisterForm from "../components/Authentication/RegisterForm";
import Footer from "../components/Footer/Footer";
import Bar from "../components/Navigation/Bar";

export default {
  name: "Register",
  data() {
    return {};
  },
  methods: {},
  components: {
    RegisterForm,
    Footer,
    Bar
  }
};
</script>

<style lang="css">
.bg-color {
  background-color: #c7c7c72b;
}
</style>
