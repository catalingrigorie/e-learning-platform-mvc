<template>
  <v-content class="">
    <Navigation />
    <Parallax
      height="650"
      imgSrc="http://localhost:5000/images/business-computer-connection-contemporary-450035.jpg"
    />
    <Cards />
    <v-container
      style="background: linear-gradient(-45deg,#EC5252 0%,#6E1A52 100%)"
      fluid
    >
      <Categories />
    </v-container>
    <Footer />
    <v-snackbar v-model="accountCreated">
      {{ message }}
      <v-btn color="pink" text @click="closeSnackbar">
        Close
      </v-btn>
    </v-snackbar>
  </v-content>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Parallax from "@/components/Paralax.vue";
import Cards from "@/components/Cards.vue";
import Footer from "@/components/Footer.vue";
import Categories from "@/components/Categories.vue";

export default {
  name: "Home",
  components: {
    Navigation,
    Parallax,
    Cards,
    Footer,
    Categories
  },

  data() {
    return {
      message: "You registered your account successfully and are now logged in!"
    };
  },
  created() {
    this.$emit("update:layout", "div");
  },
  methods: {
    closeSnackbar() {
      this.$store.dispatch("closeSnackbar");
    }
  },
  computed: {
    accountCreated() {
      return this.$store.getters.accountCreated;
    }
  }
};
</script>
