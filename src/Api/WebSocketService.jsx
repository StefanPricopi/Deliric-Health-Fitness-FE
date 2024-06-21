import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class WebSocketService {
    constructor() {
        this.stompClient = null;
        this.connected = false;
        this.connectCallback = null;
        this.errorCallback = null;
        this.pendingMessages = [];
    }

    connect(onConnected, onError) {
        this.connectCallback = onConnected;
        this.errorCallback = onError;
        const socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, () => {
            this.connected = true;
            this.pendingMessages.forEach(({ topic, message }) => {
                this.send(topic, message);
            });
            this.pendingMessages = [];
            if (this.connectCallback) this.connectCallback();
        }, () => {
            this.connected = false;
            if (this.errorCallback) this.errorCallback();
        });
    }

    disconnect() {
        if (this.stompClient && this.connected) {
            this.stompClient.disconnect(() => {
                console.log('Disconnected from WebSocket');
            });
            this.connected = false;
        }
    }

    subscribe(topic, callback) {
        if (this.stompClient && this.connected) {
            this.stompClient.subscribe(topic, callback);
        } else {
            console.error('WebSocket is not connected');
        }
    }

    send(topic, message) {
        if (this.stompClient && this.connected) {
            this.stompClient.send(topic, {}, JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected');
            this.pendingMessages.push({ topic, message });
            this.connect(this.connectCallback, this.errorCallback);
        }
    }

    isConnected() {
        return this.connected;
    }
}

export default new WebSocketService();
