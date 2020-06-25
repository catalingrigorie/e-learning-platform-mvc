<template>
  <v-content>
    <Navigation />
    <CampsGrid
      :camps="camps"
      loaders="true"
      imgHeight="250px"
      minHeight="450"
    />
    <Footer />
  </v-content>
</template>

<script>
// @ is an alias to /src
import { CampsService } from "../services/api";
import Navigation from "../components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer.vue";
import CampsGrid from "../components/Camps/CampsGrid";

export default {
  name: "CampsView",
  components: {
    Navigation,
    Footer,
    CampsGrid,
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
        "Other",
      ],
    };
  },
  methods: {},
  async created() {
    const query = this.$route.params.query;

    try {
      this.camps = (await CampsService.getFilteredCamps(query)).data.results;
    } catch (error) {
      console.log(error.message);
    }
  },
};
</script>
