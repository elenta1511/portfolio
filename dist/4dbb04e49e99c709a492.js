(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{425:function(t,n,e){},446:function(t,n,e){"use strict";var r=e(425);e.n(r).a},467:function(t,n,e){"use strict";e.r(n);var r=function(){var t=this.$createElement,n=this._self._c||t;return n("ul",{staticClass:"work-blocks__list"},[n("li",{staticClass:"work-blocks__item--new-blocks"},[n("button",{staticClass:"btn btn_add-blocks",attrs:{type:"button"},on:{click:this.showFormAndEditModeOff}},[n("span",{staticClass:"btn__blocks-icon"},[this._v("+")]),n("span",{staticClass:"btn__blocks-title"},[this._v("Добавить работу")])])]),this._l(this.works,function(t){return n("li",{key:t.id,staticClass:"work-blocks__item"},[n("WorkBlock",{attrs:{work:t}})],1)})],2)};r._withStripped=!0;var o=e(130);function s(t,n,e,r,o,s,c){try{var i=t[s](c),a=i.value}catch(t){return void e(t)}i.done?n(a):Promise.resolve(a).then(r,o)}function c(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){i(t,n,e[n])})}return t}function i(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var a={props:{},components:{WorkBlock:function(){return e.e(19).then(e.bind(null,471))}},data:function(){return{}},computed:c({},Object(o.d)("works",{works:function(t){return t.works}})),methods:c({},Object(o.b)("works",["fetchWorks"]),Object(o.c)("works",["SHOW_FORM","TURN_EDIT_MODE_OFF"]),{showFormAndEditModeOff:function(){this.TURN_EDIT_MODE_OFF(),this.SHOW_FORM()}}),created:function(){var t,n=(t=regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:try{this.fetchWorks()}catch(t){}case 1:case"end":return t.stop()}},t,this)}),function(){var n=this,e=arguments;return new Promise(function(r,o){var c=t.apply(n,e);function i(t){s(c,r,o,i,a,"next",t)}function a(t){s(c,r,o,i,a,"throw",t)}i(void 0)})});return function(){return n.apply(this,arguments)}}()},u=(e(446),e(94)),l=Object(u.a)(a,r,[],!1,null,"1dedff56",null);l.options.__file="src/admin/components/works/work-blocks.vue";n.default=l.exports}}]);