const express = require("express");
const router = express.Router();

const students = require("../data/student");

// GET all students
router.get("/", (req, res) => {
  res.json(students);
});

// GET student by ID
router.get("/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.json(student);
});

// POST - Add student
router.post("/", (req, res) => {
  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name: req.body.name,
    age: req.body.age,
    course: req.body.course
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added",
    student: newStudent
  });
});

// PUT - Update student
router.put("/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  student.name = req.body.name;
  student.age = req.body.age;
  student.course = req.body.course;

  res.json({
    message: "Student updated",
    student: student
  });
});

// DELETE - Delete student
router.delete("/:id", (req, res) => {
  const index = students.findIndex(s => s.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const deletedStudent = students.splice(index, 1);

  res.json({
    message: "Student deleted",
    student: deletedStudent[0]
  });
});

module.exports = router;