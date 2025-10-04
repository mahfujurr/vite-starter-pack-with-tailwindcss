import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Download, User, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const HealthQuestionnaireApp = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [responses, setResponses] = useState({
    sectionA: Array(7).fill(0),
    sectionB: Array(9).fill(0),
    sectionC: Array(10).fill(0),
    sectionD: Array(9).fill(0),
    partII: Array(9).fill(0)
  });

  const sections = [
    {
      id: 'intro',
      title: 'Patient Information',
      type: 'intro'
    },
    {
      id: 'sectionA',
      title: 'PART I - SECTION A',
      questions: [
        'Indigestion, food repeats on you after you eat',
        'Excessive burping, belching and/or bloating following meals',
        'Stomach spasms and cramping during or after eating',
        'A sensation that food just sits in your stomach creating uncomfortable fullness, pressure and bloating during or after a meal',
        'Bad taste in your mouth',
        'Small amounts of food fill you up immediately',
        'Skip meals or eat erratically because you have no appetite'
      ]
    },
    {
      id: 'sectionB',
      title: 'PART I - SECTION B',
      questions: [
        'Strong emotions, or the thought or smell of food aggravates your stomach or makes it hurt',
        'Feel hungry an hour or two after eating a good-sized meal',
        'Stomach pain, burning and/or aching over a period of 1-4 hours after eating',
        'Stomach pain, burning and/or aching relieved by eating food; drinking carbonated beverages, cream or milk; or taking antacids',
        'Burning sensation in the lower part of your chest, especially when lying down or bending forward',
        'Digestive problems that subside with rest and relaxation (0=No, 8=Yes)',
        'Eating spicy and fatty (fried) foods, chocolate, coffee, alcohol, citrus or hot peppers causes your stomach to burn or ache',
        'Feel a sense of nausea when you eat',
        'Difficulty or pain when swallowing food or beverage'
      ]
    },
    {
      id: 'sectionC',
      title: 'PART I - SECTION C',
      questions: [
        'When massaging under your rib cage on your left side, there is pain, tenderness or soreness',
        'Indigestion, fullness or tension in your abdomen is delayed, occurring 2-4 hours after eating a meal',
        'Lower abdominal discomfort is relieved with the passage of gas or with a bowel movement',
        'Specific foods/beverages aggravate indigestion',
        'The consistency or form of your stool changes (e.g., from narrow to loose) within the course of a day',
        'Stool color is embarrassing',
        'Undigested food in your stool',
        'Three or more large bowel movements daily',
        'Diarrhea (frequent loose, watery stool)',
        'Bowel movement shortly after eating (within 1 hour)'
      ]
    },
    {
      id: 'sectionD',
      title: 'PART I - SECTION D',
      questions: [
        'Discomfort, pain or cramps in your colon (lower abdominal area)',
        'Emotional stress and/or eating raw fruits and vegetables causes abdominal bloating, pain, cramps or gas',
        'Straining required for straining during bowel movements',
        'Stool is small, hard and dry',
        'Pass mucus in your stool',
        'Alternate between constipation and diarrhea',
        'Rectal pain, itching or cramping',
        'No urge to have a bowel movement (0=No, 8=Yes)',
        'An almost continual need to have a bowel movement (0=No, 8=Yes)'
      ]
    },
    {
      id: 'partII',
      title: 'PART II',
      questions: [
        'When massaging under your rib cage on your right side, there is pain, tenderness or soreness',
        'Abdominal pain worsens with deep breathing',
        'Pain at night that may move to your back or right shoulder',
        'Bitter fluid repeats after eating',
        'Feel abdominal discomfort and/or nausea when eating rich, fatty or fried foods',
        'Throbbing temples and/or dull pain in forehead associated with eating',
        'Unexplained itchy skin that\'s worse at night',
        'Stool color alternates from clay colored to normal brown',
        'General feeling of poor health'
      ]
    },
    {
      id: 'results',
      title: 'Results Summary',
      type: 'results'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleResponseChange = (sectionId, index, value) => {
    setResponses({
      ...responses,
      [sectionId]: responses[sectionId].map((v, i) => i === index ? value : v)
    });
  };

  const calculateSectionTotal = (sectionId) => {
    return responses[sectionId].reduce((sum, val) => sum + val, 0);
  };

  const goToNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const goToPrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const generatePDF = () => {
    window.print();
  };

  const getChartData = () => {
    return [
      { name: 'Section A', points: calculateSectionTotal('sectionA') },
      { name: 'Section B', points: calculateSectionTotal('sectionB') },
      { name: 'Section C', points: calculateSectionTotal('sectionC') },
      { name: 'Section D', points: calculateSectionTotal('sectionD') },
      { name: 'Part II', points: calculateSectionTotal('partII') }
    ];
  };

  const getBarColor = (points) => {
    if (points < 10) return '#10b981';
    if (points < 20) return '#f59e0b';
    return '#ef4444';
  };

  const renderIntroSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Health Appraisal Questionnaire</h1>
        <p className="text-blue-100">John Carlston - 1011 E. 13th St. N., Wichita, KS 67214</p>
        <p className="text-blue-100">Phone: 316-303-1600</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Patient Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2 text-blue-600" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">DIRECTIONS</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This questionnaire asks you to assess how you have been feeling <strong>during the last four months</strong>. 
            This information will help you keep track of how your physical, mental and emotional states respond to changes 
            you make in your eating habits, priorities, supplement program, social and family life, level of physical 
            activity and time spent on personal growth.
          </p>
          <p className="text-gray-700 font-semibold mb-3">
            For each question, select the number that best describes your symptoms:
          </p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="font-bold text-blue-700 mr-2">0 = No or Rarely:</span>
              <span className="text-gray-700">You have never experienced the symptom or the symptom is familiar to you but you perceive it as insignificant (monthly or less)</span>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-blue-700 mr-2">1 = Occasionally:</span>
              <span className="text-gray-700">Symptom comes and goes and is linked in your mind to stress, diet, fatigue or some identifiable trigger</span>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-blue-700 mr-2">4 = Often:</span>
              <span className="text-gray-700">Symptom occurs 2-3 times per week and/or with a frequency that bothers you enough that you would like to do something about it</span>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-blue-700 mr-2">8 = Frequently:</span>
              <span className="text-gray-700">Symptom occurs 4 or more times per week and/or you are aware of the symptom every day, or it occurs with regularity on a monthly or cyclical basis</span>
            </div>
          </div>
          
          <p className="text-gray-700 font-semibold mt-4">
            Some questions require a YES or NO response: <span className="text-blue-700">0 = NO</span> &nbsp;&nbsp; <span className="text-blue-700">8 = YES</span>
          </p>
        </div>
      </div>
    </div>
  );

  const renderQuestionSection = (section) => {
    const sectionData = responses[section.id];
    const total = calculateSectionTotal(section.id);

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">{section.title}</h2>
          {formData.name && (
            <p className="text-blue-100 mt-2">Patient: {formData.name}</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-blue-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Symptom
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase">
                    No/Rarely<br/><span className="text-blue-600">(0)</span>
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase">
                    Occasionally<br/><span className="text-blue-600">(1)</span>
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase">
                    Often<br/><span className="text-blue-600">(4)</span>
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase">
                    Frequently<br/><span className="text-blue-600">(8)</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {section.questions.map((question, index) => {
                  const isYesNo = question.includes('(0=No, 8=Yes)');
                  return (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {index + 1}. {question}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <input
                          type="radio"
                          name={`${section.id}-${index}`}
                          value="0"
                          checked={sectionData[index] === 0}
                          onChange={() => handleResponseChange(section.id, index, 0)}
                          className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-4 text-center">
                        {!isYesNo && (
                          <input
                            type="radio"
                            name={`${section.id}-${index}`}
                            value="1"
                            checked={sectionData[index] === 1}
                            onChange={() => handleResponseChange(section.id, index, 1)}
                            className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          />
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {!isYesNo && (
                          <input
                            type="radio"
                            name={`${section.id}-${index}`}
                            value="4"
                            checked={sectionData[index] === 4}
                            onChange={() => handleResponseChange(section.id, index, 4)}
                            className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          />
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <input
                          type="radio"
                          name={`${section.id}-${index}`}
                          value="8"
                          checked={sectionData[index] === 8}
                          onChange={() => handleResponseChange(section.id, index, 8)}
                          className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-blue-600 text-white">
                  <td className="px-6 py-4 text-right font-bold text-lg" colSpan="4">
                    SECTION TOTAL POINTS:
                  </td>
                  <td className="px-4 py-4 text-center font-bold text-2xl">
                    {total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderResultsSection = () => {
    const chartData = getChartData();
    const grandTotal = chartData.reduce((sum, item) => sum + item.points, 0);

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Results Summary</h2>
          {formData.name && (
            <p className="text-green-100 text-lg">Patient: {formData.name}</p>
          )}
          {formData.date && (
            <p className="text-green-100">Date: {formData.date}</p>
          )}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Score Breakdown</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {chartData.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-600">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">{item.name}</h4>
                <p className="text-3xl font-bold text-blue-700">{item.points}</p>
                <p className="text-xs text-gray-500 mt-1">points</p>
              </div>
            ))}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-600 md:col-span-3">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Grand Total</h4>
              <p className="text-4xl font-bold text-green-700">{grandTotal}</p>
              <p className="text-xs text-gray-500 mt-1">total points across all sections</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Visual Analysis</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px'
                  }}
                />
                <Legend />
                <Bar dataKey="points" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.points)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Interpretation Guide</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span><strong>0-9 points:</strong> Low severity - Minimal symptoms</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                <span><strong>10-19 points:</strong> Moderate severity - Some attention needed</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                <span><strong>20+ points:</strong> High severity - Requires attention</span>
              </div>
            </div>
          </div>

          <button
            onClick={generatePDF}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center transition-colors shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF Report
          </button>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    const section = sections[currentSection];
    
    if (section.type === 'intro') {
      return renderIntroSection();
    } else if (section.type === 'results') {
      return renderResultsSection();
    } else {
      return renderQuestionSection(section);
    }
  };

  const canProceed = () => {
    if (currentSection === 0) {
      return formData.name.trim() !== '';
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Section {currentSection + 1} of {sections.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(((currentSection + 1) / sections.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        {renderSection()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={goToPrevious}
            disabled={currentSection === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
              currentSection === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          {currentSection < sections.length - 1 && (
            <button
              onClick={goToNext}
              disabled={!canProceed()}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                !canProceed()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-6xl, .max-w-6xl * {
            visibility: visible;
          }
          .max-w-6xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HealthQuestionnaireApp;