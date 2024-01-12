const pool = require("../../db.js");
const queries = require("./queries");

const getCourses = async (req, res) => {
    try {
        const gcResults = await pool.query(queries.getCourses);
        res.status(200).json(gcResults.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const putCourses = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        await pool.query(queries.putCourses, [name, description, id]);
        res.status(200).send("Course updated");
    } catch (err) {
        console.error(err.message);
    }
};

const postCourses = async (req, res) => {
    try {
        const { name, description } = req.body;
        await pool.query(queries.postCourses, [name, description]);
        res.status(200).send("Course created");
    } catch (err) {
        console.error(err.message);
    }
};

const deleteCourses = async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query(queries.deleteCourses, [id]);
        console.log(`Deleted course with ID ${id}`);
        res.status(200).send("Course deleted");
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
  getCourses,
  putCourses,
  postCourses,
  deleteCourses,
};