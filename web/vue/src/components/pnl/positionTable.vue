<template lang='jade'>
  .contain.trades
    table(v-if='positions.length')
      thead
        tr
          th Pair
          th Position
          th Average Open
          th Current Price
          th P&amp;L (term)
          th P&amp;L (%)
        tr(v-for='row in positions')
          td {{ row.pair }}
          td {{ row.position }}
          td {{ row.average_open }}
          td {{ round(row.price) }}
          td {{ round(row.cash_pnl) }}
          td {{ round(row.rel_pnl) }}
          //template(v-if="Math.sign(rt.fee)===-1")
          //  td.loss {{ Math.sign(rt.fee)*rt.fee.toFixed(2) }}
          //  td.loss {{ rt.fee.toFixed(2) }}%
          //template(v-else)
          //  td.profit {{ rt.fee.toFixed(2) }}
          // td.profit {{ rt.fee.toFixed(2) }}%
    div(v-if='!positions.length')
      p No positions to display
</template>

<script>
export default {
  props: ['positions'],
  data: () => {
    return {}
  },
  methods: {
    diff: n => moment.duration(n).humanize(),
    humanizeDuration: (n) => window.humanizeDuration(n),
    fmt: mom => moment.utc(mom).format('YYYY-MM-DD HH:mm'),
    round: n => (+n).toFixed(3),
  },
}
</script>

<style>

.trades {
  margin-top: 50px;
  margin-bottom: 50px;
}

.trades table {
  width: 100%;
}

.trades table th,
.trades table td {
  border: 1px solid #c6cbd1;
  padding: 8px 12px;
}

.trades table td.loss {
  color: red;
  text-align: right;
}
.trades table td.profit {
  color: green;
  text-align: right;
}

.trades table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

</style>
