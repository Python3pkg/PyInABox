// import Nevow.Athena
// import Divmod.Runtime

pyinabox = Nevow.Athena.Widget.subclass("pyinabox");
pyinabox.methods(
    function setCaretPosition(self, elem, caretPos, txt) {
        if(elem != null) {
            ptr = 0;
            while (ptr < txt.length && (caretPos[1] > 60 || caretPos[0] > 0)) {
                if (txt[ptr] == '\n'){
                    caretPos[1] -= 1;
                }
                if (caretPos[1] == 60){
                    caretPos[0] -= 1;
                }
                ptr ++;
            }
            ptr++;
            caretPos = ptr;
            if(elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else {
                if(elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                }
                else
                    elem.focus();
            }
        }
    },

    /**
     * Handle click events on any of the calculator buttons.
     */

    function textUpdate(self, node){
      if (window.EVENT.which){
            self.callRemote('Process',window.EVENT.which);
      }
      else {
          self.callRemote("Meta",window.EVENT.keyCode);
      }
        return false;
    },
    function keyDown(self, node){
      if (window.EVENT.keyCode in [37, 39, 38, 40, 9, 27, 46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 18, 35, 45, 34, 33, 18, 17, 20, 18, 19]){
        self.callRemote("keyDown", window.EVENT.keyCode);
      }
    },
    function keyUp(self, node){
      if (window.EVENT.keyCode in [37, 39, 38, 40, 9, 27, 46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 18, 35, 45, 34, 33, 18, 17, 20, 18, 19]){
        self.callRemote("keyUp", window.EVENT.keyCode);
      }
    },
    function Refresh(self, retval, cpos){
        self.nodeById('shell').value=retval;
        self.nodeById('shell').scrollTop = self.nodeById('shell').scrollHeight;
        self.setCaretPosition(self.nodeById('shell'), cpos, retval);
    },
    function paste(self, text){
      for (i in window.prompt("Paste here:")){
        self.callRemote('Process',i.charCodeAt(0));
      }
    }
    );


