"use strict";exports.InterceptorManager=class{constructor(){this.handlers=[]}use(e,s){return this.handlers.push({fulfilled:e,rejected:s}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}forEach(e,s=!1){if(s)for(let h=this.handlers.length-1;h>=0;h--)null!==this.handlers[h]&&e(this.handlers[h]);else for(let h=0,l=this.handlers.length;h<l;h++)null!==this.handlers[h]&&e(this.handlers[h])}};