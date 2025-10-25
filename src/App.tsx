import { useState, useEffect, useRef } from 'react';
import './App.css';
import SettingsModal from './components/SettingsModal';
import Notification from './components/Notification';
import AmountInput from './components/AmountInput';
import FeeInput from './components/FeeInput';
import SendCurrencySelect from './components/SendCurrencySelect';
import ResultBox from './components/ResultBox';
import OperationTypeSelect from './components/OperationTypeSelect';
import type { Rates, MinFee, ExchangeRate } from './types';


function App() {
  // Dark mode
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('epay_theme');
      if (saved) return saved === 'dark';
    } catch { }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isReady, setIsReady] = useState(false)

  const [amount, setAmount] = useState<number>(0);
  const [amountCurrency, setAmountCurrency] = useState<string>('USD');
  const [operationType, setOperationType] = useState<string>('deposit');
  const [customFee, setCustomFee] = useState<number | null>(null);
  const [feeMode, setFeeMode] = useState<boolean>(false);
  const [sendCurrency, setSendCurrency] = useState<string>('USD');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ text: string; isError: boolean } | null>(null);

  const defaultRates: Rates = {
    USD: { buy: 1, sell: 1 },
    SAR: { buy: 3.83, sell: 3.83 },
    YER: { buy: 534, sell: 534 }
  };

  const [rates, setRates] = useState<Rates>(defaultRates);
  const [minFee, setMinFee] = useState<MinFee>({ value: 0, currency: 'USD' });
  const [tempRates, setTempRates] = useState<Rates>(defaultRates);
  const [tempMinFee, setTempMinFee] = useState<MinFee>({ value: 0, currency: 'USD' });

  // Load UI state (operation type, fee, currencies, amount) from localStorage once
  const uiFromStorageRef = useRef(false);



  useEffect(() => {
    try { localStorage.setItem('epay_theme', dark ? 'dark' : 'light'); } catch { }
  }, [dark]);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  // دالة تسمية حقل المبلغ حسب العملة
  const getAmountLabel = (): string => {
    if (amountCurrency === 'USD') return 'المبلغ المستلم (دولار USD)';
    if (amountCurrency === 'SAR') return 'المبلغ المستلم (ريال SAR)';
    if (amountCurrency === 'YER') return 'المبلغ المستلم (ريال يمني YER)';
    return 'المبلغ المستلم';
  };

  // فتح نافذة الإعدادات
  const openModal = () => {
    // حمّل مباشرة من التخزين (إن وجد) لضمان ظهور القيم المحفوظة حتى لو لم تكتمل مزامنة الحالة بعد
    try {
      const savedRates = localStorage.getItem('epay_rates');
      const savedMinFee = localStorage.getItem('epay_minFee');
      if (savedRates) {
        const parsed = JSON.parse(savedRates) as Partial<Rates>;
        setTempRates({
          USD: { buy: parsed?.USD?.buy ?? rates.USD.buy, sell: parsed?.USD?.sell ?? rates.USD.sell },
          SAR: { buy: parsed?.SAR?.buy ?? rates.SAR.buy, sell: parsed?.SAR?.sell ?? rates.SAR.sell },
          YER: { buy: parsed?.YER?.buy ?? rates.YER.buy, sell: parsed?.YER?.sell ?? rates.YER.sell },
        });
      } else {
        setTempRates(rates);
      }
      if (savedMinFee) {
        const parsedM = JSON.parse(savedMinFee) as Partial<MinFee>;
        setTempMinFee({ value: Number(parsedM?.value ?? minFee.value) || 0, currency: parsedM?.currency ?? minFee.currency });
      } else {
        setTempMinFee(minFee);
      }
    } catch {
      setTempRates(rates);
      setTempMinFee(minFee);
    }
    setShowModal(true);
  };

  // نسخ النتيجة
  const copyToClipboard = async () => {
    const { result } = updateResults();
    if (!result || result === '-') {
      showNotif('لا توجد نتيجة للنسخ', true);
      return;
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(result);
        showNotif('✅ تم النسخ');
      } else {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = result;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        ta.style.top = '0';
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (ok) showNotif('✅ تم النسخ');
        else throw new Error('execCommand returned false');
      }
    } catch (err) {
      showNotif('❌ لم يتم النسخ', true);
    }
  };

  // حفظ الإعدادات
  const saveSettings = () => {
    setRates(tempRates);
    setMinFee(tempMinFee);
    try {
      localStorage.setItem('epay_rates', JSON.stringify(tempRates));
      localStorage.setItem('epay_minFee', JSON.stringify(tempMinFee));
    } catch (e) { }
    setShowModal(false);
    showNotif('✅ تم حفظ الإعدادات');
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem('epay_ui');
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<{
          operationType: string;
          customFee: number | null;
          feeMode: boolean;
          amountCurrency: string;
          sendCurrency: string;
          amount: number;
        }>;
        let loaded = false;
        if (parsed.operationType) { setOperationType(parsed.operationType); loaded = true; }
        if (typeof parsed.customFee === 'number' || parsed.customFee === null) { setCustomFee(parsed.customFee as number | null); loaded = true; }
        if (typeof parsed.feeMode === 'boolean') { setFeeMode(parsed.feeMode); loaded = true; }
        if (parsed.amountCurrency) { setAmountCurrency(parsed.amountCurrency); loaded = true; }
        if (parsed.sendCurrency) { setSendCurrency(parsed.sendCurrency); loaded = true; }
        if (typeof parsed.amount === 'number') { setAmount(parsed.amount); loaded = true; }
        uiFromStorageRef.current = loaded;
      }
    } catch { }
    setIsReady(true)
  }, []);

  // Load saved settings once
  useEffect(() => {
    try {
      const savedRates = localStorage.getItem('epay_rates');
      const savedMinFee = localStorage.getItem('epay_minFee');
      if (savedRates) {
        const parsed = JSON.parse(savedRates) as Partial<Rates>;
        setRates(prev => ({
          USD: { buy: parsed?.USD?.buy ?? prev.USD.buy, sell: parsed?.USD?.sell ?? prev.USD.sell },
          SAR: { buy: parsed?.SAR?.buy ?? prev.SAR.buy, sell: parsed?.SAR?.sell ?? prev.SAR.sell },
          YER: { buy: parsed?.YER?.buy ?? prev.YER.buy, sell: parsed?.YER?.sell ?? prev.YER.sell },
        }));
      }
      if (savedMinFee) {
        const parsed = JSON.parse(savedMinFee) as Partial<MinFee>;
        setMinFee(prev => ({ value: Number(parsed?.value ?? prev.value) || 0, currency: parsed?.currency ?? prev.currency }));
      }
    } catch { }
  }, []);

  // Persist when settings change
  useEffect(() => {
    if (isReady) {
      try { localStorage.setItem('epay_rates', JSON.stringify(rates)); } catch { }
    }

  }, [rates, isReady]);
  useEffect(() => {
    if (isReady) {
      try { localStorage.setItem('epay_minFee', JSON.stringify(minFee)); } catch { }
    }
  }, [minFee, isReady]);

  // Persist UI fields when they change
  useEffect(() => {
    try {
      const payload = { operationType, customFee, feeMode, amountCurrency, sendCurrency, amount };
      localStorage.setItem('epay_ui', JSON.stringify(payload));
    } catch { }
  }, [operationType, customFee, feeMode, amountCurrency, sendCurrency, amount]);

  // UX sync: defaults and currency sync like the previous mobile HTML
  useEffect(() => {
    // لا تفرض القيم الافتراضية إذا تم التحميل من التخزين
    if (uiFromStorageRef.current) return;
    if (operationType === 'deposit') {
      if (customFee === null) setCustomFee(3);
      setFeeMode(false);
    } else {
      if (customFee === null) setCustomFee(2);
      setFeeMode(true);
    }
  }, [operationType]);

  useEffect(() => {
    if (operationType === 'withdraw') {
      setSendCurrency(amountCurrency);
    }
  }, [operationType, amountCurrency]);

  const formatAmount = (value: number): string => {
    try {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    } catch (e) {
      return value.toFixed(2);
    }
  };

  const showNotif = (text: string, isError: boolean = false) => {
    setNotification({ text, isError });
    setTimeout(() => setNotification(null), 1800);
  };

  const convert = (amount: number, from: string, to: string, opType: string = 'deposit'): number => {
    if (!amount || from === to) return Number(amount || 0);
    const rate = getExchangeRate(from, to, opType);
    return Number(amount) * rate;
  };

  const getExchangeRate = (from: string, to: string, opType: string = 'deposit'): number => {
    if (from === to) return 1;
    const side: keyof ExchangeRate = (opType === 'withdraw') ? 'buy' : 'sell';
    const rateFrom = rates[from as keyof Rates]?.[side] ?? 1;
    const rateTo = rates[to as keyof Rates]?.[side] ?? 1;
    return rateTo / rateFrom;
  };

  const calcDeposit = (amount: number, customFee: number | null, feeMode: boolean): number => {
    if (customFee) {
      if (feeMode) {
        return amount - (amount * customFee / 100);
      }
      return amount + (amount * customFee / 100);
    }
    if (amount >= 1 && amount < 8) return amount + 1;
    if (amount >= 8 && amount < 15) return amount + 1.5;
    if (amount >= 15 && amount < 50) return amount + 2;
    if (amount >= 50 && amount < 80) return amount * 1.04;
    if (amount >= 80 && amount < 10000) return amount * 1.034;
    if (amount >= 10000 && amount <= 100000) return amount * 1.03;
    return amount;
  };

  const calcWithdraw = (amount: number, customFee: number | null, feeMode: boolean): number => {
    if (customFee) {
      if (feeMode) {
        return amount - (amount * customFee / 100);
      }
      return amount + (amount * customFee / 100);
    }
    if (amount >= 1 && amount < 15) return amount - 1;
    if (amount >= 15 && amount < 50) return amount - 1;
    if (amount >= 50 && amount < 80) return amount * 0.98;
    if (amount >= 80 && amount < 100000) return amount * 0.98;
    return amount;
  };

  const updateResults = (): { result: string; label: string } => {
    const rawAmount = amount || 0;
    const sendCur = sendCurrency;
    const opType = operationType;
    const amountCur = amountCurrency;
    const convertedAmount = convert(rawAmount, amountCur, 'USD', opType);

    let result = '-';
    let label = 'المبلغ بعد العملية:';

    if (convertedAmount > 0) {
      if (opType === 'deposit') {
        let depWithFee = calcDeposit(convertedAmount, customFee, feeMode);
        // فرض الحد الأدنى للعمولة
        const feeApplied = Math.abs(depWithFee - convertedAmount);
        const minFeeUSD = convert(minFee.value || 0, minFee.currency, 'USD', opType);
        if (minFeeUSD > 0 && (feeApplied + 1e-9) < minFeeUSD) {
          const delta = (minFeeUSD - feeApplied);
          depWithFee = feeMode ? (depWithFee - delta) : (depWithFee + delta);
        }
        let depFinal = convert(depWithFee, 'USD', sendCur, opType);
        result = formatAmount(depFinal) + ' ' + sendCur;
        label = feeMode ? 'المبلغ بعد خصم العمولة (إيداع):' : 'المبلغ بعد إضافة العمولة (إيداع):';
      } else {
        let withWithFee = calcWithdraw(convertedAmount, customFee, feeMode);
        // فرض الحد الأدنى للعمولة
        const feeApplied = Math.abs(withWithFee - convertedAmount);
        const minFeeUSD = convert(minFee.value || 0, minFee.currency, 'USD', opType);
        if (minFeeUSD > 0 && (feeApplied + 1e-9) < minFeeUSD) {
          const delta = (minFeeUSD - feeApplied);
          withWithFee = feeMode ? (withWithFee - delta) : (withWithFee + delta);
        }
        let withFinal = convert(withWithFee, 'USD', sendCur, opType);
        result = formatAmount(withFinal) + ' ' + sendCur;
        label = feeMode ? 'المبلغ بعد خصم العمولة (سحب):' : 'المبلغ بعد إضافة العمولة (سحب):';
      }
    }

    return { result, label };
  };

  const { result, label } = updateResults();
  return (
    <div className={dark ? 'dark' : ''}>
      <div dir="rtl" className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center font-tajawal transition-colors">
        <header className="relative w-full bg-gradient-to-r from-blue-700 to-blue-500 dark:from-slate-800 dark:to-slate-700 text-white py-8 text-center text-3xl font-extrabold rounded-b-3xl shadow-lg tracking-wide select-none mb-6 drop-shadow-lg">
          <span className="inline-block align-middle">💸</span> حاسبة العمولة
          <button
            type="button"
            onClick={() => setDark(v => !v)}
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 hover:bg-white/30 text-white px-3 py-1 text-sm shadow transition cursor-pointer"
            title={dark ? 'الوضع الفاتح' : 'الوضع الليلي'}
          >
            {dark ? '☀️' : '🌙'}
            <span className="hidden sm:inline">{dark ? 'فاتح' : 'ليلي'}</span>
          </button>
        </header>
        <main className="w-full max-w-lg mx-auto p-6 sm:p-7 bg-white/90 dark:bg-slate-800/80 rounded-3xl shadow-2xl flex flex-col gap-6 items-stretch mt-2 mb-8 border border-blue-100 dark:border-slate-700 backdrop-blur-sm transition-colors">
          <AmountInput
            amount={amount}
            amountCurrency={amountCurrency}
            setAmount={setAmount}
            setAmountCurrency={setAmountCurrency}
            getAmountLabel={getAmountLabel}
          />
          <OperationTypeSelect operationType={operationType} setOperationType={setOperationType} />
          <FeeInput
            customFee={customFee}
            setCustomFee={setCustomFee}
            feeMode={feeMode}
            setFeeMode={setFeeMode}
          />
          <SendCurrencySelect
            sendCurrency={sendCurrency}
            setSendCurrency={setSendCurrency}
          />
          <ResultBox label={label} result={result} />
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={openModal}
              className="flex items-center justify-center gap-2 text-base border-2 border-blue-400 bg-blue-50 text-blue-700 shadow font-bold py-2 px-4 rounded-xl w-full hover:bg-blue-100 hover:text-blue-900 transition cursor-pointer"
            >
              <span className="text-xl">⚙️</span>
              <span>الإعدادات</span>
            </button>
            {result !== '-' && (
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl py-2 font-bold text-base shadow hover:from-blue-700 hover:to-blue-500 transition flex items-center justify-center gap-2 cursor-pointer"
                onClick={copyToClipboard}
              >
                <span className="text-lg">📋</span>
                <span>اضغط للنسخ</span>
              </button>
            )}
          </div>
        </main>
        {/* Settings Modal */}
        <SettingsModal
          show={showModal}
          tempRates={tempRates}
          tempMinFee={tempMinFee}
          setTempRates={setTempRates}
          setTempMinFee={setTempMinFee}
          onClose={() => setShowModal(false)}
          onSave={saveSettings}
        />
        {/* Notification */}
        {notification && (
          <Notification text={notification.text} isError={notification.isError} />
        )}
        <footer className="w-full text-center mt-auto py-6 text-gray-500 dark:text-gray-400 text-base tracking-wide font-tajawal select-none bg-transparent">
          <span className="opacity-80">جميع الحقوق محفوظة © {new Date().getFullYear()} - <a href="https://khalidalansi.github.io" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline">Khalid Alansi</a></span>
        </footer>
      </div>
    </div>
  );
}

export default App
