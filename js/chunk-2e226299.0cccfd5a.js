(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e226299"],{1298:function(e,t,n){"use strict";n("7f7f");var a=n("cb09"),c=n.n(a),i=n("ef00"),o=n.n(i),s=n("6c15"),r=n.n(s),d=n("c222"),p=n.n(d),u=n("1526"),l=n.n(u),f=n("e8c4"),m=n.n(f),b=n("5c5e"),k=n.n(b),g=n("2c58"),v=n.n(g),h=n("8761"),w={manageEns:{route:"/interface/dapps/manage-ens",icon:r.a,iconDisabled:p.a,title:"interface.ensManager",desc:"interface.registerENSDescShort",supportedNetworks:[h["ETH"].name,h["GOERLI"].name,h["ROP"].name,h["RIN"].name]},domainSale:{route:"/interface/dapps/name-wallet",icon:c.a,iconDisabled:o.a,title:"interface.nameYourWallet",desc:"interface.nameYourWalletDesc",supportedNetworks:[h["ETH"].name]},scheduleTransaction:{route:"/interface/dapps/schedule-transaction",icon:m.a,iconDisabled:k.a,title:"Schedule a transaction",desc:"Schedule a transaction using the decentralized Ethereum Alarm Clock protocol",supportedNetworks:[h["ETH"].name,h["KOV"].name]},maker:{route:"/interface/dapps/maker-dai",icon:v.a,iconDisabled:l.a,title:"dappsMaker.maker_title",desc:"dappsMaker.maker_desc",supportedNetworks:[h["ETH"].name,h["KOV"].name]}};t["a"]=w},1526:function(e,t,n){e.exports=n.p+"img/button-key.79e4057e.svg"},"2c58":function(e,t,n){e.exports=n.p+"img/makerdai.4cda8f7e.svg"},3409:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:["dapps-button",e.supported?"":"disabled"],on:{click:e.navigateTo}},[n("img",{attrs:{src:e.supported?e.icon:e.iconDisabled}}),n("div",[n("h4",[e._v(e._s(e.title))]),n("p",[e._v(e._s(e.desc))])])])},c=[],i=(n("7f7f"),n("6762"),n("2fdb"),n("cebc")),o=n("2f62"),s={props:{title:{type:String,default:""},desc:{type:String,default:""},icon:{type:String,default:""},iconDisabled:{type:String,default:""},param:{type:String,default:""},supportedNetworks:{type:Array,default:function(){return[]}}},computed:Object(i["a"])({},Object(o["b"])(["network","online"]),{supported:function(){if(this.online)return this.supportedNetworks.includes(this.network.type.name)}}),methods:{navigateTo:function(){this.$router.push(this.param)}}},r=s,d=(n("5d41"),n("2877")),p=Object(d["a"])(r,a,c,!1,null,"120b5f2d",null),u=p.exports;n.d(t,"a",function(){return u})},"3a12":function(e,t,n){},"5c5e":function(e,t,n){e.exports=n.p+"img/eac-hov.0ff9427d.svg"},"5d41":function(e,t,n){"use strict";var a=n("3a12"),c=n.n(a);c.a},"6c15":function(e,t,n){e.exports=n.p+"img/domain.5194defa.svg"},"9ab7":function(e,t,n){},c222:function(e,t,n){e.exports=n.p+"img/domain-hov.cce19f91.svg"},cb09:function(e,t,n){e.exports=n.p+"img/domain-sale.f07a77b5.svg"},e7d0:function(e,t,n){"use strict";var a=n("9ab7"),c=n.n(a);c.a},e8c4:function(e,t,n){e.exports=n.p+"img/eac.8c229ac0.svg"},ef00:function(e,t,n){e.exports=n.p+"img/domain-sale-hov.e110128d.svg"},f4d0:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dapps-container"},[n("div",[n("interface-container-title",{attrs:{title:e.$t("common.dapps")}}),n("div",{staticClass:"buttons-container"},e._l(e.sortedObject,function(t){return n("dapp-buttons",{key:t.title,attrs:{title:e.$t(t.title),icon:t.icon,"icon-disabled":t.iconDisabled,desc:e.$t(t.desc),param:t.route,"supported-networks":t.supportedNetworks}})}),1)],1)])},c=[],i=(n("7f7f"),n("6762"),n("2fdb"),n("55dd"),n("456d"),n("ac6a"),n("cebc")),o=n("55c1"),s=n("3409"),r=n("1298"),d=n("2f62"),p={name:"DappsContainer",components:{"interface-container-title":o["a"],"dapp-buttons":s["a"]},data:function(){return{localDapps:r["a"]}},computed:Object(i["a"])({},Object(d["b"])(["network"]),{sortedObject:function(){var e=this,t=[];return Object.keys(r["a"]).forEach(function(e){t.push(r["a"][e])}),t.sort(function(t,n){return t.supportedNetworks.includes(e.network.type.name)||n.supportedNetworks.includes(e.network.type.name)?1:0})}})},u=p,l=(n("e7d0"),n("2877")),f=Object(l["a"])(u,a,c,!1,null,"58bfb8cc",null),m=f.exports;n.d(t,"default",function(){return m})}}]);
//# sourceMappingURL=chunk-2e226299.0cccfd5a.js.map