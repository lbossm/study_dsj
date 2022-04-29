window.onload = function() {
    //获取元素
    var login = document.querySelector('#login');
    var reg = document.querySelector('#reg');
    //连接到注册表单
    document.querySelector('#link_reg').addEventListener('click', function() {
        login.style.display = 'none';
        reg.style.display = 'block';
    });
    //连接到登入表单
    document.querySelector('#link_login').addEventListener('click', function() {
        reg.style.display = 'none';
        login.style.display = 'block';
    });
    //自定义校验规则
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须是六到十二位'],
        repwd: function(value) {
            var repassword = document.querySelector('#reg').querySelectorAll('input')[1];
            if (repassword.value !== value) {
                return '两次密码不一致';
            }
        }
    });

    //layui提示
    var layer = layui.layer;



    //注册表单的提交   
    //获取注册表单元素
    var regForm = document.querySelector('#reg-form');
    //发起post请求
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        //建立表单管理对象来接收表单的数据
        let rf = new FormData(regForm);
        //创建xmlhttprequest对象
        let rxmr = new XMLHttpRequest();
        rxmr.open('POST', 'http://www.liulongbin.top:3007/api/reguser');
        rxmr.setRequestHeader('Content-Type',  'application/x-www-form-urlencoded')
        rxmr.send('username=' + rf.get('username') + '&password=' + rf.get('password'));
        rxmr.onreadystatechange = function() {
            if (rxmr.readyState === 4 && rxmr.status === 200) {
                let sta = JSON.parse(rxmr.responseText).status;
                let mes = JSON.parse(rxmr.responseText).message;
                if (sta !== 0) {
                    return layer.msg(mes);
                }
                layer.msg(mes);
                regForm.reset();
                document.querySelector('#link_login').click();
            }
        }
    });

    //登入表单的提交
    //获取登入表单元素
    var loginForm = document.querySelector('#login-form');
    //发起post请求
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        //建立表单管理对象来接收表单的数据
        let rf = new FormData(loginForm);
        //创建xmlhttprequest对象
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://www.liulongbin.top:3007/api/login');
        xhr.setRequestHeader('Content-Type',  'application/x-www-form-urlencoded');
        // xhr.send(rf);
        xhr.send('username=' + rf.get('username') + '&password=' + rf.get('password'));
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
                loginForm.reset();

            }
        }
    });
}