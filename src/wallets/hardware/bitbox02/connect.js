function reset() {
    document.getElementById("pairing").style.display = "none";
    document.getElementById("pairingOK").disabled = true;
}

async function init(getDevicePath, connect, resetParent) {
    const pairingOKButton = document.getElementById("pairingOK");
    try {
        const devicePath = await getDevicePath();
        return firmware = await connect(
            devicePath,
            pairingCode => {
                document.getElementById("pairing").style.display = "block";
                document.getElementById("pairingCode").innerHTML = pairingCode.replace("\n", "<br/>");
            },
            () => {
                return new Promise(resolve => {
                    pairingOKButton.disabled = false;
                    pairingOKButton.addEventListener("click", resolve);
                });
            },
            attestationResult => {
                alert("Attestation check: " + attestationResult);
            },
        );
        
    } catch(err) {
        alert(err);
        reset();
        resetParent();
    }
}
