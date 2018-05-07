<template lang='jade'>
div.contain
  h2 Profit and Loss
  .hr
  a.btn--primary(href='#', v-on:click.prevent='syncTrades') Sync trades
  //template(v-if='showTrades')
  h3 Trades
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
      
      this.syncPositions(); 
    },
    
    syncPositions: function() {
      // Cannot be clicked before trades are fetched
      this.showTrades = true;
      // Get request to get positions
      
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
    
    testsyncSpots: function() {
        let price_map = this.livePrices(['XXBTZUSD','XETHZUSD'], console.log);
        console.log(price_map);
    },
    
    livePrices: function(pairs, callback) {
      // Fetch a map with the prices for requested pairs
      // TODO split this into a separate module, make exchange configurable
      let pair_str = pairs.join(",");
      let request = 'https://api.kraken.com/0/public/Ticker?pair=' + pair_str;

      fetch(request).then( function(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            console.error(response.status);
            console.error(response.statusText);
            return Promise.reject(new Error(response.statusText))
        }
      }).then( function(response) {
        return response.json();
      }).then(function(data) {
        console.log('Request succeeded with JSON response', data);
        let price_map = {};
        pairs.forEach( function(pair) {
            const ticker = data.result[pair];
            console.log(ticker);
            const last_traded_price = parseFloat(ticker.c[0]);
            price_map[pair] = last_traded_price;
        });
        callback( price_map);
      }).catch(function(error) {
        console.log('Request failed', error);
        this.position_msg = error;
      });
    },
    
    syncSpots: function() {
      let pairs = [];
      this.positions.forEach( (row) => {
        pairs.push(row.pair);
      });
      let new_rows = [];
      let positions = this.positions;
      let price_map_callback = function (price_map) {
          console.log( 'in price_map_callback');
          positions.forEach( (row) => {
                row.price = price_map[row.pair];
                row.cash_pnl = row.position * (row.price - row.average_open);
                row.rel_pnl = (row.price / row.average_open -1) * 100;
                new_rows.push(row);
          });
      };
      let price_map = this.livePrices(pairs, price_map_callback);
      this.positions = new_rows;
    }
  }

}
</script>