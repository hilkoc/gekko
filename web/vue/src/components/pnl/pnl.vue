<template lang='jade'>
div.contain
  h2 Profit and Loss
  a.btn--primary(href='#', v-on:click.prevent='syncTrades') Sync trades
  template(v-if='showTrades')
    h3 Trade History
    .hr  
    p button clicked! Showing trades...
    p {{trades}}
    tradeTable(:roundtrips='this.trades')
    .hr

    h3 Live positions
    a.btn--primary(href='#', v-on:click.prevent='syncSpots') Sync live spots
    p button clicked! And showing live pnl...
    p {{spots}}

  
</template>

<script>
import { post } from '../../tools/ajax';
import {get } from '../../tools/ajax';
import tradeTable from './tradeTable.vue'

export default {
  components: {
    tradeTable
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
      trades: "No trades yet",
      spots: "No spots",
    }
  },
  
  methods: {
    syncTrades: function() {
      this.showTrades = true;
      // Post request to get new trades
      console.log("getting response");
        
      post('pnlSyncTrades', {}, (error, response) => {
        if(error) {
          console.log("error in sync trades:");
          console.log(error);
          return alert(error);
        }
        console.log(" my response");        
        console.log(response);

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
        console.log(" my response");        
        console.log(response);

        this.spots = response.t;
      });  
      
      this.spots = "Clicked syncSpots!! It works";
    },

  }

}
</script>