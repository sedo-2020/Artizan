import React, { useState } from "react";
import "animate.css";

const quizzes = {
  digestive: [
    {
      question: "ما هو العضو الذي يبدأ فيه هضم الطعام؟",
      options: ["المعدة", "الفم", "الأمعاء الدقيقة", "الكبد"],
      answer: 1
    },
    {
      question: "ما وظيفة الأمعاء الغليظة؟",
      options: ["امتصاص الماء وتشكيل الفضلات", "إفراز الإنزيمات", "هضم البروتينات", "إنتاج العصارة الصفراوية"],
      answer: 0
    }
  ],
  ant: [
    {
      question: "كم عدد الأجزاء الرئيسية في جسم النملة؟",
      options: ["جزءان", "ثلاثة أجزاء", "أربعة أجزاء", "خمسة أجزاء"],
      answer: 1
    },
    {
      question: "ما هو الجزء الذي يحتوي على قرون الاستشعار؟",
      options: ["الرأس", "الصدر", "البطن", "الأرجل"],
      answer: 0
    }
  ]
};

function Quiz({ chapterId }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const questions = quizzes[chapterId] || [];

  if (!questions.length) return null;

  const handleOption = idx => {
    setSelected(idx);
    if (idx === questions[current].answer) setScore(score + 1);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 900);
  };

  return (
    <div className="animate__animated animate__fadeInUp" style={{marginTop:40, background:'#fafdff', borderRadius:14, boxShadow:'0 2px 8px #0001', padding:'2rem 1rem'}}>
      <h3 style={{color:'#1976d2', textAlign:'center', marginBottom:20}}>اختبر معلوماتك!</h3>
      {!showResult ? (
        <>
          <div style={{fontWeight:'bold', fontSize:'1.1rem', marginBottom:18}}>{questions[current].question}</div>
          <div style={{display:'flex', flexDirection:'column', gap:16}}>
            {questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                className={`animate__animated ${selected === idx ? (idx === questions[current].answer ? 'animate__pulse' : 'animate__shakeX') : ''}`}
                style={{
                  background: selected === idx ? (idx === questions[current].answer ? '#43e97b' : '#ff5252') : '#fff',
                  color: selected === idx ? '#fff' : '#1976d2',
                  border: '2px solid #1976d2',
                  borderRadius: 12,
                  padding: '0.7rem 1.2rem',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: selected !== null ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                  outline: 'none',
                  boxShadow: selected === idx ? '0 2px 8px #0002' : 'none'
                }}
                disabled={selected !== null}
                onClick={() => handleOption(idx)}
              >
                {opt}
              </button>
            ))}
          </div>
          <div style={{marginTop:18, color:'#888', fontSize:'0.95rem', textAlign:'center'}}>سؤال {current+1} من {questions.length}</div>
        </>
      ) : (
        <div style={{textAlign:'center'}}>
          <div className="animate__animated animate__tada" style={{fontSize:'2.2rem', color: score === questions.length ? '#43e97b' : '#1976d2', marginBottom:12}}>
            {score === questions.length ? 'ممتاز! 🎉' : 'أحسنت!'}
          </div>
          <div style={{fontWeight:'bold', fontSize:'1.1rem', marginBottom:10}}>درجتك: {score} من {questions.length}</div>
          <button onClick={() => {setCurrent(0); setSelected(null); setShowResult(false); setScore(0);}} style={{background:'#4f8cff', color:'#fff', padding:'0.7rem 2.2rem', borderRadius:16, fontWeight:'bold', fontSize:'1.1rem', boxShadow:'0 2px 8px #0001', border:'none', marginTop:10, cursor:'pointer'}}>إعادة الاختبار</button>
        </div>
      )}
    </div>
  );
}

export default Quiz; 