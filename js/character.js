function Character() {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = ''
        + '<div class="me">'
            + '<div class="character-face-con me-head">'
                + '<div class="character-face character-head-face face-front"></div>'
                + '<div class="character-face character-head-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con me-body">'
                + '<div class="character-face character-body-face face-front"></div>'
                + '<div class="character-face character-body-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con character-arm me-arm-right">'
                + '<div class="character-face character-arm-face face-front"></div>'
                + '<div class="character-face character-arm-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con character-arm me-arm-left">'
                + '<div class="character-face character-arm-face face-front"></div>'
                + '<div class="character-face character-arm-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con character-leg me-leg-right">'
                + '<div class="character-face character-leg-face face-front"></div>'
                + '<div class="character-face character-leg-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con character-leg me-leg-left">'
                + '<div class="character-face character-leg-face face-front"></div>'
                + '<div class="character-face character-leg-face face-back"></div>'
            + '</div>'
        + '</div>'
        + '<div class="colra">'
            + '<div class="character-face-con colra-head">'
                + '<div class="character-face character-head-face face-front"></div>'
                + '<div class="character-face character-head-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con colra-body">'
                + '<div class="character-face character-body-face face-front"></div>'
                + '<div class="character-face character-body-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con colra-tail">'
                + '<div class="character-face character-tail-face face-front"></div>'
                + '<div class="character-face character-tail-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con character-leg colra-leg-left">'
                + '<div class="character-face character-leg-face face-front"></div>'
                + '<div class="character-face character-leg-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con character-leg colra-leg-right">'
                + '<div class="character-face character-leg-face face-front"></div>'
                + '<div class="character-face character-leg-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con colra-effect">'
                + '<div class="character-face character-head-face face-front"></div>'
                + '<div class="character-face character-head-face face-back"></div>'
            + '</div>'
        + '</div>'
        + '<div class="rowin">'
            + '<div class="character-face-con rowin-head">'
                + '<div class="character-face character-head-face face-front"></div>'
                + '<div class="character-face character-head-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con rowin-body">'
                + '<div class="character-face character-body-face face-front"></div>'
                + '<div class="character-face character-body-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con rowin-tail">'
                + '<div class="character-face character-tail-face face-front"></div>'
                + '<div class="character-face character-tail-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con character-leg rowin-leg-left">'
                + '<div class="character-face character-leg-face face-front"></div>'
                + '<div class="character-face character-leg-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con character-leg rowin-leg-right">'
                + '<div class="character-face character-leg-face face-front"></div>'
                + '<div class="character-face character-leg-face face-back"></div>'
            + '</div>'
            + '<div class="character-face-con rowin-effect">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '</div>';

    document.querySelector('.stage').appendChild(this.mainElem);

    this.scrollState = false;
    this.lastscrollLocate = 0;
    
    this.position = 45;
    this.speed = 0.5;

    this.direction;
    this.runningState = false;
    this.rafID;

    this.init();

};

Character.prototype = {
    constructor: Character, 
    init: function () {
        const self = this;
       
        window.addEventListener('scroll', function () {
            clearTimeout(self.scrollState);
            
            if(self.scrollState){
                self.mainElem.classList.add('running');
            }

            self.scrollState = setTimeout(function() {
                self.scrollState = true;
                self.mainElem.classList.remove('running');
            }, 400);

            if(self.lastscrollLocate > pageYOffset) {
                self.mainElem.setAttribute('data-direction', 'backward');
            }
            else {self.mainElem.setAttribute('data-direction', 'forward');
            }
           
            self.lastscrollLocate = pageYOffset;
        });

        window.addEventListener('keydown', function(e) {
            if(self.runningState) return;
            
            if(e.keyCode == 37) {
                self.mainElem.setAttribute('data-direction', 'left');
                self.mainElem.classList.add('running');      
                
                // self.position += self.speed;
                // self.mainElem.style.right = self.position + '%';

                self.direction = 'left';
                self.run(self);
                self.runningState = true;
              
            }
            else if (e.keyCode == 39) {
                self.mainElem.setAttribute('data-direction', 'right');
                self.mainElem.classList.add('running');

                self.direction = 'right';
                self.run(self);
                self.runningState = true;
            }
        });

        window.addEventListener('keyup', function(e) {
            self.mainElem.classList.remove('running');      
            this.cancelAnimationFrame(self.rafID);
            self.runningState = false;
        });
    }, 
    
    run: function (self) {
        
        if (self.direction == 'left') {
            self.position += self.speed;
        } 
        else if (self.direction == 'right') {
            self.position -= self.speed;
        }

        self.mainElem.style.right = self.position + '%';

        if (self.position < 20) {
            self.position = 20;
        }

        if (self.position > 70) {
            self.position = 70;
        }
    
        self.rafID =  requestAnimationFrame(function () {
            self.run(self);
        });
    }
}

new Character();
