<template>
    <div>
        <Row>
            <Card id="a">
                <p slot="title" style="height:30px">
                    <Icon type="compose"></Icon>
                    发布会议
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    会议名称：{{this.$route.query.meeting}}
                </p>
                <tr>
                    <Button style="margin-left:50px;margin-bottom:15px;" type="primary" @click="New()">选择发布模板</Button>
                    <Button style="margin-left:600px;margin-bottom:15px;" type="primary" @click="NewSign()">选择签到模板</Button>
                </tr>
                <tr>
                    <img style="margin-left:50px;margin-right:50px;" id="img" width="300" height="200">
                    <input type="text" id="test" value="" style="display:none" />

                    <img style="margin-left:350px;margin-right:50px;" id="imgSign" width="300" height="200">
                    <input type="text" id="testSign" value="" style="display:none" />
                </tr>
                <tr>
                    <font style="margin-left:50px;font-weight:bold;">请输入发布内容:</font>
                    <font style="margin-left:600px;font-weight:bold;">请输入签到内容:</font>
                </tr>
                <tr>
                    <textarea id="tt" style="width:300px;height:60px;margin-left:50px;margin-top:5px;"></textarea>

                    <textarea id="sign" style="width:300px;height:60px;margin-left:400px;margin-top:5px;"></textarea>
                </tr>
                
                <tr>
                    <font style="margin-left:50px;font-weight:bold;margin-top:5px;">请输入发布url地址:</font>
                    <font style="margin-left:580px;font-weight:bold;margin-top:5px;">请输入签到url地址:</font>
                </tr>
                <tr>
                    <input type="text" id="url" value="" style="width:400px;margin-left:50px;margin-top:5px;margin-bottom:5px;">
                    <input type="text" id="urlSign" value="" style="width:400px;margin-left:300px;margin-top:5px;margin-bottom:5px;">
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
                            <input id="file" name="file" class="filepath" @change="changepic(this)" type="file" accept="image/*"></input>
                            <Button style="margin-left:50px;margin-bottom:15px;" type="primary" @click="Uploading()">上传模板</Button>
                            <Button style="margin-left:15px;margin-bottom:15px;" type="primary" @click="Delete()">删除模板</Button>
                            <Button style="margin-left:15px;margin-bottom:15px;" type="primary" @click="Affirm()">确认</Button> 
                            <br>
                            <img src="" id="show" width="100">
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
                        <input id="fileSign" name="fileSign" class="filepath" @change="changepicSign(this)" type="file" accept="image/*"></input>
                        <Button style="margin-left:50px;margin-bottom:15px;" type="primary" @click="UploadingSign()">上传模板</Button>
                        <Button style="margin-left:15px;margin-bottom:15px;" type="primary" @click="DeleteSign()">删除模板</Button>
                        <Button style="margin-left:15px;margin-bottom:15px;" type="primary" @click="AffirmSign()">确认</Button> 
                        <br>
                        <img src="" id="showSign" width="100">
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
            imageDataSign: []
        };
    },
    methods: {
        rander_guest (item) {
            return item.group_name;
        },
        rander_guestperson (item) {
            return item.name;
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

            let t = document.getElementById('test').value;
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

            let t = document.getElementById('testSign').value;
            if (t === '') {
                this.statusSign = '';
            } else {
                this.statusSign = t;
            }
            this.signin = true;
        },
        changepic () {
            let reads = new FileReader();
            let f = document.getElementById('file').files[0];
            reads.readAsDataURL(f);
            reads.onload = function (e) {
                document.getElementById('show').src = this.result;
            };
        },
        changepicSign () {
            let reads = new FileReader();
            let f = document.getElementById('fileSign').files[0];
            reads.readAsDataURL(f);
            reads.onload = function (e) {
                document.getElementById('showSign').src = this.result;
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
            document.getElementById('img').src = src;
            document.getElementById('test').value = this.status;
            this.modal = false;
        },
        AffirmSign () {
            if (this.statusSign === '') {
                this.$Message.info('请选择签到模板！！');
            }
            let src = document.getElementsByName(this.statusSign)[0].src;
            document.getElementById('imgSign').src = src;
            document.getElementById('testSign').value = this.statusSign;
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
                        document.getElementById('img').src = '';
                        document.getElementById('test').value = '';
                        this_.NewSign();
                        this_.statusSign = '';
                        document.getElementById('imgSign').src = '';
                        document.getElementById('testSign').value = '';
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
                        document.getElementById('img').src = '';
                        document.getElementById('test').value = '';
                        this_.NewSign();
                        this_.statusSign = '';
                        document.getElementById('imgSign').src = '';
                        document.getElementById('testSign').value = '';
                        this_.modal = false;
                    } else {
                        this_.$Message.info('删除失败');
                    }
                });
        },
        nextStep () {
            let t = document.getElementById('test').value;
            let src = document.getElementById('img').src;
            let text = document.getElementById('tt').value;
            let url = document.getElementById('url').value;

            let tSign = document.getElementById('testSign').value;
            let srcSign = document.getElementById('imgSign').src;
            let textSign = document.getElementById('sign').value;
            let urlSign = document.getElementById('urlSign').value;

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
        },
        laststep () {
            document.getElementById('a').style.display = 'block';
            document.getElementById('b').style.display = 'none';
        },
        filterMethodg (data, query) {
            return data.group_name.indexOf(query) > -1;
        },
        filterMethodp (data, query) {
            return data.name.indexOf(query) > -1;
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
            let text = document.getElementById('tt').value;
            let url = document.getElementById('url').value;
            let textSign = document.getElementById('sign').value;
            let urlSign = document.getElementById('urlSign').value;
            this.$Message.config({
                top: 50,
                duration: 3,
                width: 200
            });
            if (this.targetEleg === '' && this.targetElep === '') {
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
    }
};
</script>
