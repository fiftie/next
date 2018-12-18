
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
// import Routes from 'Routes';
// import reducer from 'reducer';

import BlocklyEditor from './editor';
import {ShowCodeButton, RunCodeButton} from './style/button';
import Canvas from './style/iframe';


class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      isRunCode: false
    };
    this.handleShowCode = this.handleShowCode.bind(this);
  }
  componentDidMount(){
    this.blocklyEditor = new BlocklyEditor();
    this.blocklyEditor.createEditor();

    var ifrm = document.getElementById('canvas').contentWindow;
    ifrm.onload = function(){
      ifrm.postMessage("HELLO!", '*');
    }
    window.addEventListener('message', function(event) {
    }, false);
  }

  handleShowCode() {
    this.setState({code: this.blocklyEditor.getCode()});
  }

  handleRunCode() {
    this.setState({code: this.blocklyEditor.getCode()});
    this.setState({isRunCode: true});
  }

  handleCanvasOnLoad() {
    this.setState({isRunCode: false});
  }

  render() {
    return (
      <div className="editor">
        <div id="blocklyDiv"></div>
        <Canvas id="canvas" onLoad={() => this.handleCanvasOnLoad()} srcDoc={
          `<!DOCTYPE html>
          <html>
            <head>
              <title>canvas</title>
            </head>
            <body style="margin:0;padding:0">
              <script>
                window.addEventListener('message', function(event) {
                  event.source.postMessage('test', event.origin);
                }, false);
                function runCode() {
                  var element = document.createElement('script');
                  element.innerHTML = \``+this.state.code+`\`;
                  var objBody = document.getElementsByTagName("body").item(0);
                  objBody.appendChild(element);
                }
                if(`+this.state.isRunCode+`) {
                  runCode();
                }
              </script>
              <div id="pixiview"></div>
              <script src="vendor/pixi/pixi.min.js"></script>
              <script src="src/canvas.js"></script>
            </body>
          </html>`
        }></Canvas>
        <div className="button">
          <ShowCodeButton onClick={() => this.handleShowCode()}>jsを表示</ShowCodeButton>
          <RunCodeButton onClick={() => this.handleRunCode()}>jsを実行</RunCodeButton>
        </div>
        <pre>{this.state.code}</pre>
      </div>
    );
  }
}

ReactDOM.render(
  <Editor />,
  document.getElementById('root')
);
