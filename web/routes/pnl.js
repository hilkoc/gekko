/**
 * MIT License
 * Copyright (c) 2018 Hilkoc
 * 
 * Webservice endpoint for trade profit and loss. 
 */

"use strict"


const exchange = require('../../tradepnl/exchange').makeExchange();
const storage = require('../../tradepnl/storage').makeStorage();
const App = require('../../tradepnl/tradepnl');
const app = new App(exchange, storage);


async function trade_pnl_rows(nr_rows) {
    /** Aggregates the rows. */

    let all_rows = [];    

    const row_callback = function (err, row) {
        let r = {id: row.id, time: row.time, pair: row.pair, price: row.price, type: row.type, volume: row.volume,
                position: row.position, average_open: row.average_open, cash_pnl: row.cash_pnl, fee: row.fee, 
                total_pnl: row.total_pnl, total_fees: row.total_fees
        }
        all_rows.push(r);
    }

    await app.process_trade_pnl(nr_rows, row_callback);
    return all_rows;
}


async function live_pnl_rows() {
    /** Aggregates the live position rows. */

    let all_rows = [];  
    
    async function get_live_pnl(row) {
        let price = await exchange.get_rate(row.pair);
        let ao = row.average_open;
        let cash_pnl = row.position * (price - ao);
        let rel_pnl = (price / ao - 1) * 100;
        
        let r = [row.pair, row.position, ao, price, cash_pnl, rel_pnl];

        all_rows.push(r);
    }

    return all_rows;
}

module.exports = {
  syncTrades: function *() {
    /** Fetches the new trades from the exchange and stores them in the database.
     *  Returns a list of new trades or the last 5 if no new trades found.
     */
        
    let nr_rows = 10; // Default nr of rows to show
    // use yield instead of await 
    let nr_new_trades = yield app.fetch_new_trades();
    
    // If no new trades, then show pnl for the last 10.
    nr_rows = Math.max(nr_new_trades, nr_rows);
    let msg = "Fetched " + nr_new_trades + " new trades. Showing last " + nr_rows + " trades.";
    
    let all_rows = yield trade_pnl_rows(nr_rows);
    
    let answer =  {
        trade_msg: msg,
        headers: ["id", "time", "pair", "price", "type", "volume", "position", "average_open", "cash_pnl", "fee", "total pnl", "total fees"],
        rows: all_rows
    };
    this.body = answer;
  },
      
  syncSpots: function *() {
    /** Queries the latest spot prices from the exchange and calculates the live PnL.
     *  Returns a list of positions.
     */
    
    let all_rows = yield app.get_all_positions();

    let answer =  {
      headers: ["pair", "position",  "average_open", "price", "PnL (term)", "PnL %"],
      position_msg: 'Showing live positions',
      rows: all_rows
    };
    this.body = answer;
  },

}