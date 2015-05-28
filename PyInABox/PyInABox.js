// import Nevow.Athena
// import Divmod.Runtime


function handleEvent(self){
    return function(event) {
        var evtType = event.type;
        var eWhich = event.which;
        var echarCode = event.charCode;
        var ekeyCode = event.keyCode;
        console.log(23, ekeyCode, eWhich, echarCode);
        switch (evtType) {
            case 'keypress':
                if (eWhich){
                  self.callRemote('Process',event.which);
                }
                else {
                  self.callRemote("Meta",event.keyCode);
                }
                return false;
            case 'keyup':
                
                if (event.keyCode in [8, 37, 39, 38, 40, 9, 27, 46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 18, 35, 45, 34, 33, 18, 17, 20, 18, 19]){
                  self.callRemote("keyUp", ekeyCode);
                }
                break;
            case 'keydown':
                
                if (ekeyCode in [8, 37, 39, 38, 40, 9, 27, 46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 18, 35, 45, 34, 33, 18, 17, 20, 18, 19]){
                  self.callRemote("keyDown", ekeyCode);
                }
                break;
            default:
                break;
        }
    }
};

pyinabox = Nevow.Athena.Widget.subclass("pyinabox");
pyinabox.methods(
    function __init__(self, node){
        pyinabox.upcall(self, '__init__', node);
        var e = document.createElement('div');
        e.id='editor';
        self.nodeById('shell').appendChild(e);
        console.log($("#editor"));
        //$("#editor").bind("keypress keyup keydown", handleEvent(self));
            
        
        editor = self.editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/batchfile");
        self.session=editor.getSession();
        editor.$blockScrolling = Infinity
        
        $(".ace_text-input").bind("keypress keyup keydown", handleEvent(self));
        
        
        //
    },

    function textUpdate(self, node){
        
      if (event.which){
            self.callRemote('Process',event.which);
      }
      else {
          self.callRemote("Meta",event.keyCode);
      }
        return false;
    },
    function keyPress(self, node){
        alert(31);
    },
    function keyDown(self, node){
        alert(34);
      if (event.keyCode in [37, 39, 38, 40, 9, 27, 46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 18, 35, 45, 34, 33, 18, 17, 20, 18, 19]){
        self.callRemote("keyDown", event.keyCode);
      }
    },
    function keyUp(self, node){
        alert(40, event.keyCode);
      if (event.keyCode in [37, 39, 38, 40, 9, 27, 46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 18, 35, 45, 34, 33, 18, 17, 20, 18, 19]){
        self.callRemote("keyUp", event.keyCode);
      }
    },
    function Refresh(self, retval, cpos){
        //document.getElementById('ace_editor.css').innerHTML=document.getElementById('ace_editor.css').innerHTML.replace('.ace_','#ace_');
        self.session.setValue(retval);
        self.editor.moveCursorTo(cpos[1],cpos[0]);
        //self.nodeById('shell').value=retval;
        //self.nodeById('shell').scrollTop = self.nodeById('shell').scrollHeight;
        
    },
    function paste(self, text){
      for (i in window.prompt("Paste here:")){
        self.callRemote('Process',i.charCodeAt(0));
      }
    }
    );


