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
!function(){function t(){var t,o,n;t="string"==typeof this.options.content?this.options.content:this.options.content.innerHTML,this.options.html||(t=e(t)),n=document.createDocumentFragment(),this.modal=document.createElement("div"),this.modal.className="kaboom-modal "+this.options.className,this.options.closeButton===!0&&(this.closeButton=document.createElement("button"),this.closeButton.className="kaboom-close close-button",this.closeButton.innerHTML="&times;",this.modal.appendChild(this.closeButton)),this.options.overlay===!0&&(this.overlay=document.createElement("div"),this.overlay.className="kaboom-overlay "+this.options.className,n.appendChild(this.overlay)),o=document.createElement("div"),o.className="kaboom-content",o.innerHTML=t,this.modal.appendChild(o),n.appendChild(this.modal),document.body.appendChild(n)}function o(t,o){var e;for(e in o)o.hasOwnProperty(e)&&(t[e]=o[e]);return t}function e(t){return t.replace(new RegExp("<","g"),"&lt;")}function n(){this.closeButton&&this.closeButton.addEventListener("click",this.close.bind(this)),this.overlay&&this.overlay.addEventListener("click",this.close.bind(this))}function s(){var t=document.createElement("div");return t.style.WebkitTransition?"webkitTransitionEnd":t.style.OTransition?"oTransitionEnd":"transitionend"}this.kaboom=function(){this.closeButton=null,this.modal=null,this.overlay=null,this.transitionEnd=s();var t={autoOpen:!1,className:"fade-and-drop",closeButton:!0,content:"",maxWidth:600,minWidth:280,overlay:!0,html:!0,escToClose:!1,onclose:!1,onopen:!1};arguments[0]&&"object"==typeof arguments[0]?this.options=o(t,arguments[0]):"string"==typeof arguments[0]&&""!==arguments[0]&&(this.options=o(t,{content:arguments[0]})),this.options.autoOpen===!0&&this.open()},kaboom.prototype.close=function(){this.options.onclose!==!1&&"function"==typeof this.options.onclose&&this.options.onclose();var t=this;this.modal.className=this.modal.className.replace(" kaboom-open",""),this.overlay.className=this.overlay.className.replace(" kaboom-open",""),this.modal.addEventListener(this.transitionEnd,function(){t.modal.parentNode.removeChild(t.modal)}),this.overlay.addEventListener(this.transitionEnd,function(){t.overlay.parentNode&&t.overlay.parentNode.removeChild(t.overlay)})},kaboom.prototype.open=function(){t.call(this),n.call(this),window.getComputedStyle(this.modal).height,this.modal.className=this.modal.className+(this.modal.offsetHeight>window.innerHeight?" kaboom-open kaboom-anchored":" kaboom-open"),this.overlay.className=this.overlay.className+" kaboom-open",this.options.onopen!==!1&&"function"==typeof this.options.onopen&&this.options.onopen()}}();
