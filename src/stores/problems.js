import { defineStore } from "pinia";
import { api } from "src/boot/axios";

// import problems from "src/problems";

export const useProblemStore = defineStore("problems", {
  state: () => ({
    problems: [],
    currentProblem: null,
    currentProblemIndex: 0,
  }),
  actions: {
    async fetchProblems() {
      const problems = await api.get("/problems");
      this.problems = problems.data;
      this.currentProblem = this.problems[0];
      return this.problems;
    },
    setCurrentProblem(num) {
      this.currentProblemIndex = num;
      this.currentProblem = this.problems[num];
    },
  },
});
