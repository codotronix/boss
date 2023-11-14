"use strict";(self.webpackChunkboss=self.webpackChunkboss||[]).push([[684],{971:function(e,n,r){r.r(n);var i=r(166),t=r.n(i),a=r(250),o=r(413),s=r(885),l=r(434),c="Dock_root__3Ro3G",u="Dock_inner__hNqIr",d="Dock_scrollable_holder__syAwl",f=r(733),p="DockIcon_root__yRpG+",m="DockIcon_ico__-A3EI",h=r(982),v=r(572),_=r(829),I="app_display_type_window",g={appsviewer:{appId:"appsviewer",name:"Apps",iconClass:"fa-solid fa-cubes-stacked",docked:!0,displayType:I,allowedInstances:1,keywords:["apps","all apps"]},folders:{appId:"folders",name:"Folders",iconClass:"fa-regular fa-folder-open",docked:!0,displayType:I,keywords:["finder","files","folders","explorer"]},settings:{appId:"settings",name:"Settings",iconClass:"fa-solid fa-gear",docked:!0,allowedInstances:1},welcomeapp:{appId:"welcomeapp",name:"Welcome",iconClass:"fa-solid fa-face-smile",displayType:I},bcalc:{appId:"bcalc",name:"B-Calc",iconClass:"fa-solid fa-calculator",displayType:I,keywords:["bcalc","calc","calculator","math"]},terminal:{appId:"terminal",name:"Terminal",iconClass:"fa-solid fa-terminal",docked:!0,displayType:I,keywords:["terminal","cmd","command line","command-line","dos","emulator","shell"]},timer:{appId:"timer",name:"Timer",iconClass:"fa-solid fa-stopwatch-20",displayType:I},bin:{appId:"bin",name:"Bin",iconClass:"fa-solid fa-trash",docked:!0,displayType:I},bnotes:{appId:"bnotes",name:"B-Notes",iconClass:"fa-solid fa-file-lines",displayType:I},bchat:{appId:"bchat",name:"B-Chat",iconClass:"fa-solid fa-comments",displayType:I},calendars:{appId:"calendars",name:"Calendar",iconClass:"fa-regular fa-calendar-days",displayType:I}},x={DEFAULT:"default_window",MAXIMIZED:"maxized_window",MINIMIZED:"minimized_window"},w=1,j=(0,_.oM)({name:"runtime",initialState:{1:{appId:"RUNTIME",runtimeId:1,crucial:!0}},reducers:{runApp:function(e,n){var r=n.payload,i=r.appId,t=r.args,a=Object.values(e).filter((function(e){return e.appId===i})).length,s=g[i],l=s.allowedInstances;if(0===a||!l||l>a){var c=++w,u={appId:i,runtimeId:c,args:t,zIndex:M(e)+1};return s.displayType===I&&(u.winSize=x.DEFAULT),(0,o.Z)((0,o.Z)({},e),{},(0,v.Z)({},c,u))}if(1===l){for(var d=null,f=0,p=Object.values(e);f<p.length;f++){var m=p[f];if(m.appId===i){d=m;break}}d&&d.winSize===x.MINIMIZED&&(d.winSize=x.MAXIMIZED)}return e},terminateApp:function(e,n){var r=n.payload;if(e[r]&&!e[r].crucial){var i=(0,o.Z)({},e);return delete i[r],i}return e},mizeApp:function(e,n){var r=n.payload,i=r.runtimeId,t=r.winSize,a=e[i];if(g[a.appId].displayType===I&&Object.values(x).includes(t)){var s=(0,o.Z)((0,o.Z)({},a),{},{winSize:t});return(0,o.Z)((0,o.Z)({},e),{},(0,v.Z)({},i,s))}return e},raiseWindow:function(e,n){var r=n.payload;r in e&&(e[r].zIndex=M(e)+1)}}}),Z=j.actions,y=Z.runApp,N=Z.terminateApp,b=Z.mizeApp,D=Z.raiseWindow,F=j.reducer;function M(e){return Math.max.apply(Math,(0,h.Z)(Object.values(e).map((function(e){return e.zIndex||0}))))}var S=function(){var e=(0,l.I0)(),n=(0,l.v9)((function(e){return e.procs}));return{run:function(n){for(var r=arguments.length,i=new Array(r>1?r-1:0),t=1;t<r;t++)i[t-1]=arguments[t];return e(y({appId:n,args:i}))},terminate:function(n){return e(N(n))},mize:function(n,r){return e(b({runtimeId:n,winSize:r}))},raiseWindow:function(n){return e(D(n))},getMaxZIndex:function(){return M(n)}}},A=r(184),C=function(e){var n=e.appId,r=e.name,i=e.iconClass,t=S();return(0,A.jsx)("button",{type:"button",className:p,onClick:function(){return t.run(n)},title:r,children:(0,A.jsx)("i",{className:(0,f.Z)(i,m)})})},E="MinimizedAppsViewer_root__tchYL",z="MinimizedAppsViewer_minimizeCount__J9StM",T="MinimizedAppsList_root__c1PLn",k="MinimizedAppsList_inner__eFQML",W="MinimizedAppsList_appName__1yts9",L="MinimizedAppsList_closeIco__FRP7q",O=function(e){var n=e.visible,r=e.setVisible,i=e.minimizedApps,t=S();return(0,A.jsx)("div",{className:(0,f.Z)(T,!n&&"hidden"),children:(0,A.jsxs)("ul",{className:k,children:[(!i||0===i.length)&&(0,A.jsx)("li",{className:"p-10",children:"No minimized apps"}),i&&i.map((function(e){return(0,A.jsxs)("li",{children:[(0,A.jsx)("span",{className:W,onClick:function(){return n=e.runtimeId,r(!1),t.mize(n,x.MAXIMIZED),void t.raiseWindow(n);var n},children:g[e.appId].name}),(0,A.jsx)("i",{className:(0,f.Z)("fa-solid fa-xmark",L),title:"Close App",onClick:function(){return n=e.runtimeId,void t.terminate(n);var n}})]},e.runtimeId)}))]})})},R=function(e){var n=(0,i.useState)(!1),r=(0,s.Z)(n,2),t=r[0],a=r[1],o=(0,l.v9)((function(e){return e.procs})),c=Object.values(o).filter((function(e){return e.winSize===x.MINIMIZED}));return(0,A.jsxs)("div",{className:E,children:[(0,A.jsx)(O,{visible:t,setVisible:a,minimizedApps:c}),(0,A.jsxs)("div",{className:p,children:[c.length>0&&(0,A.jsx)("span",{className:z,children:c.length}),(0,A.jsx)("button",{type:"button",className:p,title:"toggle minimized apps",onClick:function(){return a(!t)},children:(0,A.jsx)("i",{className:(0,f.Z)("fa-solid fa-bars",m)})})]})]})},B=function(e){var n=(0,i.useState)(1),r=(0,s.Z)(n,2),t=r[0],a=r[1],f=(0,l.v9)((function(e){return e.apps})),p=Object.values(f).filter((function(e){return e.docked})),m=S();return(0,A.jsx)("div",{id:"thedock",className:c,style:{zIndex:t},onClick:function(){a(m.getMaxZIndex()+1)},children:(0,A.jsxs)("div",{className:u,children:[(0,A.jsx)("div",{className:d,children:p&&p.map((function(e){return(0,A.jsx)(C,(0,o.Z)({},e),e.appId)}))}),(0,A.jsx)(R,{})]})})},X="WelcomeApp_root__e1Te1",P={root:"WinFrame_root__7I0Xk",bar:"WinFrame_bar__kl8w-",namebar:"WinFrame_namebar__bhez0",btns:"WinFrame_btns__-rDlS",dragIco:"WinFrame_dragIco__Dr0BW",mizeBtn:"WinFrame_mizeBtn__YwPof",menubar:"WinFrame_menubar__F+ov1",menu:"WinFrame_menu__XVTtb",menuName:"WinFrame_menuName__wE-S3",subMenu:"WinFrame_subMenu__lhnTZ",visible:"WinFrame_visible__D0Kcn",body:"WinFrame_body__RPv4g",loadingComp:"WinFrame_loadingComp__ZRBu7",repositionHandle:"WinFrame_repositionHandle__HI2Yn"};var V=function(e){var n=(0,i.useState)({leftDiff:0,topDiff:0}),r=(0,s.Z)(n,2),t=r[0],a=r[1],o=(0,i.useRef)(null);return{posDiff:t,onDragStart:function(n,r,i){if(o.current={left:n,top:r},e){var t=n-parseInt(e.style.left);i.dataTransfer.setDragImage(e,t,0)}},onDrag:function(e,n){if(0!==e||0!==n){if(o.current){var r=e-o.current.left,i=n-o.current.top;a({leftDiff:r,topDiff:i})}o.current={left:e,top:n}}},onDragEnd:function(e,n){o.current=null}}},H=function(e){var n=e.menu,r=e.handleMenuCommand,t=(0,i.useState)(""),a=(0,s.Z)(t,2),o=a[0],l=a[1];return(0,A.jsx)("div",{className:(0,f.Z)(P.bar,P.menubar),children:n&&Object.keys(n).map((function(e){return(0,A.jsxs)("div",{className:(0,f.Z)(P.menu,o===e&&P.visible),children:[(0,A.jsx)("span",{className:P.menuName,onClick:function(){var n;l(o===(n=e)?"":n)},children:e}),(0,A.jsx)("ul",{className:P.subMenu,children:Object.values(n[e]).map((function(e){return(0,A.jsx)("li",{onClick:function(){return r(e.command)},children:e.name},e.command)}))})]},e)}))})},U="new_window",Y="close_window",G={File:{1:{name:"New Window",command:U},100:{name:"Close Window",command:Y}}},J=function(e){var n=e.appName;return(0,A.jsxs)("div",{className:P.loadingComp,children:[n||"The App"," is Loading ..."]})},Q=function(e){var n=e.appProps,r=e.AppComponent,t=n.runtimeInfo,a=g[t.appId].name,l=S(),c=(0,i.useRef)(x.DEFAULT===x.MAXIMIZED?function(){return{top:0,left:0,width:window.innerWidth,height:window.innerHeight}()}:{top:10+Math.floor(200*Math.random()),left:10+Math.floor(100*Math.random()),width:Math.max(300,Math.floor(.7*window.innerWidth)),height:350}),u=(0,i.useState)(c.current),d=(0,s.Z)(u,2),p=d[0],m=d[1],h=(0,i.useRef)(),v=(0,i.useState)(G),_=(0,s.Z)(v,2),I=_[0],w=_[1],j=(0,i.useState)(""),Z=(0,s.Z)(j,2),y=Z[0],N=Z[1],b=V(h.current),D=b.posDiff,F=b.onDragStart,M=b.onDrag,C=b.onDragEnd,E=V(),z=E.posDiff,T=E.onDragStart,k=E.onDrag,W=E.onDragEnd;(0,i.useEffect)((function(){var e=(0,o.Z)({},c.current);t.winSize===x.MAXIMIZED&&(e={top:0,left:0,width:window.innerWidth,height:window.innerHeight}),t.winSize===x.MINIMIZED&&(e=(0,o.Z)((0,o.Z)({},e),{},{top:window.innerHeight-100,left:200,transform:"scale(0)"})),m(e)}),[t.winSize]),(0,i.useEffect)((function(){m((function(e){return(0,o.Z)((0,o.Z)({},e),{},{left:e.left+D.leftDiff,top:e.top+D.topDiff})}))}),[D]),(0,i.useEffect)((function(){m((function(e){return(0,o.Z)((0,o.Z)({},e),{},{width:e.width+z.leftDiff,height:e.height+z.topDiff})}))}),[z]);var L=function(){return l.raiseWindow(t.runtimeId)},O=(0,i.useCallback)((function(e){e.hideMenu?w(null):e.replace?w(e.menu):e.menu&&w((function(n){var r=(0,o.Z)({},n);for(var i in e.menu)r[i]=i in r?(0,o.Z)((0,o.Z)({},r[i]),e.menu[i]):e.menu[i];return r}))}),[]);return(0,A.jsxs)("div",{className:(0,f.Z)("WinFrame",P.root,t.winSize===x.MINIMIZED&&P.minimized,t.winSize===x.DEFAULT&&P.defaultSized),style:(0,o.Z)((0,o.Z)({},p),{},{zIndex:t.zIndex}),onClick:L,ref:h,title:a||"Application Window",children:[(0,A.jsxs)("div",{className:(0,f.Z)(P.bar,P.namebar),draggable:"true",onDrag:function(e){return M(e.pageX,e.pageY)},onDragStart:function(e){return function(e,n,r){F(e,n,r),L()}(e.pageX,e.pageY,e)},onDragEnd:function(e){return C(e.pageX,e.pageY)},children:[(0,A.jsx)("div",{children:a||"Application"}),(0,A.jsxs)("div",{className:P.btns,children:[t.winSize!==x.MAXIMIZED&&(0,A.jsx)("button",{type:"button",onClick:function(){return l.mize(t.runtimeId,x.MAXIMIZED)},title:"Maximize",className:P.mizeBtn,children:(0,A.jsx)("i",{className:"fa-regular fa-square"})}),(t.winSize===x.MAXIMIZED||t.winSize===x.MINIMIZED)&&(0,A.jsx)("button",{type:"button",onClick:function(){return l.mize(t.runtimeId,x.DEFAULT)},title:"Un-Maximize",className:P.mizeBtn,children:(0,A.jsx)("i",{className:"fa-solid fa-down-left-and-up-right-to-center"})}),(0,A.jsx)("button",{type:"button",onClick:function(){return l.mize(t.runtimeId,x.MINIMIZED)},title:"Minimize",className:P.mizeBtn,children:(0,A.jsx)("i",{className:"fa-solid fa-window-minimize"})}),(0,A.jsx)("button",{type:"button",onClick:function(){l.terminate(t.runtimeId)},title:"Close",className:P.mizeBtn,children:(0,A.jsx)("i",{className:"fa-solid fa-xmark"})})]})]}),(0,A.jsx)(H,{menu:I,handleMenuCommand:function(e){switch(e){case U:window.setTimeout((function(){l.run(t.appId)}),0);break;case Y:l.terminate(t.runtimeId);break;default:N(e)}setTimeout((function(){N("")}),0)}}),(0,A.jsx)("div",{style:{height:p.height-50},className:P.body,children:(0,A.jsx)(i.Suspense,{fallback:(0,A.jsx)(J,{appName:a}),children:(0,A.jsx)(r,(0,o.Z)((0,o.Z)({},n),{},{configMenu:O,menuCommand:y}))})}),(0,A.jsx)("i",{className:(0,f.Z)("fa-solid fa-arrow-up-right-dots",P.repositionHandle),draggable:"true",onDrag:function(e){return k(e.pageX,e.pageY)},onDragStart:function(e){return T(e.pageX,e.pageY)},onDragEnd:function(e){return W(e.pageX,e.pageY)}})]})};var q=function(e){return function(n){return(0,A.jsx)(Q,{appProps:n,AppComponent:e})}},K=q((function(e){return(0,A.jsxs)("div",{className:X,children:[(0,A.jsx)("i",{className:"fa-solid fa-face-smile"}),(0,A.jsx)("h2",{children:"Welcome to B.O.S.S"}),(0,A.jsxs)("div",{children:[(0,A.jsx)("u",{children:"B"}),"asic ",(0,A.jsx)("u",{children:"OS"})," ",(0,A.jsx)("u",{children:"S"}),"imulation"]})]})})),$=q(t().lazy((function(){return r.e(463).then(r.t.bind(r,55,23))}))),ee="AppsViewerApp_root__sHx-3",ne="AppsViewerApp_inner__DgUUp",re="AppsViewerApp_app__NuVJU",ie="AppsViewerApp_figSlot__YDIVw",te="AppsViewerApp_appIco__cX9XG",ae="AppsViewerApp_appName__t4ByG",oe=q((function(e){var n=e.configMenu,r=e.runtimeInfo,t=(0,i.useState)(Object.values(g).filter((function(e){return e.appId!==r.appId}))),a=(0,s.Z)(t,1)[0],o=S();(0,i.useEffect)((function(){n({hideMenu:!0})}),[n]);return(0,A.jsx)("div",{className:ee,children:(0,A.jsx)("div",{className:ne,children:a.map((function(e){return(0,A.jsxs)("div",{className:(0,f.Z)(re,"flex-c"),onDoubleClick:function(){return n=e.appId,void window.setTimeout((function(){o.run(n)}),0);var n},children:[(0,A.jsx)("div",{className:(0,f.Z)(ie,"flex-c"),children:e.iconClass&&(0,A.jsx)("i",{className:(0,f.Z)(e.iconClass,te)})}),(0,A.jsx)("span",{className:(0,f.Z)(ae,"flex-c"),children:e.name})]},e.appId)}))})})})),se=q((function(e){return(0,A.jsx)("div",{children:"The Timer App - Work in Progress"})})),le=q((function(e){var n=e.configMenu;return(0,i.useEffect)((function(){n({hideMenu:!0})}),[n]),(0,A.jsx)("div",{children:"Settings App - Under Development"})})),ce="TerminalApp_root__hnkgI",ue="TerminalApp_historyTxt__NdHdn",de="TerminalApp_inputArea__6htWV",fe=r(762),pe=r(261),me={FILE:"FILE",FOLDER:"FOLDER"};var he={get:function(e){return JSON.parse(localStorage.getItem(e)||null)},set:function(e,n){return localStorage.setItem(e,JSON.stringify(n))},clear:function(e){return localStorage.setItem(e,"")}},ve=function(e){return/^[a-zA-Z0-9-._ ]{1,}$/.test(e)};var _e="BOSS/FILE-TREE",Ie={"/":{id:"/",name:"/",fileType:me.FOLDER,parentId:null,children:["documents","file0"]},documents:{id:"documents",name:"Documents",fileType:me.FOLDER,parentId:"/",children:[]},file0:{id:"file0",name:"Hello Boss",fileType:me.FILE,parentId:"/",content:"Hello Boss.\nThis is a text file"}},ge=he.get(_e)||Ie;he.set(_e,ge);var xe=(0,_.oM)({name:"fileSystem",initialState:ge,reducers:{create:function(e,n){var r=n.payload,i=function(e,n,r,i,t){if(!n.trim()||!ve(n))return e;if(!(r in e)||e[r].fileType!==me.FOLDER)return e;if(e[r].children.map((function(n){return e[n].name})).includes(n))return e;var a=function(e,n,r,i){return{id:(0,pe.Z)(),name:e,parentId:n,fileType:r,owner:i,date_creation:Date.now(),date_modification:Date.now(),children:r===me.FOLDER?[]:null}}(n,r,i,t),s=(0,o.Z)((0,o.Z)({},e),{},(0,v.Z)({},a.id,a));r&&(s[r]=(0,o.Z)((0,o.Z)({},s[r]),{},{children:[].concat((0,h.Z)(s[r].children),[a.id])}));return s}(e,r.name,r.parentId,r.fileType,r.owner);return he.set(_e,i),i},rename:function(e,n){var r=n.payload,i=function(e,n,r){if(!r.trim()||!ve(r))return e;if(!(n in e))return e;var i=e[n].parentId;if(e[i].children.map((function(n){return e[n].name})).includes(r))return e;var t=(0,o.Z)((0,o.Z)({},e),{},(0,v.Z)({},n,(0,o.Z)((0,o.Z)({},e[n]),{},{name:r})));return t}(e,r.fileId,r.newName);return he.set(_e,i),i}}}),we=xe.actions,je=we.create,Ze=we.rename,ye=xe.reducer;var Ne=function(){var e=(0,l.v9)((function(e){return e.files})),n=(0,l.I0)(),r=function(r,i,t){return be(e,n,r,i,me.FOLDER,t)};return{createFile:(0,i.useCallback)((function(r,i,t){return be(e,n,r,i,me.FILE,t)}),[n,e]),createDir:r,createFolder:r,getParentId:function(n){return function(e,n){return"/"===n?"/":e[n].parentId}(e,n)},getChildren:function(n){return Fe(e,n)},getChildrenNames:function(n){return function(e,n){return Fe(e,n).map((function(e){return e.name}))}(e,n)},getPathTill:function(n){return function(e,n){var r=[];for(;n in e;)r.push(e[n].name),n=e[n].parentId;return r.reverse().join("/").replace("//","/")}(e,n)},getFileInfo:function(n){return function(e,n){if(n=function(e){for(var n=e[0],r=1;r<e.length;++r)e[r]===e[r-1]&&"/"===e[r]||(n+=e[r]);return n}(n),"/"===n)return e["/"];var r,i=n.split("/").filter((function(e){return e.trim().length>0})),t=Fe(e,"/"),a=null,o=(0,fe.Z)(i);try{for(o.s();!(r=o.n()).done;){var s,l=r.value,c=!1,u=(0,fe.Z)(t);try{for(u.s();!(s=u.n()).done;){var d=s.value;if(d.name===l){c=!0,a=d,t=Fe(e,d.id);break}}}catch(f){u.e(f)}finally{u.f()}if(!c)return null}}catch(f){o.e(f)}finally{o.f()}return a}(e,n)},rename:function(r,i){return De(e,n,i,r)}}};function be(e,n,r,i,t,a){return r.trim()&&ve(r)?i in e&&e[i].fileType===me.FOLDER?e[i].children.map((function(n){return e[n].name})).includes(r)?'File/folder name "'.concat(r,'" already exists'):(n(je({name:r,parentId:i,fileType:t,owner:a})),""):"Can not create file/folder in the given location":"Invalid name ".concat(r)}function De(e,n,r,i){if(!r.trim()||!ve(r))return"Invalid name ".concat(r);if(!(i in e))return"File ID (".concat(i,") not valid");var t=e[i].parentId;return e[t].children.map((function(n){return e[n].name})).includes(r)?'File/folder name "'.concat(r,'" already exists'):(n(Ze({fileId:i,newName:r})),"")}function Fe(e,n){var r=[];if(""===n)r=Object.values(e).filter((function(e){return e.parentId===n}));else if(n in e){r=(e[n].children||[]).map((function(n){return e[n]}))}return r}function Me(e){var n=function(){var e=Ne();return{ls:function(n,r){return[e.getChildrenNames(n.currentFolderId).join(", "),0]},pwd:n,touch:function(n,r){var i,t="",a=(0,fe.Z)(r);try{for(a.s();!(i=a.n()).done;){var o=i.value,s=e.createFile(o,n.currentFolderId);s&&(t+=s+"\n")}}catch(l){a.e(l)}finally{a.f()}return[t,0]},mkdir:r,md:r,cd:function(r,i){var t=i[0];if(!t)return["",0];"."!==t[0]&&"/"!==t[0]&&(t=n(r)[0]+"/"+t);var a=e.getFileInfo(t);return a&&a.fileType===me.FOLDER?(r.currentFolderId=a.id,["",0]):['"'.concat(t,'" is not a folder to move into')]}};function n(n,r){return[e.getPathTill(n.currentFolderId),0]}function r(n,r){var i,t="",a=(0,fe.Z)(r);try{for(a.s();!(i=a.n()).done;){var o=i.value,s=e.createDir(o,n.currentFolderId);s&&(t+=s+"\n")}}catch(l){a.e(l)}finally{a.f()}return[t,0]}}();return{process:function(r){return function(e,n){for(var r=function(e){e=e.trim();var n,r=[],i="",t="",a={},o=!1,s=0,l=(0,fe.Z)(e);try{for(l.s();!(n=l.n()).done;){var c=n.value;if('"'===c)if(o){if((t=t.trim()).length>0){var u="".concat("__QS__").concat(++s);i+=u,a[u]=t,t=""}o=!1}else o=!0;else" "===c?o?t+=c:(i=i.trim()).length>0&&(r.push(i),i=""):o?t+=c:i+=c}}catch(d){l.e(d)}finally{l.f()}return i.length>0&&r.push(i),r.map((function(e){return e.replaceAll(/__QS__[0-9]{1,}/gm,(function(e){return a[e]||e}))}))}(e),i=r[0],t={},a=arguments.length,l=new Array(a>2?a-2:0),c=2;c<a;c++)l[c-2]=arguments[c];for(var u=0,d=l;u<d.length;u++){var f=d[u];t=(0,o.Z)((0,o.Z)({},t),f)}var p='Sorry could not find the command "<b>'.concat(i,'</b>"'),m=-1;if(i in t){var h=t[i](n,r.slice(1)),v=(0,s.Z)(h,2);p=v[0],m=v[1]}return{msg:p,code:m,ctx:n}}(r,e,n)}}}var Se=function(e,n){return'<div style="color: '.concat(n,'">').concat(e,"</div>")},Ae=q((function(e){var n=(0,i.useState)("$ > "),r=(0,s.Z)(n,1)[0],t=(0,i.useState)(Se("Welcome to the B.O.S.S. terminal","lightyellow")),a=(0,s.Z)(t,2),o=a[0],l=a[1],c=(0,i.useState)(r),u=(0,s.Z)(c,2),d=u[0],f=u[1],p=(0,i.useState)([]),m=(0,s.Z)(p,2),v=m[0],_=m[1],I=(0,i.useState)(0),g=(0,s.Z)(I,2),x=g[0],w=g[1],j=(0,i.useRef)(),Z=(0,i.useRef)({}),y=Me(Z.current).process;(0,i.useEffect)((function(){var e=j.current;e.focus(),e.selectionStart=e.selectionEnd=e.value.length}),[]),(0,i.useEffect)((function(){Z.current={currentFolderId:"/"}}),[]);return(0,A.jsxs)("div",{className:ce,children:[(0,A.jsx)("div",{className:ue,dangerouslySetInnerHTML:{__html:o}}),(0,A.jsx)("textarea",{className:de,value:d,ref:j,onChange:function(e){var n=e.target.value;n.startsWith(r)&&f(n)},onKeyUp:function(e){var n=e.keyCode;if(13===n){var i=d.substring(r.length).trim();if(0===i.length)return;if("cls"===i||"clear"===i)l("");else{var t=y(i,Z.current),a=o+Se(d,"lightgreen")+Se(t.msg,"lightskyblue");l(a)}if(f(r),i!==v[v.length-1]){var s=[].concat((0,h.Z)(v),[i]);_(s),w(s.length)}}else if(38===n){if(0===v.length)return;var c=x>0?x-1:0;w(c),f(r+v[c])}else if(40===n){if(0===v.length)return;var u=x<v.length-1?x+1:v.length-1;w(u),f(r+v[u])}}})]})})),Ce="FoldersApp_root__CdN1-",Ee="FoldersApp_locationBar__lR9vB",ze="FoldersApp_loc__rXGZe",Te="FoldersApp_btns__vQOzO",ke="FoldersApp_inner__lYEzr";var We="File_file__MMHS5",Le="File_ffIco__5bYlD",Oe="File_fname__-Nx+X",Re=function(e){var n=e.file,r=e.open,t=(0,i.useState)(""),a=(0,s.Z)(t,2),o=a[0],l=a[1],c=Ne();(0,i.useEffect)((function(){l(n.name)}),[n.name]);return(0,A.jsxs)("div",{className:We,onDoubleClick:function(){return r(n.id,n.fileType)},children:[(0,A.jsxs)("span",{className:Le,children:[n.fileType===me.FILE&&(0,A.jsx)("i",{className:"fa-solid fa-file-lines"}),n.fileType===me.FOLDER&&(0,A.jsx)("i",{className:"fa-regular fa-folder-open"})]}),(0,A.jsx)("input",{className:Oe,type:"text",value:o,onChange:function(e){var n=e.target.value;ve(n)&&l(n)},onBlur:function(){o!==n.name&&c.rename(n.id,o)}})]})},Be="NEW_FILE",Xe="NEW_FOLDER",Pe={appsviewer:oe,settings:le,terminal:Ae,folders:q((function(e){var n=e.configMenu,r=e.menuCommand,t=Ne(),a=(0,i.useState)("/"),o=(0,s.Z)(a,2),l=o[0],c=o[1],u=(0,i.useState)(t.getChildren(l)),d=(0,s.Z)(u,2),f=d[0],p=d[1];!function(e,n){var r=(0,i.useRef)("");(0,i.useEffect)((function(){e!==r.current&&(n(e),r.current=e)}),[e,n])}(r,(function(e){if(e===Be){var n=Math.floor(999*Math.random());t.createFile("File_".concat(n),l)}else if(e===Xe){var r=Math.floor(999*Math.random());t.createDir("Folder_".concat(r),l)}h()}));var m=function(e,n){n===me.FOLDER&&(c(e),p(t.getChildren(e)))},h=function(){return p(t.getChildren(l))};return(0,i.useEffect)((function(){n({menu:{File:{2:{name:"New File",command:Be},3:{name:"New Folder",command:Xe}}}})}),[n]),(0,A.jsxs)("div",{className:Ce,children:[(0,A.jsxs)("div",{className:Ee,children:[(0,A.jsx)("div",{className:ze,children:t.getPathTill(l)}),(0,A.jsxs)("div",{className:Te,children:[(0,A.jsx)("i",{className:"fa-solid fa-rotate-right",onClick:h}),(0,A.jsx)("i",{className:"fa-solid fa-arrow-up",onClick:function(){var e=t.getParentId(l);c(e),p(t.getChildren(e))}})]})]}),(0,A.jsx)("div",{children:(0,A.jsx)("div",{className:ke,children:f&&f.map((function(e){return(0,A.jsx)(Re,{file:e,open:m},e.id)}))})})]})})),bin:q((function(e){return(0,A.jsx)("div",{children:"The Bin App - Under Development"})})),welcomeapp:K,bcalc:$,timer:se},Ve=function(){var e=Object.values((0,l.v9)((function(e){return e.procs})));return(0,A.jsx)("div",{className:"apps_container",children:e.map((function(e){var n=Pe[e.appId];return n?(0,A.jsx)(n,{runtimeInfo:e},e.runtimeId):null}))})},He=function(){return(0,A.jsxs)("div",{className:"App",children:[(0,A.jsx)(Ve,{}),(0,A.jsx)(B,{})]})},Ue=function(e){e&&e instanceof Function&&r.e(787).then(r.bind(r,787)).then((function(n){var r=n.getCLS,i=n.getFID,t=n.getFCP,a=n.getLCP,o=n.getTTFB;r(e),i(e),t(e),a(e),o(e)}))},Ye=(0,_.oM)({name:"apps",initialState:g,reducers:{}}).reducer,Ge=(0,_.xC)({reducer:{apps:Ye,procs:F,files:ye}});a.createRoot(document.getElementById("root")).render((0,A.jsx)(t().StrictMode,{children:(0,A.jsx)(l.zt,{store:Ge,children:(0,A.jsx)(He,{})})})),Ue()}}]);
//# sourceMappingURL=684.55275fda.chunk.js.map