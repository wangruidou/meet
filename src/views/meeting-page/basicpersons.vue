<template>
  <div class="animated fadeIn">
    <div class="ivu-row">
        <Row>
            <Col span="6">
                <AutoComplete v-model="value" :data="searchPersonList" @on-search="searchPerson" placeholder="查询人员"></AutoComplete>                
            </Col>
            <!-- <Col span="4" offset="14">
                <Button type="primary" @click="addPerson('personValidate')">添加人员</Button>
            </Col> -->
            <Col span="4" offset="14">
                <Button type="primary" @click="q()">详细查询</Button>
            </Col>
        </Row>
    </div>
    <br>
    <Table highlight-row ref="personRowTable" :columns="personColumns" :data="person_data"></Table>
    <br>
    <Page :total="pageTotal" :page-size="pageSize" :current="pageNumber" size="small" class="paging" show-total @on-change="handlePage"></Page>
    <Modal v-model="person_modal" title="人员信息">
        <Form ref="personValidate" :model="personValidate" :rules="personRuleValidate" :label-width="80">
            <FormItem label="姓名" prop="name"><Input v-model="personValidate.name" placeholder="请输入姓名..."></Input></FormItem>
            <FormItem label="手机号" prop="phone"><Input v-model="personValidate.phone" placeholder="请输入手机号..."></Input></FormItem>
            <FormItem label="单位" prop="unit"><Input v-model="personValidate.unit" placeholder="请输入单位..."></Input></FormItem>
            <FormItem label="职务" prop="position"><Input v-model="personValidate.position" placeholder="请输入职务..."></Input></FormItem>
            <FormItem>
                <Button type="primary" @click="savePerson('personValidate')">保存</Button>
                <Button type="ghost" @click="resetPerson('personValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <div slot="footer"></div>
    </Modal>

    <Modal v-model="query" title="详细标签查询" width="60%">
        <Form :label-width="110">
            <tr>
                <td>
                    <FormItem label="单位专业">
                        <Select v-model="unitspecialty_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==1" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="单位性质">
                        <Select v-model="unitproperties_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==2" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="行业领域">
                        <Select v-model="industryfield_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==3" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="研究会-职务">
                        <Select v-model="seminar_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==4" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="国际项目">
                        <Select v-model="internationalproject_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==5" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="合作项目">
                        <Select v-model="cooperativeproject_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==6" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="中城轨-成员">
                        <Select v-model="midtownrail_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==8" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="相关学协会">
                        <Select v-model="relatedstudy_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==9" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="我们会议">
                        <Select v-model="ourmeeting_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==10" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="其他会议">
                        <Select v-model="othermeeting_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==11" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="业务来源">
                        <Select v-model="businesssources_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==12" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="国家/地区">
                        <Select v-model="countryregion_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==13" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="城市">
                        <Select v-model="city_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==14" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="当期发行">
                        <Select v-model="currentissue_query" multiple style="width:300px" @on-change="changecurrent(currentissue)">
                            <Option v-for="item in personcontent" v-if="item.type==15" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="是否寄杂志">
                        <Select v-model="magazine_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==16" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="发行方式">
                        <Select v-model="distributionmode_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==17" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="业务员">
                        <Select v-model="salesman_query" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==18" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <FormItem>
                <Button type="primary" @click="savePerson2()" style="margin-left:200px;">查询</Button>
                <Button type="ghost" @click="resetPerson_query()" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <div slot="footer"></div>
    </Modal>
   
   <Modal v-model="detail" title="人员详细信息" width="60%" height="50%">
        <Form ref="personValidate1" :model="personValidate" :label-width="110">
            <tr>
                <td>
                    <FormItem label="移动电话" prop="telephone"><Input v-model="personValidate.telephone" placeholder="请输入移动电话..." style="width:300px;"></Input></FormItem>
                </td>
                <td>
                    <FormItem label="传真" prop="fax"><Input v-model="personValidate.fax" placeholder="请输入传真..." style="width:300px;"></Input></FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="电子邮件" prop="email"><Input v-model="personValidate.email" placeholder="请输入电子邮件..." style="width:300px;"></Input></FormItem>
                </td>
                <td>
                    <FormItem label="地址" prop="location"><Input v-model="personValidate.location" placeholder="请输入地址..." style="width:300px;"></Input></FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="邮政编码" prop="postcode"><Input v-model="personValidate.postcode" placeholder="请输入邮政编码..." style="width:300px;"></Input></FormItem>
                </td>
                <td>
                    <FormItem label="研究会-职务" prop="seminar">
                        <Select v-model="seminar" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==4" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="单位性质" prop="unitproperties">
                        <Select v-model="unitproperties" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==2" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="单位专业" prop="unitspecialty">
                        <Select v-model="unitspecialty" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==1" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="行业领域" prop="industryfield">
                        <Select v-model="industryfield" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==3" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="国际项目" prop="internationalproject">
                        <Select v-model="internationalproject" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==5" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="中城轨-成员" prop="midtownrail">
                        <Select v-model="midtownrail" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==8" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="相关学协会" prop="relatedstudy">
                        <Select v-model="relatedstudy" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==9" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="合作项目" prop="cooperativeproject">
                        <Select v-model="cooperativeproject" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==6" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="我们会议" prop="ourmeeting">
                        <Select v-model="ourmeeting" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==10" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="我们会议-2" prop="ourmeeting2">
                        <Select v-model="ourmeeting2" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==10" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="其他会议" prop="othermeeting">
                        <Select v-model="othermeeting" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==11" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="业务来源" prop="businesssources">
                        <Select v-model="businesssources" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==12" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="列1" prop="row1"><Input v-model="personValidate.row1" placeholder="请输入列1..." style="width:300px;"></Input></FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="当年发行合计112" prop="year112"><Input v-model="personValidate.year112" placeholder="请输入当年发行合计112..." style="width:300px;" disabled></Input></FormItem>
                </td>
                <td>
                    <FormItem label="当年发行合计11" prop="year11"><Input v-model="personValidate.year11" placeholder="请输入当年发行合计11..." style="width:300px;" @on-blur="changeyear(personValidate.year11)"></Input></FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="当期发行" prop="currentissue">
                        <Select v-model="currentissue" multiple style="width:300px" @on-change="changecurrent(currentissue)">
                            <Option v-for="item in personcontent" v-if="item.type==15" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="国家/地区" prop="countryregion">
                        <Select v-model="countryregion" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==13" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="城市" prop="city">
                        <Select v-model="city" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==14" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="以前单位和职务" prop="formerunitposition"><Input v-model="personValidate.formerunitposition" placeholder="请输入以前单位和职务..." style="width:300px;"></Input></FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="不用" prop="noneed"><Input v-model="personValidate.noneed" placeholder="请输入不用..." style="width:300px;"></Input></FormItem>
                </td>
                <td>
                    <FormItem label="更新数据时间" prop="updatedatatime"><Input v-model="personValidate.updatedatatime" placeholder="请输入更新数据时间..." style="width:300px;"></Input></FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="是否寄杂志" prop="magazine">
                        <Select v-model="magazine" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==16" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem label="发行方式" prop="distributionmode">
                        <Select v-model="distributionmode" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==17" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="备注" prop="remarks"><Input v-model="personValidate.remarks" placeholder="请输入备注..." style="width:300px;"></Input></FormItem>
                </td>
                <td>
                    <FormItem label="业务员" prop="salesman">
                        <Select v-model="salesman" multiple style="width:300px">
                            <Option v-for="item in personcontent" v-if="item.type==18" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="份数" prop="copies"><Input v-model="personValidate.copies" placeholder="请输入份数..." style="width:300px;"></Input></FormItem>
                </td>
                <td>
                    <FormItem label="最新联系情况" prop="latestcontact"><Input v-model="personValidate.latestcontact" placeholder="请输入最新联系情况..." style="width:300px;"></Input></FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem label="更新日期" prop="updatedate"><Input v-model="personValidate.updatedate" placeholder="请输入更新日期..." style="width:300px;"></Input></FormItem>
                </td>
                <td>
                    <FormItem label="查证的问题" prop="verificationproblem"><Input v-model="personValidate.verificationproblem" placeholder="请输入查证的问题..." style="width:300px;"></Input></FormItem>
                </td>
            </tr>
            <FormItem>
                <Button type="primary" @click="savePerson1('personValidate1')" style="margin-left:200px;">保存</Button>
                <Button type="ghost" @click="resetPerson('personValidate1')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
    data () {
        return {
            value: '',
            pageSize: 10,
            pageNumber: 1,
            person_index: -1,
            searchPersonList: [],
            personColumns: [
                {title: '序号', type: 'index', width: 70, align: 'center'}, // 单选
                {title: '姓名', key: 'name', width: 150, align: 'center'},
                {title: '单位', key: 'unit', width: 300, align: 'center'},
                {title: '职务', key: 'position', width: 250, align: 'center'},
                {title: '手机号', key: 'phone', width: 150, align: 'center'},
                {title: '操作',
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
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.editPerson(params.row);
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.detailPerson(params.row);
                                    }
                                }
                            }, '详细')
                        ]);
                    }
                }
            ],
            detail: false,
            person_modal: false,
            personValidate: {
                id: '',
                name: '',
                phone: '',
                unit: '',
                position: '',
                telephone: '',
                fax: '',
                email: '',
                location: '',
                postcode: '',
                seminar: '',
                unitproperties: '',
                unitspecialty: '',
                industryfield: '',
                internationalproject: '',
                midtownrail: '',
                relatedstudy: '',
                cooperativeproject: '',
                ourmeeting: '',
                ourmeeting2: '',
                othermeeting: '',
                businesssources: '',
                row1: '',
                year112: '',
                year11: '',
                currentissue: '',
                countryregion: '',
                city: '',
                formerunitposition: '',
                noneed: '',
                updatedatatime: '',
                magazine: '',
                distributionmode: '',
                remarks: '',
                salesman: '',
                copies: '',
                latestcontact: '',
                updatedate: '',
                verificationproblem: '',
                type: '',
                persontype: '',
                meetid: ''
            },
            AddpersonValidate: {
                id: '',
                name: '',
                unit: '',
                position: '',
                phone: '',
                type: '',
                persontype: '',
                meetid: ''
            },
            personRuleValidate: {
                name: [
                    {required: true, message: '名字不能为空', trigger: 'blur'}
                ],
                phone: [
                    {required: true, message: '手机号不能为空', trigger: 'blur'},
                    {type: 'string', pattern: /^1[3|4|5|8][0-9]\d{4,8}$/, message: '请输入正确的手机号码', trigger: 'blur'}
                ]
            },
            seminar: [],
            unitproperties: [],
            unitspecialty: [],
            industryfield: [],
            internationalproject: [],
            midtownrail: [],
            relatedstudy: [],
            cooperativeproject: [],
            ourmeeting: [],
            ourmeeting2: [],
            othermeeting: [],
            businesssources: [],
            currentissue: [],
            countryregion: [],
            city: [],
            magazine: [],
            distributionmode: [],
            salesman: [],

            query: false, // 标签查询页面打开状态
            seminar_query: [],
            unitproperties_query: [],
            unitspecialty_query: [],
            industryfield_query: [],
            internationalproject_query: [],
            midtownrail_query: [],
            relatedstudy_query: [],
            cooperativeproject_query: [],
            ourmeeting_query: [],
            ourmeeting2_query: [],
            othermeeting_query: [],
            businesssources_query: [],
            currentissue_query: [],
            countryregion_query: [],
            city_query: [],
            magazine_query: [],
            distributionmode_query: [],
            salesman_query: [],
            query_status:''
        };
    },
    methods: {
        q () {
            this.person_index = -1;
            if(this.query_status !== "1") {
                this.seminar_query= [],
                this.unitproperties_query= [],
                this.unitspecialty_query= [],
                this.industryfield_query= [],
                this.internationalproject_query= [],
                this.midtownrail_query= [],
                this.relatedstudy_query= [],
                this.cooperativeproject_query= [],
                this.ourmeeting_query= [],
                this.othermeeting_query= [],
                this.businesssources_query= [],
                this.currentissue_query= [],
                this.countryregion_query= [],
                this.city_query= [],
                this.magazine_query= [],
                this.distributionmode_query= [],
                this.salesman_query= []
            }
            this.query = true;
        },
        searchPerson (value) {
            this.value = value;
        },
        addPerson (name) {
            this.person_index = -1;
            this.$refs[name].resetFields();
            this.AddpersonValidate = {
                id: '',
                name: '',
                unit: '',
                position: '',
                phone: '',
                type: '',
                persontype: '',
                meetid: ''
            };
            this.seminar = [];
            this.unitproperties = [];
            this.unitspecialty = [];
            this.industryfield = [];
            this.internationalproject = [];
            this.midtownrail = [];
            this.relatedstudy = [];
            this.cooperativeproject = [];
            this.ourmeeting = [];
            this.ourmeeting2 = [];
            this.othermeeting = [];
            this.businesssources = [];
            this.currentissue = [];
            this.countryregion = [];
            this.city = [];
            this.magazine = [];
            this.distributionmode = [];
            this.salesman = [];
            this.person_modal = true;
        },
        handlePage (index) {
            this.pageNumber = index;
        },
        editPerson (row) {
            this.person_index = row.id;
            this.personValidate = JSON.parse(JSON.stringify(row));
            this.person_modal = true;
        },
        savePerson (name) {
            let this_ = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this_.person_index !== -1) {
                        this_.personValidate.id = this_.person_index;
                        this_.personValidate.type = '2';
                        this_.personValidate.meetid = '';
                        if (this_.personValidate.unit === null || this_.personValidate.unit === undefined) {
                            this_.personValidate.unit = '';
                        }
                        if (this_.personValidate.position === null || this_.personValidate.position === undefined) {
                            this_.personValidate.position = '';
                        }
                        this.$ajax.post('basicperson/edit',
                            'name=' + this_.personValidate.name + '&phone=' + this_.personValidate.phone +
                            '&unit=' + this_.personValidate.unit + '&position=' + this_.personValidate.position +
                            '&id=' + this_.person_index)
                            .then(function (response) {
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('修改成功');
                                    this_.$store.commit('basicpersonlist', this_.personValidate);
                                } else {
                                    this_.$Message.info('修改失败');
                                }
                            });
                    } else { // 新增
                        this.$ajax.post('basicperson/add',
                            'name=' + this_.personValidate.name + '&phone=' + this_.personValidate.phone +
                            '&unit=' + this_.personValidate.unit + '&position=' + this_.personValidate.position)
                            .then(function (response) {
                                this_.AddpersonValidate.id = response.data.id;
                                this_.AddpersonValidate.name = this_.personValidate.name;
                                this_.AddpersonValidate.unit = this_.personValidate.unit;
                                this_.AddpersonValidate.phone = this_.personValidate.phone;
                                this_.AddpersonValidate.position = this_.personValidate.position;
                                this_.AddpersonValidate.type = '1';
                                this_.AddpersonValidate.meetid = '';
                                if (response.data.errorCode === 0) {
                                    this_.$Message.config({
                                        top: 50,
                                        duration: 3,
                                        width: 200
                                    });
                                    this_.$Message.info('添加成功');
                                    this_.$store.commit('basicpersonlist', this_.AddpersonValidate);
                                } else {
                                    this_.$Message.info('添加失败');
                                }
                            });
                    }
                    this.person_modal = false;
                } else {
                    this.person_modal = true;
                }
            });
        },
        resetPerson (name) {
            this.$refs[name].resetFields();
            this.seminar = [];
            this.unitproperties = [];
            this.unitspecialty = [];
            this.industryfield = [];
            this.internationalproject = [];
            this.midtownrail = [];
            this.relatedstudy = [];
            this.cooperativeproject = [];
            this.ourmeeting = [];
            this.ourmeeting2 = [];
            this.othermeeting = [];
            this.businesssources = [];
            this.currentissue = [];
            this.countryregion = [];
            this.city = [];
            this.magazine = [];
            this.distributionmode = [];
            this.salesman = [];
        },
        resetPerson_query () {
            this.seminar_query = [];
            this.unitproperties_query = [];
            this.unitspecialty_query = [];
            this.industryfield_query = [];
            this.internationalproject_query = [];
            this.midtownrail_query = [];
            this.relatedstudy_query = [];
            this.cooperativeproject_query = [];
            this.ourmeeting_query = [];
            this.othermeeting_query = [];
            this.businesssources_query = [];
            this.currentissue_query = [];
            this.countryregion_query = [];
            this.city_query = [];
            this.magazine_query = [];
            this.distributionmode_query = [];
            this.salesman_query = [];
        },
        detailPerson (row) {
            this.seminar = [];
            this.unitproperties = [];
            this.unitspecialty = [];
            this.industryfield = [];
            this.internationalproject = [];
            this.midtownrail = [];
            this.relatedstudy = [];
            this.cooperativeproject = [];
            this.ourmeeting = [];
            this.ourmeeting2 = [];
            this.othermeeting = [];
            this.businesssources = [];
            this.currentissue = [];
            this.countryregion = [];
            this.city = [];
            this.magazine = [];
            this.distributionmode = [];
            this.salesman = [];

            this.person_index = row.id;
            this.detail = true;
            let this_ = this;
            this_.personValidate = JSON.parse(JSON.stringify(row));
            if (row.telephone === null || row.telephone === undefined) {
                this_.personValidate.telephone = '';
            }
            if (row.fax === null || row.fax === undefined) {
                this_.personValidate.fax = '';
            }
            if (row.email === null || row.email === undefined) {
                this_.personValidate.email = '';
            }
            if (row.location === null || row.location === undefined) {
                this_.personValidate.location = '';
            }
            if (row.postcode === null || row.postcode === undefined) {
                this_.personValidate.postcode = '';
            }
            if (row.row1 === null || row.row1 === undefined) {
                this_.personValidate.row1 = '';
            }
            if (row.year112 === null && row.year112 === undefined) {
                this_.personValidate.year112 = '';
            }
            if (row.year11 === null || row.year11 === undefined) {
                this_.personValidate.year11 = '';
            }
            if (row.formerunitposition === null || row.formerunitposition === undefined) {
                this_.personValidate.formerunitposition = '';
            }
            if (row.noneed === null || row.noneed === undefined) {
                this_.personValidate.noneed = '';
            }
            if (row.updatedatatime === null || row.updatedatatime === undefined) {
                this_.personValidate.updatedatatime = '';
            }
            if (row.remarks === null || row.remarks === undefined) {
                this_.personValidate.remarks = '';
            }
            if (row.copies === null || row.copies === undefined) {
                this_.personValidate.copies = '';
            }
            if (row.latestcontact === null || row.latestcontact === undefined) {
                this_.personValidate.latestcontact = '';
            }
            if (row.updatedate === null || row.updatedate === undefined) {
                this_.personValidate.updatedate = '';
            }
            if (row.verificationproblem === null || row.verificationproblem === undefined) {
                this_.personValidate.verificationproblem = '';
            }
            if (row.seminar !== null && row.seminar !== undefined) {
                let seminar = [];
                row.seminar.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        seminar.push(+data + '');
                    }
                });
                this_.seminar = seminar;
            }
            if (row.unitproperties !== null && row.unitproperties !== undefined) {
                let unitproperties = [];
                row.unitproperties.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        unitproperties.push(+data + '');
                    }
                });
                this_.unitproperties = unitproperties;
            }
            if (row.unitspecialty !== null && row.unitspecialty !== undefined) {
                let unitspecialty = [];
                row.unitspecialty.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        unitspecialty.push(+data + '');
                    }
                });
                this_.unitspecialty = unitspecialty;
            }
            if (row.industryfield !== null && row.industryfield !== undefined) {
                let industryfield = [];
                row.industryfield.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        industryfield.push(+data + '');
                    }
                });
                this_.industryfield = industryfield;
            }
            if (row.internationalproject !== null && row.internationalproject !== undefined) {
                let internationalproject = [];
                row.internationalproject.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        internationalproject.push(+data + '');
                    }
                });
                this_.internationalproject = internationalproject;
            }
            if (row.midtownrail !== null && row.midtownrail !== undefined) {
                let midtownrail = [];
                row.midtownrail.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        midtownrail.push(+data + '');
                    }
                });
                this_.midtownrail = midtownrail;
            }
            if (row.relatedstudy !== null && row.relatedstudy !== undefined) {
                let relatedstudy = [];
                row.relatedstudy.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        relatedstudy.push(+data + '');
                    }
                });
                this_.relatedstudy = relatedstudy;
            }
            if (row.cooperativeproject !== null && row.cooperativeproject !== undefined) {
                let cooperativeproject = [];
                row.cooperativeproject.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        cooperativeproject.push(+data + '');
                    }
                });
                this_.cooperativeproject = cooperativeproject;
            }
            if (row.ourmeeting !== null && row.ourmeeting !== undefined) {
                let ourmeeting = [];
                row.ourmeeting.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        ourmeeting.push(+data + '');
                    }
                });
                this_.ourmeeting = ourmeeting;
            }
            if (row.ourmeeting2 !== null && row.ourmeeting2 !== undefined) {
                let ourmeeting2 = [];
                row.ourmeeting2.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        ourmeeting2.push(+data + '');
                    }
                });
                this_.ourmeeting2 = ourmeeting2;
            }
            if (row.othermeeting !== null && row.othermeeting !== undefined) {
                let othermeeting = [];
                row.othermeeting.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        othermeeting.push(+data + '');
                    }
                });
                this_.othermeeting = othermeeting;
            }
            if (row.businesssources !== null && row.businesssources !== undefined) {
                let businesssources = [];
                row.businesssources.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        businesssources.push(+data + '');
                    }
                });
                this_.businesssources = businesssources;
            }
            if (row.currentissue !== null && row.currentissue !== undefined) {
                let currentissue = [];
                row.currentissue.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        currentissue.push(+data + '');
                    }
                });
                this_.currentissue = currentissue;
            }
            if (row.countryregion !== null && row.countryregion !== undefined) {
                let countryregion = [];
                row.countryregion.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        countryregion.push(+data + '');
                    }
                });
                this_.countryregion = countryregion;
            }
            if (row.city !== null && row.city !== undefined) {
                let city = [];
                row.city.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        city.push(+data + '');
                    }
                });
                this_.city = city;
            }
            if (row.magazine !== null && row.magazine !== undefined) {
                let magazine = [];
                row.magazine.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        magazine.push(+data + '');
                    }
                });
                this_.magazine = magazine;
            }
            if (row.distributionmode !== null && row.distributionmode !== undefined) {
                let distributionmode = [];
                row.distributionmode.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        distributionmode.push(+data + '');
                    }
                });
                this_.distributionmode = distributionmode;
            }
            if (row.salesman !== null && row.salesman !== undefined) {
                let salesman = [];
                row.salesman.split(',').forEach(function (data, index, arr) {
                    if (data !== '') {
                        salesman.push(+data + '');
                    }
                });
                this_.salesman = salesman;
            }
        },
        savePerson1 (name) {
            let this_ = this;
            this.$refs[name].validate((valid) => {
                this_.personValidate.id = this_.person_index;
                this_.personValidate.type = '4';
                this_.personValidate.seminar = this_.seminar + '';
                this_.personValidate.unitproperties = this_.unitproperties + '';
                this_.personValidate.unitspecialty = this_.unitspecialty + '';
                this_.personValidate.industryfield = this_.industryfield + '';
                this_.personValidate.internationalproject = this_.internationalproject + '';
                this_.personValidate.midtownrail = this_.midtownrail + '';
                this_.personValidate.relatedstudy = this_.relatedstudy + '';
                this_.personValidate.cooperativeproject = this_.cooperativeproject + '';
                this_.personValidate.ourmeeting = this_.ourmeeting + '';
                this_.personValidate.ourmeeting2 = this_.ourmeeting2 + '';
                this_.personValidate.othermeeting = this_.othermeeting + '';
                this_.personValidate.businesssources = this_.businesssources + '';
                this_.personValidate.currentissue = this_.currentissue + '';
                this_.personValidate.countryregion = this_.countryregion + '';
                this_.personValidate.city = this_.city + '';
                this_.personValidate.magazine = this_.magazine + '';
                this_.personValidate.distributionmode = this_.distributionmode + '';
                this_.personValidate.salesman = this_.salesman + '';
                this_.personValidate.persontype = '';
                this_.personValidate.meetid = '';
                this.$ajax.post('basicperson/editmx',
                    'telephone=' + this_.personValidate.telephone + '&fax=' + this_.personValidate.fax +
                    '&email=' + this_.personValidate.email + '&location=' + this_.personValidate.location +
                    '&postcode=' + this_.personValidate.postcode + '&seminar=' + this_.seminar + '' +
                    '&unitproperties=' + this_.unitproperties + '' + '&unitspecialty=' + this_.unitspecialty + '' +
                    '&industryfield=' + this_.industryfield + '' + '&internationalproject=' + this_.internationalproject + '' +
                    '&midtownrail=' + this_.midtownrail + '' + '&relatedstudy=' + this_.relatedstudy + '' +
                    '&cooperativeproject=' + this_.cooperativeproject + '' + '&ourmeeting=' + this_.ourmeeting + '' +
                    '&ourmeeting2=' + this_.ourmeeting2 + '' + '&othermeeting=' + this_.othermeeting + '' +
                    '&businesssources=' + this_.businesssources + '' + '&row1=' + this_.personValidate.row1 +
                    '&year112=' + this_.personValidate.year112 + '&year11=' + this_.personValidate.year11 +
                    '&currentissue=' + this_.currentissue + '' + '&countryregion=' + this_.countryregion + '' +
                    '&city=' + this_.city + '' + '&formerunitposition=' + this_.personValidate.formerunitposition +
                    '&noneed=' + this_.personValidate.noneed + '' + '&updatedatatime=' + this_.personValidate.updatedatatime +
                    '&magazine=' + this_.magazine + '' + '&distributionmode=' + this_.distributionmode + '' +
                    '&remarks=' + this_.personValidate.remarks + '' + '&salesman=' + this_.salesman + '' +
                    '&copies=' + this_.personValidate.copies + '' + '&latestcontact=' + this_.personValidate.latestcontact +
                    '&updatedate=' + this_.personValidate.updatedate + '' + '&verificationproblem=' + this_.personValidate.verificationproblem +
                    '&id=' + this_.person_index)
                    .then(function (response) {
                        if (response.data.errorCode === 0) {
                            this_.$Message.config({
                                top: 50,
                                duration: 3,
                                width: 200
                            });
                            this_.$Message.info('修改成功');
                            this_.$store.commit('basicpersonlist', this_.personValidate);
                        } else {
                            this_.$Message.info('修改失败');
                        }
                    });
                this_.detail = false;
            });
        },
        savePerson2 () {
            let this_ = this;
            this.query_status = "1";
            this.$ajax.post('basicperson/query',
                '&seminar_query=' + this_.seminar_query + '' + '&unitproperties_query=' + this_.unitproperties_query + '' + 
                '&unitspecialty_query=' + this_.unitspecialty_query + '' + '&industryfield_query=' + this_.industryfield_query + '' + 
                '&internationalproject_query=' + this_.internationalproject_query + '' + '&midtownrail_query=' + this_.midtownrail_query + '' + 
                '&relatedstudy_query=' + this_.relatedstudy_query + '' + '&cooperativeproject_query=' + this_.cooperativeproject_query + '' + 
                '&ourmeeting_query=' + this_.ourmeeting_query + '' + '&othermeeting_query=' + this_.othermeeting_query + '' +
                '&businesssources_query=' + this_.businesssources_query + '' +  '&currentissue_query=' + this_.currentissue_query + '' + 
                '&countryregion_query=' + this_.countryregion_query + '' + '&city_query=' + this_.city_query + '' + 
                '&magazine_query=' + this_.magazine_query + '' + '&distributionmode_query=' + this_.distributionmode_query + '' +
                '&salesman_query=' + this_.salesman_query + '' + '&persontype=' + "1")
                .then(function (response) {
                    this_.$store.commit('basicpersonlist', response.data.basicpersonlist);
                });
            this.query = false;
        },
        changeyear (value) {
            let year = '';
            let current = this.currentissue;
            let person = [];
            let this_ = this;
            if (current.length > 0) {
                person = this.personcontent;
                for (let i = 0; i < person.length; i++) {
                    for (let j = 0; j < person.length; j++) {
                        if (person[j].id === current[i]) {
                            year += person[j].content;
                        }
                    }
                }
                this_.personValidate.year112 = value + year;
            } else {
                this.personValidate.year112 = value;
            }
        },
        changecurrent (value) {
            let year = '';
            let person = [];
            let this_ = this;
            person = this.personcontent;
            for (let i = 0; i < value.length; i++) {
                for (let j = 0; j < person.length; j++) {
                    if (person[j].id === value[i]) {
                        year += person[j].content;
                    }
                }
            }
            this_.personValidate.year112 = this_.personValidate.year11 + '' + year;
        },
        delete (id) {
            let this_ = this;
            this_.personValidate.id = id;
            this_.personValidate.type = '3';
            this_.personValidate.persontype = '1';
            this_.personValidate.meetid = '';
            this.$ajax.post('basicperson/delete',
                'id=' + id)
                .then(function (response) {
                    if (response.data.errorCode === 0) {
                        this_.$Message.config({
                            top: 50,
                            duration: 3,
                            width: 200
                        });
                        this_.$Message.info('删除成功');
                        this_.$store.commit('basicpersonlist', this_.personValidate);
                    } else {
                        this_.$Message.info('删除失败');
                    }
                });
        }
    },
    computed: {
        basicpersonlistPath: function () {
            return this.$store.getters.basicpersonlistPath;
        },
        personcontent: function () {
            return this.$store.getters.personcontentPath;
        },
        pageTotal: function () {
            let person = this.basicpersonlistPath;
            let persons = [];
            for (let i = 0; i < person.length; i++) {
                if (person[i].name.indexOf(this.value) !== -1) {
                    persons.push(person[i]);
                }
            }
            if (persons.length > 0) {
                return persons.length;
            }
        },
        person_data: function () {
            let person = this.basicpersonlistPath;
            let persons = [];
            for (let i = 0; i < person.length; i++) {
                if (person[i].name.indexOf(this.value) !== -1) {
                    persons.push(person[i]);
                }
            }
            if (persons.length > 0) {
                return persons.slice((this.pageNumber - 1) * this.pageSize, this.pageNumber * this.pageSize);
            }
        }
    },
    created() {
        var _this = this;
        this.$ajax.post('meetingcolumns/list')
            .then(function (response) {
                _this.$store.commit('basicpersonlist', response.data.basicpersonlist);
            });
    }
};
</script>

<style lang="less">
  body .ivu-modal .ivu-select-dropdown{
    position: fixed !important;
  }
  .paging{
      float: right;
      margin-bottom: 10px;
  }
</style>
