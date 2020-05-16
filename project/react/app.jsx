import React from 'react';
import ReactDOM from 'react-dom';

/** 
 * App is the root component. It handles the single ReactDOM call of the entire application.
 */
class App extends React.Component {
    render() {
        return (
            <React.Fragment> {/*this tag prevents the need to create another div element*/}
                {/*add calls to components here */}
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);