<template>
  <v-content>
    <Navigation />
    <CategoryToolbar @filterCamps="filterCamps($event)" />

    <v-container fluid>
      <v-container>
        <CampsWrapper :camps="camps" />
      </v-container>
    </v-container>
    <Footer />
  </v-content>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import CampsWrapper from "../components/CampsWrapper";
import CategoryToolbar from "../components/CategoryToolbar";

export default {
  name: "Home",
  components: {
    Navigation,
    Footer,
    CampsWrapper,
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
    filterCamps(title) {
      const query = title;
      axios
        .get(`http://localhost:5000/api/v1/camps?careers=${query}`)
        .then(response => {
          console.log(response.data);
          this.camps = response.data.data;
        })
        .catch(err => {
          console.log(err.response.data.err.message);
        });
    }
  },
  created() {
    axios
      .get("http://localhost:5000/api/v1/camps")
      .then(response => {
        console.log(response.data);
        this.camps = response.data.data;
      })
      .catch(err => {
        console.log(err.response.data.err.message);
      });
  }
};
</script>
