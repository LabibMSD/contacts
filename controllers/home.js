export const renderHome = (req, res, next) => {
    try {
        res.render("home", {
            layout: "layouts/layout",
            title: "Home"
        });
    } catch (err) {
        next(err);
    }
}