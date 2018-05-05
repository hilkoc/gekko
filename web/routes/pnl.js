/** Webservice endpoint for trade profit and loss. */
"use strict"

module.exports = {
  syncTrades: function *() {
    /** Fetches the new trades from the exchange and stores them in the database.
     *  Returns a list of new trades or the last 5 if no new trades found.
     */
    console.log("pnl.js - syncTrades");
    let answer =  {
      headers: ['time', 'price', 'volume', 'fee'],
      trade_msg: 'Fetched 2 trades',
      rows: [{time: '2018-05-05', price: '8208.8', volume: '0.047', fee: '1.22'}, {time: '2018-05-05', price: '808.8', volume: '0.47', fee: '2.22'},]
    };
    this.body = answer;
  },
      
  syncSpots: function *() {
    /** Queries the latest spot prices from the exchange and calculates the live PnL.
     *  Returns a list of positions.
     */
    console.log("pnl.js - syncSpots");
    let answer =  {
      headers: ['pair', 'time', 'price', 'volume', 'fee'],
      position_msg: 'Fetched 2 positions',
      rows: [{pair: 'XBTZUSD', time: '2018-01-01', price: '8208.8', volume: '0.047', fee: '1.22'}, {pair: 'XETHZUSD', time: '2018-02-02', price: '808.8', volume: '0.47', fee: '2.22'},]
    };
    this.body = answer;
  },
  
  test: function *() {
    this.body = "Trade PnL says hello";
  },

}