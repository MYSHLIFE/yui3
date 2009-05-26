YUI.add("base-base",function(A){var J=A.Lang;function D(L){this._plugins={};}D.prototype={plug:function(S,L){if(S){if(J.isFunction(S)){this._plug(S,L);}else{if(J.isArray(S)){for(var O=0,R=S.length;O<R;O++){this.plug(S[O]);}}else{this._plug(S.fn,S.cfg);}}}return this;},unplug:function(O){if(O){this._unplug(O);}else{var L;for(L in this._plugins){if(this._plugins.hasOwnProperty(L)){this._unplug(L);}}}return this;},hasPlugin:function(L){return(this._plugins[L]&&this[L]);},_initPlugins:function(O){var S=this._getClasses(),L=[],T={},R,U,W,X,V;for(U=S.length-1;U>=0;U--){R=S[U];X=R._UNPLUG;if(X){A.mix(T,X,true);}W=R._PLUG;if(W){A.mix(L,W,true);}}for(V in L){if(L.hasOwnProperty(V)){if(!T[V]){this.plug(L[V]);}}}if(O&&O.plugins){this.plug(O.plugins);}},_destroyPlugins:function(){this._unplug();},_plug:function(R,L){if(R&&R.NS){var O=R.NS;L=L||{};L.host=this;if(this.hasPlugin(O)){this[O].setAttrs(L);}else{this[O]=new R(L);this._plugins[O]=R;}}},_unplug:function(R){var O=R,L=this._plugins;if(J.isFunction(R)){O=R.NS;if(O&&(!L[O]||L[O]!==R)){O=null;}}if(O){if(this[O]){this[O].destroy();delete this[O];}if(L[O]){delete L[O];}}}};D.plug=function(O,U,S){var V,T,L,R;if(O!==A.Base){O._PLUG=O._PLUG||{};if(!J.isArray(U)){if(S){U={fn:U,cfg:S};}U=[U];}for(T=0,L=U.length;T<L;T++){V=U[T];R=V.NAME||V.fn.NAME;O._PLUG[R]=V;}}};D.unplug=function(O,T){var U,S,L,R;if(O!==A.Base){O._UNPLUG=O._UNPLUG||{};if(!J.isArray(T)){T=[T];}for(S=0,L=T.length;S<L;S++){U=T[S];R=U.NAME;if(!O._PLUG[R]){O._UNPLUG[R]=U;}else{delete O._PLUG[R];}}}};A.namespace("Plugin").Host=D;var H=A.Object,I=".",F="destroy",P="init",N="initialized",G="destroyed",C="initializer",B=Object.prototype.constructor,K="deep",Q="shallow",M="destructor";function E(){A.Attribute.call(this);A.Plugin.Host.call(this);if(this._lazyAttrInit!==false){this._lazyAttrInit=true;}this.init.apply(this,arguments);}E.NAME="base";E.ATTRS={initialized:{readOnly:true,value:false},destroyed:{readOnly:true,value:false}};E.prototype={init:function(L){this._yuievt.config.prefix=this.name=this.constructor.NAME;this.publish(P,{queuable:false,defaultFn:this._defInitFn});if(L){if(L.on){this.on(L.on);}if(L.after){this.after(L.after);}}this.fire(P,{cfg:L});return this;},destroy:function(){this.publish(F,{queuable:false,defaultFn:this._defDestroyFn});this.fire(F);return this;},_defInitFn:function(L){this._initHierarchy(L.cfg);this._initPlugins(L.cfg);this._set(N,true);},_defDestroyFn:function(L){this._destroyHierarchy();this._destroyPlugins();this._set(G,true);},_getClasses:function(){if(!this._classes){this._initHierarchyData();}return this._classes;},_getAttrCfgs:function(){if(!this._attrs){this._initHierarchyData();}return this._attrs;},_filterAttrCfgs:function(R,L){var O={};if(R.ATTRS){A.each(R.ATTRS,function(T,S){if(L[S]){O[S]=L[S];delete L[S];}});}return O;},_initHierarchyData:function(){var R=this.constructor,O=[],L=[];while(R){O[O.length]=R;if(R.ATTRS){L[L.length]=R.ATTRS;}R=R.superclass?R.superclass.constructor:null;}this._classes=O;this._attrs=this._aggregateAttrs(L);},_aggregateAttrs:function(V){var S,W,R,L,X,O,U,T={};if(V){for(O=V.length-1;O>=0;--O){W=V[O];for(S in W){if(W.hasOwnProperty(S)){R=A.merge(W[S]);L=R.value;U=R.cloneDefaultValue;if(L){if((U===undefined&&(B===L.constructor||J.isArray(L)))||U===K||U===true){R.value=A.clone(L);}else{if(U===Q){R.value=A.merge(L);}}}X=null;if(S.indexOf(I)!==-1){X=S.split(I);S=X.shift();}if(X&&T[S]&&T[S].value){H.setValue(T[S].value,X,L);}else{if(!X){if(!T[S]){T[S]=R;}else{T[S]=A.mix(T[S],R,true);}}}}}}}return T;},_initHierarchy:function(U){var R=this._lazyAttrInit,V,W,X,S,O,T=this._getClasses(),L=this._getAttrCfgs();for(X=T.length-1;X>=0;X--){V=T[X];W=V.prototype;if(V._yuibuild&&V._yuibuild.exts&&!V._yuibuild.dynamic){for(S=0,O=V._yuibuild.exts.length;S<O;S++){V._yuibuild.exts[S].apply(this,arguments);}}this.addAttrs(this._filterAttrCfgs(V,L),U,R);if(W.hasOwnProperty(C)){W.initializer.apply(this,arguments);}}},_destroyHierarchy:function(){var T,O,S,L,R=this._getClasses();for(S=0,L=R.length;S<L;S++){T=R[S];O=T.prototype;if(O.hasOwnProperty(M)){O.destructor.apply(this,arguments);}}},toString:function(){return this.constructor.NAME+"["+A.stamp(this)+"]";}};A.mix(E,A.Attribute,false,null,1);A.mix(E,D,false,null,1);E.plug=D.plug;E.unplug=D.unplug;E.prototype.constructor=E;A.Base=E;},"@VERSION@",{requires:["attribute"]});