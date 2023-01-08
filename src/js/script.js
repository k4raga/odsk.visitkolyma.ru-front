window.addEventListener('DOMContentLoaded', (e) => {
    function createCard(nomineeItemLink, nomineeImg, nomineePersonImg, nomineePersonName) {
        const NOMINEE_ITEMS = document.querySelector('.nominee-items')
        if (NOMINEE_ITEMS) {
            const content = `
        <div class="nominee-item">
            <a class='nominee-item-link' href="${nomineeItemLink}">
                <div class="nominee-photo">
                    <img class="nominee-img" src="${nomineeImg}" alt="фото участника">
                    <img class="nominee-search" src="/local/templates/visitkolyma/assets/nominee-search.png" alt="подробнее">
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

    function createSocial(tagName, tagLink) {
        const SOCIAL_NOMINEE = document.querySelector('.social-nominee')
        let content = ''
        if (SOCIAL_NOMINEE) {
            switch (tagName) {
                case 'VK':
                    content = `
                    <a href="${tagLink}" target="_blank" id="social-link">
                            <img src="/local/templates/visitkolyma/assets/social_vk.png" alt="вк">
                        </a>
        `
                    SOCIAL_NOMINEE.innerHTML += content
                    break;
                case 'INSTAGRAM':
                    content = `
                    <a href="${tagLink}" target="_blank" id="social-link">
                            <img src="/local/templates/visitkolyma/assets/social_media_button.png" alt="Инстаграм">
                        </a>
        `
                    SOCIAL_NOMINEE.innerHTML += content
                    break;
                case 'PINTEREST':
                    content = `
                    <a href="${tagLink}" target="_blank" id="social-link">
                            <img src="/local/templates/visitkolyma/assets/social_pinterest.png" alt="Пинтерест">
                        </a>
        `
                    SOCIAL_NOMINEE.innerHTML += content
                    break;
                case 'TELEGRAM':
                    content = `
                    <a href="${tagLink}" target="_blank" id="social-link">
                            <img src="/local/templates/visitkolyma/assets/social_telegram.png" alt="Телеграм">
                        </a>
        `
                    SOCIAL_NOMINEE.innerHTML += content
                    break;
            }
        }
    }


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

    function createProfile(id, photoNominee, nameNominee, profession, genre, path, event) {
        const ABOUT_NOMINEE = document.querySelector('.about-nominee')
        if (ABOUT_NOMINEE) {
            const content = `
                    <div class="photographer-wrapper">
                <div class="photographer">
                    <div class="photo-nominee">
                        <img src="${photoNominee}" alt="Фото участника"></div>
                    <div class="name-nominee">${nameNominee}</div>
                    <div class="social-nominee">
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

    function togglePopup(el) {
        el.classList.toggle('active')
    }

    //push hash to localstorage
    let urlParams = new URLSearchParams(window.location.search),
        hash = urlParams.get('hash') ?? ''

    if (hash) {
        window.localStorage.setItem('hash', hash)
    }

    // AJAX list
    const NOMINEE_ITEMS = document.querySelector('.nominee-items'),
        NOMINEE_WRAPPER = document.querySelector('.nominee')
    if (NOMINEE_ITEMS) {
        fetch('/api/contest/participant/list/')
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                if (response.status) {
                    for (const el of response.data) {
                        createCard(`/detail/?id=${el.id}`, el.image, el.avatar, el.fio)
                    }
                } else {
                    NOMINEE_WRAPPER.classList.add('hidden')
                }
            })
    }

    // AJAX detail
    const ABOUT_NOMINEE = document.querySelector('.about-nominee')
    if (ABOUT_NOMINEE) {
        let urlParams = new URLSearchParams(window.location.search),
            id = urlParams.get('id')

        if (window.localStorage.getItem('hash')) {
            hash = window.localStorage.getItem('hash')
        } else {
            hash = urlParams.get('hash') ?? ''
        }

        if (!id) {
            window.location.href = "/"
        }

        fetch(`/api/contest/participant/detail/?id=${id}&hash=${hash}`)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                if (response.status) {
                    createProfile(
                        response.data.id,
                        response.data.avatar,
                        response.data.fio,
                        response.data.profession,
                        response.data.main_genre,
                        response.data.path_photography_text,
                        response.data.most_memorable_text,
                    )


                    //create socials
                    for (const [socialName, socialLink] of Object.entries(response.data.socials)) {
                        createSocial(socialName, socialLink)
                    }

                    //create images library
                    for (const img of response.data.images) {
                        createImg(img)
                    }

                    //HANDLE ACTIONS
                    const BUTTONS_VOTE = document.querySelectorAll('.btn-vote')
                    switch (response.data.action) {
                        case 'signup':
                            const POPUP_AUTHORIZATION = document.querySelector('.authorization')
                            if (POPUP_AUTHORIZATION) {
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
                            break;
                        case 'hide':
                            for (let i = 0; i < BUTTONS_VOTE.length; i++) {
                                BUTTONS_VOTE[i].classList.add('hidden')
                            }
                            break;
                        case 'vote':
                            let urlParams = new URLSearchParams(window.location.search),
                                id = urlParams.get('id')

                            if (window.localStorage.getItem('hash')) {
                                hash = window.localStorage.getItem('hash')
                            } else {
                                hash = urlParams.get('hash') ?? ''
                            }

                            for (let i = 0; i < BUTTONS_VOTE.length; i++) {
                                let button_vote = BUTTONS_VOTE[i]
                                button_vote.addEventListener('click', (e) => {
                                    console.log(hash)
                                    fetch(`/api/contest/voting/vote/?id=${id}&hash=${hash}`, {
                                        method: 'POST',
                                    })
                                        .then((response) => {
                                            return response.json()
                                        })
                                        .then((response) => {
                                            if (response.status) {
                                                let popupVote = document.querySelector('.vote')
                                                console.log(popupVote)
                                                togglePopup(popupVote)
                                            }
                                        })
                                })
                            }
                            break;
                    }


                } else {
                    window.location.href = "/"
                }
            })

        // AJAX signup
        const SIGNUP_FORM = document.querySelector('.authorization-form')
        if (SIGNUP_FORM) {
            SIGNUP_FORM.addEventListener('submit', (e) => {
                e.preventDefault()
                let formData = new FormData(SIGNUP_FORM)

                let urlParams = new URLSearchParams(window.location.search),
                    id = urlParams.get('id')

                formData.append('id', id)

                fetch('/api/contest/voting/sign_up/', {
                    method: 'POST',
                    body: formData
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((response) => {
                        if (response.status) {
                            let popupEmail = document.querySelector('.email')
                            togglePopup(SIGNUP_FORM)
                            togglePopup(popupEmail)
                        }
                    })
            })
        }

    }

})


