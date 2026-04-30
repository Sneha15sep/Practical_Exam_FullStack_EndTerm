const express = require("express");
const router = express.Router();
const Student = require("../models/Student");


/*
GET ALL STUDENTS
GET /api/students
*/
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/*
GET ONE STUDENT
GET /api/students/:id
*/
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student)
      return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/*
CREATE STUDENT
POST /api/students
*/
router.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);

    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


/*
UPDATE STUDENT
PUT /api/students/:id
*/
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


/*
DELETE STUDENT
DELETE /api/students/:id
*/
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;