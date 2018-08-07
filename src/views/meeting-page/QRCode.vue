<template>
  <div class="animated fadeIn">
    <Table :columns="columns1" :data="data1"></Table>
    <Modal v-model="img" title="二维码图片">
        <img style="margin-left:40px;margin-right:50px;" id="img" width="400" height="400">
        <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
    data () {
        return {
            columns1: [
                {title: '序号', type: 'index', width: 100, align: 'center'},
                {title: '人员分类', key: 'person', width: 600, align: 'center'},
                { title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '20px'
                                },
                                on: {
                                    click: () => {
                                        this.create(params.row);
                                    }
                                }
                            }, '创建二维码'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.search(params.row);
                                    }
                                }
                            }, '查看二维码')
                        ]);
                    }
                }
            ],
            img: false
        };
    },
    methods: {
        create (row) {
            let this_ = this;
            this.$ajax.post('qrcode/add',
                'photo_name=' + row._index)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('二维码创建成功');
                    } else {
                        this_.$Message.info('二维码创建失败');
                    }
                });
        },
        search (row) {
            let this_ = this;
            this.$ajax.post('qrcode/getData',
                'photo_name=' + row._index)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        let src = this_.url + '/meet/qrcodeimage/' + row._index + '.png';
                        document.getElementById('img').src = src;
                        this_.img = true;
                    } else {
                        this_.$Message.info('请先创建二维码');
                    }
                });
        }
    },
    computed: {
        data1: function () {
            let data = [{'person': '基本人员二维码'}, {'person': '工作人员二维码'}];
            return data;
        }
    }
};
</script>