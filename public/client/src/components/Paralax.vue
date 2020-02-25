<template>
  <v-content>
    <v-parallax dark :src="imgSrc" :height="height">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">Vuetify.js</h1>
          <h4 class="subheading">Build your application today!</h4>
        </v-col>
      </v-row>
    </v-parallax>
  </v-content>
</template>

<script>
export default {
  props: ["imgSrc", "height"],
  data() {
    return {};
  }
};
</script>

<style lang="stylus"></style>
