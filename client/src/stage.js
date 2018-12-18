import React from 'react';

import PopUp from './style/popup';
import Monitor from './style/monitor';
import {ShowCodeButton, RunCodeButton, CloseMonitorButton} from './style/button';

export default class Stage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isRun: false,
    }
    this.iframeElem;
  }

  static defaultProps = {
    code: '',
    isRun: false,
    onLoad: ()=>{}
  }

  componentDidMount() {
    this.setState({
      isRun: this.props.isRun
    })

    // var ifrm = document.getElementById('stage').contentWindow;
    // ifrm.onload = function(){
    //   ifrm.postMessage("HELLO!", '*');
    // }
    // window.addEventListener('message', function(event) {
    // }, false);
  }

  componentDidUpdate(prevProps){
    if (prevProps.isRun != this.props.isRun){
      this.setState({
        isRun: this.state.isRun
      })
    }
  }

  createSrcDoc(isRun, code) {
    const doc = `<!DOCTYPE html>
    <html>
      <head>
        <title>canvas</title>
      </head>
      <body style="margin:0;padding:0">
        <script>
          // window.addEventListener('message', function(event) {
          //   event.source.postMessage('test', event.origin);
          // }, false);
          if(${isRun}) {
            ${code}
          }
        </script>
        <div id="pixiview"></div>
        <script src="vendor/pixi/pixi.min.js"></script>
        <script src="src/canvas.js"></script>
      </body>
    </html>`;
    return doc;
  }

  onLoadIframe() {
    this.props.onLoad();
  }

  render(){
    const {isRun, code} = this.props;
    const srcDoc = this.createSrcDoc(isRun, code);
    return(
      <div>
        <PopUp>
          <Monitor id="stage" scrolling="no" srcDoc={srcDoc} onLoad={()=>{this.onLoadIframe()}} ref={(ref)=>this.iframeElem = ref} />
            <CloseMonitorButton onClick={this.props.isRun}>stageを閉じる</CloseMonitorButton>
        </PopUp>
      </div>
    )
  }
}