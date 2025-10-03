import React from 'react';
import type { MinFee, Rates } from '../types';

interface SettingsModalProps {
  show: boolean;
  tempRates: Rates;
  tempMinFee: MinFee;
  setTempRates: React.Dispatch<React.SetStateAction<Rates>>;
  setTempMinFee: React.Dispatch<React.SetStateAction<MinFee>>;
  onClose: () => void;
  onSave: () => void;
}

const inputCls = 'w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-slate-700 px-3 py-2 text-base text-left transition';

const SettingsModal: React.FC<SettingsModalProps> = ({
  show,
  tempRates,
  tempMinFee,
  setTempRates,
  setTempMinFee,
  onClose,
  onSave
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
  <div className="bg-white dark:bg-slate-800 dark:text-gray-100 rounded-2xl shadow-2xl w-[95vw] max-w-2xl p-6 relative font-tajawal border border-blue-100 dark:border-slate-700" onClick={e => e.stopPropagation()}>
        <button className="cursor-pointer absolute top-3 left-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white text-2xl font-bold leading-none" onClick={onClose} title="إغلاق">×</button>
        <h2 className="text-blue-600 dark:text-blue-400 text-xl font-extrabold text-center mb-4">⚙️ الإعدادات</h2>
        <div className="flex flex-col gap-4">
          {/* USD */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 sm:items-center gap-3">
            <label className="font-semibold text-right">الدولار الأمريكي (USD)</label>
            <input dir="ltr" type="number" min="0.0001" step="0.0001" className={inputCls} value={tempRates.USD.buy} onChange={e => setTempRates((prev: Rates) => ({ ...prev, USD: { ...prev.USD, buy: parseFloat(e.target.value) || 1 } }))} />
            <input dir="ltr" type="number" min="0.0001" step="0.0001" className={inputCls} value={tempRates.USD.sell} onChange={e => setTempRates((prev: Rates) => ({ ...prev, USD: { ...prev.USD, sell: parseFloat(e.target.value) || 1 } }))} />
          </div>
          {/* SAR */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 sm:items-center gap-3">
            <label className="font-semibold text-right">الريال السعودي (SAR)</label>
            <input dir="ltr" type="number" min="0.0001" step="0.0001" className={inputCls} value={tempRates.SAR.buy} onChange={e => setTempRates((prev: Rates) => ({ ...prev, SAR: { ...prev.SAR, buy: parseFloat(e.target.value) || 3.83 } }))} />
            <input dir="ltr" type="number" min="0.0001" step="0.0001" className={inputCls} value={tempRates.SAR.sell} onChange={e => setTempRates((prev: Rates) => ({ ...prev, SAR: { ...prev.SAR, sell: parseFloat(e.target.value) || 3.83 } }))} />
          </div>
          {/* YER */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 sm:items-center gap-3">
            <label className="font-semibold text-right">الريال اليمني (YER)</label>
            <input dir="ltr" type="number" min="0.01" step="0.01" className={inputCls} value={tempRates.YER.buy} onChange={e => setTempRates((prev: Rates) => ({ ...prev, YER: { ...prev.YER, buy: parseFloat(e.target.value) || 534 } }))} />
            <input dir="ltr" type="number" min="0.01" step="0.01" className={inputCls} value={tempRates.YER.sell} onChange={e => setTempRates((prev: Rates) => ({ ...prev, YER: { ...prev.YER, sell: parseFloat(e.target.value) || 534 } }))} />
          </div>
          {/* Min Fee */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 sm:items-center gap-3">
            <label className="font-semibold text-right">الحد الأدنى للعمولة</label>
            <input dir="ltr" type="number" min="0" step="0.01" className={inputCls} value={tempMinFee.value} onChange={e => setTempMinFee((prev: MinFee) => ({ ...prev, value: parseFloat(e.target.value) || 0 }))} />
            <select dir="ltr" className={inputCls} value={tempMinFee.currency} onChange={e => setTempMinFee((prev: MinFee) => ({ ...prev, currency: e.target.value }))}>
              <option value="USD">USD</option>
              <option value="SAR">SAR</option>
              <option value="YER">YER</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onSave} className="flex-1 bg-blue-600 text-white rounded-xl py-2 font-bold shadow hover:bg-blue-700 transition cursor-pointer">حفظ</button>
          <button onClick={onClose} className="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-100 rounded-xl py-2 font-semibold border border-gray-300 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-600 transition cursor-pointer">إلغاء</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
