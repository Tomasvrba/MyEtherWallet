(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-347c9e06"],{"10b7":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"initial-state-ens"},[t("form",{staticClass:"send-form"},[t("div",{staticClass:"title-container"},[t("div",{staticClass:"title"},[t("h4",[e._v("\n          "+e._s(e.$t("interface.ensManager"))+"\n        ")]),t("p",[e._v(e._s(e.$t("interface.registerEnsDesc")))])])]),t("div",{staticClass:"the-form domain-name"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.localDomainName,expression:"localDomainName"}],class:[e.domainNameErr?"errored":""],attrs:{placeholder:e.$t("dapps.registerEnsPlaceholder"),type:"text",name:""},domProps:{value:e.localDomainName},on:{input:function(a){a.target.composing||(e.localDomainName=a.target.value)}}}),t("span",{directives:[{name:"show",rawName:"v-show",value:!e.multiTld,expression:"!multiTld"}]},[e._v("."+e._s(e.tld))])]),t("div",{staticClass:"error-message-container"},[t("p",{directives:[{name:"show",rawName:"v-show",value:!1===e.contractInitiated,expression:"contractInitiated === false"}],staticClass:"contract-loading-warning"},[e._v("\n        "+e._s(e.$t("dapps.registerEnsContractNotReady"))+"\n      ")]),t("p",{directives:[{name:"show",rawName:"v-show",value:e.domainNameErr,expression:"domainNameErr"}],staticClass:"erroredMsg"},[e.isValidLength||""===e.localDomainName?t("span",[e._v(" "+e._s(e.$t("dapps.registerEnsWarn2"))+" ")]):t("span",[e._v("\n          "+e._s(e.$t("dapps.registerEnsWarn1"))+"\n        ")])])]),t("div",{staticClass:"submit-button-container"},[t("button",{class:[e.domainNameErr||""===e.localDomainName?"disabled":"","submit-button large-round-button-green-filled clickable"],on:{click:function(a){return a.preventDefault(),e.checkDomain(a)}}},[t("span",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}]},[e._v(" "+e._s(e.$t("interface.checkDomain"))+" ")]),t("i",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"fa fa-spinner fa-spin"})])])]),t("interface-bottom-text",{attrs:{"link-text":e.$t("interface.helpCenter"),question:e.$t("interface.haveIssues"),link:"https://kb.myetherwallet.com"}})],1)},i=[],s=(t("a481"),t("cebc")),o=t("539d"),r=t("2f62"),l={components:{"interface-bottom-text":o["a"]},props:{checkDomain:{type:Function,default:function(){}},loading:{type:Boolean,default:!1},contractInitiated:{type:Boolean,default:!1},hostName:{type:String,default:""},tld:{type:String,default:""},domainNameErr:{type:Boolean,default:!1},multiTld:{type:Boolean,default:!1}},data:function(){return{localDomainName:this.hostName}},computed:Object(s["a"])({},Object(r["b"])(["network"]),{isValidLength:function(){return this.localDomainName.replace("."+this.network.type.ens.registrarTLD,"").length>6}}),watch:{localDomainName:function(e){this.$emit("domainNameChange",e)},domainName:function(e){this.localDomainName=e}},methods:{expendDomainCheckForm:function(){this.$refs["checkForm"].classList.toggle("hidden"),this.$refs["domainList"].classList.add("hidden")},domainAvailabilityCheck:function(){this.$refs["domainList"].classList.add("hidden")}}},c=l,d=(t("7f40"),t("2877")),m=Object(d["a"])(c,n,i,!1,null,"03e8d2ce",null),u=m.exports;t.d(a,"default",function(){return u})},"7f40":function(e,a,t){"use strict";var n=t("97db"),i=t.n(n);i.a},"97db":function(e,a,t){}}]);
//# sourceMappingURL=chunk-347c9e06.6d74c1ea.js.map