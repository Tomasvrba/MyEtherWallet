import { api, getDevicePath, connect } from './bitbox02.js'

const firmwareAPI = api.firmware;

function reset() {
    document.getElementById("demo").disabled = false;
    document.getElementById("initialized").style.display = "hidden";
}

export async function demo() {
    const initializedDiv = document.getElementById("initialized");
    document.getElementById("demo").disabled = true;

    let firmware = await document.getElementById('bbFrame').contentWindow.init(getDevicePath, connect, reset);
    if (!firmware) {
        console.log("no firmware")
        return
    }

    // ready to use
    switch (firmware.Product()) {
        case api.common.Product.BitBox02Multi:
            console.log("This is a BitBox02 Multi");
            break;
        case api.common.Product.BitBox02BTCOnly:
            console.log("This is a BitBox02 BTC-only");
            break;
    }
    console.log("supports ETH? ->", firmware.SupportsETH(firmwareAPI.messages.ETHCoin.ETH));


    document.getElementById("bbFrame").style.display = "none";
    initializedDiv.style.display = "block";
    const HARDENED = 0x80000000;
    document.getElementById("btcPub").addEventListener("click", async () => {
        const pub = display => firmware.js.AsyncBTCPub(
            firmwareAPI.messages.BTCCoin.BTC,
            [84 + HARDENED, 0 + HARDENED, 0 + HARDENED, 0, 0],
            firmwareAPI.messages.BTCPubRequest_OutputType.ADDRESS,
            firmwareAPI.messages.BTCScriptType.SCRIPT_P2WPKH,
            display,
        )
        const addr = await pub(false);
        pub(true);
        alert(addr);
    });
    document.getElementById("ethPub").addEventListener("click", async () => {
        const pub = display => firmware.js.AsyncETHPub(
            firmwareAPI.messages.ETHCoin.ETH,
            [44 + HARDENED, 60 + HARDENED, 0 + HARDENED, 0, 0],
            firmwareAPI.messages.ETHPubRequest_OutputType.ADDRESS,
            // firmwareAPI.messages.ETHPubRequest_OutputType.XPUB,
            display,
            new Uint8Array(),
        )
        const addr = await pub(false);
        pub(true);
        alert(addr);
    });
    ethSign.addEventListener("click", async () => {
        try {
            const sig = await firmware.js.AsyncETHSign(
                firmwareAPI.messages.ETHCoin.ETH,
                [44 + HARDENED, 60 + HARDENED, 0 + HARDENED, 0, 0],
                8156,
                "6000000000",
                21000,
                new Uint8Array([4, 242, 100, 207, 52, 68, 3, 19, 180, 160, 25, 42, 53, 40, 20, 251, 233, 39, 184, 133]),
                "530564000000000000",
                new Uint8Array([]),
            );
            console.log(sig);
        } catch(err) {
            if (firmwareAPI.IsErrorAbort(err)) {
                alert("aborted by user");
            } else {
                alert(err.Message);
            }
        }
    });
}

document.getElementById("demo").addEventListener("click", demo);
