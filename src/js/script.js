window.addEventListener('DOMContentLoaded', (e) => {
    const BUTTONS_VOTE = document.querySelectorAll('.btn-vote')
    const POPUP_AUTHORIZATION = document.querySelector('.authorization')
    // const CLOSE_BUTTON_AUTHORIZATION = POPUP_AUTHORIZATION.querySelector('.close')
    const NOMINEE_ITEMS = document.querySelector('.nominee-items')

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

    // CLOSE_BUTTON_AUTHORIZATION.addEventListener('click', (e) => {
    //     togglePopup(POPUP_AUTHORIZATION)
    // })

    function createCard(nomineeItemLink, nomineeImg, nomineePersonImg,nomineePersonName) {
        const content = `
        <div class="nominee-item">
            <a class='nominee-item-link' href="${nomineeItemLink}">
                <div class="nominee-photo">
                    <img class="nominee-img" src="${nomineeImg}" alt="фото участника">
                    <img class="nominee-search" src="../img/nominee-search.png" alt="подробнее">
                </div>
                <div class="nominee-person">
                    <img class="nominee-person-img" src="${nomineePersonImg}" alt="Фото участника">
                    <div class="nominee-person-name">${nomineePersonName}</div>
                </div>
            </a>
        </div>
         
  `;
        NOMINEE_ITEMS.innerHTML += content
    }
    createCard('link', 'img', 'img2', 'Иван')

})