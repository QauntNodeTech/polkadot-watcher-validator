const { register } = require('prom-client')
const promClient = require('prom-client')

class Prometheus {
  constructor() {
    this._initMetrics()
  }

  startCollection() {
		console.log(
			'Starting the collection of metrics, the metrics are available on /metrics'
		)
		promClient.collectDefaultMetrics()
	}

	injectMetricsRoute(app) {
		app.get('/metrics', (req, res) => {
			res.set('Content-Type', register.contentType)
			res.end(register.metrics())
		})
	}

  increaseTotalTransactions(sender_name, sender_address) {
    this.totalTransactions.inc({sender_name, sender_address})
  }

  _initMetrics() {
    this.totalTransactions = new promClient.Counter({
      name: 'polkadot_account_transaction_total',
      help: 'Total number of transfers from an account',
      labelNames: ['sender_name', 'sender_address']
    })
  }
}

module.exports = {
  Prometheus
}
