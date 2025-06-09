import React from 'react';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
  const { setId } = useParams();

  return (
    <div>
      <h2>Quiz für Set: {setId}</h2>
      <p>Diese Ansicht ist aktuell nur eine Platzhalter-Demo.</p>
    </div>
  );
};

export default QuizPage;
