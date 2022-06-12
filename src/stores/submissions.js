import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useSubmissionStore = defineStore("submission", {
  state: () => ({
    submissions: [],
    score: "0",
  }),
  actions: {
    async fetchSubmissions() {
      try {
        //TODO: fix score calculation
        const res = await api.get("/users/getSubmissions/");
        this.submissions = res.data;
        let sum = (res.data[0] && res.data[0].marks) || 0;
        let prevId = (res.data[0] && res.data[0].problem_id) || 0;

        res.data &&
          res.data.forEach((submission) => {
            // console.log(submission);
            if (submission.problem_id != prevId) {
              sum += submission.marks;
            }
            prevId = submission.problem_id;
          });

        this.score = sum.toFixed(2);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
