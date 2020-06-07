<template>
  <v-container fluid no-gutters class="pa-0">
    <v-row no-gutters>
      <v-col cols="12" sm="8" xl="12">
        <v-parallax dark :src="imgSrc" :height="height">
          <v-card elevation="0" color="transparent">
            <v-container>
              <v-row class="ml-10 pl-15" justify="start">
                <v-col xl="4">
                  <h1
                    class=" display-1 text-left white--text font-weight-medium mb-4"
                  >
                    Start learning today!
                  </h1>
                  <h2
                    class=" subheading white--text font-weight-medium text-left mb-4"
                  >
                    Study any topic, anytime. Choose from thousands of
                    expert-led courses now.
                  </h2>

                  <Autocomplete />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-parallax>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-card
          style="background: rgb(251,63,63);
background: linear-gradient(14deg, rgba(251,63,63,1) 0%, rgba(70,92,252,1) 100%);"
          flat
          elevation="0"
        >
          <v-container class="">
            <v-row
              color="transparent"
              align="center"
              no-gutters
              justify="center"
            >
              <v-col
                v-for="message in messages"
                :key="message.title"
                :cols="12"
                sm="3"
              >
                <v-card color="transparent" flat class="ma-0 pa-0">
                  <v-card-text class="text-center pa-2">
                    <v-icon class="mb-1" size="30" color="white">
                      mdi-checkbox-marked-circle
                    </v-icon>
                    <p class="headline white--text ma-0">{{ message.title }}</p>
                    <p class="subheading white--text ma-0">
                      {{ message.desc }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Autocomplete from "../Navigation/Autocomplete";
export default {
  props: ["imgSrc", "height"],
  data() {
    return {
      messages: [
        {
          icon: "",
          title: "50,000 Courses",
          desc: "Explore a variety of topics",
        },
        {
          icon: "",
          title: "Trusted Publishers",
          desc: "Over 20,000 Camps rated 5+",
        },
        {
          icon: "",
          title: "Quality Courses",
          desc: "Over 10,000 satisfied students",
        },
      ],
    };
  },
  components: {
    Autocomplete,
  },
};
</script>

<style lang="stylus"></style>
