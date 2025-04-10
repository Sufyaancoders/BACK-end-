import axios from 'axios';
import React, { useState, useEffect } from 'react';
function Courses() {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
      name: "",
      branch: "",
      HOD: "",
      teacher: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
  
    useEffect(() => {
      fetchCourses();
    }, []);
  
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      try {
        if (isEditing) {
          await axios.put(
            `http://localhost:5000/api/courses/${editId}`,
            formData
          );
        } else {
          await axios.post("http://localhost:5000/api/courses", formData);
        }
        fetchCourses();
        resetForm();
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const handleEdit = (course) => {
      setFormData(course);
      setIsEditing(true);
      setEditId(course._id);
    };
  
    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this course?")) {
        try {
          await axios.delete(`http://localhost:5000/api/courses/${id}`);
          fetchCourses();
        } catch (error) {
          console.error("Error deleting course:", error);
        }
      }
    };
  
    const resetForm = () => {
      setFormData({ 
        name: "", 
        branch: "", 
        HOD: "", 
        teacher: ""  // Add teacher field
      });
      setIsEditing(false);
      setEditId(null);
    };
  
    return (
      <div className="max-w-4xl mx-auto p-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Course Management
        </h2>
  
        {/* Course Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Course Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="text"
              placeholder="Branch"
              value={formData.branch}
              onChange={(e) =>
                setFormData({ ...formData, branch: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="text"
              placeholder="HOD name"
              value={formData.HOD}
              onChange={(e) =>
                setFormData({ ...formData, HOD: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
             <input
              type="text"
              placeholder="teacher name"
              value={formData.teacher}
              onChange={(e) =>
                setFormData({ ...formData, teacher: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700  mr-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isEditing ? "Update Course" : "Add Course"}
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
  
        {/* Courses List */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h3 className="text-xl font-semibold mb-4">Courses List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   courseName 
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   HOD 
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   teacher
                  </th>
                 
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{course.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.branch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.HOD}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.teacher}
                    </td>
               
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(course)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
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
  export default Courses;