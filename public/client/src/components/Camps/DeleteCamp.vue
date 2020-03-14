<template>
  <v-dialog max-width="650" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn class="ma-1 pa-1" block color="primary" dark v-on="on">
        Delete Camp
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Delete Camp</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              This will delete the camp and all related courses, are you sure?
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">No</v-btn>
        <v-btn color="blue darken-1" text @click="deleteCamp">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { CampsService } from "../../services/api";
import router from "../../router/index";
export default {
  data() {
    return {
      valid: true,
      dialog: false
    };
  },
  methods: {
    async deleteCamp() {
      this.dialog = false;
      const campId = this.$route.params.id;

      try {
        await CampsService.deleteCamp(campId);
        this.$emit("deletedCamp");
        router.go(-1);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
