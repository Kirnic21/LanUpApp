import env from "react-native-config";
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

const logLevel = !env.IS_PRODUCTION
    ? LogLevel.Debug
    : LogLevel.Error


const URL = `${env.REACT_APP_API}/vacancies/`

let connection;
let isStarted = false

const statusConnected = conn => (conn?.connection?.connectionState === 1)
const invokeConnectionId = conn => conn.invoke('getConnectionId')

export const channels = {
    RECEIVE_VACANCY: 'ReceiveEmergencyVacancy'
}


export const connect = (retry = 5) =>
    new Promise((resolve, reject) => {
        const onErrorTryAgain = () => {
            if (!retry) {
                reject({ errorMessage: 'Não foi possivel se conectar com o SignalR' })
                return
            }
            setTimeout(() => connect(retry - 1).then(resolve), 1000)
        }

        if (!connection) {
            connection = new HubConnectionBuilder()
                .withUrl(URL, { skipNegotiation: true, transport: HttpTransportType.WebSockets })
                .configureLogging(logLevel)
                .build()
        }

        if (statusConnected(connection)) {
            resolve(connection)
            return
        }

        if (isStarted) { // start was called, wait 1000 ms to try again
            isStarted = true
            setTimeout(() => connect().then(resolve), 1000)
            return
        }

        connection.start()
            .then(() =>
                invokeConnectionId(connection)
                    .then(() => resolve(connection))
                    .catch(onErrorTryAgain)
            ).catch(onErrorTryAgain)
    })

export default {
    connect,
    channels
}
