import React from "react";
import { useParams, Link } from "react-router-dom";
import "animate.css";
import Quiz from "./Quiz";

const chapters = {
  digestive: {
    title: "الجهاز الهضمي للإنسان",
    img: "https://cdn.pixabay.com/photo/2017/01/31/13/14/anatomy-2023188_1280.png",
    content: (
      <>
        <h3 style={{color:'#43e97b'}}>ما هو الجهاز الهضمي؟</h3>
        <p>الجهاز الهضمي هو مجموعة من الأعضاء المسؤولة عن تحويل الطعام إلى مواد مغذية يمتصها الجسم. يشمل الفم، المريء، المعدة، الأمعاء الدقيقة والغليظة، الكبد، والبنكرياس.</p>
        <ul style={{lineHeight:'2'}}>
          <li><b>الفم:</b> بداية الهضم، حيث يتم مضغ الطعام وخلطه باللعاب.</li>
          <li><b>المريء:</b> ينقل الطعام إلى المعدة.</li>
          <li><b>المعدة:</b> تفرز أحماض وإنزيمات لهضم الطعام.</li>
          <li><b>الأمعاء الدقيقة:</b> تمتص معظم المواد الغذائية.</li>
          <li><b>الأمعاء الغليظة:</b> تمتص الماء وتشكل الفضلات.</li>
        </ul>
      </>
    )
  },
  ant: {
    title: "تفاصيل جسم النملة",
    img: "https://cdn.pixabay.com/photo/2012/04/13/00/22/ant-31253_1280.png",
    content: (
      <>
        <h3 style={{color:'#43e97b'}}>مم يتكون جسم النملة؟</h3>
        <p>جسم النملة يتكون من ثلاثة أجزاء رئيسية: الرأس، الصدر، والبطن. لكل جزء وظيفة محددة تساعد النملة على البقاء والعمل.</p>
        <ul style={{lineHeight:'2'}}>
          <li><b>الرأس:</b> يحتوي على قرون الاستشعار والفكوك والعينين.</li>
          <li><b>الصدر:</b> يتصل به الأرجل والأجنحة (في بعض الأنواع).</li>
          <li><b>البطن:</b> يحتوي على أعضاء الهضم والتكاثر.</li>
        </ul>
      </>
    )
  }
};

function Chapter() {
  const { id } = useParams();
  const chapter = chapters[id];

  if (!chapter) return <div className="container">الفصل غير موجود</div>;

  return (
    <>
      <div className="header animate__animated animate__fadeInDown">
        {chapter.title}
      </div>
      <div className="container animate__animated animate__fadeInUp">
        <img src={chapter.img} alt={chapter.title} className="chapter-img animate__animated animate__pulse" />
        <div style={{marginTop:'2rem', fontSize:'1.1rem'}}>{chapter.content}</div>
        <Quiz chapterId={id} />
        <div style={{textAlign:'center', marginTop:'2.5rem'}}>
          <Link to="/" style={{background:'#4f8cff', color:'#fff', padding:'0.7rem 2.2rem', borderRadius:16, fontWeight:'bold', fontSize:'1.1rem', boxShadow:'0 2px 8px #0001', transition:'background 0.2s'}}>العودة للرئيسية</Link>
        </div>
      </div>
    </>
  );
}

export default Chapter; 