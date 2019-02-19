<template>
    <Modal :value="isShow" :labelstatusPath="labelstatusPath" :personcontent="personcontent" :personValidate="personValidate" title="人员详细信息" width="70%" height="50%" @on-cancel="cancel">
        <Form :model="personValidate" :label-width="110">
            <tr>
                <td>
                    <FormItem prop="telephone">
                        <span class="spanLeft">移动电话</span>
                        <Input class="all" v-model="personValidate.telephone" placeholder="请输入移动电话..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="fax">
                        <span>传真</span>
                        <Input class="all" v-model="personValidate.fax" placeholder="请输入传真..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="email">
                        <span class="spanLeft">电子邮件</span>
                        <Input class="all" v-model="personValidate.email" placeholder="请输入电子邮件..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="location">
                        <span>地址</span>
                        <Input class="all" v-model="personValidate.location" placeholder="请输入地址..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="postcode">
                        <span class="spanLeft">邮政编码</span>
                        <Input class="all" v-model="personValidate.postcode" placeholder="请输入邮政编码..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="seminar">
                        <span>{{labelstatusPath.seminar}}</span>
                        <Select class="all" :value="seminar" multiple >
                            <Option v-for="item in personcontent" v-if="item.type==4" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="unitproperties">
                        <span class="spanLeft">{{labelstatusPath.unitproperties}}</span>
                        <Select class="all" :value="unitproperties" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==2" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="unitspecialty">
                        <span>{{labelstatusPath.unitspecialty}}</span>
                        <Select class="all" :value="unitspecialty" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==1" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="industryfield">
                        <span class="spanLeft">{{labelstatusPath.industryfield}}</span>
                        <Select class="all" :value="industryfield" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==3" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="internationalproject">
                        <span>{{labelstatusPath.internationalproject}}</span>
                        <Select class="all" :value="internationalproject" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==5" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="midtownrail">
                        <span class="spanLeft">{{labelstatusPath.midtownrail}}</span>
                        <Select class="all" :value="midtownrail" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==8" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="relatedstudy">
                        <span>{{labelstatusPath.relatedstudy}}</span>
                        <Select class="all" :value="relatedstudy" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==9" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="cooperativeproject">
                        <span class="spanLeft">{{labelstatusPath.cooperativeproject}}</span>
                        <Select class="all" :value="cooperativeproject" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==6" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="ourmeeting">
                        <span>{{labelstatusPath.ourmeeting}}</span>
                        <Select class="all" :value="ourmeeting" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==10" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="ourmeeting2">
                        <span class="spanLeft">{{labelstatusPath.ourmeeting2}}</span>
                        <Select class="all" :value="ourmeeting2" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==19" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="othermeeting">
                        <span>{{labelstatusPath.othermeeting}}</span>
                        <Select class="all" :value="othermeeting" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==11" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="businesssources">
                        <span class="spanLeft">{{labelstatusPath.businesssources}}</span>
                        <Select class="all" :value="businesssources" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==12" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="row1">
                        <span>列1</span>
                        <Input class="all" v-model="personValidate.row1" placeholder="请输入列1..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="year112">
                        <span class="spanLeft">当年发行合计112</span>
                        <Input class="all" v-model="personValidate.year112" placeholder="请输入当年发行合计112..." disabled></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="year11">
                        <span>当年发行合计11</span>
                        <Input class="all" v-model="personValidate.year11" placeholder="请输入当年发行合计11..." @on-blur="changeyear(personValidate.year11)"></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="currentissue">
                        <span class="spanLeft">{{labelstatusPath.currentissue}}</span>
                        <Select class="all" :value="currentissue" multiple @on-change="changecurrent(currentissue)">
                            <Option v-for="item in personcontent" v-if="item.type==15" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="countryregion">
                        <span>{{labelstatusPath.countryregion}}</span>
                        <Select class="all" :value="countryregion" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==13" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="city">
                        <span class="spanLeft">{{labelstatusPath.city}}</span>
                        <Select class="all" :value="city" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==14" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="formerunitposition">
                        <span>以前单位和职务</span>
                        <Input class="all" v-model="personValidate.formerunitposition" placeholder="请输入以前单位和职务..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="noneed">
                        <span class="spanLeft">不用</span>
                        <Input class="all" v-model="personValidate.noneed" placeholder="请输入不用..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="updatedatatime">
                        <span>更新数据时间</span>
                        <Input class="all" v-model="personValidate.updatedatatime" placeholder="请输入更新数据时间..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="magazine">
                        <span class="spanLeft">{{labelstatusPath.magazine}}</span>
                        <Select class="all" :value="magazine" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==16" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="distributionmode">
                        <span>{{labelstatusPath.distributionmode}}</span>
                        <Select class="all" :value="distributionmode" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==17" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="remarks">
                        <span class="spanLeft">备注</span>
                        <Input class="all" v-model="personValidate.remarks" placeholder="请输入备注..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="salesman">
                        <span>{{labelstatusPath.salesman}}</span>
                        <Select class="all" :value="salesman" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==18" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="copies">
                        <span class="spanLeft">份数</span>
                        <Input class="all" v-model="personValidate.copies" placeholder="请输入份数..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="latestcontact">
                        <span>最新联系情况</span>
                        <Input class="all" v-model="personValidate.latestcontact" placeholder="请输入最新联系情况..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="updatedate">
                        <span class="spanLeft">更新日期</span>
                        <Input class="all" v-model="personValidate.updatedate" placeholder="请输入更新日期..."></Input>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="verificationproblem">
                        <span>查证的问题</span>
                        <Input class="all" v-model="personValidate.verificationproblem" placeholder="请输入查证的问题..."></Input>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="custom1">
                        <span class="spanLeft">{{labelstatusPath.custom1}}</span>
                        <Select class="all" :value="custom1" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==20" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="custom2">
                        <span>{{labelstatusPath.custom2}}</span>
                        <Select class="all" :value="custom2" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==21" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem prop="custom3">
                        <span class="spanLeft">{{labelstatusPath.custom3}}</span>
                        <Select class="all" :value="custom3" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==22" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem prop="custom4">
                        <span>{{labelstatusPath.custom4}}</span>
                        <Select class="all" :value="custom4" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==23" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <FormItem>
                <Button type="primary" @click="savePerson1('personValidate1')" style="margin-left:350px;">保存</Button>
                <Button type="ghost" @click="resetPerson('personValidate1')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <div slot="footer"></div>
    </Modal>
</template>

<script>
export default {
    name: 'edit-persondetail',
    props : {
        isShow: {
            type: Boolean,
            default: false
        },
        unitspecialty: {type: Array},
        unitproperties: {type: Array},
        industryfield: {type: Array},
        seminar: {type: Array},
        internationalproject: {type: Array},
        cooperativeproject: {type: Array},
        midtownrail: {type: Array},
        relatedstudy: {type: Array},
        ourmeeting: {type: Array},
        othermeeting: {type: Array},
        businesssources: {type: Array},
        countryregion: {type: Array},
        city: {type: Array},
        currentissue: {type: Array},
        magazine: {type: Array},
        distributionmode: {type: Array},
        salesman: {type: Array},
        ourmeeting2: {type: Array},
        custom1: {type: Array},
        custom2: {type: Array},
        custom3: {type: Array},
        custom4: {type: Array},
        labelstatusPath:{type:Object},
        personValidate:{type:Object},
        personcontent:{type: Array}
    },
    data () {
        return {

        };
    },
    methods: {
        resetPerson (personValidate1) {
            this.$emit('resetPerson', personValidate1);
        },
        savePerson1 (personValidate1) {
            this.$emit('savePerson1', personValidate1);
        },
        cancel() {
            this.$emit('cancel');
        },
        changeyear(year) {
            this.$emit('changeyear', year);
        },
        changecurrent(currentissue) {
            this.$emit('changecurrent', currentissue);
        }
    },
    computed: {
        
    }
};
</script>

<style lang="less">
    body .ivu-modal .ivu-select-dropdown{
        position: fixed !important;
    }
    .spanLeft{
        margin-left:-50px;
    }
    .all{
        width:300px;
        margin-left:10px;
        float:right; 
    }
</style>
