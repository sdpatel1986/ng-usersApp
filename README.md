# NgGithubUsers

- This project is to get users from GITHUB, the main page is a list of 1000 users with a search box to search for users.
- As GitHub doesn't support to get 1000 in one request, we had to make a custom RXJS operator to create requests to get 1000 users.
- Application cache search results in order to save performance when user ask for the same search again.
- In the users list page Each user has two buttons, one to open user on GitHub, and the second one is to view user details in Our Application.
- In the User Details page there is some information about the user like; company,email, img, and repos


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
