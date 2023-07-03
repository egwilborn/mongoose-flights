const Flight = require("../models/flight");

module.exports = {
  create,
};
async function create(req, res) {
  try {
    const oneFlight = await Flight.findById(req.params.id);
    oneFlight.destinations.push(req.body);
    oneFlight.destinations.sort(function (a, b) {
      if (a.arrival < b.arrival) {
        return -1;
      } else if (a.arrival > b.arrival) {
        return 1;
      } else {
        return 0;
      }
    });
    await oneFlight.save();
    //redirec to the same flight's show page
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/flights/${req.params.id}`);
  }
}
