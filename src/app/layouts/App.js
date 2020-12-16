import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';


import EventDashboard from '../../features/event/eventDashboard/EventDashboard';
import Navbar from '../../features/nav/navBar/Navbar';
import EventDetailedPage from '../../features/event/eventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/peropleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/userDetailedPage/UserDetailedPage';
import SettingsDashboard from '../../features/user/settings/SettingsDashboard';
import EventForm from '../../features/event/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import ModalManager from '../../features/modals/ModalManager';


function App() {
  return (
    <div>
      <ModalManager />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/(.+)" render={() => (
          <div>
            <Navbar />
            <Container className="main">
              <Switch>
                <Route path="/events" component={EventDashboard} />
                <Route path="/event/:id" component={EventDetailedPage} />
                <Route path="/manage/:id" component={EventForm} />
                <Route path="/people" component={PeopleDashboard} />
                <Route path="/profile/:id" component={UserDetailedPage} />
                <Route path="/settings" component={SettingsDashboard} />
                <Route path="/create-event" component={EventForm} />
              </Switch>
            </Container>
          </div>
        )} />
      </Switch>
    </div>
  );
}

export default App;
