import { useState } from "react";
import { InputBox } from "./component";
import useFetch from "./hooks/useFetch";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setForm] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useFetch(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setForm(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url("https://img.freepik.com/free-vector/digital-rupee-concept-background-with-rupee-symbol_1017-36812.jpg?w=826&t=st=1693933572~exp=1693934172~hmac=d0e0905b56c94d3361f1d09008f96e1d23c5de27a0e577cd018f5a3f4c5ae915")`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox label="From"
                Ammount={amount}
                setAmmount={setAmount}
                currencyOptions={options}
                selectCurrency={from}
                onCurrencyChange={(currency) => setForm(currency)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox label="To"
                Ammount={convertedAmount}
                currencyOptions={options}
                selectCurrency={to}
                onCurrencyChange={(currency) => setTo(currency)}
                amountDisable = {true}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              onClick={convert}
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
