(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{432:function(t,e,o){},453:function(t,e,o){"use strict";var r=o(432);o.n(r).a},471:function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"work-block"},[o("div",{staticClass:"work-block__header"},[o("img",{staticClass:"work-block__img",attrs:{src:t.remotePhotoPath,alt:"Превью работы"}}),o("div",{staticClass:"work-block__tags"},[o("WorkTags",{attrs:{tags:t.tagsArray}})],1)]),o("div",{staticClass:"work-block__content"},[o("div",{staticClass:"work-block__text-content"},[o("h3",{staticClass:"work-block__title"},[t._v(t._s(t.work.title))]),o("div",{staticClass:"work-block__desc"},[o("p",[t._v(t._s(t.work.description))])]),o("a",{staticClass:"work-block__link",attrs:{href:t.work.link}},[t._v(t._s(t.work.link))])]),o("div",{staticClass:"work-block__btns"},[o("button",{staticClass:"btn btn-block_edit",attrs:{type:"button"},on:{click:t.editWork}},[t._v("Править"),o("div",{staticClass:"icon-edit"})]),o("button",{staticClass:"btn btn-block_remove",attrs:{type:"button"},on:{click:t.remove}},[t._v("Удалить"),o("div",{staticClass:"icon-remove"})])])])])};r._withStripped=!0;var n=o(130);function s(t,e,o,r,n,s,i){try{var c=t[s](i),a=c.value}catch(t){return void o(t)}c.done?e(a):Promise.resolve(a).then(r,n)}function i(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var c={components:{WorkTags:function(){return o.e(22).then(o.bind(null,465))}},props:{work:Object},data:function(){return{}},computed:{remotePhotoPath:function(){return"https://webdev-api.loftschool.com".concat("/",this.work.photo)},tagsArray:function(){return this.work.techs.split(",")}},methods:function(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{},r=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(o).filter(function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable}))),r.forEach(function(e){i(t,e,o[e])})}return t}({},Object(n.b)("works",["removeWork"]),Object(n.c)("works",["SHOW_FORM","TURN_EDIT_MODE_ON","SET_EDITED_WORK"]),Object(n.c)("tooltip",["SHOW_TOOLTIP"]),{remove:function(){var t,e=(t=regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.removeWork(this.work.id);case 3:this.SHOW_TOOLTIP({type:"success",text:"Работа удалена"}),t.next=10;break;case 6:t.prev=6,t.t0=t.catch(0),console.error(t.t0.message),this.SHOW_TOOLTIP({type:"error",text:"Произошла ошибка"});case 10:case"end":return t.stop()}},t,this,[[0,6]])}),function(){var e=this,o=arguments;return new Promise(function(r,n){var i=t.apply(e,o);function c(t){s(i,r,n,c,a,"next",t)}function a(t){s(i,r,n,c,a,"throw",t)}c(void 0)})});return function(){return e.apply(this,arguments)}}(),showFormAndTurnEditModeOn:function(){this.TURN_EDIT_MODE_ON(this.work),this.SHOW_FORM()},setEditedWork:function(){this.SET_EDITED_WORK(this.work)},editWork:function(){this.setEditedWork(),this.showFormAndTurnEditModeOn()}})},a=(o(453),o(94)),l=Object(a.a)(c,r,[],!1,null,null,null);l.options.__file="src/admin/components/works/work-block.vue";e.default=l.exports}}]);