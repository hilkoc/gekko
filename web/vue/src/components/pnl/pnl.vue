<template lang='jade'>
div.contain
  h2 Profit and Loss
  .hr
  a.btn--primary(href='#', v-on:click.prevent='syncTrades') Sync trades
  template(v-if='showTrades')
    h3 Trades
    p button clicked! Showing trades...
    p {{trade_msg}}
    tradeTable(:trades='this.trades')

    .hr

    a.btn--primary(href='#', v-on:click.prevent='syncSpots') Sync live spots
    h3 Live positions
    p {{position_msg}}
    positionTable(:positions='this.positions')

  
</template>

<script>
import { post } from '../../tools/ajax';
import { get } from '../../tools/ajax';
import tradeTable from './tradeTable.vue'
import positionTable from './positionTable.vue'

export default {
  components: {
    tradeTable,
    positionTable
  },
 
  methods: {
    diff: n => moment.duration(n).humanize(),
    humanizeDuration: (n) => window.humanizeDuration(n),
    fmt: mom => moment.utc(mom).format('YYYY-MM-DD HH:mm'),
    round: n => (+n).toFixed(3),
  },
  
  data: () => {
    return {
      showTrades: false,
      trade_msg: "No trades fetched",
      position_msg: "No positions",
      trades: "No trades yet",
      positions: "No positions yet",
    }
  },
  
  methods: {
    syncTrades: function() {
      this.showTrades = true;
      // Post request to get new trades
      //console.log("getting response");
        
      post('pnlSyncTrades', {}, (error, response) => {
        if(error) {
          console.log("error in sync trades:");
          console.log(error);
          return alert(error);
        }
        //console.log(" my response");        
        console.log(response);

        this.trade_msg = response.trade_msg;
        this.trades = response.rows;
      });      
    },
    
    syncSpots: function() {
      // Cannot be clicked before trades are fetched
      this.showTrades = true;
      // Get request to get spots
      
      get('pnlSyncSpots', (error, response) => {
        if(error) {
          console.log("error in sync spots:");
          console.log(error);
          return alert(error);
        }
        console.log(" position response");        
        console.log(response);

        this.position_msg = response.position_msg;
        this.positions = response.rows;
      });  
      
      
    },

  }

}
</script>