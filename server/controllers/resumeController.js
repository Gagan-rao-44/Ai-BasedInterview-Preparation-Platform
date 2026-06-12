import Resume from "../models/Resume.js";


// UPLOAD RESUME
export const uploadResume = async (
  req,
  res
) => {

  try {

    console.log(req.file);

    // CHECK FILE
    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded",
      });

    }

    // SIMPLE ANALYSIS
    const score =
      Math.floor(
        Math.random() * 40
      ) + 60;

    let feedback =
      "Good resume overall.";

    let suggestions = [];

    if (score >= 85) {

      feedback =
        "Excellent professional resume.";

      suggestions = [
        "Add certifications",
        "Improve project details",
      ];

    }

    else if (score >= 70) {

      feedback =
        "Good resume with minor improvements.";

      suggestions = [
        "Improve summary section",
        "Add more technical skills",
      ];

    }

    else {

      feedback =
        "Resume needs improvement.";

      suggestions = [
        "Add projects",
        "Improve formatting",
        "Add achievements",
      ];

    }

    const resume =
      await Resume.create({

        user: req.user._id,

        filename:
          req.file.filename,

        score,

        feedback,

        suggestions,

      });

    console.log("Resume Saved");

    res.status(201).json(resume);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};