function changeSpinSpeed(speed) {
    document.body.style.animation = `gradientSpin ${speed}s infinite linear`;
}

setTimeout(() => changeSpinSpeed(2), 3000);