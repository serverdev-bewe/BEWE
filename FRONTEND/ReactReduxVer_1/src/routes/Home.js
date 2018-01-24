import React, { Component } from 'react';

import Slider from '../body/Slider';
import BodyComponent from '../body/BodyComponent';

class Home extends Component {
    render() {
        return (
            <div>
                <Slider />
                <hr/>
                <BodyComponent />
                <hr/>
            </div>
        );
    }
}

export default Home;