'use client';

import { cn } from "@/lib/utils";

interface CountryBadgesProps {
  countries: string[];
}

const COUNTRY_FLAGS: Record<string, string> = {
  India: '🇮🇳',
  'Sri Lanka': '🇱🇰',
  Bangladesh: '🇧🇩',
  UAE: '🇦🇪',
  Oman: '🇴🇲',
  Jordan: '🇯🇴',
  'Saudi Arabia': '🇸🇦',
  Australia: '🇦🇺',
  Denmark: '🇩🇰',
  Poland: '🇵🇱',
  Germany: '🇩🇪',
  'South Africa': '🇿🇦',
  Japan: '🇯🇵',
  Thailand: '🇹🇭',
  Turkey: '🇹🇷'
};

// Helper: split countries into rows
function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function CountryBadges({ countries }: CountryBadgesProps) {
  const rows = chunkArray(countries, 8);

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={cn(
            "scroller relative w-full py-1 overflow-hidden",
          )}
        >
          <ul
            className={cn(
              "flex gap-3 sm:gap-4 w-max min-w-full flex-nowrap",
              "animate-scroll", // apply keyframe animation
              rowIndex % 2 === 0
                ? "[--animation-direction:forwards]"
                : "[--animation-direction:reverse]",
              rowIndex % 2 === 0
                ? "[--animation-duration:20s]"
                : "[--animation-duration:25s]"
            )}
          >
            {/** Duplicate items for seamless scroll */}
            {[...row, ...row].map((country, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 bg-white text-gray-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold border border-gray-200 shadow-md shrink-0"
              >
                <span className="text-lg">{COUNTRY_FLAGS[country] || '🏳️'}</span>
                <span>{country}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
