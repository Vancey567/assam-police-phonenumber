export function isLoggedIn(req, res, next) {
  console.log("middlwware")
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
