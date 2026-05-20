document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-item-form');
    const itemsContainer = document.getElementById('items-container');
    const refreshBtn = document.getElementById('refresh-btn');
    const formMessage = document.getElementById('form-message');

    // Fetch and display items on load
    fetchItems();

    // Refresh button event
    refreshBtn.addEventListener('click', () => {
        refreshBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => refreshBtn.style.transform = 'none', 300);
        fetchItems();
    });

    // Form submit event
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const itemData = {
            id: parseInt(document.getElementById('item-id').value),
            name: document.getElementById('item-name').value,
            power_level: parseFloat(document.getElementById('item-power').value),
            description: document.getElementById('item-desc').value || null
        };

        try {
            const response = await fetch('/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemData)
            });

            if (response.ok) {
                showMessage('Node successfully deployed!', 'success');
                form.reset();
                fetchItems(); // Reload the list
            } else {
                const errorData = await response.json();
                showMessage(`Error: ${errorData.detail || 'Failed to deploy node'}`, 'error');
            }
        } catch (error) {
            showMessage(`Network Error: ${error.message}`, 'error');
        }
    });

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `message ${type}`;
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    async function fetchItems() {
        try {
            const response = await fetch('/items');
            if (response.ok) {
                const items = await response.json();
                renderItems(items);
            } else {
                itemsContainer.innerHTML = '<div class="error-state">Failed to load nodes.</div>';
            }
        } catch (error) {
            itemsContainer.innerHTML = '<div class="error-state">Network error connecting to gravity net.</div>';
        }
    }

    function renderItems(items) {
        if (items.length === 0) {
            itemsContainer.innerHTML = '<div class="empty-state">No nodes deployed yet. Initiate deployment sequence.</div>';
            return;
        }

        itemsContainer.innerHTML = '';
        
        items.forEach(item => {
            const powerPercentage = Math.min((item.power_level / 100000) * 100, 100);
            
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <div class="item-header">
                    <span class="item-id">ID: ${item.id}</span>
                </div>
                <div class="item-name">${item.name}</div>
                <div class="item-desc">${item.description || 'No description provided.'}</div>
                <div class="item-power">
                    <span>Power: ${item.power_level}</span>
                    <div class="power-bar-bg">
                        <div class="power-bar-fill" style="width: 0%"></div>
                    </div>
                </div>
            `;
            
            itemsContainer.appendChild(card);
            
            // Trigger animation after DOM insertion
            setTimeout(() => {
                const bar = card.querySelector('.power-bar-fill');
                if (bar) bar.style.width = `${powerPercentage}%`;
            }, 100);
        });
    }
});
