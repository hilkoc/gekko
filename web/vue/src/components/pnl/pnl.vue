<template lang='jade'>
div.contain
  h2 Profit and Loss
  .hr
  h3 Trade History
  a.btn--primary(href='#', v-on:click.prevent='openAddApi') Sync trades
  .hr
  h3 Live positions
  a.btn--primary(href='#', v-on:click.prevent='openAddApi') Sync live spots
  
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
      addApiToggle: false,
    }
  },
  methods: {
    openAddApi: function() {
      this.addApiToggle = true;
    },
    removeApiKey: function(exchange) {
      if(!confirm('Are you sure you want to delete these API keys?'))
        return;

      post('removeApiKey', {exchange}, (error, response) => {
        if(error)
          return alert(error);
      });
    }
  },
  computed: {
    apiKeySets: function() {
      return this.$store.state.apiKeys
    }
  },
  watch: {
    apiKeySets: function() {
      this.addApiToggle = false;
    }
  }
}
</script>