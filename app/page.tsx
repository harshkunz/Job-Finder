'use client';
import React, { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import Features from "./components/Features";
import Footer from './components/Footer';

import ResumeAnalysis from './components/JobDescription'
import JobFinder from './components/JobFinder';


export default function Home() {
  

  return (
    <main>
      <ResumeUpload/>

      {/* valid features*/}
      <ResumeAnalysis/>
      <Features/>

      

      <Footer/>
      
    </main>
  )
}