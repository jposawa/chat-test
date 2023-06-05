# chat-test
It's a test project with the goal of show a simple version of chat screen with the feature to "send" message to container component, change user name, switch between 2 themes and toggle "Send" button

You can check it running at https://osawa-chat.netlify.app/

## Setup and Launch
### Setup
To setup the project locally you can clone the from here and then run `npm install` in your terminal to install all dependencies

### Launch
After installing dependencies type `npm run dev` in your terminal to run it at `localhost:5173`

## Development Decisions
* Along with the main features of sending message and changing User name, I decided to add some quality of life improvements
  * Dark theme: Inside User settings modal
  * Send message with Return key: Also inside User settings
    * I followed the logic from Telegram and hide the Send button when this option is active
  * Ability to save some data inside `sessionStorage` so those can be retrieved if tab gets refreshed. I didn't use `localStorage` because I wanted that the tab closing erased the storage data, giving it a quick way to "reset" everything
* I started writting some tests, but I realized that most of them would be visual or implementation tests (Like check if the Send button is visible or not), but that wasn't adding much to code itself and some tests were considered as "anti-pattern" so at least for now I opted to let code without it

## Stack and Considerations
* I used `vite` to initialize the React application
* For state management I used `recoil`, that is easier and lighter than Redux and a similar effort than Context API. It would also be good in case application would scale
* Although I added `SCSS` in the project, I sticked with the CSS features as much as possible, specially the `var()` and `calc()`. The `SCSS` was added mostly to create some `mixins` and avoid so much code repetition
* I also used some elements from `ant design`, such as icons and `Switch` component. I made that to speed some parts of code and also show my code integrating with external libs, while creating my own components
