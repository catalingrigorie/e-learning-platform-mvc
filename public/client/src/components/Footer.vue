<template>
  <v-container>
    <v-footer padless>
      <v-container fluid class="pa-0">
        <v-card elevation="0" class="#033 lighten-1 white--text pa-7">
          <div class="d-flex" v-for="(column, index) in columns" :key="index">
            <v-list-item dense v-for="(item, index) in column" :key="index">
              <v-list-item-content class="d-flex pa-0">
                <v-list-item-title>
                  <p class="body-2 ma-0">{{ item }}</p>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card>

        <v-card elevation="0" class="#033 lighten-1 white--text pa-3">
          <v-card-text class="body-2 ma-3 text-center">
            {{ new Date().getFullYear() }} —
            <strong>E-Learning Platform</strong>
          </v-card-text>
        </v-card>
      </v-container>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      links: [
        "Sitename for Business",
        "Teach on Sitename",
        "Get the app",
        "About us",
        "Careers",
        "Blog",
        "Help and support",
        "Affiliate program",
        "Terms",
        "Privacy policy and cookie policy",
        "Sitemap",
        "Featured camps"
      ],
      items: 4
    };
  },
  computed: {
    columns() {
      let columns = [];
      let mid = Math.ceil(this.links.length / this.items);
      for (let col = 0; col < this.items; col++) {
        columns.push(this.links.slice(col * mid, col * mid + mid));
      }
      return columns;
    }
  }
};
</script>

<style lang="stylus"></style>
