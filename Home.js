import React from "react";
import { Link } from "react-router-dom";
import "animate.css";

const chapters = [
  {
    id: "digestive",
    title: "الجهاز الهضمي للإنسان",
    img: "https://cdn.pixabay.com/photo/2017/01/31/13/14/anatomy-2023188_1280.png"
  },
  {
    id: "ant",
    title: "تفاصيل جسم النملة",
    img: "https://cdn.pixabay.com/photo/2012/04/13/00/22/ant-31253_1280.png"
  }
];

function Home() {
  return (
    <>
      <div className="header animate__animated animate__fadeInDown">
        BioLearn | أحياء بوضوح
      </div>
      <div className="container animate__animated animate__fadeInUp">
        <h2 className="section-title">مرحبًا بك في منصة أحياء بوضوح</h2>
        <p style={{textAlign:'center', fontSize:'1.1rem', marginBottom:'2rem'}}>
          تعلم الأحياء بطريقة تفاعلية وشيقة مع صور توضيحية وأنيميشن لكل درس!
        </p>
        <div style={{display:'flex', flexWrap:'wrap', gap:'2rem', justifyContent:'center'}}>
          {chapters.map(ch => (
            <Link to={`/chapter/${ch.id}`} key={ch.id} style={{textAlign:'center', width:220, background:'#f0f8ff', borderRadius:16, boxShadow:'0 2px 8px #0001', padding:'1.2rem 0.5rem', transition:'box-shadow 0.2s', display:'block'}} className="animate__animated animate__zoomIn">
              <img src={ch.img} alt={ch.title} style={{width:120, height:120, objectFit:'contain', marginBottom:12}} />
              <div style={{fontWeight:'bold', fontSize:'1.1rem', color:'#1976d2'}}>{ch.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home; 