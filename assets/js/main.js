window.addEventListener('scroll', function() {
    const element = document.getElementById('firstSection');
    const rect = element.getBoundingClientRect();
  
    if (rect.top <= 0) {
        this.document.getElementsByTagName('body')[0].style.backgroundImage = 'none';
        this.document.getElementsByClassName('nav')[0].classList.add('active');
        this.document.getElementsByClassName('divider')[0].classList.add('active');
        this.document.getElementsByClassName('top')[0].classList.add('active');
    } else {
        this.document.getElementsByTagName('body')[0].style.backgroundImage = `url('/assets/images/banner.jpg')`;
        this.document.getElementsByClassName('nav')[0].classList.remove('active');
        this.document.getElementsByClassName('divider')[0].classList.remove('active');
        this.document.getElementsByClassName('top')[0].classList.remove('active');
    }
});

const modalimg_element = document.getElementsByClassName('image-modal')[0];
const modalimg_projector = document.getElementById('modalimg');

function modalimg(element) {
    let url = element.getAttribute('src')
    modalimg_element.classList.add('active');
    modalimg_projector.setAttribute('src', url)
}

function closeimgmodal(element) {
    modalimg_element.classList.remove('active');
    modalimg_projector.removeAttribute('src')
}

function smoothScroll(id){
    let element = document.getElementsByClassName(id)[0]
    let y = element.getBoundingClientRect().top + window.scrollY -100;
    window.scrollTo({top: y, behavior: 'smooth'})
}

// document.getElementById('particles-js').setAttribute('width', window.innerWidth)

// Copyright footer
document.getElementById('c').innerHTML = `&copy; ${new Date().getFullYear()} PWTC Oil. All rights reserved.`