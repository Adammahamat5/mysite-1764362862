// Lambda Network Mining Application
class LambdaMiner {
    constructor() {
        this.walletBalance = 0;
        this.isMining = false;
        this.lastMiningTime = null;
        this.nextMiningTime = null;
        this.airdropClaimed = false;
        this.tasksCompleted = {
            invite: false,
            click: false
        };
        
        this.initializeApp();
    }
initializeApp() {
        this.loadFromLocalStorage();
        this.updateUI();
        this.setupEventListeners();
        this.checkMiningAvailability();
}

    loadFromLocalStorage() {
        const savedData = localStorage.getItem('lambdaMinerData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.walletBalance = data.walletBalance || 0;
            this.lastMiningTime = data.lastMiningTime ? new Date(data.lastMiningTime) : null;
            this.airdropClaimed = data.airdropClaimed || false;
            this.tasksCompleted = data.tasksCompleted || {
                invite: false,
                click: false
            };
        }
    }

    saveToLocalStorage() {
        const data = {
            walletBalance: this.walletBalance,
            lastMiningTime: this.lastMiningTime,
            airdropClaimed: this.airdropClaimed,
            tasksCompleted: this.tasksCompleted
        };
        localStorage.setItem('lambdaMinerData', JSON.stringify(data));
    }

    setupEventListeners() {
        // Mine button
        document.getElementById('mineButton').addEventListener('click', () => {
            this.startMining();
        });

        // Airdrop button
        document.getElementById('airdropButton').addEventListener('click', () => {
            this.claimAirdrop();
        });

        // Task buttons
        document.querySelector('.invite-task').addEventListener('click', () => {
            this.completeInviteTask();
        });

        document.querySelector('.click-task').addEventListener('click', () => {
            this.completeClickTask();
        });
        // Update mining status every minute
        setInterval(() => {
            this.checkMiningAvailability();
        }, 60000);
}

    checkMiningAvailability() {
        const mineButton = document.getElementById('mineButton');
        const nextMiningElement = document.getElementById('nextMiningTime');

        if (this.isMining) {
            mineButton.disabled = true;
            nextMiningElement.textContent = "Currently mining...";
        } else if (this.lastMiningTime) {
            const twoHoursLater = new Date(this.lastMiningTime.getTime() + 2 * 60 * 60 * 1000);
            const now = new Date();

            if (now >= twoHoursLater) {
                mineButton.disabled = false;
                nextMiningElement.textContent = "Ready to mine!";
            this.nextMiningTime = null;
            mineButton.classList.remove('disabled:opacity-50');
            mineButton.classList.add('pulse-glow');
            mineButton.innerHTML = `
                <div class="flex items-center justify-center">
                    <i data-feather="play" class="w-6 h-6 mr-2"></i>
                    Mine Now
                </div>
            `;
            feather.replace();
            this.showNotification("Mining available! Start your next session.", "success");
            return;
            }

            this.nextMiningTime = twoHoursLater;
            const timeUntilNext = twoHoursLater - now;
            const hours = Math.floor(timeUntilNext / (60 * 60 * 1000));
            const minutes = Math.floor((timeUntilNext % (60 * 60 * 1000)) / (60 * 1000));

            mineButton.disabled = true;
            nextMiningElement.textContent = `Next mining in: ${hours}h ${minutes}m`;
            mineButton.innerHTML = `
                <div class="flex items-center justify-center">
                    <i data-feather="clock" class="w-6 h-6 mr-2"></i>
                    Wait ${hours}h ${minutes}m
            `;
            feather.replace();
        } else {
            // First time mining
            mineButton.disabled = false;
            nextMiningElement.textContent = "Start your first mining session!";
            mineButton.classList.add('pulse-glow');
        }
    }

    startMining() {
        if (this.isMining) return;

        this.isMining = true;
        const mineButton = document.getElementById('mineButton');
        const miningStatus = document.getElementById('miningStatus');
        const nextMiningElement = document.getElementById('nextMiningTime');

        mineButton.disabled = true;
        miningStatus.classList.remove('hidden');
        nextMiningElement.textContent = "Mining session started...";

        this.showNotification("Mining session started! You'll earn 0.036 $LAMDA per hour.", "info");

        // Simulate 10 seconds of mining for demo
        setTimeout(() => {
            this.completeMining();
        }, 10000);
    }

    completeMining() {
        this.isMining = false;
        this.lastMiningTime = new Date();
        
        // Add mining reward
        const miningReward = 0.036 * 2; // 2 hours at 0.036 per hour
        this.walletBalance += miningReward;

        const mineButton = document.getElementById('mineButton');
        const miningStatus = document.getElementById('miningStatus');
        
        mineButton.disabled = true;
        miningStatus.classList.add('hidden');

        this.saveToLocalStorage();
        this.updateUI();
        this.checkMiningAvailability();

        this.showNotification(`Mining complete! You earned ${miningReward.toFixed(3)} $LAMDA`, "success");
    }

    claimAirdrop() {
        if (this.airdropClaimed) {
            this.showNotification("You've already claimed your airdrop!", "warning");
            return;
        }

        const airdropReward = 5;
        this.walletBalance += airdropReward;
        this.airdropClaimed = true;

        const airdropButton = document.getElementById('airdropButton');
        const airdropStatus = document.getElementById('airdropStatus');

        airdropButton.disabled = true;
        airdropStatus.textContent = "Airdrop claimed! +5 $LAMDA";

        this.saveToLocalStorage();
        this.updateUI();

        this.showNotification(`Airdrop claimed! You received ${airdropReward} $LAMDA`, "success");
    }

    completeInviteTask() {
        if (this.tasksCompleted.invite) {
            this.showNotification("Invite task already completed!", "warning");
            return;
        }

        const taskReward = 2;
        this.walletBalance += taskReward;
        this.tasksCompleted.invite = true;

        const inviteButton = document.querySelector('.invite-task');
        inviteButton.disabled = true;
        inviteButton.textContent = "Task Completed!";
        inviteButton.classList.remove('hover:from-blue-600', 'hover:to-indigo-700');
        inviteButton.classList.add('bg-gray-600');

        this.saveToLocalStorage();
        this.updateUI();

        this.showNotification(`Invite task completed! You earned ${taskReward} $LAMDA`, "success");
    }

    completeClickTask() {
        if (this.tasksCompleted.click) {
            this.showNotification("Daily click task already completed!", "warning");
            return;
        }

        const taskReward = 1;
        this.walletBalance += taskReward;
        this.tasksCompleted.click = true;

        const clickButton = document.querySelector('.click-task');
        clickButton.disabled = true;
        clickButton.textContent = "Task Completed!";
        clickButton.classList.remove('hover:from-purple-600', 'hover:to-pink-700');
        clickButton.classList.add('bg-gray-600');

        this.saveToLocalStorage();
        this.updateUI();

        this.showNotification(`Daily click task completed! You earned ${taskReward} $LAMDA`, "success");
    }

    updateUI() {
        // Update wallet balance
        document.getElementById('walletBalance').textContent = `${this.walletBalance.toFixed(3)} $LAMDA`;

        // Update airdrop button if claimed
        if (this.airdropClaimed) {
            const airdropButton = document.getElementById('airdropButton');
            const airdropStatus = document.getElementById('airdropStatus');
            
            airdropButton.disabled = true;
            airdropStatus.textContent = "Airdrop claimed! Thank you!";
        }
    }

    showNotification(message, type = "info") {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-2xl transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-600' : 
            type === 'warning' ? 'bg-yellow-600' : 
            type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        } text-white max-w-sm`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <i data-feather="${type === 'success' ? 'check-circle' : type === 'warning' ? 'alert-triangle' : type === 'error' ? 'x-circle' : 'info'}" class="w-5 h-5 mr-2"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);
        feather.replace();

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.add('opacity-0', 'translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LambdaMiner();
});