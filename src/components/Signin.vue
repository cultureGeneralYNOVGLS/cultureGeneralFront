<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Inscription</h1>
      </v-col>

      <v-col cols="12">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="lastName"
            >
              <v-text-field
                v-model="lastName"
                :error-messages="errors"
                label="Nom"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="firstName"
            >
              <v-text-field
                v-model="firstName"
                :error-messages="errors"
                label="Prénom"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="email"
            >
              <v-text-field
                v-model="email"
                type="email"
                :error-messages="errors"
                label="Email"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="password"
            >
              <v-text-field
                v-model="password"
                type="password"
                :error-messages="errors"
                label="Password"
                required
              ></v-text-field>
            </validation-provider>
            

            <v-btn class="mr-4" type="submit" :disabled="invalid">
              submit
            </v-btn>
            <v-btn @click="clear"> clear </v-btn>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
      this.sendLogin();
    },
    clear() {
      this.email = "";
      this.password = "";
      this.lastName = "";
      this.firstName = "";
      this.$refs.observer.reset();
    },
    sendLogin() {
      let user = {
        email:this.email,
        password:this.password,
        last_name:this.lastName,
        first_name:this.firstName
      };

      fetch(`http://localhost:7512/api/user`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => {
        res.json().then((game) => {
          console.log(game);
          //this.$router.push(`/`) 
        });
      });
    },
  },
  mounted() {
  },
};
</script>