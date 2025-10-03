import React from 'react';

interface ResultBoxProps {
  label: string;
  result: string;
}

const ResultBox: React.FC<ResultBoxProps> = ({ label, result }) => (
  <div className="bg-blue-50 dark:bg-slate-700/50 border border-blue-200 dark:border-slate-600 rounded-xl px-4 py-3 text-lg flex flex-col gap-2 font-tajawal">
    <div className="text-gray-700 dark:text-gray-200 font-semibold">{label}</div>
    <div className="text-blue-700 dark:text-blue-300 font-bold text-xl">{result}</div>
  </div>
);

export default ResultBox;
