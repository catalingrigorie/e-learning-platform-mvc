<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="10" md="8">
        <v-card flat>
          <v-card-title>
            Popular Bootcamps by category
          </v-card-title>
          <v-tabs centered v-model="tab" background-color="white">
            <v-tab
              v-for="item in items"
              :key="item.tab"
              @click="fetch(item.tab)"
            >
              {{ item.tab }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item
              transition="-"
              reverse-transition="-"
              v-for="item in items"
              :key="item.tab"
            >
              <v-sheet v-if="loading" style="height: 433px" class="text-center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-sheet>
              <CampsGrid
                v-else
                :camps="camps"
                imgHeight="200"
                truncate="text-truncate"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CampsService } from "../../services/api";
import CampsGrid from "../../components/Camps/CampsGrid";

export default {
  data() {
    return {
      camps: null,
      tab: null,
      loading: false,
      items: [
        { tab: "Web Development" },
        { tab: "Mobile Development" },
        { tab: "Software Development" },
        { tab: "Robotics" },
        { tab: "Mechatronics" },
        { tab: "Machine Learning" },
        { tab: "Data Analysis" },
        { tab: "Artificial Inteligence" },
        { tab: "Networking" },
        { tab: "Digial Marketing" },
      ],
    };
  },
  components: {
    CampsGrid,
  },

  methods: {
    async fetch(id) {
      let careerType = id;
      let query = "averageRating[gte]=4";
      this.loading = true;

      try {
        this.camps = (
          await CampsService.getTrendingCamps(query, careerType)
        ).data.results;
      } catch (error) {
        console.log(this.tab);
      } finally {
        this.loading = false;
      }
    },
  },

  async created() {
    let query = "averageRating[gte]=4";
    let careerType = "Web Development";

    try {
      this.camps = (
        await CampsService.getTrendingCamps(query, careerType)
      ).data.results;
    } catch (error) {
      console.log(this.tab);
    }
  },
};
</script>

<style lang="stylus"></style>
