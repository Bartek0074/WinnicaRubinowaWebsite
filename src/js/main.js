const cookieStorage = {
    getItem: (item) => {
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value }), {});
        return cookies[item];
    },
    setItem: (item, value) => {
        document.cookie = `${item}=${value};`
    }
}

const storageType = cookieStorage;
const consentPropertyName = 'jdc_consent';
const burgerBtnBar = document.querySelector('.burger-btn');
const burgerBtnX = document.querySelector('.burger-btn--close');
const nav = document.querySelector('.nav-mobile');
const allNavItems = document.querySelectorAll('.nav__item');
const allNavDesktopItems = document.querySelectorAll('.nav-desktop__item');
const allNavMobileItems = document.querySelectorAll('.nav-mobile__item');
const footerYear = document.querySelector('.footer-year')
const allSections = document.querySelectorAll('.section');
const submitBtn = document.querySelector('.contact-form-btn');

// age verification

const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {

    const acceptFn = event => {
        saveToStorage(storageType);
        consentPopup.classList.add('consent-popup--hidden');
        document.body.classList.remove('body--hidden');
    }
    const consentPopup = document.getElementById('consent-popup');
    const acceptBtn = document.getElementById('accept');
    acceptBtn.addEventListener('click', acceptFn);

    if (shouldShowPopup(storageType)) {
        document.body.classList.add('body--hidden');
        consentPopup.classList.remove('consent-popup--hidden');
    }
    else{
        document.body.classList.remove('body--hidden');
    }

};

const handleMobileNavObserver = () => {
    const currentSection = window.scrollY;

    allSections.forEach(section => {
        if (section.classList.contains('section-purple') && section.offsetTop <= currentSection) {
            burgerBtnBar.classList.add('burger-btn--green')
        } else if (!section.classList.contains('section-purple') && section.offsetTop <= currentSection + 60) {
            burgerBtnBar.classList.remove('burger-btn--green')
        }
    })
}

const handleNavObserver = () => {
    const currentSection = window.scrollY + 75;
    if (currentSection < allSections[3].offsetTop) {
        allNavDesktopItems.forEach(item => {
            item.classList.remove('nav-desktop__item--active')
        })
        allNavDesktopItems[0].classList.add('nav-desktop__item--active')
        allNavMobileItems.forEach(item => {
            item.classList.remove('nav-mobile__item--active')
        })
        allNavMobileItems[0].classList.add('nav-mobile__item--active')

    } else if (currentSection < allSections[4].offsetTop) {
        allNavDesktopItems.forEach(item => {
            item.classList.remove('nav-desktop__item--active');
        })
        allNavDesktopItems[1].classList.add('nav-desktop__item--active')
        allNavMobileItems.forEach(item => {
            item.classList.remove('nav-mobile__item--active')
        })
        allNavMobileItems[1].classList.add('nav-mobile__item--active')
    } else if (currentSection < allSections[5].offsetTop) {
        allNavDesktopItems.forEach(item => {
            item.classList.remove('nav-desktop__item--active');
        })
        allNavDesktopItems[2].classList.add('nav-desktop__item--active');
        allNavMobileItems.forEach(item => {
            item.classList.remove('nav-mobile__item--active')
        })
        allNavMobileItems[2].classList.add('nav-mobile__item--active')
    } else if (currentSection < allSections[6].offsetTop) {
        allNavDesktopItems.forEach(item => {
            item.classList.remove('nav-desktop__item--active');
        })
        allNavDesktopItems[3].classList.add('nav-desktop__item--active');
        allNavMobileItems.forEach(item => {
            item.classList.remove('nav-mobile__item--active')
        })
        allNavMobileItems[3].classList.add('nav-mobile__item--active')
    } else if (currentSection => allSections[6].offsetTop) {
        allNavDesktopItems.forEach(item => {
            item.classList.remove('nav-desktop__item--active');
        })
        allNavDesktopItems[4].classList.add('nav-desktop__item--active');
        allNavMobileItems.forEach(item => {
            item.classList.remove('nav-mobile__item--active')
        })
        allNavMobileItems[4].classList.add('nav-mobile__item--active')
    }
}

const handleNav = () => {
    nav.classList.toggle('nav-mobile--active')

    allNavItems.forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.remove('nav-mobile--active')
        })
    })

    handleNavItemsAnimation();

}

const handleNavItemsAnimation = () => {
    let delayTime = 0;

    allNavItems.forEach(item => {
        item.classList.toggle('nav-mobile__items--animation');
        item.style.animationDelay = delayTime + 's';
        delayTime = delayTime + 0.1
    })
}
allNavItems.forEach(item => {
    item.addEventListener('click', () => {
        allNavItems.forEach(item =>{
            item.classList.remove('nav-mobile__items--animation');
        })
    })
})


const handleCurrentYear = () => {
    const year = (new Date).getFullYear();
    footerYear.innerText = year;
}

handleCurrentYear();


window.addEventListener('scroll', handleMobileNavObserver);
window.addEventListener('scroll', handleNavObserver);
burgerBtnBar.addEventListener('click', handleNav);
burgerBtnX.addEventListener('click', handleNav);