<template>
  <v-app>
    <v-nav-bar></v-nav-bar>
    <v-content>
      <v-container fill-height fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer></v-footer>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    "v-nav-bar": Navbar,
    "v-footer": Footer
  }
};
</script>
