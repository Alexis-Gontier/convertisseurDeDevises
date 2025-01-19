"use client"

import { useState } from 'react';

const currencies = [
    {code: 'EUR', name: 'Euro'},
    {code: 'USD', name: 'US Dollar'},
    {code: 'GBP', name: 'British Pound'},
    {code: 'JPY', name: 'Japanese Yen'},
    {code: 'CNY', name: 'Chinese Yuan'},
    {code: 'KRW', name: 'South Korean Won'},
    {code: 'RUB', name: 'Russian Ruble'},
]

export default function CurrencyConverter() {

    const [amount, setAmount] = useState<string>("");
    const [fromCurrency, setFromCurrency] = useState<string>(currencies[0].code);
    const [toCurrency, setToCurrency] = useState<string>(currencies[1].code);
    const [result, setResult] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleConvert = async () => {
        if (!amount) return;
        setIsLoading(true);
        try {
            if(!process.env.NEXT_PUBLIC_API_KEY) {
                throw new Error("API key is missing");
            }

            const responsse = await fetch(` https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_API_KEY}/latest/${fromCurrency}`);

            if (!responsse.ok) {
                throw new Error("Failed to fetch exchange rates");
            }

            const data = await responsse.json();

            if(data.result === 'error') {
                throw new Error(data['error-type']);
            }

            const rate = data.conversion_rates[toCurrency];
            const calclatedResult = parseFloat(amount) * rate;

            setResult(calclatedResult);

        } catch (error) {
            console.error("Error converting currency", error);
        }
        setIsLoading(false);
    }

    const availableCurrencies = currencies.filter(currency => currency.code !== fromCurrency);

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="montant" className="block text-sm font-medium text-gray-700 mb-1">
                    Montant
                </label>
                <input value={amount} placeholder="Entrez un montant" id="montant" type="number" className="w-full p-2 border rounded-md" onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                        De
                    </label>
                    <select value={fromCurrency} id="fromCurrency" onChange={(e)=> {
                        setFromCurrency(e.target.value);
                        if(e.target.value === toCurrency) {
                            const firstAvailable = currencies.find(currency => currency.code !== e.target.value);
                            if(firstAvailable) {
                                setToCurrency(firstAvailable.code);
                            }
                        }
                    }} className="w-full p-2 border rounded-md">
                        {currencies.map(currency => (
                            <option key={currency.code} value={currency.code}>{currency.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                        À
                    </label>
                    <select value={toCurrency} id="toCurrency" onChange={(e)=> {
                        setToCurrency(e.target.value);
                        if(e.target.value === fromCurrency) {
                            const firstAvailable = currencies.find(currency => currency.code !== e.target.value);
                            if(firstAvailable) {
                                setFromCurrency(firstAvailable.code);
                            }
                        }
                    }} className="w-full p-2 border rounded-md">
                        {availableCurrencies.map(currency => (
                            <option key={currency.code} value={currency.code}>{currency.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button onClick={handleConvert} disabled={isLoading} className="w-full p-2 bg-blue-500 text-white rounded-md">
                {isLoading ? "Conversion en cours..." : "Convertir"}
            </button>

            {result !== null &&  (
                <div className="mt-4 p-4 bg-green-100 rounded-md">
                    <p className="text-center text-lg">
                        {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
                    </p>
                </div>
            )}
        </div>
    )
}
