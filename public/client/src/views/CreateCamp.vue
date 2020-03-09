<template>
  <v-content>
    <Navigation />
    <CreateCamp />
    <Footer />
  </v-content>
</template>

<script>
// @ is an alias to /src
// import axios from "axios";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import CreateCamp from "../components/CreateCamp";

export default {
  name: "CreateCamp",
  components: {
    Navigation,
    Footer,
    CreateCamp
  },

  data() {
    return {
      camps: null,
      fields: [
        "Robotics and Mechatronics",
        "Software Development",
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Other"
      ]
    };
  },
  methods: {}
};
</script>
