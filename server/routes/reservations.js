const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { protect, adminOnly } = require('../middleware/auth');

// @route   POST /api/reservations
// @desc    Create reservation, validate required fields, return created doc
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body;

    // Check required fields explicitly for clear error messages
    if (!name || !email || !date || !time || guests === undefined || guests === null) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, date, time, guests',
      });
    }

    const guestNum = Number(guests);
    if (isNaN(guestNum) || guestNum < 1 || guestNum > 20) {
      return res.status(400).json({
        success: false,
        message: 'Number of guests must be between 1 and 20',
      });
    }

    const reservation = await Reservation.create({
      name,
      email,
      phone,
      date,
      time,
      guests: guestNum,
      specialRequests,
    });

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/reservations
// @desc    List all reservations
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res, next) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/reservations/:id
// @desc    Get single reservation by ID
// @access  Private/Admin
router.get('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `Reservation not found with id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PATCH /api/reservations/:id
// @desc    Update reservation status (pending / confirmed / cancelled)
// @access  Private/Admin
router.patch('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `Reservation not found with id ${req.params.id}`,
      });
    }

    // Allow updating status and other fields
    const allowedUpdates = ['status', 'date', 'time', 'guests', 'specialRequests'];
    const updates = {};
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const updated = await Reservation.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Reservation updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/reservations/:id
// @desc    Delete a reservation
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `Reservation not found with id ${req.params.id}`,
      });
    }

    await Reservation.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Reservation deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
