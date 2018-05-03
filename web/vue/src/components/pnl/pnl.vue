<template lang='jade'>
div.contain
  h2 Profit and Loss
  .hr
  h3 Trade History
  a.btn--primary(href='#', v-on:click.prevent='syncTrades') Sync trades
  .hr
  template(v-if='showTrades')
    p button clicked! Showing trades...
    p {{trades}}  
    .hr
    h3 Live positions
    a.btn--primary(href='#', v-on:click.prevent='syncSpots') Sync live spots
    template(v-if='showTrades')
      p button clicked! And showing live pnl...
      p {{spots}}

  
</template>

<script>
import pnlConfigBuilder from './pnlConfigBuilder.vue';
import { post } from '../../tools/ajax';
import {get } from '../../tools/ajax';

export default {
  components: {
    pnlConfigBuilder
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

        this.trades = response.t;
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
    
    removeApiKey: function(exchange) {
      if(!confirm('Are you sure you want to delete these API keys?'))
        return;

      post('removeApiKey', {exchange}, (error, response) => {
        if(error)
          return alert(error);
      });
    }
  }

}
</script>