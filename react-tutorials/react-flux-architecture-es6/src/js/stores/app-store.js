import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
import CartAPI from '../api/CartAPI';

const CHANGE_EVENT = 'change';

const AppStore = Object.assign(EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },
    getCart() {
        return CartAPI.cartItems;
    },
    getCatalog() {
        return CartAPI.getCatalog();
    },
    getCartTotals() {
        return CartAPI.cartTotals();
    },
    dispatcherIndex: register(action => {
        switch (action.actionType) {
            case AppConstants.ADD_ITEM:
                CartAPI.addItem(action.item);
                break;
            case AppConstants.REMOVE_ITEM:
                CartAPI.removeItem(action.item);
                break;
            case AppConstants.INCREASE_ITEM:
                CartAPI.increaseItem(action.item);
                break;
            case AppConstants.DECREASE_ITEM:
                CartAPI.decreaseItem(action.item);
                break;
        }

        AppStore.emitChange();
    })
});

export default AppStore;
