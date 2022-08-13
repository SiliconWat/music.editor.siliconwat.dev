const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/sw-player/shadow.css">
    <ul>
        <li><input placeholder="Tempo"></li>
        <li id="play">▶️</li>
        <li id="pause">⏸</li>
        <li id="stop">⏹</li>
        <li id="copy">📑</li>
        <li id="paste">📋</li>
        <li id="delete">Ｘ</li>
        <li id="new">🆕</li>
    </ul>
`;

export default template;