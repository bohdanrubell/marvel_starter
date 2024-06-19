import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {MainPage, ComicsPage, Page404} from '../pages';
import AppHeader from "../appHeader/AppHeader";
import SinglePage from "../pages/SinglePage";
import SingleCharPage from "../pages/singleCharPage/SingleCharPage";
import SingleComicPage from "../pages/singleComicPage/SingleComicPage";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                        <Route exact path="/comics/:id">
                            <SinglePage Component={SingleComicPage} dataType='comic'/>
                        </Route>
                        <Route exact path="/char/:id">
                            <SinglePage Component= {SingleCharPage} dataType='char'/>
                        </Route>
                        <Route path="*">
                            <Page404/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;