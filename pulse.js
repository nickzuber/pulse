/*! Pulse v1.1.0
 // alpha version 1.0
 // MIT Licensed http://opensource.org/licenses/MIT
 */

(function(funcName, baseObj) {
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }
    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }
    baseObj[funcName] = function(callback, context) {
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            readyList.push({fn: callback, ctx: context});
        }
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    };
})("docReady", window);
(function(){

    var pulse = function queue(d){
      this.bag = [];
      this.delay = d||0;
    };

    pulse.ready = function(fn){
      docReady(fn, window);
    };

    pulse.prototype.push = function push(action){
      if(typeof action === 'function'){
        function loader(){
          return function(callback){
            action();
            callback();
          }
        }
        this.bag.push(loader);
        return;
      }
      console.error('Error: Only functions can be pushed into queues. \''+action+'\' was ignored.');
    };

    /*
     * The callback function for the current 
     */

    pulse.prototype.dispatch = function dispatch(_callback, flipOrder){
      typeof _callback==='undefined'||_callback===null?_callback=true:0;
      typeof flipOrder==='undefined'||flipOrder===null?flipOrder=false:0;
      flipOrder?this.bag.reverse():0;
      if(this.bag.length<=0){
        console.warn('Warning: There are no elements in the queue to dispatch.');
        return false;
      }
      var obj = this;
      var execute = function(){
        setTimeout(function(){
          obj.bag[0]()(function(){
            obj.bag.shift();
            if(obj.bag.length<=0){
              console.warn('Finished executing dispatch.');
              if(typeof _callback === 'function')
                return _callback();
              else
                return _callback;
            }else{
              execute();
            }
          });
          
        }, obj.delay);
      }
      this.bag.length>0?execute():0;
    };

    // Push pulse onto the global scope
    window.pulse = pulse;
    return pulse;

})();
