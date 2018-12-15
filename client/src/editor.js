export default class BlocklyEditor {
  constructor(){
    this.workspace;
  }

  createEditor(){
    this.workspace = Blockly.inject(
      'blocklyDiv',
      {
        toolbox: document.getElementById('toolbox'),
        trashcan: true,
      },
    );
    var blocklyDiv = document.getElementById('blocklyDiv');
    var onresize = function(e) {
      blocklyDiv.style.width = 800 + 'px';
      blocklyDiv.style.height = 800 + 'px';
      blocklyDiv.style.float = "right";
    };
    window.addEventListener('resize', onresize, false);
    onresize();
    Blockly.svgResize(this.workspace);  
  }

  getCode() {
    var code = Blockly.JavaScript.workspaceToCode(this.workspace);
    return code;
  }
}