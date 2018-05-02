/** Webservice endpoint for trade profit and loss. */


module.exports = {
  syncTrades: function *() {
    /** Fetches the new trades from the exchange and stores them in the database.
     *  Returns a list of new trades or the last 5 if no new trades found.
     */
    this.body = "Trade PnL says synced new trades";
  },
      
  syncSpots: function *() {
    /** Queries the latest spot prices from the exchange and calculates the live PnL.
     *  Returns a list of positions.
     */
    this.body = "Trade PnL says synced spots";
  },
  
  test: function *() {
    this.body = "Trade PnL says hello";
  },

}