<template>
  <v-content>
    <v-parallax dark :src="imgSrc" :height="height">
      <v-container>
        <v-row align="center" justify="start">
          <v-col class="text-center" cols="12" sm="4">
            <v-card class="" elevation="0" color="transparent">
              <h1
                class="display-1 text-left white--text font-weight-medium mb-4"
              >
                Start learning today!
              </h1>
              <h2
                class="subheading white--text font-weight-medium text-left mb-4"
              >
                Study any topic, anytime. Choose from thousands of expert-led
                courses now.
              </h2>
              <v-text-field
                solo
                label="What do you wanna learn?"
                name="email"
                color="red"
                backgroundColor="white"
                type="email"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
    <v-card
      style="background: rgb(251,63,63);
background: linear-gradient(14deg, rgba(251,63,63,1) 0%, rgba(70,92,252,1) 100%);"
      flat
      elevation="0"
    >
      <v-container class="">
        <v-row color="transparent" align="center" no-gutters justify="center">
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
  </v-content>
</template>

<script>
export default {
  props: ["imgSrc", "height"],
  data() {
    return {
      messages: [
        {
          icon: "",
          title: "50,000 Courses",
          desc: "Explore a variety of topics"
        },
        {
          icon: "",
          title: "Trusted Publishers",
          desc: "Over 20,000 Camps rated 5+"
        },
        {
          icon: "",
          title: "Quality Courses",
          desc: "Over 10,000 satisfied students"
        }
      ]
    };
  }
};
</script>

<style lang="stylus"></style>
