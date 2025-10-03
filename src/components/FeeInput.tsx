import React from 'react';

interface FeeInputProps {
  customFee: number | null;
  setCustomFee: (v: number | null) => void;
  feeMode: boolean;
  setFeeMode: (v: boolean) => void;
}

const FeeInput: React.FC<FeeInputProps> = ({ customFee, setCustomFee, feeMode, setFeeMode }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor="custom-fee" className="block text-sm sm:text-base font-semibold text-right text-gray-700 dark:text-gray-200 mb-1">نسبة عمولة مخصصة (%)</label>
    <input
      type="number"
      id="custom-fee"
      min="0.5"
      max="20"
      step="0.1"
      placeholder="مثال: 2.5"
  className="w-full h-12 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-base text-left shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-slate-700 transition placeholder:text-gray-400 dark:placeholder:text-slate-300 text-slate-900 dark:text-slate-100 appearance-none"
      dir="ltr"
      value={customFee || ''}
      onChange={e => setCustomFee(parseFloat(e.target.value) || null)}
    />
    <div className="flex items-center gap-2 mt-1">
      <input
        type="checkbox"
        id="fee-mode"
        className="w-5 h-5 rounded-md border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-300 dark:focus:ring-slate-700"
        checked={feeMode}
        onChange={e => setFeeMode(e.target.checked)}
      />
      <label htmlFor="fee-mode" className="text-sm cursor-pointer select-none text-gray-700 dark:text-gray-200">
        خصم العمولة من المبلغ
      </label>
    </div>
  </div>
);

export default FeeInput;
