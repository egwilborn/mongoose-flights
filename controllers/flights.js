const Flight = require("../models/flight");

module.exports = {
  index,
  new: newFlight,
  create,
  show,
};

async function index(req, res) {
  const flights = await Flight.find({}).sort({ departs: "asc" });
  res.render("flights/index", { flights });
}

function newFlight(req, res) {
  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  departsDate += `-${dt.getDate().toString().padStart(2, "0")}T${dt
    .toTimeString()
    .slice(0, 5)}`;
  res.render("flights/new", { departsDate });
}

async function create(req, res) {
  if (req.body.departs === "") {
    delete req.body.departs;
  }
  try {
    await Flight.create(req.body);
    res.redirect("/flights/");
  } catch (err) {
    console.log(err);
    res.redirect("/flights/new");
  }
}

async function show(req, res) {
  try {
    const oneFlight = await Flight.findById(req.params.id);
    res.render("flights/show", { oneFlight });
  } catch (err) {
    console.log(err);
    res.redirect("/flights/index");
  }
}
