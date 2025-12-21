export const requireLogin = (req, res, next) => {
  if (req.session && req.session.userId) return next();

  // Check if it's an AJAX/fetch request
  if (req.headers["content-type"] === "application/json" || req.xhr) {
    return res.status(401).json({
      error: "Please login to analyze URLs",
      redirectUrl: "/login",
    });
  }

  // For regular page requests, redirect
  return res.redirect("/login");
};
