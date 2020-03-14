<template>
  <v-row class="pl-10 pr-10" justify="start">
    <v-col
      cols="12"
      xl="3"
      lg="4"
      sm="6"
      v-for="(camp, idx) in camps"
      :key="idx"
    >
      <v-row justify="center">
        <v-col class="pl-7 pr-7">
          <v-card hover @click="viewCamp(camp._id)">
            <v-img
              class="white--text align-end"
              height="250px"
              :src="`http://localhost:5000/images/${camp.image}`"
            >
            </v-img>
            <v-card-title>{{ camp.name }}</v-card-title>

            <v-card-text style="min-height: 160px" class="text--primary">
              <div>{{ camp.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-rating
                readonly
                length="5"
                v-model="camp.averageRating"
              ></v-rating>
              <div v-if="camp.averageRating" class="grey--text ml-2">
                ({{ camp.averageRating }})
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-row v-if="camps == null">
      <v-col
        v-for="(n, index) in 10"
        :key="index"
        cols="12"
        xl="3"
        lg="4"
        sm="6"
      >
        <v-skeleton-loader
          class="mx-auto"
          max-width="340"
          type="card, article, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import router from "../../router/index";

export default {
  props: ["camps"],
  data() {
    return {};
  },
  methods: {
    viewCamp(id) {
      router.push({ path: `/view/${id}` });
    }
  },
  components: {}
};
</script>

<style lang="css"></style>
