//models go here
const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  new: newTicket,
  create,
};

async function newTicket(req, res) {
  try {
    const ticketFlight = await Flight.findById(req.params.id);
    //render a page that will show a form to create a new ticket
    res.render("tickets/new", { flight: ticketFlight });
  } catch (err) {
    console.log(err);
  }
}

async function create(req, res) {
  try {
    //find the correct flight entry from the flight schema
    const ticketFlight = await Flight.findById(req.params.id);
    //input the correct flight entry into req.body
    req.body.flight = ticketFlight;
    // add a new ticket using the info from the req body
    const newTicket = await Ticket.create(req.body);
    //redirec to the corresponding flight page
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
}
