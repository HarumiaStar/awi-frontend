global.localStorage = {
    getItem: function (key: string) {
        return this[key];
    },
    setItem: function (key: string, value: any) { // Explicitly specify the type of 'value' parameter as 'any'
        this[key] = value;
    },
    clear: function () {
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                delete this[key];
            }
        }
    }
} as any;