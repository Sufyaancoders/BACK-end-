//import React from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
function Students() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      courseName: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const fetchCourses = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/courses");
            console.log('Fetched courses:', res.data);
            setCourses(res.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setError("Failed to load courses");
        }
    };
    useEffect(() => {
        fetchCourses();
        fetchStudents();
  
    
      

    }, []);
  
    const fetchStudents = async () => {
      try {
        console.log('Fetching students...');
        const res = await axios.get("http://localhost:5000/api/students");
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (isEditing) {
          await axios.put(
            `http://localhost:5000/api/students/${editId}`,
            formData
          );
        } else {
          await axios.post("http://localhost:5000/api/students", formData);
        }
        fetchStudents();
        resetForm();
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const handleEdit = (student) => {
      setFormData(student);
      setIsEditing(true);
      setEditId(student._id);
    };
  
    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this student?")) {
        try {
          await axios.delete(`http://localhost:5000/api/students/${id}`);
          fetchStudents();
        } catch (error) {
          console.error("Error deleting student:", error);
        }
      }
    };
  
    const resetForm = () => {
      setFormData({ name: "", email: "", phone: "", courseName: "" });
      setIsEditing(false);
      setEditId(null);
    };
  
    return (
      <div className="max-w-4xl mx-auto p-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}
            
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Student Management
        </h2>
  
        {/* Student Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
           {/* // <input
            //   type="text"
            //   placeholder="Course Name"
            //   value={formData.courseName}
            //   onChange={(e) =>
            //     setFormData({ ...formData, courseName: e.target.value })
            //   }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         /> */}
         <select
            value={formData.courseName}
            onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
        >
            <option value="">Select Course</option>
            {courses.map((course) => (
                <option key={course._id} value={course.name}>
                    {course.name}
                </option>
            ))}
        </select>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isEditing ? "Update Student" : "Add Student"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
  
        {/* Students List */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h3 className="text-xl font-semibold mb-4">Students List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.courseName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  export default Students;