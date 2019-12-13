/* eslint-disable consistent-return */
const express = require('express');
const Project = require('../../../models/Project');
const auth = require('../../../middleware/auth');

const router = express.Router();

// @route   DELETE api/admin/projects/:id
// @desc    Delete a project
// @access  Public
router.delete('/:id', auth, (req, res) => {
  Project.findById(req.params.id)
    .then((project) => project.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;
