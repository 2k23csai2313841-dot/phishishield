import History from "../models/historyModel.js";
export const history = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Filter for only "Analyze" action records
    const query = { userId: req.session.userId, action: "Analyze" };

    // Get total count
    const totalCount = await History.countDocuments(query);

    // Get paginated history
    const historyData = await History.find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip);

    const totalPages = Math.ceil(totalCount / limit);

    res.render("history", {
      history: historyData,
      currentPage: page,
      totalPages,
      totalCount,
      pageTitle: "History",
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (err) {
    console.error(" History fetch error:", err);
    res.status(500).render("error");
  }
};
