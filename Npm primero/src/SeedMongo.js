// import fs from "fs";
import { config } from './Config/config.js';
import readline from 'readline';
import { productsModel } from "./dao/Models/ProductsModel.js";
import { conectaDB } from './connDB.js'


let productos = [
    {
      "title": "Herramienta 1",
      "description": "Herramienta 1 ideal para m\u00faltiples usos.",
      "price": 10.0,
      "thumbnail": "https://example.com/tool1.jpg",
      "code": "CODE1",
      "stock": 1
    },
    {
      "title": "Herramienta 2",
      "description": "Herramienta 2 ideal para m\u00faltiples usos.",
      "price": 12.5,
      "thumbnail": "https://example.com/tool2.jpg",
      "code": "CODE2",
      "stock": 4
    },
    {
      "title": "Herramienta 3",
      "description": "Herramienta 3 ideal para m\u00faltiples usos.",
      "price": 15.0,
      "thumbnail": "https://example.com/tool3.jpg",
      "code": "CODE3",
      "stock": 7
    },
    {
      "title": "Herramienta 4",
      "description": "Herramienta 4 ideal para m\u00faltiples usos.",
      "price": 17.5,
      "thumbnail": "https://example.com/tool4.jpg",
      "code": "CODE4",
      "stock": 10
    },
    {
      "title": "Herramienta 5",
      "description": "Herramienta 5 ideal para m\u00faltiples usos.",
      "price": 20.0,
      "thumbnail": "https://example.com/tool5.jpg",
      "code": "CODE5",
      "stock": 13
    },
    {
      "title": "Herramienta 6",
      "description": "Herramienta 6 ideal para m\u00faltiples usos.",
      "price": 22.5,
      "thumbnail": "https://example.com/tool6.jpg",
      "code": "CODE6",
      "stock": 16
    },
    {
      "title": "Herramienta 7",
      "description": "Herramienta 7 ideal para m\u00faltiples usos.",
      "price": 25.0,
      "thumbnail": "https://example.com/tool7.jpg",
      "code": "CODE7",
      "stock": 19
    },
    {
      "title": "Herramienta 8",
      "description": "Herramienta 8 ideal para m\u00faltiples usos.",
      "price": 27.5,
      "thumbnail": "https://example.com/tool8.jpg",
      "code": "CODE8",
      "stock": 22
    },
    {
      "title": "Herramienta 9",
      "description": "Herramienta 9 ideal para m\u00faltiples usos.",
      "price": 30.0,
      "thumbnail": "https://example.com/tool9.jpg",
      "code": "CODE9",
      "stock": 25
    },
    {
      "title": "Herramienta 10",
      "description": "Herramienta 10 ideal para m\u00faltiples usos.",
      "price": 32.5,
      "thumbnail": "https://example.com/tool10.jpg",
      "code": "CODE10",
      "stock": 28
    },
    {
      "title": "Herramienta 11",
      "description": "Herramienta 11 ideal para m\u00faltiples usos.",
      "price": 35.0,
      "thumbnail": "https://example.com/tool11.jpg",
      "code": "CODE11",
      "stock": 31
    },
    {
      "title": "Herramienta 12",
      "description": "Herramienta 12 ideal para m\u00faltiples usos.",
      "price": 37.5,
      "thumbnail": "https://example.com/tool12.jpg",
      "code": "CODE12",
      "stock": 34
    },
    {
      "title": "Herramienta 13",
      "description": "Herramienta 13 ideal para m\u00faltiples usos.",
      "price": 40.0,
      "thumbnail": "https://example.com/tool13.jpg",
      "code": "CODE13",
      "stock": 37
    },
    {
      "title": "Herramienta 14",
      "description": "Herramienta 14 ideal para m\u00faltiples usos.",
      "price": 42.5,
      "thumbnail": "https://example.com/tool14.jpg",
      "code": "CODE14",
      "stock": 40
    },
    {
      "title": "Herramienta 15",
      "description": "Herramienta 15 ideal para m\u00faltiples usos.",
      "price": 45.0,
      "thumbnail": "https://example.com/tool15.jpg",
      "code": "CODE15",
      "stock": 43
    },
    {
      "title": "Herramienta 16",
      "description": "Herramienta 16 ideal para m\u00faltiples usos.",
      "price": 47.5,
      "thumbnail": "https://example.com/tool16.jpg",
      "code": "CODE16",
      "stock": 46
    },
    {
      "title": "Herramienta 17",
      "description": "Herramienta 17 ideal para m\u00faltiples usos.",
      "price": 50.0,
      "thumbnail": "https://example.com/tool17.jpg",
      "code": "CODE17",
      "stock": 49
    },
    {
      "title": "Herramienta 18",
      "description": "Herramienta 18 ideal para m\u00faltiples usos.",
      "price": 52.5,
      "thumbnail": "https://example.com/tool18.jpg",
      "code": "CODE18",
      "stock": 52
    },
    {
      "title": "Herramienta 19",
      "description": "Herramienta 19 ideal para m\u00faltiples usos.",
      "price": 55.0,
      "thumbnail": "https://example.com/tool19.jpg",
      "code": "CODE19",
      "stock": 55
    },
    {
      "title": "Herramienta 20",
      "description": "Herramienta 20 ideal para m\u00faltiples usos.",
      "price": 57.5,
      "thumbnail": "https://example.com/tool20.jpg",
      "code": "CODE20",
      "stock": 58
    },
    {
      "title": "Herramienta 21",
      "description": "Herramienta 21 ideal para m\u00faltiples usos.",
      "price": 60.0,
      "thumbnail": "https://example.com/tool21.jpg",
      "code": "CODE21",
      "stock": 61
    },
    {
      "title": "Herramienta 22",
      "description": "Herramienta 22 ideal para m\u00faltiples usos.",
      "price": 62.5,
      "thumbnail": "https://example.com/tool22.jpg",
      "code": "CODE22",
      "stock": 64
    },
    {
      "title": "Herramienta 23",
      "description": "Herramienta 23 ideal para m\u00faltiples usos.",
      "price": 65.0,
      "thumbnail": "https://example.com/tool23.jpg",
      "code": "CODE23",
      "stock": 67
    },
    {
      "title": "Herramienta 24",
      "description": "Herramienta 24 ideal para m\u00faltiples usos.",
      "price": 67.5,
      "thumbnail": "https://example.com/tool24.jpg",
      "code": "CODE24",
      "stock": 70
    },
    {
      "title": "Herramienta 25",
      "description": "Herramienta 25 ideal para m\u00faltiples usos.",
      "price": 70.0,
      "thumbnail": "https://example.com/tool25.jpg",
      "code": "CODE25",
      "stock": 73
    },
    {
      "title": "Herramienta 26",
      "description": "Herramienta 26 ideal para m\u00faltiples usos.",
      "price": 72.5,
      "thumbnail": "https://example.com/tool26.jpg",
      "code": "CODE26",
      "stock": 76
    },
    {
      "title": "Herramienta 27",
      "description": "Herramienta 27 ideal para m\u00faltiples usos.",
      "price": 75.0,
      "thumbnail": "https://example.com/tool27.jpg",
      "code": "CODE27",
      "stock": 79
    },
    {
      "title": "Herramienta 28",
      "description": "Herramienta 28 ideal para m\u00faltiples usos.",
      "price": 77.5,
      "thumbnail": "https://example.com/tool28.jpg",
      "code": "CODE28",
      "stock": 82
    },
    {
      "title": "Herramienta 29",
      "description": "Herramienta 29 ideal para m\u00faltiples usos.",
      "price": 80.0,
      "thumbnail": "https://example.com/tool29.jpg",
      "code": "CODE29",
      "stock": 85
    },
    {
      "title": "Herramienta 30",
      "description": "Herramienta 30 ideal para m\u00faltiples usos.",
      "price": 82.5,
      "thumbnail": "https://example.com/tool30.jpg",
      "code": "CODE30",
      "stock": 88
    },
    {
      "title": "Herramienta 31",
      "description": "Herramienta 31 ideal para m\u00faltiples usos.",
      "price": 85.0,
      "thumbnail": "https://example.com/tool31.jpg",
      "code": "CODE31",
      "stock": 91
    },
    {
      "title": "Herramienta 32",
      "description": "Herramienta 32 ideal para m\u00faltiples usos.",
      "price": 87.5,
      "thumbnail": "https://example.com/tool32.jpg",
      "code": "CODE32",
      "stock": 94
    },
    {
      "title": "Herramienta 33",
      "description": "Herramienta 33 ideal para m\u00faltiples usos.",
      "price": 90.0,
      "thumbnail": "https://example.com/tool33.jpg",
      "code": "CODE33",
      "stock": 97
    },
    {
      "title": "Herramienta 34",
      "description": "Herramienta 34 ideal para m\u00faltiples usos.",
      "price": 92.5,
      "thumbnail": "https://example.com/tool34.jpg",
      "code": "CODE34",
      "stock": 100
    },
    {
      "title": "Herramienta 35",
      "description": "Herramienta 35 ideal para m\u00faltiples usos.",
      "price": 95.0,
      "thumbnail": "https://example.com/tool35.jpg",
      "code": "CODE35",
      "stock": 3
    },
    {
      "title": "Herramienta 36",
      "description": "Herramienta 36 ideal para m\u00faltiples usos.",
      "price": 97.5,
      "thumbnail": "https://example.com/tool36.jpg",
      "code": "CODE36",
      "stock": 6
    },
    {
      "title": "Herramienta 37",
      "description": "Herramienta 37 ideal para m\u00faltiples usos.",
      "price": 100.0,
      "thumbnail": "https://example.com/tool37.jpg",
      "code": "CODE37",
      "stock": 9
    },
    {
      "title": "Herramienta 38",
      "description": "Herramienta 38 ideal para m\u00faltiples usos.",
      "price": 102.5,
      "thumbnail": "https://example.com/tool38.jpg",
      "code": "CODE38",
      "stock": 12
    },
    {
      "title": "Herramienta 39",
      "description": "Herramienta 39 ideal para m\u00faltiples usos.",
      "price": 105.0,
      "thumbnail": "https://example.com/tool39.jpg",
      "code": "CODE39",
      "stock": 15
    },
    {
      "title": "Herramienta 40",
      "description": "Herramienta 40 ideal para m\u00faltiples usos.",
      "price": 107.5,
      "thumbnail": "https://example.com/tool40.jpg",
      "code": "CODE40",
      "stock": 18
    },
    {
      "title": "Herramienta 41",
      "description": "Herramienta 41 ideal para m\u00faltiples usos.",
      "price": 110.0,
      "thumbnail": "https://example.com/tool41.jpg",
      "code": "CODE41",
      "stock": 21
    },
    {
      "title": "Herramienta 42",
      "description": "Herramienta 42 ideal para m\u00faltiples usos.",
      "price": 112.5,
      "thumbnail": "https://example.com/tool42.jpg",
      "code": "CODE42",
      "stock": 24
    },
    {
        "title": "Herramienta 43",
        "description": "Herramienta 43 ideal para m\u00faltiples usos.",
        "price": 115.0,
        "thumbnail": "https://example.com/tool43.jpg",
        "code": "CODE43",
        "stock": 27
      },
      {
        "title": "Herramienta 44",
        "description": "Herramienta 44 ideal para m\u00faltiples usos.",
        "price": 117.5,
        "thumbnail": "https://example.com/tool44.jpg",
        "code": "CODE44",
        "stock": 30
      },
      {
        "title": "Herramienta 45",
        "description": "Herramienta 45 ideal para m\u00faltiples usos.",
        "price": 120.0,
        "thumbnail": "https://example.com/tool45.jpg",
        "code": "CODE45",
        "stock": 33
      },
      {
        "title": "Herramienta 46",
        "description": "Herramienta 46 ideal para m\u00faltiples usos.",
        "price": 122.5,
        "thumbnail": "https://example.com/tool46.jpg",
        "code": "CODE46",
        "stock": 36
      },
      {
        "title": "Herramienta 47",
        "description": "Herramienta 47 ideal para m\u00faltiples usos.",
        "price": 125.0,
        "thumbnail": "https://example.com/tool47.jpg",
        "code": "CODE47",
        "stock": 39
      },
      {
        "title": "Herramienta 48",
        "description": "Herramienta 48 ideal para m\u00faltiples usos.",
        "price": 127.5,
        "thumbnail": "https://example.com/tool48.jpg",
        "code": "CODE48",
        "stock": 42
      },
      {
        "title": "Herramienta 49",
        "description": "Herramienta 49 ideal para m\u00faltiples usos.",
        "price": 130.0,
        "thumbnail": "https://example.com/tool49.jpg",
        "code": "CODE49",
        "stock": 45
      },
      {
        "title": "Herramienta 50",
        "description": "Herramienta 50 ideal para m\u00faltiples usos.",
        "price": 132.5,
        "thumbnail": "https://example.com/tool50.jpg",
        "code": "CODE50",
        "stock": 48
      }]


const creaData = async () => {


    await productsModel.deleteMany()
    await productsModel.insertMany(productos)

    console.log(`Data generada...!!!`)
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:true
});

rl.question('Por favor, introduce tu clave: ', async(clave) => {
    if(clave==="GenerarProductos"){
        await conectaDB(config.MONGO_URL, config.DB_NAME)

        await creaData()
    }else{
        console.log(`Contraseña seed incorrecta...!!!`)
    }

    rl.close();
});