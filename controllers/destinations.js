const Flight = require("../models/flight");

module.exports = {
  create,
};
async function create(req, res) {
  try {
    console.log(req.body);
    const oneFlight = await Flight.findById(req.params.id);
    oneFlight.destinations.push(req.body);
    await oneFlight.save();
    console.log(oneFlight);
    //redirec to the same flight's show page
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/flights/${req.params.id}`);
  }
}
