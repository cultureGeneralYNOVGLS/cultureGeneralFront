<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12"> </v-col>
      <v-tabs 
      centered
       >
        <v-tab v-for="tab in tabs" :key="tab.url" @click="component = tab.url">{{tab.libelle}}</v-tab>
      </v-tabs>
      <keep-alive>
        <component :is="component" />
      </keep-alive>
    </v-row>
  </v-container>
</template>


<script>
import Signin from "../components/Signin.vue";
import Login from "../components/Login.vue";

export default {
  components: {
    Signin,
    Login,
  },
  data: () => ({
    component: "Login",
    tabs: [
      { url: "Login", libelle: "Connexion" },
      { url: "Signin", libelle: "Inscription" },
    ],
  }),

  methods: {},
  mounted() {
    localStorage.idUser = null;
    localStorage.tokenUser = null;
  },
};
</script>