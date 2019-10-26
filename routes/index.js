let express =   require("express"),
    router  =   express.Router({mergeParams: true});


//Home page route
router.get("/", (req, res) => res.render("landing"));

module.exports = router;