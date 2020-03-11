<template>
  <v-content>
    <Bar />
    <v-container fluid fill-height class="height bg-color">
      <RegisterForm />
    </v-container>
    <Footer />
  </v-content>
</template>

<script>
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";
import Bar from "../components/Bar";

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
.height {
  height: 70% !important;
}

.bg-color {
  background-color: #c7c7c72b;
}
</style>
