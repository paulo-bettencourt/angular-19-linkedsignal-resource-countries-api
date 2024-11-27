# Angular Countries Search App 🌍

This Angular app demonstrates the usage of the new **signal-based API** introduced in Angular v19, including `linkedSignal`, `resource`, and `computed`. The app allows users to search for countries by their common or official name, dynamically updating the view as users type.

## Key Features 🚀

- **Signal-Based API**: Uses `linkedSignal` for seamless state management.
- **Efficient Data Fetching**: Leverages `resource` for backend API calls, avoiding RxJS Observables.
- **Dynamic UI Updates**: Implements `computed` to derive reactive states.
- **Material Design**: Styled with Angular Material for a clean user experience.

## How It Works 🔧

1. **API Request**: Fetches a list of countries (common and official names) from the backend using `resource`.
2. **Search Functionality**: Allows users to filter countries by typing either the common or official name.
3. **Reactive State**: Automatically updates the UI with `linkedSignal` and `computed`.

## Screenshots 📷
