/* eslint-disable consistent-return */
const express = require('express');
const Project = require('../../models/Project');

const router = express.Router();

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
router.get('/', (req, res) => {
  Project.find()
    .sort({ createdDate: -1 })
    .then((projects) => res.json(projects));
});

// @route   POST api/projects
// @desc    Create a new project
// @access  Public
router.post('/', (req, res) => {
  const {
    name,
    owner,
    size,
    startDate,
    endDate,
    category,
    technology,
    email,
    github,
    description,
    secret,
  } = req.body;

  if (!name) {
    return res.status(404).json({ msg: 'Please provide project name.' });
  }

  Project.findOne({ name })
    .then((project) => {
      if (project) return res.status(400).json({ msg: 'Project already existed.' });

      // Create newProject object
      const newProject = new Project({
        name,
        owner,
        size,
        startDate,
        endDate,
        category,
        technology,
        email,
        github,
        description,
        secret,
      });

      newProject.save()
        .then((savedNewProject) => res.json(savedNewProject))
        .catch((error) => res.json({ error }));
    });
});

// @route   DELETE api/projects/:id
// @desc    Delete a project
// @access  Public
router.delete('/:id', (req, res) => {
  Project.findById(req.params.id)
    .then((project) => project.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;
