import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {
  currency = 'HUF';

  exchangeRates: { [key: string]: number } = {
    USD: 0.0027,
    EUR: 0.0025,
    HUF: 1,
  };

  transform(value: number | any): string {
    if (typeof window !== 'undefined') {
      switch (navigator.language) {
        case 'en-US':
          this.currency = 'USD';
          break;

        case 'de-DE':
          this.currency = 'EUR';
          break;

        default:
          this.currency = 'HUF';
          break;
      }
    }

    const exchangeRate = this.exchangeRates[this.currency];
    return (value * exchangeRate).toFixed(2) + ' ' + this.currency;
  }
}
