import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { userIsAuthenticated, userIsNotAuthenticated, adminIsAuthenticated, adminIsNotAuthenticated } from '../hoc/authentication';
import CustomScrollbars from '../components/CustomScrollbars';
import { path } from '../utils'
import { ToastContainer } from 'react-toastify';
import Home from '../routes/Home';
import Login from '../routes/Login';
import UserLogin from '../components/Auth/UserLogin';
import SignUp from '../components/Auth/SignUp';
import Header from './Header/Header';
import System from '../routes/System';
import HomePage from '../components/HomePage/HomePage';
import allProduct from '../components/HomePage/allProduct';
import PlayBar from '../components/Share/PlayBar';
import Playlist from '../components/HomePage/Playlist';
import { withRouter } from 'react-router';
import SearchPage from '../components/HomePage/SearchPage';
import LikedSongPage from '../components/HomePage/LikedSongPage';
import Libary from '../components/HomePage/Libary';
import DetailArtists from '../components/HomePage/DetailArtists';
import DetailSong from '../components/HomePage/DetailSong';
import CreatePlaylist from '../components/HomePage/CreatePlaylist';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedInUser: false
        }
    }

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isLoggedInUser !== this.props.isLoggedInUser) {
            this.setState({
                isLoggedInUser: this.props.isLoggedInUser
            })
        }

        if (prevProps.listSongs !== this.props.listSongs) {
            this.setState({
                listSongs: this.props.listSongs
            })
        }

        if (prevProps.typeSong !== this.props.typeSong) {
            this.setState({
                typeSong: this.props.typeSong
            })
        }
    }

    render() {

        let { isLoggedInUser, typeSong } = this.state;
        let { listSongs } = this.props;

        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">

                        {/* {this.props.isLoggedIn && <Header />} */}

                        <span className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(HomePage)} />
                                    <Route path={path.ADMIN_LOGIN} component={adminIsNotAuthenticated(Login)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(UserLogin)} />
                                    <Route path={path.ALL_ARTISTS} component={(allProduct)} />
                                    <Route path={path.ALL_PLAYLISTS} component={(allProduct)} />
                                    <Route path={path.ALL_MADE_FOR_YOU} component={(allProduct)} />
                                    <Route path={path.ALL_TOP_MIX} component={(allProduct)} />
                                    <Route path={path.ALL_US_UK} component={(allProduct)} />
                                    <Route path={path.ALL_NEW_SONG} component={(allProduct)} />
                                    <Route path={path.ALL_CHILL_PLAYLIST} component={(allProduct)} />
                                    <Route path={path.DETAIL_ARTISTS} component={(DetailArtists)} />
                                    <Route path={path.DETAIL_SONG} component={(DetailSong)} />
                                    <Route path={path.SIGNUP} component={userIsNotAuthenticated(SignUp)} />
                                    <Route path={path.ADMIN} component={adminIsAuthenticated(System)} />
                                    <Route path={path.PLAYLIST} component={(Playlist)} />
                                    <Route path={path.ALBUM} component={(Playlist)} />
                                    <Route path={path.SEARCH} component={(SearchPage)} />
                                    <Route path={path.LIKE_SONG} component={(LikedSongPage)} />
                                    <Route path={path.LIBARY} component={(Libary)} />
                                    <Route path={path.CREATE_PLAYLIST} component={(CreatePlaylist)} />
                                </Switch>
                            </CustomScrollbars>

                        </span>

                    </div>

                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </Router>


                {(window.location.href.indexOf("/login") === -1 && window.location.href.indexOf("/admin") === -1 &&
                    window.location.href.indexOf("/sign-up") === -1) &&

                    <PlayBar listSongs={listSongs} typeSong={typeSong} />
                }

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.admin.isLoggedIn,
        isLoggedInUser: state.user.isLoggedInUser,
        listSongs: state.user.listSongs,
        typeSong: state.user.typeSong
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);