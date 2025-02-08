import React, { useState } from 'react';
import PaperPieChart from './PaperPieChart';
import DepartmentPieChart from './DepartmentPiechart';
import PaperTypePieChart from './PaperTypePiechart';
import ExamTypePieChart from './ExamTypePiechart';
import '../AllPapers/LoadingSpinner.css'
import './Stats.css'
const Stats = () => {
  return (
    <>
   
      <div className="stats-container">
   <PaperPieChart/>
   <DepartmentPieChart/>
   <PaperTypePieChart/>
   <ExamTypePieChart/>
   </div>
    </>
  );
};

export default Stats;
