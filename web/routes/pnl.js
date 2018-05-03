/** Webservice endpoint for trade profit and loss. */
"use strict"

module.exports = {
  syncTrades: function *() {
    /** Fetches the new trades from the exchange and stores them in the database.
     *  Returns a list of new trades or the last 5 if no new trades found.
     */
    console.log("pnl.js - syncTrades");
    let answer =  {
      status: 'ok',
      t: 'Trade PnL trades'
    };
    this.body = answer;
  },
      
  syncSpots: function *() {
    /** Queries the latest spot prices from the exchange and calculates the live PnL.
     *  Returns a list of positions.
     */
    console.log("pnl.js - syncSpots");
    let answer =  {
      status: 'ok',
      t: 'Trade PnL spots'
    };
    this.body = answer;
  },
  
  test: function *() {
    this.body = "Trade PnL says hello";
  },

}