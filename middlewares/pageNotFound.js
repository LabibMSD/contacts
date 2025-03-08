export default (req, res) => {
    res.status(404).render("pageNotFound", {
        layout: "layouts/layout",
        title: "Page Not Found"
    });
}