import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import DogProfilePage from './components/DogProfilePage/DogProfilePage';
import DashboardPage from './components/DashboardPage/DashboardPage';
import AddDogPage from './components/AddDogPage/AddDogPage';
import ManageActivitiesPage from './components/ManageActivitiesPage/ManageActivitiesPage';
import ManageFoodPage from './components/ManageFoodPage/ManageFoodPage';
import ManageSkillsPage from './components/ManageSkillsPage/ManageSkillsPage';
import FeedingLogPage from './components/FeedingLogPage/FeedingLogPage';
import ExerciseLogPage from './components/ExerciseLogPage/ExerciseLogPage';
import TrainingLogPage from './components/TrainingLogPage/TrainingLogPage';
import NewExerciseLogPage from './components/NewExerciseLogPage/NewExerciseLogPage';
import NewFeedingLogPage from './components/NewFeedingLogPage/NewFeedingLogPage';
import NewTrainingLogPage from './components/NewTrainingLogPage/NewTrainingLogPage';
import AddActivityPage from './components/AddActivityPage/AddActivityPage';
import AddFoodPage from './components/AddFoodPage/AddFoodPage';
import AddSkillPage from './components/AddSkillPage/AddSkillPage';

import './styles/main.css';
import DogLogProfileTabs from './components/DogLogNav/DogLogProfileTabs/DogLogProfileTabs';

const App = () => (
  <div>
    <style>
      @import url('https://fonts.googleapis.com/css?family=Montserrat');
    </style>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/dash"
          component={DashboardPage}
        />
        <Route
          path="/dog-profile/:id"
          component={DogProfilePage}
        />
        <Route
          path="/add-dog"
          component={AddDogPage}
        />
        <Route
          path="/logs/:id"
          component={DogLogProfileTabs}
        />
        <Route
          path="/feeding-log/:id"
          component={FeedingLogPage}
        />
        <Route
          path="/exercise-log/:id"
          component={ExerciseLogPage}
        />
        <Route
          path="/training-log/:id"
          component={TrainingLogPage}
        />
        <Route
          path="/manage-food"
          component={ManageFoodPage}
        />
        <Route
          path="/manage-activities"
          component={ManageActivitiesPage}
        />
        <Route
          path="/manage-skills"
          component={ManageSkillsPage}
        />
        <Route
          path="/new-exercise"
          component={NewExerciseLogPage}
        />
        <Route
          path="/new-feeding"
          component={NewFeedingLogPage}
        />
        <Route
          path="/new-training"
          component={NewTrainingLogPage}
        />
        <Route
          path="/add-activity"
          component={AddActivityPage}
        />
        <Route
          path="/add-food"
          component={AddFoodPage}
        />
        <Route
          path="/add-skill"
          component={AddSkillPage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
