<template>
    <div class="animated fadeIn">
        <Row>
            <Card>
                <p slot="title" style="height:20px">
                    <Icon type="compose"></Icon>
                    会议名称：{{this.$route.query.meeting}}
                </p>
                <Tabs type="card" value="a" :animated="false">
                    <TabPane label="参会人员管理" >
                        aaa
                    </TabPane>
                    <TabPane label="参会人员分组" >
                        bbb
                    </TabPane>
                    <TabPane label="工作人员分组" >
                        ccc
                    </TabPane>
                    <TabPane label="分派任务" >
                        ccc
                    </TabPane>
                    <TabPane label="发布会议" >
                        ccc
                    </TabPane>
                    <TabPane label="推送信息" >
                        ccc
                    </TabPane>
                    <TabPane label="推送信息(参会人)" >
                        ccc
                    </TabPane>
                    <TabPane label="推送信息(工作人)" >
                        ccc
                    </TabPane>
                    <TabPane label="推送消息历史" >
                        ccc
                    </TabPane>
                    <TabPane label="查看签到二维码" >
                        ccc
                    </TabPane>
                </Tabs>
            </Card>
        </Row>
    </div>
</template>