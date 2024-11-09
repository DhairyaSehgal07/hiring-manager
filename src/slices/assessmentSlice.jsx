import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assessments: localStorage.getItem("assessments")
    ? JSON.parse(localStorage.getItem("assessments"))
    : [
        {
          jobId: "70a35127-b802-4c0b-a8b2-33897b11afbe", // Software Engineer
          questions: [
            {
              questionId: "q1",
              text: "What programming languages are you proficient in?",
              type: "multiple-choice",
              options: ["JavaScript", "Python", "Java", "Ruby"],
              correctAnswer: "JavaScript",
            },
            {
              questionId: "q2",
              text: "Which of the following best describes your experience with web development?",
              type: "multiple-choice",
              options: [
                "Frontend development with React and HTML/CSS",
                "Backend development with Node.js and Express",
                "Full-stack development with React, Node.js, and MongoDB",
                "None of the above",
              ],
              correctAnswer:
                "Full-stack development with React, Node.js, and MongoDB",
            },
            {
              questionId: "q3",
              text: "Which version control systems have you used in the past?",
              type: "multiple-choice",
              options: ["Git", "SVN", "Mercurial", "Perforce"],
              correctAnswer: "Git",
            },
          ],
        },
        {
          jobId: "817d62f0-a302-4a6f-8a13-062cbc2bc356", // Product Manager
          questions: [
            {
              questionId: "q1",
              text: "How would you prioritize tasks in a product roadmap?",
              type: "multiple-choice",
              options: [
                "By impact",
                "By deadline",
                "By customer feedback",
                "By resources available",
              ],
              correctAnswer: "By impact",
            },
            {
              questionId: "q2",
              text: "What is the most important aspect of market research?",
              type: "multiple-choice",
              options: [
                "Competitor analysis",
                "Customer needs",
                "Pricing strategy",
                "Product performance",
              ],
              correctAnswer: "Customer needs",
            },
            {
              questionId: "q3",
              text: "Which product development methodology do you prefer?",
              type: "multiple-choice",
              options: ["Agile", "Waterfall", "Lean", "Scrum"],
              correctAnswer: "Agile",
            },
          ],
        },
        {
          jobId: "ac5e8281-d2cd-486a-b448-c848f9a79ce5", // UX/UI Designer
          questions: [
            {
              questionId: "q1",
              text: "Which design tools are you most proficient in?",
              type: "multiple-choice",
              options: ["Sketch", "Figma", "Adobe XD", "InVision"],
              correctAnswer: "Figma",
            },
            {
              questionId: "q2",
              text: "What is the primary goal of user-centered design?",
              type: "multiple-choice",
              options: [
                "To create visually appealing designs",
                "To optimize user experience",
                "To ensure fast development",
                "To reduce costs",
              ],
              correctAnswer: "To optimize user experience",
            },
            {
              questionId: "q3",
              text: "How do you conduct user testing?",
              type: "multiple-choice",
              options: [
                "Surveys and questionnaires",
                "A/B testing",
                "Usability testing",
                "All of the above",
              ],
              correctAnswer: "All of the above",
            },
          ],
        },
        {
          jobId: "3fe75ad3-bfcc-443a-af1e-b89f510dcef7", // Marketing Specialist
          questions: [
            {
              questionId: "q1",
              text: "What digital marketing channels are you most experienced with?",
              type: "multiple-choice",
              options: [
                "SEO",
                "PPC",
                "Social media marketing",
                "Email marketing",
              ],
              correctAnswer: "Social media marketing",
            },
            {
              questionId: "q2",
              text: "How do you measure the success of a marketing campaign?",
              type: "multiple-choice",
              options: [
                "Click-through rate",
                "Conversion rate",
                "Return on investment (ROI)",
                "All of the above",
              ],
              correctAnswer: "All of the above",
            },
            {
              questionId: "q3",
              text: "Which social media platform do you find most effective for B2B marketing?",
              type: "multiple-choice",
              options: ["Facebook", "LinkedIn", "Instagram", "Twitter"],
              correctAnswer: "LinkedIn",
            },
          ],
        },
        {
          jobId: "412b02e9-836b-4315-acd3-0b1cf8af88d4", // Sales Executive
          questions: [
            {
              questionId: "q1",
              text: "How would you approach cold calling a potential client?",
              type: "multiple-choice",
              options: [
                "Introduce yourself and your company",
                "Ask for the client's needs and pain points",
                "Explain how your product or service can help them",
                "All of the above",
              ],
              correctAnswer: "All of the above",
            },
            {
              questionId: "q2",
              text: "What is your strategy for overcoming sales objections?",
              type: "multiple-choice",
              options: [
                "Address concerns with facts",
                "Offer discounts",
                "Change the product offering",
                "Refer them to a competitor",
              ],
              correctAnswer: "Address concerns with facts",
            },
            {
              questionId: "q3",
              text: "Which sales tools or CRM software are you familiar with?",
              type: "multiple-choice",
              options: [
                "Salesforce",
                "HubSpot",
                "Zoho CRM",
                "All of the above",
              ],
              correctAnswer: "All of the above",
            },
          ],
        },
      ],
};

const assessmentsSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {
    addAssessment: (state, action) => {
      const { jobId, questions } = action.payload;
      // Check if an assessment for this job already exists to avoid duplicates
      const existingAssessment = state.assessments.find(
        (assessment) => assessment.jobId === jobId
      );
      if (!existingAssessment) {
        // Only add if it doesn't already exist
        state.assessments.push({ jobId, questions });
        localStorage.setItem("assessments", JSON.stringify(state.assessments));
      } else {
        console.warn(`Assessment for job ID ${jobId} already exists.`);
      }
    },
    updateAssessment: (state, action) => {
      const { jobId, questions } = action.payload;
      const existingAssessmentIndex = state.assessments.findIndex(
        (assessment) => assessment.jobId === jobId
      );

      if (existingAssessmentIndex >= 0) {
        // Update the questions for the existing assessment
        state.assessments[existingAssessmentIndex].questions = questions;
        localStorage.setItem("assessments", JSON.stringify(state.assessments));
      } else {
        console.warn(`Assessment for job ID ${jobId} does not exist.`);
      }
    },
    addQuestionToAssessment: (state, action) => {
      const { jobId, question } = action.payload;
      const assessment = state.assessments.find(
        (assessment) => assessment.jobId === jobId
      );

      if (assessment) {
        assessment.questions.push(question);
        localStorage.setItem("assessments", JSON.stringify(state.assessments));
      } else {
        console.warn(`Assessment for job ID ${jobId} does not exist.`);
      }
    },
    editQuestionInAssessment: (state, action) => {
      const { jobId, questionIndex, updatedQuestion } = action.payload;
      const assessment = state.assessments.find(
        (assessment) => assessment.jobId === jobId
      );

      if (assessment && assessment.questions[questionIndex]) {
        assessment.questions[questionIndex] = updatedQuestion;
        localStorage.setItem("assessments", JSON.stringify(state.assessments));
      } else {
        console.warn(
          `Question at index ${questionIndex} for job ID ${jobId} does not exist.`
        );
      }
    },
    deleteQuestionFromAssessment: (state, action) => {
      const { jobId, questionIndex } = action.payload;
      const assessment = state.assessments.find(
        (assessment) => assessment.jobId === jobId
      );

      if (assessment && assessment.questions[questionIndex]) {
        // Remove the question at the specified index
        assessment.questions.splice(questionIndex, 1);
        // Update localStorage to persist the change
        localStorage.setItem("assessments", JSON.stringify(state.assessments));
      } else {
        console.warn(
          `Question at index ${questionIndex} for job ID ${jobId} does not exist.`
        );
      }
    },

    clearAssessments: (state) => {
      state.assessments = [];
      localStorage.removeItem("assessments");
    },
  },
});

export const {
  addAssessment,
  updateAssessment,
  addQuestionToAssessment,
  editQuestionInAssessment,
  deleteQuestionFromAssessment,
  clearAssessments,
} = assessmentsSlice.actions;

export default assessmentsSlice.reducer;
