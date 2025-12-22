export const Errorpage404 = (req, res) => {
  res
    .status(404)
    .render("error", { currentPage: "error", pageTitle: "Page Not Found" });
};
