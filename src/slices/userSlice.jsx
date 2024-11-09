import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [
        {
          id: "cfebb1b9b9095af0f9ca3ae1",
          name: "Anurag",
          email: "anurag@example.com",
          mobileNumber: "9876543210",
          skills: ["JavaScript", "React", "Node.js"],
          experience: "2 years",
          resumeLink: "abc",
          date: "23/07/2024",
          status: "Under Review",
        },
        {
          id: "8f1bb9b4d4a85bb2bca7ad3c",
          name: "Aarav",
          email: "aarav@example.com",
          mobileNumber: "9876543211",
          skills: ["Python", "Django", "REST API"],
          experience: "3 years",
          resumeLink: "def",
          date: "16/08/2024",
          status: "Interview Scheduled",
        },
        {
          id: "7eebf2a4a9082af3c8a2de6b",
          name: "Mira",
          email: "mira@example.com",
          mobileNumber: "9876543212",
          skills: ["Java", "Spring Boot", "Microservices"],
          experience: "4 years",
          resumeLink: "ghi",
          date: "20/09/2024",
          status: "Selected",
        },
        {
          id: "ae4c22d2d9024fb7aa5b9f1a",
          name: "Saanvi",
          email: "saanvi@example.com",
          mobileNumber: "9876543213",
          skills: ["Angular", "TypeScript", "RxJS"],
          experience: "1.5 years",
          resumeLink: "jkl",
          date: "15/10/2024",
          status: "Rejected",
        },
        {
          id: "b0dff5c9c4564fa9b8c8ad3e",
          name: "Rohan",
          email: "rohan@example.com",
          mobileNumber: "9876543214",
          skills: ["PHP", "Laravel", "MySQL"],
          experience: "2 years",
          resumeLink: "mno",
          date: "04/11/2024",
          status: "Under Review",
        },
        {
          id: "f3a19b6b2345a6d8f7d4ae1c",
          name: "Ishaan",
          email: "ishaan@example.com",
          mobileNumber: "9876543215",
          skills: ["Ruby", "Rails", "PostgreSQL"],
          experience: "3 years",
          resumeLink: "pqr",
          date: "01/12/2024",
          status: "Under Review",
        },
        {
          id: "d9a1b7a8c4e6b2f3a0d5bc7f",
          name: "Kiran",
          email: "kiran@example.com",
          mobileNumber: "9876543216",
          skills: ["Go", "Gin", "GraphQL"],
          experience: "2.5 years",
          resumeLink: "stu",
          date: "15/12/2024",
          status: "Interview Scheduled",
        },
        {
          id: "a2e4c9d7f9086ba3c5d9af4e",
          name: "Dev",
          email: "dev@example.com",
          mobileNumber: "9876543217",
          skills: ["C#", ".NET Core", "Azure"],
          experience: "4 years",
          resumeLink: "vwx",
          date: "10/01/2025",
          status: "Under Review",
        },
        {
          id: "b7c1d2e3a9f0b8c5d6e4a9f1",
          name: "Neha",
          email: "neha@example.com",
          mobileNumber: "9876543218",
          skills: ["React", "Redux", "JavaScript"],
          experience: "2 years",
          resumeLink: "yz",
          date: "18/01/2025",
          status: "Selected",
        },
        {
          id: "c5b3f2a9d8c6e3a7b0a1d4f2",
          name: "Raj",
          email: "raj@example.com",
          mobileNumber: "9876543219",
          skills: ["Vue.js", "Nuxt.js", "Firebase"],
          experience: "1 year",
          resumeLink: "abc",
          date: "23/01/2025",
          status: "Under Review",
        },
        {
          id: "a1b8f2c4d6e7a3b9c0f3e2d1",
          name: "Pooja",
          email: "pooja@example.com",
          mobileNumber: "9876543220",
          skills: ["Swift", "iOS Development", "UIKit"],
          experience: "3 years",
          resumeLink: "def",
          date: "02/02/2025",
          status: "Rejected",
        },
        {
          id: "c6d4b3a8f7e2a9b0d5c1f3e9",
          name: "Vikas",
          email: "vikas@example.com",
          mobileNumber: "9876543221",
          skills: ["Kotlin", "Android Development", "Coroutines"],
          experience: "2.5 years",
          resumeLink: "ghi",
          date: "10/02/2025",
          status: "Interview Scheduled",
        },
        {
          id: "d9e1c7b4f3a8b2a5d6e7a0c2",
          name: "Reema",
          email: "reema@example.com",
          mobileNumber: "9876543222",
          skills: ["Machine Learning", "TensorFlow", "Python"],
          experience: "3 years",
          resumeLink: "jkl",
          date: "19/02/2025",
          status: "Selected",
        },
        {
          id: "e3c7d2b8a6f9a0b5d4f1c9e2",
          name: "Tara",
          email: "tara@example.com",
          mobileNumber: "9876543223",
          skills: ["SQL", "Data Analysis", "Power BI"],
          experience: "1.5 years",
          resumeLink: "mno",
          date: "25/02/2025",
          status: "Under Review",
        },
        {
          id: "f0a7d6c5b4e3a2b9c1d8f4a9",
          name: "Sameer",
          email: "sameer@example.com",
          mobileNumber: "9876543224",
          skills: ["JavaScript", "Node.js", "Express"],
          experience: "2 years",
          resumeLink: "pqr",
          date: "01/03/2025",
          status: "Interview Scheduled",
        },
      ],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(action.payload));
    },
    clearUsers: (state) => {
      state.users = [];
      localStorage.removeItem("users");
    },
    updateUserStatus: (state, action) => {
      const { userId, newStatus } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.status = newStatus;
        // Update localStorage if needed
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
  },
});

export const { setUsers, clearUsers, updateUserStatus } = usersSlice.actions;

export default usersSlice.reducer;
