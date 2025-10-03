import React from 'react';
import ChevronDownIcon from './ChevronDownIcon';

interface OperationTypeSelectProps {
  operationType: string;
  setOperationType: (v: string) => void;
}

const OperationTypeSelect: React.FC<OperationTypeSelectProps> = ({ operationType, setOperationType }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor="operation-type" className="block text-sm sm:text-base font-semibold text-right text-gray-700 dark:text-gray-200 mb-1">نوع العملية</label>
    <div className="relative">
      <select
        id="operation-type"
        className="w-full h-12 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 pl-4 pr-10 py-3 text-base text-right shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-slate-700 transition text-slate-900 dark:text-slate-100 font-tajawal appearance-none"
        value={operationType}
        onChange={e => setOperationType(e.target.value)}
      >
        <option value="deposit">إيداع</option>
        <option value="withdraw">سحب</option>
      </select>
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 dark:text-slate-300">
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

export default OperationTypeSelect;
