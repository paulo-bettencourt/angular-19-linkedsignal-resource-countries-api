import {
  Component,
  computed,
  effect,
  linkedSignal,
  resource,
} from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

export interface Country {
  name: {
    common: string;
  };
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class SearchComponent {
  countryNames = computed(() => this.countries.value());
  PARAM_KEYWORD = 'name';
  constructor() {
    effect(() => {
      console.log('countryNames:', this.countryNames());
    });
  }

  selectedOption = linkedSignal(() => this.countries.value());

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
    const countryFiltered = this.countryNames()?.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(inputElement.value.toLowerCase())
    );
    this.selectedOption.set(countryFiltered);
    console.log('country: ', countryFiltered);
  }
}
