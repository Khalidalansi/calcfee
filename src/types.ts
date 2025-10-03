export interface ExchangeRate {
  buy: number;
  sell: number;
}

export interface Rates {
  USD: ExchangeRate;
  SAR: ExchangeRate;
  YER: ExchangeRate;
}

export interface MinFee {
  value: number;
  currency: string;
}
