import React from 'react';

interface NotificationProps {
  text: string;
  isError?: boolean;
}

const Notification: React.FC<NotificationProps> = ({ text, isError }) => (
  <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-tajawal text-base font-semibold ${isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
    {isError ? '❌' : '✅'}
    <span>{text}</span>
  </div>
);

export default Notification;
