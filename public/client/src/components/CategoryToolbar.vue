<template>
  <v-container fluid class="ma-0 pa-0 color">
    <v-container>
      <v-toolbar color="transparent" elevation="0">
        <v-btn
          text
          v-for="(item, index) in items"
          :key="index"
          @click="filterCamps(item.title)"
        >
          {{ item.title }}
        </v-btn>
      </v-toolbar>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Web Development",
          items: { title: "Web Development" },
          icon: ""
        },
        { title: "Business" },
        { title: "Finace & Accounting" },
        { title: "IT & Software" },
        { title: "Office & Productivity" },
        { title: "Design" },
        { title: "Marketing" },
        { title: "Lifestyle" },
        { title: "Photography" },
        { title: "Health & Fitness" },
        { title: "Data Science" }
      ]
    };
  },
  methods: {
    filterCamps(title) {
      this.$emit("filterCamps", title);
    }
  }
};
</script>

<style lang="css" scoped>
.color {
  background-color: #ececec;
}
</style>
