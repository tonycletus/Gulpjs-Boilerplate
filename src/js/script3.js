class Sqrt {
  calculate(number){
    return (`Square root of ${number} is ${Math.sqrt(number)}`)
  }
}

let result = new Sqrt()
document.getElementById('content').innerHTML = result.calculate(16);