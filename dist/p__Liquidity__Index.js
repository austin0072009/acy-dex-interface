(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"1OZD":function(e,t,n){"use strict";n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return h}));var a=n("k1fw"),o=n("9og8"),r=n("WmNS"),c=n.n(r),s=n("GUrf"),l=n("4218"),i=n("cUlj"),u=n("O/14"),b=n("nKUr");function d(e,t){return j.apply(this,arguments)}function j(){return j=Object(o["a"])(c.a.mark((function e(t,n){var a,r,b,d,j,h,g,p,O,x,m,f,v,k,w,y,S,T,C,E,N,I,q,P,A,H=arguments;return c.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=H.length>2&&void 0!==H[2]?H[2]:u["c"],r=!(H.length>3&&void 0!==H[3])||H[3],b=H.length>4?H[4]:void 0,d=H.length>5?H[5]:void 0,j=H.length>6?H[6]:void 0,h=H.length>7?H[7]:void 0,g=H.length>8?H[8]:void 0,p=H.length>9?H[9]:void 0,O=H.length>10?H[10]:void 0,x=H.length>11?H[11]:void 0,m=H.length>12?H[12]:void 0,f=H.length>13?H[13]:void 0,v=H.length>14?H[14]:void 0,k=H.length>15?H[15]:void 0,w=H.length>16?H[16]:void 0,y=H.length>17?H[17]:void 0,S=H.length>18?H[18]:void 0,T=H.length>19?H[19]:void 0,C=H.length>20?H[20]:void 0,E=H.length>21?H[21]:void 0,N=H.length>22?H[22]:void 0,I=H.length>23?H[23]:void 0,q=H.length>24?H[24]:void 0,P=H.length>25?H[25]:void 0,e.next=26,Object(o["a"])(c.a.mark((function e(){var o,A,H,L,D,R,U,F,W,B,M,Y,J,K,Q,G,z,V,_,X,Z,$,ee,te,ne,ae,oe,re,ce,se,le,ie,ue,be,de,je,he;return c.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(p(!1),O(!1),x("0"),m("0"),f(!1),v(!1),k(""),w("Loading..."),y(!1),S(""),console.log(s["c"]),o=Object(u["p"])(d,j),.01*a,A=t.address,H=t.symbol,L=t.decimals,D=t.amount,R=n.address,U=n.symbol,F=n.decimals,W=n.amount,D=D||"0",W=W||"0",j&&d){e.next=19;break}return e.abrupt("return",new u["a"]("Connect to your wallet"));case 19:if(t.symbol&&n.symbol){e.next=21;break}return e.abrupt("return",new u["a"]("Please choose tokens"));case 21:if(!r||"0"!=D){e.next=23;break}return e.abrupt("return",new u["a"]("Please enter amount"));case 23:if(r||"0"!=W){e.next=25;break}return e.abrupt("return",new u["a"]("Please enter amount"));case 25:if(!r||""!=D){e.next=27;break}return e.abrupt("return",new u["a"]("Please enter amount"));case 27:if(r||""!=W){e.next=29;break}return e.abrupt("return",new u["a"]("Please enter amount"));case 29:if(!r||!isNaN(parseFloat(D))){e.next=31;break}return e.abrupt("return",new u["a"]("Please enter amount"));case 31:if(r||!isNaN(parseFloat(W))){e.next=33;break}return e.abrupt("return",new u["a"]("Please enter amount"));case 33:if(B="ETH"===H,M="ETH"===U,console.log(t),console.log(n),!B||!M){e.next=41;break}return w("Doesn't support ETH to ETH"),y(!1),e.abrupt("return",new u["a"]("Doesn't support ETH to ETH"));case 41:if(!(B&&"WETH"===U||"WETH"===H&&M)){e.next=45;break}return w("Invalid pair WETH/ETH"),y(!1),e.abrupt("return",new u["a"]("Invalid pair WETH/ETH"));case 45:if(console.log("ADD LIQUIDITY"),console.log("------------------ CONSTRUCT TOKEN ------------------"),Y=B?s["n"][b]:new s["j"](b,A,L,H),J=M?s["n"][b]:new s["j"](b,R,F,U),!Y.equals(J)){e.next=53;break}return w("Equal tokens"),y(!1),e.abrupt("return",new u["a"]("Equal tokens!"));case 53:return e.next=55,s["d"].fetchPairData(Y,J,d).then((e=>(console.log(e.reserve0.raw.toString()),console.log(e.reserve1.raw.toString()),e))).catch((e=>new u["a"]("".concat(Y.symbol," - ").concat(J.symbol," pool does not exist. Create one?"))));case 55:K=e.sent,console.log("pair"),console.log(K),T(K),Q=!1,K instanceof u["a"]&&(Q=!0),C(Q),E({token0:A,token1:R}),console.log("test add to server",{token0:A,token1:R}),console.log("------------------ PARSE AMOUNT ------------------"),e.prev=65,G=r?new s["k"](Y,Object(i["b"])(D,L)):new s["k"](J,Object(i["b"])(W,F)),e.next=79;break;case 69:if(e.prev=69,e.t0=e["catch"](65),console.log("parsedAmount"),console.log(e.t0),y(!1),"underflow"!==e.t0.fault){e.next=77;break}return w("Value too small"),e.abrupt("return",new u["a"](e.t0.fault));case 77:return w(Q?"Enter both values":"Unhandled error"),e.abrupt("return",new u["a"]("Amount error"));case 79:if(Q){e.next=126;break}if(console.log("estimated dependent amount"),!r){e.next=103;break}_=K.priceOf(Y).quote(G),e.prev=83,X=new s["k"](Y,Object(i["b"])(D,L)),e.next=97;break;case 87:if(e.prev=87,e.t1=e["catch"](83),y(!1),"underflow"!==e.t1.fault){e.next=95;break}return w(e.t1.fault),e.abrupt("return",new u["a"](e.t1.fault));case 95:return w("Token or amount missing"),e.abrupt("return",new u["a"]("Token or amount missing"));case 97:z=Y===s["b"]?s["a"].ether(X.raw):X,V=J===s["b"]?s["a"].ether(_.raw):_,g(_.toFixed(5)),W=_.toExact(),e.next=124;break;case 103:_=K.priceOf(J).quote(G),e.prev=104,Z=new s["k"](J,Object(i["b"])(W,F)),e.next=120;break;case 108:if(e.prev=108,e.t2=e["catch"](104),console.log("token0TokenAmount"),console.log(e.t2),y(!1),"underflow"!==e.t2.fault){e.next=118;break}return w(e.t2.fault),e.abrupt("return",new u["a"](e.t2.fault));case 118:return w("Token or amount missing"),e.abrupt("return",new u["a"]("Token or amount missing"));case 120:z=Y===s["b"]?s["a"].ether(_.raw):_,V=J===s["b"]?s["a"].ether(Z.raw):Z,h(_.toFixed(5)),D=_.toExact();case 124:e.next=153;break;case 126:if("0"!==D&&"0"!==W){e.next=136;break}if(!Q){e.next=133;break}return y(!1),w("Create new pool"),e.abrupt("return",new u["a"]("Creating a new pool, please enter both amounts"));case 133:return y(!1),w("Add liquidity"),e.abrupt("return",new u["a"]("One field is empty, it's probably a new pool"));case 136:e.prev=136,z=new s["k"](Y,Object(i["b"])(D,L)),V=new s["k"](J,Object(i["b"])(W,F)),e.next=153;break;case 141:if(e.prev=141,e.t3=e["catch"](136),console.log("parsedToken0Amount and parsedToken1Amount"),console.log(e.t3),y(!1),"underflow"!==e.t3.fault){e.next=151;break}return w(e.t3.fault),e.abrupt("return",new u["a"](e.t3.fault));case 151:return w("Value must be a number"),e.abrupt("return",new u["a"]("Value must be a number"));case 153:return N(z),I(V),console.log("------------------ CHECK BALANCE ------------------"),e.next=158,Object(u["t"])(B?s["b"]:new s["j"](b,A,L,H),j,d);case 158:return $=e.sent,e.next=161,Object(u["t"])(M?s["b"]:new s["j"](b,R,F,U),j,d);case 161:ee=e.sent,console.log("token0 balance"),console.log($),console.log("token1 balance"),console.log(ee),e.prev=166,te=$.gte(Object(i["b"])(D,L))&&ee.gte(Object(i["b"])(W,F)),e.next=182;break;case 170:if(e.prev=170,e.t4=e["catch"](166),console.log(te),console.log(e.t4),y(!1),"underflow"!==e.t4.fault){e.next=180;break}return w(e.t4.fault),e.abrupt("return",new u["a"](e.t4.fault));case 180:return w("userHasSufficientBalance"),e.abrupt("return",new u["a"]("unknow error"));case 182:if(te){e.next=186;break}return w("Not enough balance"),y(!1),e.abrupt("return",new u["a"]("Not enough balance"));case 186:if(console.log("------------------ BREAKDOWN ------------------"),Q){e.next=210;break}return e.next=190,Object(u["r"])(K.liquidityToken,d,j);case 190:ne=e.sent,console.log("Liquidity Minted"),console.log(K.liquidityToken),e.prev=193,ae=K.getLiquidityMinted(ne,z,V),oe=new s["g"](ae.raw,ne.add(ae).raw).toFixed(4),k(["Pool reserve: ".concat(K.reserve0.toFixed(3)," ").concat(K.token0.symbol," + ").concat(K.reserve1.toFixed(3)," ").concat(K.token1.symbol),"Pool share: ".concat(oe,"%")]),e.next=208;break;case 199:if(e.prev=199,e.t5=e["catch"](193),!(e.t5 instanceof s["e"])){e.next=205;break}return w("Insufficient reserve!"),y(!1),e.abrupt("return",new u["a"]("Insufficient reserve!"));case 205:return w("Unhandled exception!"),y(!1),e.abrupt("return",new u["a"]("Unhandled exception!"));case 208:e.next=211;break;case 210:k(["Ready to create ".concat(H," ").concat(U," liquidity pool.")]);case 211:if(console.log("------------------ ALLOWANCE ------------------"),re=0,B){e.next=220;break}return e.next=216,Object(u["i"])(A,z.raw.toString(),d,j);case 216:ce=e.sent,console.log("token 0 approved?"),console.log(ce),ce||(console.log("Not enough allowance"),x(z.raw.toString()),p(!0),f(!0),re+=1);case 220:if(M){e.next=228;break}return console.log("Inside addLiquidity, amount needed: ".concat(V.raw.toString())),e.next=224,Object(u["i"])(R,V.raw.toString(),d,j);case 224:se=e.sent,console.log("token 1 approved?"),console.log(se),se||(console.log("Not enough allowance for token1"),m(V.raw.toString()),O(!0),v(!0),re+=2);case 228:if(!(re>0)){e.next=232;break}return y(!1),w("Need approval"),e.abrupt("return",new u["a"]("Need approve ".concat(1===re?H:2===re?U:"".concat(H," and ").concat(U))));case 232:y(!0),w(Q?"Create a new pool":"Add liquidity"),console.log("------------------ PREPARE ADD LIQUIDITY ------------------"),console.log("parsed token 0 amount"),console.log(z.raw),console.log("parsed token 1 amount"),console.log(V.raw),console.log("slippage"),console.log(a),B||M?(le=o.estimateGas.addLiquidityETH,ie=o.addLiquidityETH,de=B?J:Y,je=B?V:z,he=B?Object(u["h"])(z,Q?0:a)[0].toString():Object(u["h"])(V,Q?0:a)[0].toString(),ue=[de.address,je.raw.toString(),Object(u["h"])(je,Q?0:a)[0].toString(),he,j,"0x".concat((Math.floor((new Date).getTime()/1e3)+60).toString(16))],be=l["a"].from((M?V:z).raw.toString()),console.log(be)):(le=o.estimateGas.addLiquidity,ie=o.addLiquidity,ue=[A,R,z.raw.toString(),V.raw.toString(),Object(u["h"])(z,Q?0:a)[0].toString(),Object(u["h"])(V,Q?0:a)[0].toString(),j,"0x".concat((Math.floor((new Date).getTime()/1e3)+60).toString(16))],be=null),console.log("args"),console.log(ue),console.log("estimate"),console.log(le),console.log("method"),console.log(ie),console.log("value"),console.log(be),q(ue),P(be);case 252:case"end":return e.stop()}}),e,null,[[65,69],[83,87],[104,108],[136,141],[166,170],[193,199]])})))();case 26:A=e.sent,A instanceof u["a"]?w(A.getErrorText()):console.log(A);case 28:case"end":return e.stop()}}),e)}))),j.apply(this,arguments)}function h(e,t){return g.apply(this,arguments)}function g(){return g=Object(o["a"])(c.a.mark((function e(t,n){var r,l,i,d,j,h,g,p,O,x,m,f,v,k,w,y=arguments;return c.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=y.length>2&&void 0!==y[2]?y[2]:u["c"],!(y.length>3&&void 0!==y[3])||y[3],l=y.length>4?y[4]:void 0,i=y.length>5?y[5]:void 0,d=y.length>6?y[6]:void 0,j=y.length>7?y[7]:void 0,h=y.length>8?y[8]:void 0,g=y.length>9?y[9]:void 0,p=y.length>10?y[10]:void 0,O=y.length>11?y[11]:void 0,x=y.length>12?y[12]:void 0,m=y.length>13?y[13]:void 0,f=y.length>14?y[14]:void 0,v=y.length>15?y[15]:void 0,e.next=16,Object(o["a"])(c.a.mark((function e(){var o,b,m,f,v,k,w,y,S,T,C,E,N,I;return c.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log(s["c"]),o=Object(u["p"])(i,d),b=t.address,m=t.symbol,f=t.decimals,t.amount,v=n.address,k=n.symbol,w=n.decimals,n.amount,y="ETH"===m,S="ETH"===k,console.log("------------------ RECEIVED TOKEN ------------------"),console.log("token0"),console.log(t),console.log("token1"),console.log(n),!y||!S){e.next=13;break}return e.abrupt("return",new u["a"]("Doesn't support ETH to ETH"));case 13:if(!(y&&"WETH"===k||"WETH"===m&&S)){e.next=15;break}return e.abrupt("return",new u["a"]("Invalid pair WETH/ETH"));case 15:if(console.log("ADD LIQUIDITY"),console.log("------------------ CONSTRUCT TOKEN ------------------"),T=y?s["n"][l]:new s["j"](l,b,f,m),C=S?s["n"][l]:new s["j"](l,v,w,k),!T.equals(C)){e.next=21;break}return e.abrupt("return",new u["a"]("Equal tokens!"));case 21:return console.log("------------------ CONSTRUCT PAIR ------------------"),console.log("FETCH pair"),console.log(j),console.log(h),console.log("------------------ PARSE AMOUNT ------------------"),console.log(g),console.log(p),console.log("------------------ CHECK BALANCE ------------------"),console.log("------------------ BREAKDOWN ------------------"),console.log("------------------ ALLOWANCE ------------------"),console.log("------------------ PREPARE ADD LIQUIDITY ------------------"),y||S?(E=o.estimateGas.addLiquidityETH,N=o.addLiquidityETH,console.log(O),console.log(x)):(E=o.estimateGas.addLiquidity,N=o.addLiquidity,console.log(O),console.log(x)),console.log("parsed token 0 amount"),console.log(g.raw),console.log("parsed token 1 amount"),console.log(p.raw),console.log("slippage"),console.log(r),console.log(E),console.log(N),console.log(O),console.log(x),e.next=45,E(...O,x?{value:x}:{}).then((e=>N(...O,Object(a["a"])(Object(a["a"])({},x?{value:x}:{}),{},{gasLimit:Object(u["g"])(e)})).catch((e=>new u["a"]("CustomError in transaction")))));case 45:return I=e.sent,e.abrupt("return",I);case 47:case"end":return e.stop()}}),e)})))();case 16:return k=e.sent,k instanceof u["a"]?(m(k.getErrorText()),f("Please try again")):(console.log("status"),console.log(k),w="https://rinkeby.etherscan.io/tx/"+k.hash,v(k),m(Object(b["jsx"])("a",{href:w,target:"_blank",children:"View it on etherscan"}))),e.abrupt("return");case 19:case"end":return e.stop()}}),e)}))),g.apply(this,arguments)}},"2u47":function(e){e.exports=JSON.parse("{}")},N82c:function(e){e.exports=JSON.parse("{}")},QEXP:function(e,t,n){e.exports=n.p+"static/loading.fbc4a581.svg"},R1Dz:function(e,t,n){"use strict";var a=n("q1tI");t["a"]=Object(a["createContext"])()},"S/9j":function(e,t,n){"use strict";function a(e){var t=e.split("/").filter((e=>e));return t.map(((e,n)=>"/".concat(t.slice(0,n+1).join("/"))))}n.d(t,"a",(function(){return a}))},kiEm:function(e,t,n){"use strict";n.r(t);n("+L6B");var a,o,r=n("2/Rp"),c=n("q1tI"),s=n("9kvl"),l=n("THqM"),i=(n("Pwec"),n("CtXQ")),u=(n("5NDa"),n("5rEg")),b=n("k1fw"),d=n("9og8"),j=n("tJVT"),h=n("WmNS"),g=n.n(h),p=n("nkYg"),O=n("vDqi"),x=n.n(O),m=n("+Ri4"),f=n.n(m),v=(n("+n12"),n("Z6YE")),k=n("jUKV"),w=n("O/14"),y=(n("2u47"),n("N82c"),n("GUrf"),n("1OZD")),S=(n("QEXP"),n("wd/R")),T=n.n(S),C=n("nKUr"),E=l["t"].AcyTabPane,N=e=>{for(var t=e.dispatch,n=e.token,a=e.onLoggedIn,o=Object(c["useState"])(null),s=Object(j["a"])(o,2),h=s[0],O=s[1],m=Object(c["useState"])(!0),S=Object(j["a"])(m,2),N=S[0],I=S[1],q=p["a"][0],P=p["a"][1],A=0;A<p["a"].length;A++)p["a"][A].symbol==(null===n||void 0===n?void 0:n.token1)&&(q=p["a"][A]),p["a"][A].symbol==(null===n||void 0===n?void 0:n.token2)&&(P=p["a"][A]);var H=Object(c["useState"])(q),L=Object(j["a"])(H,2),D=L[0],R=L[1],U=Object(c["useState"])(P),F=Object(j["a"])(U,2),W=F[0],B=F[1],M=Object(c["useState"])("0"),Y=Object(j["a"])(M,2),J=Y[0],K=Y[1],Q=Object(c["useState"])("0"),G=Object(j["a"])(Q,2),z=G[0],V=G[1],_=Object(c["useState"])(),X=Object(j["a"])(_,2),Z=X[0],$=X[1],ee=Object(c["useState"])(),te=Object(j["a"])(ee,2),ne=te[0],ae=te[1],oe=Object(c["useState"])(!1),re=Object(j["a"])(oe,2),ce=re[0],se=re[1],le=Object(c["useState"])(!1),ie=Object(j["a"])(le,2),ue=ie[0],be=ie[1],de=Object(c["useState"])(!0),je=Object(j["a"])(de,2),he=je[0],ge=je[1],pe=Object(c["useState"])(w["c"]/100),Oe=Object(j["a"])(pe,2),xe=Oe[0],me=Oe[1],fe=Object(c["useState"])(w["c"]/100),ve=Object(j["a"])(fe,2),ke=ve[0],we=ve[1],ye=Object(c["useState"])(""),Se=Object(j["a"])(ye,2),Te=Se[0],Ce=Se[1],Ee=Object(c["useState"])(!1),Ne=Object(j["a"])(Ee,2),Ie=(Ne[0],Ne[1]),qe=Object(c["useState"])(!1),Pe=Object(j["a"])(qe,2),Ae=(Pe[0],Pe[1]),He=Object(c["useState"])("0"),Le=Object(j["a"])(He,2),De=(Le[0],Le[1]),Re=Object(c["useState"])("0"),Ue=Object(j["a"])(Re,2),Fe=(Ue[0],Ue[1]),We=Object(c["useState"])(!1),Be=Object(j["a"])(We,2),Me=(Be[0],Be[1]),Ye=Object(c["useState"])(!1),Je=Object(j["a"])(Ye,2),Ke=(Je[0],Je[1]),Qe=Object(c["useState"])(),Ge=Object(j["a"])(Qe,2),ze=Ge[0],Ve=Ge[1],_e=Object(c["useState"])("Connect to wallet"),Xe=Object(j["a"])(_e,2),Ze=Xe[0],$e=Xe[1],et=Object(c["useState"])(!0),tt=Object(j["a"])(et,2),nt=tt[0],at=tt[1],ot=Object(c["useState"])(),rt=Object(j["a"])(ot,2),ct=rt[0],st=rt[1],lt=Object(c["useState"])(),it=Object(j["a"])(lt,2),ut=it[0],bt=it[1],dt=Object(c["useState"])(),jt=Object(j["a"])(dt,2),ht=jt[0],gt=jt[1],pt=Object(c["useState"])(null),Ot=Object(j["a"])(pt,2),xt=Ot[0],mt=Ot[1],ft=Object(c["useState"])(),vt=Object(j["a"])(ft,2),kt=vt[0],wt=vt[1],yt=Object(c["useState"])(),St=Object(j["a"])(yt,2),Tt=St[0],Ct=St[1],Et=Object(c["useState"])(),Nt=Object(j["a"])(Et,2),It=Nt[0],qt=Nt[1],Pt=Object(c["useState"])(),At=Object(j["a"])(Pt,2),Ht=At[0],Lt=At[1],Dt=Object(c["useState"])(""),Rt=Object(j["a"])(Dt,2),Ut=Rt[0],Ft=Rt[1],Wt=Object(c["useState"])(p["a"]),Bt=Object(j["a"])(Wt,2),Mt=Bt[0],Yt=Bt[1],Jt=Object(c["useState"])(!1),Kt=Object(j["a"])(Jt,2),Qt=(Kt[0],Kt[1],Object(c["useState"])(!1)),Gt=Object(j["a"])(Qt,2),zt=(Gt[0],Gt[1],Object(c["useState"])(!1)),Vt=Object(j["a"])(zt,2),_t=Vt[0],Xt=Vt[1],Zt=e=>{Ft(e.target.value),Yt(p["a"].filter((t=>t.symbol.includes(e.target.value.toUpperCase()))))},$t=Object(c["useState"])([]),en=Object(j["a"])($t,2),tn=(en[0],en[1],Object(v["b"])()),nn=tn.account,an=tn.chainId,on=tn.library,rn=tn.activate,cn=new k["a"]({supportedChainIds:[1,3,4,5,42,80001]});Object(c["useEffect"])((()=>{rn(cn);var e=JSON.parse(localStorage.getItem("tokens_symbol"));null!=e&&pn(p["a"].filter((t=>e.includes(t.symbol))))}),[nn]);var sn=Object(c["useCallback"])(Object(d["a"])(g.a.mark((function e(){return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(D&&W){e.next=2;break}return e.abrupt("return");case 2:if(he){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,Object(y["b"])(Object(b["a"])(Object(b["a"])({},D),{},{amount:Z}),Object(b["a"])(Object(b["a"])({},W),{},{amount:ne}),100*xe,he,an,on,nn,$,ae,Ie,Ae,De,Fe,Me,Ke,Ve,$e,at,st,bt,gt,mt,wt,Ct,qt,Lt);case 6:case"end":return e.stop()}}),e)}))),[D,W,Z,ne,xe,he,an,on,nn]),ln=Object(c["useCallback"])(Object(d["a"])(g.a.mark((function e(){return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(D&&W){e.next=2;break}return e.abrupt("return");case 2:if(!he){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,Object(y["b"])(Object(b["a"])(Object(b["a"])({},D),{},{amount:Z}),Object(b["a"])(Object(b["a"])({},W),{},{amount:ne}),100*xe,he,an,on,nn,$,ae,Ie,Ae,De,Fe,Me,Ke,Ve,$e,at,st,bt,gt,mt,wt,Ct,qt,Lt);case 6:case"end":return e.stop()}}),e)}))),[D,W,Z,ne,xe,he,an,on,nn]);Object(c["useEffect"])((()=>{sn()}),[D,W,Z,ne,xe,he,an,on,nn]),Object(c["useEffect"])((()=>{ln()}),[D,W,Z,ne,xe,he,an,on,nn]),Object(c["useEffect"])((()=>{void 0==nn?(at(!0),$e("Connect to Wallet")):($e("Choose tokens and amount"),at(!1),a())}),[an,on,nn]),Object(c["useEffect"])((()=>{var e=()=>document.getElementById("liquidity-token-search-input").focus();!0===h&&setTimeout(e,100)}),[h]);var un=()=>{O(!0)},bn=()=>{O(!1)};Object(c["useEffect"])((()=>{function e(){return t.apply(this,arguments)}function t(){return t=Object(d["a"])(g.a.mark((function e(){return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return se(!0),be(!0),e.t0=K,e.next=5,Object(w["s"])(D,an,nn,on);case 5:return e.t1=e.sent,(0,e.t0)(e.t1),e.t2=V,e.next=10,Object(w["s"])(W,an,nn,on);case 10:e.t3=e.sent,(0,e.t2)(e.t3);case 12:case"end":return e.stop()}}),e)}))),t.apply(this,arguments)}nn&&an&&on&&(console.log("get balances in liquidity"),e())}),[nn,an,on,D,W]);var dn=function(){var e=Object(d["a"])(g.a.mark((function e(t){return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(bn(),!N){e.next=15;break}if(void 0!=nn){e.next=6;break}alert("Please connect to your account"),e.next=13;break;case 6:return R(t),e.t0=K,e.next=10,Object(w["s"])(t,an,nn,on);case 10:e.t1=e.sent,(0,e.t0)(e.t1),se(!0);case 13:e.next=26;break;case 15:if(void 0!=nn){e.next=19;break}alert("Please connect to your account"),e.next=26;break;case 19:return B(t),e.t2=V,e.next=23,Object(w["s"])(t,an,nn,on);case 23:e.t3=e.sent,(0,e.t2)(e.t3),be(!0);case 26:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),jn=Object(c["useState"])([]),hn=Object(j["a"])(jn,2),gn=hn[0],pn=hn[1],On=e=>{pn((t=>{var n=[...t];if(n.includes(e)){var a=n.filter((t=>t!=e));return localStorage.setItem("token",JSON.stringify(a.map((e=>e.addressOnEth)))),localStorage.setItem("tokens_symbol",JSON.stringify(a.map((e=>e.symbol)))),a}return n.push(e),localStorage.setItem("token",JSON.stringify(n.map((e=>e.addressOnEth)))),localStorage.setItem("tokens_symbol",JSON.stringify(n.map((e=>e.symbol)))),n}))},xn=n=>{console.log("test status:",n);var a=e.transaction.transactions,o=a.filter((e=>e.hash==n.hash)).length;console.log("is current dispatched? ",o),0==o&&t({type:"transaction/addTransaction",payload:{transactions:[...a,{hash:n.hash}]}}),console.log("test test see how many times setInterval is called");var r=function(){var e=Object(d["a"])(g.a.mark((function e(){return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,on.getTransactionReceipt(n.hash).then(function(){var e=Object(d["a"])(g.a.mark((function e(o){var c,s,l,i;return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("receipt ",o),o){e.next=5;break}setTimeout(r,500),e.next=14;break;case 5:return e.next=7,on.getBlock(o.logs[0].blockNumber).then((e=>{c=T()(parseInt(1e3*e.timestamp)).format("YYYY-MM-DD HH:mm:ss"),console.log("test transactionTime: ",c)}));case 7:console.log("test pair to add on server",xt),xt&&(s=xt.token0,l=xt.token1,x.a.post("https://api.acy.finance/api/pool/update?walletId=".concat(nn,"&action=add&token0=").concat(s,"&token1=").concat(l)).then((e=>{console.log("add to server return: ",e)})).catch((e=>console.log("error: ",e)))),i=a.filter((e=>e.hash!=n.hash)),t({type:"transaction/addTransaction",payload:{transactions:[...i,{hash:n.hash,transactionTime:c}]}}),t({type:"liquidity/setRefreshTable",payload:!0}),console.log(Ze),$e("Done");case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();r()},mn=e.liquidity;return Object(c["useEffect"])(Object(d["a"])(g.a.mark((function e(){var t,n;return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("liquidity updated"),console.log("liquidity state: ",mn),t=mn.token0,n=mn.token1,console.log("new tokens to set in addComponent, ",t,n),!t||!n){e.next=24;break}return Xt(!0),setTimeout((()=>Xt(!1)),1e3),t=Mt.filter((e=>e.symbol===t.symbol))[0],n=Mt.filter((e=>e.symbol===n.symbol))[0],console.log("fetched token ds",t,n),R(t),e.t0=K,e.next=14,Object(w["s"])(t,an,nn,on);case 14:return e.t1=e.sent,(0,e.t0)(e.t1),se(!0),B(n),e.t2=V,e.next=21,Object(w["s"])(n,an,nn,on);case 21:e.t3=e.sent,(0,e.t2)(e.t3),be(!0);case 24:case"end":return e.stop()}}),e)}))),[mn.token0,mn.token1]),Object(C["jsx"])("div",{className:_t?f.a.shake:null,children:Object(C["jsx"])(l["e"],{style:{backgroundColor:"#0e0304",padding:"10px"},children:Object(C["jsx"])("div",{className:f.a.addLiquidity,children:Object(C["jsxs"])("div",{className:f.a.addComponent,children:[Object(C["jsx"])(l["j"],{icon:"eth",title:ce&&"Balance: ".concat(parseFloat(J).toFixed(5)),logoURI:D&&D.logoURI,coin:D&&D.symbol||"Select",yuan:"566.228",dollar:"".concat(J),token:Z,onChoseToken:Object(d["a"])(g.a.mark((function e(){return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:un(),I(!0);case 2:case"end":return e.stop()}}),e)}))),onChangeToken:e=>{console.log("onChangeToken"),ge(!0),$(e)}}),Object(C["jsx"])("div",{style:{margin:"12px auto",textAlign:"center"},children:Object(C["jsx"])(l["l"],{width:21.5,name:"plus_light"})}),Object(C["jsx"])(l["j"],{icon:"eth",title:ue&&"Balance: ".concat(parseFloat(z).toFixed(5)),logoURI:W&&W.logoURI,coin:W&&W.symbol||"Select",yuan:"566.228",dollar:"".concat(z),token:ne,onChoseToken:Object(d["a"])(g.a.mark((function e(){return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:un(),I(!1);case 2:case"end":return e.stop()}}),e)}))),onChangeToken:e=>{ge(!1),ae(e)}}),Object(C["jsx"])(l["k"],{children:ze&&Object(C["jsxs"])(C["Fragment"],{children:[Object(C["jsx"])("div",{className:f.a.breakdownTopContainer,children:Object(C["jsxs"])("div",{className:f.a.slippageContainer,children:[Object(C["jsx"])("span",{style:{fontWeight:600},children:"Slippage tolerance"}),Object(C["jsxs"])("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"7px"},children:[Object(C["jsx"])(r["a"],{type:"link",style:{marginRight:"5px"},children:"Auto"}),Object(C["jsx"])(u["a"],{value:ke||"",onChange:e=>{we(e.target.value)},suffix:Object(C["jsx"])("strong",{children:"%"})}),Object(C["jsx"])(r["a"],{type:"primary",style:{marginLeft:"10px",background:"#2e3032",borderColor:"transparent"},onClick:()=>{isNaN(ke)?Ce("Please input valid slippage value!"):(Ce(""),me(parseFloat(ke)))},children:"Set"})]}),Te.length>0&&Object(C["jsx"])("span",{style:{fontWeight:600,color:"#c6224e"},children:Te})]})}),Object(C["jsx"])("div",{className:f.a.acyDescriptionContainer,children:ze.map((e=>Object(C["jsx"])(l["k"].Item,{children:Object(C["jsx"])("div",{className:f.a.acyDescriptionItem,children:e})})))})]})}),Object(C["jsx"])(l["d"],{variant:"success",disabled:!nt,onClick:Object(d["a"])(g.a.mark((function e(){return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(void 0!=nn){e.next=6;break}rn(cn),$e("Choose tokens and amount"),at(!1),e.next=10;break;case 6:return at(!1),$e(Object(C["jsxs"])(C["Fragment"],{children:["Processing ",Object(C["jsx"])(i["a"],{type:"loading"})]})),e.next=10,Object(y["a"])(Object(b["a"])(Object(b["a"])({},D),{},{amount:Z}),Object(b["a"])(Object(b["a"])({},W),{},{amount:ne}),100*xe,he,an,on,nn,ut,ht,kt,Tt,It,Ht,st,$e,xn);case 10:case"end":return e.stop()}}),e)}))),children:Ze}),Object(C["jsx"])(l["k"],{children:ct&&Object(C["jsx"])(l["k"].Item,{children:ct})}),Object(C["jsxs"])(l["p"],{onCancel:bn,width:400,visible:h,children:[Object(C["jsx"])("div",{className:f.a.title,children:"Select a token"}),Object(C["jsx"])("div",{className:f.a.search,children:Object(C["jsx"])(u["a"],{size:"large",style:{backgroundColor:"#373739",borderRadius:"40px"},placeholder:"Enter the token symbol or address",value:Ut,onChange:Zt,id:"liquidity-token-search-input"})}),Object(C["jsx"])("div",{className:f.a.coinList,children:Object(C["jsxs"])(l["t"],{children:[Object(C["jsx"])(E,{tab:"All",children:Mt.map(((e,t)=>Object(C["jsx"])(l["g"],{data:e,customIcon:!1,setAsFav:()=>On(e),selectToken:()=>{dn(e)},isFav:gn.includes(e)},t)))},"1"),Object(C["jsx"])(E,{tab:"Favorite",children:gn.map(((e,t)=>Object(C["jsx"])(l["g"],{data:e,selectToken:()=>On(t),customIcon:!1,index:t,setAsFav:()=>On(n),hideFavButton:!0,isFav:gn.includes(e)},t)))},"2")]})})]})]})})})})},I=Object(s["b"])((e=>{var t=e.global,n=e.transaction,a=e.loading,o=e.liquidity;return{global:t,transaction:n,loading:a.global,liquidity:o}}))(N),q=n("zHco"),P=n("EYsQ"),A=n.n(P),H=l["t"].AcyTabPane,L=(a=Object(s["b"])((e=>{var t=e.profile,n=e.loading;return{profile:t,loading:n.effects["profile/fetchBasic"]}})),a(o=class extends c["Component"]{constructor(){super(...arguments),this.state={visible:!1,visibleConfirmOrder:!1,visibleLoading:!1,tabIndex:1,loggedIn:!1},this.lineTitleRender=()=>[Object(C["jsxs"])("div",{children:[Object(C["jsxs"])("div",{className:A.a.maintitle,children:[Object(C["jsx"])("span",{className:A.a.lighttitle,children:"ETH"}),"/BTC"]}),Object(C["jsxs"])("div",{className:A.a.secondarytitle,children:[Object(C["jsx"])("span",{className:A.a.lighttitle,children:"212.123"})," ",Object(C["jsx"])("span",{className:A.a.percentage,children:"+12.45%"})," 2021.07.11"]})]}),Object(C["jsx"])(l["q"],{onhandPeriodTimeChoose:this.onhandPeriodTimeChoose,className:A.a.pt,times:["1D","7D","1M","1Y","All"]})],this.onhandPeriodTimeChoose=e=>{console.log(e)},this.onClickCoin=()=>{this.setState({visible:!0})},this.onCancel=()=>{this.setState({visible:!1})},this.onHandModalConfirmOrder=e=>{this.setState({visibleConfirmOrder:!!e})},this.onChangeTabs=e=>{this.setState({tabIndex:e})},this.onLoggedIn=()=>{this.setState({loggedIn:!0})}}componentDidMount(){}render(){var e=this.state,t=e.visible,n=e.visibleConfirmOrder,a=e.visibleLoading,o=(e.tabIndex,e.loggedIn),c=null;return this.props.location.state&&(c=this.props.location.state,console.log(c)),Object(C["jsxs"])(q["a"],{children:[Object(C["jsxs"])("div",{className:o?A.a.main:A.a.main_notLoggedIn,children:[Object(C["jsx"])("div",{children:o&&Object(C["jsx"])(l["o"],{})}),Object(C["jsx"])("div",{children:Object(C["jsx"])(I,{onLoggedIn:this.onLoggedIn})})]}),Object(C["jsxs"])(l["p"],{onCancel:this.onCancel,width:600,visible:t,children:[Object(C["jsxs"])("div",{className:A.a.title,children:[Object(C["jsx"])(l["l"],{name:"back"})," Select a token"]}),Object(C["jsx"])("div",{className:A.a.search,children:Object(C["jsx"])(l["m"],{placeholder:"Enter the token symbol or address",suffix:Object(C["jsx"])(l["l"],{name:"search"})})}),Object(C["jsx"])("div",{className:A.a.coinList,children:Object(C["jsxs"])(l["t"],{children:[Object(C["jsxs"])(H,{tab:"All",children:[Object(C["jsx"])(l["g"],{}),Object(C["jsx"])(l["g"],{}),Object(C["jsx"])(l["g"],{}),Object(C["jsx"])(l["g"],{})]},"1"),Object(C["jsx"])(H,{tab:"Favorite"},"2"),Object(C["jsx"])(H,{tab:"Index"},"3"),Object(C["jsx"])(H,{tab:"Synth"},"4")]})})]}),Object(C["jsx"])(l["h"],{onCancel:this.onHandModalConfirmOrder,title:"Comfirm Order",visible:n,children:Object(C["jsxs"])("div",{className:A.a.confirm,children:[Object(C["jsx"])("p",{children:"ETH\uff1a 566.228"}),Object(C["jsx"])("p",{children:"BTC\uff1a2.669"}),Object(C["jsx"])("p",{children:"Price\uff1a212.123"}),Object(C["jsx"])("p",{children:"Price Impact\uff1a2.232%"}),Object(C["jsx"])("p",{children:"Liquidity Provide Fee: 0.321%"}),Object(C["jsx"])("p",{children:"Alpha: 0.371%"}),Object(C["jsx"])("p",{children:"Maximum sold: 566.221"}),Object(C["jsx"])(r["a"],{size:"large",type:"primary",children:"Confirm"})]})}),Object(C["jsx"])(l["b"],{onCancel:()=>this.setState({visibleLoading:!1}),visible:a})]})}})||o);t["default"]=L},zHco:function(e,t,n){"use strict";var a=n("PpiC"),o=n("q1tI"),r=(n("cWXX"),n("/ezw"),n("k1fw"),n("Znn+"),n("ZTPi")),c=(n("TSYQ"),n("PCKb"),n("sPJy"),n("bE4q"),n("vRGJ"),n("S/9j"),n("nKUr"));o["PureComponent"];r["a"].TabPane;o["PureComponent"];var s=n("9kvl"),l=n("GvbY"),i=n.n(l);class u extends o["PureComponent"]{render(){var e=this.props,t=e.contentWidth,n=e.children,a="".concat(i.a.main);return"Fixed"===t&&(a="".concat(i.a.main," ").concat(i.a.wide)),Object(c["jsx"])("div",{className:a,children:n})}}var b=Object(s["b"])((e=>{var t=e.setting;return{contentWidth:t.contentWidth}}))(u),d=n("U0CE"),j=n.n(d),h=(n("R1Dz"),e=>{var t=e.children,n=(e.contentWidth,e.wrapperClassName),o=e.top;Object(a["a"])(e,["children","contentWidth","wrapperClassName","top"]);return Object(c["jsxs"])("div",{style:{margin:"-24px -24px 0"},className:n,children:[o,t?Object(c["jsx"])("div",{className:j.a.content,children:Object(c["jsx"])(b,{children:t})}):null]})});t["a"]=Object(s["b"])((e=>{var t=e.setting;return{contentWidth:t.contentWidth}}))(h)}}]);