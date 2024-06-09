import React, {Component} from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import PropTypes from "prop-types";

const DynamicGreating = (props) => {
    return (
        <div>
            {
                React.Children.map(props.children, child => {
                    return React.cloneElement(child)
                })
            }
        </div>
    )
}


class App extends Component {
    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        });
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <DynamicGreating>
                        <RandomChar/>
                    </DynamicGreating>
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected}/>
                        <ErrorBoundary>
                            <CharInfo charId = {this.state.selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}


export default App;