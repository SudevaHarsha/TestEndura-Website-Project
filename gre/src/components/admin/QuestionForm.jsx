"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateQuestionForm = ({ questionTypes, tests }) => {
  const [formData, setFormData] = useState({
    testId: '',
    typeId: '',
    questionText: '',
    numberOfOptions: 0,
    options: [],
    correctAnswer: [],
    description: '',
    highlighted: false,
    blankType: '',
    select: false,
    image: false,
    section: '',
    numberOfBlanks: 0, // New state for number of blanks
    blankOptions: [''],
    paragraph: '',
    highlightedSentence: '',
    correctSentence : '',
    Quantity1: '',
    Quantity2: ''
  });

  /*   const [questionTypes, setQuestionTypes] = useState([]);
  
    useEffect(() => {
      fetchQuestionTypes();
    }, []);
  
    const fetchQuestionTypes = async () => {
      try {
        const response = await axios.get('/api/question-type');
        console.log(response);
        setQuestionTypes(response);
      } catch (error) {
        console.error('Error fetching question types:', error);
      }
    }; */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' || type === 'radio' ? (type === 'checkbox' ? checked : value === 'true') : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };
  const handleOptionChange = (e, index) => {
    const { value } = e.target;
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      options: updatedOptions,
    }));
  };

  const handleNumberOfBlanksChange = (e) => {
    const numberOfBlanks = parseInt(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      numberOfBlanks,
      blankOptions: Array.from({ length: numberOfBlanks }, () => ''), // Reset blank options array
    }));
  };

  // Function to handle change in blank option
  const handleBlankOptionChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedBlankOptions = [...prevFormData.blankOptions];
      updatedBlankOptions[index] = value;
      return {
        ...prevFormData,
        blankOptions: updatedBlankOptions,
      };
    });
  };

  // Function to render blank option inputs
  const renderBlankOptionsInputs = () => {
    return Array.from({ length: formData.numberOfBlanks }).map((_, index) => (
      <div key={index} className="mb-4">
        Blank {index + 1} Options:
        <div className="flex flex-col">
          {Array.from({ length: 3 }).map((_, optionIndex) => (
            <div key={index} className="mb-4">
              <input
                key={optionIndex}
                type="text"
                value={formData.blankOptions[index * 3 + optionIndex] || ''}
                onChange={(e) => handleBlankOptionChange(e, index * 3 + optionIndex)}
                className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <label className="block mt-2">
                <input
                  type="checkbox"
                  name={`correctOptions[${optionIndex}]`}
                  checked={formData.correctAnswer.includes(optionIndex)}
                  onChange={(e) => handleCorrectOptionChange(e, optionIndex)}
                  className="mr-2"
                />
                Correct Option
              </label>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const handleCorrectOptionChange = (e, index) => {
    const { checked } = e.target;
    setFormData((prevFormData) => {
      const updatedcorrectAnswer = checked
        ? [...prevFormData.correctAnswer, index]
        : prevFormData.correctAnswer.filter((optionIndex) => optionIndex !== index);
      return {
        ...prevFormData,
        correctAnswer: updatedcorrectAnswer,
      };
    });
  };

  const handleCreateQuestion = async () => {
    try {
      // Send form data to backend for question creation
      console.log(formData);
      const response = await axios.post('/api/questions', { ...formData });
      console.log('Question created successfully:', response.data);
      // Reset form after successful creation
      setFormData({
        testId: '',
        typeId: '',
        questionText: '',
        numberOfOptions: 0,
        options: [],
        correctAnswer: [],
        description: '',
        highlighted: false,
        blankType: '',
        select: false,
        image: false,
        section: '',
        numberOfBlanks: 0, // New state for number of blanks
        blankOptions: [''],
        paragraph: '',
        highlightedSentence: '',
        correctSentence : '',
        Quantity2: '',
        Quantity1: ''
      });
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Question</h2>
      <label className="block mb-4">
        Test:
        <select
          name="testId"
          value={formData.testId}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Test</option>
          {tests && tests?.map((test) => (
            <option key={test.id} value={test.id}>
              {test.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block mb-4">
        Question Type:
        <select
          name="typeId"
          value={formData.typeId}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Question Type</option>
          {questionTypes && questionTypes?.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type}
            </option>
          ))}
        </select>
      </label>
      <label className="block mb-4">
        Section:
        <select
          name="section"
          value={formData.section}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Section</option>
          {formData.testId &&
            tests
              .find((test) => test.id === formData.testId)
              ?.sections.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
        </select>
      </label>

      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'Reading Comprehension' && (
        <label className="block mb-4">
          Paragraph:
          <textarea
            name="paragraph"
            value={formData.paragraph}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
      )}
      <label className="block mb-4">
        Question Text:
        <input
          type="text"
          name="questionText"
          value={formData.questionText}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label>
      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'Blank' && (
        <div className="mb-4">
          <label className="block mb-2 font-bold">Blank Type:</label>
          <select
            name="blankType"
            value={formData.blankType}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          >
            <option value="">Select Blank Type</option>
            <option value="normal">Normal</option>
            <option value="input">Input</option>
          </select>
        </div>
      )}
      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'Blank' && formData.blankType === 'normal' && (
        <>
          <label className="block mb-4">
            Number of Blanks:
            <input
              type="number"
              name="numberOfBlanks"
              value={formData.numberOfBlanks}
              onChange={handleNumberOfBlanksChange}
              className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          {/* Render blank options inputs */}
          {renderBlankOptionsInputs()}
        </>
      )}
      {!formData.select && questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type != 'Blank' && <label className="block mb-4">
        Number of Options:
        <input
          type="number"
          name="numberOfOptions"
          value={formData.numberOfOptions}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label>}
      {formData.select && <label className="block mb-4">
        Correct Answer:
        <input
          type="text"
          name="correctSentence"
          value={formData.correctSentence}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label>}
      {/* {Array.from({ length: formData.numberOfOptions }).map((_, index) => (
        <div key={index} className="mb-4">
          Option {index + 1}:
          <input
            type="text"
            value={formData.options[index] || ''}
            onChange={(e) => handleOptionChange(e, index)}
            className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      ))} */}
      {!formData.select && Array.from({ length: formData.numberOfOptions }).map((_, index) => (
        <div key={index} className="mb-4">
          Option {index + 1}:
          <input
            type="text"
            value={formData.options[index] || ''}
            onChange={(e) => handleOptionChange(e, index)}
            className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label className="block mt-2">
            <input
              type="checkbox"
              name={`correctOptions[${index}]`}
              checked={formData.correctAnswer.includes(index)}
              onChange={(e) => handleCorrectOptionChange(e, index)}
              className="mr-2"
            />
            Correct Option
          </label>
        </div>
      ))}

      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'Reading Comprehension' && (
        <>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Highlighted:</label>
            <input
              type="checkbox"
              name="highlighted"
              checked={formData.highlighted}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Select:</label>
            <input
              type="radio"
              name="select"
              value={true}
              checked={formData.select === true}
              onChange={handleChange}
            />{' '}
            Yes
            <input
              type="radio"
              name="select"
              value={false}
              checked={formData.select === false}
              onChange={handleChange}
            />{' '}
            No
          </div>
        </>
      )}
      {formData.highlighted && (
        <label className="block mb-4">
          Sentence to Highlight:
          <input
            type="text"
            name="highlightedSentence"
            value={formData.highlightedSentence}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
      )}
      {(questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'MCQ' || questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'Quantitative') && (
        <div className="mb-4">
          <label className="block mb-2 font-bold">Image:</label>
          <input
            type="checkbox"
            name="image"
            checked={formData.image}
            onChange={handleChange}
          />
        </div>
      )}
      {questionTypes.find((Qtype) => Qtype.id === formData.typeId)?.type === 'Quantitative' && (
        <>
          <label className="block mb-4">
            Quantity 1:
            <input
              type="text"
              name="Quantity1"
              value={formData.Quantity1}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <label className="block mb-4">
            Quantity 2:
            <input
              type="text"
              name="Quantity2"
              value={formData.Quantity2}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </>
      )}
      {/* <label className="block mb-4">
        Correct Option:
        <input
          type="text"
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label> */}
      <label className="block mb-4">
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </label>
      <button
        onClick={handleCreateQuestion}
        className="block w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Create Question
      </button>
    </div>
  );
};

export default CreateQuestionForm
