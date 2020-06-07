<template>
  <v-autocomplete
    v-model="searchModel"
    :items="results"
    :loading="isLoading"
    :search-input.sync="search"
    color="primary"
    background-color="white"
    hide-no-data
    hide-details
    single-line
    dense
    outlined
    item-text="name"
    class="hidden-md-and-down"
    item-value="_id"
    @change="redirect($event)"
    label="Search"
    placeholder="Search for anything"
  ></v-autocomplete>
</template>

<script>
import axios from "axios";
import router from "../../router/index";

export default {
  props: [""],
  data() {
    return {
      isLoading: false,
      searchModel: "",
      search: null,
      entries: [],
    };
  },
  computed: {
    results() {
      return this.entries.map((entry) => {
        return Object.assign({}, entry);
      });
    },
  },
  methods: {
    redirect() {
      router.push(`/view/${this.searchModel}`);
    },
  },
  watch: {
    search(val) {
      if (this.entries.length > 10) return;

      if (this.isLoading) return;

      this.isLoading = true;

      axios
        .get(`http://localhost:5000/api/v1/camps?name=${val}`)
        .then((response) => {
          this.entries = response.data.results;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
