import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    category: {
      type: String,
      required: true,
    },

    interviewType: {
      type: String,
      enum: ["mcq", "voice"],
      default: "mcq",
    },

    questions: [
      {
        question: String,
        options: [String],
        answer: String,
      },
    ],

    answers: [
      {
        type: String,
      },
    ],

    questionEvaluations: [
      {
        questionIndex: Number,
        question: String,
        answer: String,
        score: Number,
        feedback: String,
      },
    ],

    score: {
      type: Number,
      default: 0,
    },

    feedback: {
      type: String,
      default: "",
    },

    strengths: [
      {
        type: String,
      },
    ],

    improvements: [
      {
        type: String,
      },
    ],

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
