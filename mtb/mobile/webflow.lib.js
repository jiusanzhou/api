// webflow library for javascript
((_, document) => {

// 返回json字符串
const json = (data) => JSON.stringify(data)

// 返回结构化数据
const resp = (data, error=null, next=null) => json({ error, data, next })

// 抓取订单
async function _mtb_fetch_order(page = 1) {
    let r = await fetch(
      'https://buyertrade.taobao.com/trade/itemlist/asyncBought.htm?action=itemlist/BoughtQueryAction&event_submit_do_query=1&_input_charset=utf8',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: 'pageNum=' + page + '&pageSize=15',
      })
    return await r.json()
}

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
    let tmp = document.querySelector('#ah:addressForm')
    if ( !tmp ) return resp(null, "查询DOM节点失败")
    let data = {
        realname: tmp.querySelector('li:nth-child(1) > strong').innerText,
        email: tmp.querySelector('li:nth-child(2) > strong').innerText,
        gender: tmp.querySelector('li:nth-child(3) > input[type=hidden]').getAttribute('value'),
    }
    return resp(data)
}

// 账户安全信息
_._msecurity = () => {
    let tmp = document.querySelector('#main-content > dl > dd:nth-child(2) > ul')
    if ( !tmp ) return resp(null, "查询DOM节点失败")
    let data = {
        account: tmp.querySelector('li:nth-child(1) > span.default.grid-msg').innerText,
        email: tmp.querySelector('li:nth-child(2) > span.default.grid-msg').innerText,
        phone: tmp.querySelector('li:nth-child(4) > span.default.grid-msg').innerText,
        // TODO: 淘气值
    }
    return resp(data)
}

// 实名认证信息
_._mcertify = () => {
    let tmps = document.querySelectorAll('#main-content > div > div.certify-info > div.msg-box-content > .explain-info')
    let data = {
        idcard_infos: Array.from(tmps).map(i => i.innerText),
    }
    return resp(data)
}

// 淘气值
_._mrate = () => {
    let tmp = document.querySelector('#new-rate-content > div.clearfix.personal-info > div.personal-rating')
    let data = {
        summary: tmp.querySelector('p:nth-child(7) > strong').innerText,
        ratings: Array.from(tmp.querySelectorAll('table:nth-child(8) > tbody > tr:nth-child(4)').children).map(i => i.innerText).slice(1),
    }
    return resp(data)
}

// 收获地址
_._maddress = () => {
    let tmps = document.querySelectorAll('#container > div > div.addressList > div.next-table > table > tbody > tr')
    let data = {
        address: Array.from(tmps).map(i => Array.from(i.querySelectorAll('td')).map(i => i.innerText).slice(0, -2))
    }
    return resp(data)
}

// 订单列表
_._morder = () => {
    // TODO: 请求订单
}

})(window, document)