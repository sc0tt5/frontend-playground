import './app.scss'; // global styles for dev testing (don't do in prod)

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;

// button click event
button.addEventListener(
    'click',
    () => {
        if (!input.value.trim()) {
            return;
        }
        const inputValue = input.value;
        console.log(inputValue);
    },
    false
);
