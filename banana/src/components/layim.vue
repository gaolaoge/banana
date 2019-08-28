<template>
    <div></div>
</template>

<script>
export default {
    name: 'layim',
    data() {
        return {

        }
    },
    created() {
        let t = JSON.parse(sessionStorage.getItem('im')),
            self_ = t['个人信息'],
            friend_group = t['好友列表'],
            fri_ = [],
            group_r = t['群组列表'],
            group_ = []
        // console.log(group_r)
        //循环添加好友
        Object.keys(friend_group).forEach(current_ => {
            let group_ = {
                'groupname': current_.split('- #cust.8080# -')[0],
                'id': current_.split('- #cust.8080# -')[1],
                'list': []
            }
            friend_group[current_].forEach(curr_ => {
                group_['list'].push({
                    'username': curr_.userName,
                    'id': curr_.userId,
                    'avatar': curr_.userHeadPortrait,
                    'sign': curr_.userSign,
                    'status': curr_.userstatus,
                })
            })
            fri_.push(group_)
        })
        //添加组
        group_r.forEach(current_ => {
            group_.push({
                "groupname": current_.groupName, //群组名
                "id": current_.groupId, //群组ID
                "avatar": current_.groupHeadPortrait //群组头像
            })
            // group_.push(r)
        })

        layui.use('layim', function (layim) {
            //先来个客服模式压压精
            layim.config({
                brief: false,        //是否简约模式（如果true则不显示主面板）
                title: self_.userName,
                copyright: true,
                //扩展工具栏
                tool: [{
                    alias: 'code'
                    , title: '发送文件'
                    , icon: '&#xe621;'
                }],
                init: {
                    mine: {
                        "username": self_.userName, //我的昵称
                        "id": self_.userId, //我的ID
                        "status": self_.userstatus, //在线状态 online：在线、hide：隐身
                        "remark": self_.userSign, //我的签名
                        "avatar": self_.userHeadPortrait, //我的头像
                    },
                    // friend: [
                    //     {
                    //         "groupname": "前端码农" //好友分组名
                    //         , "id": 1 //分组ID
                    //         , "list": [
                    //             { //分组下的好友列表
                    //                 "username": "贤心" //好友昵称
                    //                 , "id": "100001" //好友ID
                    //                 , "avatar": "http://b-ssl.duitang.com/uploads/item/201410/30/20141030095508_Y5aQi.jpeg" //好友头像
                    //                 , "sign": "这些都是测试数据，实际使用请严格按照该格式返回" //好友签名
                    //                 , "status": "online" //若值为offline代表离线，online或者不填为在线
                    //             },
                    //         ]
                    //     }
                    // ],
                    friend: fri_,
                    // group: [
                    //     {
                    //         "groupname": "前端群" //群组名
                    //         , "id": "101" //群组ID
                    //         , "avatar": "a.jpg" //群组头像
                    //     }
                    // ],
                    group: group_,
                },
                // find: layui.cache.dir + 'css/modules/layim/html/find.html', //发现页面地址，若不开启，剔除该项即可
                msgbox: '', //消息盒子页面地址，若不开启，剔除该项即可
                chatLog: layui.cache.dir + 'css/modules/layim/html/chatlog.html',
                find: '/find'

            })

            let socket_ = new WebSocket(`ws://192.168.1.90:8089/websocket?id=${JSON.parse(sessionStorage.getItem('im'))['个人信息'].userId}`)

            socket_.addEventListener('open',function(){
                // socket_.send(JSON.stringify({
                //     type: 'string',
                //     data: JSON.parse(sessionStorage.getItem('im'))['个人信息'].userId
                // }))

                // console.log('socket_')

                // socket_.onopen = function(){
                //     console.log('socket_success')
                // }

                // socket_.onmessage = function(res){
                //     console.log('result:' + res)
                // }
            })

            // 接收消息
            socket_.addEventListener('message',function(res){
                // res = JSON.parse(res)
                console.log(res)
            })

            // socket_.onerror = function(e){
            //     console.log('错误:' + e)
            // }

            // 发送消息
            layim.on('sendMessage',function(res){
                res.mine.avatar = ''
                res.to.avatar = ''
                // console.log(res)
                socket_.send(JSON.stringify({
                    type: 'chatMessage',
                    data: res
                }))
            })
        })
    }
}
</script>

<style lang="scss" scoped>
</style>