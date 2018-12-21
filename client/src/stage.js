import React from 'react';

import PopUp from './style/popup';
import Monitor from './style/monitor';
import CloseMonitorButton from './style/button/closeMonitorButton';

export default class Stage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      closePopup: false,
    }
    this.iframeElem;
  }

  static defaultProps = {
    code: '',
    closePopup: false,
    onLoad: ()=>{}
  }

  componentDidMount() {
    this.setState({
      closePopup: this.props.closePopup
    })

    // var ifrm = document.getElementById('stage').contentWindow;
    // ifrm.onload = function(){
    //   ifrm.postMessage("HELLO!", '*');
    // }
    // window.addEventListener('message', function(event) {
    // }, false);
  }

  componentDidUpdate(prevProps){
    if (prevProps.closePopup != this.props.closePopup){
      this.setState({
        closePopup: this.state.closePopup
      })
    }
  }

  createSrcDoc(closePopup, code) {
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
          if(${closePopup}) {
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
    const {closePopup, code} = this.props;
    const srcDoc = this.createSrcDoc(closePopup, code);
    return(
      <div>
        <PopUp>
          <Monitor id="stage" scrolling="no" srcDoc={srcDoc} onLoad={()=>{this.onLoadIframe()}} ref={(ref)=>this.iframeElem = ref} />
            <CloseMonitorButton onClick={this.props.closePopup}>stageを閉じる</CloseMonitorButton>
        </PopUp>
      </div>
    )
  }
}