const express = require("express");
const app = express();
const path = require("path");
const engine = require('ejs-mate')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError')

const campgroundRoute = require('./routes/campgrounds')
const reviewsRoute = require('./routes/reviews')
const usersRoute = require('./routes/users')

const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/user')



app.use(methodOverride('_method'))
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.engine('ejs', engine)
app.use(express.urlencoded({ extended: true }))


const sessionConfig = {
  secret: 'thisisasecretnow',
  resave: false,
  saveUninitialized: true,
  cookie: {
    htppOnly: true,
    expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  res.locals.currentUser = req.user
  next();
})

app.use('/campgrounds', campgroundRoute)
app.use('/campgrounds/:id/reviews', reviewsRoute)
app.use('/', usersRoute)


app.listen(3000, () => {
  console.log("I'm up at 3000");
});

app.get("/", async (req, res) => {
  res.render('home')
});

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found!', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went Wrong' } = err
  if (!err.message) err.message = 'Something went wrong'
  res.status(statusCode).render('error', { err })
})

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("we're connected!");
  })
  .catch((err) => {
    console.log("Connection Failed!");
    console.log(err);
  });
