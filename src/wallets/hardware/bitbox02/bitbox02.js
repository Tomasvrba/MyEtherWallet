/* eslint-disable no-unused-vars */
// import * as bb02 from './bitbox02-api-go.js';
import '../../../../public/bitbox02-api-go.js';

// const getBB02 = () => import('./bitbox02-api-go.js')

// getBB02().then(bitbox02 => bitbox02)

export const api = bitbox02;

const firmwareAPI = api.firmware;

export async function getDevicePath() {
  let response;
  try {
    response = await fetch('http://localhost:8178/api/v1/devices', {
      method: 'GET',
      headers: {}
    });
  } catch {
    throw new Error(
      'BitBoxBridge not found. Please install and run the BitBoxBridge to connect your BitBox02'
    );
  }
  const devices = (await response.json()).devices;
  if (devices.length !== 1) {
    throw new Error('Expected one BitBox02');
  }
  const devicePath = devices[0].path;
  return devicePath;
}

function promisify(f) {
  return function(...args) {
    return new Promise((resolve, reject) =>
      f((...results) => {
        const err = results.pop();
        if (err !== null) {
          return reject(err);
        }
        return resolve(...results);
      }, ...args)
    );
  };
}

export async function connect(
  devicePath,
  showPairing,
  userVerify,
  handleAttestation
) {
  return new Promise((resolve, reject) => {
    function onWrite(bytes) {
      if (socket.readyState != WebSocket.OPEN) {
        console.log('SOCKET NOT OPEN YET!!');
        return;
      }
      socket.send(bytes);
    }

    let firmware;
    const socket = new WebSocket(
      'ws://127.0.0.1:8178/api/v1/socket/' + devicePath
    );
    socket.binaryType = 'arraybuffer';
    socket.onopen = async function(_event) {
      try {
        firmware = firmwareAPI.New(onWrite);

        // Turn all Async* methods into promises.
        for (const key in firmware.js) {
          if (key.startsWith('Async')) {
            firmware.js[key] = promisify(firmware.js[key]);
          }
        }

        firmware.SetOnEvent(ev => {
          if (
            ev === firmwareAPI.Event.StatusChanged &&
            firmware.Status() == firmwareAPI.Status.Unpaired
          ) {
            const [channelHash] = firmware.ChannelHash();
            showPairing(channelHash);
          }
          if (ev === firmwareAPI.Event.AttestationCheckDone) {
            handleAttestation(firmware.Attestation());
          }
        });

        await firmware.js.AsyncInit();
        switch (firmware.Status()) {
          case firmwareAPI.Status.PairingFailed:
            socket.close();
            throw new Error('pairing rejected; try again');
          case firmwareAPI.Status.Unpaired:
            console.log(' Unpaired')
            await userVerify();
            await firmware.js.AsyncChannelHashVerify(true);
            break;
          case firmwareAPI.Status.Initialized:
            console.log('paired')
            // Pairing skipped.
            break;
          default:
            throw new Error(
              'Unexpected status: ' +
                firmware.Status() +
                ',' +
                firmwareAPI.Status.Unpaired
            );
        }

        resolve(firmware);
      } catch (err) {
        reject(err);
      }
    };
    socket.onerror = function(_event) {
      reject(
        'Your BitBox02 is busy. Please close all other wallets and try again.'
      );
    };
    socket.onmessage = function(event) {
      firmware.js.OnRead(new Uint8Array(event.data));
    };
    socket.onclose = function(_event) {
      console.log('onclose');
    };
  });
}
