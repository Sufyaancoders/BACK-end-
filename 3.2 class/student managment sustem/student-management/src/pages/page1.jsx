import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className="flex flex-col items-center gap-12 mt-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Student Management System
        </h1>
  
        <Link
          to="/students"
          className="w-64 text-center transition-all duration-300 ease-in-out"
        >
          <button className="w-full px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Students
          </button>
        </Link>
  
        <Link
          to="/courses"
          className="w-64 text-center transition-all duration-300 ease-in-out"
        >
          <button className="w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Courses
          </button>
        </Link>
      </div>
    );
  }
  export default Home;