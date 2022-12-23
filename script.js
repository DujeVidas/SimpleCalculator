
const add = (a,b) => a + b;
const substract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

const operate = (a,b,operator) => {
    let result = 0
    switch (operator){
        case '+':
            result = add(a,b);
            break;
        case '-':
            result = substract(a,b);
            break;
        case '*':
            result = multiply(a,b);
            break;
        case '/':
            result = divide(a,b);
            break;
    }
    return result.toFixed(2);
}


const allIndexes = (str) => {
    const PlusMinus = [];

    const MultiplyDivide = [];


    for (let index = 0; index < str.length; index++) {
        if (str[index] === '+' || str[index] === '-') {
            PlusMinus.push(index);
        }
    }
    for (let index = 0; index < str.length; index++) {
        if (str[index] === '*' || str[index] === '/') {
            MultiplyDivide.push(index);
        }
    }

    return [PlusMinus,MultiplyDivide]
}



const getNumber = (str,i,b) =>{
    let numStr = ""
    let index = i


    do{
        numStr += (str[index])
        if(b==true){
            if(index == 0){
                break
            }
            index=index-1
        }else{
            if(index == (str.length-1)){
                break
            }
            index=index+1
        }
        


    }while(str[index] !== '*' && str[index] !== '/' && str[index] !== '+' && str[index] !== '-' )

    if (b == true){
        let arr = numStr.split('')
        arr=arr.reverse()
        numStr = arr.join('')
    }

    return numStr
}



const calculateFirst = (str) =>{
    

    for(let i = 0;i<str.length;i++){
        if(str[i]==='*' || str[i] === '/'){
    
            let number_1S = getNumber(str,i-1,true)
            let number_1 = parseFloat(number_1S)
            let number_2S = parseFloat(getNumber(str,i+1,false))
            let number_2 = parseFloat(number_2S)
            
            let newNumber = parseFloat(operate(number_1,number_2,str[i]))
           
            let oldNums = number_1S+str[i]+number_2S
            

            //console.log(oldNums)
            //console.log(newNumber.toString())
            
            str = str.replace(oldNums,newNumber.toString())
            //console.log(str)
            
            newStr = calculateFirst(str)
            break
        }
    }
    //console.log(str)
    return str
}

const calculateSecond = (str) =>{
    

    for(let i = 0;i<str.length;i++){
        if(str[i]==='+' || str[i] === '-'){
    
            let number_1S = getNumber(str,i-1,true)
            let number_1 = parseFloat(number_1S)
            let number_2S = parseFloat(getNumber(str,i+1,false))
            let number_2 = parseFloat(number_2S)
            
            let newNumber = parseFloat(operate(number_1,number_2,str[i]))
           
            let oldNums = number_1S+str[i]+number_2S
            

            //console.log(oldNums)
            //console.log(newNumber.toString())
            
            str = str.replace(oldNums,newNumber.toString())
            //console.log(str)
            
            newStr = calculateSecond(str)
            break
        }
    }
    //console.log(str)
    return str
}


const str = '3.0*1.0*2*2'
let newStr = str

const [PlusMinus,MultiplyDivide] = allIndexes(str)
const numOfCalcOne = Math.ceil(MultiplyDivide.length/2)
const numOfCalcTwo = Math.ceil(PlusMinus.length/2)

for(let i = 0;i<numOfCalcOne;i++){
   calculateFirst(newStr)
}
for(let i = 0;i<numOfCalcTwo;i++){
    calculateFirst(newStr)
 }
console.log(newStr)