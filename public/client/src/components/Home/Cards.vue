<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="11">
        <v-card flat>
          <v-row dense justify="start">
            <v-col cols="12" sm="4">
              <v-container class="mt-5">
                <h2 class="headline">Popular Bootcamps by category</h2>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-card flat>
      <v-container>
        <v-tabs class="pl-10 pr-10" v-model="tab" background-color="white">
          <v-tab v-for="item in items" :key="item.tab" @click="fetch(item.tab)">
            {{ item.tab }}
          </v-tab>
        </v-tabs>
      </v-container>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <CampsGrid :camps="camps" imgHeight="200" truncate="text-truncate" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
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
      items: [
        { tab: "Web Development", content: "Tab 1 Content" },
        { tab: "Mobile Development", content: "Tab 2 Content" },
        { tab: "Software Development", content: "Tab 3 Content" },
        { tab: "Robotics", content: "Tab 4 Content" },
        { tab: "Mechatronics", content: "Tab 5 Content" },
        { tab: "Data Science", content: "Tab 6 Content" },
        { tab: "UI/UX", content: "Tab 7 Content" },
        { tab: "Marketing", content: "Tab 8 Content" },
        { tab: "Lifestyle", content: "Tab 9 Content" },
        { tab: "Photography", content: "Tab 10 Content" },
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

      try {
        this.camps = (
          await CampsService.getTrendingCamps(query, careerType)
        ).data.results;
      } catch (error) {
        console.log(this.tab);
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
