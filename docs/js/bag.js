// Winkelmandje. Slaat op in de browser (localStorage).

// Punten per product: onze eigen schatting, alleen voor de meter.
const POINTS = { parka: 3, sneaker: 2, chino: 2, hat: 1, wax: 3, gloves: 1, boots: 2, jacket: 3 };

const Bag = {
    read() {
        try { return JSON.parse(localStorage.getItem('perma-bag')) || []; }
        catch (e) { return []; }
    },
    write(items) {
        try { localStorage.setItem('perma-bag', JSON.stringify(items)); }
        catch (e) { /* opslag niet beschikbaar */ }
    },

    add(id, colorId = null) {
        const items = this.read();
        items.push({ id: id, colorId: colorId, free: false });
        this.write(items);

    },
    remove(i) {
        const items = this.read();
        items.splice(i, 1);
        this.write(items);
    },
    toggleFree(i) {
        const items = this.read();
        if (items[i]) items[i].free = !items[i].free;
        this.write(items);
    }
};

function updateBagCount() {
    const n = Bag.read().length;
    document.querySelectorAll('[data-bag-count]').forEach(el => { el.textContent = n; });
}

let toastTimer;
function toast(message) {
    let el = document.getElementById('toast');
    if (!el) {
        el = document.createElement('div');
        el.id = 'toast';
        el.setAttribute('role', 'status');
        document.body.appendChild(el);
    }
    el.textContent = message;
    void el.offsetWidth;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

document.addEventListener('DOMContentLoaded', updateBagCount);