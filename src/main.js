import './style.css'
import 'beercss'
import Alpine from 'alpinejs'
import {initUsers} from "./users.js";
import {initStorage} from "./storage.js";


document.addEventListener('alpine:init', () => {
    Alpine.store('ui', {
        currentTab: 'storage',
        setTab(tabName) {
            this.currentTab = tabName
        }
    })
    initStorage()
    initUsers()
})



window.Alpine = Alpine
Alpine.start()

