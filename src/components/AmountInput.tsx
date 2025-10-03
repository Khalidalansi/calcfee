import React from 'react';

interface AmountInputProps {
  amount: number;
  amountCurrency: string;
  setAmount: (v: number) => void;
  setAmountCurrency: (v: string) => void;
  getAmountLabel: () => string;
}

const AmountInput: React.FC<AmountInputProps> = ({ amount, amountCurrency, setAmount, setAmountCurrency, getAmountLabel }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor="amount" className="block text-sm sm:text-base font-semibold text-right text-gray-700 dark:text-gray-200 mb-1">{getAmountLabel()}</label>
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center">
      <input
        type="number"
        id="amount"
        min="0"
        step="0.01"
        placeholder="أدخل المبلغ المستلم"
        className="w-full h-12 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-base text-left shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-slate-700 transition placeholder:text-gray-400 dark:placeholder:text-slate-300 text-slate-900 dark:text-slate-100 font-tajawal  col-span-1 sm:col-span-8"
    dir="ltr"
        inputMode="decimal"
        autoComplete="off"
        value={amount || ''}
        onChange={e => setAmount(parseFloat(e.target.value) || 0)}
      />
      <div className="relative col-span-1 sm:col-span-4">
        <select
          id="amount-currency"
          className="w-full h-12 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 pl-4 pr-10 py-3 text-base text-left shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-slate-700 transition text-slate-900 dark:text-slate-100 font-tajawal appearance-none"
          dir="ltr"
          value={amountCurrency}
          onChange={e => setAmountCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="SAR">SAR</option>
          <option value="YER">YER</option>
        </select>
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 dark:text-slate-300">
          {/* Chevron Icon */}
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.25 8.29a.75.75 0 0 1 -.02-1.08z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default AmountInput;
