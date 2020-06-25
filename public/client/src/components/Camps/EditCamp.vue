<template>
  <v-dialog max-width="650" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn class="ma-1 pa-1" block color="primary" dark v-on="on">
        Edit Camp
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Camp</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-row v-if="camp !== null">
              <v-col cols="12">
                <v-text-field
                  label="Name"
                  v-model="camp.name"
                  name="name"
                  type="text"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  hint="Wirte a short description of the camp"
                  v-model="camp.description"
                  :rules="[rules.required]"
                  auto-grow
                  rows="1"
                  counter="1000"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Email"
                  v-model="camp.email"
                  name="email"
                  type="email"
                  :rules="[rules.required, rules.email]"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Camp Website"
                  name="website"
                  type="text"
                  v-model="camp.website"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Phone Number"
                  name="phone"
                  type="text"
                  v-model="camp.phone"
                />
              </v-col>
              <v-col v-if="camp.location != undefined" cols="12" sm="6">
                <v-text-field
                  disabled
                  label="Address"
                  v-if="camp.location.formattedAddress"
                  v-model="camp.location.formattedAddress"
                  name="address"
                  type="text"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="camp.careers"
                  :items="fields"
                  :menu-props="{ maxHeight: '400' }"
                  label="Careers"
                  multiple
                  hint="Select all relevant careers"
                  persistent-hint
                  :rules="[rules.selected]"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="camp.jobAssistance"
                  label="Job Assistance"
                  hint="Does the bootcamp offer assistance in getting a job?"
                  persistent-hint
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn :disabled="!valid" color="blue darken-1" text @click="editCamp"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { CampsService } from "../../services/api";
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
        "Other",
      ],
      dialog: false,
      valid: true,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        selected: (value) =>
          value.length > 0 || "Please select at least one relevant career",
      },
    };
  },
  methods: {
    async editCamp() {
      this.dialog = false;

      if (this.$refs.form.validate()) {
        let id = this.$route.params.id;

        let campData = {
          name: this.camp.name,
          description: this.camp.description,
          website: this.camp.website,
          phone: +this.camp.phone,
          email: this.camp.email,
          address: this.camp.address,
          careers: this.camp.careers,
          jobAssistance: this.camp.jobAssistance,
        };

        try {
          await CampsService.editCamp(id, campData);
          this.$emit("editedCamp");
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  props: {
    camp: {
      type: Object,
    },
  },
};
</script>
