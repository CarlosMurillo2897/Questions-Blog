# Questions-Blog

![Home Page](../assets/Home.png?raw=true)

Home Page - Screen Shot.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.

## Install NPM Packages

Run `npm i` in order to install package with versions according to package.json file.

## Development Server and API

Run `npm start` for a dev NODE server and Angular UI. Navigate to `http://localhost:4200/` to get UI and Navigate to `http://localhost:3000/` to get API.
The app will automatically reload if you change any of the source files, according to where files belong if Server or Client side.

### Development Server and API (LAN)

API is already configured to be accessed through LAN once `npm start` is executed, thanks to: `babel-node server/index.js`.

Server is already configured to be accessed through LAN once `npm start` is executed, thanks to: `ng serve --host 0.0.0.0`, "--host 0.0.0.0" will use current local IP as URL.

At this point can access Application using your current IP address and the choosed port (ex: http://192.168.100.41:4200/) however API URL is defined to point at your http://localhost:3000 so it's necessary to change this "localhost" for current IP address. Access src/environments/environment.ts file and proceed with change.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Application Screen Shots

![Home Page](../assets/Home.png?raw=true)

![Home Page - User](../assets/Home-User.png?raw=true)

![Sign Up Page](../assets/SignUp.png?raw=true)

![Create Questions](../assets/Create-Question.png?raw=true)

![Create Answers](../assets/Create-Answer.png=100x20)