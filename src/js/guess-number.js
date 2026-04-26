//Тут пишіть свій скрипт
//Тут пишіть свій скрипт

const guessNumberRoot = document.querySelector('#guess-number-root')

if (guessNumberRoot) {
    const style = document.createElement('style')
    style.setAttribute('data-dom-section', 'guess-numbers')

    document.head.appendChild(style)

    const section = document.createElement('div')
    section.className = 'guess-section'

    const topDivider = document.createElement('div')
    topDivider.className = 'divider'

    const title = document.createElement('h2')
    title.className = 'title'
    title.textContent = 'Вгадай число, яке загадав комп’ютер'

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
    button.textContent = ''

    const result = document.createElement('p')
    result.className = 'result'

    const bottomDivider = document.createElement('div')
    bottomDivider.className = 'divider'

    
    controls.append(input, button)
    gameRow.append(controls, result)
    section.append(topDivider, title, gameRow, bottomDivider)
    guessNumberRoot.appendChild(section)

    const computerNumber = Math.floor(Math.random() * 10) + 1

    function check() {
        const userNumber = Number(input.value)

        if (userNumber === computerNumber) {
            result.textContent = `Вітаю, ви вгадали число! (${computerNumber})`
            result.style.color = '#039900'
        } else {
            result.textContent = `Ви програли, комп’ютер загадав (${computerNumber})`
            result.style.color = 'red'
        }
    }

    button.addEventListener('click', check)
}
