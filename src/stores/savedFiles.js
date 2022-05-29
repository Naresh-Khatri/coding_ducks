import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { LocalStorage, SessionStorage } from "quasar";

export const useFilesStore = defineStore("savedFiles", {
  state: () => ({
    problems: problems,
    currentProblem: problems[0],
    currentProblemIndex: 0,
  }),
  actions: {
    async fetchProblems() {
      const problems = await api.get("/problems");
      this.problems = problems.data;
    },
    setCurrentProblem(num) {
      this.currentProblemIndex = num;
      this.currentProblem = this.problems[num];
    },
  },
});
