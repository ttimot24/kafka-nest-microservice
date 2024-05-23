export const environment = {
    kafka: {
        brokers: ['localhost:9092'],
        groupId: 'kafka-nest-consumer',
        topic: 'mndwrk-zilla-response', 
    },
    schemaRegistry: {
        url: 'http://localhost:8081',
        username: '',
        password: ''
    }
}