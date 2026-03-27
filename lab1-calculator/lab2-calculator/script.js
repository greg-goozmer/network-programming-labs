window.onload = function() {
    const extraToggle = document.getElementById('btn_extra_toggle');
    const extraPanel = document.getElementById('extraPanel');

    extraToggle.onclick = () => {
        if (extraPanel.style.display === 'none') {
            extraPanel.style.display = 'block';
            extraToggle.textContent = '▼';
        } else {
            extraPanel.style.display = 'none';
            extraToggle.textContent = '▶';
        }
    };

    let a = '';
    let b = '';
    let selectedOperation = null;

    const outputElement = document.getElementById('result');
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');
    const clearBtn = document.getElementById('btn_op_clear');
    const signBtn = document.getElementById('btn_op_sign');
    const percentBtn = document.getElementById('btn_op_percent');
    const divideBtn = document.getElementById('btn_op_div');
    const multiplyBtn = document.getElementById('btn_op_mult');
    const minusBtn = document.getElementById('btn_op_minus');
    const plusBtn = document.getElementById('btn_op_plus');
    const equalBtn = document.getElementById('btn_op_equal');

    const sqrtBtn = document.getElementById('btn_op_sqrt');
    const squareBtn = document.getElementById('btn_op_square');

    // для них только заглушки
    // const backspaceBtn = document.getElementById('btn_op_backspace');
    // const factBtn = document.getElementById('btn_op_fact');
    // const tripleZeroBtn = document.getElementById('btn_op_000');
    // const cubeBtn = document.getElementById('btn_op_cube');
    // const mPlusBtn = document.getElementById('btn_op_mplus');
    // const mMinusBtn = document.getElementById('btn_op_mminus');
    // const mrBtn = document.getElementById('btn_op_mr');
    // const mcBtn = document.getElementById('btn_op_mc');
    // const resultColorBtn = document.getElementById('btn_result_color');

    function getCurrentNumber() {
        return selectedOperation ? b : a;
    }

    function setCurrentNumber(value) {
        if (selectedOperation) {
            b = value;
        } else {
            a = value;
        }
        outputElement.innerHTML = value === '' ? '0' : value;
    }

    function onDigitButtonClicked(digit) {
        let current = getCurrentNumber();

        if (digit === '.' && current.includes('.')) return;

        current += digit;
        setCurrentNumber(current);
    }

    digitButtons.forEach(button => {
        button.onclick = () => {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    clearBtn.onclick = () => {
        a = '';
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = '0';
    };

    signBtn.onclick = () => {
        let current = getCurrentNumber();
        if (current === '' || current === '0') return;
        let newValue = (parseFloat(current) * -1).toString();
        setCurrentNumber(newValue);
    };

    percentBtn.onclick = () => {
        let current = getCurrentNumber();
        if (current === '') return;
        let percentValue = (parseFloat(current) / 100).toString();
        setCurrentNumber(percentValue);
    };

    function setOperation(op) {
        if (a === '') return;
        selectedOperation = op;
    }

    plusBtn.onclick = () => setOperation('+');
    minusBtn.onclick = () => setOperation('-');
    multiplyBtn.onclick = () => setOperation('x');
    divideBtn.onclick = () => setOperation('/');

    equalBtn.onclick = () => {
        if (a === '' || b === '' || !selectedOperation) return;

        let numA = parseFloat(a);
        let numB = parseFloat(b);
        let result;

        switch (selectedOperation) {
            case '+': result = numA + numB; break;
            case '-': result = numA - numB; break;
            case 'x': result = numA * numB; break;
            case '/':
                if (numB === 0) {
                    outputElement.innerHTML = 'Ошибка';
                    return;
                }
                result = numA / numB;
                break;
            default: return;
        }
        a = result.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;

        squareBtn.onclick = () => {
            let current = getCurrentNumber();
            if (current === '') return;
            let num = parseFloat(current);
            let result = (num * num).toString();
            a = result;
            b = '';
            selectedOperation = null;
            outputElement.innerHTML = a;
        };

        sqrtBtn.onclick = () => {
            let current = getCurrentNumber();
            if (current === '') return;
            let num = parseFloat(current);
            if (num < 0) {
                outputElement.innerHTML = 'Ошибка';
                return;
            }
            let result = Math.sqrt(num).toString();
            a = result;
            b = '';
            selectedOperation = null;
            outputElement.innerHTML = a;
        };
    }
}
