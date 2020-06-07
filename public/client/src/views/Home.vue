<template>
  <v-content>
    <Navigation />
    <Parallax
      height="550"
      imgSrc="http://localhost:5000/images/business-computer-connection-contemporary-450035.jpg"
    />
    <Cards />

    <Categories />
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
import Navigation from "@/components/Navigation/Navigation.vue";
import Parallax from "@/components/Home/Paralax.vue";
import Cards from "@/components/Home/Cards.vue";
import Footer from "@/components/Footer/Footer.vue";
import Categories from "@/components/Home/Categories.vue";

export default {
  name: "Home",
  components: {
    Navigation,
    Parallax,
    Cards,
    Footer,
    Categories,
  },

  data() {
    return {
      message:
        "You registered your account successfully and are now logged in!",
    };
  },
  created() {
    this.$emit("update:layout", "div");
  },
  methods: {
    closeSnackbar() {
      this.$store.dispatch("closeSnackbar");
    },
  },
  computed: {
    accountCreated() {
      return this.$store.getters.accountCreated;
    },
  },
};
</script>
