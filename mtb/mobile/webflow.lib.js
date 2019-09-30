// webflow library for javascript
((_, document) => {

const json = (data) => JSON.stringify(data)

const resp = (data, error=null, next=null) => json({ error, data, next })

// 登录页(h5)
_._mlogin = () => {
    return resp(null, "无需执行任务")
}

// 个人主页(h5)
_._mhome = () => {
    let tmp = document.querySelector('body > div.page-container > div.main-layout > div:nth-child(1) > div > div:nth-child(2)')
    if ( !tmp ) return resp(null, "查询DOM节点失败")
    let data = {
        nickname: tmp.querySelector('span').textContent,
        logo: tmp.querySelector('div:nth-child(1) > div > div').style.backgroundImage.slice(5, -2),
    }
    return resp(data)
}

// 个人基础信息
_._mprofile = () => {

}

// 账户安全信息
_._msecurity = () => {

}

// 实名认证信息
_._mcertify = () => {

}

// 淘气值
_._mrate = () => {

}

// 收获地址
_._maddress = () => {

}

// 订单列表
_._morder = () => {

}
})(window, document)