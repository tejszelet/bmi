import { describe } from "vitest";
import { expect } from "vitest";
import { test } from "vitest";
import { getCateg } from "./src/urlap";

/*test('egyszerű teszt', () => {
  expect(2+3).toBe(5)
})*/

describe('getCateg fgv. teszt', ()=>{


    test('should be normal', () => {
      const result= getCateg(172,60)
      //console.log(result);
      expect(result.category).toBe('Normál testsúly')
      
    })
    test('should be Alultáplált', () => {
      const result= getCateg(172,40)
      //console.log(result);
      expect(result.category).toBe('Alultáplált')
      
    })
    test('should be Túlsúlyos', () => {
      const result= getCateg(120,100)
      //console.log(result);
      expect(result.category).toBe('Elhízás III. fokozat')
      
    })

    test('Objektumot térít vissza', () => {
        const result= getCateg(172,60)
        expect(result).toBeTypeOf("object")
    })

    test('Objektumnak van bmi attribútuma', () => {
        const result= getCateg(172,60)
        expect(result).toHaveProperty('bmi')
    })

    test('Egy tizedesre kerekit', () => {
        const result= getCateg(172,60)
        expect(result.bmi).toBe(20.3)
    })
    
    
})

describe('bemeneti értékek',()=>
{
    test('ha a magasság nem szám hiba', () => {
      expect(()=>getCateg('172',60)).toThrow()
    })

    test('ha a súly nem szám hiba', () => {
      expect(()=>getCateg(172,'60')).toThrow()
    })

    test('ha a magasság 0 hiba', () => {
      expect(()=>getCateg(0,60)).toThrow()
    })

    test('ha a magasság negatív hiba', () => {
      expect(()=>getCateg(-100,60)).toThrow()
    })

    

})

describe('szerkezet és határértékek', () => {

  test('a bmi értéke szám típusú', () => {
    const result = getCateg(172, 60)
    expect(result.bmi).toBeTypeOf('number')
    expect(Number.isNaN(result.bmi)).toBe(false)
  })

  test('ugyanarra a bemenetre mindig ugyanazt adja vissza', () => {
    const elso = getCateg(180, 75)
    const masodik = getCateg(180, 75)
    expect(elso).toEqual(masodik)
  })

  test('a súly növelésével a bmi is nő', () => {
    const konnyebb = getCateg(175, 60)
    const nehezebb = getCateg(175, 90)
    expect(nehezebb.bmi).toBeGreaterThan(konnyebb.bmi)
  })

})