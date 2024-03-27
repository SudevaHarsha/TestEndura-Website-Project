"use client"

import React, { useEffect, useState } from 'react';
import SideNavbar from './SideNavbar';
import DashboardTable from './DashboardTable';
import CreateTestForm from '../admin/CreateTestForm';
import QuestionTypeForm from '../admin/QuestionTypeForm';
import CreateQuestionForm from '../admin/QuestionForm';
import CreateQuestion from '../admin/CreateQuestion';
import axios from 'axios';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { currentProfile } from '@/lib/current-profile';

import { useRouter } from 'next/navigation';

const Dashboard = ({ users }) => {
    const [navState, setNavState] = useState('dashboard');
    const [question, setQuestion] = useState([]);
    const [questionId, setQuestionId] = useState(); // Initialize with 
    const [typeId, setTypeId] = useState(); // Initialize with null
    /* const [edited, setEdited] = useState(false); */

    const {edited,setEdited} = useCurrentQuestion();
    const router = useRouter();

   /*  const profile = currentProfile();
    console.log(profile.role); */

    /* if(profile.role != 'admin') {
      router.back();
    } */

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(questionId,typeId);
                const response = await axios.get(`/api/questions/${questionId}/${typeId}`);
                console.log("Dashboard", response.data.Question);
                setQuestion(response.data.Question); // Update state with fetched data
                /* setEdited(false); */
            } catch (error) {
                console.error("Error fetching question:", error);
            }
        };

        // Call fetchData only if 'edited' is true and questionId and typeId are not null
        if (edited && questionId !== null && typeId !== null) {
            fetchData();
        }
    }, [edited, questionId, typeId]); // Listen to changes in 'edited', 'questionId', and 'typeId'

    return (
        <div className='flex w-full h-full'>
            <SideNavbar users={users} setNavState={setNavState} />
            {(navState === 'dashboard' || navState === 'users' || navState === 'tests' || navState === 'question types') && (
                <DashboardTable users={users} setNavState={setNavState} navState={navState} setTypeId={setTypeId} setQuestionId={setQuestionId} />
            )}
            {navState === 'test' && (
                <div className='w-full mr-3'>
                    <CreateTestForm />
                </div>
            )}
            {navState === 'type' && (
                <div className='w-full mr-3'>
                    <QuestionTypeForm />
                </div>
            )}
            {(navState === 'question' || edited) && (
                <div className='w-full mr-3'>
                    <CreateQuestion question={question} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
