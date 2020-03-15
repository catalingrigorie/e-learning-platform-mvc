<template>
  <v-dialog max-width="650" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn class="ma-1 pa-1" block color="primary" dark v-on="on">
        Upload Image
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Select an image to upload</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-file-input
                :loading="loading"
                label="Image Upload"
                prepend-icon="mdi-camera"
                v-model="image"
                :rules="[rules.image, rules.extension]"
                @change="onSelect($event)"
                accept="image/png, image/jpeg, image/jpg"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">No</v-btn>
        <v-btn color="blue darken-1" text @click="uploadImage">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { CampsService } from "../../services/api";
// import router from "../router/index";
export default {
  data() {
    return {
      image: null,
      dialog: false,
      loading: false,
      rules: {
        image: value =>
          !value ||
          value.size < 2000000 ||
          "Image size should be less than 2 MB!",
        extension: value => {
          const allowedImages = ["image/jpeg", "image/jpg", "image/png"];
          if (value) {
            if (!allowedImages.includes(value.type)) {
              return "That's not an image file" || "";
            }
          }
        }
      }
    };
  },
  methods: {
    onSelect(val) {
      this.image = val;
    },
    async uploadImage() {
      this.loading = true;
      let id = this.$route.params.id;
      const formData = new FormData();
      formData.append("file", this.image);

      try {
        await CampsService.uploadPhoto(id, formData);
        //   router.go(-1);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
