<template>
  <div>
    <v-sheet v-if="reviews == null" class="height text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-sheet>
    <v-sheet v-else-if="reviews.length == 0" class="text-center">
      <p>
        No reviews yet, be the first to leave a review
      </p>
    </v-sheet>
    <v-card v-else outlined class="mt-5">
      <v-list three-line v-for="(review, i) in reviews" :key="i">
        <v-list-item>
          <v-list-item-avatar>
            <v-btn icon>
              <v-icon color="#792a5d" size="50">mdi-account-circle</v-icon>
            </v-btn>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <span class="title mb-3 pl-1">
                {{ review.title }}
                <small class="body-2">
                  - left by {{ review.user.name }} on
                  {{ new Date(review.createdAt).toLocaleString() }}
                </small>
              </span>
            </v-list-item-title>
            <v-rating
              dense
              class="mb-3"
              readonly
              length="5"
              v-model="review.rating"
            ></v-rating>
            <span class="subtitle-1 pb-2">
              {{ review.text }}
            </span>
          </v-list-item-content>
          <v-list-item-action v-if="review.user._id == currentUserId">
            <v-btn @click="deleteReview(review._id)" outlined color="danger">
              Delete
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider v-if="i !== reviews.length - 1"></v-divider>
      </v-list>
    </v-card>
    <v-card v-if="isAuthenticated" flat elevation="0">
      <v-divider></v-divider>
      <v-card-title>
        Leave a review
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            label="Title"
            :rules="[rules.required]"
            name="title"
            type="text"
            v-model="title"
          />
          <v-text-field
            label="Text"
            :rules="[rules.required]"
            name="Text"
            type="text"
            v-model="text"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-4">
        Rating
        <v-rating hover class="pl-2" length="5" v-model="rating"></v-rating>
        <span class="caption mr-2"> ({{ rating }}) </span>
        <v-spacer></v-spacer>

        <v-btn :disabled="!valid" color="primary" outlined @click="sendReview">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { ReviewsService } from "../../services/api";

export default {
  data() {
    return {
      reviews: null,
      valid: true,
      rating: 1,
      title: "",
      text: "",
      rules: {
        required: value => !!value || "Required"
      }
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isUserLoggedIn;
    },
    currentUserId() {
      const user = localStorage.getItem("user");
      const userId = JSON.parse(user)._id;

      return userId;
    }
  },
  methods: {
    async sendReview() {
      let id = this.$route.params.id;

      const reviewData = {
        rating: this.rating,
        title: this.title,
        text: this.text
      };
      if (this.$refs.form.validate()) {
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
    async deleteReview(reviewId) {
      let id = this.$route.params.id;

      try {
        await ReviewsService.deleteReview(reviewId);
        this.reviews = (await ReviewsService.getReviews(id)).data.reviews;
      } catch (error) {
        console.error(error.message);
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

<style lang="css" scoped>
.height {
  height: 30vh;
}
</style>
