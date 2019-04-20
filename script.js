

function memoji() {

    let emojiArr = ['🐍', '🐹', '🐭', '🐒', '🐑', '🐼', '🐍', '🐹', '🐭', '🐒', '🐑', '🐼'];
    let allCards = document.querySelectorAll('.card');
    let emojiCards = document.querySelectorAll('.card_back');
    let pairOfCards = [];
    let isClickDone = false;
    let counter = 0;
    let timerId;
    
    
  
    // Перемешиваем карты:

    shuffleCards(emojiArr);   
  
    function shuffleCards(arr) {
      for (let i = 0; i < arr.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
  
      emojiCards.forEach((emojiCard, i) => {
        emojiCard.innerHTML = arr[i];
  
      });
    }

    // Открываем карты:
    
    allCards.forEach(card => card.addEventListener('click', openCard));

    function openCard(event) {

        if (isClickDone === false){
            timerId = setInterval(timer, 1000);
            isClickDone = true;
        }
       
        
        if (!document.querySelectorAll('.incorrect').length == 0) {

            document.querySelectorAll('.incorrect').forEach(elem => elem.parentNode.classList.remove('open'));
         
            document.querySelectorAll('.incorrect').forEach(elem => elem.classList.remove('incorrect'));
           
        
        }

        if ((!event.target.classList.contains('correct'))&&(!event.target.classList.contains('incorrect'))) {
            pairOfCards.push(event.target.previousElementSibling);
        }
        event.target.parentNode.classList.add('open');
       

        if (pairOfCards.length === 2) {
            if (pairOfCards[0].innerHTML === pairOfCards[1].innerHTML) {

                pairOfCards.forEach(elem => elem.classList.add('correct'));
                counterOfPairs();            
                pairOfCards = [];

            } else {
                pairOfCards.forEach(elem => elem.classList.add('incorrect'));
            
                pairOfCards = [];
            }
        }
     
    }

    // Реализуем таймер:

    function timer()  {
        if (document.querySelector('.timer_sec').innerText === '00'){
          document.querySelector('.timer_sec').innerText = '60';
        }
    
        let sec = document.querySelector('.timer_sec').innerText;
        let min = '00';
        document.querySelector('.timer_min').innerText = min;
        let secElem = document.querySelector('.timer_sec');
        sec--;
    
        if (sec < 10){
          sec="0" + sec;
        }
    
        secElem.innerText = sec;
    
    
        if(min === '00' && sec === '00'){
          sec = "00";
          clearInterval(timerId);
          openModalLose();
        }
      }

    function counterOfPairs() {
        counter++;
        if(counter === 6) {
            setTimeout(openModalWin, 800);
        }
    }

    // Всплывающие окна:

    let popup = document.querySelector('.pop-up_window');

    function openModalWin() {
    clearInterval(timerId);
    popup.classList.add('modal_window', 'win')
    }

    function openModalLose() {
    popup.classList.add('modal_window', 'lose')
    }
    
    function refresh() {

        document.querySelectorAll('.incorrect').forEach(elem => elem.classList.remove('incorrect'));
        document.querySelectorAll('.correct').forEach(elem => elem.classList.remove('correct'));
        allCards.forEach(elem => elem.classList.remove('open'));
        shuffleCards(emojiArr);
        document.querySelector('.timer_sec').innerText = '00'
        document.querySelector('.timer_min').innerText = '01'
        isClickDone = false;
        pairOfCards = [];
        counter = 0;  
        popup.classList.remove('modal_window', 'win', 'lose');
        
          
        
    }
    
    
    document.querySelectorAll('.pop-up_btn').forEach(elem => elem.addEventListener('click', refresh));

}