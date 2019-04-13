import React, { Component } from 'react';
import './App.css';

const NUMBER_CONST = '0123456789';
const REPO_GITHUB = "https://github.com/hijiangtao/rainmood";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={process.env.PUBLIC_URL + '/favicon.png'} className="App-logo" alt="logo" />
          <p>
            倾听 专注  
          </p>
          <span style={{
            color: '#666',
            fontSize: '0.8rem',
          }}>
            循环播放十首电影原声精选，背景乐为下雨声。
            <br/>
            详见&nbsp;
            <a
              className="App-link"
              href={REPO_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </span>
        </header>

        <footer>
          <audio autoPlay loop>
            <source src={process.env.PUBLIC_URL + "/music/main.m4a"} />
          </audio>

          <audio autoPlay loop>
            {NUMBER_CONST.split('').map((e, i) => {
              return (
                <source key={i} alt={`music-${i}`} src={`${process.env.PUBLIC_URL}/music/${i}.mp3`} />
              )
            })}  
          </audio>
        </footer>
      </div>
    );
  }
}

export default App;
