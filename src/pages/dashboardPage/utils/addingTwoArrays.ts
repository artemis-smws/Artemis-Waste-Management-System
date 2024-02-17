export default function addingTwoArrays(array1 : any[], array2 : any[]) {
    return array1.map((value, index) => value + array2[index])
}