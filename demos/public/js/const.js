const PRODUCTION_SERVER_IP = "163.172.27.226";
const SCREEN_CONNECTION_NAME = "demiotest";
const WEBCAM_CONNECTION_NAME = "demiotestA";
const COORDINATOR_CONNECTION_NAME = "coordinator";
const TURN_USERNAME = "demio";
const TURN_CREDENTIAL = "demiotest";
const COORDINATOR_NAME_SUFFIX = "demio_coordinator_";

const SOCKET_MESSAGE_EVENT = "scalable-screen-broadcast-demo";

// SOCKET EVENTS:
const CHECK_BROADCAST_PRESENCE_EVENT = "check-broadcast-presence";
const JOIN_BROADCAST_EVENT = "join-broadcast";
const CAN_RELAY_BROADCAST_EVENT = "can-relay-broadcast";
const CAN_NOT_RELAY_BROADCAST_EVENT = "can-not-relay-broadcast";
const LOGS_EVENT = "logs";
const JOIN_BROADCASTER_EVENT = "join-broadcaster";
const REJOIN_BROADCAST_EVENT = "rejoin-broadcast";
const BROADCAST_STOPPED_EVENT = "broadcast-stopped";
const START_BROADCASTING_EVENT = "start-broadcasting";
const NEW_COORDINATOR_EVENT = "new-coordinator";
const NEW_CLIENT_CONNECTED_EVENT = "new-client-connected";
const MUTE_WEBCAM_EVENT = "mute-webcam";
const UNMUTE_WEBCAM_EVENT = "unmute-webcam";