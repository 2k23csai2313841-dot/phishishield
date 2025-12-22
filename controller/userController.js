export const index = (req, res) => {
  res.render("index", {
    currentPage: "home",
    pageTitle: "PhishShield - Advanced Cybersecurity Protection",
  });
};
export const about = (req, res) => {
  res.render("about", { currentPage: "about", pageTitle: "About us" });
};

export const feedback = (req, res) => {
  res.render("contact", { currentPage: "feedback", pageTitle: "Feedback" });
};
