import react, { useState, useEffect } from 'react';

const ExpenseEmploye = () => {

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1)
    }
    
    return (
        <div>
            <p style={{backgroundColor: 'black'}}>
                Hola, catalina ganastes {count} carros
            </p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}

export default ExpenseEmploye 