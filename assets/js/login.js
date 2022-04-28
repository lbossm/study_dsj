(function() {
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
})()