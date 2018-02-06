import React, { Component } from 'react';

import Slider from 'components/layout/body/Slider';
import BodyComponent from 'components/layout/body/BodyComponent';

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