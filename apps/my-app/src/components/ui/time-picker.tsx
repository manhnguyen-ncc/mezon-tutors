'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

type TimePickerProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function TimePicker({ value, onChange, placeholder = '09:00' }: TimePickerProps) {
  const t = useTranslations('TutorProfile.Availability.availability');
  const [isOpen, setIsOpen] = useState(false);
  const [hours, minutes] = value.split(':');
  const [inputValue, setInputValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleHourSelect = (hour: string) => {
    const newValue = `${hour}:${minutes || '00'}`;
    onChange(newValue);
    setInputValue(newValue);
  };

  const handleMinuteSelect = (minute: string) => {
    const newValue = `${hours || '09'}:${minute}`;
    onChange(newValue);
    setInputValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);
    
    if (text === '') {
      return;
    }

    const cleanText = text.replace(/[^\d:]/g, '');
    
    if (cleanText.match(/^\d{2}:\d{2}$/)) {
      const [h, m] = cleanText.split(':');
      const hourNum = parseInt(h);
      const minuteNum = parseInt(m);
      
      if (hourNum >= 0 && hourNum <= 23 && minuteNum >= 0 && minuteNum <= 59) {
        onChange(cleanText);
      }
    }
  };

  const handleInputBlur = () => {
    if (!inputValue.match(/^\d{2}:\d{2}$/)) {
      setInputValue(value);
    }
  };

  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minuteOptions = ['00', '15', '30', '45'];

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="pr-8"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown size={16} />
        </Button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
          <div className="flex h-full">
            <div className="flex-1 border-r border-gray-200 overflow-y-auto max-h-60">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-2 py-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {t('hour')}
                </span>
              </div>
              {hourOptions.map((hour) => (
                <button
                  key={hour}
                  type="button"
                  className={`w-full px-3 py-2 text-sm text-center hover:bg-gray-50 ${
                    hours === hour ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                  onClick={() => handleHourSelect(hour)}
                >
                  {hour}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto max-h-60">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-2 py-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {t('minute')}
                </span>
              </div>
              {minuteOptions.map((minute) => (
                <button
                  key={minute}
                  type="button"
                  className={`w-full px-3 py-2 text-sm text-center hover:bg-gray-50 ${
                    minutes === minute ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                  onClick={() => handleMinuteSelect(minute)}
                >
                  {minute}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}