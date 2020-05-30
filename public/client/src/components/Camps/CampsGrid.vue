<template>
  <v-container fluid>
    <v-container>
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
              <v-card :min-height="minHeight" hover @click="viewCamp(camp._id)">
                <v-img
                  class="white--text align-end"
                  :height="imgHeight || null"
                  :src="`http://localhost:5000/images/${camp.image}`"
                >
                </v-img>
                <v-card-title
                  class="text-truncate d-inline-block "
                  style="max-width: inherit;"
                >
                  {{ camp.name }}
                </v-card-title>

                <v-card-text class="text--primary">
                  <div>
                    <span
                      class="d-block"
                      :class="truncate"
                      style="truncate ? max-width: inherit : ''; white-space: pre-line;"
                      >{{ camp.description }}</span
                    >
                  </div>
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
        <v-row v-if="camps == null && loaders">
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
    </v-container>
  </v-container>
</template>

<script>
import router from "../../router/index";

export default {
  props: [
    "camps",
    "loaders",
    "imgHeight",
    "minHeight",
    "truncate",
    "descWidth",
  ],
  data() {
    return {};
  },
  methods: {
    viewCamp(id) {
      router.push({ path: `/view/${id}` });
    },
  },
  components: {},
};
</script>

<style lang="css"></style>
