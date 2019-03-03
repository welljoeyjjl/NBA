import React, { Component } from 'react';
import { TopBar } from './TopBar';
import { Main } from './Main';


class App extends Component {

    render() {
        console.log('render', this.state);
        return (
            <div className="App">
                <TopBar />
                <Main />
            </div>
        );
    }
}

export default App;
