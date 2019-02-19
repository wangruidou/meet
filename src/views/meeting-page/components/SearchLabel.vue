<template>
    <Modal :value="isShow" :labelstatusPath="labelstatusPath" :personcontent="personcontent" title="详细标签查询" width="70%" @on-cancel="cancel">
        <Form :label-width="110">
            <tr>
                <td>
                    <FormItem>
                        <span class="spanLeft">{{labelstatusPath.unitspecialty}}</span>
                        <Select class="all" :value="unitspecialty" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==1" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.unitproperties}}</span>
                        <Select class="all" :value="unitproperties" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==2" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span class="spanLeft">{{labelstatusPath.industryfield}}</span>
                        <Select class="all" :value="industryfield" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==3" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.seminar}}</span>
                        <Select class="all" :value="seminar" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==4" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span class="spanLeft">{{labelstatusPath.internationalproject}}</span>
                        <Select class="all" :value="internationalproject" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==5" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.cooperativeproject}}</span>
                        <Select class="all" :value="cooperativeproject" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==6" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span class="spanLeft">{{labelstatusPath.midtownrail}}</span>
                        <Select class="all" :value="midtownrail" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==8" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.relatedstudy}}</span>
                        <Select class="all" :value="relatedstudy" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==9" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span class="spanLeft">{{labelstatusPath.ourmeeting}}</span>
                        <Select class="all" :value="ourmeeting" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==10" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.othermeeting}}</span>
                        <Select class="all" :value="othermeeting" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==11" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span class="spanLeft">{{labelstatusPath.businesssources}}</span>
                        <Select class="all" :value="businesssources" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==12" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.countryregion}}</span>
                        <Select class="all" :value="countryregion" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==13" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span class="spanLeft">{{labelstatusPath.city}}</span>
                        <Select class="all" :value="city" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==14" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.currentissue}}</span>
                        <Select class="all" :value="currentissue" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==15" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span class="spanLeft">{{labelstatusPath.magazine}}</span>
                        <Select class="all" :value="magazine" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==16" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.distributionmode}}</span>
                        <Select class="all" :value="distributionmode" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==17" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span class="spanLeft">{{labelstatusPath.salesman}}</span>
                        <Select class="all" :value="salesman" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==18" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.ourmeeting2}}</span>
                        <Select class="all" :value="ourmeeting2" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==19" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span class="spanLeft">{{labelstatusPath.custom1}}</span>
                        <Select class="all" :value="custom1" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==20" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.custom2}}</span>
                        <Select class="all" :value="custom2" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==21" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <tr>
                <td>
                    <FormItem>
                        <span class="spanLeft">{{labelstatusPath.custom3}}</span>
                        <Select class="all" :value="custom3" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==22" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
                <td>
                    <FormItem>
                        <span>{{labelstatusPath.custom4}}</span>
                        <Select class="all" :value="custom4" multiple>
                            <Option v-for="item in personcontent" v-if="item.type==23" :value="item.id" :key="item.id">{{ item.content }}</Option>
                        </Select>
                    </FormItem>
                </td>
            </tr>
            <FormItem>
                <Button type="primary" @click="savePerson2()" style="margin-left:350px;">查询</Button>
                <Button type="ghost" @click="resetPerson_query()" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <div slot="footer"></div>
    </Modal>
</template>

<script>
export default {
    name: 'search-label',
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
        personcontent:{type: Array}
    },
    data () {
        return {

        };
    },
    methods: {
        resetPerson_query () {
            this.$emit('resetPerson1');
        },
        savePerson2 () {
            this.$emit('savePerson2');
        },
        cancel() {
            this.$emit('cancel');
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
