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
* Since it's mostly simple visual features, and with no integrations I kept it simple and just made a small test to serve as example of something that could be tested

## Stack and Considerations
* I used `vite` to initialize the React application
* For state management I used `recoil`, that is easier and lighter than Redux and a similar effort than Context API. It would also be good in case application would scale
* Although I added `SCSS` in the project, I sticked with the CSS features as much as possible, specially the `var()` and `calc()`. The `SCSS` was added mostly to create some `mixins` and avoid so much code repetition
* I also used some elements from `ant design`, such as icons and `Switch` component. I made that to speed some parts of code and also show my code integrating with external libs, while creating my own components
* Inside `components` folder I put an `index` file that make it easier to import all the components from it. For each component I made a folder with mainly 3 files: `Component`, `Styling Module` and `index`. The idea here is to use the index to facilitate the exporting, while the module helps with and prevention of CSS classes interference, and the `Component` file is named so if we need to debug it's easier to find what we need
  * Following a similar logic I made `shared` folder, with `state` and `constants` as named files. The `utils` folder was made that way so I can create different utilities method in separate files, which would help debug or further improvements, while using `index` to export them or to gather the simpler methods
* I didn't use `Router` in this project since it's a sample of a chat page, so I opted to kept it simple in this part too