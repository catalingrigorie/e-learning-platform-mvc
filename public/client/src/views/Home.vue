<template>
  <v-content class="">
    <Navigation />
    <Parallax imgSrc="http://localhost:5000/images/hero.jpeg" />
    <Cards />
    <Parallax height="250" imgSrc="http://localhost:5000/images/hero.jpeg" />
    <Footer />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </v-content>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Navigation from "@/components/Navigation.vue";
import Parallax from "@/components/Paralax.vue";
import Cards from "@/components/Cards.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Navigation,
    Parallax,
    Cards,
    Footer
  },

  data() {
    return {};
  },
  created() {
    this.$emit("update:layout", "div");
  }
};
</script>
