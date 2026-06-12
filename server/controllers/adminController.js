import User from "../models/User.js";

import Interview from "../models/Interview.js";

import Resume from "../models/Resume.js";


// GET ADMIN STATS
export const getAdminStats =
  async (req, res) => {

    try {

      // TOTAL USERS
      const users =
        await User.countDocuments();

      // ONLY COMPLETED INTERVIEWS
      const interviews =
        await Interview.countDocuments({

          completed: true,

        });

      // TOTAL RESUMES
      const resumes =
        await Resume.countDocuments();

      // GET USERS
      const allUsers =
        await User.find()

        .select("-password")

        .sort({
          createdAt: -1,
        });

      res.status(200).json({

        users,

        interviews,

        resumes,

        allUsers,

      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }

  };