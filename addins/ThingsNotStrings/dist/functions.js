!function(){"use strict";var t={36133:function(t,e,r){var n=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,a){function i(t){try{c(n.next(t))}catch(t){a(t)}}function s(t){try{c(n.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(i,s)}c((n=n.apply(t,e||[])).next())}))},o=this&&this.__generator||function(t,e){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(c){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=e.call(t,i)}catch(t){s=[6,t],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}};Object.defineProperty(e,"__esModule",{value:!0});var a=r(6229),i=r(6229),s={},c=Promise.resolve([]);function u(t){return n(this,void 0,void 0,(function(){var e;return o(this,(function(r){return e=c.then((function(){return function(t){return n(this,void 0,void 0,(function(){var e,r,n,a,i,c,u,l;return o(this,(function(o){switch(o.label){case 0:if(e={method:"GET"},s[t])return console.log("Cache hit for ".concat(t)),[2,s[t]];r=[],n=0,a=t,o.label=1;case 1:return null===a?[3,5]:(i=Date.now(),[4,new Promise((function(t){return setTimeout(t,600)}))]);case 2:return o.sent(),[4,fetch(a,e)];case 3:return(c=o.sent()).ok?[4,c.json()]:(console.error("Error! status: ".concat(c.status)),a=null,[3,1]);case 4:return u=o.sent(),l=Date.now(),n+=1,console.log("Fetched page ".concat(n," in ").concat((l-i)/1e3,"s from ").concat(a," count ").concat(u.count)),r.push.apply(r,u.results),a=u.next||null,[3,1];case 5:return s[t]=r,[2,r]}}))}))}(t)})),c=e.catch((function(){return new Error("Error: unexpected exception")})),[2,e]}))}))}var l={description:"360Giving",logoSourceAddress:"https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg",logoTargetAddress:"https://360Giving.org"};function p(t){var e=t.data,r=(0,i.number_to_amount)(e.amountAwarded,e.currency),n=e.fundingOrganization.map((function(t){return t.name})).join(","),o=e.recipientOrganization.map((function(t){return t.name})).join(","),s=e.fundingOrganization.map((function(t){return t.id})).join(","),c=e.recipientOrganization.map((function(t){return t.id})).join(",");return{type:"Entity",basicType:"Error",basicValue:"#VALUE!",text:e.title,properties:{title:(0,a.mk_ExcelString)(e.title),awardDate:(0,i.string_to_date)(e.awardDate),funder:(0,a.mk_ExcelString)(n),recipient:(0,a.mk_ExcelString)(o),amountAwarded:r,description:(0,a.mk_ExcelString)(e.description),grant_id:(0,a.mk_ExcelString)(t.grant_id),funder_id:(0,a.mk_ExcelString)(s),recipient_id:(0,a.mk_ExcelString)(c),grant_nav:(0,a.mk_ExcelString)("https://grantnav.threesixtygiving.org/grant/"+t.grant_id),raw_grant_data:(0,i.value_to_excel)(t)},layouts:{compact:{icon:"Gift"},card:{title:{property:"title"},sections:[{layout:"List",properties:["awardDate","funder","recipient","amountAwarded","description"]},{layout:"List",title:"More",properties:["grant_id","funder_id","recipient_id","grant_nav","raw_grant_data"],collapsible:!0,collapsed:!0}]}},provider:{description:e.title+" on 360Giving GrantNav",logoSourceAddress:"https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg",logoTargetAddress:"https://grantnav.threesixtygiving.org/grant/"+t.grant_id}}}function g(t){return null!==t&&"object"==typeof t&&"type"in t&&"Array"===t.type}function d(t){return null!==t&&"object"==typeof t&&"type"in t&&"Entity"===t.type}CustomFunctions.associate("GRANTS_RECEIVED",(function(t){return n(this,void 0,void 0,(function(){var e,r;return o(this,(function(n){switch(n.label){case 0:return[4,u("https://api.threesixtygiving.org/api/v1/org/"+t+"/grants_received/?limit=100")];case 1:return(e=n.sent())instanceof Error?[2,{type:"Entity",text:"".concat(t," not known to have received grants"),properties:{error:e.message},provider:l}]:(r=e,[2,{type:"Entity",text:"".concat(t," received ").concat(e.length," grants"),properties:{grants:(0,a.mk_ExcelArray)(r.map((function(t){return[p(t)]})))},provider:{description:"".concat(t," on 360Giving"),logoSourceAddress:"https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg",logoTargetAddress:"https://grantnav.threesixtygiving.org/org/"+t}}])}}))}))})),CustomFunctions.associate("GRANTS_MADE",(function(t){return n(this,void 0,void 0,(function(){var e,r;return o(this,(function(n){switch(n.label){case 0:return[4,u("https://api.threesixtygiving.org/api/v1/org/"+t+"/grants_made/?limit=100")];case 1:return(e=n.sent())instanceof Error?[2,{type:"Entity",text:"".concat(t," not known to have made grants"),properties:{error:e.message},provider:l}]:(r=e,[2,{type:"Entity",text:"".concat(t," made ").concat(e.length," grants"),properties:{grants:(0,a.mk_ExcelArray)(r.map((function(t){return[p(t)]})))},provider:{description:"".concat(t," on 360Giving"),logoSourceAddress:"https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg",logoTargetAddress:"https://grantnav.threesixtygiving.org/org/"+t}}])}}))}))})),CustomFunctions.associate("ALLGRANTS",(function(t){try{for(var e=[],r=0;r<t.length;r++)for(var n=0;n<t[r].length;n++){var o=t[r][n];if(d(o)&&"grants"in o.properties){var a=o.properties.grants;if(g(a))for(var i=a.elements.length,s=0;s<i;s++){var c=a.elements[s][0];d(c)&&"grant_id"in c.properties&&e.push(c)}}}if(0===e.length)return[[{type:"String",basicValue:"No grants found"}]];var u=e.map((function(t){return[t]}));return u}catch(t){return[[{type:"String",basicValue:"Error! ".concat(t.message)}]]}})),CustomFunctions.associate("WHO_FUNDS_WITH_WHO",(function(t){try{for(var e=[],r=0;r<t.length;r++)for(var n=0;n<t[r].length;n++){var o=t[r][n];if(d(o)&&"grants"in o.properties){var a=o.properties.grants;if(g(a))for(var i=a.elements.length,s=0;s<i;s++)d(l=a.elements[s][0])&&"grant_id"in l.properties&&e.push(l)}}var c={},u=[];for(r=0;r<e.length;r++){var l,p=(l=e[r]).properties.grant_id,f=l.properties.funder_id,h=l.properties.recipient_id;u.push({grant_id:p.basicValue,funder_id:f.basicValue,recipient_id:h.basicValue});var y=l.properties.funder,m=l.properties.recipient;c[f.basicValue]=y.basicValue,c[h.basicValue]=m.basicValue}Array.from(new Set(u.map((function(t){return t.funder_id}))));var v=Array.from(new Set(u.map((function(t){return t.recipient_id})))),_={};for(r=0;r<v.length;r++)_[v[r]]=new Set;for(r=0;r<u.length;r++){var b=u[r];_[b.recipient_id].add(b.funder_id)}var w={};for(s=0;s<v.length;s++){var E=_[m=v[s]],x=Array.from(E);for(r=0;r<x.length;r++)for(n=0;n<x.length;n++)r!==n&&(w[V=x[r]+";"+x[n]]=(w[V]||0)+1)}for(var S=[],k=0,T=Object.entries(w);k<T.length;k++){var A=T[k],V=A[0],N=A[1],C=V.split(";");S.push([{type:"String",basicValue:c[C[0]]},{type:"String",basicValue:c[C[1]]},{type:"Double",basicValue:N}])}return S.sort((function(t,e){return e[2].basicValue-t[2].basicValue})),S}catch(t){return[[{type:"String",basicValue:"Error! ".concat(t.message)}]]}}))},80490:function(t,e,r){var n=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,a){function i(t){try{c(n.next(t))}catch(t){a(t)}}function s(t){try{c(n.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(i,s)}c((n=n.apply(t,e||[])).next())}))},o=this&&this.__generator||function(t,e){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(c){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=e.call(t,i)}catch(t){s=[6,t],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}};Object.defineProperty(e,"__esModule",{value:!0});var a=r(6229),i=r(6229),s=Promise.resolve({});function c(t){return n(this,void 0,void 0,(function(){var e;return o(this,(function(r){return e=s.then((function(){return function(t){return n(this,void 0,void 0,(function(){var e;return o(this,(function(r){switch(r.label){case 0:return[4,new Promise((function(t){return setTimeout(t,200)}))];case 1:return r.sent(),[4,fetch(t,{method:"GET"})];case 2:return(e=r.sent()).ok?[4,e.json()]:(console.error("Error! status: ".concat(e.status)),[2,new Error("Error! status: ".concat(e.status))]);case 3:return[2,r.sent()]}}))}))}(t)})),s=e.catch((function(){return new Error("Error: unexpected exception")})),[2,e]}))}))}var u={description:"FindThatCharity",logoSourceAddress:"https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg",logoTargetAddress:"https://findthatcharity.uk"},l={};CustomFunctions.associate("FINDTHATCHARITYTEST",(function(t){return n(this,void 0,void 0,(function(){var e,r;return o(this,(function(n){switch(n.label){case 0:return[4,c("https://findthatcharity.uk/orgid/"+t+".json")];case 1:return e=n.sent(),r=e.name,[2,{type:"Entity",text:"findThatCharity ".concat(r),properties:{charity_or_error:r}}]}}))}))})),CustomFunctions.associate("FINDTHATCHARITY",(function(t){return n(this,void 0,void 0,(function(){var e,r,n;return o(this,(function(o){switch(o.label){case 0:return l[t]?(console.log("Cache hit for ".concat(t)),[2,l[t]]):[4,c((e="https://findthatcharity.uk/orgid/"+t)+".json")];case 1:return(r=o.sent())instanceof Error?[2,{type:"Entity",text:"".concat(t," not found on FindThatCharity"),properties:{error:r.message},provider:u}]:(n=function(t,e){return{type:"Entity",basicType:"Error",basicValue:"#VALUE!",text:e.name,properties:{name:(0,a.mk_ExcelString)(e.name),organisationTypePrimary:(0,a.mk_ExcelString)(e.organisationTypePrimary),description:(0,i.value_to_excel)(e.description),latestFinancialYearEnd:(0,i.string_to_date)(e.latestFinancialYearEnd),latestIncome:null==e.latestIncome?a.nullErrorValue:(0,i.number_to_amount)(e.latestIncome,"GBP"),latestSpending:null==e.latestSpending?a.nullErrorValue:(0,i.number_to_amount)(e.latestSpending,"GBP"),latestEmployees:(0,i.value_to_excel)(e.latestEmployees),latestVolunteers:(0,i.value_to_excel)(e.latestVolunteers),trusteeCount:(0,i.value_to_excel)(e.trusteeCount),telephone:(0,i.value_to_excel)(e.telephone),email:(0,i.value_to_excel)(e.email),location:(0,a.mk_ExcelString)(e.location.map((function(t){return t.name})).join(",")),address:(0,a.mk_ExcelString)(e.address.streetAddress+", "+e.address.addressLocality+", "+e.address.postalCode),url:(0,i.value_to_excel)(e.url),id:(0,a.mk_ExcelString)(e.id),charityNumber:(0,i.value_to_excel)(e.charityNumber),companyNumber:(0,i.value_to_excel)(e.companyNumber),active:{type:"Boolean",basicValue:e.active},dateRegistered:(0,i.string_to_date)(e.dateRegistered),dateRemoved:null==e.dateRemoved?"not applicable":(0,i.string_to_date)(e.dateRemoved),parent:(0,i.value_to_excel)(e.parent),organisationType:(0,a.mk_ExcelString)(e.organisationType.join(",")),alternateName:(0,a.mk_ExcelString)(e.alternateName.join(",")),sources:(0,a.mk_ExcelString)(e.sources.join(",")),links:(0,a.mk_ExcelString)(e.links.map((function(t){return t.site+": "+t.url})).join(",")),orgIDs:(0,a.mk_ExcelString)(e.orgIDs.join(",")),linked_records:(0,a.mk_ExcelString)(e.linked_records.map((function(t){return t.orgid+": "+t.url})).join(",")),dateModified:(0,i.string_to_date)(e.dateModified),raw_charity_data:(0,i.value_to_excel)(e)},layouts:{compact:{icon:"Organization"},card:{title:{property:"name"},sections:[{layout:"List",properties:["description"]},{layout:"List",title:"".concat(e.active?"Active":"Inactive"," ").concat(e.organisationTypePrimary,", number ").concat(e.charityNumber," since ").concat(e.dateRegistered),properties:["id","charityNumber","companyNumber","organisationTypePrimary","active","dateRegistered","dateRemoved","parent","organisationType","alternateName"],collapsible:!0,collapsed:!0},{layout:"List",title:"People and Financials",properties:["latestFinancialYearEnd","latestIncome","latestSpending","latestEmployees","latestVolunteers","trusteeCount"],collapsible:!0,collapsed:!1},{layout:"List",title:"Contact",properties:["telephone","email","address","url"],collapsible:!0,collapsed:!1},{layout:"List",title:"More",properties:["sources","location","links","orgIDs","linked_records","dateModified","raw_charity_data"],collapsible:!0,collapsed:!0}]}},provider:{description:e.name+" on FindThatCharity",logoSourceAddress:"https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg",logoTargetAddress:t}}}(e,r),l[t]=n,[2,n])}}))}))}))},6229:function(t,e){var r=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,a){function i(t){try{c(n.next(t))}catch(t){a(t)}}function s(t){try{c(n.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(i,s)}c((n=n.apply(t,e||[])).next())}))},n=this&&this.__generator||function(t,e){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(c){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=e.call(t,i)}catch(t){s=[6,t],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}};function o(t){return{type:"String",basicValue:t}}function a(t){return 0==t.length?e.proxy_empty_array:{type:"Array",elements:t}}function i(t){if(null==t)return e.proxy_empty_array;switch(typeof t){case"boolean":return{type:"Boolean",basicValue:t};case"string":return{type:"String",basicValue:t};case"number":return{type:"Double",basicValue:t};case"object":if(t.constructor===Array){var r=t.length;if(0==r)return e.proxy_empty_array;for(var n=new Array(r),o=0;o<r;o++)n[o]=[s(t[o])];return a(n)}var c=t,u="",l={};for(var p in c)if(c.hasOwnProperty(p)){for(var g=p.toLowerCase();l.hasOwnProperty(g);)g+="9";var d=c[p];l[g]=i(d);var f=typeof d,h=g+("boolean"===f||"number"===f||"string"===f?"="+d.toString():"");u=""==u?h:u+","+h}return{type:"Entity",basicType:"Error",basicValue:"#VALUE!",text:u,properties:l};default:return{type:"String",basicValue:"DEFAULT - unexpected"}}}function s(t){if(null==t)return e.proxy_empty_array;var r=i(t);return"object"==typeof t&&t.constructor===Array?{type:"Entity",basicType:"Error",basicValue:"#VALUE!",text:"Nested array",properties:{array:r}}:r}function c(t){var e=new Date(t);return{type:"FormattedNumber",basicValue:25569+(e.getTime()-60*e.getTimezoneOffset()*1e3)/864e5,numberFormat:"yyyy-mm-dd"}}Object.defineProperty(e,"__esModule",{value:!0}),e.number_to_amount=e.string_to_date=e.value_to_excel=e.mk_ExcelArray=e.proxy_empty_array=e.mk_ExcelDouble=e.mk_ExcelString=e.nullErrorValue=void 0,e.nullErrorValue={type:"Error",basicType:"Error",basicValue:"#NULL!"},e.mk_ExcelString=o,e.mk_ExcelDouble=function(t){return{type:"Double",basicValue:t}},e.proxy_empty_array=o("<Empty array>"),e.mk_ExcelArray=a,e.value_to_excel=i,e.string_to_date=c,e.number_to_amount=function(t,e){return{type:"FormattedNumber",basicValue:t,numberFormat:"GBP"==e?"£* #,##0.00":"* #,##0.00",propertyMetadata:{sublabel:e}}},CustomFunctions.associate("GET_JSON",(function(t){return r(this,void 0,void 0,(function(){var e,r,o;return n(this,(function(n){switch(n.label){case 0:e={method:"GET"},n.label=1;case 1:return n.trys.push([1,4,,5]),[4,fetch(t,e)];case 2:if(!(r=n.sent()).ok)throw new Error("Error! status: ".concat(r.status));return[4,r.json()];case 3:return[2,i(n.sent())];case 4:return o=n.sent(),console.log(o),[2,i("caught: "+o.message)];case 5:return[2]}}))}))})),CustomFunctions.associate("GET_JSON_LINES",(function(t){return r(this,void 0,void 0,(function(){var e,r,o,a,s,c,u,l;return n(this,(function(n){switch(n.label){case 0:e={method:"GET"},n.label=1;case 1:return n.trys.push([1,5,,6]),[4,fetch(t,e)];case 2:if(!(r=n.sent()).ok)throw new Error("Error! status: ".concat(r.status));return[4,r.text()];case 3:return[4,n.sent().split("\n")];case 4:for(o=n.sent(),a=o.length-1,s=new Array(a),c=0;c<a;c++){u=o[c];try{s[c]=JSON.parse(o[c])}catch(t){s[c]="error parsing: "+u+"length "+u.length}}return[2,i({lines:s})];case 5:return l=n.sent(),console.log(l),[2,i("caught: "+l.message)];case 6:return[2]}}))}))})),CustomFunctions.associate("POST_JSON",(function(t,e){return r(this,void 0,void 0,(function(){var r,o,a;return n(this,(function(n){switch(n.label){case 0:r={method:"POST",headers:{"Content-Type":"application/json"},body:e},n.label=1;case 1:return n.trys.push([1,4,,5]),[4,fetch(t,r)];case 2:if(!(o=n.sent()).ok)throw new Error("Error! status: ".concat(o.status));return[4,o.json()];case 3:return[2,i(n.sent())];case 4:return a=n.sent(),console.log(a),[2,i("caught: "+a.message)];case 5:return[2]}}))}))})),CustomFunctions.associate("ENCODEURI",(function(t){return encodeURIComponent(t)})),CustomFunctions.associate("PARSE_JSON",(function(t){return i(JSON.parse(t))})),CustomFunctions.associate("STRING_TO_DATE",c)}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return t[n].call(a.exports,a,a.exports,r),a.exports}r(6229),r(80490),r(36133)}();
//# sourceMappingURL=functions.js.map