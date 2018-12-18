
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
// import Routes from 'Routes';
// import reducer from 'reducer';

import BlocklyEditor from './editor';
import {ShowCodeButton, RunCodeButton, CloseMonitorButton} from './style/button';
import Stage from './stage';


class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      isShowPopup: false
    };
    this.handleShowCode = this.handleShowCode.bind(this);
  }
  componentDidMount(){
    this.blocklyEditor = new BlocklyEditor();
    this.blocklyEditor.createEditor();
  }

  handleShowCode() {
    this.setState({code: this.blocklyEditor.getCode()});
  }

  handleRunCode() {
    this.setState({code: this.blocklyEditor.getCode()});
    this.setState({isShowPopup: true});
  }

  togglePopup() {
    this.setState({isShowPopup: !this.state.isShowPopup});
  }

  render() {
    return (
      <div className="editor">
        <div id="blocklyDiv"></div>
        
        <div className="button">
          <ShowCodeButton onClick={() => this.handleShowCode()}>jsを表示</ShowCodeButton>
          <RunCodeButton onClick={() => this.togglePopup()}>stageを表示</RunCodeButton>
        </div>
        <pre>{this.state.code}</pre>
        {this.state.isShowPopup ?
          <div>
            <Stage isRun={() => this.togglePopup()} code={this.state.code} />
          </div>
          :null
        }
      </div>
    );
  }
}

ReactDOM.render(
  <Editor />,
  document.getElementById('root')
);
