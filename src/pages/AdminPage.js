import React, { useState } from 'react';

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [sets, setSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState('');
  const [question, setQuestion] = useState({
    image: '',
    text: '',
    choices: ['', '', '', '', ''],
    correct: 0,
    explanation: ''
  });

  const handleAddSet = (name) => {
    setSets([...sets, name]);
    setSelectedSet(name);
  };

  const handleAddQuestion = () => {
    if (!selectedSet) return alert('Bitte ein Set auswählen!');
    console.log('Frage gespeichert:', { set: selectedSet, ...question });
    alert('Frage wurde (testweise) gespeichert – siehe Konsole.');
    setQuestion({
      image: '',
      text: '',
      choices: ['', '', '', '', ''],
      correct: 0,
      explanation: ''
    });
  };

  if (!loggedIn) {
    return (
      <div>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setLoggedIn(password === 'admin123')}>
          Login
        </button>
        {password && password !== 'admin123' && <p>❌ Falsches Passwort</p>}
      </div>
    );
  }

  return (
    <div>
      <h2>Adminbereich</h2>

      <h3>Quiz-Sets</h3>
      <input
        type="text"
        placeholder="Neues Set"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAddSet(e.target.value);
        }}
      />
      <ul>
        {sets.map((set, i) => (
          <li key={i}>
            <button onClick={() => setSelectedSet(set)}>
              {set} {selectedSet === set ? '✅' : ''}
            </button>
          </li>
        ))}
      </ul>

      <h3>Neue Frage zu: {selectedSet || 'kein Set ausgewählt'}</h3>
      <input
        type="text"
        placeholder="Bild-URL"
        value={question.image}
        onChange={(e) => setQuestion({ ...question, image: e.target.value })}
      />
      <input
        type="text"
        placeholder="Fragetext"
        value={question.text}
        onChange={(e) => setQuestion({ ...question, text: e.target.value })}
      />
      {question.choices.map((c, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Antwort ${i + 1}`}
          value={c}
          onChange={(e) => {
            const newChoices = [...question.choices];
            newChoices[i] = e.target.value;
            setQuestion({ ...question, choices: newChoices });
          }}
        />
      ))}
      <input
        type="number"
        min="0"
        max="4"
        placeholder="Index der richtigen Antwort (0-4)"
        value={question.correct}
        onChange={(e) => setQuestion({ ...question, correct: Number(e.target.value) })}
      />
      <textarea
        placeholder="Erklärung"
        value={question.explanation}
        onChange={(e) => setQuestion({ ...question, explanation: e.target.value })}
      ></textarea>
      <button onClick={handleAddQuestion}>Frage speichern</button>
    </div>
  );
};

export default AdminPage;
