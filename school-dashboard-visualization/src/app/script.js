function showState(stateId) {
    let map = document.getElementById("india-map");
    let states = map.querySelectorAll("path");
    
    states.forEach(state => {
        if (state.id === stateId) {
            state.style.transform = "scale(2)";
            state.style.transformOrigin = "center";
        } else {
            state.style.display = "none";
        }
    });

    document.getElementById("reset-button").style.display = "block";
}

function resetMap() {
    let map = document.getElementById("india-map");
    let states = map.querySelectorAll("path");

    states.forEach(state => {
        state.style.display = "block";
        state.style.transform = "scale(1)";
    });

    document.getElementById("reset-button").style.display = "none";
}
