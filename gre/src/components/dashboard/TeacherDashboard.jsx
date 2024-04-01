"use client"

import React, { useEffect, useState } from 'react'
import StudentEssays from '../teacher/StudentEssays';
import axios from 'axios';

const TeacherDashboard = ({ sessions }) => {
    const UserHeadings = ['Id', 'User', 'Assigned', 'Role'];
    const [users, setUsers] = useState([]);
    const [teacherView, setTeacherView] = useState('teacher');
    const [student, setStudent] = useState([]);
    const [selectedTest, setSelectedTest] = useState('65f73277ce3e9ee465e53313');
    const [tests, setTests] = useState([]);
    const [uniqueSessions,setUniqueSessions] = useState([]);

    const [studentsByNames,setStudentByNames] = useState([]);

    const students = users.filter((user) => user.profile.role === 'student');
    const data = students.map((student)=>{
        const repeated = uniqueSessions.filter((session)=> session.profileId === student.profileId);
        repeated.length === 0 && setUniqueSessions([...uniqueSessions,student])
    })

    console.log(data);
    


    const handleEvaluate = (user) => {
        setTeacherView('essays');
        setStudent(user);
    }

    const handleSelectTest = (test) => {
        setSelectedTest(test);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Filteredsessions = await axios.get(`/api/sessions/${selectedTest}`);
                setUsers(Filteredsessions.data.testSessions);
                console.log("Dashboard", Filteredsessions.data.testSessions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchData();
    }, [selectedTest])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tests = await axios.get("/api/find-test");
                setTests(tests.data.tests);
                const StudentByNames = await axios.get("/api/student-by-name");
                setStudentByNames(StudentByNames.data.testSessions);
                console.log("Names Dashboard", StudentByNames.data.testSessions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <div>TeacherDashboard</div>
            {tests && tests.map((test) => (
                <button
                    key={test.id}
                    className={`mr-4 ${selectedTest === test.id && 'bg-blue-500 text-white'}`}
                    onClick={() => handleSelectTest(test.id)}
                >
                    {test.name}
                </button>
            ))}
            {teacherView === 'teacher' && <table className="min-w-full">
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
                    {uniqueSessions.map((user) => (
                        <tr key={user.profile.id}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                {user.profile.id}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={user.profile.imageUrl}
                                            alt=""
                                        />
                                    </div>

                                    <div className="ml-4">
                                        <div className="text-sm leading-5 font-medium text-gray-900">
                                            {user.profile.name}
                                        </div>
                                        <div className="text-sm leading-5 text-gray-500">
                                            {user.profile.email}
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
                                {user.profile.role}
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
            {teacherView === 'student' && <table className="min-w-full">
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
                    {studentsByNames.map((user) => (
                        <tr key={user.profile.id}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                {user.profile.id}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={user.profile.imageUrl}
                                            alt=""
                                        />
                                    </div>

                                    <div className="ml-4">
                                        <div className="text-sm leading-5 font-medium text-gray-900">
                                            {user.profile.name}
                                        </div>
                                        <div className="text-sm leading-5 text-gray-500">
                                            {user.profile.email}
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
                                {user.profile.role}
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
            {teacherView === 'essays' && <StudentEssays student={student} setTeacherView={setTeacherView} />}
        </>
    )
}

export default TeacherDashboard