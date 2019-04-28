import React, { Component } from 'react';
import './App.css';

const CONSTANTS = {
  title: '倾听 专注',
  description: '循环播放十首电影原声精选，背景乐为下雨声。',
  github: 'https://github.com/hijiangtao/rainmood',
  musicStrList: '0123456789',
  changeMusicTitle: '手动切歌'
}

class App extends Component {
  state = {
    musicId: '0',
    musicLoopFlag: false,
    logoClassSubfixName: 'static', // 'static', 'switch'
    bgAudioVolume: 1,
    musicAudioVolume: 1
  }

  onSelectChange = (event) => {
    this.setState({
      musicId: event.target.value,
    }, () => {
      this.refs.musicAudioRef.pause();
      this.refs.musicAudioRef.load();
      this.refs.musicAudioRef.play();
    });
  }

  onLoopChange = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        musicLoopFlag: !prevState.musicLoopFlag,
      }
    })
  }

  setVolume = (type) => {
    return (event) => {
      const volume = event.target.value;
      this.setState({
        [`${type}Volume`]: volume,
      });
      this.refs[`${type}Ref`].volume = volume;
    }
  }

  /**
   * ignoreLoop 用于忽略 musicLoop 状态使用
   */
  forceMusicChange = ({ ignoreLoop }) => {
    if (this.state.musicLoopFlag && !ignoreLoop) {
      return () => {
        // console.log('Single music loop.');
        this.refs.musicAudioRef.currentTime = 0;
        this.refs.musicAudioRef.play();
       };
    } else {
      return () => {
        this.setState({
          musicId: ((parseInt(this.state.musicId) + 1) % 10).toString(),
          logoClassSubfixName: 'switch',
        }, () => {
          this.refs.musicAudioRef.load();
          this.refs.musicAudioRef.play();
        });

        setTimeout(() => {
          this.setState({
            logoClassSubfixName: 'static',
          })
        }, 1000);
      }
    }
  }

  componentDidMount() {
    this.refs.musicAudioRef.addEventListener("ended", this.forceMusicChange({ ignoreLoop: false }));
  }

  render() {
    const { musicId, musicLoopFlag, bgAudioVolume, musicAudioVolume } = this.state;

    return (
      <div className="App">
        <section className="App-header">
          <div
            className={`App-logo-${this.state.logoClassSubfixName}`}
            onClick={this.forceMusicChange({ ignoreLoop: true })}
          />
          <p>{CONSTANTS.title}</p>
          <div className="inputContainer">
            <label className="mr5" htmlFor="bgVolumeInput">雨声</label>
            <input
              id="bgVolumeInput"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={bgAudioVolume}
              onChange={this.setVolume('bgAudio')}
            />
          </div>
          <div className="inputContainer">
            <label className="mr5" htmlFor="musicVolumeInput">音乐</label>
            <input
              id="musicVolumeInput"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={musicAudioVolume}
              onChange={this.setVolume('musicAudio')}
            />
          </div>
          <div className="inputContainer">
            <label className="mr5" >{CONSTANTS.changeMusicTitle}</label>
            <select className="mr5" value={musicId} onChange={this.onSelectChange}>
              {CONSTANTS.musicStrList.split('').map((e, i) => {
                return (
                  <option key={i} val={i} >{i}</option>
                )
              })}
            </select>

            <span className="mr5">|</span>
          {/* </div>
          <div className="inputContainer"> */}
            <input
              type="checkbox"
              id="musicLoopInput"
              name="musicLoopInput"
              checked={musicLoopFlag}
              onChange={this.onLoopChange}
            />
            <label htmlFor="musicLoopInput">单曲循环</label>
          </div>

          <span>
            {CONSTANTS.description}
            <br />
            &nbsp;详见&nbsp;
            <a
              className="App-link"
              href={CONSTANTS.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </span>
        </section>

        <footer>
          <audio autoPlay ref="bgAudioRef" loop>
            <source src={process.env.PUBLIC_URL + "/music/main.m4a"} />
          </audio>

          <audio autoPlay ref="musicAudioRef">
            <source src={`${process.env.PUBLIC_URL}/music/${musicId}.${musicId === '5' ? 'm4a' : 'mp3'}`} />
          </audio>
        </footer>
      </div>
    );
  }
}

export default App;
