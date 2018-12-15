
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
      code: ""
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
    //this.setState({code: this.blocklyEditor.getCode()});
    this.state.code = "";
    this.forceUpdate()
    this.setState({code : this.blocklyEditor.getCode()});
  }

  render() {
    return (
      <div className="editor">
        <div id="blocklyDiv"></div>
        <Canvas id="canvas" srcDoc={
          `<!DOCTYPE html>
          <html>
            <head>
              <title>canvas</title>
            </head>
            <body>
              <p>Hello, world!</p>
              <script>
                window.addEventListener('message', function(event) {
                  event.source.postMessage('test', event.origin);
                }, false);
              </script>
              <script>`+this.state.code+`</script>
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
