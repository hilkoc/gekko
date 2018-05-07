<template lang='jade'>
  .contain.trades
    table(v-if='trades.length')
      thead
        tr
          th Id
          th Time
          th Pair
          th Price
          th Type
          th Volume
          th Position
          th Average Open
          th Cash P&amp;L
          th Fee
          th Total P&amp;L
          th Total Fees
        tr(v-for='row in trades')
          td {{ row.id }}
          td {{ row.time }}
          td {{ row.pair }}
          td {{ round2(row.price) }}
          td {{ row.type }}
          td {{ round4(row.volume) }}
          td {{ round4(row.position) }}
          td {{ round2(row.average_open) }}
          td {{ round2(row.cash_pnl) }}
          td {{ round4(row.fee) }}
          td {{ round2(row.total_pnl) }}
          td {{ round2(row.total_fees) }}
          //template(v-if="row.cash_pnl < 0 ")
          //  td.loss {{ Math.sign(row.cash_pnl)*row.cash_pnl.toFixed(2) }}
          //  td.loss {{ row.cash_pnl.toFixed(2) }}%
          //template(v-else)
          //  td.profit {{ rt.cash_pnl.toFixed(2) }}
          // td.profit {{ rt.cash_pnl.toFixed(2) }}%
    div(v-if='!trades.length')
      p No trades to display
</template>

<script>
export default {
  props: ['trades'],
  data: () => {
    return {}
  },
  methods: {
    diff: n => moment.duration(n).humanize(),
    humanizeDuration: (n) => window.humanizeDuration(n),
    fmt: mom => moment.utc(mom).format('YYYY-MM-DD HH:mm:ss'),
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
