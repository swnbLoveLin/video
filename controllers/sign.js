/*
 *       登录模块
 */
const fs = require('fs');
const path = require('path');
const config = require('../config');
const func = async ctx => {
    const log = () => {
        ctx.status = 200;
        ctx.type = 'text/html;charset=utf-8';
        const p = path.join(__dirname, '..', 'views/sign.html');
        console.log(p, ':sign.js 11');
        ctx.body = fs.createReadStream(p, 'utf-8');
    };
    ctx.cookies.get('username') ? ctx.redirect('/index.swnb') : log();
};

const func_post = async ctx => {
    const name = ctx.request.body.fields.username;
    console.log(name, 'sign : sign.js 18');
    const config = path.join(__dirname, '..', 'config.js');
    let expires = require(config).cookies_expires;
    expires = new Date(Date.now() + expires);
    ctx.cookies.set('username', name, {
        expires,
        httpOnly: true
    });
    ctx.cookies.set('id', Math.floor(Math.random() * config.maxUserNumber), {
        expires,
        httpOnly: true
    });
    ctx.redirect('/index.swnb');
};

module.exports = {
    pathName: '/sign.swnb',
    get: func,
    post: func_post
};
