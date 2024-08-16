!function(){"use strict";var t={36133:function(t,e,r){var n=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{c(n.next(t))}catch(t){i(t)}}function s(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}c((n=n.apply(t,e||[])).next())}))},o=this&&this.__generator||function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(c){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(a=0)),a;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,n=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){a.label=s[1];break}if(6===s[0]&&a.label<o[1]){a.label=o[1],o=s;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(s);break}o[2]&&a.ops.pop(),a.trys.pop();continue}s=e.call(t,a)}catch(t){s=[6,t],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}};Object.defineProperty(e,"__esModule",{value:!0});var i=r(6229),a=r(6229),s={},c=Promise.resolve([]);function u(t){return n(this,void 0,void 0,(function(){var e;return o(this,(function(r){return e=c.then((function(){return function(t){return n(this,void 0,void 0,(function(){var e,r,n,i,a,c,u,l;return o(this,(function(o){switch(o.label){case 0:if(e={method:"GET"},s[t])return console.log("Cache hit for ".concat(t)),[2,s[t]];r=[],n=0,i=t,o.label=1;case 1:return null===i?[3,5]:(a=Date.now(),[4,new Promise((function(t){return setTimeout(t,600)}))]);case 2:return o.sent(),[4,fetch(i,e)];case 3:return(c=o.sent()).ok?[4,c.json()]:(console.error("Error! status: ".concat(c.status)),i=null,[3,1]);case 4:return u=o.sent(),l=Date.now(),n+=1,console.log("Fetched page ".concat(n," in ").concat((l-a)/1e3,"s from ").concat(i," count ").concat(u.count)),r.push.apply(r,u.results),i=u.next||null,[3,1];case 5:return s[t]=r,[2,r]}}))}))}(t)})),c=e.catch((function(){return new Error("Error: unexpected exception")})),[2,e]}))}))}var l={description:"360Giving",logoSourceAddress:"https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg",logoTargetAddress:"https://360Giving.org"};function p(t){var e=t.data,r=(0,a.number_to_amount)(e.amountAwarded,e.currency),n=e.fundingOrganization.map((function(t){return t.name})).join(","),o=e.recipientOrganization.map((function(t){return t.name})).join(","),s=e.fundingOrganization.map((function(t){return t.id})).join(","),c=e.recipientOrganization.map((function(t){return t.id})).join(",");return{type:"Entity",text:e.title,properties:{title:(0,i.mk_ExcelString)(e.title),awardDate:(0,a.string_to_date)(e.awardDate),funder:(0,i.mk_ExcelString)(n),recipient:(0,i.mk_ExcelString)(o),amountAwarded:r,description:(0,i.mk_ExcelString)(e.description),grant_id:(0,i.mk_ExcelString)(t.grant_id),funder_id:(0,i.mk_ExcelString)(s),recipient_id:(0,i.mk_ExcelString)(c),grant_nav:(0,i.mk_ExcelString)("https://grantnav.threesixtygiving.org/grant/"+t.grant_id),raw_grant_data:(0,a.value_to_excel)(t)},layouts:{compact:{icon:"Gift"},card:{title:{property:"title"},sections:[{layout:"List",properties:["awardDate","funder","recipient","amountAwarded","description"]},{layout:"List",title:"More",properties:["grant_id","funder_id","recipient_id","grant_nav","raw_grant_data"],collapsible:!0,collapsed:!0}]}},provider:{description:e.title+" on 360Giving GrantNav",logoSourceAddress:"https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg",logoTargetAddress:"https://grantnav.threesixtygiving.org/grant/"+t.grant_id}}}CustomFunctions.associate("GRANTS_RECEIVED",(function(t){return n(this,void 0,void 0,(function(){var e,r;return o(this,(function(n){switch(n.label){case 0:return[4,u("https://api.threesixtygiving.org/api/v1/org/"+t+"/grants_received/?limit=100")];case 1:return(e=n.sent())instanceof Error?[2,{type:"Entity",text:"".concat(t," not known to have received grants"),properties:{error:e.message},provider:l}]:(r=e,[2,{type:"Entity",text:"".concat(t," received ").concat(e.length," grants"),properties:{grants:(0,i.mk_ExcelArray)(r.map((function(t){return[p(t)]})))},provider:{description:"".concat(t," on 360Giving"),logoSourceAddress:"https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg",logoTargetAddress:"https://grantnav.threesixtygiving.org/org/"+t}}])}}))}))})),CustomFunctions.associate("GRANTS_MADE",(function(t){return n(this,void 0,void 0,(function(){var e,r;return o(this,(function(n){switch(n.label){case 0:return[4,u("https://api.threesixtygiving.org/api/v1/org/"+t+"/grants_made/?limit=100")];case 1:return(e=n.sent())instanceof Error?[2,{type:"Entity",text:"".concat(t," not known to have made grants"),properties:{error:e.message},provider:l}]:(r=e,[2,{type:"Entity",text:"".concat(t," made ").concat(e.length," grants"),properties:{grants:(0,i.mk_ExcelArray)(r.map((function(t){return[p(t)]})))},provider:{description:"".concat(t," on 360Giving"),logoSourceAddress:"https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg",logoTargetAddress:"https://grantnav.threesixtygiving.org/org/"+t}}])}}))}))})),CustomFunctions.associate("WHO_FUNDS_WITH_WHO",(function(t){for(var e={},r=[],n=0;n<t.length;n++)for(var o=0;o<t[n].length;o++){var i=t[n][o];if("object"==typeof i&&null!==i&&"type"in i&&"Entity"==i.type){var a=i.properties.grants;if("Array"==a.type)for(var s=a.elements.length,c=0;c<s;c++){var u=a.elements[c][0],l=(u.properties.title,u.properties.funder),p=u.properties.funder_id,d=u.properties.recipient,g=u.properties.recipient_id,f=u.properties.grant_id;e[p.basicValue]=l.basicValue,e[g.basicValue]=d.basicValue,r.push({grant_id:f.basicValue,funder_id:p.basicValue,recipient_id:g.basicValue})}else a.type}}Array.from(new Set(r.map((function(t){return t.funder_id}))));var h=Array.from(new Set(r.map((function(t){return t.recipient_id})))),m={};for(n=0;n<h.length;n++)m[h[n]]=new Set;for(n=0;n<r.length;n++){var v=r[n];m[v.recipient_id].add(v.funder_id)}var y={};for(c=0;c<h.length;c++){var _=m[d=h[c]],b=Array.from(_);for(n=0;n<b.length;n++)for(o=0;o<b.length;o++)n!==o&&(y[k=b[n]+";"+b[o]]=(y[k]||0)+1)}for(var w=[],E=0,x=Object.entries(y);E<x.length;E++){var S=x[E],k=S[0],T=S[1],A=k.split(";");w.push([{type:"String",basicValue:e[A[0]]},{type:"String",basicValue:e[A[1]]},{type:"Double",basicValue:T}])}return w.sort((function(t,e){return e[2].basicValue-t[2].basicValue})),w}))},80490:function(t,e,r){var n=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{c(n.next(t))}catch(t){i(t)}}function s(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}c((n=n.apply(t,e||[])).next())}))},o=this&&this.__generator||function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(c){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(a=0)),a;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,n=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){a.label=s[1];break}if(6===s[0]&&a.label<o[1]){a.label=o[1],o=s;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(s);break}o[2]&&a.ops.pop(),a.trys.pop();continue}s=e.call(t,a)}catch(t){s=[6,t],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}};Object.defineProperty(e,"__esModule",{value:!0});var i=r(6229),a=r(6229),s=Promise.resolve({});function c(t){return n(this,void 0,void 0,(function(){var e;return o(this,(function(r){return e=s.then((function(){return function(t){return n(this,void 0,void 0,(function(){var e;return o(this,(function(r){switch(r.label){case 0:return[4,new Promise((function(t){return setTimeout(t,200)}))];case 1:return r.sent(),[4,fetch(t,{method:"GET"})];case 2:return(e=r.sent()).ok?[4,e.json()]:(console.error("Error! status: ".concat(e.status)),[2,new Error("Error! status: ".concat(e.status))]);case 3:return[2,r.sent()]}}))}))}(t)})),s=e.catch((function(){return new Error("Error: unexpected exception")})),[2,e]}))}))}var u={description:"FindThatCharity",logoSourceAddress:"https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg",logoTargetAddress:"https://findthatcharity.uk"},l={};CustomFunctions.associate("FINDTHATCHARITYTEST",(function(t){return n(this,void 0,void 0,(function(){var e,r;return o(this,(function(n){switch(n.label){case 0:return[4,c("https://findthatcharity.uk/orgid/"+t+".json")];case 1:return e=n.sent(),r=e.name,[2,{type:"Entity",text:"findThatCharity ".concat(r),properties:{charity_or_error:r}}]}}))}))})),CustomFunctions.associate("FINDTHATCHARITY",(function(t){return n(this,void 0,void 0,(function(){var e,r,n;return o(this,(function(o){switch(o.label){case 0:return l[t]?(console.log("Cache hit for ".concat(t)),[2,l[t]]):[4,c((e="https://findthatcharity.uk/orgid/"+t)+".json")];case 1:return(r=o.sent())instanceof Error?[2,{type:"Entity",text:"".concat(t," not found on FindThatCharity"),properties:{error:r.message},provider:u}]:(n=function(t,e){return{type:"Entity",text:e.name,properties:{name:(0,i.mk_ExcelString)(e.name),organisationTypePrimary:(0,i.mk_ExcelString)(e.organisationTypePrimary),description:(0,a.value_to_excel)(e.description),latestFinancialYearEnd:(0,a.string_to_date)(e.latestFinancialYearEnd),latestIncome:null==e.latestIncome?i.nullErrorValue:(0,a.number_to_amount)(e.latestIncome,"GBP"),latestSpending:null==e.latestSpending?i.nullErrorValue:(0,a.number_to_amount)(e.latestSpending,"GBP"),latestEmployees:(0,a.value_to_excel)(e.latestEmployees),latestVolunteers:(0,a.value_to_excel)(e.latestVolunteers),trusteeCount:(0,a.value_to_excel)(e.trusteeCount),telephone:(0,a.value_to_excel)(e.telephone),email:(0,a.value_to_excel)(e.email),location:(0,i.mk_ExcelString)(e.location.map((function(t){return t.name})).join(",")),address:(0,i.mk_ExcelString)(e.address.streetAddress+", "+e.address.addressLocality+", "+e.address.postalCode),url:(0,a.value_to_excel)(e.url),id:(0,i.mk_ExcelString)(e.id),charityNumber:(0,a.value_to_excel)(e.charityNumber),companyNumber:(0,a.value_to_excel)(e.companyNumber),active:{type:"Boolean",basicValue:e.active},dateRegistered:(0,a.string_to_date)(e.dateRegistered),dateRemoved:null==e.dateRemoved?"not applicable":(0,a.string_to_date)(e.dateRemoved),parent:(0,a.value_to_excel)(e.parent),organisationType:(0,i.mk_ExcelString)(e.organisationType.join(",")),alternateName:(0,i.mk_ExcelString)(e.alternateName.join(",")),sources:(0,i.mk_ExcelString)(e.sources.join(",")),links:(0,i.mk_ExcelString)(e.links.map((function(t){return t.site+": "+t.url})).join(",")),orgIDs:(0,i.mk_ExcelString)(e.orgIDs.join(",")),linked_records:(0,i.mk_ExcelString)(e.linked_records.map((function(t){return t.orgid+": "+t.url})).join(",")),dateModified:(0,a.string_to_date)(e.dateModified),raw_charity_data:(0,a.value_to_excel)(e)},layouts:{compact:{icon:"Organization"},card:{title:{property:"name"},sections:[{layout:"List",properties:["description"]},{layout:"List",title:"".concat(e.active?"Active":"Inactive"," ").concat(e.organisationTypePrimary,", number ").concat(e.charityNumber," since ").concat(e.dateRegistered),properties:["id","charityNumber","companyNumber","organisationTypePrimary","active","dateRegistered","dateRemoved","parent","organisationType","alternateName"],collapsible:!0,collapsed:!0},{layout:"List",title:"People and Financials",properties:["latestFinancialYearEnd","latestIncome","latestSpending","latestEmployees","latestVolunteers","trusteeCount"],collapsible:!0,collapsed:!1},{layout:"List",title:"Contact",properties:["telephone","email","address","url"],collapsible:!0,collapsed:!1},{layout:"List",title:"More",properties:["sources","location","links","orgIDs","linked_records","dateModified","raw_charity_data"],collapsible:!0,collapsed:!0}]}},provider:{description:e.name+" on FindThatCharity",logoSourceAddress:"https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg",logoTargetAddress:t}}}(e,r),l[t]=n,[2,n])}}))}))}))},6229:function(t,e){var r=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{c(n.next(t))}catch(t){i(t)}}function s(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}c((n=n.apply(t,e||[])).next())}))},n=this&&this.__generator||function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(c){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(a=0)),a;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,n=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){a.label=s[1];break}if(6===s[0]&&a.label<o[1]){a.label=o[1],o=s;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(s);break}o[2]&&a.ops.pop(),a.trys.pop();continue}s=e.call(t,a)}catch(t){s=[6,t],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}};function o(t){return 0==t.length?e.nullErrorValue:{type:"Array",elements:t}}function i(t){if(null==t)return e.nullErrorValue;switch(typeof t){case"boolean":return{type:"Boolean",basicValue:t};case"string":return{type:"String",basicValue:t};case"number":return{type:"Double",basicValue:t};case"object":if(t.constructor===Array){var r=t.length;if(0==r)return e.nullErrorValue;for(var n=new Array(r),s=0;s<r;s++)n[s]=[a(t[s])];return o(n)}var c=t,u="",l={};for(var p in c)if(c.hasOwnProperty(p)){for(var d=p.toLowerCase();l.hasOwnProperty(d);)d+="9";var g=c[p];l[d]=i(g);var f=typeof g,h=d+("boolean"===f||"number"===f||"string"===f?"="+g.toString():"");u=""==u?h:u+","+h}return{type:"Entity",text:u,properties:l};default:return{type:"String",basicValue:"DEFAULT - unexpected"}}}function a(t){if(null==t)return e.nullErrorValue;var r=i(t);return"object"==typeof t&&t.constructor===Array?{type:"Entity",text:"Nested array",properties:{array:r}}:r}function s(t){var e=new Date(t);return{type:"FormattedNumber",basicValue:25569+(e.getTime()-60*e.getTimezoneOffset()*1e3)/864e5,numberFormat:"yyyy-mm-dd"}}Object.defineProperty(e,"__esModule",{value:!0}),e.number_to_amount=e.string_to_date=e.value_to_excel=e.mk_ExcelArray=e.mk_ExcelDouble=e.mk_ExcelString=e.nullErrorValue=void 0,e.nullErrorValue={type:"Error",basicType:"Error",basicValue:"#NULL!"},e.mk_ExcelString=function(t){return{type:"String",basicValue:t}},e.mk_ExcelDouble=function(t){return{type:"Double",basicValue:t}},e.mk_ExcelArray=o,e.value_to_excel=i,e.string_to_date=s,e.number_to_amount=function(t,e){return{type:"FormattedNumber",basicValue:t,numberFormat:"GBP"==e?"£* #,##0.00":"* #,##0.00",propertyMetadata:{sublabel:e}}},CustomFunctions.associate("GET_JSON",(function(t){return r(this,void 0,void 0,(function(){var e,r,o;return n(this,(function(n){switch(n.label){case 0:e={method:"GET"},n.label=1;case 1:return n.trys.push([1,4,,5]),[4,fetch(t,e)];case 2:if(!(r=n.sent()).ok)throw new Error("Error! status: ".concat(r.status));return[4,r.json()];case 3:return[2,i(n.sent())];case 4:return o=n.sent(),console.log(o),[2,i("caught: "+o.message)];case 5:return[2]}}))}))})),CustomFunctions.associate("GET_JSON_LINES",(function(t){return r(this,void 0,void 0,(function(){var e,r,o,a,s,c,u,l;return n(this,(function(n){switch(n.label){case 0:e={method:"GET"},n.label=1;case 1:return n.trys.push([1,5,,6]),[4,fetch(t,e)];case 2:if(!(r=n.sent()).ok)throw new Error("Error! status: ".concat(r.status));return[4,r.text()];case 3:return[4,n.sent().split("\n")];case 4:for(o=n.sent(),a=o.length-1,s=new Array(a),c=0;c<a;c++){u=o[c];try{s[c]=JSON.parse(o[c])}catch(t){s[c]="error parsing: "+u+"length "+u.length}}return[2,i({lines:s})];case 5:return l=n.sent(),console.log(l),[2,i("caught: "+l.message)];case 6:return[2]}}))}))})),CustomFunctions.associate("POST_JSON",(function(t,e){return r(this,void 0,void 0,(function(){var r,o,a;return n(this,(function(n){switch(n.label){case 0:r={method:"POST",headers:{"Content-Type":"application/json"},body:e},n.label=1;case 1:return n.trys.push([1,4,,5]),[4,fetch(t,r)];case 2:if(!(o=n.sent()).ok)throw new Error("Error! status: ".concat(o.status));return[4,o.json()];case 3:return[2,i(n.sent())];case 4:return a=n.sent(),console.log(a),[2,i("caught: "+a.message)];case 5:return[2]}}))}))})),CustomFunctions.associate("ENCODEURI",(function(t){return encodeURIComponent(t)})),CustomFunctions.associate("PARSE_JSON",(function(t){return i(JSON.parse(t))})),CustomFunctions.associate("STRING_TO_DATE",s)}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}r(6229),r(80490),r(36133)}();
//# sourceMappingURL=functions.js.map