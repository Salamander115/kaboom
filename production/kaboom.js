/*\

Copyright (c) 2015 Michael Longhurst

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

\*/


(function() {

  this.kaboom = function() {

    this.closeButton = null;
    this.modal = null;
    this.overlay = null;

    this.transitionEnd = transitionSelect();

    var defaults = {
      autoOpen      :  false,
      className     :  'fade-and-drop',
      closeButton   :  true,
      content       :  '',
      maxWidth      :  600,
      minWidth      :  280,
      overlay       :  true,
	  html          :  true,
	  escToClose    :  false,  // Not in use at the moment ( In development )
	  onclose       :  false,
	  onopen        :  false
    }

    if (arguments[0] && typeof arguments[0] === "object") {
		this.options = extendObj(defaults, arguments[0]);
    } else if (typeof arguments[0] === 'string' && arguments[0] !== '') {
		this.options = extendObj(defaults, {content: arguments[0]});
	}

    if(this.options.autoOpen === true) this.open();
	
  }


  kaboom.prototype.close = function() {
	if ( this.options.onclose !== false && typeof this.options.onclose === "function" ) {
		this.options.onclose();
	}
	
    var _ = this;
    this.modal.className = this.modal.className.replace(" kaboom-open", "");
    this.overlay.className = this.overlay.className.replace(" kaboom-open", "");
    this.modal.addEventListener(this.transitionEnd, function() {
      _.modal.parentNode.removeChild(_.modal);
    });
    this.overlay.addEventListener(this.transitionEnd, function() {
      if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
    });
  }

  kaboom.prototype.open = function() {
    buildOut.call(this);
    initializeEvents.call(this);
    window.getComputedStyle(this.modal).height;
    this.modal.className = this.modal.className +
      (this.modal.offsetHeight > window.innerHeight ?
        " kaboom-open kaboom-anchored" : " kaboom-open");
    this.overlay.className = this.overlay.className + " kaboom-open";
	
	if ( this.options.onopen !== false && typeof this.options.onopen === "function" ) {
		this.options.onopen();
	}
  }

  
  function buildOut() {

    var content, contentHolder, docFrag;

	
    if (typeof this.options.content === "string") {
	  content = this.options.content;
    }
	else {
      content = this.options.content.innerHTML;
    }
	
	if ( !this.options.html ) {content = sanitizeHTML( content );}

    docFrag = document.createDocumentFragment();

    this.modal = document.createElement("div");
    this.modal.className = "kaboom-modal " + this.options.className;

    if (this.options.closeButton === true) {
      this.closeButton = document.createElement("button");
      this.closeButton.className = "kaboom-close close-button";
      this.closeButton.innerHTML = "&times;";
      this.modal.appendChild(this.closeButton);
    }

    if (this.options.overlay === true) {
      this.overlay = document.createElement("div");
      this.overlay.className = "kaboom-overlay " + this.options.className;
      docFrag.appendChild(this.overlay);
    }

    contentHolder = document.createElement("div");
    contentHolder.className = "kaboom-content";
    contentHolder.innerHTML = content;
    this.modal.appendChild(contentHolder);

    docFrag.appendChild(this.modal);

    document.body.appendChild(docFrag);

  }

  function extendObj(n,r){var e;for(e in r)r.hasOwnProperty(e)&&(n[e]=r[e]);return n}

  function sanitizeHTML(str){return str.replace( new RegExp( '<', 'g' ), '&lt;' )}
  
  function initializeEvents() {

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', this.close.bind(this));
    }

  }

  function transitionSelect() {
    var el = document.createElement("div");
    if (el.style.WebkitTransition) return "webkitTransitionEnd";
    if (el.style.OTransition) return "oTransitionEnd";
    return 'transitionend';
  }

}());
