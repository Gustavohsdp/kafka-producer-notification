
const { Kafka } = require('kafkajs')
const { randomUUID } = require('node:crypto')


async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['adjusted-elf-11833-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: '**********************************',
      password: '**********************************',
    },
    ssl: true,
  })
  const producer = kafka.producer()

await producer.connect()
await producer.send({
    topic: 'notifications.send-notification',
    messages: [
        {  value: JSON.stringify({
          content: 'Nova notificação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        }) },
    ],
})

await producer.disconnect()
}

bootstrap()