(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{cq3J:function(e,t,s){"use strict";s.r(t);s("14J3");var r,i,a,c=s("BMrR"),l=(s("+L6B"),s("2/Rp")),o=(s("jCWc"),s("kPKH")),n=(s("Q9mQ"),s("diRs")),d=(s("MXD1"),s("CFYs")),h=s("k1fw"),p=(s("5NDa"),s("5rEg")),j=(s("OaEy"),s("2fM7")),b=(s("y8nQ"),s("Vl3Y")),m=s("q1tI"),g=s("9kvl"),u=s("QttV"),v=s("Vt2j"),O=s.n(v),x=s("nKUr"),f=b["a"].Item,w=j["a"].Option,y=p["a"].Group,k={ok:Object(x["jsx"])("div",{className:O.a.success,children:Object(x["jsx"])(g["a"],{id:"validation.password.strength.strong"})}),pass:Object(x["jsx"])("div",{className:O.a.warning,children:Object(x["jsx"])(g["a"],{id:"validation.password.strength.medium"})}),poor:Object(x["jsx"])("div",{className:O.a.error,children:Object(x["jsx"])(g["a"],{id:"validation.password.strength.short"})})},S={ok:"success",pass:"normal",poor:"exception"},P=(r=Object(g["b"])((e=>{var t=e.register,s=e.loading;return{register:t,submitting:s.effects["register/submit"]}})),i=b["a"].create(),r(a=i(a=class extends m["Component"]{constructor(){super(...arguments),this.state={count:0,confirmDirty:!1,visible:!1,help:"",prefix:"86"},this.onGetCaptcha=()=>{var e=59;this.setState({count:e}),this.interval=setInterval((()=>{e-=1,this.setState({count:e}),0===e&&clearInterval(this.interval)}),1e3)},this.getPasswordStatus=()=>{var e=this.props.form,t=e.getFieldValue("password");return t&&t.length>9?"ok":t&&t.length>5?"pass":"poor"},this.handleSubmit=e=>{e.preventDefault();var t=this.props,s=t.form,r=t.dispatch;s.validateFields({force:!0},((e,t)=>{if(!e){var s=this.state.prefix;r({type:"register/submit",payload:Object(h["a"])(Object(h["a"])({},t),{},{prefix:s})})}}))},this.handleConfirmBlur=e=>{var t=e.target.value,s=this.state.confirmDirty;this.setState({confirmDirty:s||!!t})},this.checkConfirm=(e,t,s)=>{var r=this.props.form;t&&t!==r.getFieldValue("password")?s(Object(g["c"])({id:"validation.password.twice"})):s()},this.checkPassword=(e,t,s)=>{var r=this.state,i=r.visible,a=r.confirmDirty;if(t)if(this.setState({help:""}),i||this.setState({visible:!!t}),t.length<6)s("error");else{var c=this.props.form;t&&a&&c.validateFields(["confirm"],{force:!0}),s()}else this.setState({help:Object(g["c"])({id:"validation.password.required"}),visible:!!t}),s("error")},this.changePrefix=e=>{this.setState({prefix:e})},this.renderPasswordProgress=()=>{var e=this.props.form,t=e.getFieldValue("password"),s=this.getPasswordStatus();return t&&t.length?Object(x["jsx"])("div",{className:O.a["progress-".concat(s)],children:Object(x["jsx"])(d["a"],{status:S[s],className:O.a.progress,strokeWidth:6,percent:10*t.length>100?100:10*t.length,showInfo:!1})}):null}}componentDidUpdate(){var e=this.props,t=e.form,s=e.register,r=t.getFieldValue("mail");"ok"===s.status&&g["e"].push({pathname:"/user/register-result",state:{account:r}})}componentWillUnmount(){clearInterval(this.interval)}render(){var e=this.props,t=e.form,s=e.submitting,r=t.getFieldDecorator,i=this.state,a=i.count,d=i.prefix,h=i.help,m=i.visible;return Object(x["jsxs"])("div",{className:O.a.main,children:[Object(x["jsx"])("h3",{children:Object(x["jsx"])(g["a"],{id:"app.register.register"})}),Object(x["jsxs"])(b["a"],{onSubmit:this.handleSubmit,children:[Object(x["jsx"])(f,{children:r("mail",{rules:[{required:!0,message:Object(g["c"])({id:"validation.email.required"})},{type:"email",message:Object(g["c"])({id:"validation.email.wrong-format"})}]})(Object(x["jsx"])(p["a"],{size:"large",placeholder:Object(g["c"])({id:"form.email.placeholder"})}))}),Object(x["jsx"])(f,{help:h,children:Object(x["jsx"])(n["a"],{getPopupContainer:e=>e.parentNode,content:Object(x["jsxs"])("div",{style:{padding:"4px 0"},children:[k[this.getPasswordStatus()],this.renderPasswordProgress(),Object(x["jsx"])("div",{style:{marginTop:10},children:Object(x["jsx"])(g["a"],{id:"validation.password.strength.msg"})})]}),overlayStyle:{width:240},placement:"right",visible:m,children:r("password",{rules:[{validator:this.checkPassword}]})(Object(x["jsx"])(p["a"],{size:"large",type:"password",placeholder:Object(g["c"])({id:"form.password.placeholder"})}))})}),Object(x["jsx"])(f,{children:r("confirm",{rules:[{required:!0,message:Object(g["c"])({id:"validation.confirm-password.required"})},{validator:this.checkConfirm}]})(Object(x["jsx"])(p["a"],{size:"large",type:"password",placeholder:Object(g["c"])({id:"form.confirm-password.placeholder"})}))}),Object(x["jsx"])(f,{children:Object(x["jsxs"])(y,{compact:!0,children:[Object(x["jsxs"])(j["a"],{size:"large",value:d,onChange:this.changePrefix,style:{width:"20%"},children:[Object(x["jsx"])(w,{value:"86",children:"+86"}),Object(x["jsx"])(w,{value:"87",children:"+87"})]}),r("mobile",{rules:[{required:!0,message:Object(g["c"])({id:"validation.phone-number.required"})},{pattern:/^\d{11}$/,message:Object(g["c"])({id:"validation.phone-number.wrong-format"})}]})(Object(x["jsx"])(p["a"],{size:"large",style:{width:"80%"},placeholder:Object(g["c"])({id:"form.phone-number.placeholder"})}))]})}),Object(x["jsx"])(f,{children:Object(x["jsxs"])(c["a"],{gutter:8,children:[Object(x["jsx"])(o["a"],{span:16,children:r("captcha",{rules:[{required:!0,message:Object(g["c"])({id:"validation.verification-code.required"})}]})(Object(x["jsx"])(p["a"],{size:"large",placeholder:Object(g["c"])({id:"form.verification-code.placeholder"})}))}),Object(x["jsx"])(o["a"],{span:8,children:Object(x["jsx"])(l["a"],{size:"large",disabled:a,className:O.a.getCaptcha,onClick:this.onGetCaptcha,children:a?"".concat(a," s"):Object(g["c"])({id:"app.register.get-verification-code"})})})]})}),Object(x["jsxs"])(f,{children:[Object(x["jsx"])(l["a"],{size:"large",loading:s,className:O.a.submit,type:"primary",htmlType:"submit",children:Object(x["jsx"])(g["a"],{id:"app.register.register"})}),Object(x["jsx"])(u["Link"],{className:O.a.login,to:"/User/Login",children:Object(x["jsx"])(g["a"],{id:"app.register.sign-in"})})]})]})]})}})||a)||a);t["default"]=P}}]);