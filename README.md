# Personal Dashboard

Vue 3 Composition API Dashboard
This Vue 3 project is a dashboard application built using the Composition API. It includes several web pages such as sign up, login, and dashboard. The dashboard consists of three main sections:

- Notes: Users can create, view, delete, and update their own notes. Each note contains a title, description, and other relevant information.

- Weather Forecast: This section provides real-time weather data based on the user's location. It includes temperature, wind speed, humidity, and date information.

- Task Management: Users can manage their daily and future tasks in this section. It supports CRUD operations for tasks and allows users to set priorities for each task.

## Features

List the main features and functionalities of the project.

- Sign up and login functionality
- Dashboard with multiple sections
- Notes management with CRUD operations
- Real-time weather forecast based on user's location
- Task management with priority setting
- Support for dark and light mode
- Responsive design for mobile and desktop devices

## Technologies Used

- Vue 3
- Vue Router
- Pinia - state Management
- Vue Composition API
- Axios
- JSON Server (for mock backend)
- HTML5
- CSS3
- JavaScript (ES6+)

## Installation

Please follow Installation and project running process below -

```bash
# Clone the repository
git clone https://github.com/MaheshUgale/personalDashboard.git

# Navigate to the project directory
cd personalDashboard

# Install dependencies
npm install
npm install -g json-server

# for accessing db - go to db folder in project and run below command 
npx json-server --watch db.json

#Now go to root folder and open command promt and run below command, You will get link copy and paste in browser tab.
npm run dev

