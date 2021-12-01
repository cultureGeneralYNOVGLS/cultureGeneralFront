<template>
  <v-container>
    <!--<v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Game {{ game.name }} ({{ game.status }})
        </h1>
      </v-col>
    </v-row>-->
    <v-row class="text-center">
      <a href="/"> Retour</a>

      <v-col class="mb-4" v-if="game.status === 'finish'">
        <h1 class="display-2 font-weight-bold mb-3">Game {{ game.name }}</h1>
        <h1 class="display-2 font-weight-bold mb-3">
          Partie fini => Score {{ game.score }}/{{ game.numberQuestions }}
        </h1>
      </v-col>
      <v-col cols="12" v-else>
        <v-card width="400">
          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
              Game {{ game.name }} => Score : {{ game.score }}
            </div>

            <div class="font-weight-bold ml-8 mb-2">
              Question :
              {{ question }} tips => {{ goodAnswer }}
            </div>

            <v-timeline align-top dense>
              <v-timeline-item
                v-for="answer in answers"
                :key="answer"
                :color="getRandomColor()"
                @click.native.stop="sendAnswer(game, answer)"
                small
              >
                <div>
                  <div class="font-weight-normal">
                    <strong>{{ answer }}</strong>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
            <div class="font-weight-bold ml-8 mb-2">
              {{ game.progressionQuestions }}/{{ game.numberQuestions }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Game",

  data: () => ({
    game: {},
    goodAnswer: "",
    question: "",
    answers: [],
    randomColor: ["purple", "orange", "blue", "yellow", "red", "green", "rose"],
  }),
  components: {},
  methods: {
    getGame(_id) {
      fetch(`http://localhost:3000/game/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.tokenUser}`,
        },
      }).then((res) => {
        if (res.status === 401) {
          this.$router.push(`/authentification`);
        } else {
          res.json().then((game) => {
            this.game = game;
            this.getInformationsGame();
          });
        }
      });
    },
    sendAnswer(game, answer) {
      fetch(`http://localhost:3000/game/${game._id}`, {
        method: "PATCH",
        body: JSON.stringify({ answer: answer }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.tokenUser}`,
        },
      }).then((res) => {
        if (res.status === 401) {
          this.$router.push(`/authentification`);
        } else {
          res.json().then((game) => {
            this.game = game;
            this.getInformationsGame();
          });
        }
      });
    },
    getInformationsGame() {
      this.answers =
        this.game.questions[this.game.progressionQuestions - 1].answers;
      this.goodAnswer =
        this.game.questions[this.game.progressionQuestions - 1].goodAnswer;
      this.question =
        this.game.questions[this.game.progressionQuestions - 1].question;
    },
    getRandomColor() {
      return this.randomColor[
        Math.floor(Math.random() * this.randomColor.length)
      ];
    },
  },
  mounted() {
    this.getGame(this.$route.params._id);
    this.getInformationsGame();
  },
};
</script>

<style>
.v-timeline-item:hover {
  background: lightblue;
  cursor: pointer;
}
</style>