<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <!-- <Row class="expand-row">
            <Col span="8"> -->
                <span class="expand-key"></span>工作人: </span>
                <span class="expand-value">{{ row.p }}</span>
            <!-- </Col>
        </Row> -->
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>