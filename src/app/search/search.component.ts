import {
  Component,
  computed,
  effect,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

export interface Country {
  name: {
    common: string;
    official: string;
  };
}

export type CountryName = keyof {
  common: string;
  official: string;
};

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
  ],
})
export class SearchComponent {
  countryNames = computed(() => this.countries.value());
  selectedOption = linkedSignal(() => this.countries.value());
  PARAM_KEYWORD = 'name';
  radioValue: CountryName = 'common';
  selectedCountry = signal('');

  constructor() {
    effect(() => {});
  }

  async fetchCountries(key: string) {
    const res = await fetch(`https://restcountries.com/v3.1/all?fields=${key}`);
    return res.json() as Promise<Country[]>;
  }
  // IF PARAM KEYWORD CHANGES, IT WILL MAKE A NEW API REQUEST
  countries = resource<Country[], string>({
    // Data type is Country[] (loader) and string concerns the "request"
    request: () => this.PARAM_KEYWORD,
    loader: ({ request }) => this.fetchCountries(request),
  });

  onCountrySearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      const countryFiltered = this.countryNames()?.filter((country) =>
        country.name[this.radioValue]
          .toLowerCase()
          .includes(inputElement.value.toLowerCase())
      );
      console.log('countryFiltered: ', countryFiltered);
      this.selectedOption.set(countryFiltered);
    } else {
      this.selectedCountry.set('');
    }
  }

  onCountrySelect(country: string) {
    this.selectedCountry.set(country);
    this.selectedOption.set(this.countryNames());
  }

  onSelectionChange(value: CountryName): void {
    this.radioValue = value;
  }
}
