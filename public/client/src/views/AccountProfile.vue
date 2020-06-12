<template>
  <v-content>
    <Navigation />
    <Profile />
    <Footer />
  </v-content>
</template>

<script>
import Footer from "../components/Footer/Footer.vue";
import Navigation from "../components/Navigation/Navigation";
import Profile from "../components/UserProfile/Profile";

export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {},
  components: {
    Footer,
    Profile,
    Navigation,
  },
};
</script>
