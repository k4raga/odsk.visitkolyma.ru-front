window.addEventListener('DOMContentLoaded', (e) => {
    const BUTTONS_VOTE = document.querySelectorAll('.btn-vote')
    const POPUP_AUTHORIZATION = document.querySelector('.authorization')
    const CLOSE_BUTTON_AUTHORIZATION = POPUP_AUTHORIZATION.querySelector('.close')


    function togglePopup(el) {
        el.classList.toggle('active')
    }

    // показываем авторизацию
    for (let i = 0; i < BUTTONS_VOTE.length; i++) {
        let button_vote = BUTTONS_VOTE[i]
        button_vote.addEventListener('click', (e) => {
            togglePopup(POPUP_AUTHORIZATION)
        })
    }

    CLOSE_BUTTON_AUTHORIZATION.addEventListener('click', (e) => {
        togglePopup(POPUP_AUTHORIZATION)
    })


})