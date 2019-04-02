// 为表单的必填文本框添加提示信息
$('form :input.required').each(function () {
  // 通过jQuery api: $("HTML字符串") 创建jQuery对象
  var $required = $("<strong class='high'>*</strong>")
  // 添加到this对象的父级对象下
  $(this).parent().append($required)
})

// 为表单的元素添加失去焦点事件
$('form :input').blur(function () {
  var $parent = $(this).parent()
  $parent.find('.errorMsg').remove()
  $parent.find('.okMsg').remove()
  // 验证姓名
  if ($(this).is('#name')) {
    var nameValue = $.trim(this.value)
    var regName = /[~#^$@%&!*()<>:;'"{}【】  ]/
    if (nameValue === '' || nameValue.length < 2 || nameValue.length > 12 || regName.test(nameValue)) {
      var errorMsg = '姓名非空，字节长6~12位，不包含特殊字符！'
      $parent.append('<span class="errorMsg">' + errorMsg + '</span>')
    } else {
      var okMsg = '输入正确!'
      $parent.append('<span class="okMsg">' + okMsg + '</span>')
    }
  }

  if ($(this).is('#email')) {
    var emailVal = $.trim(this.value)
    var regEmail = /^\w{5,10}\@[0-9a-z]{2,5}\.[c,o,m]{3}$/
    console.log(emailVal, regEmail.test(emailVal))
    if (emailVal !== '' && regEmail.test(emailVal)) {
      var okMsg = '输入正确!'
      $parent.append('<span class="okMsg">' + okMsg + '</span>')
    } else {
      var errorMsg = '请输入正确邮箱地址!'
      $parent.append('<span class="errorMsg">' + errorMsg + '</span>')
    }
  }
}).keyup(function () {
  // triggerHandler 防止事件执行完后，浏览器自动为标签获得焦点
  $(this).triggerHandler('blur')
}).focus(function () {
  $(this).triggerHandler('blur')
})

// 点击重置按钮时，通过trigger()来触发文本框的失去焦点事件
$("#send").click(function(){
  // trigger 事件执行完后，浏览器会为submit按钮获得焦点
  $("form .required:input").trigger("blur"); 
  var numError = $("form .onError").length;
  if(numError){
      return false;
  }
  alert("注册成功！")
})
