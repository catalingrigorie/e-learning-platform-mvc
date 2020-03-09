<template>
  <v-container style="backgroundColor: #ececec;" fluid>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="8" lg="4" xl="5">
          <v-card outlined>
            <v-card-title
              style="background: rgb(251,63,63);
background: linear-gradient(14deg, rgba(251,63,63,1) 0%, rgba(70,92,252,1) 100%);"
            >
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
import axios from "axios";
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
      imageRule: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ],
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
        // website: value => {
        //   const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;
        //   return value ? pattern.test(value) || "Invalid website" : '';
        // }
      },
      validationError: erorrs => !!erorrs || ""
    };
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

        // CampsService.createCamp(campData).then(response => {
        //   const id = response.data._id;
        //   console.log(id);
        // });

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
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/v1/auth/currentuser", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        this.email = response.data.user.email;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="css"></style>
