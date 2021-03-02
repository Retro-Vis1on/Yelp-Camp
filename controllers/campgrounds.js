const Campground = require("../models/campgrounds");


module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}
module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new')
}

module.exports.createCamp = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save()
    req.flash('success', "Successfully made a new campground")
    res.redirect(`/campgrounds/${campground.id}`)
}

module.exports.updateCamp = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', "Successfully updated campground")
    res.redirect(`/campgrounds/${id}`)
}

module.exports.deleteCamp = async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id)
    req.flash('success', "Successfully deleted campground!")
    res.redirect(`/campgrounds`)
}

module.exports.renderEditForm = async (req, res) => {
    const id = req.params.id
    const campground = await Campground.findById(id);
    console.log(campground)
    res.render('campgrounds/edit', { campground })
}

module.exports.indivisualCamp = async (req, res) => {
    try {
        const campground = await Campground.findById(req.params.id).populate({ path: 'reviews', populate: { path: 'author' } })
        if (campground == null) {
            req.flash('error', 'Cannot find campground!')
            return res.redirect('/campgrounds')
        }
        return res.render('campgrounds/show', { campground })
    }
    catch (e) {
        req.flash('error', 'Cannot find campground!')
        return res.redirect('/campgrounds')
    }

}