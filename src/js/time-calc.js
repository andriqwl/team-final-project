const timeCalcRoot = document.querySelector('#time-calc-root')

if (timeCalcRoot) {
    const section = document.createElement('div')
    section.className = 'time-section'

    const topDivider = document.createElement('div')
    topDivider.className = 'divider'

    const title = document.createElement('h2')
    title.className = 'title'
    title.textContent = 'Калькулятор часу'

    const gameRow = document.createElement('div')
    gameRow.className = 'game-row'

    const controls = document.createElement('div')
    controls.className = 'controls'

    const input = document.createElement('input')
    input.type = 'number'
    input.className = 'input'
    input.placeholder = 'Введіть число'

    const button = document.createElement('button')
    button.className = 'btn'

    const vector = document.createElement('p')
    vector.className = 'vector'
    vector.textContent = '........................................'

    const result = document.createElement('p')
    result.className = 'result'

    const bottomDivider = document.createElement('div')
    bottomDivider.className = 'divider'

    function calculateTime() {
        const minutes = Number(input.value)

        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60

        result.textContent = `${hours}:${String(mins).padStart(2, '0')}`
    }

    button.addEventListener('click', calculateTime)

    controls.append(input, button)
    gameRow.append(controls, vector, result)
    section.append(topDivider, title, gameRow, bottomDivider)
    timeCalcRoot.appendChild(section)
}
