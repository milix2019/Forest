import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomeView from './container/HomeContainer';
import Navbar from './component/Nav/Navbar';
import Movie from './component/Movie';
import Casts from './component/Casts';


class Routes extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={HomeView} />
                    <Route exact path="/movie" component={Movie} />
                    <Route exact path="/cast" component={Casts} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes;
