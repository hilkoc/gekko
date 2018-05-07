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
          td {{ round4(row.position) }}
          td {{ round2(row.average_open) }}
          td {{ round2(row.price) }}
          template(v-if="row.cash_pnl<0")
            td.loss {{ round2(row.cash_pnl) }}
            td.loss {{ round2(row.rel_pnl) }}%
          template(v-else)
            td.profit {{ round2(row.cash_pnl) }}
            td.profit {{ round2(row.rel_pnl) }}%
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
    round2: n => (+n).toFixed(2),
    round4: n => (+n).toFixed(4),
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
