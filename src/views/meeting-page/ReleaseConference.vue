<template>
    <div>
        <Row>
            <Card id="a">
                <tr>
                    <Button style="margin-left:50px;margin-bottom:15px;" type="primary" @click="New()">选择发布模板</Button>
                    <Button style="margin-left:600px;margin-bottom:15px;" type="primary" @click="NewSign()">选择签到模板</Button>
                </tr>
                <tr>
                    <img :src="releasephoto" style="margin-left:50px;margin-right:50px;" width="300" height="200">
                    <input type="text" v-model="releasephotoid" style="display:none" />

                    <img :src="signinphoto" style="margin-left:350px;margin-right:50px;" width="300" height="200">
                    <input type="text" v-model="signinphotoid" style="display:none" />
                </tr>
                <tr>
                    <font style="margin-left:50px;font-weight:bold;">请输入发布内容:</font>
                    <font style="margin-left:600px;font-weight:bold;">请输入签到内容:</font>
                </tr>
                <tr>
                    <!-- <Input v-model="releasetext" type="textarea" style="width:300px;height:60px;margin-left:50px;" placeholder="请输入发布内容..."></Input> -->
                    <textarea v-model="releasetext" style="width:300px;height:60px;margin-left:50px;margin-top:5px;" placeholder="请输入发布内容..."></textarea>

                    <textarea v-model="signintext" style="width:300px;height:60px;margin-left:400px;margin-top:5px;" placeholder="请输入签到内容..."></textarea>
                </tr>
                
                <tr>
                    <font style="margin-left:50px;font-weight:bold;margin-top:5px;">请输入发布url地址:</font>
                    <font style="margin-left:580px;font-weight:bold;margin-top:5px;">请输入签到url地址:</font>
                </tr>
                <tr>
                    <input type="text" v-model="releaseurl" style="width:400px;margin-left:50px;margin-top:5px;margin-bottom:5px;">
                    <input type="text" v-model="signinurl" style="width:400px;margin-left:300px;margin-top:5px;margin-bottom:5px;">
                </tr>
                <tr>
                    <Button style="float:right;margin-top:15px;" type="primary" @click="nextStep()">下一步</Button>
                </tr>
            </Card>
            <Card id="b" style="display:none">
                <p slot="title" style="height:30px">
                    <Icon type="compose"></Icon>
                    发布会议
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    会议名称：{{this.$route.query.meeting}}
                </p>
                <tr>
                    <td>
                        <Transfer
                            :titles="['所有组', '选择组']"
                            :data="guestgroupPath"
                            :target-keys="targetKeysg"
                            filterable
                            :filter-method="filterMethodg"
                            :render-format="rander_guest"
                            @on-change="handleChangeg" style="margin-left:100px;margin-top:10px;" >
                        </Transfer>
                    </td>
                    <td>
                        <Transfer
                            :titles="['所有人员', '选择人员']"
                            :data="guestpersonlistPath"
                            :target-keys="targetKeysp"
                            filterable
                            :filter-method="filterMethodp"
                            :render-format="rander_guestperson"
                            @on-change="handleChangep" style="margin-left:50px;margin-top:10px;" >
                        </Transfer>
                    </td>
                </tr>
                <tr>
                    <Button style="float:right;margin-top:15px;" type="primary" @click="release()">发布</Button>
                    <Button style="margin-right:50px;float:right;margin-top:15px;" type="primary" @click="laststep()">上一步</Button>
                </tr>
            </Card>
        </Row>
        <Modal v-model="modal" title="发布模板信息" width="700" height="400">
            <Form ref="formItem" :label-width="80">
                <tr>
                    <td>
                        <!-- <form method="post" id="Form" name="Form" enctype="multipart/form-data"> -->
                            <span style="font-size:14px;">选择的图片为360*200</span><br>
                            <input id="file" name="file" class="filepath" @change="changepic(this)" type="file" accept="image/*"></input>
                            <Button style="margin-left:50px;margin-bottom:15px;" type="primary" @click="Uploading()">上传模板</Button>
                            <Button style="margin-left:15px;margin-bottom:15px;" type="primary" @click="Delete()">删除模板</Button>
                            <Button style="margin-left:15px;margin-bottom:15px;" type="primary" @click="Affirm()">确认</Button> 
                            <br>
                            <img :src="show" width="100">
                        <!-- </form> -->
                                        
                    </td>
                </tr>
                <table>
                    <tr>
                        <td>
                            <RadioGroup v-model="status" @on-change="change">
                                <Radio v-for="item in imageData" v-bind:id="item.id" v-bind:label="item.id">
                                    <img v-bind:src="item.address" v-bind:name="item.id" v-bind:alt="item.id" width="100" height="100"/>
                                </Radio>
                            </RadioGroup>
                        </td>
                    </tr>
                </table>
                
            </Form>
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="signin" title="签到模板信息" width="700" height="400">
            <Form ref="formItem" :label-width="80">
                <tr>
                    <td>
                        <span style="font-size:14px;">选择的图片为360*200</span><br>
                        <input id="fileSign" name="fileSign" class="filepath" @change="changepicSign(this)" type="file" accept="image/*"></input>
                        <Button style="margin-left:50px;margin-bottom:15px;" type="primary" @click="UploadingSign()">上传模板</Button>
                        <Button style="margin-left:15px;margin-bottom:15px;" type="primary" @click="DeleteSign()">删除模板</Button>
                        <Button style="margin-left:15px;margin-bottom:15px;" type="primary" @click="AffirmSign()">确认</Button> 
                        <br>
                        <img :src="showSign" width="100">
                    </td>
                </tr>
                <table>
                    <tr>
                        <td>
                            <RadioGroup v-model="statusSign" @on-change="changeSign">
                                <Radio v-for="item in imageDataSign" v-bind:id="item.id" v-bind:label="item.id">
                                    <img v-bind:src="item.address" v-bind:name="item.id" v-bind:alt="item.id" width="100" height="100"/>
                                </Radio>
                            </RadioGroup>
                        </td>
                    </tr>
                </table>
                
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>

export default {
    data () {
        return {
            modal: false,
            signin: false,
            status: '',
            statusSign: '',
            img: '',
            imgSign: '',
            src: '',
            srcSign: '',
            targetKeysg: [],
            targetKeysp: [],
            targetEleg: '',
            targetElep: '',
            imageData: [],
            imageDataSign: [],
            releasephoto:'', // 发布模板src
            releasephotoid:'', //发布模板信息
            signinphoto:'', // 签到模板src
            signinphotoid:'', // 签到模板信息
            releasetext:'', // 发布内容
            signintext:'', // 签到内容
            releaseurl:'', // 发布url跳转地址
            signinurl:'', // 签到url跳转地址
            sendgroup:'', // 发送的组
            sendperson:'', // 发送的人
            show:null,
            showSign:null
        };
    },
    methods: {
        rander_guest (item) {
            return item.group_name;
        },
        rander_guestperson (item) {
            if (item.name !== '' && item.name !== undefined) {
                return item.name;
            } else {
                return item.nickname;
            }
        },
        New () {
            let this_ = this;
            this.$ajax.post('upload/getModelPhoto')
                .then(function (response) {
                    if (!response.data.length) {
                        this_.imageData = [];
                    } else {
                        // 获取到的图片数组处理逻辑方法
                        let d = [];
                        response.data.forEach(function (item) {
                            let image = {
                                address: this_.url + '/meet/files/' + item,
                                id: item
                            };
                            d.push(image);
                        });
                        this_.imageData = d;
                    }
                });

            let t = this.releasephotoid;
            if (t === '') {
                this.status = '';
            } else {
                this.status = t;
            }
            this.modal = true;
        },
        NewSign () {
            let this_ = this;
            this.$ajax.post('upload/getModelPhoto')
                .then(function (response) {
                    if (!response.data.length) {
                        this_.imageDataSign = [];
                    } else {
                        // 获取到的图片数组处理逻辑方法
                        let d = [];
                        response.data.forEach(function (item) {
                            let image = {
                                address: this_.url + '/meet/files/' + item,
                                id: item
                            };
                            d.push(image);
                        });
                        this_.imageDataSign = d;
                    }
                });

            let t = this.signinphotoid;
            if (t === '') {
                this.statusSign = '';
            } else {
                this.statusSign = t;
            }
            this.signin = true;
        },
        changepic () {
            let this_ = this;
            let reads = new FileReader();
            let f = document.getElementById('file').files[0];
            reads.readAsDataURL(f);
            reads.onload = function (e) {
                this_.show = this.result;
            };
        },
        changepicSign () {
            let this_ = this;
            let reads = new FileReader();
            let f = document.getElementById('fileSign').files[0];
            reads.readAsDataURL(f);
            reads.onload = function (e) {
                this_.showSign = this.result;
            };
        },
        Uploading () {
            var formData = new FormData();
            let files = document.getElementById('file');
            formData.append('file', files.files[0]);
            if (files.files.length === 0) {
                this.$Message.info('请选择图片！！');
            } else {
                let this_ = this;
                this.$ajax.post('upload/uploadFile', formData)
                    .then(function (response) {
                        if (response.data.errorCode === 0) {
                            this_.$Message.info('上传成功');
                            this_.New();
                            this_.status = '';
                            // this_.NewSign();
                            // this_.statusSign = '';
                            // this_.signin = false;
                        } else {
                            this_.$Message.info('上传失败');
                        }
                    });
            }
        },
        UploadingSign () {
            var formData = new FormData();
            let files = document.getElementById('fileSign');
            formData.append('file', files.files[0]);
            if (files.files.length === 0) {
                this.$Message.info('请选择图片！！');
            } else {
                let this_ = this;
                this.$ajax.post('upload/uploadFile', formData)
                    .then(function (response) {
                        if (response.data.errorCode === 0) {
                            this_.$Message.info('上传成功');
                            // this_.New();
                            // this_.status = '';
                            this_.NewSign();
                            this_.statusSign = '';
                            // this_.modal = false;
                        } else {
                            this_.$Message.info('上传失败');
                        }
                    });
            }
        },
        Affirm () {
            if (this.status === '') {
                this.$Message.info('请选择发布模板！！');
            }
            let src = document.getElementsByName(this.status)[0].src;
            this.releasephoto = src;
            this.releasephotoid = this.status;
            this.modal = false;
        },
        AffirmSign () {
            if (this.statusSign === '') {
                this.$Message.info('请选择签到模板！！');
            }
            let src = document.getElementsByName(this.statusSign)[0].src;
            this.signinphoto = src;
            this.signinphotoid = this.statusSign;
            this.signin = false;
        },
        change (row) {
            this.status = row;
        },
        changeSign (row) {
            this.statusSign = row;
        },
        Delete () {
            let this_ = this;
            this.$ajax.post('upload/deleteModelPhoto', 'name=' + this_.status)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('删除成功');
                        this_.New();
                        this_.status = '';
                        this_.releasephoto = '';
                        this_.releasephotoid = '';
                        this_.NewSign();
                        this_.statusSign = '';
                        this_.signinphoto = '';
                        this_.signinphotoid = '';
                        this_.signin = false;
                    } else {
                        this_.$Message.info('删除失败');
                    }
                });
        },
        DeleteSign () {
            let this_ = this;
            this.$ajax.post('upload/deleteModelPhoto', 'name=' + this_.statusSign)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('删除成功');
                        this_.New();
                        this_.status = '';
                        this_.releasephoto = '';
                        this_.releasephotoid = '';
                        this_.NewSign();
                        this_.statusSign = '';
                        this_.signinphoto = '';
                        this_.signinphotoid = '';
                        this_.modal = false;
                    } else {
                        this_.$Message.info('删除失败');
                    }
                });
        },
        nextStep () {
            let t = this.releasephotoid;
            let src = this.releasephoto;
            let text = this.releasetext;
            let url = this.releaseurl;

            let tSign = this.signinphotoid;
            let srcSign = this.signinphoto;
            let textSign = this.signintext;
            let urlSign = this.signinurl;
            this.$Message.config({
                top: 50,
                duration: 3,
                width: 200
            });
            if (t === '') {
                this.$Message.info('请选择发布模板！！');
                return false;
            }
            if (text === '') {
                this.$Message.info('请您输入发布内容！！');
                return false;
            }
            if (url === '') {
                this.$Message.info('请您输入发布地址！！');
                return false;
            }
            if (tSign === '') {
                this.$Message.info('请选择签到模板！！');
                return false;
            }
            if (textSign === '') {
                this.$Message.info('请您输入签到内容！！');
                return false;
            }
            if (urlSign === '') {
                this.$Message.info('请您输入签到地址！！');
                return false;
            }

            document.getElementById('a').style.display = 'none';
            document.getElementById('b').style.display = 'block';
            this.src = src;
            this.img = t;
            this.srcSign = srcSign;
            this.imgSign = tSign;

            let group = this.sendgroup;
            let resultg = [];
            if(group != null && group != undefined) {
                resultg = group.split(",");
            }
            let person = this.sendperson;
            let resultp = [];
            if(person != null && person != undefined) {
                resultp = person.split(",");
            }
            this.targetKeysg = this.getTargetKeysG(1, resultg);
            this.targetEleg = group;
            this.targetKeysp = this.getTargetKeysP(1, resultp);
            this.targetElep = person;
        },
        laststep () {
            document.getElementById('a').style.display = 'block';
            document.getElementById('b').style.display = 'none';
        },
        filterMethodg (data, query) {
            return data.group_name.indexOf(query) > -1;
        },
        filterMethodp (data, query) {
            if (data.name !== '' && data.name !== undefined) {
                return data.name.indexOf(query) > -1;
            } else {
                return data.nickname.indexOf(query) > -1;
            }
        },
        getTargetKeysG (a, result) {
            if (a === 0) {
                return this.guestgroupPath.filter(item => item.key);
            } else if (a === 1) {
                let ary = [];
                for (let i = 0; i < result.length; i++) {
                    ary.push(result[i]);
                }
                return ary;
            }
        },
        handleChangeg (newTargetKeys) {
            let targetEleg = '';
            for (let i = 0; i < this.guestgroupPath.length; i++) {
                // 目标列表数据
                for (var j = 0; j < newTargetKeys.length; j++) {
                    if (this.guestgroupPath[i].key === newTargetKeys[j]) {
                        targetEleg += this.guestgroupPath[i].key + ',';
                    }
                }
            }
            this.targetEleg = targetEleg.substring(0, targetEleg.length - 1);
            this.targetKeysg = newTargetKeys;
        },
        getTargetKeysP (a, result) {
            if (a === 0) {
                return this.guestpersonlistPath.filter(item => item.key);
            } else if (a === 1) {
                let ary = [];
                for (let i = 0; i < result.length; i++) {
                    ary.push(result[i]);
                }
                return ary;
            }
        },
        handleChangep (newTargetKeys) {
            let targetElep = '';
            for (let i = 0; i < this.guestpersonlistPath.length; i++) {
                // 目标列表数据
                for (var j = 0; j < newTargetKeys.length; j++) {
                    if (this.guestpersonlistPath[i].key === newTargetKeys[j]) {
                        targetElep += this.guestpersonlistPath[i].key + ',';
                    }
                }
            }
            this.targetElep = targetElep.substring(0, targetElep.length - 1);
            this.targetKeysp = newTargetKeys;
        },
        release () {
            let text = this.releasetext;
            let url = this.releaseurl;
            let textSign = this.signintext;
            let urlSign = this.signinurl;
            this.$Message.config({
                top: 50,
                duration: 3,
                width: 200
            });
            if ((this.targetEleg === '' || this.targetEleg === undefined || this.targetEleg === 'undefined')  
                && (this.targetElep === '' || this.targetElep === undefined || this.targetElep ==='undefined')) {
                this.$Message.info('请您至少选择一个组或人！！');
                return false;
            }
            let this_ = this;
            this.$ajax.post('sendinfo/releaseconference',
                'img=' + this_.src + '&text=' + text + '&url=' + url +
                '&group=' + this_.targetEleg + '&person=' + this_.targetElep + '&meetid=' + this_.$route.query.sceneid +
                '&imgSign=' + this_.srcSign + '&textSign=' + textSign + '&urlSign=' + urlSign +
                '&status=' + this_.status + '&statusSign=' + this_.statusSign)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('发布成功');
                    } else {
                        this_.$Message.info('发布失败');
                    }
                });
        }
    },
    computed: {
        guestgroupPath: function () {
            return this.$store.getters.guestgroupPath;
        },
        guestpersonlistPath: function () {
            return this.$store.getters.guestpersonlistPath;
        }
        // meetData: function () {
        //     let param = this.$route.query.param;
        //     return param;
        // },
    },
    created() {
        let param = this.$route.query.param;
        let releasephoto = "";
        if(param.releasephotoid != null && param.releasephotoid != undefined) {
            releasephoto = this.url + '/meet/files/' + param.releasephotoid;
        }
        this.releasephoto = releasephoto;
        this.releasephotoid = param.releasephotoid;

        let signinphoto = "";
        if(param.signinphotoid != null && param.signinphotoid != undefined) {
            signinphoto = this.url + '/meet/files/' + param.signinphotoid;
        }
        this.signinphoto = signinphoto;
        this.signinphotoid = param.signinphotoid;

        this.releasetext = param.releasetext;
        this.signintext = param.signintext;

        let releaseurl = "";
        if(param.releaseurl != null && param.releaseurl != undefined) {
            releaseurl = param.releaseurl.substring(0,param.releaseurl.indexOf("?"));
        }
        this.releaseurl = releaseurl;

        let signinurl = "";
        if(param.signinurl != null && param.signinurl != undefined) {
            signinurl = param.signinurl.substring(0,param.signinurl.indexOf("?"));
        }
        this.signinurl = signinurl;
        this.sendgroup = param.sendgroup;
        this.sendperson = param.sendperson;
    }
};
</script>
