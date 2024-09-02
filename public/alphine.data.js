function apiHandler() {
    return {
        // Data properties for Word Game API
        sentence: '',
        wordGameResult: null,

        // Data properties for Total Phone Bill API
        bill: '',
        totalBill: null,

        // Data properties for Phone Bill Prices API
        phoneBillPrices: null,

        // Data properties for Set Phone Bill Price API
        priceType: '',
        priceAmount: null,
        setPriceResult: null,

        // Data properties for Enough Airtime API
        usage: '',
        availableAirtime: null,
        airtimeResult: null,

        // Method to fetch Word Game data
        async fetchWordGameData() {
            try {
                const response = await fetch(`/api/word_game?sentence=${encodeURIComponent(this.sentence)}`);
                this.wordGameResult = await response.json();
            } catch (error) {
                console.error('Error fetching Word Game data:', error);
            }
        },

        // Method to fetch Total Phone Bill
        async fetchPhoneBillTotal() {
            try {
                const response = await fetch('/api/total', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ bill: this.bill })
                });
                const data = await response.json();
                this.totalBill = data.total;
            } catch (error) {
                console.error('Error fetching Phone Bill Total:', error);
            }
        },

        // Method to fetch Phone Bill Prices
        async fetchPhoneBillPrices() {
            try {
                const response = await fetch('/api/phonebill/prices');
                this.phoneBillPrices = await response.json();
            } catch (error) {
                console.error('Error fetching Phone Bill Prices:', error);
            }
        },

        // Method to set Phone Bill Price
        async setPhoneBillPrice() {
            try {
                const response = await fetch('/api/phonebill/price', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ type: this.priceType, price: this.priceAmount })
                });
                this.setPriceResult = await response.json();
            } catch (error) {
                console.error('Error setting Phone Bill Price:', error);
            }
        },

        // Method to check if there is enough airtime
        async checkEnoughAirtime() {
            try {
                const response = await fetch('/api/enoughAirtime', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        usage: this.usage,
                        available: this.availableAirtime
                    })
                });
                const data = await response.json();
                this.airtimeResult = data.result;
            } catch (error) {
                console.error('Error checking Enough Airtime:', error);
            }
        }
    };
}