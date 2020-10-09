import $ from '../core';

$.prototype.modal = function(created) {

    function calcScroll() {
        let div = document.createElement("div");

        div.style.width = "50px";
        div.style.height = "50px";
        div.style.overflowY = "scroll";
        div.style.visibility = "hidden";


        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    for (let i = 0; i < this.length; i++) {
        const target = this[i].getAttribute('data-target');
        $(this[i]).click((e)=> {
            e.preventDefault();
            $(target).fadeIn(500);
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${calcScroll()}px`;
        });

        const closeElements = document.querySelectorAll(`${target} [data-close]`);
        closeElements.forEach(elem => {
            $(elem).click(()=> {
                $(target).hide();
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
                if (created) {
                    document.querySelector(target).remove();
                }
            });
    
        });
    
        $(target).click(e => {
            if(e.target.classList.contains('modal')) {
                $(target).hide();
                document.body.style.overflow = ''; 
                document.body.style.marginRight = `0px`;
                if (created) {
                    document.querySelector(target).remove();
                }           
            }
        });
    }




};

$('[data-toggle="modal"]').modal();

$.prototype.createModal = function({text, btns} = {}) {
    for (let i = 0; i< this.length; i++) {
        let modal = document.createElement('div');
        $(modal).addClass('modal');
        $(modal).addAttribute('id', this[i].getAttribute('data-target').slice(1));

        // btns = {count: num, settings: [[text, classNames=[], close, cb]]}
        const buttons = [];
        const {settings} = btns;
        for (let j = 0;j < btns.count; j++){
            let btn = document.createElement('button');
            $(btn).addClass('btn', ...settings[j][1]);
            btn.textContent = settings[j][0];
            if (settings[j][2]) {
                $(btn).addAttribute('data-close', 'true');
            }
            if (settings[j][3] && typeof(settings[j][3]) === 'function') {
                $(btn).click(settings[j][3]);
            }

            buttons.push(btn);
        }

        $(modal).html(
            `
        <div class="modal-dialog">
            <div class="modal-content">
                <button class="close" data-close>
                    <span>&times;</span>
                </button>
                <div class="modal-header">
                    <div class="modal-title">
                        ${text.title}
                    </div>
                </div>
                <div class="modal-body">
                    ${text.body}
                </div>
                <div class="modal-footer">
                    
                </div>
            </div>
        </div>`
        );

        modal.querySelector(".modal-footer").append(...buttons);
        document.body.appendChild(modal);
        $(this[i]).modal(true);
        $(this[i].getAttribute('data-target')).fadeIn(500);
    }
};