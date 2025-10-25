# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# حاسبة العمولة

حاسبة العمولة الإلكترونية لخدمات الدفع الإلكتروني مبنية باستخدام React و TypeScript.

## المميزات

- 💰 حساب عمولة الإيداع والسحب
- 🌍 دعم عملات متعددة (USD, SAR, YER)
- ⚙️ إعدادات مخصصة لأسعار الصرف والحد الأدنى للعمولة
- 📱 تصميم متجاوب يعمل على الهاتف والحاسوب
- 📋 نسخ النتائج بضغطة واحدة
- 🎯 واجهة عربية سهلة الاستخدام

## التطوير المحلي

### متطلبات النظام
- Node.js 18+ 
- npm أو yarn

### تشغيل المشروع

1. تثبيت المتطلبات:
```bash
npm install
```

2. تشغيل الخادم المحلي:
```bash
npm run dev
```

3. افتح المتصفح على العنوان:
```
http://localhost:5173/epay-commission-calculator/
```

### أوامر أخرى

- بناء المشروع للإنتاج:
```bash
npm run build
```

- معاينة النسخة المبنية:
```bash
npm run preview
```

- فحص الكود:
```bash
npm run lint
```

## النشر على GitHub Pages

1. قم بتحديث ملف `package.json`:
   - غيّر `USERNAME` في `homepage` إلى اسم المستخدم الخاص بك على GitHub
   - تأكد من اسم المستودع في `base` في ملف `vite.config.ts`

2. قم بتثبيت gh-pages (إذا لم تكن مثبتة):
```bash
npm install --save-dev gh-pages
```

3. انشر المشروع:
```bash
npm run deploy

```

## التقنيات المستخدمة

- **React 19** - مكتبة واجهة المستخدم
- **TypeScript** - لغة البرمجة مع الأنواع
- **Vite** - أداة البناء السريعة
- **TailwindCSS 4** - أسلوب تصميم مراعي للتجاوب
- **GitHub Pages** - للاستضافة

## البنية

```
src/
├── App.tsx          # المكون الرئيسي
├── App.css          # تصميم التطبيق
├── index.css        # التصميم العام
├── main.tsx         # نقطة دخول التطبيق
└── ...
```

## الرخصة

هذا المشروع مفتوح المصدر ومتاح تحت رخصة MIT.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
