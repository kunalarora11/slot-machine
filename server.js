import prompts from 'prompts';

const response = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'Enter you name',
      initial: 'Who cares? '
    }
]);

const deposit = async () => {
    const input = await prompts({
        type: 'number',
        name: 'amount',
        message: 'Enter the amount you want to deposit in your wallet',
        float: true,
        validate: amount => amount > 0 ? true : `Enter valid amount`
    })
    
    return input.amount
}

response.amount = await deposit()

response.buyin = response.amount

const chooseLines = async () => {
    const input = await prompts({
        type: 'select',
        name: 'lines',
        message: 'Choose the number of lines you want to bet on',
        choices: [
            { title: '1', value: 1 },
            { title: '2', value: 2 },
            { title: '3', value: 3 },
            { title: '4', value: 4, disabled: true },
            { title: '5', value: 5, disabled: true },
        ]
    })

    return input.lines
}

response.lines = await chooseLines()

const calculateBet = async (response) => {
    const bet = await prompts({
        type: 'number',
        name: 'betPerLine',
        message: 'Enter the amount you want to bet per line',
        float: true,
        validate: betPerLine => betPerLine > 0 && betPerLine * response.lines <= response.amount ? true : `Total bet exceeds amount in your wallet, try again`
    })
    return bet.betPerLine
}

response.betPerLine = await calculateBet(response)

const spinSlots = async () => {
    
}

console.log(response)