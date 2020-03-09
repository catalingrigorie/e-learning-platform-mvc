<template>
  <v-content>
    <Navigation />
    <CategoryToolbar @filterCamps="filterCamps($event)" />

    <v-container fluid>
      <v-container>
        <CampsGrid :camps="camps" />
      </v-container>
    </v-container>
    <Footer />
  </v-content>
</template>

<script>
// @ is an alias to /src
import { CampsService } from "../services/api";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import CampsGrid from "../components/CampsGrid";
import CategoryToolbar from "../components/CategoryToolbar";

export default {
  name: "Home",
  components: {
    Navigation,
    Footer,
    CampsGrid,
    CategoryToolbar
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
  methods: {
    // filterCamps(title) {
    //   const query = title;
    //   axios
    //     .get(`http://localhost:5000/api/v1/camps?careers=${query}`)
    //     .then(response => {
    //       console.log(response.data);
    //       this.camps = response.data.results;
    //     })
    //     .catch(err => {
    //       console.log(err.response.data.err.message);
    //     });
    // }
  },
  async created() {
    const query = this.$route.params.query;

    try {
      this.camps = (await CampsService.getFilteredCamps(query)).data.results;
    } catch (error) {
      console.log(error.message);
    }
  }
};
</script>
