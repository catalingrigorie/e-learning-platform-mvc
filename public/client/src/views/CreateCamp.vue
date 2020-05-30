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
    CreateCamp,
  },

  data() {
    return {
      camps: null,
      fields: [
        "Robotics",
        "Mechatronics",
        "Software Development",
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Business",
        "Machine Learning",
        "Data Analysis",
        "Artificial Intelligence",
        "Artificial Vision",
      ],
    };
  },
  methods: {},
};
</script>
