import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';



class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }


    render() {
        return (
            <div className="text-center" >HomePage</div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
