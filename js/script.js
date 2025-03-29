// ヘッダーのスクロール効果
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navRight = document.querySelector('.nav-right');
    const sections = document.querySelectorAll('section');
    const slideshow = document.getElementById('recommendationSlider');
    const slides = slideshow.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const toggleMenuButton = document.getElementById('toggleMenuButton');
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuLists = document.querySelectorAll('.normal-menu-list');
    
    // スクロール時のヘッダー表示変更
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ナビゲーションのモバイルトグル
    navToggle.addEventListener('click', function() {
        navRight.classList.toggle('active');
    });
    
    // ナビゲーションクリック時のスムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // モバイルメニューを閉じる
            navRight.classList.remove('active');
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                const headerHeight = header.offsetHeight;
                
                window.scrollTo({
                    top: offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // スライドショー機能
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // スライドの表示を更新する関数
    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // 次のスライドへ
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlides();
    }
    
    // 前のスライドへ
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlides();
    }
    
    // 自動スライドショー（5秒ごと）
    let slideInterval = setInterval(nextSlide, 5000);
    
    // スライドショーのコントロール
    prevBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    nextBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // ドットのクリックでスライド切り替え
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            currentSlide = index;
            updateSlides();
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // メニュー表示切り替え
    let menuVisible = false;
    
    toggleMenuButton.addEventListener('click', function() {
        const menuLists = document.querySelector('.menu-lists');
        const menuTabs = document.querySelector('.menu-tabs');
        
        if (!menuVisible) {
            menuLists.style.display = 'block';
            menuTabs.style.display = 'flex';
            toggleMenuButton.textContent = 'メニューを閉じる';
            menuVisible = true;
        } else {
            menuLists.style.display = 'none';
            menuTabs.style.display = 'none';
            toggleMenuButton.textContent = '通常メニューを表示';
            menuVisible = false;
        }
    });
    
    // タブメニュー
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 全てのタブと内容を非アクティブに
            menuTabs.forEach(t => t.classList.remove('active'));
            menuLists.forEach(list => list.classList.remove('active'));
            
            // クリックされたタブとその内容をアクティブに
            this.classList.add('active');
            document.getElementById(tabId + 'List').classList.add('active');
        });
    });
    
    // スクロールアニメーション
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.querySelector('.section-header')?.classList.add('show');
                section.querySelector('.section-intro')?.classList.add('show');
                
                const charmItems = section.querySelectorAll('.charm-item');
                if (charmItems.length) {
                    charmItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('show');
                        }, index * 150);
                    });
                }
                
                const aboutContent = section.querySelector('.about-content');
                if (aboutContent) {
                    aboutContent.classList.add('show');
                }
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初期チェック
    
    // ページ読み込み時にメニューのタブとリストを隠す
    document.querySelector('.menu-lists').style.display = 'none';
    document.querySelector('.menu-tabs').style.display = 'none';
});