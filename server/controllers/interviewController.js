import Interview from "../models/Interview.js";
import {
  generateMCQQuestions,
  generateHRQuestions,
  evaluateHRAnswers,
} from "../utils/aiService.js";

const HR_CATEGORY = "HR Round";

function getMcqFeedback(score) {
  if (score >= 80) {
    return {
      feedback: "Excellent technical performance.",
      strengths: [
        "Strong technical knowledge",
        "Accurate answers",
        "Excellent problem solving",
      ],
      improvements: ["Improve speed"],
    };
  }

  if (score >= 50) {
    return {
      feedback: "Average performance with room for improvement.",
      strengths: ["Basic understanding", "Good effort"],
      improvements: ["Improve technical concepts", "Practice more MCQs"],
    };
  }

  return {
    feedback: "Needs improvement. Keep practicing.",
    strengths: ["Attempted all questions"],
    improvements: [
      "Practice fundamentals",
      "Improve technical knowledge",
      "Solve more practice questions",
    ],
  };
}

// CREATE INTERVIEW
export const createInterview = async (req, res) => {
  try {
    const { category } = req.body;
    const isHR = category === HR_CATEGORY;

    const questions = isHR
      ? await generateHRQuestions()
      : await generateMCQQuestions(category);

    const interview = await Interview.create({
      user: req.user._id,
      category,
      interviewType: isHR ? "voice" : "mcq",
      questions,
    });

    res.status(201).json(interview);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE INTERVIEW
export const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SUBMIT INTERVIEW
export const submitInterview = async (req, res) => {
  try {
    const { answers } = req.body;

    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.interviewType === "voice") {
      const evaluation = await evaluateHRAnswers(
        interview.questions,
        answers
      );

      const evaluations = evaluation.evaluations ?? [];
      const totalScore = evaluations.reduce(
        (sum, item) => sum + (item.score || 0),
        0
      );
      const score =
        evaluations.length > 0
          ? Math.round(totalScore / evaluations.length)
          : 0;

      interview.answers = answers;
      interview.score = score;
      interview.feedback = evaluation.overallFeedback || "";
      interview.strengths = evaluation.strengths ?? [];
      interview.improvements = evaluation.improvements ?? [];
      interview.questionEvaluations = evaluations.map((item) => ({
        questionIndex: item.questionIndex,
        question: interview.questions[item.questionIndex]?.question ?? "",
        answer: answers[item.questionIndex] ?? "",
        score: item.score,
        feedback: item.feedback,
      }));
    } else {
      const totalQuestions = interview.questions.length;
      let correctCount = 0;

      answers.forEach((answer, index) => {
        const correctAnswer = interview.questions[index]?.answer;
        if (answer === correctAnswer) {
          correctCount += 1;
        }
      });

      const score =
        totalQuestions > 0
          ? Math.min(100, Math.round((correctCount / totalQuestions) * 100))
          : 0;

      const { feedback, strengths, improvements } = getMcqFeedback(score);

      interview.answers = answers;
      interview.score = score;
      interview.feedback = feedback;
      interview.strengths = strengths;
      interview.improvements = improvements;
    }

    interview.completed = true;
    await interview.save();

    res.status(200).json(interview);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ message: error.message });
  }
};

// GET USER HISTORY
export const getUserInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user._id,
      completed: true,
    }).sort({ createdAt: -1 });

    res.status(200).json(interviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user._id,
      completed: true,
    });

    const totalInterviews = interviews.length;
    const completed = interviews.filter((item) => item.completed).length;

    let averageScore = 0;

    if (interviews.length > 0) {
      const totalScore = interviews.reduce(
        (acc, item) => acc + item.score,
        0
      );
      averageScore = Math.floor(totalScore / interviews.length);
    }

    res.status(200).json({
      totalInterviews,
      completed,
      averageScore,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
