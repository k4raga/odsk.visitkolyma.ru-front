window.addEventListener('DOMContentLoaded', (e) => {
    const BUTTONS_VOTE = document.querySelectorAll('.btn-vote')
    const POPUP_AUTHORIZATION = document.querySelector('.authorization')



    function togglePopup(el) {
        el.classList.toggle('active')
    }
    if(POPUP_AUTHORIZATION) {
        const CLOSE_BUTTON_AUTHORIZATION = POPUP_AUTHORIZATION.querySelector('.close')
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
    }



    function createCard(nomineeItemLink, nomineeImg, nomineePersonImg,nomineePersonName) {
        const NOMINEE_ITEMS = document.querySelector('.nominee-items')
        if (NOMINEE_ITEMS) {
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

    }
    createCard('link', 'img', 'img2', 'Иван')


    function createImg(imgUrl) {
        const GALLERY_NOMINEE = document.querySelector('.gallery-nominee')
        if (GALLERY_NOMINEE) {
            const content = `
                    <div class="photo-item">
                <img src="${imgUrl}" alt="Фото на конкурс">
            </div>
        `
            GALLERY_NOMINEE.innerHTML += content
        }
    }
    createImg('img')

    function createProfile(id, photoNominee, nameNominee, socialNominee, profession, genre, path, event) {
        const ABOUT_NOMINEE = document.querySelector('.about-nominee')
        if (ABOUT_NOMINEE) {
            const content = `
                    <div class="photographer-wrapper">
                <div class="photographer">
                    <div class="photo-nominee">
                        <img src="${photoNominee}" alt="Фото участника"></div>
                    <div class="name-nominee">${nameNominee}</div>
                    <div class="social-nominee">
                        <img src="${socialNominee}" alt="вк">
                    </div>
                </div>
                <div class="btn btn-vote">Проголосовать</div>
            </div>
            <div class="wrapper-details">
                <div class="profession">
                    <div class="title">Профессия:</div>
                    <div class="description">${profession}</div>
                </div>
                <div class="genre">
                    <div class="title">Основной жанр фотографии:</div>
                    <div class="description">${genre}</div>
                </div>
            </div>
            <div class="more-info">
                <div class="path">
                    <div class="title">Путь, становление, развитие в фотографии:</div>
                    <div class="description">${path}</div>
                </div>
                <div class="event">
                    <div class="title">Самое запоминающееся фотоприключение в Магаданской области:
                    </div>
                    <div class="description">${event}
                    </div>
                </div>
            </div>
        `
            ABOUT_NOMINEE.innerHTML = content
        }
    }
    createProfile('img', 'Иван', 'ВК', 'Учитель', 'Свободный', 'Путь', 'Hfp ldf ')


})


