import React from 'react';
import ChevronDownIcon from './ChevronDownIcon';

interface SendCurrencySelectProps {
  sendCurrency: string;
  setSendCurrency: (v: string) => void;
}

const SendCurrencySelect: React.FC<SendCurrencySelectProps> = ({ sendCurrency, setSendCurrency }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor="send-currency" className="block text-sm sm:text-base font-semibold text-right text-gray-700 dark:text-gray-200 mb-1">عملة الإرسال</label>
    <div className="relative">
      <select
        id="send-currency"
        className="w-full h-12 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 pl-4 pr-10 py-3 text-base text-left shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-slate-700 transition text-slate-900 dark:text-slate-100 appearance-none"
        dir="ltr"
        value={sendCurrency}
        onChange={e => setSendCurrency(e.target.value)}
      >
        <option value="USD">دولار أمريكي (USD)</option>
        <option value="SAR">ريال سعودي (SAR)</option>
        <option value="YER">ريال يمني (YER)</option>
      </select>
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 dark:text-slate-300">
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

export default SendCurrencySelect;
