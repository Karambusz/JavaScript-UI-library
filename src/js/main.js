import './lib/lib';
import $ from './lib/lib';

$('button').on('click', function() {
    console.log(this);
    $(this).toggleClass('active');
});

$('div').addAttribute('data-number', 2);


function sayHello() {
    console.log('Hello');
}