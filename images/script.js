//------------ slider product---------------
document.querySelectorAll('.carousel-control-next, .carousel-control-prev').forEach(button => {
    button.addEventListener('click', (e) => {
        const carouselInner = document.querySelector('.carousel-inner');
        let activeItem = carouselInner.querySelector('.carousel-item.active');
        let newActiveItem;

        if (e.target.classList.contains('carousel-control-next')) {
            newActiveItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
        } else {
            newActiveItem = activeItem.previousElementSibling || carouselInner.lastElementChild;
        }

        activeItem.classList.remove('active');
        newActiveItem.classList.add('active');
    });
});
</script>