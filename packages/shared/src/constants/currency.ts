import { ECurrency } from '../enums/currency'

export type CurrencyUiConfig = {
  symbol: string
  recommendedMin: number
  recommendedMax: number
}

export const CURRENCY_UI_CONFIG: Record<ECurrency, CurrencyUiConfig> = {
  [ECurrency.USD]: {
    symbol: '$',
    recommendedMin: 3,
    recommendedMax: 45,
  },
  [ECurrency.VND]: {
    symbol: 'đ',
    recommendedMin: 80000,
    recommendedMax: 1200000,
  },
  [ECurrency.PHP]: {
    symbol: '₱',
    recommendedMin: 180,
    recommendedMax: 2700,
  },
}


