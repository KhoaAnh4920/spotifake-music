import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.scss';
import './Playlist.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Share/Header';
import Sidebar from '../Share/Sidebar';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import PlayBar from '../Share/PlayBar';
import $ from "jquery";
import imgHotHit from '../../assets/images/music/HotHit.jpg';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import FanAlsoLike from './FanAlsoLike';
import AboutArtist from './AboutArtist';
import sol7 from '../../assets/images/artist/sol7.jpg'
import * as actions from "../../store/actions";



class Playlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            visible: false
        }
    }
    fancyTimeFormat = (duration) => {
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }


    async componentDidMount() {

        let { listPlaylist } = this.props;
        console.log(listPlaylist);
        if (listPlaylist) {
            let detailPlaylist = listPlaylist.filter(item => item.id === +this.props.match.params.id);
            if (detailPlaylist && detailPlaylist[0].SongInPlaylist) {

                let result = detailPlaylist[0].SongInPlaylist.map(item => {
                    if (!isNaN(item.timePlay)) {
                        item.timePlay = this.fancyTimeFormat(item.timePlay);
                    }
                    return item;
                })

                await this.setState({
                    listSongs: result,
                    isShowLoading: false,
                    playlistId: +this.props.match.params.id,
                    namePlaylist: detailPlaylist[0].playlistName,
                    image: detailPlaylist[0].image
                })
            }
        }

        console.log(this.state)
    }

    componentDidUpdate(prevProps, prevState) {
    }


    handleKeoTha = (e) => {
        var min = e.target.min,
            max = e.target.max,
            val = e.target.value;


        $(e.target).css({
            'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
        });
    }
    toogleBtnTippy = () => {
        if (!this.state.isLogin) {
            let visible = this.state.visible;
            this.setState({
                visible: !this.state.visible,

            })
        }
    }

    playAllPlaylist = async (listSongs) => {
        console.log(listSongs);

        await this.props.playAllPlaylist(listSongs);
    }

    testClick = async (pos, listSongs) => {
        alert(pos);
        await this.props.playAllPlaylist([]);

        // let result = listSongs.filter((item, index) => index >= pos)
        // console.log(result);

        // await this.props.playAllPlaylist(result);
    }


    render() {
        let visible = this.state.visible;

        let { listSongs, namePlaylist, image } = this.state

        console.log(this.state)
        return (
            <>
                <div className="wrap">
                    <div className="list-area">
                        <Sidebar />
                        <div className="main">
                            <Header />

                            <div className="main main-playlist">
                                <div className='content'>
                                    <div className='avatar'>
                                        <img src={image} />
                                    </div>
                                    <div className='title-playlist'>
                                        <div>
                                            kkkkkkk
                                        </div>
                                        <div className="song-Name">
                                            {namePlaylist}
                                        </div>
                                        <div>
                                            Duc Fuc.  SINGLE 2021 1 song, 3 min 25 sec
                                        </div>
                                    </div>

                                </div>
                                <div className="like-song">
                                    <div className='button-playlist' onClick={() => this.playAllPlaylist(listSongs)}><i class='fas fa-play'></i> </div>
                                    <div className='button-like'>
                                        <NavLink activeClassName="" to="/liked-song" exact><i class='fas fa-heart'></i></NavLink>
                                    </div>
                                    <div className='button-other'>
                                        <Tippy
                                            delay={200} theme='dark' visible={visible}
                                            placement={'bottom'} animation='perspective' offset={[40, 20]} interactive={true}
                                            content={
                                                <div style={{ minWidth: '200px' }}>
                                                    <h5>Add to queue</h5>
                                                    <h5> Go to play audio</h5>
                                                    <h5>Add your Libary</h5>
                                                    <h5>Share</h5>
                                                    <h5> About</h5>
                                                    <h5> Open App</h5>
                                                </div>
                                            }>
                                            <p className="nav__text" onClick={() => this.toogleBtnTippy()}> ... </p>
                                        </Tippy>

                                    </div>
                                </div>
                                <table class="table table-dark table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Album</th>
                                            <th scope="col">Date Add</th>
                                            <th scope='col'><i className="fa fa-clock"></i></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listSongs && listSongs.map((item, index) => {
                                            return (
                                                <tr key={index} onClick={() => this.testClick(index, listSongs)}>
                                                    <th scope="row">{item.id}</th>
                                                    <td className="info-song-play">
                                                        <img src={item.image} style={{ width: '40px', height: '40px' }} />
                                                        <p className="name-song">{item.nameSong}</p>
                                                    </td>
                                                    <td>Ngày đầu tiên</td>
                                                    <td>6 day ago</td>
                                                    <td>{item.timePlay}</td>
                                                    <td>
                                                        <Tippy
                                                            delay={200} theme='dark' trigger='click'
                                                            placement={'bottom'} animation='perspective' offset={[40, 20]} interactive={true}
                                                            content={
                                                                <div style={{ minWidth: '200px', cursor: 'pointer' }}>
                                                                    <h5>Add to queue</h5>
                                                                    <h5> Go to play audio</h5>
                                                                    <h5>Add your Libary</h5>
                                                                    <h5>Share</h5>
                                                                    <h5> About</h5>
                                                                    <h5> Open App</h5>
                                                                </div>
                                                            }>
                                                            <p className="nav__text" style={{ cursor: 'pointer', fontWeight: '1000' }}> . . . </p>
                                                        </Tippy>
                                                    </td>
                                                </tr>
                                            )

                                        })}

                                        {/* <tr>
                                            <th scope="row">2</th>
                                            <td className="info-song-play">
                                                <img src={imgHotHit} style={{ width: '40px', height: '40px' }} />
                                                <p className="name-song">Ngày đầu tiên</p>
                                            </td>
                                            <td>Ngày đầu tiên</td>
                                            <td>6 day ago</td>
                                            <td>3:28</td>
                                            <td>
                                                <Tippy
                                                    delay={200} theme='dark' trigger='click'
                                                    placement={'bottom'} animation='perspective' offset={[40, 20]} interactive={true}
                                                    content={
                                                        <div style={{ minWidth: '200px', cursor: 'pointer' }}>
                                                            <h5>Add to queue</h5>
                                                            <h5> Go to play audio</h5>
                                                            <h5>Add your Libary</h5>
                                                            <h5>Share</h5>
                                                            <h5> About</h5>
                                                            <h5> Open App</h5>
                                                        </div>
                                                    }>
                                                    <p className="nav__text" style={{ cursor: 'pointer', fontWeight: '1000' }}> . . . </p>
                                                </Tippy>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td className="info-song-play">
                                                <img src={imgHotHit} style={{ width: '40px', height: '40px' }} />
                                                <p className="name-song">Ngày đầu tiên</p>
                                            </td>
                                            <td>Ngày đầu tiên</td>
                                            <td>6 day ago</td>
                                            <td>3:28</td>
                                            <td>
                                                <Tippy
                                                    delay={200} theme='dark' trigger='click'
                                                    placement={'bottom'} animation='perspective' offset={[40, 20]} interactive={true}
                                                    content={
                                                        <div style={{ minWidth: '200px', cursor: 'pointer' }}>
                                                            <h5>Add to queue</h5>
                                                            <h5> Go to play audio</h5>
                                                            <h5>Add your Libary</h5>
                                                            <h5>Share</h5>
                                                            <h5> About</h5>
                                                            <h5> Open App</h5>
                                                        </div>
                                                    }>
                                                    <p className="nav__text" style={{ cursor: 'pointer', fontWeight: '1000' }}> . . . </p>
                                                </Tippy>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>
                                <div className=''>
                                    SEE ALL
                                </div>
                                <hr />
                                <FanAlsoLike />
                                <hr />
                                <AboutArtist />
                            </div>
                        </div>
                    </div >
                </div >

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedInUser: state.user.isLoggedInUser,
        listPlaylist: state.admin.listPlaylist,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPlaylist: () => dispatch(actions.fetchAllPlaylist()),
        playAllPlaylist: (listSongs) => dispatch(actions.playAllPlaylist(listSongs)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
