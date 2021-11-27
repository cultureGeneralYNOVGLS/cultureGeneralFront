<template>
  <article :id="'article_' + game._id">
    <h2>{{ game.name }} ({{ game.status }})</h2>
    <p>Score => {{ game.score }}</p>
    <p>
      Nombre de question => {{ game.numberQuestions }}, Question :
      {{ game.progressionQuestions || "fini" }}
    </p>

    <v-btn class="ma-2" color="primary" :href="'/game/' + game._id" dark>
      Play this game
      <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
    </v-btn>

    <v-btn class="ma-2" color="red" @click="deleteGame(game)" dark>
      Supprimer
      <v-icon dark right> mdi-cancel </v-icon>
    </v-btn>
  </article>
</template>

<script>
export default {
  props: ["game"],
  methods: {
    deleteGame(game) {
      this.$swal({
        title: `La partie ${game.name} sera définitivement supprimé`,
        showDenyButton: true,
        confirmButtonText: "Oui",
        denyButtonText: `Non`,
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:7510/game/${game._id}`, {
            method: "DELETE",
          }).then(() => {
              document.getElementById(`article_` + game._id).style.display = "none";
          });
        } else if (result.isDenied) {
          //Pas de suppression
        }
      });
    },
  },
};
</script>

<style>
article {
  background-color: #efefef;
  border-radius: 1rem;
  padding: 1rem 2rem;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  color: #2c3e50;
}

article h2 {
  margin-bottom: 1rem;
}
</style>
