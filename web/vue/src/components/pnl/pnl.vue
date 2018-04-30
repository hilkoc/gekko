<template lang='jade'>
div.contain
  h2 Profit and Loss
  .hr
  h3 Trade History
  a.btn--primary(href='#', v-on:click.prevent='syncTrades') Sync trades
  .hr
  template(v-if='showTrades')
    p button clicked! Showing trades...
    .hr
    h3 Live positions
    a.btn--primary(href='#', v-on:click.prevent='syncSpots') Sync live spots
    template(v-if='showTrades')
      p button clicked! And showing live pnl...

  
</template>

<script>
import pnlConfigBuilder from './pnlConfigBuilder.vue';
import { post } from '../../tools/ajax';

export default {
  components: {
    pnlConfigBuilder
  },
  
  data: () => {
    return {
      showTrades: false,
    }
  },
  
  methods: {
    syncTrades: function() {
      this.showTrades = true;
    },
    syncSpots: function() {
      // Cannot be clicked before trades are fetched
      this.showTrades = true;
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