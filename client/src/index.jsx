
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
      style:
        {height: 480, width: 600, float: "right"},
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
            <body>
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
              <script>
                var stage = new PIXI.Container();
                var renderer = PIXI.autoDetectRenderer(500, 500);
                document.body.appendChild(renderer.view);
                PIXI.loader
                  .add("coffee", "https://dl.dropboxusercontent.com/u/139992952/coffee.png")
                  .load(setup);
                var block;
                
                function setup() {
                  block = new PIXI.Sprite(PIXI.loader.resources.coffee.texture);  
                  block.anchor.x = 0.5;
                  block.anchor.y = 0.61;
                
                  block.position.x = 200;
                  block.position.y = 150;
                  stage.addChild(block);
                  renderer.render(stage);
                  console.log("rendered");
                  theloop();
                }
                
                var theloop = function(){
                  requestAnimationFrame(theloop);
                  block.rotation += .03;
                  renderer.render(stage);
                };
              </script>
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
