import {createStore} from 'redux';

const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const store = createStore(reducer);

const render = () => {
    document.getElementById('app').innerText = store.getState();
    return render;
};

store.subscribe(render());

document.addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'});
});
