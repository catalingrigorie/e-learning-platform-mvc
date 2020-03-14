<template>
  <v-content>
    <Navigation />
    <CreateCamp />
    <Footer />
  </v-content>
</template>

<script>
import Navigation from "../components/Navigation/Navigation.vue";
import Footer from "@/components/Footer/Footer.vue";
import CreateCamp from "../components/Camps/CreateCamp";

export default {
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
