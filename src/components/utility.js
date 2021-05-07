 const Format = (num) =>  {
     return "$" +  Number(num.toFixed(1)).toLocaleString() + " "
    
}
export default Format;
