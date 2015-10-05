import React from "react";
import {Link} from 'react-router';

class App extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/hello-world">Hello World</Link></li>
                    <li><Link to="/welcome-world">Welcome World</Link></li>
                </ul>
                {this.props.children}
            </div>
       )
    }
}

export default App;
