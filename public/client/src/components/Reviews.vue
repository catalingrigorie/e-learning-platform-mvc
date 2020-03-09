<template>
  <v-card outlined class="mt-5">
    <v-card-title>User Reviews</v-card-title>
    <v-list three-line v-for="(review, i) in reviews" :key="i">
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-avatar>
          <v-btn icon>
            <v-icon color="#792a5d" size="50">mdi-account-circle</v-icon>
          </v-btn>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-rating readonly length="5" v-model="review.rating"></v-rating>

          <v-list-item-title>
            {{ review.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="text-primary">
              {{ review.text }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn height="25" outlined color="danger">
            Delete
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-card>
      <v-card-title>
        Submit a review
      </v-card-title>
      <v-card-text>
        <v-text-field label="Title" name="title" type="text" v-model="title" />
        <v-text-field label="Text" name="title" type="text" v-model="text" />
        <v-rating class="pl-2" length="5" v-model="rating"></v-rating>
        <v-btn text @click="sendReview">
          Submit
        </v-btn>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import { ReviewsService } from "../services/api";

export default {
  data() {
    return {
      reviews: "",
      rating: null,
      title: "",
      text: ""
    };
  },
  methods: {
    async sendReview() {
      let id = this.$route.params.id;

      const reviewData = {
        rating: this.rating,
        title: this.title,
        text: this.text
      };

      try {
        await ReviewsService.postReview(id, reviewData);
        this.reviews = (await ReviewsService.getReviews(id)).data.reviews;
        this.$emit("updatedStats");
        this.title = null;
        this.rating = null;
        this.text = null;
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created() {
    let id = this.$route.params.id;

    try {
      this.reviews = (await ReviewsService.getReviews(id)).data.reviews;
    } catch (error) {
      console.log(error.message);
    }
  }
};
</script>
