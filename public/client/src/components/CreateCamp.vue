<template>
  <v-container style="backgroundColor: #ececec;" fluid>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="8" lg="4" xl="5">
          <v-card outlined>
            <v-card-title class="linear-gradient">
              Create Camp
            </v-card-title>
            <v-card-text class="pa-7">
              <v-form ref="form" v-model="valid">
                <v-text-field
                  label="Name"
                  v-model="name"
                  name="name"
                  type="text"
                  :rules="[rules.required]"
                />

                <v-textarea
                  label="Description"
                  hint="Wirte a short description of the camp"
                  v-model="description"
                  :rules="[rules.required]"
                  auto-grow
                  rows="1"
                  counter="250"
                ></v-textarea>

                <v-text-field
                  label="Email"
                  v-model="email"
                  name="email"
                  type="email"
                  :rules="[rules.required, rules.email]"
                />

                <v-text-field
                  label="Camp Website"
                  name="website"
                  type="text"
                  v-model="website"
                />

                <!-- :rules="[rules.website]" -->

                <v-text-field
                  label="Phone Number"
                  name="phone"
                  type="text"
                  v-model="phone"
                />

                <v-text-field
                  label="Address"
                  v-model="address"
                  name="address"
                  type="text"
                  :rules="[rules.required]"
                />
                <!-- <v-select
                  :items="fields"
                  label="Careers"
                  v-model="careers"
                ></v-select> -->
                <v-select
                  v-model="careers"
                  :items="fields"
                  :menu-props="{ maxHeight: '400' }"
                  label="Careers"
                  multiple
                  hint="Select all relevant careers"
                  persistent-hint
                  :rules="[rules.selected]"
                ></v-select>
                <v-checkbox
                  v-model="housing"
                  label="Housing"
                  hint="Does the bootcamp offer housing?"
                  value
                  persistent-hint
                ></v-checkbox>

                <v-checkbox
                  v-model="jobAssistance"
                  label="Job Assistance"
                  hint="Does the bootcamp offer assistance in getting a job?"
                  persistent-hint
                ></v-checkbox>
                <v-checkbox
                  v-model="JobGuarantee"
                  label="Job Guarantee"
                  hint="Does the bootcamp offer a guaranteed job?"
                  persistent-hint
                ></v-checkbox>

                <v-btn
                  :disabled="!valid"
                  class="mt-5"
                  color="primary"
                  @click="validate"
                  >Submit</v-btn
                >
                <!-- <v-alert v-if="checkErorrs" type="error" outlined>
              {{ checkErorrs }}
            </v-alert> -->
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
// import axios from "axios";
// import { AuthenticationService } from "../services/api";

import { CampsService } from "../services/api";
import router from "../router/index";
export default {
  data() {
    return {
      fields: [
        "Robotics and Mechatronics",
        "Software Development",
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Other"
      ],
      name: "",
      token: null,
      description: "",
      website: "",
      phone: "",
      email: "",
      address: "",
      careers: [],
      image: "",
      housing: false,
      jobAssistance: false,
      JobGuarantee: false,
      valid: true,
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        selected: value =>
          value.length > 0 || "Please select at least one relevant career"
      }
    };
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        const campData = {
          name: this.name,
          description: this.description,
          website: this.website,
          phone: this.phone,
          email: this.email,
          address: this.address,
          careers: this.careers,
          housing: this.housing,
          jobAssistance: this.jobAssistance,
          JobGuarantee: this.JobGuarantee
        };

        try {
          const { data } = (await CampsService.createCamp(campData)).data;
          router.push({ path: `/view/${data._id}` });
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  },
  created() {
    const User = this.getUser;
    this.email = User.email;
  },
  beforeCreate() {
    const allowedRoles = "publisher" || "admin";
    const currentUserRole = this.$store.getters.getUser.role; // can't access computed propery in 'beforeCreate' hook

    if (!allowedRoles.includes(currentUserRole)) {
      router.replace("/");
    }
  }
};
</script>

<style lang="css" scoped>
.linear-gradient {
  background: rgb(251, 63, 63) !important;
  background: linear-gradient(
    14deg,
    rgba(251, 63, 63, 1) 0%,
    rgba(70, 92, 252, 1) 100%
  ) !important;
}
</style>
