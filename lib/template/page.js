var template1 = 'import Vue from \'vue\' \n\
               import App from \'../src/'
var template2 = '\' \n\
                export function createApp () { \n\
                const app = new Vue({ \n\
                render: h => h(App) \n\
                }) \n\
                return { app } \n\
                } \n'

module.exports = function (name) {
    return template1 + name + template2
}