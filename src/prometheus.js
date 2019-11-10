const { register } = require('prom-client')
const promClient = require('prom-client')

class Prometheus {
  constructor() {

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

	totalTransfers() {
    return new promClient.Histogram({
      name: 'polkadot_account_transfer_total',
      help: 'Total number of transfers from an account',
      labels: ['sender_name', 'sender_address']
    })
  }
}

module.exports = {
  Prometheus
}
