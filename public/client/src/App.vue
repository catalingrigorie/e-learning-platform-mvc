<template>
  <v-app>
    <component :is="layout">
      <router-view :layout.sync="layout" />
    </component>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  data() {
    return {
      layout: `div`
    };
  },
  created() {
    this.$store.dispatch("tryLogin");
  }
};
</script>
