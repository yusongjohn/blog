function remSet() {
    let root = document.documentElement;
    let actualWidth = root.clientWidth;
    let designWidth = 1920;
    let rootFontSize = (100 / designWidth) * actualWidth + 'px';
    root.style.fontSize = rootFontSize;
}

window.addEventListener('resize', remSet);
