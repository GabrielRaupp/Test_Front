"use strict";

const Time = require('../models/timeModel');
const timeController = {
  createTime: (req, res) => {
    const newTime = {
      username: req.body.username,
      trabalho: req.body.trabalho,
      time: req.body.time
    };
    Time.create(newTime, (err, timeId) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      res.redirect('/times');
    });
  },
  getTimeById: (req, res) => {
    const timeId = req.params.id;
    Time.findById(timeId, (err, time) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      if (!time) {
        return res.status(404).json({
          message: 'Time not found'
        });
      }
      res.render('times/show', {
        time
      });
    });
  },
  getAllTimes: (req, res) => {
    Time.getAll((err, times) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      res.render('times/index', {
        times
      });
    });
  },
  renderCreateForm: (req, res) => {
    res.render('times/create');
  },
  renderEditForm: (req, res) => {
    const timeId = req.params.id;
    Time.findById(timeId, (err, time) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      if (!time) {
        return res.status(404).json({
          message: 'Time not found'
        });
      }
      res.render('times/edit', {
        time
      });
    });
  },
  updateTime: (req, res) => {
    const timeId = req.params.id;
    const updatedTime = {
      username: req.body.username,
      trabalho: req.body.trabalho,
      time: req.body.time
    };
    Time.update(timeId, updatedTime, err => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      res.redirect('/times');
    });
  },
  deleteTime: (req, res) => {
    const timeId = req.params.id;
    Time.delete(timeId, err => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      res.redirect('/times');
    });
  }
};
module.exports = timeController;