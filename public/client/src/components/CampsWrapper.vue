<template>
  <v-row justify="center">
    <v-col cols="12" lg="10">
      <v-row>
        <v-col v-for="(camp, idx) in camps" :key="idx">
          <v-card width="340">
            <v-img
              class="white--text align-end"
              height="250px"
              :src="`http://localhost:5000/images/${camp.image}`"
            >
              <v-card-title>{{ camp.name }}</v-card-title>
            </v-img>

            <!-- <v-card-subtitle class="pb-0">{{camp.description}}</v-card-subtitle> -->

            <v-card-text class="text--primary">
              <div>{{ camp.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" @click="viewCamp(camp._id)" text>
                View
              </v-btn>
              <v-rating
                readonly
                length="5"
                v-model="camp.averageRating"
              ></v-rating>
              <p>{{ camp.averageCost }}</p>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-row v-if="camps == null">
          <v-col v-for="(n, index) in 10" :key="index" lg="3">
            <v-skeleton-loader
              class="mx-auto"
              max-width="340"
              type="card, article, actions"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
// import axios from "axios";
import router from "../router/index";

export default {
  props: ["camps"],

  data() {
    return {};
  },
  methods: {
    viewCamp(campId) {
      router.push({ path: `/view/${campId}` });
    }
  },
  components: {}
};
</script>

<style lang="css"></style>
