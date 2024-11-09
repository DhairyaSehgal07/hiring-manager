import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: localStorage.getItem("jobs")
    ? JSON.parse(localStorage.getItem("jobs"))
    : [
        {
          id: "70a35127-b802-4c0b-a8b2-33897b11afbe",
          title: "Software Engineer",
          description: "Responsible for developing web applications.",
          candidates: [
            "cfebb1b9b9095af0f9ca3ae1",
            "8f1bb9b4d4a85bb2bca7ad3c",
            "7eebf2a4a9082af3c8a2de6b",
            "f3a19b6b2345a6d8f7d4ae1c",
          ],
        },
        {
          id: "817d62f0-a302-4a6f-8a13-062cbc2bc356",
          title: "Product Manager",
          description: "Lead product strategy and development.",
          candidates: [
            "d9a1b7a8c4e6b2f3a0d5bc7f",
            "a2e4c9d7f9086ba3c5d9af4e",
            "b7c1d2e3a9f0b8c5d6e4a9f1",
            "c5b3f2a9d8c6e3a7b0a1d4f2",
          ],
        },
        {
          id: "ac5e8281-d2cd-486a-b448-c848f9a79ce5",
          title: "UX/UI Designer",
          description: "Design user interfaces for mobile apps.",
          candidates: [
            "a1b8f2c4d6e7a3b9c0f3e2d1",
            "c6d4b3a8f7e2a9b0d5c1f3e9",
            "d9e1c7b4f3a8b2a5d6e7a0c2",
            "b0dff5c9c4564fa9b8c8ad3e",
          ],
        },
        {
          id: "3fe75ad3-bfcc-443a-af1e-b89f510dcef7",
          title: "Marketing Specialist",
          description: "Handle digital marketing campaigns.",
          candidates: [
            "ae4c22d2d9024fb7aa5b9f1a",
            "e3c7d2b8a6f9a0b5d4f1c9e2",
            "f0a7d6c5b4e3a2b9c1d8f4a9",
          ],
        },
        {
          id: "412b02e9-836b-4315-acd3-0b1cf8af88d4",
          title: "Sales Executive",
          description: "Drive sales growth and manage customer relations.",
          candidates: [
            "a2e4c9d7f9082af3c5d9af4e",
            "d9a1b7a8c4e6b2f3a0d5bc7f",
            "cfebb1b9b9095af0f9ca3ae1",
          ],
        },
      ],
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      localStorage.setItem("jobs", JSON.stringify(action.payload));
    },
    clearJobs: (state) => {
      state.jobs = [];
      localStorage.removeItem("jobs");
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
      localStorage.setItem("jobs", JSON.stringify(state.jobs));
    },
    editJob: (state, action) => {
      const { id, ...updatedJobData } = action.payload;
      const jobIndex = state.jobs.findIndex((job) => job.id === id);

      if (jobIndex !== -1) {
        state.jobs[jobIndex] = { ...state.jobs[jobIndex], ...updatedJobData };
        localStorage.setItem("jobs", JSON.stringify(state.jobs));
      }
    },

    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter(
        (prevJobs) => prevJobs.id !== action.payload
      );
      localStorage.setItem("jobs", JSON.stringify(state.jobs));
    },
  },
});

export const { setJobs, clearJobs, addJob, editJob, deleteJob } =
  jobsSlice.actions;
export default jobsSlice.reducer;
