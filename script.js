document.addEventListener('DOMContentLoaded', function () {
    var personaggioImmagini = document.querySelectorAll('.personaggio-img');

    personaggioImmagini.forEach(function (immagine, index) {
        immagine.addEventListener('mouseover', function () {
            var testoPersonaggio = immagine.getAttribute('data-personaggio');
            var elementoId = immagine.getAttribute('data-elemento-id');
            mostraTestoPersonaggio(testoPersonaggio, elementoId);
        });

        immagine.addEventListener('mouseout', function () {
            nascondiTestoPersonaggio();
        });
    });
});

function mostraTestoPersonaggio(testo, elementoId) {
    var testoElemento = document.getElementById(elementoId);
    if (testoElemento) {
        testoElemento.innerText = 'Nome del personaggio: ' + testo;
    }
}

function nascondiTestoPersonaggio() {
    var testoElemento1 = document.getElementById('personaggioTesto1');
    var testoElemento2 = document.getElementById('personaggioTesto2');
    var testoElemento3 = document.getElementById('personaggioTesto3');

    if (testoElemento1) {
        testoElemento1.innerText = '';
    }

    if (testoElemento2) {
        testoElemento2.innerText = '';
    }

    if (testoElemento3) {
        testoElemento3.innerText = '';
    }
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


// Plugin Timelinr
jQuery.fn.timelinr = function(options){
    // Impostazioni predefinite del plugin
    settings = jQuery.extend({
        orientation:                'horizontal',      // valore: horizontal | vertical, default a horizontal
        containerDiv:               '#timeline',       // valore: qualsiasi tag HTML o #id, default a #timeline
        datesDiv:                   '#dates',          // valore: qualsiasi tag HTML o #id, default a #dates
        datesSelectedClass:         'selected',        // valore: qualsiasi classe, default a selected
        datesSpeed:                 'normal',          // valore: intero tra 100 e 1000 (consigliato) o 'slow', 'normal' o 'fast'; default a normal
        issuesDiv:                  '#issues',         // valore: qualsiasi tag HTML o #id, default a #issues
        issuesSelectedClass:        'selected',        // valore: qualsiasi classe, default a selected
        issuesSpeed:                'fast',            // valore: intero tra 100 e 1000 (consigliato) o 'slow', 'normal' o 'fast'; default a fast
        issuesTransparency:         0.2,               // valore: intero tra 0 e 1 (consigliato), default a 0.2
        issuesTransparencySpeed:    500,               // valore: intero tra 100 e 1000 (consigliato), default a 500 (normal)
        prevButton:                 '#prev',           // valore: qualsiasi tag HTML o #id, default a #prev
        nextButton:                 '#next',           // valore: qualsiasi tag HTML o #id, default a #next
        arrowKeys:                  'false',           // valore: true | false, default a false
        startAt:                    1,                 // valore: intero, default a 1 (primo)
        autoPlay:                   'false',           // valore: true | false, default a false
        autoPlayDirection:          'forward',         // valore: forward | backward, default a forward
        autoPlayPause:              2000               // valore: intero (1000 = 1 secondo), default a 2000 (2 secondi)
    }, options);

    $(function(){
        // Dichiarazione delle variabili
        var howManyDates = $(settings.datesDiv+' li').length;
        var howManyIssues = $(settings.issuesDiv+' li').length;
        var currentDate = $(settings.datesDiv).find('a.'+settings.datesSelectedClass);
        var currentIssue = $(settings.issuesDiv).find('li.'+settings.issuesSelectedClass);
        var widthContainer = $(settings.containerDiv).width();
        var heightContainer = $(settings.containerDiv).height();
        var widthIssues = $(settings.issuesDiv).width();
        var heightIssues = $(settings.issuesDiv).height();
        var widthIssue = $(settings.issuesDiv+' li').width();
        var heightIssue = $(settings.issuesDiv+' li').height();
        var widthDates = $(settings.datesDiv).width();
        var heightDates = $(settings.datesDiv).height();
        var widthDate = $(settings.datesDiv+' li').width();
        var heightDate = $(settings.datesDiv+' li').height();

        // Impostazioni iniziali
        if(settings.orientation == 'horizontal') {  
            $(settings.issuesDiv).width(widthIssue*howManyIssues);
            $(settings.datesDiv).width(widthDate*howManyDates).css('marginLeft',widthContainer/2-widthDate/2);
            var defaultPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
        } else if(settings.orientation == 'vertical') {
            $(settings.issuesDiv).height(heightIssue*howManyIssues);
            $(settings.datesDiv).height(heightDate*howManyDates).css('marginTop',heightContainer/2-heightDate/2);
            var defaultPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));
        }

        // Gestione del clic su una data
        $(settings.datesDiv+' a').click(function(event){
            event.preventDefault();
            var whichIssue = $(this).text();
            var currentIndex = $(this).parent().prevAll().length;

            // Animazione degli elementi
            if(settings.orientation == 'horizontal') {
                $(settings.issuesDiv).animate({'marginLeft':-widthIssue*currentIndex},{queue:false, duration:settings.issuesSpeed});
            } else if(settings.orientation == 'vertical') {
                $(settings.issuesDiv).animate({'marginTop':-heightIssue*currentIndex},{queue:false, duration:settings.issuesSpeed});
            }

            $(settings.issuesDiv+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed})
                .removeClass(settings.issuesSelectedClass).eq(currentIndex).addClass(settings.issuesSelectedClass).fadeTo(settings.issuesTransparencySpeed,1);

            // Gestione visibilità pulsanti prev/next
            if(howManyDates == 1) {
                $(settings.prevButton+','+settings.nextButton).fadeOut('fast');
            } else if(howManyDates == 2) {
                if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
                    $(settings.prevButton).fadeOut('fast');
                    $(settings.nextButton).fadeIn('fast');
                } else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
                    $(settings.nextButton).fadeOut('fast');
                    $(settings.prevButton).fadeIn('fast');
                }
            } else {
                if( $(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
                    $(settings.nextButton).fadeIn('fast');
                    $(settings.prevButton).fadeOut('fast');
                } else if( $(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
                    $(settings.prevButton).fadeIn('fast');
                    $(settings.nextButton).fadeOut('fast');
                } else {
                    $(settings.nextButton+','+settings.prevButton).fadeIn('slow');
                }
            }

            // Animazione delle date
            $(settings.datesDiv+' a').removeClass(settings.datesSelectedClass);
            $(this).addClass(settings.datesSelectedClass);
            
            if(settings.orientation == 'horizontal') {
                $(settings.datesDiv).animate({'marginLeft':defaultPositionDates-(widthDate*currentIndex)},{queue:false, duration:'settings.datesSpeed'});
            } else if(settings.orientation == 'vertical') {
                $(settings.datesDiv).animate({'marginTop':defaultPositionDates-(heightDate*currentIndex)},{queue:false, duration:'settings.datesSpeed'});
            }
        });

        // Gestione clic sui pulsanti next/prev
        $(settings.nextButton).bind('click', function(event){
            event.preventDefault();

            // Gestione centratura delle date quando ci sono troppe date
            var currentIndex = $(settings.issuesDiv).find('li.'+settings.issuesSelectedClass).index();

            if(settings.orientation == 'horizontal') {
                var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0,$(settings.issuesDiv).css('marginLeft').indexOf('px')));
                var currentIssueIndex = currentPositionIssues/widthIssue;
                var currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
                var currentIssueDate = currentPositionDates-widthDate;

                if(currentPositionIssues <= -(widthIssue*howManyIssues-(widthIssue))) {
                    $(settings.issuesDiv).stop();
                    $(settings.datesDiv+' li:last-child a').click();
                } else {
                    if (!$(settings.issuesDiv).is(':animated')) {
                        $(settings.datesDiv+' li').eq(currentIndex+1).find('a').trigger('click');
                    }
                }
            } else if(settings.orientation == 'vertical') {
                var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginTop').substring(0,$(settings.issuesDiv).css('marginTop').indexOf('px')));
                var currentIssueIndex = currentPositionIssues/heightIssue;
                var currentPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));
                var currentIssueDate = currentPositionDates-heightDate;

                if(currentPositionIssues <= -(heightIssue*howManyIssues-(heightIssue))) {
                    $(settings.issuesDiv).stop();
                    $(settings.datesDiv+' li:last-child a').click();
                } else {
                    if (!$(settings.issuesDiv).is(':animated')) {
                        $(settings.datesDiv+' li').eq(currentIndex+1).find('a').trigger('click');
                    }
                }
            }

            // Gestione visibilità pulsanti prev/next
            if(howManyDates == 1) {
                $(settings.prevButton+','+settings.nextButton).fadeOut('fast');
            } else if(howManyDates == 2) {
                if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
                    $(settings.prevButton).fadeOut('fast');
                    $(settings.nextButton).fadeIn('fast');
                } else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
                    $(settings.nextButton).fadeOut('fast');
                    $(settings.prevButton).fadeIn('fast');
                }
            } else {
                if( $(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
                    $(settings.prevButton).fadeOut('fast');
                } else if( $(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
                    $(settings.nextButton).fadeOut('fast');
                } else {
                    $(settings.nextButton+','+settings.prevButton).fadeIn('slow');
                }
            }
        });

        // Gestione clic pulsante prev
        $(settings.prevButton).click(function(event){
            event.preventDefault();

            // Gestione centratura delle date quando ci sono troppe date
            var currentIndex = $(settings.issuesDiv).find('li.'+settings.issuesSelectedClass).index();

            if(settings.orientation == 'horizontal') {
                var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0,$(settings.issuesDiv).css('marginLeft').indexOf('px')));
                var currentIssueIndex = currentPositionIssues/widthIssue;
                var currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
                var currentIssueDate = currentPositionDates+widthDate;

                if(currentPositionIssues >= 0) {
                    $(settings.issuesDiv).stop();
                    $(settings.datesDiv+' li:first-child a').click();
                } else {
                    if (!$(settings.issuesDiv).is(':animated')) {
                        $(settings.datesDiv+' li').eq(currentIndex-1).find('a').trigger('click');
                    }
                }
            } else if(settings.orientation == 'vertical') {
                var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginTop').substring(0,$(settings.issuesDiv).css('marginTop').indexOf('px')));
                var currentIssueIndex = currentPositionIssues/heightIssue;
                var currentPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));
                var currentIssueDate = currentPositionDates+heightDate;

                if(currentPositionIssues >= 0) {
                    $(settings.issuesDiv).stop();
                    $(settings.datesDiv+' li:first-child a').click();
                } else {
                    if (!$(settings.issuesDiv).is(':animated')) {
                        $(settings.datesDiv+' li').eq(currentIndex-1).find('a').trigger('click');
                    }
                }
            }

            // Gestione visibilità pulsanti prev/next
            if(howManyDates == 1) {
                $(settings.prevButton+','+settings.nextButton).fadeOut('fast');
            } else if(howManyDates == 2) {
                if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
                    $(settings.prevButton).fadeOut('fast');
                    $(settings.nextButton).fadeIn('fast');
                } else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
                    $(settings.nextButton).fadeOut('fast');
                    $(settings.prevButton).fadeIn('fast');
                }
            } else {
                if( $(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
                    $(settings.prevButton).fadeOut('fast');
                } else if( $(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
                    $(settings.nextButton).fadeOut('fast');
                } else {
                    $(settings.nextButton+','+settings.prevButton).fadeIn('slow');
                }
            }
        });

        // Navigazione da tastiera, 
        if(settings.arrowKeys=='true') {
            if(settings.orientation=='horizontal') {
                $(document).keydown(function(event){
                    if (event.keyCode == 39) { 
                        $(settings.nextButton).click();
                    }
                    if (event.keyCode == 37) { 
                        $(settings.prevButton).click();
                    }
                });
            } else if(settings.orientation=='vertical') {
                $(document).keydown(function(event){
                    if (event.keyCode == 40) { 
                        $(settings.nextButton).click();
                    }
                    if (event.keyCode == 38) { 
                        $(settings.prevButton).click();
                    }
                });
            }
        }

        // Posizione predefinita al caricamento
        $(settings.datesDiv+' li').eq(settings.startAt-1).find('a').trigger('click');

        // AutoPlay
        if(settings.autoPlay == 'true') { 
            setInterval("autoPlay()", settings.autoPlayPause);
        }
    });
};

// Funzione AutoPlay, 
function autoPlay(){
    var currentDate = $(settings.datesDiv).find('a.'+settings.datesSelectedClass);
    if(settings.autoPlayDirection == 'forward') {
        if(currentDate.parent().is('li:last-child')) {
            $(settings.datesDiv+' li:first-child').find('a').trigger('click');
        } else {
            currentDate.parent().next().find('a').trigger('click');
        }
    } else if(settings.autoPlayDirection == 'backward') {
        if(currentDate.parent().is('li:first-child')) {
            $(settings.datesDiv+' li:last-child').find('a').trigger('click');
        } else {
            currentDate.parent().prev().find('a').trigger('click');
        }
    }
}

// gestore di eventi click a tutte le card
$(document).ready(function () {
    $(".card").click(function () {
        $(this).find(".card-img-top, .card-text").toggleClass("d-none");
    });
});



document.addEventListener('DOMContentLoaded', function () {
    // Aggiungi un listener al bottone di reset filtri
    document.querySelector('button.btn-secondary').addEventListener('click', resetFiltri);

    // Aggiungi listener per gli input radio di ordinamento
    document.querySelectorAll('input[name="ordinamento"]').forEach(function (radio) {
        radio.addEventListener('change', ordinaMedia);
    });

    // Aggiungi listener per gli input checkbox di filtro per tipo di media
    document.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.addEventListener('change', filtraMedia);
    });
});

function resetFiltri() {
    // Resetta tutti i checkbox e ordina A-Z di default
    document.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.checked = false;
    });
    document.getElementById('az').checked = true;
    
    // Mostra tutti gli elementi
    mostraTuttiElementi();
}

function ordinaMedia() {
    // Ottieni l'array di tutte le card
    const cards = Array.from(document.querySelectorAll('.card'));

    console.log('Elemento card-title:', document.querySelector('.card-title'));

    // Ordina le card in base alla scelta dell'utente (A-Z o Z-A)
    const ordinamento = document.querySelector('input[name="ordinamento"]:checked').value;
    if (ordinamento === 'az') {
        cards.sort((a, b) => a.querySelector('.card-title').textContent.trim().localeCompare(b.querySelector('.card-title').textContent.trim()));
    } else {
        cards.sort((a, b) => b.querySelector('.card-title').textContent.trim().localeCompare(a.querySelector('.card-title').textContent.trim()));
    }

    console.log('Elemento card-title:', document.querySelector('.card-title'));

    // Aggiorna il contenitore delle card con la nuova sequenza
    const contenitoreMedia = document.getElementById('contenitoreMedia');
    contenitoreMedia.innerHTML = '';
    cards.forEach(card => contenitoreMedia.appendChild(card));
}

function filtraMedia() {
    // Ottieni i valori dei checkbox selezionati
    const filtriSelezionati = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    // Mostra o nascondi le card in base ai filtri selezionati
    const cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        const categoria = card.dataset.categoria;
        if (filtriSelezionati.length === 0 || filtriSelezionati.includes(categoria)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function mostraTuttiElementi() {
    // Mostra tutti gli elementi nascondendo quelli eventualmente filtrati
    const cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.style.display = 'block';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Aggiungi un listener all'input della barra di ricerca
    document.querySelector('.form-control').addEventListener('input', cercaMedia);

    // Aggiungi un listener al pulsante di ricerca
    document.getElementById('button-addon2').addEventListener('click', cercaMedia);
});

function cercaMedia() {
    // Ottieni il testo inserito nella barra di ricerca
    const testoRicerca = document.querySelector('.form-control').value.toLowerCase();

    // Ottieni tutte le card
    const cards = document.querySelectorAll('.card');

    // Cicla attraverso le card e mostra/nascondi in base al testo di ricerca
    cards.forEach(function (card) {
        const titolo = card.querySelector('.card-title').textContent.toLowerCase();

        if (titolo.includes(testoRicerca)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


function submitForm() {
    var nameInput = document.getElementById('name');
    var commentInput = document.getElementById('comment');

    var name = nameInput.value;
    var comment = commentInput.value;

    // Verifica che gli elementi siano correttamente selezionati
    if (nameInput && commentInput) {
        console.log("Nome: " + name);
        console.log("Commento: " + comment);

        // Puoi anche resettare il form dopo l'invio
        document.getElementById('myForm').reset();
    } else {
        console.error("Impossibile trovare gli elementi del DOM.");
    }
}

