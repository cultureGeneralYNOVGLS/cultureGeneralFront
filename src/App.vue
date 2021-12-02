<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      
      <v-spacer></v-spacer>
      <v-btn href="/" text>
        <span class="mr-2">Jouer</span>
        <v-icon>mdi-play-circle-outline</v-icon>
      </v-btn>
      <v-btn href="/authentification" text>
        <span class="mr-2">{{label}}</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    label:'Connexion'
  }),
  mounted() {
    
    if (localStorage.idUser && localStorage.tokenUser) {
      //localStorage.idUser = 'tom';

      fetch(`http://localhost:3001/api/user/auth`, {
        method: "POST",
        body: JSON.stringify({ token: localStorage.tokenUser }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => {
        if (res.status === 400) {
          localStorage.idUser = null;
          localStorage.tokenUser = null;
          this.label = 'Connexion';
          this.$router.push(`authentification`);
        }
        else {
          this.label = 'Déconnexion';
        }
      });
    } else {
      this.label = 'Connexion';
      this.$router.push(`authentification`);
    }
  },
};
</script>