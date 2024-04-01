"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';

const StudentViewDashboard = () => {

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const UserHeadings = ['Id', 'User', 'Assigned', 'Role'];
    const [studentsByNames, setStudentByNames] = useState([]);
    const [filteredStudents,setFilteredStudents] = useState([]);
    const [selectedAlphabet, setSelectedAlphabet] = useState();

    const handleFilter = (letter) => {
        setSelectedAlphabet(letter);
        const filteredUsers = studentsByNames.filter((student) => student.name.toUpperCase().startsWith(letter))
        setFilteredStudents([...filteredUsers]);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const StudentByNames = await axios.get("/api/student-by-name");
                setStudentByNames(StudentByNames.data.profiles);
                setFilteredStudents(StudentByNames.data.profiles)
                console.log("Names Dashboard", StudentByNames.data.profiles);
            } catch (error) {
                console.error("Error fetching StudentByNames:", error);
            }
        };
        fetchData();
    }, []);

    return <>
        <div>TeacherDashboard</div>

        <div className="flex space-x-2">
            {alphabet.map(letter => (
                <button
                    key={letter}
                    onClick={() => handleFilter
                        (letter)}
                    className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                    {letter}
                </button>
            ))}
        </div>

        {<table className="min-w-full">
            <thead className='bg-gray-50'>
                <tr>
                    {
                        UserHeadings.map((heading) => {
                            return <th key={heading} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                {heading}
                            </th>
                        })
                    }
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                </tr>
            </thead>
            <tbody>
                {filteredStudents.map((user) => (
                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={user.imageUrl}
                                        alt=""
                                    />
                                </div>

                                <div className="ml-4">
                                    <div className="text-sm leading-5 font-medium text-gray-900">
                                        {user.name}
                                    </div>
                                    <div className="text-sm leading-5 text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                            </span>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                            {user.role}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                            <a
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                                Edit
                            </a>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium cursor-pointer" onClick={() => handleEvaluate(user.profile)}>
                            <div
                                className="text-strong hover:text-strong/90"
                            >
                                Evaluate
                            </div>
                        </td>
                    </tr>))}
            </tbody>
        </table>}
    </>
}

export default StudentViewDashboard